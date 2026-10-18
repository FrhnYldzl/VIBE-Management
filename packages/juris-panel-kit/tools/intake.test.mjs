import { describe, expect, it } from "vitest";
import { createRequire } from "node:module";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const require = createRequire(import.meta.url);
const { generateDataJs, scanRoot, idFromTitle, slugify } = require("./intake.js");
const { buildFile, smokeFile } = require("./kit.js");

const fakeDrive = { async list(id) {
  const F = (i, n) => ({ id: i, name: n, folder: true, link: "L" + i });
  const D = (i, n) => ({ id: i, name: n, folder: false, link: "https://drive.google.com/file/d/" + i + "/view", modified: "2026-10-18T10:00:00Z" });
  const map = {
    root: [F("a", "A. Strateji ve Business"), F("b", "B. Finans"), F("e", "E. Hukuk"), D("x0", "Hizmet Teklifi.pdf")],
    a: [F("a1", "A.1. İş Modeli"), F("a2", "A.2. İş Planı")], a1: [D("f1", "İş Modeli Kanvas v1.docx"), F("a1s", "Ekler")], a1s: [D("f2", "Soru seti cevapları.pdf")], a2: [],
    b: [F("b1", "B.1. Bütçe")], b1: [D("f3", "2026 Bütçe.xlsx")],
    e: [F("e1", "E-1 Hukuki Durum Tespiti")], e1: [],
  };
  if (!(id in map)) throw new Error("404 " + id); return map[id];
} };

describe("intake-lite", () => {
  it("kimlik ve slug", () => {
    expect(idFromTitle("A. Strateji")).toBe("A"); expect(idFromTitle("A.1. İş Modeli")).toBe("A1"); expect(idFromTitle("E-3 İK")).toBe("E3"); expect(idFromTitle("Diğer", "Z")).toBe("Z");
    expect(slugify("Çağrı Şirketi A.Ş.")).toBe("cagri-sirketi-a-s");
  });
  it("tarama → veri → derleme → smoke temiz", async () => {
    const sections = await scanRoot(fakeDrive, "root");
    expect(sections.map((s) => s.title)).toEqual(["A. Strateji ve Business", "B. Finans", "E. Hukuk"]);
    expect(sections[0].items[0].files.length).toBe(2); // alt klasördeki dosya dahil
    const js = generateDataJs({ client: { id: "test-as", name: "TEST A.Ş.", short: ["Test"], entities: ["Test Teknoloji A.Ş."], driveRoot: "https://drive.google.com/drive/folders/root" }, sections, scannedAt: "2026-10-18T12:00:00Z" });
    expect(js).toContain('id:"test-as"'); expect(js).toContain("İş Modeli Kanvas v1.docx"); expect(js).toContain('"C"'); // eksik bölüm standarttan tamamlandı
    const dir = mkdtempSync(join(tmpdir(), "intake-"));
    const dataFile = join(dir, "test-as.data.js"); writeFileSync(dataFile, js);
    const out = buildFile(dataFile, join(dir, "test-as.html"));
    const r = smokeFile(out);
    expect(r.bad, r.bad.join(" | ")).toEqual([]);
    expect(r.ok).toBe(true); expect(r.items).toBeGreaterThanOrEqual(6); expect(r.docs).toBeGreaterThanOrEqual(5);
  });
});
