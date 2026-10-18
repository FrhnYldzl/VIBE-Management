import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { loadData } from "./data.ts";
import { openDb } from "./db.ts";
import { buildApp } from "./server.ts";

const db = openDb(":memory:");
const app = buildApp({ data: loadData(join(import.meta.dirname, "..", "..", "..", "data")), db, version: "0.0.0-test" });
afterAll(() => db.close());

describe("api", () => {
  it("meta", async () => {
    const r = await app.inject("/api/meta");
    expect(r.statusCode).toBe(200);
    expect(r.json().problemSayisi).toBeGreaterThanOrEqual(40);
  });

  it("Türkçe aksan-toleranslı arama", async () => {
    const r = await app.inject("/api/problems?q=sozlesme");
    expect(r.json().items.some((p: { id: string }) => p.id === "sozlesme-inceleme-risk")).toBe(true);
  });

  it("filtre + sıralama", async () => {
    const r = await app.inject("/api/problems?aday=1&sirala=private_label");
    const items = r.json().items as { plAday: boolean; hesaplanan: { private_label: number } }[];
    expect(items.every((p) => p.plAday)).toBe(true);
    expect(items[0]!.hesaplanan.private_label).toBeGreaterThanOrEqual(items.at(-1)!.hesaplanan.private_label);
  });

  it("problem detay + 404", async () => {
    expect((await app.inject("/api/problems/marka-ip-tescil-izleme")).json().problem.ad).toMatch(/Marka/);
    expect((await app.inject("/api/problems/yok")).statusCode).toBe(404);
  });

  it("geçersiz filtre 400", async () => {
    expect((await app.inject("/api/problems?fonksiyon=uydurma")).statusCode).toBe(400);
  });

  it("sinyal kaydı ve özet", async () => {
    const r = await app.inject({ method: "POST", url: "/api/signals", payload: { tip: "bos_sonuc", sorgu: "e-arşiv", sonuc_sayisi: 0 } });
    expect(r.statusCode).toBe(201);
    const ozet = (await app.inject("/api/signals")).json().ozet;
    expect(ozet.bosSorgular[0].sorgu).toBe("e-arşiv");
  });

  it("geri bildirim + triage", async () => {
    const r = await app.inject({ method: "POST", url: "/api/feedback", payload: { tur: "istek", mesaj: "Pano görünümü", sayfa: "/raf" } });
    expect(r.statusCode).toBe(201);
    const id = r.json().id;
    const t = await app.inject({ method: "PATCH", url: `/api/feedback/${id}`, payload: { triage: "simdi" } });
    expect(t.json().triage).toBe("simdi");
  });
});
