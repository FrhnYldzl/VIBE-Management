#!/usr/bin/env python3
"""
Problem veri seti skorlayıcı (v2).

data/problems/package-*.json dosyalarını okur, türetilen skorları hesaplar,
data/problems.csv ve data/rankings.md üretir.

Formüller ve eşikler: data/schema.md → bölüm 5
Eşikler mutlak değil, göreli (P75) — veri seti büyüdükçe kendini ayarlar.
"""
import csv
import glob
import json
import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PKG_GLOB = os.path.join(ROOT, "data", "problems", "package-*.json")

BASE_SKORLAR = [
    "hacim", "aci", "ai_uygunlugu", "tr_surtunmesi", "inference_yogunlugu",
    "gecis_maliyeti", "cozum_bollugu", "odeme_gucu", "kurulum_karmasikligi",
    "mevzuat_bagimliligi", "rekabet_yogunlugu", "mevsimsellik", "satis_dongusu",
]

# "~alan" = ters cevrilir (6 - deger)
FORMULLER = {
    "icerik_onceligi": [("hacim", 0.40), ("aci", 0.30), ("tr_surtunmesi", 0.30)],
    "affiliate_skoru": [("hacim", 0.35), ("cozum_bollugu", 0.35), ("odeme_gucu", 0.30)],
    "hizmet_skoru": [("aci", 0.30), ("odeme_gucu", 0.30), ("kurulum_karmasikligi", 0.25),
                     ("~satis_dongusu", 0.15)],
    "private_label": [("hacim", 0.22), ("tr_surtunmesi", 0.22), ("inference_yogunlugu", 0.18),
                      ("~gecis_maliyeti", 0.13), ("~cozum_bollugu", 0.13),
                      ("~rekabet_yogunlugu", 0.12)],
    "risk_skoru": [("mevzuat_bagimliligi", 0.40), ("mevsimsellik", 0.30), ("satis_dongusu", 0.30)],
}

# risk_skoru tersine yorumlanir: yuksek = kotu
FIRSAT_SKORLARI = ["icerik_onceligi", "affiliate_skoru", "hizmet_skoru", "private_label"]


def hesapla(skorlar):
    out = {}
    for ad, terimler in FORMULLER.items():
        toplam = 0.0
        for alan, agirlik in terimler:
            ters = alan.startswith("~")
            anahtar = alan[1:] if ters else alan
            deger = skorlar[anahtar]
            if ters:
                deger = 6 - deger
            toplam += deger * agirlik
        out[ad] = round(toplam * 20, 1)
    return out


def p75(degerler):
    """Basit yuzdelik (lineer interpolasyon)."""
    s = sorted(degerler)
    if len(s) == 1:
        return s[0]
    k = 0.75 * (len(s) - 1)
    alt, ust = int(k), min(int(k) + 1, len(s) - 1)
    return s[alt] + (k - alt) * (s[ust] - s[alt])


def yukle():
    problemler = []
    gorulen = {}
    for yol in sorted(glob.glob(PKG_GLOB)):
        with open(yol, encoding="utf-8") as f:
            paket = json.load(f)
        for p in paket["problemler"]:
            eksik = [s for s in BASE_SKORLAR if s not in p["skorlar"]]
            if eksik:
                raise SystemExit(f"[HATA] {p['id']}: eksik skor alanı -> {eksik}")
            if p["id"] in gorulen:
                raise SystemExit(f"[HATA] mükerrer id: {p['id']} (paket {gorulen[p['id']]} ve {paket['paket']})")
            gorulen[p["id"]] = paket["paket"]
            p["paket"] = paket["paket"]
            p["hesaplanan"] = hesapla(p["skorlar"])
            problemler.append(p)
    return problemler


def csv_yaz(problemler, yol):
    alanlar = (["id", "ad", "fonksiyon", "yayilim", "paket", "durum"]
               + BASE_SKORLAR + list(FORMULLER.keys())
               + ["aday_mi", "sektorler", "odeme_istekliligi"])
    with open(yol, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=alanlar, extrasaction="ignore")
        w.writeheader()
        for p in problemler:
            satir = {k: p.get(k) for k in
                     ("id", "ad", "fonksiyon", "yayilim", "paket", "durum", "odeme_istekliligi")}
            satir.update(p["skorlar"])
            satir.update(p["hesaplanan"])
            satir["aday_mi"] = "EVET" if p.get("_pl_aday") else ""
            satir["sektorler"] = ", ".join(p["sektorler"])
            w.writerow(satir)


