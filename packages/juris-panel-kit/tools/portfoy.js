// node tools/portfoy.js — v0.6.4 · MTFG portföy şirketleri: Drive (MTFG ortak sürücüsü · 02. Şirketler / 03. Projeler) listesinden Kurumsal Yönetim Paneli veri dosyaları
// Liste Drive bağlayıcısıyla 22.10.2026'da alındı; service account MTFG sürücüsünü göremediği için ağaç burada sabitlenir, günlük senkron paylaşım sonrası devralır.
const fs = require("fs"), path = require("path");
const KIT = path.join(__dirname, "..");
const { generateDataJs } = require(KIT + "/tools/intake.js");
const FO = (id) => `https://drive.google.com/drive/folders/${id}`;
const d = (n, id) => ({ name: n, link: `https://docs.google.com/document/d/${id}/edit` });
const s = (n, id) => ({ name: n, link: `https://docs.google.com/spreadsheets/d/${id}/edit` });
const f = (n, id) => ({ name: n, link: `https://drive.google.com/file/d/${id}/view` });
const it = (title, id, files = [], subfolders = []) => ({ id, title, url: FO(id), files, subfolders });
const sec = (title, id, items) => ({ id, title, url: FO(id), items });
const SCANNED = "2026-10-22T09:00:00.000Z";

