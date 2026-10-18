import { join } from "node:path";
import { buildApp } from "./app.ts";

// Yerelde apps/server/.env (git dışı); Railway'de Variables zaten ortamda
try { process.loadEnvFile(join(import.meta.dirname, "..", ".env")); } catch { /* .env yoksa sorun değil */ }
// Anthropic anahtarı takma adları: Railway'de kurucu anahtarı "VIBE-MANAGEMENT" adıyla tuttu (Anthropic konsolundaki anahtar adı)
process.env.ANTHROPIC_API_KEY ||= process.env["VIBE-MANAGEMENT"] || process.env.VIBE_MANAGEMENT || process.env.VIBE_MANAGEMENT_API_KEY || "";

const app = buildApp({ logger: true });
// Railway PORT verir; yerelde 8787 (Ana Merkez'in eski portu)
const port = Number(process.env.PORT ?? 8787);
app.listen({ port, host: "0.0.0.0" }).then(() => {
  app.log.info(`VIBE Management → http://localhost:${port}  (/ landing · /app · /admin · /api/health)`);
}).catch((err) => { app.log.error(err); process.exit(1); });
