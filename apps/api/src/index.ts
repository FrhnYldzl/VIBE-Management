import { readFileSync } from "node:fs";
import { join } from "node:path";
import { loadData } from "./data.ts";
import { openDb } from "./db.ts";
import { buildApp } from "./server.ts";

const ROOT = join(import.meta.dirname, "..", "..", "..");
const { version } = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8")) as { version: string };

const app = buildApp({
  data: loadData(join(ROOT, "data")),
  db: openDb(process.env.VIBE_DB ?? join(ROOT, "var", "vibe.db")),
  version,
  webDist: join(ROOT, "apps", "web", "dist"),
  logger: true,
});

// PORT değil: dev araçları PORT'u web sunucusu için ayarlayabiliyor
const port = Number(process.env.VIBE_API_PORT ?? 4310);
app.listen({ port, host: process.env.HOST ?? "127.0.0.1" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
