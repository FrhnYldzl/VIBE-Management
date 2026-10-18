const CLIENT = {
  id:"meown", name:"MEOWN AI",
  entities:["MEOWNAI Teknoloji Anonim Şirketi"], short:["Meown"],
  driveRoot:"https://drive.google.com/drive/folders/1uXCaRlKn2deJaBf_CuvKSx_hMXt2Me6t",
  planSheet:"https://drive.google.com/file/d/1KUjTAv6Gk4wPno-SWv6SXbZisMdR2hC1/view", planLabel:"Hizmet Teklifi (29.09.2026)",
  kickoff:"01.10.2026 (sözleşme yürürlüğü) · onboarding 05.08.2026 · DD mülakatı 28.09.2026", rhythm:[["Aylık","Hizmet bedeli 45.000 TL + KDV + stopaj · ayın 1–5'i (01.10.2026 – 30.09.2027, 1 yıl otomatik uzama)"],["Başarı bazlı","EK-1 Mali Yapı ve Finansman: sağlanan finansmanın %3'ü (Mali Yapı incelemesi ücretsiz)"],["Talep bazlı","Dosya bazlı görüş · son görüşme 01.10.2026 (Ariwon) · düzenli toplantı ritmi henüz yok"]],
  startDocs:[["Ç1","Hizmet Teklifi – Şirketler Hukuku ve Kurumsal Yönetim Danışmanlığı (45.000 TL/ay · 8 hizmet başlığı)","29.09.2026"],["Ç2","Şirketler Hukuku ve Kurumsal Yönetim Danışmanlık Sözleşmesi (yürürlük 01.10.2026 · 1 yıl) – imzalı nüsha Drive'da yok","29.09.2026"],["Ç2.1","EK-1: Mali Yapı ve Finansman Süreçleri Hukuki ve Kurumsal Danışmanlığı (%3 başarı ücreti)","29.09.2026"],["Ç3","Ortak Drive yapısı: Teklif ve Sözleşme · Data Room · Hizmet Kayıtları · Projeler · Strateji Dokümanı","29.09.2026"],["Ç4","Hukuki Bilgilendirme ve Risk Tespit Formu – Mülakat Cevapları (28.09.2026)","29.09.2026"],["Ç5","DD Kapsamında Talep Edilen Belgeler (9 Data Room başlığı · 14 belge)","29.09.2026"],["Ç6","İş Modeli Bilgi Notu + İş Modeli Soru Seti (9 blok × 5 soru)","29.09.2026"],["Ç7","Drive Data Room A–F klasör yapısı (10. MEOW I)","17.10.2026"]],
  scopeIn:["1. Şirket Stratejisinin Analizi ve Geliştirilmesi – iş modeli, iş planı, yatırımcı sunumu","2. Performans İzleme ve Raporlama – hedefler, KPI, yönetim raporlama sistemi, yönetici özeti","3. Hukuki Denetim ve Risk Analizi – DD, hukuki risk haritası, önleyici/düzeltici tedbirler","4. Şirket İçi Hukuki Süreçler – ana faaliyet sözleşme seti, İK projesi, mini KVKK projesi, sözleşme süreç yönetimi","5. Kurumsal Yönetim ve Organizasyon – org şeması, karar mekanizması, yetki/sorumluluk takibi, denetim yapısı","6. Uyuşmazlık ve Hukuki Süreç Danışmanlığı – değerlendirme, görüş, süreç takibi","7. EK-1 Mali Yapı ve Finansman Süreçleri – mali yapı değerlendirmesi, finansman alternatifleri ve sağlayıcıları, süreç desteği (%3)"],
  scopeOut:["İdari, ceza ve vergi davaları","Uluslararası tahkim süreçleri","Birleşme-devralma ve yatırım turu işlemlerinin bütünüyle yürütülmesi – ayrı mutabakat (teklif 08. başlık)","Ruhsat, lisans, faaliyet izni ve sertifika başvuruları","Halka arz ve sermaye piyasası işlemleri","Marka, patent, tasarım başvuru/tescil/itiraz süreçleri – Marqby","Kapsamlı KVKK uyum projesi (mini proje dışında)","SPK kapsamındaki yatırım danışmanlığı, muhasebe, mali müşavirlik, şirket değerlemesi (EK-1 dışı)"],
  contacts:{ "Müvekkil Yönetimi":"Sergey (Sergen) Ryskin – YK Başkanı, %98 A Grubu pay sahibi, münferiden temsil yetkilisi · sergey@meown.ai", "Ortak":"Cevat Cavit Gündüz – %2 B Grubu pay sahibi (koruyucu haklar) · SHA taslağında Emirhan Engin (%47) – tescilde yok", "Mali Müşavir":"TAP Serbest Muhasebeci Mali Müşavirlik Denetim ve Danışmanlık Hizmetleri A.Ş.", "Yazılım Ekibi":"Ariwon / Kory.ai ürün ekibi – kişiler teyit edilmedi; 4 şirket bilgisayarı farklı kişilerde", "Korenel":"Elif Kor – Korenel Reklam Ajansı (ajans modülü iş ortağı · NDA imzalı)", "Juris":"Ferhan Yıldızlı · Gülşah Algın (ana muhatap) · İlayda Karakum · Tuğberk Dekak" },
};
const FUNCTIONS = {
  PLAN:{k:"1",title:"PLAN",desc:"Şirket stratejisi ve kurumsal yapılandırma: iş modeli (Ariwon · ajans modülü), iş planı, pay sahipliği yapısı, yönetişim, yatırımcı sunumu, finansman alternatifleri (EK-1)."},
  "İCRA":{k:"2",title:"İCRA",desc:"Şirket içi hukuki süreçler: SaaS kullanıcı sözleşmesi ve ajans modülü sözleşmesi, NDA seti, geliştirici/İK sözleşmeleri ve bilgisayar iadesi, mini KVKK + AI Act, dosya bazlı görüşler."},
  "DENETİM":{k:"3",title:"DENETİM",desc:"Hukuki durum tespiti (DD): Risk Tespit Formu mülakatı (28.09), 9 başlıklı Data Room, 14 belgelik talep listesi, hukuki risk haritası."},
  RAPORLAMA:{k:"4",title:"RAPORLAMA",desc:"Performans izleme ve raporlama: hedefler ve KPI'lar, aylık yönetim raporu, toplantı → tutanak → aksiyon döngüsü, mail kaydı."},
};
const D="https://docs.google.com/document/d/", S="https://docs.google.com/spreadsheets/d/", P="https://docs.google.com/presentation/d/", F="https://drive.google.com/drive/folders/", FL="https://drive.google.com/file/d/";
const doc=(no,t,owner,status,url,ent)=>({no,t,owner,status,url,ent});
const O={J:"Juris",JM:"Juris → Müvekkil Yönetimi",M:"Müvekkil Yönetimi (S. Ryskin)",SM:"Mali Müşavir (TAP A.Ş.)",YK:"YK (S. Ryskin)",TE:"Yazılım Ekibi",KO:"Korenel (ajans modülü)",MQ:"Marqby (marka)",O:"Ortak"};

