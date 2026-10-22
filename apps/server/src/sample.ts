// /api/sample — Ana Merkez Vibe stüdyosunun Claude köprüsü (claude-adapter.js ile aynı sözleşme: SSE `data: {delta}` … `[DONE]`).
// v0.6.1: model kademeleri, kademe başına token tavanı, aylık USD bütçesi ve kullanım kaydı (vibe_usage) — admin → Vibe Maliyet.
import Anthropic from "@anthropic-ai/sdk";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { Store } from "./store.ts";

export const TIER = { quick: "claude-haiku-5-5", default: "claude-opus-5-5", complex: "claude-fable-5-1" } as const;
type Tier = keyof typeof TIER;

/** USD / milyon token — kaynak: platform.claude.com/docs/en/about-claude/pricing (22.10.2026'da okundu). Fiyat değişirse yalnız burası güncellenir. */
export const PRICES: Record<string, { in: number; out: number; cw: number; cr: number; longIn?: number; longOut?: number; longCw?: number; longCr?: number; longFrom?: number }> = {
  "claude-fable-5-1": { in: 10, out: 50, cw: 12.5, cr: 0.25 },
  "claude-opus-5-5": { in: 4, out: 20, cw: 5, cr: 0.2 },
  "claude-sonnet-5-5": { in: 2, out: 10, cw: 2.5, cr: 0.1 },
  // Haiku 5.5 istem uzunluğuna göre fiyatlanır: 100.000 token üstü istek yüksek tarifeden
  "claude-haiku-5-5": { in: 0.1, out: 0.5, cw: 0.125, cr: 0.01, longFrom: 100_000, longIn: 0.5, longOut: 2.5, longCw: 0.625, longCr: 0.05 },
};
export const PRICE_SOURCE = { url: "https://platform.claude.com/docs/en/about-claude/pricing", okundu: "2026-10-22" };

export interface Usage { input_tokens: number; output_tokens: number; cache_creation_input_tokens?: number | null; cache_read_input_tokens?: number | null }
export function costUsd(model: string, u: Usage): number {
  const p = PRICES[model]; if (!p) return 0;
  const cw = u.cache_creation_input_tokens ?? 0, cr = u.cache_read_input_tokens ?? 0;
  const prompt = u.input_tokens + cw + cr; const long = p.longFrom != null && prompt > p.longFrom;
  const r = long ? { in: p.longIn!, out: p.longOut!, cw: p.longCw!, cr: p.longCr! } : p;
  return (u.input_tokens * r.in + u.output_tokens * r.out + cw * r.cw + cr * r.cr) / 1_000_000;
}

export interface Budget { aylikUsd: number; uyariYuzde: number; tierMax: Record<Tier, number>; kapali: Tier[] }
export const DEFAULT_BUDGET = (): Budget => ({
  aylikUsd: Number(process.env.VIBE_AYLIK_TAVAN_USD) || 100, uyariYuzde: 80,
  tierMax: { quick: 4000, default: 16000, complex: 32000 }, kapali: [],
});
export const budgetOf = (store: Store): Budget => ({ ...DEFAULT_BUDGET(), ...(store.getSetting<Partial<Budget>>("vibe_butce")?.value ?? {}) });
export const monthStart = (d = new Date()) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString();

const body = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })).min(1),
  modelTier: z.enum(["quick", "default", "complex"]).optional(),
  model: z.string().optional(),
  images: z.array(z.object({ media_type: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]), data: z.string() })).optional(),
  maxTokens: z.number().int().min(256).max(32000).optional(), // uzun yapılandırılmış çıktılar (eğitim tasarımı) için
  kaynak: z.string().max(40).optional(), // kullanım kırılımı: studyo · egitim-tasarim · vibe-duzenle …
});
const BudgetBody = z.object({
  aylikUsd: z.number().min(0).max(100000), uyariYuzde: z.number().min(10).max(100),
  tierMax: z.object({ quick: z.number().int().min(256).max(32000), default: z.number().int().min(256).max(32000), complex: z.number().int().min(256).max(32000) }),
  kapali: z.array(z.enum(["quick", "default", "complex"])).default([]),
});

