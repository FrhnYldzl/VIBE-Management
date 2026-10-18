// Intake-lite (v0.5.1): Drive Data Room linki + müvekkil adı → tarama → .data.js taslağı → kit build → smoke → panel kartı.
// Dosyalar PANELS_DIR'de (Volume: <DATA_PATH dizini>/panels), kayıt SQLite `panels` tablosunda; Ana Merkez /api/panels'ten okur.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { folderIdFromUrl, getAccessToken, makeDriveClient, serviceAccountFromEnv } from "@vibe/drive-sync";
import { ROOT } from "./paths.ts";
import type { PanelRow, Store } from "./store.ts";

const require = createRequire(import.meta.url);
const KIT = join(ROOT, "packages", "juris-panel-kit", "tools");
type Smoke = NonNullable<PanelRow["smoke"]>;
type Scan = { id: string; title: string; url: string; items: { id: string; title: string; url: string; files: { name: string; link: string; modified: string }[]; subfolders: string[] }[] }[];
const kit = require(join(KIT, "kit.js")) as { buildFile(data: string, out: string, title?: string): string; smokeFile(file: string): Smoke };
const intake = require(join(KIT, "intake.js")) as { generateDataJs(spec: unknown): string; scanRoot(drive: Drive, rootId: string): Promise<Scan>; slugify(s: string): string };

export interface Drive { list(folderId: string): Promise<{ id: string; name: string; folder: boolean; link?: string; modified?: string }[]> }
/** Varsayılan Drive istemcisi: GOOGLE_SERVICE_ACCOUNT_JSON → JWT → erişim belirteci (50 dk önbellek) */
export function driveFromEnv(): (() => Promise<Drive>) | null {
  const sa = serviceAccountFromEnv();
  if (!sa) return null;
  let cached: { token: string; at: number } | null = null;
  return async () => {
    if (!cached || Date.now() - cached.at > 50 * 60_000) cached = { token: await getAccessToken(sa), at: Date.now() };
    return makeDriveClient(cached.token) as Drive;
  };
}
export const serviceAccountEmail = (): string | null => { try { return serviceAccountFromEnv()?.client_email ?? null; } catch { return null; } };

const RESERVED = new Set(["onscala", "codemag", "zyrone", "qervan", "meown", "index", "api", "admin", "app"]);
const Body = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().regex(/^[a-z0-9-]{2,40}$/).optional(),
  short: z.string().trim().min(1).max(30).optional(),
  entities: z.array(z.string().trim().min(2).max(120)).max(6).optional(),
  driveRoot: z.string().url(),
  kickoff: z.string().trim().max(20).optional(),
});

