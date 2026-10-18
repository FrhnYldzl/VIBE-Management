// Skor motoru — scripts/score.py'nin birebir TS karşılığı.
// Formüller ve eşikler: data/schema.md → bölüm 5. Değişiklik iki tarafta birlikte yapılır.
import {
  BASE_SKORLAR, TURETILEN_SKORLAR,
  type Esikler, type Hesaplanan, type Paket, type ScoredProblem, type Skorlar, type TuretilenSkor, type BaseSkor,
} from "./types.ts";

type Terim = [alan: BaseSkor, agirlik: number, ters?: boolean];

/** ters = true → (6 − değer) */
export const FORMULLER: Record<TuretilenSkor, Terim[]> = {
  icerik_onceligi: [["hacim", 0.40], ["aci", 0.30], ["tr_surtunmesi", 0.30]],
  affiliate_skoru: [["hacim", 0.35], ["cozum_bollugu", 0.35], ["odeme_gucu", 0.30]],
  hizmet_skoru: [["aci", 0.30], ["odeme_gucu", 0.30], ["kurulum_karmasikligi", 0.25], ["satis_dongusu", 0.15, true]],
  private_label: [
    ["hacim", 0.22], ["tr_surtunmesi", 0.22], ["inference_yogunlugu", 0.18],
    ["gecis_maliyeti", 0.13, true], ["cozum_bollugu", 0.13, true], ["rekabet_yogunlugu", 0.12, true],
  ],
  risk_skoru: [["mevzuat_bagimliligi", 0.40], ["mevsimsellik", 0.30], ["satis_dongusu", 0.30]],
};

const round1 = (n: number) => Math.round(n * 10) / 10;

export function hesapla(skorlar: Skorlar): Hesaplanan {
  const out = {} as Hesaplanan;
  for (const ad of TURETILEN_SKORLAR) {
    let toplam = 0;
    for (const [alan, agirlik, ters] of FORMULLER[ad]) {
      const deger = ters ? 6 - skorlar[alan] : skorlar[alan];
      toplam += deger * agirlik;
    }
    out[ad] = round1(toplam * 20);
  }
  return out;
}

/** Basit yüzdelik (lineer interpolasyon) — score.py p75 ile aynı. */
export function p75(degerler: number[]): number {
  const s = [...degerler].sort((a, b) => a - b);
  if (s.length === 0) return 0;
  if (s.length === 1) return s[0]!;
  const k = 0.75 * (s.length - 1);
  const alt = Math.floor(k);
  const ust = Math.min(alt + 1, s.length - 1);
  return s[alt]! + (k - alt) * (s[ust]! - s[alt]!);
}

export function validate(paketler: Paket[]): void {
  const gorulen = new Map<string, number>();
  for (const paket of paketler) {
    for (const p of paket.problemler) {
      const eksik = BASE_SKORLAR.filter((s) => !(s in p.skorlar));
      if (eksik.length) throw new Error(`${p.id}: eksik skor alanı -> ${eksik.join(", ")}`);
      const onceki = gorulen.get(p.id);
      if (onceki !== undefined) throw new Error(`mükerrer id: ${p.id} (paket ${onceki} ve ${paket.paket})`);
      gorulen.set(p.id, paket.paket);
    }
  }
}

export interface ScoredDataset {
  problemler: ScoredProblem[];
  esikler: Esikler;
  adaylar: ScoredProblem[];
}

/** Paketleri skorlar, P75 eşiklerini ve private-label adaylarını üretir. */
export function scoreDataset(paketler: Paket[]): ScoredDataset {
  validate(paketler);
  const problemler: ScoredProblem[] = paketler.flatMap((paket) =>
    paket.problemler.map((p) => ({ ...p, paket: paket.paket, hesaplanan: hesapla(p.skorlar), plAday: false })),
  );
  const esikler = {} as Esikler;
  for (const ad of TURETILEN_SKORLAR) esikler[ad] = p75(problemler.map((p) => p.hesaplanan[ad]));

  const adaylar = problemler
    .filter((p) => p.hesaplanan.private_label >= esikler.private_label && p.hesaplanan.risk_skoru < esikler.risk_skoru)
    .sort((a, b) => b.hesaplanan.private_label - a.hesaplanan.private_label);
  for (const p of adaylar) p.plAday = true;

  return { problemler, esikler, adaylar };
}

export const SKOR_ETIKETLERI: Record<BaseSkor | TuretilenSkor, string> = {
  hacim: "Hacim",
  aci: "Acı",
  ai_uygunlugu: "AI uygunluğu",
  tr_surtunmesi: "TR sürtünmesi",
  inference_yogunlugu: "Inference yoğunluğu",
  gecis_maliyeti: "Geçiş maliyeti",
  cozum_bollugu: "Çözüm bolluğu",
  odeme_gucu: "Ödeme gücü",
  kurulum_karmasikligi: "Kurulum karmaşıklığı",
  mevzuat_bagimliligi: "Mevzuat bağımlılığı",
  rekabet_yogunlugu: "Rekabet yoğunluğu",
  mevsimsellik: "Mevsimsellik",
  satis_dongusu: "Satış döngüsü",
  icerik_onceligi: "İçerik önceliği",
  affiliate_skoru: "Affiliate",
  hizmet_skoru: "Hizmet",
  private_label: "Private-label",
  risk_skoru: "Risk",
};

export const FONKSIYON_ETIKETLERI: Record<string, string> = {
  hukuk: "Hukuk",
  "finans-muhasebe": "Finans & Muhasebe",
  satis: "Satış",
  pazarlama: "Pazarlama",
  ik: "İK",
  operasyon: "Operasyon",
  tedarik: "Tedarik",
  musteri: "Müşteri",
  "veri-bt": "Veri & BT",
  yonetim: "Yönetim",
};

export const DURUM_ETIKETLERI: Record<string, string> = {
  taslak: "Taslak",
  dogrulandi: "Doğrulandı",
  olculdu: "Ölçüldü",
  yayinda: "Yayında",
};
