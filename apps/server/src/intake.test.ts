import { mkdtempSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { buildApp } from "./app.ts";
import type { Drive } from "./intake-routes.ts";
import { openStore } from "./store.ts";

// sahte Drive: A/B/E bölümleri, alt klasörler ve dosyalar; C/D/F eksik → standarttan tamamlanır
const F = (id: string, name: string) => ({ id, name, folder: true });
const D = (id: string, name: string) => ({ id, name, folder: false, link: `https://drive.google.com/file/d/${id}/view`, modified: "2026-10-18T10:00:00Z" });
const tree: Record<string, ReturnType<typeof F | typeof D>[]> = {
  ROOTFOLDER12345: [F("a", "A. Strateji ve Business"), F("b", "B. Finans"), F("e", "E. Hukuk")],
  a: [F("a1", "A.1. İş Modeli")], a1: [D("f1", "İş Modeli Kanvas.docx"), D("f2", "Soru Seti.pdf")],
  b: [F("b1", "B.1. Bütçe")], b1: [],
  e: [F("e1", "E-1 DD")], e1: [D("f3", "Esas Sözleşme.pdf")],
};
const fakeDrive: Drive = { async list(id) { if (!(id in tree)) throw new Error(`404 ${id}`); return tree[id]!; } };

const store = openStore(":memory:");
const panelsDir = mkdtempSync(join(tmpdir(), "vibe-panels-"));
const auth = { secret: "t", allowedGithubUsers: [], passwordUsers: {}, disabled: true };
const app = buildApp({ auth, store, panelsDir, drive: async () => fakeDrive });
afterAll(async () => { await app.close(); store.close(); });

describe("intake-lite", () => {
  it("durum: Drive bağlı, panel yok", async () => {
    const s = (await app.inject("/api/intake/status")).json();
    expect(s.hazir).toBe(true); expect(s.panel).toBe(0);
    expect((await app.inject("/api/panels")).json()).toEqual([]);
  });
  it("Drive linki + ad → panel kartı + HTML servis", async () => {
    const r = await app.inject({ method: "POST", url: "/api/intake", payload: { name: "Test Teknoloji A.Ş.", short: "Test", driveRoot: "https://drive.google.com/drive/folders/ROOTFOLDER12345" } });
    expect(r.statusCode, r.body).toBe(201);
    const p = r.json();
    expect(p.slug).toBe("test-teknoloji-a-s"); expect(p.status).toBe("ok"); expect(p.files).toBe(3); expect(p.folders).toBe(3);
    expect(p.smoke.ok).toBe(true); expect(p.file).toBe("p/test-teknoloji-a-s.html");
    expect(p.bolumler.map((b: { baslik: string }) => b.baslik)).toEqual(["A. Strateji ve Business", "B. Finans", "E. Hukuk"]);
    expect(existsSync(join(panelsDir, "test-teknoloji-a-s.html"))).toBe(true);
    const html = await app.inject("/app/p/test-teknoloji-a-s.html");
    expect(html.statusCode).toBe(200); expect(html.body).toContain("Test Teknoloji A.Ş."); expect(html.body).toContain("İş Modeli Kanvas.docx");
    const data = await app.inject("/api/panels/test-teknoloji-a-s/data");
    expect(data.statusCode).toBe(200); expect(data.headers["content-type"]).toContain("javascript"); expect(data.body).toContain("INTAKE-LITE");
    expect((await app.inject("/api/panels")).json()).toHaveLength(1);
  });
  it("yeniden tarama aynı slug'ı günceller; silme dosyaları kaldırır", async () => {
    tree.b1 = [D("f4", "2026 Bütçe.xlsx")];
    const r = await app.inject({ method: "POST", url: "/api/panels/test-teknoloji-a-s/rescan" });
    expect(r.statusCode).toBe(200); expect(r.json().files).toBe(4);
    expect((await app.inject("/api/panels")).json()).toHaveLength(1);
    expect((await app.inject({ method: "DELETE", url: "/api/panels/test-teknoloji-a-s" })).statusCode).toBe(200);
    expect(existsSync(join(panelsDir, "test-teknoloji-a-s.html"))).toBe(false);
    expect((await app.inject({ method: "DELETE", url: "/api/panels/test-teknoloji-a-s" })).statusCode).toBe(404);
  });
  it("hatalar: tanınmayan link, ayrılmış kısa ad, paylaşılmamış klasör, Drive yok", async () => {
    expect((await app.inject({ method: "POST", url: "/api/intake", payload: { name: "X Y", driveRoot: "https://example.com/x" } })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: "/api/intake", payload: { name: "Onscala", driveRoot: "https://drive.google.com/drive/folders/ROOTFOLDER12345" } })).statusCode).toBe(400);
    const nf = await app.inject({ method: "POST", url: "/api/intake", payload: { name: "Yok Şirketi", driveRoot: "https://drive.google.com/drive/folders/NOTSHARED12345" } });
    expect(nf.statusCode).toBe(502); expect(nf.json().hata).toContain("paylaşıldı mı");
    const noDrive = buildApp({ auth, store: openStore(":memory:"), panelsDir: mkdtempSync(join(tmpdir(), "vibe-nd-")), drive: null });
    expect((await noDrive.inject("/api/intake/status")).json().hazir).toBe(false);
    expect((await noDrive.inject({ method: "POST", url: "/api/intake", payload: { name: "X Y", driveRoot: "https://drive.google.com/drive/folders/ROOTFOLDER12345" } })).statusCode).toBe(503);
    await noDrive.close();
  });
  it("bozuk GOOGLE_SERVICE_ACCOUNT_JSON sunucuyu düşürmez; hata health ve status'ta görünür", async () => {
    const prev = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON = '{"type":"service_account","project_id":"x","private_key":"-----BEGIN'; // yarım yapıştırma
    const bad = buildApp({ auth, store: openStore(":memory:"), panelsDir: mkdtempSync(join(tmpdir(), "vibe-bad-")) });
    const h = (await bad.inject("/api/health")).json();
    expect(h.ok).toBe(true); expect(h.ortam.GOOGLE_SERVICE_ACCOUNT).toBe(false); expect(h.ortam.GOOGLE_SERVICE_ACCOUNT_HATA).toContain("çözümlenemedi");
    const s = (await bad.inject("/api/intake/status")).json();
    expect(s.hazir).toBe(false); expect(s.adimlar[0]).toContain("Anahtar bozuk");
    await bad.close();
    if (prev === undefined) delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON; else process.env.GOOGLE_SERVICE_ACCOUNT_JSON = prev;
  });
});