export function registerIntake(app: FastifyInstance, store: Store, panelsDir: string, getDrive: (() => Promise<Drive>) | null) {
  const clientsDir = join(panelsDir, "clients");
  mkdirSync(clientsDir, { recursive: true });
  const who = (req: { session: { u: string } | null }) => req.session?.u ?? "anon";
  const publicRow = (p: PanelRow) => ({ ...p, file: `p/${p.slug}.html`, data: `/api/panels/${p.slug}/data` });

  app.get("/api/intake/status", async () => ({
    hazir: Boolean(getDrive), serviceAccount: serviceAccountEmail(), dizin: panelsDir, panel: store.listPanels().length,
    adimlar: getDrive ? [] : ["GOOGLE_SERVICE_ACCOUNT_JSON ortam değişkenini ekleyin (docs/ops/RAILWAY.md → Google service account)", "Data Room klasörünü service account e-postasıyla 'Görüntüleyen' olarak paylaşın"],
  }));
  app.get("/api/panels", async () => store.listPanels().map(publicRow));
  app.get<{ Params: { slug: string } }>("/api/panels/:slug/data", async (req, reply) => {
    const slug = z.string().regex(/^[a-z0-9-]{2,40}$/).parse(req.params.slug);
    const f = join(clientsDir, `${slug}.data.js`);
    if (!existsSync(f)) return reply.status(404).send({ hata: "Veri dosyası yok" });
    return reply.type("application/javascript; charset=utf-8").send(readFileSync(f, "utf8"));
  });

  async function runIntake(input: z.infer<typeof Body>, by: string) {
    if (!getDrive) throw Object.assign(new Error("Drive bağlı değil: GOOGLE_SERVICE_ACCOUNT_JSON tanımsız"), { statusCode: 503 });
    const rootId = folderIdFromUrl(input.driveRoot);
    if (!rootId) throw Object.assign(new Error("Drive klasör linki tanınmadı (…/drive/folders/<id> bekleniyor)"), { statusCode: 400 });
    const slug = input.slug ?? intake.slugify(input.name);
    if (RESERVED.has(slug) || slug.length < 2) throw Object.assign(new Error(`Kısa ad kullanılamaz: ${slug}`), { statusCode: 400 });
    const short = input.short ?? input.name.split(/\s+/)[0] ?? input.name;
    const entities = input.entities?.length ? input.entities : [input.name];
    const scannedAt = new Date().toISOString();
    const drive = await getDrive();
    let sections: Scan;
    try { sections = await intake.scanRoot(drive, rootId); }
    catch (e) { throw Object.assign(new Error(`Drive taraması başarısız: ${(e as Error).message}. Klasör service account ile paylaşıldı mı?`), { statusCode: 502 }); }
    const files = sections.reduce((a, s) => a + s.items.reduce((b, it) => b + it.files.length, 0), 0);
    const folders = sections.reduce((a, s) => a + s.items.length, 0);
    const js = intake.generateDataJs({ client: { id: slug, name: input.name, short: [short], entities, driveRoot: input.driveRoot, kickoff: input.kickoff }, sections, scannedAt });
    const dataFile = join(clientsDir, `${slug}.data.js`);
    writeFileSync(dataFile, js);
    const out = kit.buildFile(dataFile, join(panelsDir, `${slug}.html`), `${input.name} · Kurumsal Yönetim Paneli`);
    const smoke = kit.smokeFile(out);
    const row: Omit<PanelRow, "created_at"> = {
      slug, name: input.name, short: [short], entities, drive_root: input.driveRoot, status: smoke.ok ? (files ? "ok" : "warn") : "error",
      files, folders, smoke, created_by: by, scanned_at: scannedAt, error: smoke.ok ? null : smoke.bad.slice(0, 5).join(" | "),
    };
    store.upsertPanel(row);
    return { ...publicRow(store.getPanel(slug)!), bolumler: sections.map((s) => ({ baslik: s.title, altBaslik: s.items.length, dosya: s.items.reduce((a, it) => a + it.files.length, 0) })) };
  }

  app.post("/api/intake", async (req, reply) => reply.status(201).send(await runIntake(Body.parse(req.body), who(req))));
  // yeniden tarama: kayıtlı Drive kökü ve ad ile aynı akış (kullanıcının panelde işaretlediği durumlar panel_status'ta kalır)
  app.post<{ Params: { slug: string } }>("/api/panels/:slug/rescan", async (req) => {
    const p = store.getPanel(req.params.slug);
    if (!p) throw Object.assign(new Error("Panel yok"), { statusCode: 404 });
    return runIntake({ name: p.name, slug: p.slug, short: p.short[0], entities: p.entities, driveRoot: p.drive_root }, who(req));
  });
  app.delete<{ Params: { slug: string } }>("/api/panels/:slug", async (req, reply) => {
    const slug = z.string().regex(/^[a-z0-9-]{2,40}$/).parse(req.params.slug);
    if (!store.deletePanel(slug)) return reply.status(404).send({ hata: "Panel yok" });
    for (const f of [join(panelsDir, `${slug}.html`), join(clientsDir, `${slug}.data.js`)]) rmSync(f, { force: true });
    return { ok: true, slug };
  });
}
