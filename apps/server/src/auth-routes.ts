// Kimlik rotaları + koruma kancası. Korunmayan yollar: landing (/), /login, /auth/*, /api/health, /api/auth/config.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {
  type AuthConfig, type Session, clearCookie, COOKIE, createSession, parseCookies, randomState, readSession, sessionCookie, verifyPassword,
} from "./auth.ts";

declare module "fastify" {
  interface FastifyRequest { session: Session | null }
}

const PUBLIC = [/^\/$/, /^\/index\.html$/, /^\/login\/?$/, /^\/auth\//, /^\/api\/health$/, /^\/api\/auth\/config$/, /^\/favicon\.ico$/];
const STATE_COOKIE = "vibe_oauth_state";
const loginTpl = readFileSync(join(import.meta.dirname, "..", "views", "login.html"), "utf-8");

const isSecure = (req: FastifyRequest) => req.protocol === "https";
const wantsHtml = (req: FastifyRequest) => !req.url.startsWith("/api/") && (req.headers.accept ?? "").includes("text/html");
const safeNext = (n: unknown) => (typeof n === "string" && /^\/[^/\\]/.test(n) ? n : "/app/");

function renderLogin(cfg: AuthConfig, opts: { error?: string; next?: string } = {}) {
  return loginTpl
    .replace("{{GITHUB}}", cfg.github ? `<div class="or">veya</div><a class="btn" href="/auth/github?next=${encodeURIComponent(opts.next ?? "/app/")}">GitHub ile giriş (geliştirici)</a>` : "")
    .replace("{{PASSWORD}}", Object.keys(cfg.passwordUsers).length ? "" : "hidden")
    .replace("{{NOPASS}}", Object.keys(cfg.passwordUsers).length ? "" : `<div class="muted">E-posta girişi tanımlı değil (PASSWORD_USERS).</div>`)
    .replace("{{NEXT}}", opts.next ?? "/app/")
    .replace("{{ERROR}}", opts.error ? `<div class="err">▲ ${opts.error}</div>` : "")
    .replace("{{ALLOW}}", cfg.allowedGithubUsers.length ? cfg.allowedGithubUsers.join(" · ") : "—");
}

export function registerAuth(app: FastifyInstance, cfg: AuthConfig) {
  app.decorateRequest("session", null);

  app.addHook("onRequest", async (req, reply) => {
    const path = req.url.split("?")[0]!;
    req.session = readSession(cfg, parseCookies(req.headers.cookie)[COOKIE]);
    if (cfg.disabled && !req.session) req.session = { u: "dev", name: "Geliştirme", via: "password", exp: Number.MAX_SAFE_INTEGER };
    if (req.session || PUBLIC.some((re) => re.test(path))) return;
    if (wantsHtml(req)) return reply.redirect(`/login?next=${encodeURIComponent(req.url)}`);
    return reply.status(401).send({ hata: "Oturum gerekli", giris: "/login" });
  });

  app.get("/login", async (req, reply) => {
    const q = req.query as { next?: string; error?: string };
    if (req.session && !cfg.disabled) return reply.redirect(safeNext(q.next));
    return reply.type("text/html; charset=utf-8").send(renderLogin(cfg, { next: safeNext(q.next), error: q.error }));
  });

  app.get("/api/me", async (req) => req.session);
  app.get("/api/auth/config", async () => ({
    github: Boolean(cfg.github), password: Object.keys(cfg.passwordUsers).length, emails: Object.keys(cfg.passwordUsers),
    allowedGithubUsers: cfg.allowedGithubUsers, disabled: cfg.disabled,
  }));

  /* ---- e-posta + parola (ana giriş yolu; PASSWORD_USERS = eposta:scrypt$salt$hash) ---- */
  app.post("/auth/password", async (req, reply) => {
    const b = z.object({ email: z.string().trim().email(), password: z.string().min(1), next: z.string().optional() }).safeParse(req.body);
    const back = (m: string, next?: string) => reply.redirect(`/login?error=${encodeURIComponent(m)}&next=${encodeURIComponent(safeNext(next))}`);
    if (!b.success) return back("Geçerli bir e-posta adresi ve parola girin.", (req.body as { next?: string })?.next);
    const email = b.data.email.toLowerCase();
    const stored = cfg.passwordUsers[email];
    if (!stored || !verifyPassword(b.data.password, stored)) {
      app.log.warn({ email, ip: req.ip }, "e-posta/parola girişi reddedildi");
      return back("E-posta veya parola hatalı.", b.data.next);
    }
    reply.header("set-cookie", sessionCookie(createSession(cfg, { u: email, name: email.split("@")[0]!, via: "password" }), isSecure(req)));
    return reply.redirect(safeNext(b.data.next));
  });

  /* ---- GitHub OAuth (Authorization Code) ---- */
  app.get("/auth/github", async (req, reply) => {
    if (!cfg.github) return reply.redirect("/login?error=" + encodeURIComponent("GitHub OAuth tanımlı değil."));
    const next = safeNext((req.query as { next?: string }).next);
    const state = randomState();
    reply.header("set-cookie", `${STATE_COOKIE}=${state}.${Buffer.from(next).toString("base64url")}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600${isSecure(req) ? "; Secure" : ""}`);
    const redirectUri = `${req.protocol}://${req.hostname}/auth/github/callback`;
    const url = new URL("https://github.com/login/oauth/authorize");
    url.search = new URLSearchParams({ client_id: cfg.github.clientId, redirect_uri: redirectUri, scope: "read:user", state }).toString();
    return reply.redirect(url.toString());
  });

  app.get("/auth/github/callback", async (req, reply) => {
    const q = req.query as { code?: string; state?: string; error?: string };
    const fail = (m: string) => reply.redirect(`/login?error=${encodeURIComponent(m)}`);
    if (!cfg.github) return fail("GitHub OAuth tanımlı değil.");
    const raw = parseCookies(req.headers.cookie)[STATE_COOKIE] ?? "";
    const [state, nextB64] = raw.split(".");
    reply.header("set-cookie", `${STATE_COOKIE}=; Path=/; Max-Age=0`);
    if (q.error || !q.code || !q.state || q.state !== state) return fail("GitHub yetkilendirmesi doğrulanamadı (state).");
    const next = safeNext(nextB64 ? Buffer.from(nextB64, "base64url").toString() : "/app/");

    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST", headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({ client_id: cfg.github.clientId, client_secret: cfg.github.clientSecret, code: q.code, redirect_uri: `${req.protocol}://${req.hostname}/auth/github/callback` }),
    });
    const tok = (await tokenRes.json()) as { access_token?: string; error_description?: string };
    if (!tok.access_token) return fail(tok.error_description ?? "GitHub token alınamadı.");
    const userRes = await fetch("https://api.github.com/user", { headers: { authorization: `Bearer ${tok.access_token}`, "user-agent": "vibe-management", accept: "application/vnd.github+json" } });
    const gh = (await userRes.json()) as { login?: string; name?: string };
    const login = gh.login?.toLowerCase();
    if (!login || !cfg.allowedGithubUsers.includes(login)) {
      app.log.warn({ login, ip: req.ip }, "GitHub kullanıcısı allowlist dışında");
      return fail(`@${gh.login ?? "?"} bu uygulamaya yetkili değil. Yetkili kullanıcılar: ${cfg.allowedGithubUsers.join(", ")}`);
    }
    reply.header("set-cookie", [reply.getHeader("set-cookie") as string, sessionCookie(createSession(cfg, { u: login, name: gh.name || gh.login!, via: "github" }), isSecure(req))]);
    return reply.redirect(next);
  });

  app.post("/auth/logout", async (req, reply) => { reply.header("set-cookie", clearCookie(isSecure(req))); return reply.redirect("/"); });
  app.get("/auth/logout", async (req, reply) => { reply.header("set-cookie", clearCookie(isSecure(req))); return reply.redirect("/"); });
}

export type { FastifyReply };
