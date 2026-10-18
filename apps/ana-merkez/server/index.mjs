// Yerel sunucu: statik dosyaları servis eder ve /api/sample → Anthropic Messages API (stream) köprüsü kurar.
// Çalıştırma: ANTHROPIC_API_KEY=... node server/index.mjs  →  http://localhost:8787
import http from "node:http"; import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const client = new Anthropic(); // ANTHROPIC_API_KEY ortam değişkeninden
const TIER = { quick: "claude-haiku-5-5", default: "claude-opus-5-5", complex: "claude-fable-5-1" }; // Hızlı / Dengeli / Derin — güncel Claude 5 ailesi
const MIME = { ".html":"text/html; charset=utf-8", ".js":"text/javascript", ".css":"text/css", ".json":"application/json", ".png":"image/png", ".svg":"image/svg+xml" };
http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/sample") {
    let raw = ""; for await (const c of req) raw += c;
    try {
      const { messages, modelTier, model, images } = JSON.parse(raw);
      const msgs = messages.map(m => ({ role: m.role, content: m.content }));
      if (images && images.length) { // görselleri son kullanıcı mesajına ekle
        const last = msgs[msgs.length - 1];
        last.content = [...images.map(i => ({ type:"image", source:{ type:"base64", media_type:i.media_type, data:i.data } })), { type:"text", text: last.content }];
      }
      res.writeHead(200, { "content-type":"text/event-stream", "cache-control":"no-cache" });
      const stream = client.messages.stream({ model: model || TIER[modelTier] || TIER.default, max_tokens: 4000, messages: msgs });
      stream.on("text", delta => res.write(`data: ${JSON.stringify({ delta })}\n\n`));
      stream.on("error", e => { res.write(`data: ${JSON.stringify({ error: String(e.message||e) })}\n\n`); res.end(); });
      await stream.finalMessage(); res.write("data: [DONE]\n\n"); res.end();
    } catch (e) { res.writeHead(500); res.end(String(e.message || e)); }
    return;
  }
  const p = path.join(root, decodeURIComponent(req.url.split("?")[0]) === "/" ? "index.html" : decodeURIComponent(req.url.split("?")[0]));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end("not found"); }
  res.writeHead(200, { "content-type": MIME[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res);
}).listen(process.env.PORT || 8787, () => console.log("MTFG Ana Merkez → http://localhost:" + (process.env.PORT || 8787)));
