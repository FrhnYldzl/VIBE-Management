/* MÜVEKKİLE ÖZGÜ: CLIENT, FUNCTIONS, U (Drive linkleri), DATAROOM, BASIS_COUNT */
/* =========================================================
   CLIENT CONFIG — her müvekkil için bu blok değişir.
   Durum: done · review (onay bekliyor) · progress · input (girdi bekleniyor – kimden olduğu 'owner' alanında) · pending
   Dayanak: doc (Drive'da doküman var) · beyan (toplantı/soru seti/e-posta beyanı) · none
   ========================================================= */
const CLIENT = {
  id:"zyrone", name:"ZYRONE",
  entities:["Zyrone Dynamics Havacılık Danışmanlık ve Arge San. Tic. A.Ş.","Zyrone Tactics (unvan teyit edilecek)"], short:["Zyrone"],
  driveRoot:"https://drive.google.com/drive/folders/1hiQtHm5brvXfHI4k7QDbQlMEcHkDFwq7",
  planSheet:"https://drive.google.com/file/d/1c137npKNYU003_f96Kw0rMVwWBjZGBEu/view", planLabel:"Hizmet Teklifi (Mart 2026)",
  kickoff:"01.04.2026 (sözleşme yürürlüğü) · DD başlangıcı 08.04.2026", rhythm:[["Aylık","Hizmet bedeli 65.000 TL · ayın 1–5'i (01.04 – 31.12.2026, 6 aylık otomatik uzama)"],["Aylık (teklif)","Yönetim kurulu toplantısı + raporlama – 2026'da kurulamadı"],["Talep bazlı","Dosya bazlı görüş · son toplantı 08.09.2026 · 13.10 Kalite Toplantısı iptal"]],
  startDocs:[["Ç1","Şirketler Hukuku ve Kurumsal Yönetim Danışmanlığı Hizmet Teklifi – Mart 2026 (Dynamics + Tactics; 65.000 TL/ay)","09.03.2026"],["Ç2","Danışmanlık Sözleşmesi – Zyrone Dynamics A.Ş. (yürürlük 01.04.2026 · bitiş 31.12.2026) – imzalı nüsha Drive'da yok","07.04.2026"],["Ç3","Zyrone DD Başlangıç Toplantısı (Gemini notu – içerik özeti yok)","08.04.2026"],["Ç4","Hukuki Bilgilendirme ve Risk Tespiti Formları – Dynamics ve Tactics için ayrı","09.04.2026"],["Ç5","Juris & Zyrone Toplantısı aksiyon listesi (4 Zyrone + 5 Juris aksiyonu)","16.09.2026"],["Ç6","Drive Data Room A–F klasör yapısı (2. Zyrone)","17.10.2026"]],
  scopeIn:["1. Yatırım Hazırlığı Kapsamında Hukuki Durum Tespiti (Legal Due Diligence) – Dynamics ve Tactics","2. Kurumsal Yapılandırma – DD bulgularına göre; Dynamics–Tactics faaliyet ayrıştırması ve reorganizasyon","3. Genel Sözleşme Danışmanlığı – ticari sözleşme hazırlama, inceleme, müzakere (NDA, MoU, yetkilendirme)","4. Uyuşmazlık Takibi ve Hukuki Süreç Danışmanlığı – değerlendirme ve süreç takibi","Metodoloji: aylık yönetim kurulu toplantısı ve düzenli raporlama (teklif)"],
  scopeOut:["Ceza davaları ve ceza hukuku süreçleri","Uluslararası tahkim süreçleri","Birleşme-devralma ve yatırım süreçlerinin yürütülmesi (hazırlık dahil, işlem yürütümü hariç)","Ruhsat, lisans, faaliyet izni ve sertifika alım süreçleri (Tesis Güvenlik Belgesi başvurusu dahil)","Halka arz ve sermaye piyasası işlemleri","Mali Yapı, Finansman ve Teşvik Süreçleri danışmanlığı – ayrı sözleşme (iletilmesi bekleniyor)","Marka tescil / itiraz işlemleri – Marqby (ör. 'Konrul' karşı görüş)"],
  contacts:{ "Müvekkil Yönetimi":"Ayşenur Çalışkan Kanber (ana muhatap) · Ceren Sarı, Eda (sözleşme / NDA talepleri) · Oğuzhan Gazi Aslantaş (DD klasörü)", "Muhasebe & Finans":"Enes Altıok – Accounting & Finance Specialist (DD formu, bağımsız denetim, İK dosyaları)", "Mali Müşavir":"Teyit edilmedi – geçmiş dönem mali müşavirlik değişikliği (gerçek faydalanıcı yazışması)", "YK (Yönetim Kurulu)":"Üyeler ve temsil yetkisi teyit edilmedi – güncel imza sirküleri talep edildi", "Juris":"Ferhan Yıldızlı · Gülşah Algın · İlayda Karakum · Tuğberk Dekak · Aybüke Tekin" },
};
const FUNCTIONS = {
  PLAN:{k:"1",title:"PLAN",desc:"Yatırım hazırlığı stratejisi ve kurumsal yapılandırma: iş modeli, Dynamics–Tactics ilişkisinin reorganizasyonu, finansman modelleri, yönetişim."},
  "İCRA":{k:"2",title:"İCRA",desc:"Genel sözleşme danışmanlığı ve şirket içi hukuki süreçler: kamu/savunma sözleşmeleri, NDA ve MoU'lar, İK dosyaları, KVKK, dosya bazlı görüşler."},
  "DENETİM":{k:"3",title:"DENETİM",desc:"Yatırım hazırlığı kapsamında hukuki durum tespiti (DD): Risk Tespiti Formları, belge seti, Data Room, risk haritası."},
  RAPORLAMA:{k:"4",title:"RAPORLAMA",desc:"Aylık yönetim kurulu toplantısı ve raporlama (teklif metodolojisi); toplantı → tutanak → aksiyon döngüsü, mail kaydı."},
};
const D="https://docs.google.com/document/d/", S="https://docs.google.com/spreadsheets/d/", P="https://docs.google.com/presentation/d/", F="https://drive.google.com/drive/folders/", FL="https://drive.google.com/file/d/";
const doc=(no,t,owner,status,url,ent)=>({no,t,owner,status,url,ent});
const O={J:"Juris",JM:"Juris → Müvekkil Yönetimi",M:"Müvekkil Yönetimi",FN:"Muhasebe & Finans (Enes Altıok)",SM:"Mali Müşavir / Bağımsız Denetim",YK:"YK (Yönetim Kurulu)",MQ:"Marqby (marka)",O:"Ortak"};