export function registerSample(app: FastifyInstance, store: Store) {
  let client: Anthropic | null = null;
  const getClient = () => (client ??= new Anthropic()); // ANTHROPIC_API_KEY ortamdan
  const who = (req: { session?: { u: string } | null }) => req.session?.u ?? "anon";

  app.post("/api/sample", async (req, reply) => {
    const b = body.parse(req.body);
    if (!process.env.ANTHROPIC_API_KEY) {
      return reply.status(503).send("ANTHROPIC_API_KEY tanımlı değil — Railway/.env üzerinden ekleyin.");
    }
    const bud = budgetOf(store); const tier: Tier = b.modelTier ?? "default";
    if (bud.kapali.includes(tier)) return reply.status(403).send(`"${tier}" kademesi admin tarafından kapatıldı — başka bir kademe seçin.`);
    const spent = store.usageSum(monthStart()).usd;
    if (bud.aylikUsd > 0 && spent >= bud.aylikUsd) {
      return reply.status(402).send(`Aylık Vibe bütçesi doldu ($${spent.toFixed(2)} / $${bud.aylikUsd}). Admin → Vibe Maliyet'ten tavanı artırabilirsiniz.`);
    }
    const msgs: Anthropic.MessageParam[] = b.messages.map((m) => ({ role: m.role, content: m.content }));
    if (b.images?.length) {
      const last = msgs[msgs.length - 1]!;
      last.content = [
        ...b.images.map((i) => ({ type: "image" as const, source: { type: "base64" as const, media_type: i.media_type, data: i.data } })),
        { type: "text" as const, text: String(last.content) },
      ];
    }
    const model = b.model && PRICES[b.model] ? b.model : TIER[tier];
    // kademe tavanı varsayılan; uzun yapılandırılmış çıktı isteyen akış (eğitim tasarımı) açıkça maxTokens gönderir (≤ 32.000)
    const maxTokens = b.maxTokens ?? bud.tierMax[tier];
    reply.raw.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache", connection: "keep-alive" });
    try {
      const stream = getClient().messages.stream({ model, max_tokens: maxTokens, messages: msgs });
      stream.on("text", (delta) => reply.raw.write(`data: ${JSON.stringify({ delta })}\n\n`));
      const final = await stream.finalMessage();
      // max_tokens'a takıldıysa istemci bilsin (JSON yarım kalmış olabilir)
      if (final.stop_reason === "max_tokens") reply.raw.write(`data: ${JSON.stringify({ truncated: true })}\n\n`);
      const usd = costUsd(model, final.usage as Usage);
      store.addUsage({ user: who(req), model, tier, kaynak: b.kaynak ?? "studyo", input: final.usage.input_tokens, output: final.usage.output_tokens,
        cacheWrite: final.usage.cache_creation_input_tokens ?? 0, cacheRead: final.usage.cache_read_input_tokens ?? 0, usd, durum: final.stop_reason === "max_tokens" ? "kesildi" : "ok" });
      const ay = spent + usd;
      reply.raw.write(`data: ${JSON.stringify({ usage: { model, tier, input: final.usage.input_tokens, output: final.usage.output_tokens, usd, ayUsd: ay, tavanUsd: bud.aylikUsd, uyari: bud.aylikUsd > 0 && ay >= bud.aylikUsd * bud.uyariYuzde / 100 } })}\n\n`);
      reply.raw.write("data: [DONE]\n\n");
    } catch (e) {
      const msg = e instanceof Anthropic.APIError ? `${e.status} ${e.message}` : String((e as Error).message ?? e);
      reply.raw.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
    }
    reply.raw.end();
    return reply;
  });

  /* ---- maliyet ve bütçe (admin → Vibe Maliyet) ---- */
  app.get("/api/vibe/usage", async () => {
    const bud = budgetOf(store), ms = monthStart(); const ay = store.usageSum(ms);
    const d30 = new Date(Date.now() - 30 * 86400000).toISOString();
    return {
      ay: { baslangic: ms, ...ay }, butce: bud, butceGuncelleme: store.getSetting("vibe_butce"),
      oran: bud.aylikUsd > 0 ? ay.usd / bud.aylikUsd : null, uyari: bud.aylikUsd > 0 && ay.usd >= bud.aylikUsd * bud.uyariYuzde / 100,
      kullanici: store.usageBy(ms, "user"), model: store.usageBy(ms, "model"), kaynak: store.usageBy(ms, "kaynak"), kademe: store.usageBy(ms, "tier"),
      gunluk: store.usageBy(d30, "gun"), son: store.usageRecent(25),
      kademeler: Object.fromEntries(Object.entries(TIER).map(([k, m]) => [k, { model: m, fiyat: PRICES[m], maxTokens: bud.tierMax[k as Tier] }])),
      fiyatKaynak: PRICE_SOURCE, anahtar: Boolean(process.env.ANTHROPIC_API_KEY),
    };
  });
  app.put("/api/vibe/budget", async (req) => {
    const b = BudgetBody.parse(req.body);
    store.setSetting("vibe_butce", b, who(req));
    return { ok: true, butce: budgetOf(store) };
  });
}
