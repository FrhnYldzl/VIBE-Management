/* =========================================================
   CLIENT CONFIG — her müvekkil için bu blok değişir.
   Durum: done · review (onay bekliyor) · progress · input (girdi bekleniyor – kimden olduğu 'owner' alanında) · pending
   Dayanak: doc (Drive'da doküman var) · beyan (toplantı/soru seti beyanı) · none
   ========================================================= */
const CLIENT = {
  id:"onscala", name:"ONSCALA",
  entities:["Onscala Tasarım ve Modelleme Teknolojileri İthalat ve İhracat A.Ş."], short:["Onscala"],
  legacy:["Nadda Tekstil (stand-by)","Radius Modelle (kapanış / devir)"],
  driveRoot:"https://drive.google.com/drive/folders/1zrHbWRNQ-lHudisWJMfowvKMKEiG6A7b",
  planSheet:"https://docs.google.com/spreadsheets/d/1bg-h81cnL7EuoX9RrUxrinMA33RsaY_N4NLHF92tl9M/edit", planLabel:"Strateji & İş Planı 2026",
  kickoff:"22.10.2025", rhythm:[["Haftada 1","Toplantı · Çarşamba 14:00"],["Aylık","Nakit akışı + ödeme planı onayı"],["Çarşamba","İdari çalışma günü"]],
  startDocs:[["1","Danışmanlık kick-off: faaliyet sınıflandırması ve 9 başlıklı çalışma sistematiği (tutanak)","22.10.2025"],["2","Sanal Veri Odası (Data Room) Bilgi Notu","23.10.2025"],["3","Dijital Altyapı Başlangıç Eğitimi Bilgi Notu","22.10.2025"],["4","Kurumsal Yapılandırma ve Yatırım Öncesi Düşünme ve Farkındalık Rehberi (Nadda & Radius)","02.11.2025"],["5","Onscala A.Ş. kuruluşu (Nisan 2026) · ilk fatura 19.06.2026 · mali müşavir sözleşmesi","Haz 2026"]],
  scopeIn:["Strateji – sektör/rekabet analizi, konumlandırma, büyüme","Kurumsal Yönetim – karar ve dokümantasyon sistemi","Finans – bütçe, nakit akışı, ödeme planı, borç yapılandırması","Pazarlama ve Satış – CRM, KPI, teklif sistemi","İnsan Kaynakları – görev tanımları, tasarım hakkı koruması","Hukuk – kurumsal yapı, sözleşme setleri, pay sahipliği","IT / Teknoloji – altyapı ve yazılım yönlendirmesi"],
  scopeOut:["Aytim ortaklığı M&A süreci – yatırım tutarından ücret alınmaz (23.02.2026)","E-Ticaret ve E-İhracat operasyonu – ciro payı %10 modeli (23.02.2026)","Medya, web sitesi ve dijital kimlik üretimi – dış danışmana devredildi (03.06.2026)","Vergi/SGK beyan, taksitlendirme ve muhasebe kaydı – Mali Müşavir","Teşvik başvuruları (KOSGEB, Tekmer) – Teşvik Danışmanı"],
  contacts:{ "Müvekkil Yönetimi":"Çağrı Aslum (Tedarik & Üretim) · Akif Birdal (Satış & Pazarlama)", "Mali Müşavir":"SMMM Tolga Anıl Polat", "Üretim Ekibi":"Burak Salman (Üretim & Tasarım Md.) · Ahmet Birdal (Tedarik & Lojistik Md.)", "Juris":"Ferhan Yıldızlı · Gülşah Algın · İlayda Karakum" },
};
const FUNCTIONS = {
  PLAN:{k:"1",title:"PLAN",desc:"Şirket stratejisinin analizi ve geliştirilmesi; kurumsal yönetim ve organizasyon yapısının tasarımı."},
  "İCRA":{k:"2",title:"İCRA",desc:"Şirket içi hukuki süreçlerin geliştirilmesi: sözleşme setleri, İK, KVKK ve dosya bazlı danışmanlık."},
  "DENETİM":{k:"3",title:"DENETİM",desc:"Hukuki denetim ve risk analizi: ön inceleme, Data Room kurulumu, due diligence ve risk haritası."},
  RAPORLAMA:{k:"4",title:"RAPORLAMA",desc:"Performans izleme ve raporlama: hedef–KPI/OKR sistemi, yönetim raporlaması, aksiyon ve karar takibi."},
};
const D="https://docs.google.com/document/d/", S="https://docs.google.com/spreadsheets/d/", F="https://drive.google.com/drive/folders/", FL="https://drive.google.com/file/d/";
const doc=(no,t,owner,status,url,ent)=>({no,t,owner,status,url,ent});
const O={J:"Juris",JM:"Juris → Müvekkil Yönetimi",M:"Müvekkil Yönetimi",SM:"Mali Müşavir",OP:"Üretim Ekibi (Burak Salman)",O:"Ortak"};

