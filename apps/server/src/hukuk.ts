// Hukuk modülü (v0.6.6): Mevzuat Takip (kaynaklı, yerel + global) · Hukuki Risk · Uyum (politika + işlem) · Hukuk Ajanları (function calling)
// Kayıtlar paylaşımlı durumda (vibe_state): mevzuat · hrisk · uyumpol · uyumislem. Ajanlar bu kayıtlara yalnız "öneri" durumunda yazar; onay kullanıcıdadır.
import Anthropic from "@anthropic-ai/sdk";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { budgetOf, costUsd, monthStart, PRICES, TIER, type Usage } from "./sample.ts";
import type { Store } from "./store.ts";

/* ---------------- Tanımlar (tek kaynak: istemci /api/hukuk/tanimlar ile okur) ---------------- */
export const KAYNAKLAR = [
  // yerel
  { id: "resmi-gazete", ad: "Resmî Gazete", tur: "yerel", kapsam: "Kanun, Cumhurbaşkanı kararı, yönetmelik, tebliğ, kurul kararları", url: "https://www.resmigazete.gov.tr", siklik: "Günlük", otomatik: true },
  { id: "mevzuat-gov", ad: "Mevzuat Bilgi Sistemi", tur: "yerel", kapsam: "Yürürlükteki mevzuatın güncel (konsolide) metinleri", url: "https://www.mevzuat.gov.tr", siklik: "Sürekli", otomatik: false },
  { id: "kvkk", ad: "KVKK · Kurul kararları ve rehberler", tur: "yerel", kapsam: "Kişisel verilerin korunması, VERBİS, yurt dışı aktarım", url: "https://www.kvkk.gov.tr", siklik: "Haftalık", otomatik: false },
  { id: "spk", ad: "SPK Bültenleri", tur: "yerel", kapsam: "Sermaye piyasası, halka arz, kitle fonlaması, fonlar", url: "https://www.spk.gov.tr", siklik: "Haftalık", otomatik: false },
  { id: "bddk", ad: "BDDK Mevzuat", tur: "yerel", kapsam: "Bankacılık, finansal kiralama, faktoring", url: "https://www.bddk.org.tr", siklik: "Aylık", otomatik: false },
  { id: "rekabet", ad: "Rekabet Kurumu", tur: "yerel", kapsam: "Birleşme-devralma bildirim eşikleri, kurul kararları", url: "https://www.rekabet.gov.tr", siklik: "Aylık", otomatik: false },
  { id: "gib", ad: "Gelir İdaresi Başkanlığı", tur: "yerel", kapsam: "Vergi mevzuatı, sirkülerler, özelgeler", url: "https://www.gib.gov.tr", siklik: "Haftalık", otomatik: false },
  { id: "ticaret", ad: "Ticaret Bakanlığı", tur: "yerel", kapsam: "Şirketler, ticaret sicili, ihracat, e-ticaret, gümrük", url: "https://ticaret.gov.tr", siklik: "Haftalık", otomatik: false },
  { id: "tcmb", ad: "TCMB", tur: "yerel", kapsam: "Kambiyo, ihracat bedeli, ödeme hizmetleri", url: "https://www.tcmb.gov.tr", siklik: "Aylık", otomatik: false },
  { id: "sgk", ad: "SGK Mevzuat", tur: "yerel", kapsam: "Genelgeler, prim ve bildirim yükümlülükleri", url: "https://www.sgk.gov.tr", siklik: "Aylık", otomatik: false },
  { id: "yargitay", ad: "Yargıtay Karar Arama", tur: "yerel", kapsam: "İçtihat: ticaret, iş, icra-iflas daireleri", url: "https://karararama.yargitay.gov.tr", siklik: "Talep bazlı", otomatik: false },
  { id: "danistay", ad: "Danıştay", tur: "yerel", kapsam: "İdari ve vergi yargısı içtihadı", url: "https://www.danistay.gov.tr", siklik: "Talep bazlı", otomatik: false },
  { id: "aym", ad: "Anayasa Mahkemesi Kararlar Bilgi Bankası", tur: "yerel", kapsam: "İptal ve bireysel başvuru kararları", url: "https://kararlarbilgibankasi.anayasa.gov.tr", siklik: "Talep bazlı", otomatik: false },
  // global
  { id: "eur-lex", ad: "EUR-Lex · AB Resmî Gazetesi (L serisi)", tur: "global", kapsam: "AB tüzük, direktif ve kararları", url: "https://eur-lex.europa.eu", siklik: "Günlük", otomatik: true },
  { id: "uk-leg", ad: "legislation.gov.uk", tur: "global", kapsam: "Birleşik Krallık yeni mevzuat (Act, SI)", url: "https://www.legislation.gov.uk", siklik: "Günlük", otomatik: true },
  { id: "fed-reg", ad: "US Federal Register", tur: "global", kapsam: "ABD federal kural, bildirim ve başkanlık belgeleri", url: "https://www.federalregister.gov", siklik: "Günlük", otomatik: true },
  { id: "edpb", ad: "EDPB", tur: "global", kapsam: "GDPR rehberleri ve kararları", url: "https://www.edpb.europa.eu", siklik: "Aylık", otomatik: false },
  { id: "ec-digital", ad: "AB Komisyonu · Dijital strateji (AI Act, DSA, DMA)", tur: "global", kapsam: "Yapay zekâ ve dijital piyasa düzenlemeleri", url: "https://digital-strategy.ec.europa.eu", siklik: "Aylık", otomatik: false },
  { id: "ofac", ad: "OFAC · Yaptırımlar", tur: "global", kapsam: "ABD yaptırım listeleri ve genel lisanslar", url: "https://ofac.treasury.gov", siklik: "Haftalık", otomatik: false },
  { id: "fatf", ad: "FATF", tur: "global", kapsam: "Kara para ve terörün finansmanı standartları, gri liste", url: "https://www.fatf-gafi.org", siklik: "Çeyreklik", otomatik: false },
  { id: "oecd", ad: "OECD", tur: "global", kapsam: "Uluslararası vergi (BEPS, Pillar Two), kurumsal yönetim ilkeleri", url: "https://www.oecd.org", siklik: "Aylık", otomatik: false },
  { id: "wipo", ad: "WIPO", tur: "global", kapsam: "Marka, patent ve tasarımın uluslararası tescili", url: "https://www.wipo.int", siklik: "Aylık", otomatik: false },
  { id: "uncitral", ad: "UNCITRAL", tur: "global", kapsam: "Uluslararası ticaret hukuku, tahkim, e-ticaret model kanunları", url: "https://uncitral.un.org", siklik: "Çeyreklik", otomatik: false },
] as const;
export type KaynakId = (typeof KAYNAKLAR)[number]["id"];
export const OTOMATIK = KAYNAKLAR.filter((k) => k.otomatik).map((k) => k.id);

