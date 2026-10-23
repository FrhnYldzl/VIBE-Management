import { afterAll, describe, expect, it } from "vitest";
import { buildApp } from "./app.ts";
import { etiketle, parseAtom, parseResmiGazete, parseRss, type AjanClient } from "./hukuk.ts";
import { openStore } from "./store.ts";

// Resmî Gazete fihristinin gerçek yapısı (23.10.2026 ana sayfasından kısaltılmış)
const RG = `<a href="https://www.resmigazete.gov.tr/eskiler/2026/10/20261023.pdf">PDF</a>
<div class="card-title html-title" tabindex='0'> YÜRÜTME VE İDARE BÖLÜMÜ </div><div class="html-subtitle" tabindex='0'> YÖNETMELİKLER </div>
<div class="fihrist-item mb-1"><a href="https://www.resmigazete.gov.tr/eskiler/2026/10/20261023-3.htm" data-modal="True">–– Kişisel Verilerin Yurt Dışına Aktarılmasına İlişkin Usul ve Esaslar Hakkında Yönetmelikte Değişiklik</a></div>
<div class="fihrist-item mb-1"><a href="https://www.resmigazete.gov.tr/eskiler/2026/10/20261023-5.htm" data-modal="True">–– Çankaya Üniversitesi Ön Lisans ve Lisans Eğitim ve Öğretim Yönetmeliğinde Değişiklik</a></div>
<div class="html-subtitle" tabindex='0'> TEBLİĞLER </div>
<div class="fihrist-item mb-1"><a href="https://www.resmigazete.gov.tr/eskiler/2026/10/20261023-9.htm" data-modal="True">–– İhracat Rejimi Kararına İlişkin Tebliğ (İhracat: 2026/3)</a></div>`;
const RSS = `<rss><channel><item><title>Regulation (EU) 2026/1234 on artificial intelligence</title><link>https://eur-lex.europa.eu/x</link><pubDate>Fri, 23 Oct 2026 10:00:00 +0200</pubDate></item></channel></rss>`;
const ATOM = `<feed><entry><title>The Data Protection (Amendment) Regulations 2026</title><link rel="alternate" href="https://www.legislation.gov.uk/uksi/2026/1"/><updated>2026-10-22T00:00:00Z</updated></entry></feed>`;
const fakeFetch = (async (url: string) => {
  const u = String(url);
  if (u.includes("resmigazete")) return new Response(RG);
  if (u.includes("eur-lex")) return new Response(RSS);
  if (u.includes("legislation.gov.uk")) return new Response(ATOM);
  return new Response("hata", { status: 503 });
}) as typeof fetch;

// sahte Claude: 1) iki araç çağırır 2) bir geçerli + bir geçersiz öneri 3) özet metin
let tur = 0;
const usage = { input_tokens: 1000, output_tokens: 200, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 };
const fakeClient: AjanClient = { messages: { create: async (p) => {
  tur++;
  if (tur === 1) { expect(p.tools?.some((t) => t.name === "kaynak_tara")).toBe(true); expect(String(p.system)).toContain("Mevzuat Takip Ajanı");
    return { id: "m1", type: "message", role: "assistant", model: p.model, stop_reason: "tool_use", stop_sequence: null, usage,
      content: [{ type: "tool_use", id: "t1", name: "portfoy_oku", input: {} }, { type: "tool_use", id: "t2", name: "kaynak_tara", input: { kaynak: "resmi-gazete" } }] } as never; }
  if (tur === 2) { const last = p.messages[p.messages.length - 1]!; const res = last.content as { tool_use_id: string; content: string }[];
    expect(res.find((r) => r.tool_use_id === "t1")!.content).toContain("Fevup"); expect(res.find((r) => r.tool_use_id === "t2")!.content).toContain("Yurt Dışına Aktarılmasına");
    return { id: "m2", type: "message", role: "assistant", model: p.model, stop_reason: "tool_use", stop_sequence: null, usage,
      content: [{ type: "tool_use", id: "t3", name: "mevzuat_kaydi_oner", input: { kaynak: "resmi-gazete", tarih: "2026-10-23", baslik: "Kişisel Verilerin Yurt Dışına Aktarılması yönetmelik değişikliği", url: "https://www.resmigazete.gov.tr/eskiler/2026/10/20261023-3.htm", etki: "Yüksek", sirketler: ["Fevup"], ozet: "Yurt dışı sunucu kullanan şirketler aktarım mekanizmasını güncellemeli.", aksiyon: "Juris: standart sözleşme seti" } },
        { type: "tool_use", id: "t4", name: "mevzuat_kaydi_oner", input: { baslik: "x" } },
        { type: "tool_use", id: "t5", name: "hukuki_risk_oner", input: { sirket: "Fevup" } }] } as never; }
  const last = p.messages[p.messages.length - 1]!; const res = last.content as { tool_use_id: string; is_error?: boolean }[];
  expect(res.find((r) => r.tool_use_id === "t4")!.is_error).toBe(true); expect(res.find((r) => r.tool_use_id === "t5")!.is_error).toBe(true);
  return { id: "m3", type: "message", role: "assistant", model: p.model, stop_reason: "end_turn", stop_sequence: null, usage, content: [{ type: "text", text: "## Özet\n1 öneri eklendi." }] } as never;
} } };

