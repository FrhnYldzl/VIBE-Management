import { afterAll, describe, expect, it } from "vitest";
import ExcelJS from "exceljs";
import { buildApp } from "./app.ts";
import { cellValue, inline, parseMd } from "./export.ts";
import { openStore } from "./store.ts";

const store = openStore(":memory:");
const app = buildApp({ auth: { secret: "t", allowedGithubUsers: [], passwordUsers: {}, disabled: true }, store, drive: null });
afterAll(async () => { await app.close(); store.close(); });

const MD = `# Haftalık Brifing
Bu hafta **3 kritik** aksiyon ve *2 karar* var.

## Aksiyonlar
- Codemag teminat mektubu
- Onscala bütçe planı

1. Birinci
2. İkinci

| Şirket | Tahsilat | Oran |
|---|---|---|
| Fevup | 641.993,34 ₺ | %45 |
| Zyrone | 195.000 ₺ | %0 |

> Not: rakamlar beyandır.`;

describe("dışa aktarma", () => {
  it("markdown ayrıştırma ve hücre değerleri", () => {
    const b = parseMd(MD);
    expect(b.map((x) => x.t)).toEqual(["h", "p", "h", "ul", "ol", "table", "quote"]);
    expect(inline("a **b** c *d* `e`").map((p) => p.text)).toEqual(["a ", "b", " c ", "d", " ", "e"]);
    expect(cellValue("641.993,34 ₺")).toBe(641993.34); expect(cellValue("195.000 ₺")).toBe(195000); expect(cellValue("%45")).toBeCloseTo(0.45); expect(cellValue("Fevup")).toBe("Fevup");
  });
  it("Word (.docx) — Juris anteti", async () => {
    const r = await app.inject({ method: "POST", url: "/api/export", payload: { format: "docx", title: "Haftalık Brifing W43", md: MD, meta: { kapsam: "Tüm portföy" } } });
    expect(r.statusCode).toBe(200); expect(r.headers["content-type"]).toContain("wordprocessingml");
    expect(r.rawPayload.subarray(0, 2).toString()).toBe("PK"); expect(String(r.headers["content-disposition"])).toContain(".docx");
  });
  it("Excel (.xlsx) — özet + tablo sayfası, sayılar sayı", async () => {
    const r = await app.inject({ method: "POST", url: "/api/export", payload: { format: "xlsx", title: "Haftalık Brifing W43", md: MD } });
    expect(r.statusCode).toBe(200);
    const wb = new ExcelJS.Workbook(); await wb.xlsx.load(r.rawPayload as unknown as ArrayBuffer);
    expect(wb.worksheets.map((w) => w.name)).toEqual(["Özet", "Tablo 1"]);
    const t = wb.getWorksheet("Tablo 1")!; expect(t.getCell("A5").value).toBe("Şirket"); expect(t.getCell("B6").value).toBe(641993.34); expect(t.getCell("C6").value).toBeCloseTo(0.45);
    expect((await app.inject({ method: "POST", url: "/api/export", payload: { format: "pdf", title: "x", md: "y" } })).statusCode).toBe(400);
  });
});