const COMPANIES = [
  {
    client: { id: "juris", name: "Juris Avukatlık Ortaklığı", short: ["Juris"], entities: ["Juris Avukatlık Ortaklığı"],
      driveRoot: FO("1vZZdZH5QiCVs3IQ3Wv-4YFOOjUgGNcJ4"),
      portfolio: { tur: "Şirket", kategori: "Hizmet İhracatı", pay: 100, digerleri: "—", rol: "Yönetim", not: "Danışmanlık hattının operatörü; funnel'ın giriş kapısı" } },
    sections: [
      sec("1. Teklif ve Sözleşmeler", "10z3CSr7tWulKPe91jK-HaTfLt5UTsuPA", [it("Teklif ve sözleşme seti", "10z3CSr7tWulKPe91jK-HaTfLt5UTsuPA", [
        d("Juris - Nadda - Radius Kurumsal Yönetim ve Yapılandırma Danışmanlık Sözleşmesi 01.10.2025", "1wNxjQX4JxUw5AcSj6UN6dmpE7s7vE0uafHxg5FAWN6Y"),
        d("Juris - Danışmanlık Sözleşmesi - Onscala", "1LLlOjwv8SKx8ww511k9ougZw7sKdlW2aFlYCGb0gVCo"), d("Onscala Sunulacak Hizmetler", "1v7Zj273PX_7p7XvfYi7x5ttJfHb0KArYTQAq_324Qiw"),
        d("Juris - Danışmanlık Sözleşmesi - Zyrone", "1GryaA3di1lj6ATcyiVDS_GilN7rCQChRWeEAOMKIEVE"), f("Zyrone Güncel Teklif - Mart 2026 Teklifi.pdf", "1c137npKNYU003_f96Kw0rMVwWBjZGBEu"),
        d("Hukuki Bilgilendirme ve Risk Tespiti Formu - Zyrone D.", "1FumDJZWfuJZz5P6EVsgENlm4SVYA945oJ-QKnuP6bYY"),
        d("Ave Şirketler Hukuku ve Kurumsal Yönetim Danışmanlık Sözleşmesi", "1jbCyuecMADQH-aTnSNBS42DFcFD6N12p25nKid8xaBw"), d("Ave-Juris Alacak Mutabakat Protokolü", "1ZNkgloEi5yJRjnb3wgFf85HLmtWsu1-nuZ6Ey_89aEU")])]),
      sec("Juris Hizmet Sözleşmeleri", "1a8FlImBosjcBMijLMUwSURv1MXoHwMxH", [
        it("Strateji ve iş modeli matrisi (S · İ · D · R)", "1a8FlImBosjcBMijLMUwSURv1MXoHwMxH", [s("Strateji - İcra - Denetim - Raporlama", "1tG2wzawmEHmEog9AzWYcfsM-BqC46lWVBFN0NtbM1cU")]),
        it("Codemag · teklif ve sözleşme", "1pInc0Bxw0PcWYTVkyWfzAS9TSxd8ThxZ", [], ["0. Codemag Hakkında"]),
        it("Korenel · teklif ve sözleşme", "115GRyaTnSGZP52IHaf9CKIt_lWqceRGm", [], ["0. Korenel Hakkında"])]),
      sec("00. Müvekkil Hizmet Planları", "1nUD0r2m4VpI2ZkIEKitfe_6uNaIRMHCD", [it("Müvekkil hizmet planları", "1nUD0r2m4VpI2ZkIEKitfe_6uNaIRMHCD", [
        s("Qervan-We Trade Juris Hizmet Planı", "1M33Yqi6-OSp0Z2glA9YV_1uHTVnYRnE15toi-MXGMdE"), s("Codemag-Juris Hizmet Planı", "1Wa7sEaJg4hkgDLEXaE7FViaPbqYDA6Ek6R0otjh6-is"), s("Korenel-Juris Hizmet Planı", "1D1J5JED72X3c6ciKTR27ZmWwo_-aghisc2HFRM0wDpg")])]),
      sec("2.1. Juris-İş Geliştirme", "1HkhJDg8xZPIC0CJjMfnjC-MoUqdbsvj7", [it("2.1. İş geliştirme dosyaları", "1HkhJDg8xZPIC0CJjMfnjC-MoUqdbsvj7", [], ["Konkordato Eğitimi", "16-Kitle Fonlaması Mevzuat"])]),
      sec("2.3. Juris-Pazarlama", "1AAvrinaGnslg44iOmU6vaCTvhwdvRLGj", [it("2.3. Pazarlama · içerik ve lead generation", "1AAvrinaGnslg44iOmU6vaCTvhwdvRLGj", [
        f("Juris_Icerik_ve_Lead_Generation_Plani.docx", "1HjkfVaD0OwDsGoD5YCyNiRn13pnl7TDd"), f("Juris_Icerik_Takvimi_ve_Surec.xlsx", "1vJTr0Kh0rmpuItKyhFRCL9zfd2YO82X5"),
        f("Juris_MnA_Icerik_Mimarisi_v2.docx", "1DJKrmX5ge99iadN3qVSzrA__2j-AmYOK"), f("Yazi_Dizisi_Plani.docx", "1Bhyn5pxKLEIDEeflzMIbZ7kVL6rAhSza"),
        f("Girişim Yatırım Hukuku Eğitim Akışı ve İçerik Dizini.docx", "1r7ibdpiDI_RE30lJcJU59HNWE6kVtM5F"), f("Juris_MnA_Ornek_Makale_Mittelstand.docx", "1_OhoQWJxjwrBVaGUnlv_8vSk4CdWSqh9"),
        f("Turkmenistan_Ornek_Makale.docx", "1gIqeeh0-eUZII-3k2rubywwjMnZnIUln"), f("Turkiye_Yatirim_Tahkimi_Veri_Seti.xlsx", "1MgCZRrU3qj07MlCDi8ZNVmDd9tso-ny7"),
        f("Juris Avukatlık Platform Landing Page.zip", "1m25Tn_VI4xoDcG2s-DD8Kw6JoprbMGZv")], ["2.3.1. Juris Medya", "2.3.2. Juris İçerik Projeleri", "2.3.3. Teknopark Ankara Eğitimi", "Juris-Kapak-Sablonu", "012 | JURIS"])]),
      sec("2.4. Juris-Satış", "1uzwYNWVfRcbC4UkLh4mYXAFtwX2pRwui", [it("2.4. Satış · aday müşteri dosyaları", "1uzwYNWVfRcbC4UkLh4mYXAFtwX2pRwui", [], ["1-Art Carpet | Kapalı", "2. Ones | Devam Ediyor", "3. Kaptın Kaptın", "4. Mağzan Olsun", "5. Morali", "6. Çakmak Metal", "7. Yataş"])]),
      sec("2.5. Juris Denetim", "1IlaOGSxympIEHIwgfZGGF7DLjK9xcJJm", [it("2.5. Bütçe ve finansal tablo", "1IlaOGSxympIEHIwgfZGGF7DLjK9xcJJm", [
        f("Juris Hedeflenen Bütçe 2026.xlsx", "1zPH57waWo8eLroRMRLORAxOsaxTSLC3j"), f("Juris Finansal-01.06.2026.xlsx", "1ujq3T72R1_aOtrLu2IQE42VCpEdF0_0b"), f("Juris Finansal-01.03.2026.xlsx", "1GEgyjrH7CwOf1UbOyH1Fad0D9mw8xHhk")])]),
      sec("Juris | Faaliyet Raporu", "1bld1gM20UyirtZ1SC1Nco7e0FUCQj98i", [it("Aylık faaliyet raporları", "1bld1gM20UyirtZ1SC1Nco7e0FUCQj98i", [
        d("Juris Aylık Faaliyet Raporu 03/2026", "1vj-m0WXNAJRmy2jNyTuHmbufzrnFfn3uths96MBkAUQ"), d("Juris Aylık Faaliyet Raporu 02/2026", "1PwWl7VHypyMM2gAKEA2TAji4IaYrqkTUmKcCmiykvGo"),
        d("Juris Aylık Faaliyet Raporu 10/2025", "13e3QvrlGiGOL9tgNchdPuXfXybuIs_kch6N0zbsg8ZM"), d("Juris Aylık Faaliyet Raporu - Format", "18y1atopoajJVOfkToC00uvsRuOsxAwjRz1Q-z_-UyEE")])]),
    ],
  },
  {
    client: { id: "fevup", name: "Fevup Brands", short: ["Fevup"], entities: ["Fevup Brands"],
      driveRoot: FO("1cvWlSBfJky8s6Czh7nxVAY-lW1-O3oXk"),
      portfolio: { tur: "Şirket", kategori: "Mal İhracatı", pay: 44.1, digerleri: "Mercan Kimya A.Ş. %51 · Burak Derelli %4,9", rol: "Yatırım", not: "Hissedarlık sözleşmesi · non-compete kapsamı" } },
    sections: [
      sec("1.1. Fevup Operasyon", "1GsKKCWcmYyLNtFUC3gcnmDiGWQuURpn3", [
        it("1.1.1. Fevup-Hizmetler & Teşvikler", "1nXlFwiKU3omRYbaCqpXxUG28TyQtaXJ7"),
        it("1.1.2. Fevup-Hukuk ve Kurumsal İletişim", "1_2GJWWWUqfDStsKkVDTqAOHNc_uErOJ3", [], ["7. Fevup | Uyum Projesi"]),
        it("1.1.3. Fevup-Kurumsal İlişkiler", "1v2GvWbjcaix8eTPSzezoAPwpErV9FppK", [], ["14. Heyet Raporları"])]),
      sec("1.2. Fevup Denetim", "1YLfBdHL7dOSP0A8F0rNk0xbUtFqbHZLr", [
        it("Kurucu grup değerlendirmesi ve yol haritası", "1YLfBdHL7dOSP0A8F0rNk0xbUtFqbHZLr", [
          d("Fevup Kurucu Grup - 2025 Yılı Değerlendirmesi ve 2026 Yol Haritası", "17qBMGbg87yNBMmPjrz1TYgaMuCY-bakAODXMaKZF1Og"), d("FEVUP BRANDS Ortaklar İçin Sorun Analizi ve Öneri Yol Haritası", "1znni8OE7VhaVVEV40-Vbj9r7KdUft4hQcPiI8OKX8qc")]),
        it("1.2.1. Fevup | Yönetim Kurulu Toplantı Tutanakları", "1m7qdnELrJvA44uSc67TzHClniEC09Dqc", [
          d("1. Fevup YK Koordinasyon Toplantı Tutanağı | 01.12.2025", "1qbSJ7p_YQ_n4wDROEuzkWvXe6TyzMtO5WVxQGSjLiE4"), d("2. Fevup YK Koordinasyon Toplantı Tutanağı | 04.12.2025", "1_FwOEYSXEN6u2TsG9SS5yTiw8Wrt9sz3R0KeEHEUDGY"),
          d("3. Fevup YK Koordinasyon Toplantı Tutanağı | 04.03.2026", "1MOb6kh5SgKYz1MVj7cS1rM4cpNsizDie96yXheBbBKs"), f("3.1. İngiltere E-İhracat Heyet Katılım Raporu.pdf", "1eHPGzsuOCX26HTqE7w9o1qUUJqqDTAED"),
          f("3.2. Almanya E-İhracat Heyeti Katılım Raporu.pdf", "1NMhWMNcyhtHI6g-1436K9VKjB-JCl75y"), d("4. Fevup YK Koordinasyon Toplantı Tutanağı | 09.03.2026", "1L_1m9TzO1vZSa8VovrLbCqVbc4vooRKrBXuXYGMvV9U"),
          f("4.1. FEVUP - Taslak Yetki, Görev ve Onay Belgeleri.pdf", "1AN-tzOqkjFtUPx5IqbGwRgGhmgrzDnPy"), d("5. Fevup YK Koordinasyon Toplantı Tutanağı | 23.03.2026", "1mwaYENKUlCvpQJXQ0YlRh8BMkE7x1zoi6P5y9xm1kpA")]),
        it("1.2.2. Fevup 2026 Bütçe", "1KmZjKAKARW3A4rx0uGVfWCreUfKr9I61", [f("Fevup 2026 Bütçe.xlsx", "1KFPJsnMMdFqwhKhU-5mcISU7VcZemwXZ")]),
        it("1.2.3. Fevup 2026 Haftalık Operasyon Raporları", "1Mwpo45b83EhH-BaFNlX9vVdK76YsqbKZ", [
          ["1. 29 Aralık-4 Ocak", "1HA9pZEX7nRx_cxX43i_DC0BEYZmJSILV"], ["2. 5-11 Ocak", "1ahpM5lvhTr4ws_v8pQrKTcbfCE9bX-p0"], ["3. 12-18 Ocak", "1J9fdFv8t3aBq2OyABM1uhOUkBQwMl4lz"],
          ["4. 19-25 Ocak", "18kgWqghjLIYTtLlq19m45wd34QB2us_h"], ["5. 26 Ocak - 1 Şubat", "1OPcByXhtjmfmuHdn8wGg6lWKr7LIAtCz"], ["6. 2-8 Şubat", "1AZd18khJbN9o8vwq3Q9mf5jH16SnjYZ9"],
          ["7. 9-15 Şubat", "1-JtZ5efsKQNmraNdaHXhVxpGo6zxD0F9"], ["8. 16-22 Şubat", "1FhURaJsm1P41bqNeDndibW4AhhVbEd-W"], ["9. 23 Şubat - 1 Mart", "1a8mqel1INOJnV8xYwJt_cr6USywYNyo3"],
          ["10. 2-8 Mart", "1qv2Gzqgo9wWL3wKyvPvT7vVHXhFZApir"], ["11. 9-15 Mart", "16AB5OfFlXicJwMQFoUjA0iSIlhyFBybc"], ["12. 16-22 Mart", "1Am4li7SnEsPetd_zmA9gLsBcHUTH8UWG"],
          ["13. 23-29 Mart", "1xbyVVqnrcZynd4TEZwVUzPo258B03FNW"], ["14. 30 Mart - 5 Nisan", "1nKnZKDwfzRSLbGi1wXpjFGF7Kg2OdeJI"], ["15. 6-12 Nisan", "1-pLAAvO6UhCJuxM2Dg0LmcEw1hoWVoa9"],
          ["16. 13-19 Nisan", "1qQDuebDRreZzYG0z8WztaEXtDqmlJnrM"], ["17. 20-26 Nisan", "1o3Fr98zRm3IBz-pviA3nkiibGDpC1vYz"], ["18. 27 Nisan-3 Mayıs", "1jF2c_lPh3X6reMkHv5ODWQAuX4Q0lZa_"],
          ["19. 4-10 Mayıs", "19ohqqox7j_AsI2VBWb3UHbeUOKRF6EHV"], ["20. 11-17 Mayıs", "1yHRycdU7IeRoQy0W4SAYU9SBMeIwYjah"], ["21. 18-31 Mayıs", "1oNGcG4VRc6cietvEMmzmL5wy3uhD5n54"],
          ["22. 1-7 Haziran", "1sJTAc00_uwkilMOLnmTUdW-KG4cxBGzL"], ["23. 8-14 Haziran", "1vlX9YQVIHY-5Af3mI4AAgREl5JPKl-yj"], ["24. 15-21 Haziran", "10yhPzL8L_KtuvvoJE2P84iGSucFbMU6e"],
        ].map(([n, id]) => f(n + " Haftalık Rapor.pdf", id))),
        it("1.2.4. Fevup 2026 Yönetim Kurulu Faaliyet Raporları", "1ifMAAw6qJ-vBt_XxWbXaIGhJnoG8G67P", [
          f("1. 29 Temmuz 2025 - Fevup Brands Board Members Meeting.pdf", "1K6ztNKR4DH2AGqx5IqZI7pv2xogtajS7"), f("2. Fevup Rapor Eylül.pdf", "10-u2ksEy71IgatwTkOBCs8TggrkAMIlI"),
          f("3. Yönetim Kurulu Faaliyet Raporu - Aralık (Sunum).pdf", "1OoBgyGhjODZ2puAy2_9WXTQ_zcakD61O"), f("Ocak 2026 - Yönetim Kurulu Faaliyet Raporu.pdf", "1ZQCH4ICoi0UNZtjkVmoCvR1jLqufxkfm"),
          f("Mart 2026 - Yönetim Kurulu Faaliyet Raporu.pdf", "1tHF4rQQVXUqchHM894vcEjWAvAY2fOtP"), f("Nisan-Mayıs 2026 - Yönetim Kurulu Faaliyet Raporu.pdf", "1QpQ0rb6EEgkwcWCrWn3NARyPuznjnmfq"),
          f("Yönetim Kurulu Faaliyet Raporu - Haziran.pdf", "1zzwIE_9JZ7KtBq9ohxnlJ2xISLJ1RyVt")])]),
      sec("1.3. Fevup Operasyon Planları", "1nxdJg-lTQmz14SH6VEkqK3HsNe71GOOb", [it("1.3. Fevup Operasyon Planları", "1nxdJg-lTQmz14SH6VEkqK3HsNe71GOOb")]),
    ],
  },
  {
    client: { id: "marqby", name: "Marqby", short: ["Marqby"], entities: ["Marqby"],
      driveRoot: FO("1nkmizTKxtQ8qX7RjKVO77TZ_D4Cy32RP"),
      portfolio: { tur: "Şirket", kategori: "Hizmet İhracatı", pay: 44.1, digerleri: "Beyza Ece %18,9 · Burak Dereli %15,3 · Y. E. Dinç %11,7 · Albaraka SGlobe GSYF %10", rol: "Yatırım", not: "Hissedarlık sözleşmesi · non-compete kapsamı" } },
    sections: [
      sec("3.1 Marqby-Denetim", "1nKLvUA2JwyBOTePaY1NcslJpDLDMZ949", [it("Marqby-Faaliyet Raporları (YK)", "1GJTD6Pg8VORBT3UvxwDVADcp-WdEzSat", [
        f("Marqby-Ocak-Şubat-Mart 2026 Yönetim Kurulu Raporu-Q1.pdf", "18oZ7dzE-Xu9hdVObTqIV0vag1O9zYkvc"), f("Marqby-Nisan Mayıs Yönetim Kurulu Raporu.pdf", "1rx2VsSCPLwtn15Pj6aiaJTKMjdQn8FNZ")])]),
    ],
  },
  {
    client: { id: "d2x", name: "D2-X", short: ["D2-X"], entities: ["D2-X (yapı kararı bekliyor)"],
      driveRoot: FO("1rpfGDScvbjvGBr3he0QWInXjU4S7rwdn"),
      portfolio: { tur: "VCP Projesi", kategori: "Mal İhracatı", pay: 100, digerleri: "—", rol: "Operatörlük", gate: "Gate 1", not: "Operating partner modeli · D2X Planı V.1" } },
    sections: [
      sec("D2X Planı V.1", "1ms4Uc3V4L8tmmudcTnEKBwqAipXl7SwB", [
        it("00. Yönetim ve sürümler", "1RKQpEyVf_IWZCm1ey0w7NWPICSS3De6u", [d("D2X · Doküman haritası ve sürüm kuralları", "1-eGJDF3IlJx2tVYeBoCmCGBOgeP7bfnjTebJkbY6v9M"), d("D2X · Sürüm günlüğü", "1TnsKYajEcl8zbRY0QMB5TvVuz97_u6JvoJ6fiE8og0Q"), d("D2X · Karar günlüğü ve açık kararlar", "1qyi4C5g1JzYYbwu4ZJVEh6-A0VvIMYU21REPKU1R_3M"), d("D2X · Ek C · Kurucu ekip notu — Haklar Yönetimi (İÇ)", "1rwYpr87njWzSn5_gTwoaglTHlAjg-3REnyrGLFnw6uA")]),
        it("01. İş planı", "1QqnI0BDrBA6vkQkLRUyvV8tHIbUjvBed", [d("D2X · İş Planı v3.4 — A · Model, yapı ve gelir mimarisi", "1VWL6eupQiM5ZeVapMgASs0IQUYUwIdGZjmfbVMPuEyk"), d("D2X · İş Planı v3.4 — B · Pazar, ürün, operasyon ve teşvik", "1rWYpMOfAIQxpsYP2nYb4E_CoUmaKeMljysntEthmC94"), d("D2X · İş Planı v3.4 — C · Finans, ortaklık, yönetişim ve ekler", "1wcmhCvTOgu3FKZaIRJlvRuR_-740GCaCu_boovf4bG0")]),
        it("02. Finansal model", "1RmORKX-vRsJXSOUmvg1y5wsoBtjFhLHe", [s("D2X · Finansal model özeti v3.4 (değerler)", "1IJ1NJOIVk_NjvvRwfVNbrDOeh97MKCoY9SuIdA1f_BU"), d("OKU — 02. Finansal model klasörü hakkında", "1baoCGSmqO5vR1dlv4nMKqvRCOEbnzZBChAJUtzaLtOI")]),
        it("03. Ölçek planı", "1uGvFOtXddKigc-yVvRzB93kivaipKgs9", [d("D2X · Ölçek Planı v1.0 — Agresif yol haritası (2027–2035)", "1qgUt7Rqef7wNqu_LTClgUVBL2rJaQYW_khP2tpczGgg")]),
        it("04. Kaynak ve teknik", "1Yv8euShdZ1MAawM2gEE1iGuvsfegVTRf", [d("OKU — 04. Kaynak ve teknik", "147SKgVC2dTaYpo-oNmJp6-2BsR77T2lYOMWJ_llHNbk"), f("model2.py — iş planı finansal modeli (v3.4)", "18plbZcJFA6rBXFrzd2MLXLzx06o0X1e6"), f("model3.py — ölçek planı modeli (v1.0)", "1YL2Vkb5W1m462epOUtQy1IqHBX4g70nC")])]),
    ],
  },
  {
    client: { id: "meridyen", name: "Meridyen", short: ["Meridyen"], entities: ["Meridyen (API · VCP projesi)"],
      driveRoot: FO("1DK1NzgJ_-kS5kPfV5r3SjPcY2yFul2o5"),
      portfolio: { tur: "VCP Projesi", kategori: "Yatırım", pay: 100, digerleri: "—", rol: "VCP", gate: "Gate 0", not: "Finansal varlık yönetimi aracı · Meridyen API (v2 yol haritası)" } },
    sections: [],
  },
];

for (const c of COMPANIES) {
  const p = c.client.portfolio;
  c.client.consultant = "MTFG";
  c.client.kickoff = "2026-10-22";
  c.client.contacts = { "Şirket Yönetimi": "teyit edilecek", "Mali Müşavir": "teyit edilecek", MTFG: "Ferhan Yıldızlı · Gülşah Algın" };
  c.client.planLabel = "Değer Yaratma Planı (hazırlanacak)";
  c.client.startLabel = p.tur === "Şirket"
    ? `MTFG portföy şirketi · %${String(p.pay).replace(".", ",")} · ${p.rol} · panel 22.10.2026`
    : `MTFG ${p.tur} · ${p.gate} · panel 22.10.2026`;
  const js = generateDataJs({ client: c.client, sections: c.sections, scannedAt: SCANNED });
  const out = path.join(KIT, "src", "clients", `${c.client.id}.data.js`);
  fs.writeFileSync(out, js);
  console.log(c.client.id, js.length, "bayt");
}
