// Paylaşımlı durum API'si (oturum gerekir — onRequest kancası /api/* için zaten zorunlu kılar)
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { Store } from "./store.ts";

const STATUSES = ["done", "review", "progress", "input", "pending"] as const;
const client = z.string().regex(/^[a-z0-9-]{1,40}$/);
const VIBE_KEYS = ["sessions", "library", "egitim"] as const; // egitim: oturum durum düzeltmeleri + eklenen dokümanlar (v0.5.2)

export function registerState(app: FastifyInstance, store: Store) {
  const who = (req: { session: { u: string } | null }) => req.session?.u ?? "anon";

  /* ---- panel durum çipleri ---- */
  app.get<{ Params: { client: string } }>("/api/panels/:client/status", async (req) => {
    const c = client.parse(req.params.client);
    return { client: c, overrides: store.panelStatus(c) };
  });
  app.put<{ Params: { client: string } }>("/api/panels/:client/status", async (req, reply) => {
    const c = client.parse(req.params.client);
    const b = z.object({ key: z.string().min(1).max(80), status: z.enum(STATUSES) }).parse(req.body);
    store.setPanelStatus(c, b.key, b.status, who(req));
    return reply.status(200).send({ ok: true, client: c, key: b.key, status: b.status });
  });
  // tek seferlik taşıma: tarayıcıdaki tüm override haritası
  app.put<{ Params: { client: string } }>("/api/panels/:client/status/bulk", async (req) => {
    const c = client.parse(req.params.client);
    const b = z.record(z.string().min(1).max(80), z.enum(STATUSES)).parse(req.body);
    for (const [k, s] of Object.entries(b)) store.setPanelStatus(c, k, s, who(req));
    return { ok: true, client: c, adet: Object.keys(b).length, overrides: store.panelStatus(c) };
  });
  app.get<{ Params: { client: string } }>("/api/panels/:client/status/log", async (req) => store.panelStatusRows(client.parse(req.params.client)));

  /* ---- Vibe oturumları / kütüphane ---- */
  app.get("/api/vibe/state", async () => {
    const out: Record<string, unknown> = {};
    for (const k of VIBE_KEYS) { const r = store.vibeState(k); out[k] = r ? { value: r.value, updated_by: r.updated_by, updated_at: r.updated_at } : null; }
    return out;
  });
  app.put<{ Params: { key: string } }>("/api/vibe/state/:key", async (req) => {
    const key = z.enum(VIBE_KEYS).parse(req.params.key);
    const value = z.array(z.record(z.string(), z.unknown())).max(2000).parse(req.body);
    if (JSON.stringify(value).length > 4_000_000) throw Object.assign(new Error("Veri çok büyük (4 MB sınırı)"), { statusCode: 413 });
    store.setVibeState(key, value, who(req));
    return { ok: true, key, adet: value.length };
  });

  app.get("/api/state/stats", async () => ({ path: store.path, ...store.stats() }));
}