def tablo(problemler, anahtar, baslik, n=10, aciklama=""):
    sirali = sorted(problemler, key=lambda p: p["hesaplanan"][anahtar], reverse=True)[:n]
    satirlar = [f"### {baslik}", ""]
    if aciklama:
        satirlar += [aciklama, ""]
    satirlar += ["| # | Problem | Skor | Paket |", "|---|---|---|---|"]
    for i, p in enumerate(sirali, 1):
        satirlar.append(f"| {i} | {p['ad']} | **{p['hesaplanan'][anahtar]:.0f}** | {p['paket']} |")
    satirlar.append("")
    return "\n".join(satirlar)


def rankings_yaz(problemler, yol, esikler, adaylar):
    b = [
        "# Problem Sıralamaları",
        "",
        f"Toplam **{len(problemler)}** problem. `scripts/score.py` üretir — elle düzenleme.",
        "",
        "## Eşikler (P75 — üst çeyrek)",
        "",
        "| Skor | P75 eşiği | Geçen |",
        "|---|---|---|",
    ]
    for ad in FIRSAT_SKORLARI + ["risk_skoru"]:
        gecen = sum(1 for p in problemler if p["hesaplanan"][ad] >= esikler[ad])
        b.append(f"| {ad} | {esikler[ad]:.0f} | {gecen} |")
    b += ["", tablo(problemler, "icerik_onceligi", "İçerik önceliği — ilk yazılacaklar"),
          tablo(problemler, "affiliate_skoru", "Affiliate potansiyeli — anlaşma aranacaklar"),
          tablo(problemler, "hizmet_skoru", "Hizmet potansiyeli — 'biz kuralım' teklifi konacaklar"),
          tablo(problemler, "private_label", "Private-label ham sıralama")]

    b += ["### Private-label ADAYLARI (private_label P75 üstü VE risk P75 altı)", ""]
    if adaylar:
        b += ["| # | Problem | PL | Risk | Paket |", "|---|---|---|---|---|"]
        for i, p in enumerate(adaylar, 1):
            b.append(f"| {i} | {p['ad']} | **{p['hesaplanan']['private_label']:.0f}** | "
                     f"{p['hesaplanan']['risk_skoru']:.0f} | {p['paket']} |")
    else:
        b.append("_Aday yok._")
    b += ["", "> Aday ≠ karar. Geliştirme kararı için canlı talep sinyali (arama/boş sonuç logu) şart.", ""]

    # sektor bazli icerik onceligi — dikey problemlerin hacmi dusuk oldugu icin gerekli
    b += ["## Sektör bazlı içerik önceliği", "",
          "_Dikey problemler Türkiye geneli hacimde doğal olarak düşük skor alır; "
          "sektör içi sıralama operasyonel önceliği gösterir._", ""]
    sektorler = sorted({s for p in problemler for s in p["sektorler"]})
    for sek in sektorler:
        alt = [p for p in problemler if sek in p["sektorler"]]
        if len(alt) < 3:
            continue
        b.append(tablo(alt, "icerik_onceligi", f"{sek} ({len(alt)} problem)", n=5))

    with open(yol, "w", encoding="utf-8") as f:
        f.write("\n".join(b))


def main():
    problemler = yukle()
    if not problemler:
        raise SystemExit("[HATA] Paket bulunamadı.")

    esikler = {ad: p75([p["hesaplanan"][ad] for p in problemler]) for ad in FORMULLER}

    adaylar = [p for p in problemler
               if p["hesaplanan"]["private_label"] >= esikler["private_label"]
               and p["hesaplanan"]["risk_skoru"] < esikler["risk_skoru"]]
    adaylar.sort(key=lambda p: p["hesaplanan"]["private_label"], reverse=True)
    for p in adaylar:
        p["_pl_aday"] = True

    csv_yolu = os.path.join(ROOT, "data", "problems.csv")
    md_yolu = os.path.join(ROOT, "data", "rankings.md")
    csv_yaz(problemler, csv_yolu)
    rankings_yaz(problemler, md_yolu, esikler, adaylar)

    print(f"{len(problemler)} problem islendi -> data/problems.csv, data/rankings.md")
    print()
    for ad in FIRSAT_SKORLARI + ["risk_skoru"]:
        gecen = sum(1 for p in problemler if p["hesaplanan"][ad] >= esikler[ad])
        print(f"  {ad:18s} P75={esikler[ad]:5.1f}  gecen={gecen}")
    print()
    print(f"Private-label ADAYI: {len(adaylar)}")
    for p in adaylar:
        print(f"  - [{p['hesaplanan']['private_label']:.0f} / risk {p['hesaplanan']['risk_skoru']:.0f}] {p['ad']}")


if __name__ == "__main__":
    main()
