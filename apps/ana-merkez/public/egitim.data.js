/* =========================================================
   EĞİTİM — programlar, oturumlar, eğitmenler, hizmet eşlemesi
   Kaynak: "JURİS-ANKARA TEKNOPARK - Girişim Yatırım Hukuk-Eğitim Akışı.xlsx" (24.09.2026) +
           oturum slaytları (1-A, 1-B, 1-C · 14.09.2026; Bölüm 03 · 118 slayt).
   Durumlar tarihe göre hesaplanır; elle düzeltme ve dokümanlar sunucuda (vibe_state: egitim) tutulur.
   ========================================================= */
const EGITIM = {
  egitmenler: [
    { id: "fy", ad: "Ferhan Yıldızlı", unvan: "Av. Dr. · Ortak" },
    { id: "ga", ad: "Gülşah Algın", unvan: "Av. LL.M. · Ortak" },
    { id: "mmg", ad: "Mustafa Murat Gülgün", unvan: "Av. LL.M. · Ortak" },
    { id: "mtd", ad: "Mehmet Tuğberk Dekak", unvan: "Av. Dr. · Ortak" },
    { id: "ik", ad: "İlayda Karakum", unvan: "Av. LL.M. · Şirketler Hukuku ve Kurumsal Yönetim Birim Avukatı · Uygulama Koordinatörü" },
  ],
  /* Yeniden kullanılabilir modül kataloğu: her modül paneldeki hizmet fonksiyonuna ve konularına bağlanır */
  moduller: [
    { no: 1, t: "Girişim ve Yatırım Ekosistemi", soru: "“Fikrim var, ama neye sahibim?”", fn: ["PLAN"], panel: ["A.1 İş Modeli Kanvası", "A.2 İş Planı · OKR"], hizmet: "Şirket Stratejisinin Analizi ve Geliştirilmesi" },
    { no: 2, t: "Yatırım Öncesi Süreç, Hukuki Durum Tespiti ve Hazırlık", soru: "“Yatırımcı gözünde ne kadar hazırım?”", fn: ["DENETİM"], panel: ["E-1 DD Checklist", "Data Room A–F"], hizmet: "Hukuki Denetim ve Risk Analizi" },
    { no: 3, t: "Yatırım Süreci, Sözleşmeler ve Yapılandırma", soru: "“Sermaye ve değer nasıl buluşur?”", fn: ["İCRA"], panel: ["E-2 Sözleşme Seti", "A.3 Pay Yapısı · Yönetişim"], hizmet: "Şirket İçi Hukuki Süreçlerin Geliştirilmesi" },
    { no: 4, t: "Yatırım Sonrası Süreç ve Paydaş Yönetimi", soru: "“Yatırım sonrası haklar ve sorumluluklar nasıl şekillenir?”", fn: ["RAPORLAMA", "PLAN"], panel: ["A.3 RACI", "F-1 Toplantı Döngüsü", "Karar Kaydı"], hizmet: "Kurumsal Yönetim ve Organizasyon Yapısının Geliştirilmesi" },
    { no: 5, t: "Exit Stratejileri, Değerleme ve Şirket Satış Süreci", soru: "“Yaratılan değer nasıl paylaşıma dönüşür?”", fn: ["RAPORLAMA"], panel: ["B · Finans", "A.4 Yatırımcı Sunumu", "Değerleme ve Networth"], hizmet: "Yatırım Yönetimi · Değerleme" },
    { no: 6, t: "Uluslararası Karşılaştırma ve Global Yatırım Dinamikleri", soru: "“Yerel bir girişim, küresel sermayeyle nasıl konuşur?”", fn: ["İCRA"], panel: ["E-2 Sınır Ötesi Sözleşmeler"], hizmet: "Sözleşme Danışmanlığı" },
    { no: 7, t: "SPK Düzenlemeleri, GSYF ve Kitle Fonlaması", soru: "“Sermaye şirkete hangi yapılarla ulaşır?”", fn: ["DENETİM"], panel: ["C.0 Finansal Disiplin", "Uyum Yükümlülükleri"], hizmet: "Uyum · Kurumsal Yönetim İlkeleri" },
    { no: 8, t: "Uygulamalı Girişim ve Yatırım Hukuku Simülasyonu", soru: "“Veri odasından yönetişime”", fn: ["PLAN", "İCRA", "DENETİM", "RAPORLAMA"], panel: ["Data Room → DD → Sözleşme → Yönetişim (tam döngü)"], hizmet: "Kurumsal Yönetim Paneli · Intake" },
  ],
  programlar: [
    {
      id: "teknopark-2026",
      ad: "Girişim & Yatırım Hukuku Eğitimi",
      tema: "Bir Girişimin Kuruluştan Exit'e Yolculuğu",
      motto: "Neden ile Başla — Simon Sinek",
      kurum: "Ankara Teknopark", yer: "Teknopark Ankara VIP Salon", gun: "Salı", format: "8 Oturum × 3 Ders · 24 saat",
      donem: "Eylül–Aralık 2026", baslangic: "2026-09-15", bitis: "2026-12-22",
      hedefKitle: "Girişimciler, yatırımcılar; teknopark, kuluçka merkezi ve ekosistem paydaşları",
      koordinator: "ik",
      final: "Yatırım Süreci Simülasyonu: DD → yatırım sözleşmesi → yatırım sonrası yönetişim (konuk danışmanlarla)",
      network: { amac: "Katılımcı girişimciler ve misafir yatırımcılar → Juris müvekkil adayı / MTFG funnel (müvekkil → kurumsal yönetim → ortaklık)", kanal: "Oturum sonu tanışma · kontrol listeleri · kitap-film önerileri" },
      oturumlar: [
        { no: 1, modul: 1, tarih: "2026-09-15", ay: "Eylül", duzey: "Başlangıç", misafir: null,
          dersler: [["Türkiye Girişim Ekosistemi ve Temel Paydaşlar", "fy", "10:00–11:00"], ["Yatırım Türleri, Fonlama Kaynakları ve Yatırım Aşamaları", "fy", "11:15–12:15"], ["Stratejik Hukuki Düşünme ve Yatırıma Hazırlık (Yatırımda Hukuk Fonksiyonu)", "fy", "13:30–14:30"]] },
        { no: 2, modul: 2, tarih: "2026-09-29", ay: "Eylül", duzey: "Başlangıç", misafir: "Değerleme Uzmanı",
          dersler: [["Due Diligence Kavramı, Kapsamı ve Türleri", "ga", "10:00–11:00"], ["Due Diligence Kontrol Listesi ve Hazırlık Süreci", "ga", "11:15–12:15"], ["Due Diligence Raporu, Bulguların Yönetimi ve Yatırım Kararına Etkisi", "ga", "13:30–14:30"]] },
        { no: 3, modul: 3, tarih: "2026-10-13", ay: "Ekim", duzey: "Orta", misafir: "Yatırım Almış Girişimci",
          dersler: [["Yatırım Sürecinin Aşamaları ve Temel Hukuki Belgeler", "fy", "10:00–11:00"], ["İmtiyazlı Paylar, Pay Sahipliği Yapısı ve Sermaye Artırımı", "mtd", "11:15–12:15"], ["Alternatif Yatırım Araçları ve Yatırım Müzakeresi Stratejileri", "fy", "13:30–14:30"]] },
        { no: 4, modul: 4, tarih: "2026-10-27", ay: "Ekim", duzey: "Orta", misafir: null,
          dersler: [["Yatırım Sonrası Kurumsal Yönetim ve Beklenti Yönetimi", "fy", "10:00–11:00"], ["Hukuki, Finansal ve Kurumsal Doküman Yönetimi", "ga", "11:15–12:15"], ["Yatırım Sonrası Uyuşmazlıklar ve Çözüm Mekanizmaları", "mtd", "13:30–14:30"]] },
        { no: 5, modul: 5, tarih: "2026-11-10", ay: "Kasım", duzey: "Orta", misafir: "Exit Yapmış Girişimci",
          dersler: [["Exit Stratejileri ve Çıkış Türleri", "fy", "10:30–11:30"], ["Girişim Değerlemesi: Yöntemler, Varsayımlar ve Müzakere Dinamikleri", "fy", "11:45–12:45"], ["Şirket Satış Süreci ve Exit İşlemlerinde Temel Hukuki Belgeler", "fy", "13:30–14:30"]] },
        { no: 6, modul: 6, tarih: "2026-11-24", ay: "Kasım", duzey: "İleri", misafir: "Global Finans Danışmanı",
          dersler: [["Türkiye ile UK, ABD Girişim Sermayesi Modellerinin Karşılaştırılması", "fy", "10:00–11:00"], ["AB Müktesebatı ve Avrupa'daki Girişim Sermayesi Düzenlemeleri", "fy", "11:15–12:15"], ["Global Yatırımcı Beklentileri ve Uluslararası Yatırım Süreçleri", "fy", "13:30–14:30"]] },
        { no: 7, modul: 7, tarih: "2026-12-08", ay: "Aralık", duzey: "İleri", misafir: null,
          dersler: [["Türkiye Sermaye Piyasası Ekosistemi ve Girişim Sermayesi Yatırım Fonları", "fy", "10:30–11:30"], ["Kitle Fonlaması Sistemi ve Düzenleyici Çerçeve", "fy", "11:45–12:45"], ["Girişimler İçin Kurumsal Yönetim İlkeleri ve Uyum Yükümlülükleri", "ga", "13:30–14:30"]] },
        { no: 8, modul: 8, tarih: "2026-12-22", ay: "Aralık", duzey: "Tüm düzeyler", misafir: "Vergi · Finans · Strateji danışmanları (yatırım süreci)",
          dersler: [["Yatırımcı Veri Odasında: Due Diligence ve Yatırıma Hazırlık Simülasyonu", "ga", "10:00–11:00"], ["Kurucu ve Yatırımcı İmza Masasında: Yatırım Sözleşmesi Müzakeresi Simülasyonu", "fy", "11:15–12:15"], ["Kurucu ve Yatırımcı Ortaklık Masasında: Yatırım Sonrası Yönetişim Simülasyonu", "mmg", "13:30–14:30"]] },
      ],
      /* Bilinen dokümanlar (kurucu paylaştı): url yoksa "link eklenecek" — Drive'a yüklenince link girilir */
      dokumanlar: [
        { id: "d-akis", oturum: 0, t: "Eğitim Akışı (künye + plan) · xlsx", tur: "plan", url: null, not: "JURİS-ANKARA TEKNOPARK - Girişim Yatırım Hukuk-Eğitim Akışı.xlsx · 24.09.2026" },
        { id: "d-1a", oturum: 1, t: "1-A · Dünya ve Türkiye'deki Girişim Ekosistemi ve Temel Paydaşlar", tur: "slayt", url: null, not: "60 sayfa · 14.09.2026" },
        { id: "d-1b", oturum: 1, t: "1-B · Yatırım Türleri, Fonlama Kaynakları ve Yatırım Aşamaları", tur: "slayt", url: null, not: "55 slayt · doğrulanmış nihai sürüm" },
        { id: "d-1c", oturum: 1, t: "1-C · Yatırımda Hukuk Fonksiyonu", tur: "slayt", url: null, not: "47 slayt · Türk hukuku esaslı" },
        { id: "d-3", oturum: 3, t: "Bölüm 03 · Yatırım Süreci ve Sözleşmeler", tur: "slayt", url: null, not: "118 sayfa · NDA, term sheet, SHA, imtiyazlı pay, opsiyon, müzakere" },
      ],
    },
  ],
};