/** konu etiketleri: başlıkta geçen anahtar kelimeyle eşleşir; ilgi puanını belirler */
export const KONULAR: [string, string[]][] = [
  ["Şirketler ve ticaret", ["ticaret kanunu", "şirket", "anonim", "limited", "ticaret sicil", "sermaye", "birleşme", "kooperatif", "company", "corporate"]],
  ["Vergi", ["vergi", "kdv", "katma değer", "kurumlar", "damga", "harç", "gelir idaresi", "tax", "taxation"]],
  ["Kişisel veri", ["kişisel veri", "kvkk", "veri koruma", "gdpr", "data protection", "privacy", "personal data"]],
  ["İş ve SGK", ["iş kanunu", "sosyal güvenlik", "sgk", "asgari ücret", "istihdam", "çalışma hayatı", "çalışma ve sosyal", "employment", "worker"]],
  ["İhracat, gümrük, yaptırım", ["ihracat", "ithalat", "gümrük", "dış ticaret", "dahilde işleme", "export", "customs", "sanction", "yaptırım", "tariff"]],
  ["Teşvik ve yatırım", ["teşvik", "yatırım", "kosgeb", "teknopark", "teknoloji geliştirme", "ar-ge", "araştırma ve geliştirme", "investment", "subsidy"]],
  ["Finans ve sermaye piyasası", ["sermaye piyasası", "spk", "bddk", "banka", "ödeme hizmet", "elektronik para", "kripto", "fon", "finansal", "securities", "payment"]],
  ["Rekabet", ["rekabet", "competition", "antitrust", "merger control"]],
  ["Dijital ve yapay zekâ", ["elektronik ticaret", "e-ticaret", "yapay zeka", "yapay zekâ", "artificial intelligence", "siber", "bilişim", "elektronik haberleşme", "digital", "cyber", "online platform"]],
  ["Fikri mülkiyet", ["marka", "patent", "fikri", "sınai mülkiyet", "telif", "trademark", "copyright", "intellectual property"]],
  ["Savunma ve havacılık", ["savunma", "havacılık", "insansız hava", "defense", "defence", "aviation", "aircraft", "drone"]],
  ["Uyuşmazlık ve icra", ["icra", "iflas", "konkordato", "arabuluculuk", "tahkim", "hukuk muhakemeleri", "arbitration", "insolvency"]],
];
const GURULTU = ["üniversitesi", "university", "uygulama ve araştırma merkezi", "hâkimler ve savcılar", "ilan", "atama", "harbour", "road traffic", "speed limit", "airworthiness directives", "döviz kurları", "kıymetli maden", "information collection activities", "sunshine act"];
export function etiketle(baslik: string): { etiketler: string[]; ilgi: number } {
  const s = baslik.toLocaleLowerCase("tr") + " ¦ " + baslik.toLowerCase(); // tr: I→ı İngilizce başlıkları bozar; ikisinde de ara
  const etiketler = KONULAR.filter(([, kws]) => kws.some((k) => s.includes(k))).map(([t]) => t);
  let ilgi = etiketler.length * 2;
  if (etiketler.length && /kanun|yönetmelik|tebliğ|cumhurbaşkanı kararı|regulation|directive|act \d{4}|rule/.test(s)) ilgi += 1; // tür bonusu yalnız konu eşleşmişse
  if (GURULTU.some((g) => s.includes(g))) ilgi -= 3;
  return { etiketler, ilgi };
}

export const POLITIKALAR = [
  { id: "kvkk-aydinlatma", ad: "KVKK aydınlatma ve açık rıza seti", dayanak: "6698 sayılı KVKK md. 5, 10", ay: 12 },
  { id: "saklama-imha", ad: "Kişisel veri saklama ve imha politikası", dayanak: "Kişisel Verilerin Silinmesi Yönetmeliği", ay: 12 },
  { id: "bilgi-guvenligi", ad: "Bilgi güvenliği politikası", dayanak: "KVKK md. 12 · ISO 27001 ilkeleri", ay: 12 },
  { id: "imza-yetki", ad: "İmza yetkileri ve yetki matrisi (iç yönerge)", dayanak: "TTK 367, 371 · imza sirküleri", ay: 12 },
  { id: "satin-alma", ad: "Satın alma ve harcama onay prosedürü", dayanak: "İç kontrol · bütçe yetki eşikleri", ay: 12 },
  { id: "etik-cikar", ad: "Etik, çıkar çatışması ve ilişkili taraf işlemleri", dayanak: "TTK 393, 395, 396 · OECD ilkeleri", ay: 12 },
  { id: "abc", ad: "Rüşvet ve yolsuzlukla mücadele (ABC)", dayanak: "TCK 252 · UK Bribery Act / FCPA (yurt dışı işlem)", ay: 12 },
  { id: "kyc-aml", ad: "Müşteri tanıma ve kara parayla mücadele (KYC/AML)", dayanak: "5549 sayılı Kanun · FATF tavsiyeleri", ay: 12 },
  { id: "yaptirim", ad: "İhracat kontrolü ve yaptırım taraması", dayanak: "OFAC · AB · BM listeleri · çift kullanımlı ürün", ay: 6 },
  { id: "isg", ad: "İş sağlığı ve güvenliği", dayanak: "6331 sayılı İSG Kanunu", ay: 12 },
  { id: "ik", ad: "İK politikası (işe alım, disiplin, uzaktan çalışma)", dayanak: "4857 sayılı İş Kanunu", ay: 12 },
  { id: "sozlesme-yonetimi", ad: "Sözleşme yönetimi prosedürü (şablon, onay, arşiv)", dayanak: "İç kontrol · Data Room D/E", ay: 12 },
  { id: "fm-gizlilik", ad: "Fikri mülkiyet ve gizlilik (NDA, buluş devri)", dayanak: "6769 sayılı SMK · 5846 sayılı FSEK", ay: 12 },
  { id: "yapay-zeka", ad: "Yapay zekâ kullanım politikası", dayanak: "AB AI Act · KVKK üretken YZ rehberi", ay: 6 },
] as const;