/* Drive dosya kısayolları */
const U={
 teklif:FL+"1KUjTAv6Gk4wPno-SWv6SXbZisMdR2hC1/view", contract:D+"17epO2E5Q1Gh8r4TYTzhJ-NNJd_ZDuKNKNxxJl8EKpqQ/edit", ek1:D+"1otacjhrOR4P0JIZSAnV-XUGvdePz82FXklxSQRS5Qgc/edit", teklifKlasor:F+"1iYVa6lGD5HjeBzl8FfncelMeVePv53nk",
 form:D+"1dErkHmTcHsyssFrhRDDcTRW5uSKS6E6q3SIJlsR9dzI/edit", ddList:D+"1wZNrOdhoRJnXt-60trWx3tMySHWqWpsobZ7Kcm-r1XU/edit", dataRoom:F+"1KWTzDLXF_nf9Iji2ZI1WScizAjzPoydU", ttsg:FL+"1p1f8EzKy-4rdguLABx9nVZDmc4aYp6Jz/view", sha:D+"1aXEtVHKRON8k3wOfmaVh3CkieW3P1e_I0PTBrr-ihD0/edit",
 bmcNot:D+"1Wt2F1l7M9PLLpGyea4xkJ5XsG50sn-RK31ZqrQ0ZPnA/edit", bmcSoru:D+"1maIEY2qv9zGt_OVFv0gJQzBrjrqRCsjyIj7_0QnSnyM/edit",
 ariwon1:FL+"1dnDxn6vKPvdXv4XUkQg_0rqenKJXPwmv/view", ariwon2:FL+"15v8cWLRkGGGYxRFTNlSj28Ha74zs8qez/view",
 dr1:F+"1dzyvHbPcm7m4oLAAzrrxzd4cNrJRlXkU", dr2:F+"1aTC3-tCaCGwzsfF-IN9slRT5DR-DCnK8", dr3:F+"1taTeQFW8h4UbyLmkj0F3QCEzruQzwDZW", dr4:F+"1cRYzC-pEuUNu3vA-IRBbC0vZSj1l9UiC", dr5:F+"1e0Ee9RsY2xj7I6aqpmgDXB6KDRFrW9y3", dr6:F+"1zdFEyQxP_Nli8r9DQFkY9resvoW4VURA", dr7:F+"1dnglv5cENRpr5FoHDt91w2H6y07ASl-v", dr8:F+"1tShkDywGSRj4AGqxxD14eDA6r4JdXrUQ", dr9:F+"1vrSY5xdfjNZMmesUNRwl9GfsXdGZB0hc",
 fA:F+"1yviElnM8cwCuDhrOYRDZXuuS_3VBpWpC", fB:F+"1GH5fW_eW4c_VKft-d4tOAeFraBsgOyEs", fC:F+"1I_vetXJwUiNC-a1SCagBsEaewMMCfg6U", fD:F+"1Tvl35UftJQVaFdEKxfs0YsTFSWeBMZfy", fE:F+"15uFDqjUf4YA9zuQOeNGRPUJ7-oOKX7XZ", fF:F+"1tVw_npuEnjeDixmrAlDQiqXPICAkrqFL",
};

