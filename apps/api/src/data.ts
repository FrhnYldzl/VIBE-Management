// Veri katmanı v0.1: data/ altındaki JSON dosyaları tek doğruluk kaynağı.
// v0.2'de editörle birlikte yazılabilir bir depoya taşınacak; arayüz (DataStore) aynı kalır.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { scoreDataset, type Paket, type ScoredDataset, type Sektor } from "@vibe/core";

export interface DataStore extends ScoredDataset {
  sektorler: Sektor[];
  paketler: Pick<Paket, "paket" | "ad" | "surum">[];
}

export function loadData(dataDir: string): DataStore {
  const pkgDir = join(dataDir, "problems");
  const paketler: Paket[] = readdirSync(pkgDir)
    .filter((f) => /^package-\d+\.json$/.test(f))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(pkgDir, f), "utf-8")));
  const { sektorler } = JSON.parse(readFileSync(join(dataDir, "sectors.json"), "utf-8")) as { sektorler: Sektor[] };
  return {
    ...scoreDataset(paketler),
    sektorler,
    paketler: paketler.map(({ paket, ad, surum }) => ({ paket, ad, surum })),
  };
}

/** Türkçe duyarlı, aksan-toleranslı arama anahtarı. */
export function normalize(s: string): string {
  return s
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/\s+/g, " ")
    .trim();
}
