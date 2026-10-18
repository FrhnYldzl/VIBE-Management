// score.py ile parite: data/problems.csv, Python motorunun çıktısıdır.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { p75, scoreDataset, TURETILEN_SKORLAR, type Paket } from "./index.ts";

const ROOT = join(import.meta.dirname, "..", "..", "..");
const paketler: Paket[] = readdirSync(join(ROOT, "data", "problems"))
  .filter((f) => /^package-\d+\.json$/.test(f))
  .sort()
  .map((f) => JSON.parse(readFileSync(join(ROOT, "data", "problems", f), "utf-8")));

function csvSatirlari(): Record<string, string>[] {
  const metin = readFileSync(join(ROOT, "data", "problems.csv"), "utf-8").replace(/^﻿/, "");
  const satirlar = metin.trim().split(/\r?\n/);
  const basliklar = satirlar[0]!.split(",");
  // sektorler/odeme_istekliligi tırnaklı ve virgüllü olabilir; ilk sütunlar sabit konumda
  return satirlar.slice(1).map((s) => {
    const hucreler: string[] = [];
    let cur = "", q = false;
    for (const ch of s) {
      if (ch === '"') q = !q;
      else if (ch === "," && !q) { hucreler.push(cur); cur = ""; }
      else cur += ch;
    }
    hucreler.push(cur);
    return Object.fromEntries(basliklar.map((b, i) => [b, hucreler[i] ?? ""]));
  });
}

describe("skor motoru", () => {
  const { problemler, adaylar } = scoreDataset(paketler);

  it("tüm problemleri yükler", () => {
    expect(problemler.length).toBe(csvSatirlari().length);
  });

  it("türetilen skorlar score.py ile aynı", () => {
    const csv = new Map(csvSatirlari().map((r) => [r.id, r]));
    for (const p of problemler) {
      const r = csv.get(p.id)!;
      // Python round() yarıyı çifte yuvarlar; 0.1 tolerans yeterli
      for (const ad of TURETILEN_SKORLAR) {
        expect(Math.abs(p.hesaplanan[ad] - Number(r[ad])), `${p.id}.${ad}`).toBeLessThanOrEqual(0.1);
      }
      expect(p.plAday, `${p.id}.aday`).toBe(r.aday_mi === "EVET");
    }
  });

  it("aday listesi boş değil", () => {
    expect(adaylar.length).toBeGreaterThan(0);
  });

  it("p75 lineer interpolasyon", () => {
    expect(p75([1, 2, 3, 4, 5])).toBe(4);
    expect(p75([10])).toBe(10);
  });
});