const DATAROOM = [
 { id:"A", title:"A. Strateji ve Business", url:U.fA, items:[
   { id:"A1", title:"A.1. İş Modeli", fn:"PLAN", area:"Şirket Stratejisinin Analizi ve Geliştirilmesi", url:F+"1TF_2dLNWeOzA8l04sGS3eP7-DXLiCfIA", guide:["1","İş Modeli Nedir ve Neden Analiz Edilir? – Bilgi Notu (29.09.2026)",U.bmcNot],
     flow:["Juris Bilgi Notu + Soru Seti Verir","Müvekkil Yönetimi Yanıtlar","Juris Kanvası Hazırlar","Birlikte Onaylanır"], docs:[
     doc("1","İş Modeli Nedir ve Neden Analiz Edilir? – Bilgi Notu",O.J,"done",U.bmcNot),
     doc("2","İş Modeli Soru Seti – 9 kanvas bloğu × 5 soru (29.09'da iletildi; yanıt bekleniyor)",O.M,"input",U.bmcSoru),
     doc("4","İş Modeli Dokümanı – Kanvas + Lean Canvas (bugün form, SHA taslağı ve yazışmalardan iskelet)",O.J,"progress"),
     doc("—","Ariwon ajans modülü iş modeli – Korenel ile gelir paylaşımı / lisans kurgusu",O.JM,"pending") ]},
   { id:"A2", title:"A.2. İş Planı", fn:"PLAN", area:"Şirket Stratejisinin Analizi ve Geliştirilmesi", url:F+"1tTdTEl1EAb1gognslVRdV9BI3MG_kqwa", empty:true, guide:["5","İş Planı Nedir ve Neden Analiz Edilir? – Bilgi Notu"],
     flow:["Juris Format Verir","Müvekkil Yönetimi Hazırlar","Birlikte Onaylanır"], docs:[
     doc("5","İş Planı Soru Seti – ürün yol haritası (Ariwon · Kory.ai), kullanıcı/abonelik hedefleri, ajans kanalı",O.JM,"pending"),
     doc("6","2027 İş Planı ve Bütçe (5 bölüm × OKR) – sayısal hedef yok",O.M,"input"),
     doc("—","Yatırım hazırlığı yol haritası – DD → düzeltim → pitch deck → EK-1 finansman süreci",O.J,"pending") ]},
   { id:"A3", title:"A.3. Yönetişim", fn:"PLAN", area:"Kurumsal Yönetim ve Organizasyon Yapısının Geliştirilmesi", url:F+"14dexgeZb74OxOsjqIo1iKJ0bP-kAFBOV", empty:true, guide:["32","Kurucu Pay Yapısı, Vesting ve Pay Sahipliği Sözleşmesi – Bilgi Notu"],
     flow:["Müvekkil İmzalı SHA + Defterleri Yükler","Juris Yapıyı Değerlendirir","YK / GK Onaylar"], docs:[
     doc("—","Pay Sahipliği Sözleşmesi – imzalı nüsha (Form S.5: 'mevcut'; Mart 2026 taslağı tescille uyumsuz)",O.M,"input",U.sha),
     doc("—","Pay defteri · YK karar defteri · GK müzakere defteri · güncel imza sirküleri (DD 1/2-4-7)",O.M,"input"),
     doc("—","Pay yapısı değerlendirmesi: A/B grup imtiyazları, Emirhan Engin'in konumu, Oğuz Silahtar payı ve ESOP (SHA taslağı)",O.J,"pending"),
     doc("29","Organizasyon Şeması ve YK / temsil yetkisi yapısı",O.J,"progress"),
     doc("30","Görev, Yetki ve Onay Matrisi (RACI) – ürün, sözleşme, finansman, İK kararları",O.O,"pending"),
     doc("31","Yönetim Karar Alma Mekanizması + aylık toplantı ve raporlama modeli",O.J,"pending") ]},
   { id:"A4", title:"A.4. Yatırımcı Sunumu", fn:"PLAN", area:"Şirket Stratejisinin Analizi ve Geliştirilmesi", url:F+"1SUm1NlF3wgIg0EIl63ZjBvXq6ftx61kd", empty:true, guide:["A.4.2","Yatırımcı Sunumu (Pitch Deck) Bilgi Notu"],
     flow:["DD + İş Modeli Tamamlanır","Juris Hikâyeyi Kurgular","EK-1 Finansman Süreci"], docs:[
     doc("A.4.2","Yatırımcı Sunumu (Pitch Deck) Bilgi Notu",O.J,"pending"),
     doc("—","Yatırım hikâyesi – 'Marketing that thinks': AI pazarlama platformu + ajans modülü",O.O,"pending"),
     doc("—","EK-1: Finansman ihtiyacı ve alternatiflerinin değerlendirilmesi (melek · VC · kitle fonlama · banka)",O.J,"pending",U.ek1),
     doc("—","Pitch Deck (.pptx)",O.O,"pending") ]},
   { id:"A5", title:"A.5. Performans İzleme ve Raporlama", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:F+"1zA94mPk4jOP0k5Nw4ekE8VulNQ3vjlo3", empty:true, guide:["11","Performans İzleme ve KPI/OKR Sistemi – Bilgi Notu"],
     flow:["Juris Raporlar","Yönetim Değerlendirir","Aksiyonlar Takip Edilir"], docs:[
     doc("—","Şirket hedeflerinin belirlenmesi (ARR, kullanıcı, ajans partneri) – SHA taslağı 20 mn USD ARR eşiği",O.M,"input"),
     doc("12","KPI / OKR Matrisi – 5 bölüm",O.O,"pending"),
     doc("15","Aylık Yönetim Raporu – DD · sözleşmeler · ürün · aksiyon",O.J,"pending"),
     doc("—","Yönetici özeti formatı",O.J,"pending"),
     doc("—","Juris Kurumsal Yönetim Paneli (bu panel) – Data Room'a link",O.J,"progress") ]},
 ]},
 { id:"B", title:"B. Finans", url:U.fB, items:[
   { id:"B1", title:"B.1. Bütçe", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:F+"1d6U6QkBx7OIysZ7n6tBdX1XT3TXRKlTP", empty:true, flow:["Juris Format Verir","Mali Müşavir / Yönetim Hazırlar","Yönetim Onayı"], docs:[
     doc("—","2026 ilk hesap dönemi fiilî gelir–gider (03.07 → 31.12)",O.SM,"input"),
     doc("6","2027 bütçe – ürün (Ariwon · Kory.ai) ve ajans modülü bazlı",O.M,"input"),
     doc("—","Sermaye kullanım planı – 335.000 TL ödenmiş sermaye teyidi (Form S.11)",O.SM,"input") ]},
   { id:"B2", title:"B.2. Nakit Akışı", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:F+"1oOl39DPTWwQt8FzSKrdbQuWEMyNyF8c6", empty:true, flow:["Juris Format Verir","Mali Müşavir Hazırlar","Aylık Onay"], docs:[
     doc("7","Aylık nakit akışı tablosu (runway)",O.SM,"input"),
     doc("—","İş Bankası Girişimcilik Şubesi banka / hesap sözleşmesi (DD 3/1)",O.M,"input"),
     doc("—","Finansman ihtiyacı ve zamanlaması – EK-1 Mali Yapı değerlendirmesi girdisi",O.M,"input") ]},
   { id:"B3", title:"B.3. Bilanço", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"1v56q4xkXOhnA0rpZ-Wz9ueqEVSURvs7e", empty:true, flow:["Mali Müşavir Yükler","Juris İnceler"], docs:[
     doc("DR","Açılış bilançosu ve 2026 ara dönem mali tablolar",O.SM,"input"),
     doc("DR","Güncel vergi borcu yoktur yazısı (DD 3/2)",O.SM,"input"),
     doc("DR","Güncel SGK borcu yoktur yazısı (DD 3/3)",O.SM,"input") ]},
 ]},
 { id:"C", title:"C. Muhasebe", url:U.fC, items:[
   { id:"C1", title:"C.1. Hesap Planı", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"1Rv3lvi7GRKb4EGlZKnOOBBdB11hcRj7X", empty:true, flow:["Mali Müşavir Yükler","Juris İnceler"], docs:[
     doc("DR","Tek düzen hesap planı – yazılım geliştirme giderleri ve FM haklarının aktifleştirilmesi dahil",O.SM,"input"),
     doc("—","TAP A.Ş. mali müşavirlik sözleşmesi (DD 4/2)",O.M,"input") ]},
   { id:"C2", title:"C.2. Mizan", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"11anVBpYRMAGsZmPoEWPoAg2sVwWWFP1r", empty:true, flow:["Mali Müşavir Yükler","Juris İnceler"], docs:[
     doc("DR","Güncel mizan (2026 Q3)",O.SM,"input"),
     doc("DR","Teknik iflas / ödeme aczi bulunmadığına ilişkin teyit (Form S.28)",O.SM,"input") ]},
 ]},
 { id:"D", title:"D. Operasyonlar", url:U.fD, items:[
   { id:"D1", title:"D.1. Ana Faaliyetler", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1wvYzSScTOWaZ_wPwQwtBly4aYXvumJ8x", empty:true,
     flow:["Müvekkil Yönetimi Ürün Bilgisi Verir","Juris Sözleşme Setini Kurar","Yazılım Ekibi Uygular"], docs:[
     doc("—","Ürün / hizmet portföyü – Ariwon (AI pazarlama platformu), Kory.ai, teknoloji danışmanlığı; fiyatlandırma modeli",O.M,"input"),
     doc("—","Bulut altyapısı, açık kaynak lisansları ve veri yerelliği bilgisi (Form S.66–67)",O.TE,"input"),
     doc("—","SaaS kullanıcı sözleşmesi + abonelik / ödeme koşulları (Ariwon)",O.J,"pending"),
     doc("—","Ajans modülü iş birliği sözleşmesi – Korenel (NDA imzalı; ticari sözleşme yok)",O.J,"pending") ]},
   { id:"D2", title:"D.2. Projeler", fn:"PLAN", area:"Şirket Stratejisinin Analizi ve Geliştirilmesi", url:F+"1AbIew87f37E1mqCcyvop39JV6PndV6B9", empty:true, flow:["Müvekkil Yönetimi Yükler","Juris İnceler"], docs:[
     doc("—","Ariwon ajans modülü – Korenel (11.09 modül toplantısı · 14.09 Ariwon Günü · 01.10 görüşmeleri)",O.M,"input"),
     doc("—","Kory.ai ürünü – kapsam ve FM sahipliği (14.08 demo)",O.M,"input"),
     doc("—","Finansman turu hazırlığı – EK-1 kapsamında alternatiflerin değerlendirilmesi",O.J,"pending",U.ek1),
     doc("—","Şirket bilgisayarlarının iadesi – 4 cihaz (29.09 bilgi/belge talebi)",O.M,"input") ]},
 ]},
 { id:"E", title:"E. Hukuk", url:U.fE, items:[
   { id:"E1", title:"E-1. Hukuki Durum Tespiti ve Risk Analizi", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"1c7RPD3_2cU_3fJtcShs0qwzRoFwuJRy0", subfolders:[["2. Data Room (9 başlık)",U.dataRoom,false],["1. Şirket Kayıtları – TTSG ilanı",U.dr1,false],["2. Lisanslar ve İzinler",U.dr2,true],["3. Kredi ve Finansman",U.dr3,true],["4. Sözleşmeler",U.dr4,true],["5. Çalışanlar ve İK",U.dr5,true],["6. Malvarlığı",U.dr6,true],["7. BT · Veri · FM",U.dr7,true],["8. Sigorta",U.dr8,true],["9. Uyuşmazlık",U.dr9,true]], guide:["DD","Due Diligence Asgari İnceleme Kılavuzu (A.Ş.)"],
     flow:["Juris Sorar (Form Mülakatı)","Müvekkil Yönetimi Yanıtlar","Belgeler Data Room'a Yüklenir","Juris İnceler","Risk Raporu"], docs:[
     doc("3","Hukuki Bilgilendirme ve Risk Tespit Formu – Mülakat Cevapları (28.09.2026 · 76 soru)",O.J,"done",U.form),
     doc("4","DD Kapsamında Talep Edilen Belgeler – 9 başlık · 14 belge (28.09.2026)",O.J,"done",U.ddList),
     doc("Ç3","Data Room sisteminin kurulması – 9 başlık (29.09) + A–F klasörleri (17.10)",O.J,"done",U.dataRoom),
     doc("DR","Kuruluş TTSG ilanı 03.07.2026 (Data Room 1'de)",O.M,"done",U.ttsg),
     doc("DR","DD belge seti – 14 belgeden 1'i yüklendi (esas sözleşme, defterler, SHA, imza sirküleri, banka, kira, TAP, Korenel NDA, domain listesi)",O.M,"input",U.dataRoom),
     doc("20","Hukuki Risk Envanteri ve Risk Haritası (bu panelde ön değerlendirme)",O.J,"progress"),
     doc("21","Hukuki Durum Tespiti Raporu + düzeltim aksiyon planı",O.J,"pending") ]},
   { id:"E2", title:"E-2. Şirket Ana Faaliyet Sözleşmeleri", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1bkkrJiCxQuP00gKJLTAQJBR5_pGecJIz", empty:true,
     flow:["Müvekkil Mevcut Sözleşmeleri Yükler","Juris Seti Kurar / Revize Eder","Müvekkil İmzalar"], docs:[
     doc("—","Korenel – MEOWNAI – Ariwon ajans modülü gizlilik sözleşmeleri (28.08 MEOWNAI · 01–03.09 Korenel imzalı) – Drive'a taşınmadı",O.J,"review"),
     doc("—","Şirket merkezi kira sözleşmesi (DD 4/1)",O.M,"input"),
     doc("—","TAP A.Ş. mali müşavirlik sözleşmesi (DD 4/2)",O.M,"input"),
     doc("—","İş Bankası Girişimcilik Şubesi banka sözleşmesi (DD 3/1)",O.M,"input"),
     doc("—","SaaS kullanıcı sözleşmesi (Terms of Service) + abonelik ve ödeme koşulları – Ariwon",O.J,"pending"),
     doc("—","Ajans modülü iş birliği / lisans sözleşmesi – Korenel",O.J,"pending"),
     doc("—","Kurucu ve geliştirici FM devir sözleşmesi (RAG mimarisi, tahminleme motoru, kod – SHA taslağı m.12)",O.J,"pending",U.sha),
     doc("27","Sözleşme kayıt, onay ve saklama sistemi (Form S.37: hukuk müşavirliği yürütüyor)",O.O,"pending") ]},
   { id:"E3", title:"E-3. İnsan Kaynakları Projesi", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1xcnUfgeR9-wTOl8cOuv3UIfa3_zW00Ln", empty:true,
     flow:["Müvekkil Yönetimi Bilgi/Belge Verir","Juris İlişkiyi Nitelendirir","Sözleşme Seti + İade Süreci"], docs:[
     doc("—","4 şirket bilgisayarını elinde tutan kişiler: ad, başlangıç tarihi, ilişki türü, sözleşme, SGK, fatura, zimmet, yazışma (29.09 talebi)",O.M,"input"),
     doc("—","Çalışma / hizmet ilişkisinin hukuki nitelendirmesi – kişi bazında (iş sözleşmesi mi, hizmet mi)",O.J,"pending"),
     doc("—","Bilgisayar iadesi: ihtar / bildirim stratejisi – inceleme sonrası",O.J,"pending"),
     doc("—","Standart sözleşme seti: geliştirici iş sözleşmesi · freelance hizmet sözleşmesi · eser/buluş devri · gizlilik · rekabet yasağı",O.J,"pending"),
     doc("—","Ekipman zimmet / teslim tutanağı şablonu",O.J,"pending"),
     doc("—","Çalışan listesi ve İK politikaları (Form S.46, S.54 yanıtsız)",O.M,"input") ]},
   { id:"E4", title:"E-4. NDA Sözleşme Seti", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1uQO9aQvNOk3dGcM_SWiDJhsgvW4xLZ-D", empty:true,
     flow:["Juris Şablon Verir","Müvekkil / Karşı Taraf İmzalar","Drive'a Yüklenir"], docs:[
     doc("27","Tek Taraflı ve Karşılıklı Gizlilik Sözleşmesi şablonları – Korenel ajans modülü için (İ. Karakum, 17.08)",O.J,"done"),
     doc("—","Korenel – MEOWNAI – Ariwon NDA'ları imzalandı (28.08 Sergey · 01–03.09 Elif Kor)",O.M,"done"),
     doc("—","İmzalı NDA'ların Data Room 4'e yüklenmesi (DD 4/3)",O.M,"input"),
     doc("27","Meown standart NDA seti (TR/EN · SaaS / AI ürünleri için gizlilik hükümleri)",O.J,"pending"),
     doc("27","NDA Kullanım Bilgilendirme Dokümanı",O.J,"pending") ]},
   { id:"E5", title:"E-5. Hukuki Danışmanlık", fn:"İCRA", area:"Uyuşmazlık ve Hukuki Süreç Danışmanlığı", url:F+"1a0IUyUit3qk1UbynaOhxX6R0rG7MzGes", empty:true,
     flow:["Dosya / olay bazında sürekli hizmet"], docs:[
     doc("Ç2","Hizmet Teklifi · Danışmanlık Sözleşmesi · EK-1 (29.09) – 'Teklif ve Sözleşme' klasöründe",O.J,"done",U.teklifKlasor),
     doc("—","İmzalı sözleşme ve EK-1 nüshalarının iletilmesi (29.09 talebi)",O.M,"input"),
     doc("—","Eylül (09.09) ve Ekim (12.10) hizmet bedeli makbuzları – Eylül makbuzu sözleşme yürürlüğünden önce; dayanak teyidi",O.J,"review"),
     doc("—","Sermayenin fiilen ödendiğinin ve pay senedi/ilmühaber durumunun teyidi (Form S.11)",O.SM,"input"),
     doc("—","EK-1 Mali Yapı değerlendirmesi – finansman ihtiyacı ve alternatifler",O.J,"pending",U.ek1) ]},
   { id:"E6", title:"E-6. KVKK Projesi – Mini", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1JBtZ1MnnyqdcZcaVGMxaH1j3Q3swC4tu", empty:true,
     flow:["Juris Sorar","Yazılım Ekibi + Yönetim Cevaplar","Teslim + Eğitim"], docs:[
     doc("30","Mini KVKK Soru Seti – kullanıcı verileri, AI girdileri/çıktıları, bulut yerelliği, yurt dışı aktarım (Form S.68 yanıtsız)",O.JM,"pending"),
     doc("—","VERBİS kayıt yükümlülüğü teyidi",O.M,"input"),
     doc("31","Mini KVKK Doküman Seti – aydınlatma, açık rıza, çerez, saklama/imha, veri işleyen sözleşmesi (DPA)",O.J,"pending"),
     doc("—","EU AI Act ön değerlendirme – AB kullanıcıları / çıktıları varsa (Form S.2)",O.J,"pending") ]},
   { id:"E7", title:"E-7. Uyuşmazlık Takibi", fn:"İCRA", area:"Uyuşmazlık ve Hukuki Süreç Danışmanlığı", url:F+"1jt81d5RjU8m_oyKbYBbRGiPp_HmDXsOU", empty:true,
     flow:["Tespit","Değerlendirme","Müvekkil Kararı","Süreç Takibi"], docs:[
     doc("—","Şirket bilgisayarlarının iadesi – potansiyel 4 ayrı uyuşmazlık; ihtar öncesi belge incelemesi (29.09)",O.J,"review"),
     doc("—","Derdest dava, icra takibi ve idari süreç bulunmadığı beyanı (Form S.69–76: '—')",O.M,"review"),
     doc("—","Uyuşmazlık izleme listesi (bu panel)",O.J,"progress") ]},
 ]},
 { id:"F", title:"F. İletişim", url:U.fF, items:[
   { id:"F1", title:"F-1. Toplantı Tutanakları", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:U.fF,
     flow:["Gündem","Toplantı","Tutanak + Aksiyon","Teslim / Teslim edilemeyen","Sonraki gündem"], docs:[
     doc("TT","05.08.2026 · Ariwon–Juris Onboarding Toplantısı – tutanak yok",O.J,"review"),
     doc("TT","14.08.2026 · Korenel | Ariwon Demo ve Kory.ai Ürün – tutanak yok",O.J,"review"),
     doc("TT","28.09.2026 · DD mülakatı – çıktı: Risk Tespit Formu mülakat cevapları + 6 teslim maili (29.09)",O.J,"done",U.form),
     doc("TT","01.10.2026 · Ariwon 1 ve Ariwon 2 (ses kayıtları F klasöründe) – yazılı tutanak ve aksiyon listesi yok",O.J,"review",U.ariwon1),
     doc("TT","Sonraki toplantı: DD belge teslimi + iş modeli yanıtları + bilgisayar dosyası – tarih yok",O.JM,"pending") ]},
   { id:"F2", title:"F-2. Mailler", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:U.fF, empty:true, noFolder:true,
     flow:["Teslim maili","Talep maili","Hatırlatma","Onay"], docs:[
     doc("M","14–17.08 · Korenel NDA şablonları (Juris iç + Korenel)",O.J,"done"),
     doc("M","25.08 – 03.09 · Korenel / MEOWNAI / Ariwon NDA imza turu",O.M,"done"),
     doc("M","09.09 · 12.10 · Hizmet bedeli makbuzları (muhasebe@jurishukuk.com)",O.J,"done"),
     doc("M","29.09 · 6 teslim maili: teklif + sözleşme + EK-1 · Drive yapısı · iş modeli notu · form yanıtları · Data Room · DD belge listesi",O.J,"done"),
     doc("M","29.09 · Personeldeki şirket bilgisayarları – bilgi ve belge talebi",O.J,"done"),
     doc("M","Planlı · DD belge listesi + iş modeli soru seti + bilgisayar dosyası hatırlatması",O.J,"pending"),
     doc("M","Planlı · İmzalı sözleşme / EK-1 nüshası talebi",O.J,"pending") ]},
 ]},
];