export const ISLEMLER: Record<string, { ad: string; kontroller: { id: string; t: string; dayanak?: string }[] }> = {
  sozlesme: { ad: "Sözleşme imzası", kontroller: [
    { id: "s1", t: "Karşı taraf doğrulama: ticaret sicili, imza sirküleri, yaptırım listesi" },
    { id: "s2", t: "İmza yetkisi: yetki matrisi ve sirküler kontrolü", dayanak: "TTK 371" },
    { id: "s3", t: "Hukuki inceleme ve risk notu (Juris)" },
    { id: "s4", t: "Ticari şartların onayı: bedel, ödeme, cezai şart, süre/fesih" },
    { id: "s5", t: "Kişisel veri işleniyorsa veri işleme eki", dayanak: "KVKK md. 12" },
    { id: "s6", t: "Damga vergisi hesabı ve beyanı", dayanak: "488 sayılı DVK" },
    { id: "s7", t: "İmzalı nüshanın Data Room'a (D/E) yüklenmesi" } ] },
  pay: { ad: "Pay devri / sermaye işlemi", kontroller: [
    { id: "p1", t: "Yönetim kurulu / genel kurul kararı", dayanak: "TTK 408, 421" },
    { id: "p2", t: "Esas sözleşme ve pay sahipleri sözleşmesi: ön alım, onay, drag/tag" },
    { id: "p3", t: "Rekabet Kurulu bildirim eşiği kontrolü", dayanak: "2010/4 sayılı Tebliğ" },
    { id: "p4", t: "Değerleme raporu ve bedel dayanağı" },
    { id: "p5", t: "Vergi etkisi: değer artış kazancı, damga vergisi" },
    { id: "p6", t: "Pay defteri kaydı ve MERSİS / TTSG tescili" },
    { id: "p7", t: "Cap table güncellemesi (Ana Merkez portföy kaydı)" } ] },
  yatirim: { ad: "Yatırım / ortaklık (deal)", kontroller: [
    { id: "y1", t: "Yatırım tezi uyumu (T1–T6) ve deal memo" },
    { id: "y2", t: "DD checklist (9 başlık) tamam" },
    { id: "y3", t: "Yatırım Komitesi kararı (yazılı)" },
    { id: "y4", t: "Term sheet ve pay sahipleri sözleşmesi" },
    { id: "y5", t: "Yaptırım ve AML taraması: ortaklar ve nihai faydalanıcı" },
    { id: "y6", t: "Non-compete ve çıkar çatışması kontrolü" },
    { id: "y7", t: "Kapanış belgeleri ve tescil" } ] },
  ik: { ad: "İşe alım / ayrılış", kontroller: [
    { id: "i1", t: "İş sözleşmesi ve görev tanımı", dayanak: "4857 md. 8" },
    { id: "i2", t: "Çalışan aydınlatma metni", dayanak: "KVKK md. 10" },
    { id: "i3", t: "SGK giriş / çıkış bildirimi süresinde", dayanak: "5510 md. 8–9" },
    { id: "i4", t: "Gizlilik ve fikri mülkiyet devri (NDA)" },
    { id: "i5", t: "İSG eğitimi ve kayıt", dayanak: "6331 md. 17" },
    { id: "i6", t: "Ayrılışta ibraname, kıdem/ihbar hesabı, cihaz ve erişim iadesi" } ] },
  yurtdisi: { ad: "Yurt dışı ödeme / ihracat", kontroller: [
    { id: "d1", t: "Karşı taraf yaptırım taraması (OFAC / AB / BM)" },
    { id: "d2", t: "Çift kullanımlı ürün ve ihracat kontrol listesi" },
    { id: "d3", t: "Kambiyo mevzuatı ve ihracat bedelinin yurda getirilmesi", dayanak: "32 sayılı Karar" },
    { id: "d4", t: "Fatura, gümrük beyannamesi, menşe belgesi" },
    { id: "d5", t: "İlişkili tarafsa transfer fiyatlandırması", dayanak: "KVK md. 13" },
    { id: "d6", t: "Teşvik / destek belgeleri (varsa)" } ] },
  veri: { ad: "Kişisel veri aktarımı / yeni sistem", kontroller: [
    { id: "v1", t: "Veri envanterinin güncellenmesi" },
    { id: "v2", t: "Hukuki sebep ve aydınlatma", dayanak: "KVKK md. 5, 10" },
    { id: "v3", t: "Yurt dışı aktarım mekanizması (standart sözleşme / bildirim)", dayanak: "KVKK md. 9" },
    { id: "v4", t: "Veri işleyen sözleşmesi" },
    { id: "v5", t: "Bilgi güvenliği değerlendirmesi" },
    { id: "v6", t: "VERBİS güncellemesi" } ] },
  iliskili: { ad: "İlişkili taraf işlemi", kontroller: [
    { id: "r1", t: "İlişkili tarafın tanımlanması" },
    { id: "r2", t: "Emsal fiyat analizi", dayanak: "KVK md. 13" },
    { id: "r3", t: "YK onayı ve çıkar çatışması beyanı", dayanak: "TTK 393" },
    { id: "r4", t: "Muhasebe kaydı ve dipnot açıklaması" },
    { id: "r5", t: "Faaliyet raporunda açıklama" } ] },
};

export const RISK_KATEGORI = ["Şirketler ve yönetişim", "Sözleşme", "KVKK ve veri", "İş hukuku ve SGK", "Vergi", "Rekabet", "Fikri mülkiyet", "Regülasyon ve lisans", "İhracat ve yaptırım", "Uyuşmazlık ve icra", "Finansman ve teminat"];