/* Drive dosya kısayolları */
const U={
 tt1:D+"1XBUFErzFReuV5zf-O9TOeIEQ8iVXRso3Dbdj8OsYcz0/edit", tt2:D+"1SdTGFIVp3FwCSMzAh7zUXQAfly2PY2SGGEAgeyvHdAs/edit", tt3:D+"1_KDXV6jy-8VrR2CzJ-_8l9wd4Flzs62HBhs_ieXYEb4/edit", tt4:D+"1qftCga68VKTSvjNy-g-CzS0kShazBMiDaPzEreuxMJE/edit", tt5:D+"1iUOzE8uVSw3nRnUs5tz36kvrmWq_MIjOGmK5lwFPl3U/edit", tt6:D+"13QGiqdwevEgpBsQiOqjiHOTJvlJeZfpnAljxuHDRe_c/edit", tt7:D+"190CHXnzzFoFJ-Ebb2r-d0bVzSV43WalXDhM7GvXjwjo/edit", tt8:D+"1unLTfOBoG4q9W6FsbHkOrQquv3HfZ6F3Z1KvK_QRK84/edit", tt9:D+"18-fbiLZ1eMu0tF5bYlS58lUMSstKnznUL9yXbmtEX10/edit", tt10:D+"1xwNWZppGeRyVZq_0QT5Jy0TT6d0QJpjsWxBQoEhtr0o/edit", tt11:D+"1aZMlWOLXIeZkdhBztGtJG6Jc3uKzngObWk-PsHH8Nmk/edit",
 mali:D+"1QnxLp2W4Xh7MyAzFCO8PPIi8SLx3CBuGjQF_N-Y97bk/edit", nakitNot:D+"1rNWcQbYQ4-CAfBC_sWeWeVOKRHzYjstZ20llIH0FC9Y/edit", butceV2:S+"1iB_V1zo72sGBEikoMJaAGWbHq4QfchC168taw0NddRU/edit", butceV1:S+"1oDaYymRCXtDtGoeR3XFoJx748H2Uc3LG-d0UZcApbak/edit", borc:S+"1Ju43XLNfgfQiIw40WPFA1_FBm-SWi5ESEhsOM3VqXu4/edit", promo:S+"15mzZMerCxBRXWV6mCgPnAcqA43JG_Kd2MFgLkuUsIcU/edit",
 strat:S+"1bg-h81cnL7EuoX9RrUxrinMA33RsaY_N4NLHF92tl9M/edit", pazar:D+"1TZm_9CFHDhhtlTixiTUesohUWmJrnEkHSHbxow6fD3Y/edit", rehber:D+"1gQ4og23wYYvpnk0oYKROiZ-D_FYvKJ3M3nZZz3CrL9s/edit",
 dataroomNot:D+"1007UzAjCGCBT5id5jTzFrzYqr6L_FHgXfHLCqXFjVsQ/edit", dijitalNot:D+"1srAj2PFJJItciferc0UlQARV8yYWZ1BHe-K8Traq6Gw/edit", ddRoom:F+"1bISSEMKjUJO3ynyVRxKEyQqAK1cEyUOH",
 persRapor:FL+"1BX7xXLibijUpBuWVl0f1anvp_L5_3c4S/view", orgSema:S+"1wwk5rBwIfMG3udHVV36jIij8ny8tIvIM4J73tacOQKo/edit", asfat:D+"1rC_ul43-gAXv2v8EQYrum0KnrHFfoaQ6bLQLWU6QJHo/edit",
 teklifFormat:S+"1f-MSXtABFm7SND0ASEAIJ0jLcNDUZxjKjXQKxIC_wYU/edit", maliyet:S+"1NEmGCWwF7moyZkapq3gFs_ENbUl_4HUHjaoOkHzw2Vs/edit", teklifler:F+"1LspAJH5-32e6PBzoUQNqoQzS6KRH1CDo", medya:F+"1W8mtuoENzxSt78LsOibdFLmMI5cGxCEG", satis:F+"1mjYARyfHoFMrnw6IdS6Y5F3umVtDaY5_",
 brand:FL+"1PJ0_Udxs52SAEPhP7u6IxTfMcHBUL9wb/view", corpDoc:FL+"1SBJXM5iGgJy8qFm34wQIxT7Iv2o9yWpr/view", letterhead:FL+"1xLDJ1l5pC_4Ag-_p12NQKZBI8oZ8n1RU/view", corpPres:FL+"1vmsbW8ZcY-9KlFb1HRIk_RFtfPcoq07-/view", brandApp:FL+"159wU05fkPjITPfp3LkTtu8LSWYWoNcyb/view",
};