/* Drive dosya kısayolları */
const U={
 teklif:FL+"1c137npKNYU003_f96Kw0rMVwWBjZGBEu/view", teklifPptx:FL+"1GkDDQkb5UNzH6My-ul8f07NIASZIGR9C/view", contract:D+"1GryaA3di1lj6ATcyiVDS_GilN7rCQChRWeEAOMKIEVE/edit", form:D+"1FumDJZWfuJZz5P6EVsgENlm4SVYA945oJ-QKnuP6bYY/edit", sirketler:F+"1zu1xT0-rvnoMFWF1TkF8iklR1m8ItLeW",
 havelsan:FL+"12CBveNqlyxEEuD4PMDrEq6ddKx1l_5Po/view", havelsanKarar:FL+"1OkPZ2trv_6rH3WCOasaUt5LRSEtoH0NO/view", dava:FL+"1hqRUJYWQswiYd5CUGFiM1UKordYzA872/view", ihtarH:FL+"1xBXVHzMd7jO0jGD3WyAVlwU_RTAvzrXW/view", ihtarEGM:FL+"1oGB9VLv3rdwLn9Bb67VikJSKevCEA-oo/view", tescil:FL+"1lCvVOM2Ir5825NVqovHgYi39-ekAOcCF/view",
 uyum2022:FL+"1Mi_rH7zYW5sHBguuT_xn4RsN6ze0QuIg/view", dd2021:FL+"1uLYjo5zzZMjdjRYTg9R1GaFunFJN0GuB/view", ttsg2023:FL+"1Ki6ZzRVo4wuscgIFVJNo4p7QK2p-XOY6/view", pay2023:FL+"1rpK6hrwewLgrZ4Sg7tq7iSBWhrLIojRW/view", tadil2023:FL+"1Rr8MTcSFtPCWOvfDCa0u4s84P0b0BTQF/view",
 tekTransfer:FL+"1WdwLeJX8bIc3t7BupEvzvLaLsM__j2ZO/view", distributor:FL+"18x20z-V1GtWnKXOXPsdtbyGS2JtD0Pwg/view", gizlilik:FL+"1UKW5F2lrVGR7e8ji7Xnq67F7FRT8nR87/view", satisPaz:FL+"1VLLEmicBWmYzdOblUHGi1Kua6txJEtcv/view", fuar:FL+"1F8bcYnp8fmE_SrTY77yfY8swBWeA5uU4/view", egitim:FL+"1dUUFCUkWADeMRYE5RbvEfoLittohmStS/view", ucus:FL+"17v2jAKXbGa5TO7AUdhsk__zrc2SqqMG1/view",
 kvkkM:FL+"1XSlnyrQa8gmhZG34kJ2c9fpGiJv4aoxx/view", kvkkT:FL+"1LNP6HVTcIv8XJJ1U3uHe3MGfVqsZBvZw/view", avYazi:FL+"184pa0t4S-MopW9yYGXr9wcOoHEqClIls/view",
 fA:F+"1yGVkVQqeIKKpgGQS4Gg46A6nSJFnBBYC", fB:F+"1kCr_gaa8cci_-P-Kq2hA7uoLR1hOTFWl", fC:F+"10YXmEIkL5iXRWFTPk_2aMb_8UMmi7y9s", fD:F+"1RuiuhFoxen_s4LyuLZHyHmOQ5jG5eubO", fE:F+"1d8Ec2Q_P8vatEkhhIHMUIbmE2hGpkvvt", fF:F+"1bElgAEK9IRvOyYdk4w0GH5zd3N_axdu7",
};