/* ---------------- Kaynak tarayıcıları (Resmî Gazete · EUR-Lex · legislation.gov.uk · Federal Register) ---------------- */
export interface MevzuatSonuc { kaynak: KaynakId; tarih: string; baslik: string; url: string; bolum?: string; tur?: string; etiketler: string[]; ilgi: number }
type Fetch = typeof fetch;
const UA = { "user-agent": "Mozilla/5.0 (VIBE Management mevzuat takibi; +https://vibeserver-production.up.railway.app)" };
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const sonuc = (kaynak: KaynakId, tarih: string, baslik: string, url: string, ek: Partial<MevzuatSonuc> = {}): MevzuatSonuc => ({ kaynak, tarih, baslik, url, ...ek, ...etiketle(baslik + " " + (ek.tur ?? "")) });

/** Resmî Gazete fihristi: bölüm (card-title) → tür (html-subtitle) → kalem (fihrist-item) */
export function parseResmiGazete(html: string, tarih?: string): MevzuatSonuc[] {
  const out: MevzuatSonuc[] = []; let bolum = "", tur = "";
  const d = html.match(/eskiler\/(\d{4})\/(\d{2})\/\d{6}(\d{2})/); // ana sayfa: günün PDF bağlantısından tarih
  const t = tarih ?? (d ? `${d[1]}-${d[2]}-${d[3]}` : "");
  const re = /<div class="card-title html-title"[^>]*>([\s\S]*?)<\/div>|<div class="html-subtitle"[^>]*>([\s\S]*?)<\/div>|<div class="fihrist-item[^"]*">\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  for (const m of html.matchAll(re)) {
    if (m[1] != null) { bolum = decode(m[1]); continue; }
    if (m[2] != null) { tur = decode(m[2]); continue; }
    const baslik = decode(m[4] ?? "").replace(/^[–—-]+\s*/, "");
    if (baslik) out.push(sonuc("resmi-gazete", t, baslik, decode(m[3]!), { bolum, tur }));
  }
  return out;
}
export function parseRss(xml: string, kaynak: KaynakId): MevzuatSonuc[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => {
    const g = (tag: string) => decode((it!.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)) ?? [])[1] ?? "");
    const d = new Date(g("pubDate") || g("dc:date")); const baslik = g("title"); const desc = g("description");
    return sonuc(kaynak, isNaN(+d) ? "" : d.toISOString().slice(0, 10), desc && desc.length > baslik.length && desc.length < 400 ? `${baslik} — ${desc}` : baslik, g("link"));
  }).filter((x) => x.baslik);
}
export function parseAtom(xml: string, kaynak: KaynakId): MevzuatSonuc[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
    const title = decode((e!.match(/<title[^>]*>([\s\S]*?)<\/title>/) ?? [])[1] ?? "");
    const link = (e!.match(/<link[^>]*href="([^"]+)"[^>]*\/?>/) ?? [])[1] ?? "";
    const upd = (e!.match(/<(?:updated|published)>([^<]+)</) ?? [])[1] ?? "";
    return sonuc(kaynak, upd.slice(0, 10), title, decode(link));
  }).filter((x) => x.baslik);
}

const cache = new Map<string, { at: number; v: MevzuatSonuc[] }>();
export async function tara(kaynak: KaynakId, opts: { tarih?: string; fetchImpl?: Fetch } = {}): Promise<MevzuatSonuc[]> {
  const f = opts.fetchImpl ?? fetch; const key = `${kaynak}|${opts.tarih ?? ""}`;
  const c = cache.get(key); if (c && Date.now() - c.at < 30 * 60_000) return c.v;
  const get = async (url: string) => {
    let r: Response;
    try { r = await f(url, { headers: UA, signal: AbortSignal.timeout(20_000) }); }
    catch { r = await f(url, { headers: UA, signal: AbortSignal.timeout(25_000) }); } // geçici ağ hatasında bir kez yeniden dene
    if (!r.ok) throw new Error(`${kaynak}: HTTP ${r.status}`); return r.text();
  };
  let v: MevzuatSonuc[];
  switch (kaynak) {
    case "resmi-gazete": v = parseResmiGazete(await get(opts.tarih ? `https://www.resmigazete.gov.tr/fihrist?tarih=${opts.tarih}` : "https://www.resmigazete.gov.tr/"), opts.tarih); break;
    case "eur-lex": v = parseRss(await get("https://eur-lex.europa.eu/EN/display-feed.rss?rssId=222"), "eur-lex"); break;
    case "uk-leg": v = parseAtom(await get("https://www.legislation.gov.uk/new/data.feed"), "uk-leg"); break;
    case "fed-reg": {
      const j = JSON.parse(await get("https://www.federalregister.gov/api/v1/documents.json?per_page=60&order=newest&fields[]=title&fields[]=html_url&fields[]=publication_date&fields[]=type&fields[]=agencies")) as { results?: { title: string; html_url: string; publication_date: string; type: string; agencies?: { name?: string }[] }[] };
      v = (j.results ?? []).map((d) => sonuc("fed-reg", d.publication_date, d.title, d.html_url, { tur: d.type, bolum: (d.agencies ?? []).map((a) => a.name).filter(Boolean).join(", ") }));
      break;
    }
    default: throw new Error(`${kaynak} otomatik taranmaz — kaynağı açıp elle kayda alın ya da ajanın web aramasını kullanın`);
  }
  cache.set(key, { at: Date.now(), v });
  return v;
}

/* ---------------- Paylaşımlı kayıtlar ---------------- */
type Row = Record<string, unknown>;
const rows = (store: Store, key: string): Row[] => { const r = store.vibeState(key); return Array.isArray(r?.value) ? (r!.value as Row[]) : []; };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

/* ---------------- Ajanlar (function calling) ---------------- */
const WEB_DOMAINS = KAYNAKLAR.map((k) => new URL(k.url).hostname.replace(/^www\./, ""));
interface Arac { tanim: Anthropic.Tool; girdi: z.ZodTypeAny; calistir: (g: any, c: AjanCtx) => Promise<unknown> | unknown }
interface AjanCtx { store: Store; kim: string; ajan: string; baglam: string; fetchImpl?: Fetch; yazilan: { key: string; id: string }[] }

