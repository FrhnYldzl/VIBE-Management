import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Monorepo kökü (apps/server/src → ../../..) */
export const ROOT = join(import.meta.dirname, "..", "..", "..");
export const DATA_DIR = join(ROOT, "data");
export const ANA_MERKEZ_PUBLIC = join(ROOT, "apps", "ana-merkez", "public");
export const LANDING_DIR = join(ROOT, "apps", "server", "public");
export const ADMIN_DIR = join(ROOT, "apps", "server", "admin");

export const VERSION = (JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8")) as { version: string }).version;
