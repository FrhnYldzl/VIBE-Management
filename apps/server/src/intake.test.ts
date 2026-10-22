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
const fakeDrive: Drive = {
  async list(id) { if (!(id in tree)) return []; return tree[id]!; }, // gerçek Drive: erişilemeyen klasörde boş liste
  async get(id) { if (id === "FILE_NOT_FOLDER1") return { id, name: "Hizmet Teklifi.pdf", folder: false }; if (!(id in tree)) throw new Error(`404 ${id}`); return { id, name: id, folder: true }; },
};

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
    expect(nf.statusCode).toBe(502); expect(nf.json().hata).toContain("paylaşılmamış");
    const nfold = await app.inject({ method: "POST", url: "/api/intake", payload: { name: "Dosya Linki", driveRoot: "https://drive.google.com/drive/folders/FILE_NOT_FOLDER1" } });
    expect(nfold.statusCode).toBe(400); expect(nfold.json().hata).toContain("klasör değil");
    tree.EMPTYROOT1234567 = [D("z", "tek dosya.pdf")];
    const empty = await app.inject({ method: "POST", url: "/api/intake", payload: { name: "Boş Kök", driveRoot: "https://drive.google.com/drive/folders/EMPTYROOT1234567" } });
    expect(empty.statusCode).toBe(400); expect(empty.json().hata).toContain("alt klasör yok");
    const noDrive = buildApp({ auth, store: openStore(":memory:"), panelsDir: mkdtempSync(join(tmpdir(), "vibe-nd-")), drive: null });
    expect((await noDrive.inject("/api/intake/status")).json().hazir).toBe(false);
    expect((await noDrive.inject({ method: "POST", url: "/api/intake", payload: { name: "X Y", driveRoot: "https://drive.google.com/drive/folders/ROOTFOLDER12345" } })).statusCode).toBe(503);
    await noDrive.close();
  });
  it("günlük senkron: intake + kit taraması Journal'a yazılır, elle çalıştırılır", async () => {
    await app.inject({ method: "POST", url: "/api/intake", payload: { name: "Journal Test A.Ş.", short: "JT", driveRoot: "https://drive.google.com/drive/folders/ROOTFOLDER12345" } });
    const r = await app.inject({ method: "POST", url: "/api/journal/run" });
    expect(r.statusCode).toBe(200); expect(r.json().sonuc).toMatch(/ok|uyari|hata/);
    const j = (await app.inject("/api/journal")).json();
    expect(j.son).not.toBeNull();
    const kinds = new Set(j.kayitlar.map((x: { tur: string }) => x.tur));
    expect(kinds.has("gunluk")).toBe(true); expect(kinds.has("intake")).toBe(true); expect(kinds.has("kit")).toBe(true);
    const it1 = j.kayitlar.find((x: { tur: string; hedef: string }) => x.tur === "intake" && x.hedef === "journal-test-a-s");
    expect(it1.durum).toBe("ok");
    await app.inject({ method: "DELETE", url: "/api/panels/journal-test-a-s" });
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

// v0.6.4: A–F adı olmayan şirket klasörleri (MTFG ortak sürücüsü) anahtar kelimeyle bölümlere dağıtılır
import { createRequire } from "node:module";
const intake = createRequire(import.meta.url)("../../../packages/juris-panel-kit/tools/intake.js") as {
  generateDataJs: (spec: unknown) => string;
};
describe("intake: standart dışı klasör yönlendirme + portföy modu", () => {
  it("Denetim/Bütçe/Tutanak/Satış klasörleri doğru harfe düşer; Müvekkil Yönetimi → Şirket Yönetimi", () => {
    const it2 = (title: string, n = 0) => ({ id: title, title, url: "", files: Array.from({ length: n }, (_, i) => ({ name: `${title}-${i}.pdf`, link: "" })), subfolders: [] });
    const js = intake.generateDataJs({
      client: { id: "ornek", name: "Örnek", portfolio: { tur: "Şirket", kategori: "Mal İhracatı", pay: 44.1, digerleri: "—", rol: "Yatırım" } },
      sections: [
        { id: "s1", title: "1.2. Örnek Denetim", url: "", items: [it2("1.2.1. YK Toplantı Tutanakları", 2), it2("1.2.2. 2026 Bütçe", 1), it2("Kurucu yol haritası", 1)] },
        { id: "s2", title: "2.4. Satış", url: "", items: [it2("Aday A")] },
        { id: "s3", title: "A. Strateji ve Business", url: "", items: [it2("A.1. İş Modeli", 1)] },
      ],
    });
    const sec = (L: string) => (js.match(new RegExp(` \{ id:"${L}", title:"([^"]*)"`)) ?? [])[1] ?? "";
    expect(js).toMatch(/id:"F1", title:"1\.2\.1\. YK Toplantı Tutanakları"/);
    expect(js).toMatch(/id:"B1", title:"1\.2\.2\. 2026 Bütçe"/);
    expect(js).toMatch(/id:"A1", title:"A\.1\. İş Modeli"/);
    expect(js).toMatch(/id:"A2", title:"Kurucu yol haritası"/);
    expect(js).toMatch(/id:"D1", title:"Aday A"/);
    expect(sec("D")).toContain("2.4. Satış");
    expect(sec("A")).toBe("A. Strateji ve Business");
    expect(js).toContain('portfolio:{"tur":"Şirket"');
    expect(js).not.toContain("Müvekkil Yönetimi");
    expect(js).toContain("Şirket Yönetimi");
  });
});