const sirketF = z.string().max(80).optional();
export const ARACLAR: Record<string, Arac> = {
  kaynak_tara: {
    tanim: { name: "kaynak_tara", description: "Otomatik izlenen resmi kaynağın son yayınını tarar (resmi-gazete, eur-lex, uk-leg, fed-reg). Başlık, bağlantı, tarih, konu etiketi ve ilgi puanı döner; ilgi puanı yüksek olanlar portföy için daha anlamlıdır. Resmî Gazete için isteğe bağlı tarih (YYYY-MM-DD) verilebilir.",
      input_schema: { type: "object", properties: { kaynak: { type: "string", enum: OTOMATIK as unknown as string[] }, tarih: { type: "string", description: "YYYY-MM-DD, yalnız resmi-gazete" }, enAz: { type: "integer", description: "En düşük ilgi puanı (varsayılan 1)" } }, required: ["kaynak"] } },
    girdi: z.object({ kaynak: z.enum(OTOMATIK as unknown as [KaynakId, ...KaynakId[]]), tarih: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), enAz: z.number().int().optional() }),
    async calistir(g, c) { const v = await tara(g.kaynak, { tarih: g.tarih, fetchImpl: c.fetchImpl }); const min = g.enAz ?? 1;
      const f = v.filter((x) => x.ilgi >= min).sort((a, b) => b.ilgi - a.ilgi).slice(0, 30);
      return { kaynak: g.kaynak, toplam: v.length, ilgili: f.length, kalemler: f.map((x) => ({ tarih: x.tarih, baslik: x.baslik.slice(0, 240), url: x.url, tur: x.tur, etiketler: x.etiketler, ilgi: x.ilgi })) }; },
  },
  portfoy_oku: {
    tanim: { name: "portfoy_oku", description: "MTFG portföyünü ve müvekkil şirketlerini döner: ad, sınıf, kategori (mal/hizmet ihracatı, yatırım), sektör ve rol. Mevzuatın hangi şirketi etkilediğini belirlemek için önce bunu çağır.", input_schema: { type: "object", properties: {} } },
    girdi: z.object({}).passthrough(), calistir: (_g, c) => c.baglam || "Portföy bağlamı istemciden gelmedi.",
  },
  mevzuat_kayitlari_oku: {
    tanim: { name: "mevzuat_kayitlari_oku", description: "Mevzuat takip kaydındaki mevcut kalemleri döner (mükerrer öneriyi önlemek için). İsteğe bağlı durum süzgeci.", input_schema: { type: "object", properties: { durum: { type: "string", enum: ["oneri", "yeni", "degerlendiriliyor", "aksiyon", "kapandi", "ilgisiz"] } } } },
    girdi: z.object({ durum: z.string().optional() }),
    calistir: (g, c) => rows(c.store, "mevzuat").filter((r) => !g.durum || r.durum === g.durum).slice(0, 60).map((r) => ({ id: r.id, tarih: r.tarih, baslik: r.baslik, url: r.url, etki: r.etki, sirketler: r.sirketler, durum: r.durum })),
  },
  mevzuat_kaydi_oner: {
    tanim: { name: "mevzuat_kaydi_oner", description: "Takip kaydına 'öneri' durumunda yeni bir mevzuat kalemi ekler (kullanıcı onaylar). Yalnız portföyü gerçekten etkileyen düzenlemeler için kullan; url zorunlu ve kaynaktan alınmış olmalı.",
      input_schema: { type: "object", properties: { kaynak: { type: "string" }, tarih: { type: "string" }, baslik: { type: "string" }, url: { type: "string" }, etiketler: { type: "array", items: { type: "string" } }, sirketler: { type: "array", items: { type: "string" } }, etki: { type: "string", enum: ["Yüksek", "Orta", "Düşük"] }, ozet: { type: "string", description: "Ne değişiyor, kimi nasıl etkiliyor (2–3 cümle)" }, aksiyon: { type: "string", description: "Önerilen aksiyon ve sorumlu" } }, required: ["kaynak", "baslik", "url", "etki", "ozet"] } },
    girdi: z.object({ kaynak: z.string().max(40), tarih: z.string().max(10).optional(), baslik: z.string().min(3).max(400), url: z.string().url().max(600), etiketler: z.array(z.string().max(60)).max(8).optional(), sirketler: z.array(z.string().max(80)).max(20).optional(), etki: z.enum(["Yüksek", "Orta", "Düşük"]), ozet: z.string().max(1200), aksiyon: z.string().max(600).optional() }),
    calistir(g, c) { const list = rows(c.store, "mevzuat"); if (list.some((r) => r.url === g.url)) return { eklenmedi: "Bu bağlantı zaten kayıtlı" };
      const id = uid(); list.unshift({ id, ...g, durum: "oneri", ekleyen: `ajan:${c.ajan}`, eklendi: new Date().toISOString() }); c.store.setVibeState("mevzuat", list.slice(0, 2000), c.kim); c.yazilan.push({ key: "mevzuat", id }); return { eklendi: id, durum: "oneri" }; },
  },
  hukuki_risk_oku: {
    tanim: { name: "hukuki_risk_oku", description: "Hukuki risk kaydını döner (şirket, risk, kategori, olasılık, etki, skor, kontrol, durum). İsteğe bağlı şirket süzgeci.", input_schema: { type: "object", properties: { sirket: { type: "string" } } } },
    girdi: z.object({ sirket: sirketF }),
    calistir: (g, c) => rows(c.store, "hrisk").filter((r) => !g.sirket || String(r.sirket ?? "").toLocaleLowerCase("tr") === g.sirket.toLocaleLowerCase("tr")).slice(0, 80).map((r) => ({ id: r.id, sirket: r.sirket, risk: r.risk, kategori: r.kategori, o: r.o, e: r.e, skor: Number(r.o) * Number(r.e), kontrol: r.kontrol, durum: r.durum })),
  },
  hukuki_risk_oner: {
    tanim: { name: "hukuki_risk_oner", description: "Hukuki risk kaydına 'öneri' durumunda risk ekler (kullanıcı onaylar). Olasılık ve etki 1–5; kontrol = riski kapatan somut aksiyon/belge.",
      input_schema: { type: "object", properties: { sirket: { type: "string" }, risk: { type: "string" }, kategori: { type: "string", enum: RISK_KATEGORI }, o: { type: "integer", minimum: 1, maximum: 5 }, e: { type: "integer", minimum: 1, maximum: 5 }, kontrol: { type: "string" }, dayanak: { type: "string", description: "Mevzuat, sözleşme ya da belge" }, sahip: { type: "string" } }, required: ["sirket", "risk", "kategori", "o", "e", "kontrol"] } },
    girdi: z.object({ sirket: z.string().min(1).max(80), risk: z.string().min(3).max(400), kategori: z.string().max(60), o: z.number().int().min(1).max(5), e: z.number().int().min(1).max(5), kontrol: z.string().max(600), dayanak: z.string().max(300).optional(), sahip: z.string().max(80).optional() }),
    calistir(g, c) { const list = rows(c.store, "hrisk"); const id = uid(); list.unshift({ id, ...g, durum: "oneri", ekleyen: `ajan:${c.ajan}`, eklendi: new Date().toISOString() }); c.store.setVibeState("hrisk", list.slice(0, 2000), c.kim); c.yazilan.push({ key: "hrisk", id }); return { eklendi: id, durum: "oneri", skor: g.o * g.e }; },
  },
  uyum_durumu_oku: {
    tanim: { name: "uyum_durumu_oku", description: "Şirket bazında politika durumlarını (yok / taslak / onaylı / gözden geçirilecek) ve açık işlem kontrollerini döner.", input_schema: { type: "object", properties: { sirket: { type: "string" } } } },
    girdi: z.object({ sirket: sirketF }),
    calistir(g, c) { const eq = (x: unknown) => !g.sirket || String(x ?? "").toLocaleLowerCase("tr") === g.sirket.toLocaleLowerCase("tr");
      const pol = rows(c.store, "uyumpol").filter((r) => eq(r.sirket));
      const politikalar = POLITIKALAR.map((p) => ({ politika: p.ad, durumlar: pol.filter((r) => r.pol === p.id).map((r) => `${r.sirket}: ${r.durum}`) }));
      const islemler = rows(c.store, "uyumislem").filter((r) => eq(r.sirket)).slice(0, 40).map((r) => { const t = ISLEMLER[String(r.tur)]; const ok = (r.ok as string[] | undefined) ?? [];
        return { sirket: r.sirket, tur: t?.ad ?? r.tur, baslik: r.baslik, tarih: r.tarih, tamam: `${ok.length}/${t?.kontroller.length ?? 0}`, eksik: (t?.kontroller ?? []).filter((k) => !ok.includes(k.id)).map((k) => k.t) }; });
      return { politikalar, islemler, not: "Kayıtsız politika 'yok' sayılır." }; },
  },
  islem_kontrol_listesi: {
    tanim: { name: "islem_kontrol_listesi", description: "İşlem türü için standart uyum kontrol listesini (dayanaklarıyla) döner. Türler: " + Object.entries(ISLEMLER).map(([k, v]) => `${k} (${v.ad})`).join(", "),
      input_schema: { type: "object", properties: { tur: { type: "string", enum: Object.keys(ISLEMLER) } }, required: ["tur"] } },
    girdi: z.object({ tur: z.enum(Object.keys(ISLEMLER) as [string, ...string[]]) }),
    calistir: (g) => ISLEMLER[g.tur],
  },
};
const WEB_SEARCH = { type: "web_search_20260209", name: "web_search", max_uses: 5, allowed_domains: WEB_DOMAINS } as unknown as Anthropic.Tool;

