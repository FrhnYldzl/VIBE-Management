// /api/sample — Ana Merkez Vibe stüdyosunun Claude köprüsü (claude-adapter.js ile aynı sözleşme: SSE `data: {delta}` … `[DONE]`).
// Kaynak: apps/ana-merkez/server/index.mjs (v0.2) → Fastify'a taşındı. Model kademeleri güncel Claude 5 ailesi.
import Anthropic from "@anthropic-ai/sdk";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export const TIER = { quick: "claude-haiku-5-5", default: "claude-opus-5-5", complex: "claude-fable-5-1" } as const;

const body = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })).min(1),
  modelTier: z.enum(["quick", "default", "complex"]).optional(),
  model: z.string().optional(),
  images: z.array(z.object({ media_type: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]), data: z.string() })).optional(),
});

export function registerSample(app: FastifyInstance) {
  let client: Anthropic | null = null;
  const getClient = () => (client ??= new Anthropic()); // ANTHROPIC_API_KEY ortamdan

  app.post("/api/sample", async (req, reply) => {
    const b = body.parse(req.body);
    if (!process.env.ANTHROPIC_API_KEY) {
      return reply.status(503).send("ANTHROPIC_API_KEY tanımlı değil — Railway/.env üzerinden ekleyin (Vibe v0.6.0).");
    }
    const msgs: Anthropic.MessageParam[] = b.messages.map((m) => ({ role: m.role, content: m.content }));
    if (b.images?.length) {
      const last = msgs[msgs.length - 1]!;
      last.content = [
        ...b.images.map((i) => ({ type: "image" as const, source: { type: "base64" as const, media_type: i.media_type, data: i.data } })),
        { type: "text" as const, text: String(last.content) },
      ];
    }
    const model = b.model ?? TIER[b.modelTier ?? "default"];
    reply.raw.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache", connection: "keep-alive" });
    try {
      const stream = getClient().messages.stream({ model, max_tokens: 16000, messages: msgs });
      stream.on("text", (delta) => reply.raw.write(`data: ${JSON.stringify({ delta })}\n\n`));
      await stream.finalMessage();
      reply.raw.write("data: [DONE]\n\n");
    } catch (e) {
      const msg = e instanceof Anthropic.APIError ? `${e.status} ${e.message}` : String((e as Error).message ?? e);
      reply.raw.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
    }
    reply.raw.end();
    return reply;
  });
}
