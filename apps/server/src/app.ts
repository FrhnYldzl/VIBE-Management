import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import { z } from "zod";
import { type AuthConfig, configFromEnv } from "./auth.ts";
import { registerAuth } from "./auth-routes.ts";
import { type Drive, driveConfigError, driveFromEnv, registerIntake } from "./intake-routes.ts";
import { registerDailySync } from "./sync-job.ts";
import { ADMIN_DIR, ANA_MERKEZ_PUBLIC, DATA_DIR, LANDING_DIR, ROOT, VERSION } from "./paths.ts";
import { registerSample } from "./sample.ts";
import { registerState } from "./state-routes.ts";
import { openStore, type Store } from "./store.ts";

/**
 * Tek servis:
 *   /            landing (herkese açık)
 *   /app/        MTFG Ana Merkez (portföy + müvekkil panelleri + Vibe)
 *   /admin/      yönetim paneli
 *   /api/*       health · roadmap · releases · sample (Claude köprüsü)
 * Kimlik: landing, /login, /auth/*, /api/health hariç her yol oturum ister (auth-routes.ts).
 */
export function buildApp({ logger = false, auth = configFromEnv(), store, panelsDir, drive }: { logger?: boolean; auth?: AuthConfig; store?: Store; panelsDir?: string; drive?: (() => Promise<Drive>) | null } = {}) {
  const app = Fastify({ logger, trustProxy: true }); // Railway proxy → x-forwarded-proto ile https algısı
  const json = <T>(name: string) => JSON.parse(readFileSync(join(DATA_DIR, name), "utf-8")) as T;
  // Paylaşımlı durum + kullanıcılar: DATA_PATH (Railway Volume, örn. /data/vibe.db) · yerelde var/vibe.db
  const dataPath = process.env.DATA_PATH ?? join(ROOT, "var", "vibe.db");
  const db = store ?? openStore(dataPath);
  // Intake-lite panelleri: Volume'de DB'nin yanında (PANELS_DIR ile ezilebilir)
  const PANELS_DIR = panelsDir ?? process.env.PANELS_DIR ?? join(dirname(dataPath), "panels");
  const getDrive = drive === undefined ? driveFromEnv() : drive;
  app.addHook("onClose", async () => { if (!store) db.close(); });
  if (auth.disabled) app.log.warn("KİMLİK KAPALI: hiçbir giriş yöntemi tanımlı değil (geliştirme modu). Production'da SESSION_SECRET + GITHUB_* / PASSWORD_USERS zorunlu.");
  if (!auth.disabled && !auth.secret) throw new Error("SESSION_SECRET tanımlı değil");
  app.addContentTypeParser("application/x-www-form-urlencoded", { parseAs: "string" }, (_req, body, done) => done(null, Object.fromEntries(new URLSearchParams(body as string))));
  registerAuth(app, auth, db);

  app.setErrorHandler((err, _req, reply) => {
    if (err instanceof z.ZodError) return reply.status(400).send({ hata: "Geçersiz istek", ayrinti: err.issues });
    app.log.error(err);
    const e = err as { statusCode?: number; message?: string };
    return reply.status(e.statusCode ?? 500).send({ hata: e.message ?? "Sunucu hatası" });
  });

  app.get("/api/health", async () => ({
    ok: true, surum: VERSION, vibe: Boolean(process.env.ANTHROPIC_API_KEY), kimlik: auth.disabled ? "kapalı" : "açık",
    db: db.path === ":memory:" ? "bellek" : db.path.startsWith("/data") ? "volume" : "yerel dosya",
    // teşhis: hangi ortam değişkenleri sürece ulaşmış (yalnız varlık/adet, değer yok)
    ortam: {
      NODE_ENV: process.env.NODE_ENV ?? null,
      SESSION_SECRET: Boolean(process.env.SESSION_SECRET),
      PASSWORD_USERS: Object.keys(auth.passwordUsers).length,
      kullaniciDB: db.listUsers().length,
      GITHUB: Boolean(auth.github),
      DATA_PATH: process.env.DATA_PATH ?? null,
      ANTHROPIC_API_KEY: Boolean(process.env.ANTHROPIC_API_KEY),
      GUNLUK_SENKRON: db.lastDailyRun() ?? null,
      GOOGLE_SERVICE_ACCOUNT: Boolean(getDrive), GOOGLE_SERVICE_ACCOUNT_HATA: driveConfigError, PANELS_DIR,
      RAILWAY_SERVICE: process.env.RAILWAY_SERVICE_NAME ?? null,
      RAILWAY_ENV: process.env.RAILWAY_ENVIRONMENT_NAME ?? null,
      commit: (process.env.RAILWAY_GIT_COMMIT_SHA ?? "").slice(0, 7) || null,
      // anahtar benzeri değişken ADLARI (değer asla gösterilmez) — ad yazımı teşhisi için
      anahtarAdlari: Object.keys(process.env).filter((k) => /vibe|anthropic|claude/i.test(k)).sort(),
    },
  }));
  app.get("/api/roadmap", async () => json("roadmap.json"));
  app.get("/api/releases", async () => ({ guncel: VERSION, ...json<Record<string, unknown>>("releases.json") }));
  registerSample(app);
  registerState(app, db);
  const intake = registerIntake(app, db, PANELS_DIR, getDrive);
  registerDailySync(app, db, getDrive, intake.rescan, { schedule: !process.env.VITEST && process.env.DAILY_SYNC !== "0" });

  // statik yüzeyler — her biri kendi kökünde, göreli yollar (onscala.html, claude-adapter.js) çalışır
  app.register(fastifyStatic, { root: LANDING_DIR, prefix: "/", wildcard: false, decorateReply: true });
  app.register(fastifyStatic, { root: ANA_MERKEZ_PUBLIC, prefix: "/app/", wildcard: false, decorateReply: false });
  // Intake-lite ile üretilen paneller: /app/p/<slug>.html (iframe, Ana Merkez ile aynı origin → API çerezi geçer)
  // wildcard:true şart — paneller çalışma anında üretilir, wildcard:false başlangıçtaki dosyaları rotaya bağlar
  app.register(fastifyStatic, { root: PANELS_DIR, prefix: "/app/p/", wildcard: true, decorateReply: false, index: false, list: false });
  app.register(fastifyStatic, { root: ADMIN_DIR, prefix: "/admin/", wildcard: false, decorateReply: false });
  app.get("/app", (_req, reply) => reply.redirect("/app/"));
  app.get("/admin", (_req, reply) => reply.redirect("/admin/"));

  return app;
}
