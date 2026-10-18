import { readFileSync } from "node:fs";
import { join } from "node:path";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import { z } from "zod";
import { type AuthConfig, configFromEnv } from "./auth.ts";
import { registerAuth } from "./auth-routes.ts";
import { ADMIN_DIR, ANA_MERKEZ_PUBLIC, DATA_DIR, LANDING_DIR, VERSION } from "./paths.ts";
import { registerSample } from "./sample.ts";

/**
 * Tek servis:
 *   /            landing (herkese açık)
 *   /app/        MTFG Ana Merkez (portföy + müvekkil panelleri + Vibe)
 *   /admin/      yönetim paneli
 *   /api/*       health · roadmap · releases · sample (Claude köprüsü)
 * Kimlik: landing, /login, /auth/*, /api/health hariç her yol oturum ister (auth-routes.ts).
 */
export function buildApp({ logger = false, auth = configFromEnv() }: { logger?: boolean; auth?: AuthConfig } = {}) {
  const app = Fastify({ logger, trustProxy: true }); // Railway proxy → x-forwarded-proto ile https algısı
  const json = <T>(name: string) => JSON.parse(readFileSync(join(DATA_DIR, name), "utf-8")) as T;
  if (auth.disabled) app.log.warn("KİMLİK KAPALI: hiçbir giriş yöntemi tanımlı değil (geliştirme modu). Production'da SESSION_SECRET + GITHUB_* / PASSWORD_USERS zorunlu.");
  if (!auth.disabled && !auth.secret) throw new Error("SESSION_SECRET tanımlı değil");
  app.addContentTypeParser("application/x-www-form-urlencoded", { parseAs: "string" }, (_req, body, done) => done(null, Object.fromEntries(new URLSearchParams(body as string))));
  registerAuth(app, auth);

  app.setErrorHandler((err, _req, reply) => {
    if (err instanceof z.ZodError) return reply.status(400).send({ hata: "Geçersiz istek", ayrinti: err.issues });
    app.log.error(err);
    const e = err as { statusCode?: number; message?: string };
    return reply.status(e.statusCode ?? 500).send({ hata: e.message ?? "Sunucu hatası" });
  });

  app.get("/api/health", async () => ({ ok: true, surum: VERSION, vibe: Boolean(process.env.ANTHROPIC_API_KEY), kimlik: auth.disabled ? "kapalı" : "açık" }));
  app.get("/api/roadmap", async () => json("roadmap.json"));
  app.get("/api/releases", async () => ({ guncel: VERSION, ...json<Record<string, unknown>>("releases.json") }));
  registerSample(app);

  // statik yüzeyler — her biri kendi kökünde, göreli yollar (onscala.html, claude-adapter.js) çalışır
  app.register(fastifyStatic, { root: LANDING_DIR, prefix: "/", wildcard: false, decorateReply: true });
  app.register(fastifyStatic, { root: ANA_MERKEZ_PUBLIC, prefix: "/app/", wildcard: false, decorateReply: false });
  app.register(fastifyStatic, { root: ADMIN_DIR, prefix: "/admin/", wildcard: false, decorateReply: false });
  app.get("/app", (_req, reply) => reply.redirect("/app/"));
  app.get("/admin", (_req, reply) => reply.redirect("/admin/"));

  return app;
}