const DATAROOM = [
 { id:"A", title:"A. Strateji ve Business", url:U.fA, items:[
   { id:"A1", title:"A.1. İş Modeli", fn:"PLAN", area:"Yatırım Hazırlığı ve Kurumsal Yapılandırma", url:F+"1L6NELfdsiL1Gd7BvSr4VVFrRkh98Vz5J", empty:true, guide:["2","İş Modeli Nedir ve Neden Analiz Edilir? – Bilgi Notu"],
     flow:["Zyrone Doküman İletir","Juris İş Modelini Hazırlar","Birlikte Onaylanır"], docs:[
     doc("—","Proje finansmanına uygun proje modelleri dokümanı (Kanada Projesi vb.) – 08.09 aksiyonu",O.M,"input"),
     doc("—","Teknoloji transferinin modellenmesi ve iş modeline entegrasyonu – 08.09 aksiyonu",O.M,"input"),
     doc("2","İş Modeli Bilgi Notu ve Soru Seti (savunma / havacılık · İHA · Ar-Ge · teknoloji transferi)",O.JM,"pending"),
     doc("4","İş Modeli Dokümanı – Kanvas + Lean Canvas (bugün yazışmalara dayalı iskelet)",O.J,"progress"),
     doc("—","Alternatif finansman modellerinin iş modeli kapsamında değerlendirilmesi (finansman kuruluşları görüşmeleri)",O.J,"pending") ]},
   { id:"A2", title:"A.2. İş Planı", fn:"PLAN", area:"Yatırım Hazırlığı ve Kurumsal Yapılandırma", url:F+"15Ai4tXq1hP6DqJVL0dJENZr6Q4C3lNdV", empty:true, guide:["5","İş Planı Nedir ve Neden Analiz Edilir? – Bilgi Notu"],
     flow:["Juris Format Verir","Müvekkil Yönetimi Hazırlar","Birlikte Onaylanır"], docs:[
     doc("5","İş Planı Soru Seti – ürün/proje portföyü, kamu ve ihracat satış hedefleri, Ar-Ge yatırımları",O.JM,"pending"),
     doc("6","2027 İş Planı ve Bütçe (5 bölüm × OKR) – sayısal hedef yok",O.M,"input"),
     doc("—","Yatırım hazırlığı yol haritası – DD → düzeltim → yatırımcı sunumu",O.J,"pending") ]},
   { id:"A3", title:"A.3. Yönetişim", fn:"PLAN", area:"Yatırım Hazırlığı ve Kurumsal Yapılandırma", url:F+"1No65zfdtQ0gEBWNGtePCGFRguhxnNwAm", empty:true, guide:["32","Kurumsal Yönetim ve Grup Yapısı – Bilgi Notu"],
     flow:["Zyrone Reorganizasyon Dokümanı Verir","Juris Yapılandırır","YK Onaylar"], docs:[
     doc("—","Zyrone Dynamics – Zyrone Tactics ilişkisinin reorganizasyonu dokümanı (08.09 aksiyonu – Zyrone iletecek)",O.M,"input"),
     doc("—","Dynamics–Tactics reorganizasyon çalışması ve grup yapısı önerisi (doküman sonrası Juris)",O.J,"pending"),
     doc("—","Ortaklık yapısı: DCM Shriram Industries pay edinim belgesi · pay sahipleri sözleşmesi · pay defteri (08.10 talebi)",O.M,"input"),
     doc("29","Organizasyon Şeması ve YK / temsil yetkisi yapısı (güncel imza sirküleri)",O.M,"input"),
     doc("30","Görev, Yetki ve Onay Matrisi (RACI) – sözleşme, teminat, ihale, İK kararları",O.O,"pending"),
     doc("31","Aylık YK Toplantısı, Aksiyon Takibi ve Raporlama Modeli (teklif metodolojisi)",O.J,"pending") ]},
   { id:"A4", title:"A.4. Yatırımcı Sunumu", fn:"PLAN", area:"Yatırım Hazırlığı ve Kurumsal Yapılandırma", url:F+"1Lo0BbIDIiKPsnH_cJtQN1ADFBo1NNhAQ", empty:true, guide:["A.4.2","Yatırımcı Sunumu (Pitch Deck) Bilgi Notu"],
     flow:["DD Tamamlanır","Juris Hikâyeyi Kurgular","Birlikte Onaylanır"], docs:[
     doc("A.4.2","Yatırımcı Sunumu (Pitch Deck) Bilgi Notu",O.J,"pending"),
     doc("—","Yatırım hikâyesi – yerli İHA / savunma Ar-Ge · teknoloji transferi · proje finansmanı",O.O,"pending"),
     doc("—","Yatırım işleminin yürütülmesi – kapsam dışı (ayrı mutabakat)",O.M,"pending",U.contract),
     doc("—","Pitch Deck (.pptx)",O.O,"pending") ]},
   { id:"A5", title:"A.5. Performans İzleme ve Raporlama", fn:"RAPORLAMA", area:"Aylık Yönetim Kurulu Raporlaması", url:F+"1FvHBKpvJ1a8556p0PYPITM9cHdVEy-gs", empty:true, guide:["11","Performans İzleme ve KPI/OKR Sistemi – Bilgi Notu"],
     flow:["Juris Raporlar","YK Değerlendirir","Aksiyonlar Takip Edilir"], docs:[
     doc("Ç5","08.09.2026 toplantısı aksiyon listesi (16.09 maili)",O.J,"done"),
     doc("—","DD Süreci Güncel Durum ve Eksikler raporu (30.07 iç rapor · 25.08 Ayşenur Hanım'a)",O.J,"done"),
     doc("15","Aylık Yönetim Kurulu Raporu – DD · sözleşmeler · uyuşmazlık · aksiyon",O.J,"pending"),
     doc("12","KPI / OKR Matrisi – 5 bölüm",O.O,"pending"),
     doc("—","Juris Kurumsal Yönetim Paneli (bu panel) – Data Room'a link",O.J,"progress") ]},
 ]},
 { id:"B", title:"B. Finans", url:U.fB, items:[
   { id:"B1", title:"B.1. Bütçe", fn:"RAPORLAMA", area:"Aylık Yönetim Kurulu Raporlaması", url:F+"1uMRfcDviuHFueBod1PJBssC0WjgZiWqg", empty:true, flow:["Juris Format Verir","Muhasebe & Finans Hazırlar","YK Onayı"], docs:[
     doc("—","2026 bütçe / fiilî gerçekleşme (Dynamics + Tactics ayrı)",O.FN,"input"),
     doc("6","2027 bütçe – proje / ürün bazlı",O.FN,"input"),
     doc("—","Ar-Ge ve teknoloji geliştirme bölgesi teşvik belgeleri (08.10 talebi)",O.FN,"input") ]},
   { id:"B2", title:"B.2. Nakit Akışı", fn:"RAPORLAMA", area:"Aylık Yönetim Kurulu Raporlaması", url:F+"19SGZXOXqpayZPLrx80N0REGl8_jVNNcB", empty:true, flow:["Juris Format Verir","Muhasebe & Finans Hazırlar","Aylık Onay"], docs:[
     doc("7","Nakit akışı ve proje finansmanı tablosu (Kanada Projesi vb.)",O.FN,"input"),
     doc("—","Kredi sözleşmeleri, teminat ve rehin belgeleri (08.10 talebi)",O.FN,"input"),
     doc("—","Teminat mektupları – Ankara Teknopark ve Roketsan lehine; diğer garanti/kefaletler (08.10 talebi)",O.FN,"input") ]},
   { id:"B3", title:"B.3. Bilanço", fn:"DENETİM", area:"Hukuki Durum Tespiti (DD)", url:F+"1JuU2wl8uWAjPN0t6tCGF1rmCGID2DS6B", empty:true, flow:["Bağımsız Denetim Raporu","Muhasebe & Finans Yükler","Juris İnceler"], docs:[
     doc("DR","31.12.2024 ve 31.12.2025 bağımsız denetim raporları (08.10 talebi)",O.SM,"input"),
     doc("—","31.03.2026 ara dönem bağımsız denetimi – avukat yazısı (08.07 talebi)",O.J,"done",U.avYazi),
     doc("DR","Vadesi geçmiş vergi ve SGK borcu yoktur yazıları",O.FN,"input") ]},
 ]},
 { id:"C", title:"C. Muhasebe", url:U.fC, items:[
   { id:"C1", title:"C.1. Hesap Planı", fn:"DENETİM", area:"Hukuki Durum Tespiti (DD)", url:F+"1Q7tNfPOgXNqk_h6F-ceoYRq74l9QmRb9", empty:true, flow:["Muhasebe & Finans Yükler","Juris İnceler"], docs:[
     doc("DR","Tek düzen hesap planı (Dynamics + Tactics)",O.FN,"input"),
     doc("—","Grup içi işlemlerin ayrı izlenmesi (Dynamics ↔ Tactics) – konsolidasyon için",O.O,"pending"),
     doc("—","Mali müşavir / muhasebe sorumlusu teyidi",O.M,"input") ]},
   { id:"C2", title:"C.2. Mizan", fn:"DENETİM", area:"Hukuki Durum Tespiti (DD)", url:F+"10OErmU1SBMrtbie9AFDjWn3dhvCvMSbd", empty:true, flow:["Muhasebe & Finans Yükler","Juris İnceler"], docs:[
     doc("DR","Güncel mizan (2026 Q3)",O.FN,"input"),
     doc("DR","Bağımsız denetim raporu ile mizan mutabakatı",O.SM,"pending") ]},
 ]},
 { id:"D", title:"D. Operasyonlar", url:U.fD, items:[
   { id:"D1", title:"D.1. Ana Faaliyetler", fn:"İCRA", area:"Genel Sözleşme Danışmanlığı", url:F+"1E-aWkM-UvZKGacSm0h9WcB1m50bfY7Y1", empty:true,
     flow:["Müvekkil Yönetimi Yükler","Juris İnceler","Sözleşme setine girdi"], docs:[
     doc("—","Ürün / hizmet portföyü – İHA platformları (ZD200, VVC), entegrasyon, uçuş hizmeti, eğitim",O.M,"input"),
     doc("—","Kamu kurum ve kuruluşlarıyla sözleşmeler – Roketsan A.Ş. başta (08.10 talebi)",O.M,"input"),
     doc("—","Müşteri ve tedarikçi sözleşmeleri (08.10 talebi)",O.M,"input"),
     doc("—","Savunma sanayii izinleri – Tesis Güvenlik Belgesi, üretim ve ihracat izinleri teyidi",O.M,"input"),
     doc("—","Tesis Güvenlik Belgesi görüşmesinin planlanması (08.09 Juris aksiyonu)",O.J,"pending") ]},
   { id:"D2", title:"D.2. Projeler", fn:"PLAN", area:"Yatırım Hazırlığı ve Kurumsal Yapılandırma", url:F+"1DkGQV3iIFMwbVvfqydtbX3W68x6XhOfD", empty:true, flow:["Müvekkil Yönetimi Yükler","Juris İnceler"], docs:[
     doc("—","Kanada Projesi – proje finansmanı modeli (Kanada iş birliği NDA'sı 03.07 incelendi)",O.M,"input"),
     doc("—","Remote Robotics MoU – bağlayıcılık ve fikri mülkiyet görüşü (07.10)",O.J,"done"),
     doc("—","ONAS ile iş birliği görüşmesinin planlanması (08.09 Juris aksiyonu)",O.J,"pending"),
     doc("—","Teknoloji transferi modeli – iş modeline entegrasyon",O.M,"input"),
     doc("—","Mali Yapı, Finansman ve Teşvik Süreçleri danışmanlık sözleşmesinin iletilmesi (Notion görevi 17.09)",O.J,"pending") ]},
 ]},
 { id:"E", title:"E. Hukuk", url:U.fE, items:[
   { id:"E1", title:"E-1. Hukuki Durum Tespiti ve Risk Analizi", fn:"DENETİM", area:"Hukuki Durum Tespiti (DD)", url:F+"1umxPhGwFTxrVxo_312Ys686BtbhFxTD5", empty:true, guide:["DD","Due Diligence Asgari İnceleme Kılavuzu (A.Ş.)"],
     flow:["Juris Sorar (Form)","Müvekkil Yönetimi Cevaplar","Muhasebe & Finans Yükler","Juris İnceler","Risk Raporu"], docs:[
     doc("16","Hukuki Bilgilendirme ve Risk Tespiti Formu – Dynamics (28.04 alındı; Drive kopyası boş şablon)",O.FN,"done",U.form,"Dynamics"),
     doc("16","Hukuki Bilgilendirme ve Risk Tespiti Formu – Tactics (09.04'ten beri bekleniyor)",O.FN,"input",null,"Tactics"),
     doc("17","DD belge seti – Dynamics: 07.10 kısmi paylaşım incelendi, 08.10 ek belge listesi gönderildi",O.FN,"input",null,"Dynamics"),
     doc("17","DD belge seti – Tactics (hiç belge yok; 08.09 aksiyonu)",O.M,"input",null,"Tactics"),
     doc("Ç6","Data Room Sisteminin Kurulması (A–F klasörleri, 17.10.2026) – belgeler henüz taşınmadı",O.J,"done",CLIENT.driveRoot),
     doc("20","Hukuki Risk Envanteri ve Risk Haritası (bu panelde ön değerlendirme)",O.J,"progress"),
     doc("21","Hukuki Durum Tespiti Raporu – yatırım hazırlığı",O.J,"pending"),
     doc("—","Kurumsal düzeltim aksiyon planı (bulguların önceliklendirilmesi)",O.O,"pending") ]},
   { id:"E2", title:"E-2. Şirket Ana Faaliyet Sözleşmeleri", fn:"İCRA", area:"Genel Sözleşme Danışmanlığı", url:F+"10X_JfP3VC6etDvJ8AaVUiT82mfQjy3i4", empty:true,
     flow:["Müvekkil Talep Eder","Juris İnceler / Revize Eder","Müvekkil İmzalar"], docs:[
     doc("—","Bilgion – Macaristan/Slovakya satış yetkilendirme belgesi incelemesi (08.06)",O.J,"done"),
     doc("—","Remote Robotics MoU taslağı – hukuki görüş (07.10)",O.J,"done"),
     doc("—","Grup içi sözleşmeler (Dynamics ↔ Tactics) – 08.10 talebi",O.M,"input"),
     doc("—","Konsorsiyum, iş birliği, acentelik, distribütörlük ve lisans sözleşmeleri – 08.10 talebi",O.M,"input"),
     doc("—","2026 kira sözleşmeleri – Ankara Teknopark teyidi ve diğer kira ilişkileri",O.M,"input"),
     doc("—","Juris sözleşme şablonları (2022–23): teknoloji transferi/lisans/know-how, distribütörlük, eğitim, satış-pazarlama – güncelleme",O.J,"pending",U.tekTransfer),
     doc("27","Sözleşme kayıt, onay ve saklama sistemi (Risk Formu S.37)",O.O,"pending") ]},
   { id:"E3", title:"E-3. İnsan Kaynakları Projesi", fn:"İCRA", area:"Genel Sözleşme Danışmanlığı", url:F+"1P0hJ11rWn95TtUf5Jvp8nhG2VbCqnBbQ", empty:true,
     flow:["Muhasebe & Finans Bildirir","Juris Görüş / İhtar","Dosya Kapanır"], docs:[
     doc("—","Semih Korkmaz – istifa, işten çıkış değerlendirmesi ve iş arabuluculuğu (Nisan 2026)",O.J,"done"),
     doc("—","Personel devamsızlığı – haklı fesih ihtarnamesi örneği (01.06)",O.J,"done"),
     doc("—","Hidayet Atilla – maaş haczi yazısı (Kahramankazan İcra, 23.06)",O.J,"done"),
     doc("—","Ali Baki Erenler – üretim takım lideri, ayrılık süreci (24.07)",O.J,"done"),
     doc("—","Standart iş sözleşmesi örnekleri ve İK politikaları (08.10 talebi)",O.FN,"input"),
     doc("—","Ar-Ge personeli için eser / buluş devri ve gizlilik taahhüdü",O.J,"pending") ]},
   { id:"E4", title:"E-4. NDA Sözleşme Seti", fn:"İCRA", area:"Genel Sözleşme Danışmanlığı", url:F+"157V3KbBfqdV1DFp1PrdGPiYZiQkbh29Y", empty:true,
     flow:["Karşı Taraf NDA Gönderir","Juris İnceler","Müvekkil İmzalar"], docs:[
     doc("—","Kanada İş Birliği NDA – 6. madde eki incelemesi (03.07)",O.J,"done"),
     doc("—","Meteksan Bilgi Değişimi ve Gizlilik Anlaşması (06.08)",O.J,"done"),
     doc("—","Edge Gizlilik Sözleşmesi – revize (07.08)",O.J,"done"),
     doc("—","Yunlu Composites NDA (26.08)",O.J,"done"),
     doc("27","Zyrone standart NDA seti (TR/EN · savunma sanayii gizlilik hükümleri)",O.J,"pending",U.gizlilik),
     doc("27","NDA Kullanım Bilgilendirme Dokümanı",O.J,"pending") ]},
   { id:"E5", title:"E-5. Hukuki Danışmanlık", fn:"İCRA", area:"Uyuşmazlık ve Hukuki Süreç Danışmanlığı", url:F+"1x6HmJD5lpNLTRjzj1NwqYcQLr_GC04lf", empty:true,
     flow:["Dosya / olay bazında sürekli hizmet"], docs:[
     doc("—","Bağımsız denetim avukat yazıları – 2025 BDR (16.06) · 31.03.2026 (08.07) · 16.10 talebi",O.J,"progress",U.avYazi),
     doc("—","DCM hisse devri evraklarının son kontrolü (08.06)",O.J,"done"),
     doc("—","Gerçek faydalanıcı bildirimi – özel usulsüzlük cezası görüşü (24.09 → 06.10)",O.J,"done"),
     doc("—","'Konrul' marka başvurusuna itiraz – karşı görüş (03.08 → Marqby 31.08)",O.MQ,"progress"),
     doc("—","Mali Yapı, Finansman ve Teşvik – ayrı danışmanlık sözleşmesi",O.J,"pending") ]},
   { id:"E6", title:"E-6. KVKK Projesi – Mini", fn:"İCRA", area:"Genel Sözleşme Danışmanlığı", url:F+"1LrPMyAklitJ0cnl3Bn38DMZ6Zfzx5QQh", empty:true,
     flow:["Juris Sorar","Müvekkil Yönetimi Cevaplar","Teslim + Eğitim"], docs:[
     doc("—","Müşteri ve Tedarikçi Aydınlatma Metinleri (Juris, 2022) – güncellik kontrolü",O.J,"review",U.kvkkM),
     doc("—","KVKK politika ve prosedürleri + veri envanteri (08.10 talebi)",O.M,"input"),
     doc("30","Mini KVKK Soru Seti – çalışan, kamu muhatapları, yurt dışı aktarım",O.JM,"pending"),
     doc("31","Mini KVKK Doküman Seti güncellemesi",O.J,"pending") ]},
   { id:"E7", title:"E-7. Uyuşmazlık Takibi", fn:"İCRA", area:"Uyuşmazlık ve Hukuki Süreç Danışmanlığı", url:F+"1jizV0xJaLH1fUlz4qrRMptna2ZmK5Oy3", empty:true,
     flow:["Tespit","Risk Raporu","Müvekkil Kararı","Süreç Takibi"], docs:[
     doc("—","Zyrone – Havelsan tasarım tecavüzü: Uyuşmazlık Tespiti & Olası Riskler raporu (başarı şansı düşük)",O.J,"done",U.havelsan),
     doc("—","Havelsan dava dilekçesi hazır – Temmuz 2025 fuar tespiti için askıda; açma kararı bekleniyor",O.M,"input",U.dava),
     doc("—","EGM ihtarnamesi (20.05.2024) – dosya durumu teyidi",O.J,"review",U.ihtarEGM),
     doc("—","Derdest dava, icra takibi ve idari süreçler listesi (08.10 talebi)",O.M,"input") ]},
 ]},
 { id:"F", title:"F. İletişim", url:U.fF, items:[
   { id:"F1", title:"F-1. Toplantı Tutanakları", fn:"RAPORLAMA", area:"Aylık Yönetim Kurulu Raporlaması", url:U.fF,
     flow:["Gündem","Toplantı","Tutanak + Aksiyon","Teslim / Teslim edilemeyen","Sonraki gündem"], docs:[
     doc("TT","08.04.2026 · Zyrone DD Başlangıç Toplantısı – Gemini notu anlamlı özet üretmedi",O.J,"review"),
     doc("TT","08.09.2026 · Zyrone & Juris – aksiyon listesi 16.09 mail ile iletildi",O.J,"done"),
     doc("TT","13.10.2026 · Zyrone | Kalite Toplantısı (Teknopark eğitimi ile aynı gün) – iptal edildi",O.J,"pending"),
     doc("TT","Yeni tarih: Kalite Toplantısı / YK değerlendirme toplantısı (02.07 ve 25.08'de önerildi)",O.JM,"pending") ]},
   { id:"F2", title:"F-2. Mailler", fn:"RAPORLAMA", area:"Aylık Yönetim Kurulu Raporlaması", url:U.fF, empty:true, noFolder:true,
     flow:["Teslim maili","Talep maili","Hatırlatma","Onay"], docs:[
     doc("M","09.04 · Risk Tespiti Formları (Dynamics + Tactics) → Enes Altıok",O.J,"done",U.form),
     doc("M","24.04 · 21.05 · 02.07 · DD hatırlatmaları",O.J,"done"),
     doc("M","25.08 · DD Süreci Güncel Durum ve Eksikler (Ferhan Yıldızlı → Ayşenur Hanım)",O.J,"done"),
     doc("M","16.09 · 08.09 toplantısı aksiyonları",O.J,"done"),
     doc("M","08.10 · DD ek belge talep listesi (ortaklık · finansman · sözleşme · FM · izin)",O.J,"done"),
     doc("M","Planlı · 08.10 listesi için hatırlatma + Tactics formu + yeni toplantı tarihi",O.J,"pending") ]},
 ]},
];