export const AJANLAR = [
  { id: "mevzuat", ad: "Mevzuat Takip Ajanı", durum: "aktif", amac: "Resmî Gazete, EUR-Lex, legislation.gov.uk ve Federal Register'ı tarar; gerekirse KVKK, SPK, Rekabet, GİB gibi kaynakları alan adı kısıtlı web aramasıyla kontrol eder; portföyü etkileyenleri etki ve aksiyonla 'öneri' olarak kayda ekler.",
    araclar: ["portfoy_oku", "kaynak_tara", "mevzuat_kayitlari_oku", "mevzuat_kaydi_oner", "web_search"], ornek: "Bugünkü Resmî Gazete ve EUR-Lex'te portföyümüzü etkileyen bir düzenleme var mı? Varsa kayda öner.",
    sistem: "Sen MTFG'nin Mevzuat Takip Ajanısın. Önce portfoy_oku ile şirketleri öğren, sonra kaynak_tara ile kaynakları tara, mevzuat_kayitlari_oku ile mükerrerleri ayıkla. Yalnız portföyü somut olarak etkileyen düzenlemeleri mevzuat_kaydi_oner ile öner; her öneride url kaynaktan gelmeli, uydurma bağlantı verme. Etkiyi şirket adıyla ve 'ne yapılmalı' diliyle yaz." },
  { id: "risk", ad: "Hukuki Risk Ajanı", durum: "aktif", amac: "Mevzuat kayıtlarını, uyum boşluklarını ve mevcut risk kaydını birlikte okur; şirket bazında olasılık × etki ile yeni hukuki riskleri ve kapatan kontrolleri 'öneri' olarak ekler.",
    araclar: ["portfoy_oku", "mevzuat_kayitlari_oku", "uyum_durumu_oku", "hukuki_risk_oku", "hukuki_risk_oner"], ornek: "Fevup için hukuki risk haritasını güncelle: mevzuat ve uyum eksiklerinden doğan riskleri öner.",
    sistem: "Sen MTFG'nin Hukuki Risk Ajanısın. Mevcut kayıtları oku, mükerrer risk önerme. Her riski 'bunu yapmazsak ne olur' diliyle yaz; olasılık ve etkiyi 1–5 arası gerekçeyle ver; kontrol alanına riski kapatan belge veya aksiyonu yaz. Dayanak yoksa 'dayanak yok' de." },
  { id: "uyum", ad: "Uyum Ajanı", durum: "aktif", amac: "İşlem türüne göre (sözleşme, pay devri, yatırım, İK, yurt dışı ödeme, veri aktarımı, ilişkili taraf) kontrol listesini çıkarır, şirketin politika eksiklerini tespit eder ve önemli boşlukları risk önerisine çevirir.",
    araclar: ["portfoy_oku", "islem_kontrol_listesi", "uyum_durumu_oku", "hukuki_risk_oner"], ornek: "Marqby'de yeni bir pay devri planlanıyor; uyum kontrol listesini ve eksik politikaları çıkar.",
    sistem: "Sen MTFG'nin Uyum Ajanısın. İşlem için islem_kontrol_listesi'ni al, şirketin uyum_durumu_oku sonucuyla karşılaştır; eksikleri sorumlu ve dayanakla madde madde yaz. Yalnız kritik boşlukları hukuki_risk_oner ile öner." },
  { id: "sozlesme", ad: "Sözleşme İnceleme Ajanı", durum: "planli", amac: "Yüklenen sözleşmeyi Juris standart maddeleriyle karşılaştırır, riskli hükümleri ve eksik maddeleri işaretler.", araclar: ["dosya_oku", "madde_kutuphanesi", "hukuki_risk_oner"], ornek: "", sistem: "" },
  { id: "dava", ad: "Dava ve İcra Takip Ajanı", durum: "planli", amac: "Derdest dosyaların duruşma ve süre takibini yapar (UYAP entegrasyonu olmadan elle girilen kayıtlar üzerinden).", araclar: ["dosya_kayitlari_oku", "sure_hesapla"], ornek: "", sistem: "" },
] as const;

