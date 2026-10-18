// Problem veri seti tipleri — kaynak: data/schema.md (Şema v1)

export const BASE_SKORLAR = [
  "hacim", "aci", "ai_uygunlugu", "tr_surtunmesi", "inference_yogunlugu",
  "gecis_maliyeti", "cozum_bollugu", "odeme_gucu", "kurulum_karmasikligi",
  "mevzuat_bagimliligi", "rekabet_yogunlugu", "mevsimsellik", "satis_dongusu",
] as const;

export type BaseSkor = (typeof BASE_SKORLAR)[number];
export type Skorlar = Record<BaseSkor, number>;

export const FIRSAT_SKORLARI = ["icerik_onceligi", "affiliate_skoru", "hizmet_skoru", "private_label"] as const;
export const TURETILEN_SKORLAR = [...FIRSAT_SKORLARI, "risk_skoru"] as const;
export type TuretilenSkor = (typeof TURETILEN_SKORLAR)[number];
export type Hesaplanan = Record<TuretilenSkor, number>;

export const FONKSIYONLAR = [
  "hukuk", "finans-muhasebe", "satis", "pazarlama", "ik",
  "operasyon", "tedarik", "musteri", "veri-bt", "yonetim",
] as const;
export type Fonksiyon = (typeof FONKSIYONLAR)[number];

export const DURUMLAR = ["taslak", "dogrulandi", "olculdu", "yayinda"] as const;
export type Durum = (typeof DURUMLAR)[number];

export interface Problem {
  id: string;
  ad: string;
  ozet: string;
  musteri_dili: string[];
  fonksiyon: Fonksiyon;
  yayilim: "yatay" | "secili";
  sektorler: string[];
  tetikleyici: string;
  bugun_nasil_cozuluyor: string;
  alici_persona: string;
  odeme_istekliligi: string;
  tr_ozgunluk_notu: string;
  cozum_adaylari: { global: string[]; turkiye: string[] };
  kanit_metrigi: string[];
  veri_ihtiyaci: string;
  skorlar: Skorlar;
  durum: Durum;
  kaynak_notu?: string;
}

export interface Paket {
  paket: number;
  ad: string;
  surum: string;
  not?: string;
  problemler: Problem[];
}

export interface Sektor {
  id: string;
  ad: string;
  lansman: boolean;
  not?: string;
}

/** Skorlanmış problem: API ve arayüzün kullandığı biçim. */
export interface ScoredProblem extends Problem {
  paket: number;
  hesaplanan: Hesaplanan;
  plAday: boolean;
}

export type Esikler = Record<TuretilenSkor, number>;