const store = openStore(":memory:");
const app = buildApp({ auth: { secret: "t", allowedGithubUsers: [], passwordUsers: {}, disabled: true }, store, drive: null, anthropic: fakeClient, fetchImpl: fakeFetch });
afterAll(async () => { await app.close(); store.close(); });

describe("hukuk · mevzuat takip", () => {
  it("ayrıştırıcılar: Resmî Gazete bölüm/tür/tarih, RSS, Atom; ilgi puanı gürültüyü ayıklar", () => {
    const rg = parseResmiGazete(RG);
    expect(rg).toHaveLength(3); expect(rg[0]).toMatchObject({ tarih: "2026-10-23", bolum: "YÜRÜTME VE İDARE BÖLÜMÜ", tur: "YÖNETMELİKLER" });
    expect(rg[0]!.baslik.startsWith("Kişisel")).toBe(true); expect(rg[0]!.etiketler).toContain("Kişisel veri");
    expect(rg[1]!.ilgi).toBeLessThan(rg[0]!.ilgi); // üniversite yönetmeliği gürültü
    expect(rg[2]!.etiketler).toContain("İhracat, gümrük, yaptırım");
    expect(parseRss(RSS, "eur-lex")[0]).toMatchObject({ tarih: "2026-10-23", url: "https://eur-lex.europa.eu/x" });
    expect(parseAtom(ATOM, "uk-leg")[0]!.etiketler).toContain("Kişisel veri");
    expect(etiketle("Fenerbahçe Üniversitesi Uygulama ve Araştırma Merkezi Yönetmeliği").ilgi).toBeLessThan(0);
  });
  it("tanımlar ve tarama uç noktası (biri hatalı kaynak)", async () => {
    const t = (await app.inject("/api/hukuk/tanimlar")).json();
    expect(t.kaynaklar.filter((k: { otomatik: boolean }) => k.otomatik)).toHaveLength(4); expect(t.politikalar.length).toBeGreaterThan(10);
    expect(Object.keys(t.islemler)).toContain("pay"); expect(t.ajanlar.find((a: { id: string }) => a.id === "mevzuat").araclar[0].aciklama).toBeTruthy();
    const r = (await app.inject({ method: "POST", url: "/api/hukuk/tara", payload: { kaynak: "hepsi" } })).json();
    expect(r.sonuclar.length).toBe(5); expect(r.hatalar).toHaveLength(1); expect(r.hatalar[0].kaynak).toBe("fed-reg");
    expect(r.sonuclar[0].ilgi).toBeGreaterThanOrEqual(r.sonuclar[r.sonuclar.length - 1].ilgi);
    expect((await app.inject({ method: "POST", url: "/api/hukuk/tara", payload: { kaynak: "kvkk" } })).statusCode).toBe(400);
  });
});

describe("hukuk · ajanlar (function calling)", () => {
  it("mevzuat ajanı: araç döngüsü, geçersiz girdi hata olarak döner, öneri kaydı ve kullanım", async () => {
    const prev = process.env.ANTHROPIC_API_KEY; delete process.env.ANTHROPIC_API_KEY; // sahte istemci varken anahtar gerekmez
    const r = await app.inject({ method: "POST", url: "/api/ajan/calistir", payload: { ajan: "mevzuat", girdi: "Bugünkü Resmî Gazete'yi tara", baglam: "Fevup Brands · Mal İhracatı · e-ihracat", web: false } });
    if (prev !== undefined) process.env.ANTHROPIC_API_KEY = prev;
    expect(r.statusCode).toBe(200); const j = r.json();
    expect(j.yanit).toContain("1 öneri"); expect(j.adimlar.map((a: { arac: string }) => a.arac)).toEqual(["portfoy_oku", "kaynak_tara", "mevzuat_kaydi_oner", "mevzuat_kaydi_oner", "hukuki_risk_oner"]);
    expect(j.adimlar[3].hata).toBe(true); expect(j.adimlar[4].sonuc).toBe("izin yok");
    expect(j.yazilan).toHaveLength(1); expect(j.usage.input).toBe(3000);
    const kayit = (store.vibeState("mevzuat")!.value as { durum: string; ekleyen: string; sirketler: string[] }[])[0]!;
    expect(kayit).toMatchObject({ durum: "oneri", ekleyen: "ajan:mevzuat", sirketler: ["Fevup"] });
    const u = (await app.inject("/api/vibe/usage")).json(); expect(u.kaynak.find((k: { k: string }) => k.k === "ajan-mevzuat")).toBeTruthy();
  });
  it("planlı ajan çalışmaz", async () => {
    const r = await app.inject({ method: "POST", url: "/api/ajan/calistir", payload: { ajan: "sozlesme", girdi: "deneme isteği" } });
    expect(r.statusCode).toBe(400);
  });
});