const ORTAK = `Türkçe yaz; kurumsal, net, eyleme dönük. Yalnız araçlardan gelen veriye dayan; veride olmayan rakam, tarih, bağlantı veya kişi uydurma. Belge / beyan / dayanak yok ayrımını koru. Yazdığın kayıtlar 'öneri' olarak düşer, kullanıcı onaylar. Sonunda kısa bir özet ver: ne tarandı, ne bulundu, neler öneri olarak eklendi (madde madde, bağlantılarla).`;

export interface AjanClient { messages: { create: (p: Anthropic.MessageCreateParamsNonStreaming) => Promise<Anthropic.Message> } }
export interface Adim { arac: string; girdi: unknown; sonuc: string; hata?: boolean }

export async function ajanCalistir(o: { client: AjanClient; store: Store; ajan: string; girdi: string; sirket?: string; baglam?: string; kim: string; model: string; maxTokens: number; web: boolean; fetchImpl?: Fetch; maxTur?: number }) {
  const def = AJANLAR.find((a) => a.id === o.ajan && a.durum === "aktif");
  if (!def) throw Object.assign(new Error("Ajan bulunamadı ya da aktif değil"), { statusCode: 400 });
  const ctx: AjanCtx = { store: o.store, kim: o.kim, ajan: def.id, baglam: o.baglam ?? "", fetchImpl: o.fetchImpl, yazilan: [] };
  const tools: Anthropic.Tool[] = def.araclar.filter((a) => a !== "web_search").map((a) => ARACLAR[a]!.tanim);
  if (o.web && (def.araclar as readonly string[]).includes("web_search")) tools.push(WEB_SEARCH);
  const messages: Anthropic.MessageParam[] = [{ role: "user", content: (o.sirket ? `Kapsam: ${o.sirket}\n\n` : "") + o.girdi }];
  const adimlar: Adim[] = []; const usage = { input: 0, output: 0, cacheWrite: 0, cacheRead: 0, usd: 0 }; let durdu: string | null = null; let son: Anthropic.Message | null = null;
  for (let tur = 0; tur < (o.maxTur ?? 10); tur++) {
    const r = await o.client.messages.create({ model: o.model, max_tokens: o.maxTokens, system: `${def.sistem}\n\n${ORTAK}\nBugün: ${new Date().toISOString().slice(0, 10)}.`, tools, messages,
      ...({ thinking: { type: "adaptive" } } as object) } as Anthropic.MessageCreateParamsNonStreaming);
    son = r; const u = r.usage as Usage;
    usage.input += u.input_tokens; usage.output += u.output_tokens; usage.cacheWrite += u.cache_creation_input_tokens ?? 0; usage.cacheRead += u.cache_read_input_tokens ?? 0; usage.usd += costUsd(o.model, u);
    for (const b of r.content as unknown as { type: string; name?: string; input?: unknown }[]) if (b.type === "server_tool_use") adimlar.push({ arac: b.name ?? "web_search", girdi: b.input, sonuc: "Anthropic web araması (alan adı kısıtlı)" });
    if (r.stop_reason === "pause_turn") { messages.push({ role: "assistant", content: r.content }); continue; }
    if (r.stop_reason === "refusal") { durdu = "Model isteği yanıtlamadı"; break; }
    const uses = r.content.filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
    if (r.stop_reason === "max_tokens") { durdu = uses.length ? "Yanıt token sınırına takıldı; araç çağrısı yarım kaldı" : "Yanıt token sınırında kesildi"; break; }
    if (r.stop_reason !== "tool_use" || !uses.length) break;
    messages.push({ role: "assistant", content: r.content });
    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const t of uses) {
      const a = ARACLAR[t.name];
      if (!a || !(def.araclar as readonly string[]).includes(t.name)) { results.push({ type: "tool_result", tool_use_id: t.id, content: `Bilinmeyen ya da bu ajana kapalı araç: ${t.name}`, is_error: true }); adimlar.push({ arac: t.name, girdi: t.input, sonuc: "izin yok", hata: true }); continue; }
      const p = a.girdi.safeParse(t.input);
      if (!p.success) { const m = p.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "); results.push({ type: "tool_result", tool_use_id: t.id, content: `Girdi geçersiz: ${m}`, is_error: true }); adimlar.push({ arac: t.name, girdi: t.input, sonuc: `Girdi geçersiz: ${m}`, hata: true }); continue; }
      try { const out = await a.calistir(p.data, ctx); const s = typeof out === "string" ? out : JSON.stringify(out);
        results.push({ type: "tool_result", tool_use_id: t.id, content: s.slice(0, 24_000) }); adimlar.push({ arac: t.name, girdi: p.data, sonuc: ozetle(t.name, out) });
      } catch (e) { const m = (e as Error).message; results.push({ type: "tool_result", tool_use_id: t.id, content: `Hata: ${m}`, is_error: true }); adimlar.push({ arac: t.name, girdi: p.data, sonuc: m, hata: true }); }
    }
    messages.push({ role: "user", content: results });
    if (tur === (o.maxTur ?? 10) - 1) durdu = "Azami adım sayısına ulaşıldı";
  }
  const yanit = (son?.content ?? []).filter((b): b is Anthropic.TextBlock => b.type === "text").map((b) => b.text).join("\n\n").trim();
  return { ajan: def.id, model: o.model, yanit, adimlar, yazilan: ctx.yazilan, usage, durdu, stop: son?.stop_reason ?? null };
}
function ozetle(arac: string, out: unknown): string {
  const o = out as Record<string, unknown>;
  if (arac === "kaynak_tara") return `${o.toplam} kalem tarandı · ${o.ilgili} ilgili`;
  if (Array.isArray(out)) return `${out.length} kayıt`;
  if (typeof out === "string") return out.slice(0, 120);
  if (o && "eklendi" in o) return `öneri eklendi (${String(o.eklendi)})`;
  if (o && "eklenmedi" in o) return String(o.eklenmedi);
  if (o && "kontroller" in o) return `${(o.kontroller as unknown[]).length} kontrol`;
  if (o && "politikalar" in o) return `${(o.islemler as unknown[]).length} işlem · politika durumu`;
  return "tamam";
}