/* dayanak sayacı: doküman mı beyan mı */
const BASIS_COUNT={doc:["Ç1–Ç2 Hizmet Teklifi (Mart 2026) ve Danışmanlık Sözleşmesi","E-7 Havelsan Uyuşmazlık Tespiti raporu + dava dilekçesi + ihtarnameler","B.3 31.03.2026 bağımsız denetim avukat yazısı","Arşiv: 2022 Şirketler Hukuku Uyumu Durum Tespiti · 2023 Project DCM kapanış dokümanları","E-6 Aydınlatma metinleri (2022)"],beyan:["E-1 Dynamics Risk Tespiti Formu yanıtları (28.04 · Drive'da dolu nüsha yok)","A.1 İş Modeli Kanvası (yazışmalardan derlendi)","A.3 Dynamics–Tactics ilişkisi ve ortaklık yapısı (08.09 · 08.10)","E-2 / E-4 NDA, MoU, yetkilendirme görüşleri (e-posta ekleri)","E-3 İK dosyaları (e-posta)","E-5 Gerçek faydalanıcı · Konrul · DCM hisse devri (e-posta)"],none:["B Finans (bütçe · nakit · bilanço)","C Muhasebe","E-1 Tactics DD (form dahil)","D.1 Kamu / savunma sözleşmeleri","A.4 Pitch Deck","F-1 tutanaklar (08.04 · 13.10)"]};
