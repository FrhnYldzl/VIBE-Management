// Kimlik rotaları + koruma kancası. Korunmayan yollar: landing (/), /login, /auth/*, /api/health, /api/auth/config.
// Kullanıcılar DB'de (store.users); PASSWORD_USERS env yalnız ilk tohum. Parola değiştirme /hesap, admin sıfırlama /api/users.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import {
  type AuthConfig, type Session, clearCookie, COOKIE, createSession, hashLooksValid, hashPassword, parseCookies, randomState, readSession, sessionCookie, verifyPassword,
} from "./auth.ts";
import type { Store } from "./store.ts";

declare module "fastify" {
  interface FastifyRequest { session: Session | null }
}

const PUBLIC = [/^\/$/, /^\/index\.html$/, /^\/login\/?$/, /^\/auth\//, /^\/api\/health$/, /^\/api\/auth\/config$/, /^\/favicon\.ico$/];
const STATE_COOKIE = "vibe_oauth_state";
const VIEWS = join(import.meta.dirname, "..", "views");
const loginTpl = readFileSync(join(VIEWS, "login.html"), "utf-8");
const hesapTpl = readFileSync(join(VIEWS, "hesap.html"), "utf-8");

const isSecure = (req: FastifyRequest) => req.protocol === "https";
const wantsHtml = (req: FastifyRequest) => !req.url.startsWith("/api/") && (req.headers.accept ?? "").includes("text/html");
const safeNext = (n: unknown) => (typeof n === "string" && /^\/[^/\\]/.test(n) ? n : "/app/");
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]!));
const tarih = (iso: string | null | undefined) => (iso ? new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—");

function renderLogin(cfg: AuthConfig, hasUsers: boolean, opts: { error?: string; next?: string } = {}) {
  return loginTpl
    .replace("{{GITHUB}}", cfg.github ? `<div class="or">veya</div><a class="btn" href="/auth/github?next=${encodeURIComponent(opts.next ?? "/app/")}">GitHub ile giriş (geliştirici)</a>` : "")
    .replace("{{PASSWORD}}", hasUsers ? "" : "hidden")
    .replace("{{NOPASS}}", hasUsers ? "" : `<div class="muted">E-posta girişi tanımlı değil (PASSWORD_USERS).</div>`)
    .replace("{{NEXT}}", opts.next ?? "/app/")
    .replace("{{ERROR}}", opts.error ? `<div class="err">▲ ${esc(opts.error)}</div>` : "")
    .replace("{{ALLOW}}", cfg.allowedGithubUsers.length ? cfg.allowedGithubUsers.join(" · ") : "—");
}

export function registerAuth(app: FastifyInstance, cfg: AuthConfig, store: Store) {
  app.decorateRequest("session", null);

  // Tohumlama: env'deki kullanıcılar DB'de yoksa ekle (varsa DB kazanır — uygulamadan değiştirilmiş parola korunur)
  for (const [email, hash] of Object.entries(cfg.passwordUsers)) {
    if (!hashLooksValid(hash)) { app.log.warn({ email }, "PASSWORD_USERS hash biçimi bozuk — atlandı (muhtemelen '$' bozulması; '~' biçimini kullanın)"); continue; }
    if (store.addUserIfMissing(email, email.split("@")[0]!, hash)) app.log.info({ email }, "kullanıcı tohumlandı");
  }
  const hasUsers = () => store.listUsers().length > 0;

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
    return reply.type("text/html; charset=utf-8").send(renderLogin(cfg, hasUsers(), { next: safeNext(q.next), error: q.error }));
  });

  app.get("/api/me", async (req) => req.session);
  app.get("/api/auth/config", async () => {
    const users = store.listUsers();
    return {
      github: Boolean(cfg.github), password: users.length, emails: users.map((u) => u.email),
      seedHashOk: Object.fromEntries(Object.entries(cfg.passwordUsers).map(([e, h]) => [e, hashLooksValid(h)])),
      allowedGithubUsers: cfg.allowedGithubUsers, disabled: cfg.disabled,
    };
  });

  /* ---- e-posta + parola (ana giriş yolu; kullanıcılar DB'de) ---- */
  app.post("/auth/password", async (req, reply) => {
    const b = z.object({ email: z.string().trim().email(), password: z.string().min(1), next: z.string().optional(), remember: z.string().optional() }).safeParse(req.body);
    const back = (m: string, next?: string) => reply.redirect(`/login?error=${encodeURIComponent(m)}&next=${encodeURIComponent(safeNext(next))}`);
    if (!b.success) return back("Geçerli bir e-posta adresi ve parola girin.", (req.body as { next?: string })?.next);
    const email = b.data.email.toLowerCase();
    const user = store.getUser(email);
    if (!user || !verifyPassword(b.data.password, user.hash)) {
      app.log.warn({ email, ip: req.ip }, "e-posta/parola girişi reddedildi");
      return back("E-posta veya parola hatalı.", b.data.next);
    }
    store.touchLogin(email);
    const remember = b.data.remember === "1";
    reply.header("set-cookie", sessionCookie(createSession(cfg, { u: email, name: user.name, via: "password" }, remember), isSecure(req), remember));
    return reply.redirect(safeNext(b.data.next));
  });

  /* ---- hesap: parola değiştir ---- */
  const renderHesap = (req: FastifyRequest, msg = "") => {
    const s = req.session!; const u = store.getUser(s.u);
    return hesapTpl.replace("{{NAME}}", esc(s.name)).replace("{{EMAIL}}", esc(s.u)).replace("{{VIA}}", s.via === "github" ? "GitHub" : "e-posta + parola")
      .replace("{{CHANGED}}", esc(tarih(u?.password_changed_at))).replace("{{MSG}}", msg);
  };
  app.get("/hesap", async (req, reply) => {
    const q = req.query as { ok?: string; error?: string };
    const msg = q.ok ? `<div class="msg ok">Parola değiştirildi.</div>` : q.error ? `<div class="msg err">▲ ${esc(q.error)}</div>` : "";
    return reply.type("text/html; charset=utf-8").send(renderHesap(req, msg));
  });
  app.post("/hesap/parola", async (req, reply) => {
    const b = z.object({ current: z.string().min(1), next: z.string().min(10), next2: z.string().min(1) }).safeParse(req.body);
    const back = (m: string) => reply.redirect(`/hesap?error=${encodeURIComponent(m)}`);
    if (!b.success) return back("Yeni parola en az 10 karakter olmalı.");
    if (b.data.next !== b.data.next2) return back("Yeni parolalar birbirini tutmuyor.");
    const user = store.getUser(req.session!.u);
    if (!user || !verifyPassword(b.data.current, user.hash)) return back("Mevcut parola hatalı.");
    store.setUserHash(user.email, hashPassword(b.data.next));
    app.log.info({ email: user.email }, "parola değiştirildi");
    return reply.redirect("/hesap?ok=1");
  });

  /* ---- kullanıcılar API (admin; v1: her oturum sahibi yetkili — 2 kullanıcı) ---- */
  app.get("/api/users", async () => store.listUsers());
  app.post<{ Params: { email: string } }>("/api/users/:email/password", async (req, reply) => {
    const email = z.string().email().parse(decodeURIComponent(req.params.email)).toLowerCase();
    const b = z.object({ password: z.string().min(10) }).parse(req.body);
    if (!store.setUserHash(email, hashPassword(b.password))) return reply.status(404).send({ hata: "Kullanıcı yok" });
    app.log.info({ email, by: req.session?.u }, "parola sıfırlandı");
    return { ok: true, email };
  });
  app.post("/api/users", async (req, reply) => {
    const b = z.object({ email: z.string().email(), name: z.string().trim().min(1).max(80), password: z.string().min(10) }).parse(req.body);
    if (!store.addUserIfMissing(b.email.toLowerCase(), b.name, hashPassword(b.password))) return reply.status(409).send({ hata: "Kullanıcı zaten var" });
    return reply.status(201).send({ ok: true, email: b.email.toLowerCase() });
  });

  /* ---- GitHub OAuth (Authorization Code) — yalnız geliştirici ---- */
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