const DATAROOM = [
 { id:"A", title:"A. Strateji ve Business", url:F+"1noNRpLiEl_Jp-AyCU6o2GoraPwIgqEor", items:[
   { id:"A1", title:"A.1. İş Modeli", fn:"PLAN", area:"Şirket Stratejisinin Analizi ve Geliştirilmesi", url:F+"1H8u1wKAAzeAZja5chy7uWFBHffbmVcQL", empty:true, guide:["A.1.1","İş Modeli Nedir ve Neden Analiz Edilir? – Bilgi Notu"],
     flow:["Juris İletir","Müvekkil Yönetimi Yanıtlar","Birlikte Onaylanır"], docs:[
     doc("A.1.1","İş Modeli Nedir ve Neden Analiz Edilir? – Bilgi Notu",O.J,"pending"),
     doc("A.1.2","İş Modeli Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("A.1.2","Faaliyet Kapsam Dokümanı – yapısal analiz (22.10.2025 kararı: ürün–hizmet, partner, iş adımı, dış alım)",O.M,"input"),
     doc("A.1.3","İş Modeli Dokümanı – Çıktı (Kanvas + Lean Canvas; bugün tutanak beyanlarına dayalı iskelet)",O.O,"pending") ]},
   { id:"A2", title:"A.2. İş Planı", fn:"PLAN", area:"Şirket Stratejisinin Analizi ve Geliştirilmesi", url:F+"1EyuURosos-Ndq2BUGjylQah5j_tjhE8q", guide:["A.2.1","İş Planı Nedir ve Neden Analiz Edilir? – Bilgi Notu"],
     flow:["Juris İletir","Müvekkil Yönetimi + Mali Müşavir Yanıtlar","Birlikte Onaylanır"], docs:[
     doc("A.2.0","Türkiye, Almanya ve ABD Pazar Analizi – Diecast Uçak Maketleri",O.J,"done",U.pazar),
     doc("A.2.1","İş Planı Nedir ve Neden Analiz Edilir? – Bilgi Notu",O.J,"pending"),
     doc("A.2.2","İş Planı Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("A.2.3","İş Planı Dokümanı (Bütçe · Satış · Pazarlama · Operasyon/Üretim · İş Geliştirme) – 'Strateji & İş Planı 2026' sayfasından türetilecek",O.O,"progress",U.strat),
     doc("A.2.4","2027 ciro senaryosu kararı (40 · 50–55 · 80 mn TL) ve 2030 hedef dağılımı (B2B/B2C/e-ihracat)",O.M,"input",U.tt11) ]},
   { id:"A3", title:"A.3. Yönetişim", fn:"PLAN", area:"Kurumsal Yönetim ve Organizasyon Yapısının Geliştirilmesi", url:F+"1XWYHY2EtYYszuL8E38CLQ866kafyZuIE", empty:true, guide:["32","Kurumsal Yönetim ve Organizasyon Yapısı – Bilgi Notu"],
     flow:["Juris İletir","Müvekkil Yönetimi Yanıtlar","Birlikte Onaylanır"], docs:[
     doc("32","Kurumsal Yönetim ve Organizasyon Yapısı – Bilgi Notu",O.J,"pending"),
     doc("32","Kurumsal Yönetim ve Organizasyon Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("33","Organizasyon Şeması + Ünvan ve Görev Tanımları (13 kişi) – E-3 klasöründe",O.O,"review",U.orgSema),
     doc("34","Görev, Yetki ve Sorumluluk Matrisi (RACI)",O.O,"pending"),
     doc("35","Yetki ve Onay Matrisi – borçlanma, kredi, kefalet yönetim onayı (Mali Yönetim Kuralları 3.6.8)",O.O,"pending"),
     doc("36","Yönetim ve Karar Mekanizmaları Dokümanı – ortakların görev/finansman/karar yükümlülükleri",O.O,"pending"),
     doc("37","Pay Sahipliği Sözleşmesi revizyonu (%25 Çağrı – %70 Akif – %5 Ahmet kararı → fiili durum)",O.J,"progress",U.tt11),
     doc("38","Yönetim Kurulu İç Yönergesi / Bağımsız YK üyesi (Akif) çalışma esasları",O.J,"pending"),
     doc("39","Yönetim Toplantıları ve Karar Takip Sistemi – haftalık Çarşamba toplantısı, 11 tutanak",O.J,"progress",F+"1Dkyyg85wtcB_X1vd_O0qDqOuhUG2gTlB") ]},
   { id:"A4", title:"A.4. Yatırımcı Sunumu", fn:"PLAN", area:"Şirket Stratejisinin Analizi ve Geliştirilmesi", url:F+"1mKzjo8Nkz0Vg8QCpdPIoHrkS13M3_aI6", guide:["A.4.1","Kurumsal Yapılandırma ve Yatırım Öncesi Düşünme ve Farkındalık Rehberi",U.rehber],
     flow:["Juris İletir","Müvekkil Yönetimi Yanıtlar","Birlikte Onaylanır"], docs:[
     doc("A.4.1","Kurumsal Yapılandırma ve Yatırım Öncesi Düşünme ve Farkındalık Rehberi (Nadda & Radius)",O.J,"done",U.rehber),
     doc("A.4.2","Yatırımcı Sunumu (Pitch Deck) Bilgi Notu",O.J,"pending"),
     doc("A.4.3","Aytim & Onscala Ortaklığı – Term Sheet (23.02.2026 kararı; Drive'da yok)",O.J,"pending"),
     doc("A.4.4","Pitch Deck (.pptx) – 2027'de yatırıma hazır hâle gelme hedefi",O.O,"pending") ]},
   { id:"A5", title:"A.5. Performans İzleme ve Raporlama", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:F+"1YJ7YugNAwjlHpRaAUdzB2N--EQ96MQxL", guide:["10","Performans İzleme ve KPI/OKR Sistemi – Bilgi Notu"],
     flow:["Juris İletir","Müvekkil Yönetimi Yanıtlar","Birlikte Onaylanır"], docs:[
     doc("12","Onscala – Strateji, İş Planı ve Yapılacaklar 2026 (Hedefler · OKR · İdari Task · E-Ticaret planı · Envanter)",O.O,"review",U.strat),
     doc("10","Performans İzleme ve KPI/OKR Sistemi – Bilgi Notu",O.J,"pending"),
     doc("11","Performans ve Raporlama Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("13","Yönetim Raporlama Sistemi – aylık mali rapor (Mali Yönetim Kuralları 3.6.10: 9 başlık)",O.M,"progress",U.mali),
     doc("14","Yönetici Özeti ve Performans Scorecard – Şablon (16.07.2026 kararı)",O.J,"pending"),
     doc("15","Yönetim Aksiyon ve Karar Takip Tablosu – 13.10.2026 aksiyon listesi (14 madde) ve karar konuları (8)",O.O,"review",U.tt11) ]},
 ]},
 { id:"B", title:"B. Finans", url:F+"1l65rHT5-Rs2sjnSgGHkk5RpQBZfG_w0B", items:[
   { id:"B1", title:"B.1. Bütçe", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:F+"1u6OqgOV9Dy7Ep7_MxkOOCYGRtwj_llc7", empty:true, flow:["Juris Yönerge Verir","Müvekkil Yönetimi + Mali Müşavir Hazırlar","Aylık Onay"], docs:[
     doc("DR","2026 bütçe – hedef 40 mn TL / gerçekleşen 5,5 mn TL (B.2'deki V.2 dosyasında)",O.M,"review",U.butceV2),
     doc("DR","2027 faaliyet bazlı bütçe (Maket · Promosyon · E-Ticaret · Borç bütçesi) – Aralık 2026",O.M,"input"),
     doc("DR","Borç Bütçesi: alacaklı, tutar, vade, ödeme önceliği, hukuki dayanak (aksiyon 1 – Kritik)",O.M,"input",U.borc),
     doc("DR","Promosyon birimi ciro planı (15 mn 2026 / 30 mn 2027)",O.M,"review",U.promo) ]},
   { id:"B2", title:"B.2. Nakit Akışı", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:F+"107Vir1G136cHB_QC-Fa_yZoIJ53CUsWR", flow:["Juris Yönerge Verir","Müvekkil Yönetimi Hazırlar","Aylık Onay"], docs:[
     doc("DR","Nakit Akışı Bütçesi Bilgi Notu",O.J,"done",U.nakitNot),
     doc("DR","Bütçe ve Nakit Akışı Temmuz 2026 – Resmi V.2 (Teklif · Gelir · Gider · Nakit Akışı · Borçlar)",O.M,"review",U.butceV2),
     doc("DR","Bütçe ve Nakit Akışı Temmuz 2026 – Resmi V.1",O.M,"done",U.butceV1),
     doc("DR","Borçlar ve Krediler – toplam borç çizelgesi, kamu borçları, Alkanlar çek planı",O.M,"review",U.borc),
     doc("DR","Promous Ciro Planı – tahsilat, üretim takip, satın alma, nakit akışı",O.M,"review",U.promo),
     doc("DR","Borç Nakit Akışı: aylık geri ödeme planı → 2027 bütçesine bağlanması (aksiyon 2 – Kritik)",O.M,"input"),
     doc("DR","Gider sekmesindeki #REF! hataları ve 'Borçlar' sekmesinin doldurulması",O.M,"input",U.butceV2) ]},
   { id:"B3", title:"B.3. Bilanço", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"1E9LXY8YtTpqCNbeEzOkRebvMDKSXgvmx", empty:true, flow:["Juris Yönerge Verir","Mali Müşavir Yükler"], docs:[
     doc("DR","Onscala kuruluş bilançosu ve 2026 ara dönem gelir tablosu",O.SM,"input"),
     doc("DR","Vergi borcu dökümü (~2 mn TL beyan): tür, dönem, gecikme, kesin bakiye (aksiyon 5)",O.SM,"input",U.tt11),
     doc("DR","Nadda ve Radius bilanço ve beyannameleri – stok ve demirbaş tespiti için (03.06.2026 gündemi)",O.M,"input",U.tt8),
     doc("DR","Nadda / Radius kamu borçları (vergi + SGK ≈ 11,5 mn TL) yapılandırma şartları",O.SM,"input",U.borc) ]},
 ]},
 { id:"C", title:"C. Muhasebe", url:F+"12xT-y0Q5nw3OCh4_W1JI_I8LMoHoiKTa", items:[
   { id:"C1", title:"C.1. Hesap Planı", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"1sQG0CF4s-vaU_sFpQ7J7TI9VLQ4-b9Gi", empty:true, guide:["MYK","Mali Yönetim, Muhasebe ve Finansal Disiplin Esasları",U.mali], flow:["Mali Müşavir Yükler","Juris İnceler"], docs:[
     doc("MYK","Onscala | Mali Yönetim Kuralları (7 kural grubu + esaslar v1.0) – onay tablosu imzasız",O.J,"review",U.mali),
     doc("DR","Tek düzen hesap planı – faaliyet/proje bazlı gider etiketleme (03.06.2026: @gülşah @akif)",O.SM,"input"),
     doc("DR","Merkezi muhasebe e-posta adresi ve evrak akışı (MYK 3.3.4)",O.M,"input") ]},
   { id:"C2", title:"C.2. Mizan", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"19HXcF3OgsaaBDspWKeNmB-LC7QlXKLFk", empty:true, flow:["Mali Müşavir Yükler","Juris İnceler"], docs:[
     doc("DR","Güncel mizan (aylık)",O.SM,"input"),
     doc("DR","Muhasebe kayıtlarının mutabakatı: personel, stok, kira, gider, tedarikçi faturaları (aksiyon 6 – Kritik)",O.SM,"input",U.tt11),
     doc("DR","Ortak cari hesapları: Onscala → Çağrı → Nadda transferlerinin dökümü (aksiyon 4)",O.SM,"input",U.tt11) ]},
 ]},
 { id:"D", title:"D. Operasyonlar", url:F+"1bad0E9FQTmg45TBHqK85qN_Ph95Rbuu5", items:[
   { id:"D1", title:"D.1. Ana Faaliyetler", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"19oMFbw-pBaJZNLYDsF69TNFZoTMY7iu7",
     subfolders:[["D.1.2 Satış · teklif formatı, maliyet dosyası",U.satis,false],["Onscala Teklifler · 13 dosya",U.teklifler,false],["D.1.2 Medya · kurumsal kimlik (5 PDF)",U.medya,false]],
     flow:["Müvekkil Yönetimi Yükler","Juris İnceler","Sözleşme setine girdi"], docs:[
     doc("DR","Teklif ve Sözleşme Formu – standart format (Onsacala - Teklif Formatı)",O.O,"done",U.teklifFormat),
     doc("DR","Proje Maliyet Dosyası Temmuz 2026 – teklif künyesi, maliyet hesabı, kâr",O.M,"done",U.maliyet),
     doc("DR","Teklifler klasörü – İstanbul Müze, Sarissa/Kuveyt Türk, TÜBİTAK SAGE ×2, TSK Kaan, Navtek ×2, ASFAT Peç, Buff sipariş formu, MKE",O.M,"done",U.teklifler),
     doc("DR","Kurumsal kimlik seti: Brand Guidelines · Corporate Document System · Letterhead · Corporate Presentation · Brand Applications (06.10.2026)",O.M,"done",U.medya),
     doc("DR","Üretim Takip Çizelgesi + Satın Alma ve Tedarik (Promous Ciro Planı sekme 5–6)",O.M,"review",U.promo),
     doc("DR","Faaliyet bazlı ciro kırılımı (Maket / Promosyon / E-Ticaret) – 2026 gerçekleşen",O.M,"input"),
     doc("DR","Proje bütçe mutabakatı: ~647 maket teslim yükümlülüğü, avans/tahsilat/teslim eşleştirmesi (aksiyon 7)",O.M,"input",U.tt11) ]},
   { id:"D2", title:"D.2. Projeler", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1PYBIgFY2QXnz_XaPsJULwqtA2BJWF5yX", empty:true, flow:["Müvekkil Yönetimi Yükler","Juris İnceler"], docs:[
     doc("DR","E-Ticaret & E-İhracat başlangıç planı: envanter, kanallar, başlangıç bütçesi, ekip (aksiyon 11)",O.M,"input",U.strat),
     doc("DR","Aytim & Onscala ortaklık projesi – term sheet ve ortaklık şartları",O.J,"pending",U.tt7),
     doc("DR","KOSGEB / Tekmer / Teknopark teşvik değerlendirmesi (aksiyon 12)",O.M,"input"),
     doc("DR","Taşınma projesi: Sincan / Meva Şehir değerlendirmesi (03.06.2026)",O.M,"input",U.tt8),
     doc("DR","Lisanslı maket / private label fizibilitesi (Kartal Vakfı, TUSAŞ markaları – 05.11.2025)",O.M,"pending",U.tt3) ]},
 ]},
 { id:"E", title:"E. Hukuk", url:F+"1vUJXp7McHf06BdBICOJYPq9828Ch6mNL", items:[
   { id:"E1", title:"E-1. Hukuki Durum Tespiti ve Risk Analizi", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"1KzK0D7eCsGq49FWHMQPlP7aOXRulLSmV", guide:["DD","Due Diligence Asgari İnceleme Kılavuzu (A.Ş.)"],
     subfolders:[["Onscala | Data Room (DD klasörleri)",U.ddRoom,true]],
     flow:["Juris Sorar","Müvekkil Yönetimi Cevaplar","Mali Müşavir + Yönetim Yükler","Juris Oluşturur","Birlikte Değerlendirilir"], docs:[
     doc("DR","Sanal Veri Odası (Data Room) Bilgi Notu",O.J,"done",U.dataroomNot),
     doc("DR","Dijital Altyapı Başlangıç Eğitimi Bilgi Notu",O.J,"done",U.dijitalNot),
     doc("DR","Data Room Sisteminin Kurulması (A–F klasörleri)",O.J,"done",CLIENT.driveRoot),
     doc("16","Hukuki Bilgilendirme ve Risk Tespiti Formu (A.Ş.)",O.JM,"pending"),
     doc("DR","DD Kapsamında Talep Edilen Belgeler listesi",O.JM,"pending"),
     doc("DR","Data Room belge yüklemesi (DD klasörü boş)",O.M+" / "+O.SM,"input",U.ddRoom),
     doc("DD","Due Diligence Asgari İnceleme – A.Ş. Kılavuzu",O.J,"pending"),
     doc("21","Hukuki Risk Envanteri ve Risk Haritası – 13.10.2026 tespitlerine dayalı ön değerlendirme",O.J,"progress",U.tt11),
     doc("—","Onscala–Çağrı–Nadda para hareketleri ve ortak cari hesap incelemesi (aksiyon 4 – Kritik)",O.J+" + "+O.SM,"progress",U.tt11),
     doc("22","Hukuki Denetim ve Risk Analizi Raporu",O.J,"pending"),
     doc("23","Hukuki Risk Aksiyon Planı",O.O,"pending") ]},
   { id:"E2", title:"E-2. Şirket Ana Faaliyet Sözleşmeleri", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1W8pJZECv1k6a2X_nmay1EPd63pl8_pvq", empty:true,
     flow:["Juris Sorar","Müvekkil Yönetimi Cevaplar","Birlikte Onaylanır"], docs:[
     doc("24","Şirket Ana Faaliyet Sözleşmeleri Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("25","Teklif ve Sözleşme Formu (standart) – D.1.2'de mevcut",O.J,"done",U.teklifFormat),
     doc("25","Mal · Hizmet · Anahtar Teslim kapsamlı teklif–sözleşme seti (16.07.2026 kararı, İlayda Karakum)",O.J,"pending",U.tt10),
     doc("25","Aracı Ajans Sözleşmesi – vade, tahsilat, fiyat marjı kuralları (13.10.2026)",O.J,"pending",U.tt11),
     doc("25","Tedarikçi / fason üretim sözleşmeleri (Tekstilsan, Lider Şapka, Elife Tekstil, Kuker)",O.J,"pending"),
     doc("25","Sinem · Burhan · Hamıl ile yükümlülük ve ticari ilişkilerin sözleşmeye bağlanması (aksiyon 14)",O.J,"pending",U.tt11) ]},
   { id:"E3", title:"E-3. İnsan Kaynakları Projesi", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1P94X7fRB0W-miccNMWf6IPM3TVltRkLx",
     flow:["Müvekkil Yönetimi Yükler","Juris Sorar","Birlikte Onaylanır"], docs:[
     doc("28","Personel Görev ve Sorumluluk Raporu (Akif Birdal, 18.06.2026 – gizli)",O.M,"done",U.persRapor),
     doc("33","Görev Tanımı ve Organizasyon Şeması + Üretim Süreç Akışı (13 kişi, 9 aşama)",O.M,"review",U.orgSema),
     doc("28","İnsan Kaynakları Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("29","İş sözleşmeleri – 13 personel (MYK 3.4.3: tüm personel sözleşmeli)",O.M,"input"),
     doc("29","Personelin Nadda'dan Onscala'ya devri – SGK giriş/çıkış ve eski personel verileri",O.SM,"input",U.tt8),
     doc("29","İK Doküman Seti – işe alım, fazla çalışma kaydı, izin, savunma formları",O.J,"pending"),
     doc("29","Tasarım hakkı koruması ve çalışan buluş/eser düzenlemesi (22.10.2025 İK başlığı)",O.J,"pending",U.tt1) ]},
   { id:"E4", title:"E-4. NDA Sözleşme Seti", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1F6PjAOG3RsPCnpIivO9hguYpi2ySixuy", empty:true,
     flow:["Juris Hazırlar","Müvekkil Yönetimi Onaylar","Kullanım bilgilendirmesi"], docs:[
     doc("26","NDA ve Gizlilik Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("27","Karşılıklı Gizlilik Sözleşmesi (TR) – kurumsal müşteriler ve ortaklık görüşmeleri",O.J,"pending"),
     doc("27","Tek Taraflı Gizlilik Sözleşmesi (TR) – tedarikçi ve fason üreticiler",O.J,"pending"),
     doc("27","Çalışan ve alt yüklenici gizlilik taahhüdü (ASFAT Çerçeve Sözleşmesi m.14.4 gereği)",O.J,"pending",U.asfat),
     doc("27","Kullanım Bilgilendirme Dokümanı",O.J,"pending") ]},
   { id:"E5", title:"E-5. Hukuki Danışmanlık", fn:"İCRA", area:"Uyuşmazlık ve Hukuki Süreç Danışmanlığı", url:F+"1hmXhcXMxpMQHCJ4Z37sHHzn-iDGsDFta",
     flow:["Dosya / olay bazında sürekli hizmet"], docs:[
     doc("—","ASFAT – Onscala Stratejik İş Birliği Çerçeve Sözleşmesi (20 madde, 3 ek)",O.J,"review",U.asfat),
     doc("—","Pay Sahipliği Sözleşmesi revizyonu (aksiyon 9 – Kritik)",O.J,"progress",U.tt11),
     doc("—","Borç Protokolü – mutabakat, ödeme takvimi, şirket/şahıs borcu ayrımı (aksiyon 3 – Kritik)",O.J,"progress",U.tt11),
     doc("—","Radius'un Ahmet Birdal'dan Akif Birdal'a devri ve kapanış işlemleri",O.M,"input",U.tt5),
     doc("—","Nadda stand-by: mevcut işlerin ve personelin Onscala'ya devri",O.M,"input",U.tt4),
     doc("—","Aytim ortaklığı – Term Sheet",O.J,"pending",U.tt7) ]},
   { id:"E6", title:"E-6. KVKK Projesi – Mini", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1bOLL4tpHOjlQTpmHVr3JdoasqCTgkdq0", empty:true,
     flow:["Mali Müşavir bilanço toplamı iletir","Juris Sorar","Müvekkil Yönetimi Cevaplar","Teslim + Eğitim"], docs:[
     doc("—","2026 bilanço toplamı / çalışan sayısı (VERBİS eşiği)",O.SM,"input"),
     doc("30","Mini KVKK Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("31","Mini KVKK Doküman Seti – Çıktı (aydınlatma, açık rıza, saklama-imha, çalışan)",O.J,"pending"),
     doc("31","E-ticaret metinleri: mesafeli satış, aydınlatma, çerez (Shopify / Trendyol / Amazon)",O.J,"pending") ]},
   { id:"E7", title:"E-7. Uyuşmazlık Takibi", fn:"İCRA", area:"Uyuşmazlık ve Hukuki Süreç Danışmanlığı", url:F+"1R5Qf5CYM9WIJEk-LJ4Di5WFsLDjAtMJH", empty:true,
     flow:["Dosya / olay bazında yürütülen sürekli hizmet"], docs:[
     doc("—","Aselsan alacağı – takip edilmeme kararı (03.06.2026 tutanağı)",O.M,"done",U.tt8),
     doc("—","Kuker kira borcu (~1 mn TL, resmi değil) – protokol / sözleşme dayanağı",O.J,"pending",U.tt8),
     doc("—","Kamu borçları (Nadda, Radius, şahıs işletmesi) – yapılandırma başvuruları",O.SM,"input",U.borc),
     doc("—","Hukuki görüş / süreç takip notu (dosya bazında)",O.J,"pending") ]},
 ]},
 { id:"F", title:"F. İletişim", url:F+"1Dkyyg85wtcB_X1vd_O0qDqOuhUG2gTlB", items:[
   { id:"F1", title:"F.1. Toplantılar", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:F+"1Dkyyg85wtcB_X1vd_O0qDqOuhUG2gTlB",
     flow:["Gündem","Toplantı (Çarşamba 14:00)","Tutanak + Aksiyon","Teslim / Teslim edilemeyen","Sonraki gündem"], docs:[
     doc("TT","1. Toplantı · 22.10.2025 – Faaliyet sınıflandırması, çalışma sistematiği",O.J,"done",U.tt1),
     doc("TT","2. Toplantı · 30.10.2025 – Maket, promosyon, tekstil, stok, finans, kurumsal yapı",O.J,"done",U.tt2),
     doc("TT","3. Toplantı · 05.11.2025 – Know-how, lisans, yatırım anlatısı",O.J,"done",U.tt3),
     doc("TT","4. Toplantı · 10.12.2025 – Radius kapanış, Nadda stand-by, yeni şirket kararları",O.J,"done",U.tt4),
     doc("TT","5. Toplantı · 25.12.2025 – Kamu borçları, şirket ismi, kurtarma planı",O.J,"done",U.tt5),
     doc("TT","6. Toplantı · 08.01.2026 – Finansal periyotlar, fonksiyonel yapı, e-ticaret envanteri",O.J,"done",U.tt6),
     doc("TT","7. Toplantı · 23.02.2026 – Aytim ortaklık yapısı, Juris hizmet kapsamı",O.J,"done",U.tt7),
     doc("TT","8. Toplantı · 03.06.2026 – Yönetim Kurulu: 19 gündem maddesi, taşınma, idari sprint",O.J,"done",U.tt8),
     doc("TT","9. Toplantı · 10.06.2026 – Medya sistem toplantısı (Korenel), e-ticaret 01.07 hedefi",O.J,"done",U.tt9),
     doc("TT","10. Toplantı · 16.07.2026 – Teklif, pay sahipliği, kredi (tutanak eksik: 7. toplantı başlığı kopyalanmış)",O.J,"review",U.tt10),
     doc("TT","11. Toplantı · 13.10.2026 – Finansal yapılanma, borç yönetimi, 2027 stratejisi (14 aksiyon, 8 karar)",O.J,"done",U.tt11) ]},
   { id:"F2", title:"F.2. Mailler", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", noFolder:true,
     flow:["Teslim maili","Talep maili","Hatırlatma","Onay"], docs:[
     doc("M","13.10.2026 tutanağı ve aksiyon listesinin paylaşımı – sorumlu onayı",O.J,"pending",U.tt11),
     doc("M","Talep – Mali Müşavir: vergi borcu dökümü, mizan, hesap planı, ortak cari hesaplar",O.J,"pending"),
     doc("M","Hatırlatma – Yönetim: borç listesi güncellemesi (Çağrı, Akif, Sinem)",O.J,"pending"),
     doc("M","Onay talebi – Mali Yönetim Kuralları (imza tablosu) ve Organizasyon Şeması",O.J,"pending",U.mali),
     doc("M","Data Room Veri Yükleme Yönergesi – DD klasörü",O.J,"pending") ]},
 ]},
];

/* dayanak sayacı: doküman mı beyan mı */
const BASIS_COUNT={doc:["F.1 Tutanaklar (11 toplantı)","B.2 Bütçe ve Nakit Akışı V.1 / V.2","B.2 Borçlar ve Krediler","B.2 Promous Ciro Planı","A.5 Strateji, İş Planı ve Yapılacaklar 2026","C Mali Yönetim Kuralları","E-3 Org Şeması + Personel Raporu","E-5 ASFAT Çerçeve Sözleşmesi","D.1 Teklif Formatı · Maliyet Dosyası · 13 Teklif · Kurumsal Kimlik","A.2 Pazar Analizi"],beyan:["A.1 İş Modeli (tutanak beyanları)","A.3 Yönetişim (pay dağılımı, karar yapısı)","B.3 Bilanço / vergi borcu (~2 mn TL)","D.2 Projeler (e-ticaret, Aytim, teşvik, taşınma)","E-7 Uyuşmazlık / kamu borçları"],none:["C.1 Hesap Planı","C.2 Mizan","E-1 DD Belge Checklist","E-2 Sözleşme Seti","E-4 NDA","E-6 KVKK","A.4 Pitch Deck"]};
