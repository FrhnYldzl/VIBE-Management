// Paylaşımlı durum API'si (oturum gerekir — onRequest kancası /api/* için zaten zorunlu kılar)
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { Store } from "./store.ts";

const STATUSES = ["done", "review", "progress", "input", "pending"] as const;
const client = z.string().regex(/^[a-z0-9-]{1,40}$/);
const VIBE_KEYS = ["sessions", "library", "egitim", "dogrulama"] as const; // egitim: oturum durum/doküman (v0.5.2) · dogrulama: panel doğrulama checklist'i (v0.5.5)
/* panel düzenlemeleri: tür başına izin verilen alanlar (metin, ≤ 600 karakter) */
const EDIT_KINDS = {
  action: ["owner", "action", "prio", "output", "status"],
  decision: ["topic", "decision", "status"],
  meeting: ["d", "t", "who", "agenda", "delivered", "undelivered", "url", "st"],
  note: ["key", "text"],
} as const;
const editKind = z.enum(["action", "decision", "meeting", "note"]);
const editId = z.string().regex(/^[A-Za-z0-9:_.-]{1,80}$/);

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

  /* ---- Kurumsal Yönetim Skoru: panel hesaplar ve gönderir; admin ve Ana Merkez son anlık görüntüyü okur ---- */
  const Score = z.object({
    toplam: z.number().int().min(0).max(100), harf: z.string().max(2), seviye: z.string().max(40), versiyon: z.string().max(40).optional(), veriTarihi: z.string().max(20).optional(), hesap: z.string().max(40).optional(),
    kriterler: z.array(z.object({ k: z.string().max(20), t: z.string().max(60), w: z.number(), puan: z.number().min(0).max(100), not: z.string().max(200).optional() })).max(30),
  });
  app.get("/api/panels/scores", async () => store.scores());
  app.put<{ Params: { client: string } }>("/api/panels/:client/score", async (req) => {
    const c = client.parse(req.params.client); const s = Score.parse(req.body);
    store.setScore(c, s, who(req));
    return { ok: true, client: c, toplam: s.toplam, harf: s.harf };
  });

  /* ---- panel düzenlemeleri: aksiyon / karar / toplantı / not (yeniden taramada korunur) ---- */
  app.get<{ Params: { client: string } }>("/api/panels/:client/edits", async (req) => {
    const c = client.parse(req.params.client);
    const out: Record<string, unknown[]> = { action: [], decision: [], meeting: [], note: [] };
    for (const e of store.panelEdits(c)) (out[e.kind] ??= []).push(e);
    return { client: c, ...out };
  });
  app.put<{ Params: { client: string; kind: string } }>("/api/panels/:client/edits/:kind", async (req) => {
    const c = client.parse(req.params.client); const kind = editKind.parse(req.params.kind);
    const allowed = EDIT_KINDS[kind] as readonly string[];
    const b = z.object({ id: editId.optional() }).passthrough().parse(req.body);
    const data: Record<string, string> = {};
    for (const k of allowed) if (typeof b[k] === "string") data[k] = (b[k] as string).slice(0, 600);
    if (!Object.keys(data).length) throw Object.assign(new Error("Boş kayıt"), { statusCode: 400 });
    const id = b.id ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    store.setPanelEdit(c, kind, id, data, who(req));
    return { ok: true, client: c, kind, id, ...data };
  });
  app.delete<{ Params: { client: string; kind: string; id: string } }>("/api/panels/:client/edits/:kind/:id", async (req, reply) => {
    const c = client.parse(req.params.client); const kind = editKind.parse(req.params.kind); const id = editId.parse(req.params.id);
    if (!store.deletePanelEdit(c, kind, id)) return reply.status(404).send({ hata: "Kayıt yok" });
    return { ok: true };
  });

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