/* ---------------- Rotalar ---------------- */
export function registerHukuk(app: FastifyInstance, store: Store, opts: { client?: AjanClient; fetchImpl?: Fetch } = {}) {
  let client: AjanClient | null = opts.client ?? null;
  const getClient = () => (client ??= new Anthropic() as unknown as AjanClient);
  const who = (req: { session?: { u: string } | null }) => req.session?.u ?? "anon";

  app.get("/api/hukuk/tanimlar", async () => ({ kaynaklar: KAYNAKLAR, konular: KONULAR.map(([t]) => t), politikalar: POLITIKALAR, islemler: ISLEMLER, riskKategori: RISK_KATEGORI,
    ajanlar: AJANLAR.map(({ sistem: _s, ...a }) => ({ ...a, araclar: a.araclar.map((n) => ({ ad: n, aciklama: n === "web_search" ? "Anthropic web araması — yalnız kaynak listesindeki alan adları" : (ARACLAR[n]?.tanim.description ?? "planlı") })) })) }));

  app.post("/api/hukuk/tara", async (req, reply) => {
    const b = z.object({ kaynak: z.union([z.enum(OTOMATIK as unknown as [KaynakId, ...KaynakId[]]), z.literal("hepsi")]), tarih: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional() }).parse(req.body);
    const list = b.kaynak === "hepsi" ? (OTOMATIK as KaynakId[]) : [b.kaynak];
    const sonuclar: MevzuatSonuc[] = []; const hatalar: { kaynak: string; hata: string }[] = [];
    await Promise.all(list.map(async (k) => { try { sonuclar.push(...(await tara(k, { tarih: k === "resmi-gazete" ? b.tarih : undefined, fetchImpl: opts.fetchImpl }))); } catch (e) { hatalar.push({ kaynak: k, hata: (e as Error).message }); } }));
    if (!sonuclar.length && hatalar.length) return reply.status(502).send({ sonuclar, hatalar });
    return { taranan: list, sonuclar: sonuclar.sort((a, b) => b.ilgi - a.ilgi || b.tarih.localeCompare(a.tarih)), hatalar, zaman: new Date().toISOString() };
  });

  app.post("/api/ajan/calistir", async (req, reply) => {
    const b = z.object({ ajan: z.string().max(20), girdi: z.string().min(3).max(4000), sirket: z.string().max(80).optional(), baglam: z.string().max(20_000).optional(),
      modelTier: z.enum(["quick", "default", "complex"]).optional(), web: z.boolean().optional() }).parse(req.body);
    if (!opts.client && !process.env.ANTHROPIC_API_KEY) return reply.status(503).send({ hata: "ANTHROPIC_API_KEY tanımlı değil" });
    const bud = budgetOf(store); const tier = b.modelTier ?? "default";
    if (bud.kapali.includes(tier)) return reply.status(403).send({ hata: `"${tier}" kademesi admin tarafından kapatıldı` });
    const spent = store.usageSum(monthStart()).usd;
    if (bud.aylikUsd > 0 && spent >= bud.aylikUsd) return reply.status(402).send({ hata: `Aylık Vibe bütçesi doldu ($${spent.toFixed(2)} / $${bud.aylikUsd})` });
    const model = TIER[tier]; if (!PRICES[model]) return reply.status(500).send({ hata: "model fiyatı yok" });
    try {
      const r = await ajanCalistir({ client: getClient(), store, ajan: b.ajan, girdi: b.girdi, sirket: b.sirket, baglam: b.baglam, kim: who(req), model, maxTokens: Math.min(bud.tierMax[tier], 16000), web: b.web !== false, fetchImpl: opts.fetchImpl });
      store.addUsage({ user: who(req), model, tier, kaynak: `ajan-${r.ajan}`, input: r.usage.input, output: r.usage.output, cacheWrite: r.usage.cacheWrite, cacheRead: r.usage.cacheRead, usd: r.usage.usd, durum: r.durdu ? "kesildi" : "ok" });
      return { ...r, ayUsd: spent + r.usage.usd, tavanUsd: bud.aylikUsd };
    } catch (e) {
      const sc = (e as { statusCode?: number }).statusCode;
      if (sc === 400) return reply.status(400).send({ hata: (e as Error).message });
      const msg = e instanceof Anthropic.APIError ? `${e.status} ${e.message}` : (e as Error).message;
      return reply.status(502).send({ hata: msg });
    }
  });
}