/* dayanak sayacı: doküman mı beyan mı */
const BASIS_COUNT={doc:["Ç1–Ç2.1 Hizmet Teklifi · Danışmanlık Sözleşmesi · EK-1 (29.09.2026)","E-1 Hukuki Bilgilendirme ve Risk Tespit Formu – mülakat cevapları (28.09)","E-1 DD Kapsamında Talep Edilen Belgeler (28.09)","E-1 Kuruluş TTSG ilanı (03.07.2026) – Data Room 1","A.1 İş Modeli Bilgi Notu ve Soru Seti (29.09)","E-4 Korenel – MEOWNAI – Ariwon NDA'ları (e-posta ekleri, Ağu–Eyl 2026)"],beyan:["A.3 Pay Sahipliği Sözleşmesi – imzasız taslak (Mart 2026; %51/%47/%2) – tescil %98/%2","A.1 İş Modeli Kanvası (form + SHA taslağı + takvim davetleri)","E-3 Personeldeki 4 bilgisayar (28.09 görüşmesi)","F-1 01.10 Ariwon toplantıları (ses kaydı · tutanak yok)","D.1 Ürün portföyü – Ariwon · Kory.ai (takvim davetleri · ariwon.co)","C Mali müşavir TAP A.Ş. · İş Bankası (form beyanı)"],none:["B Finans (bütçe · nakit · bilanço)","C Muhasebe (hesap planı · mizan)","A.2 İş Planı · A.4 Pitch Deck · A.5 KPI","E-2 SaaS kullanıcı sözleşmesi · ajans modülü sözleşmesi · FM devri","E-6 KVKK / AI Act","E-7 uyuşmazlık (bilinen dosya yok)"]};
