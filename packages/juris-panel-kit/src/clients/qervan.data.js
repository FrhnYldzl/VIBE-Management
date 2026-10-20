/* =========================================================
   MÜVEKKİL VERİSİ — qervan
   Kaynak: qervan.html · çıkarım: tools/kit.js extract · 2026-10-18
   Bu dosya build sırasında src/template.html içindeki CLIENT_DATA işaretçisinin yerine gömülür.
   Bloklar: FUNCTIONS, D, doc, O, CLIENT, DATAROOM, BASIS_COUNT, SRC, BMC, LEAN, OKR, RACI, FIN, REVACT, VALPROC, PROJECTS, DD, DD_DONE, CONTRACTS, RISKS, MEETINGS, MAILS, ONBOARD, LEARN, ASSESS_TABS, assessA, assessB, assessC, assessD, assessE, assessF, viewInsights
   ========================================================= */
const FUNCTIONS = {
  PLAN:{k:"1",title:"PLAN",desc:"Şirket stratejisinin analizi ve geliştirilmesi; kurumsal yönetim ve organizasyon yapısının tasarımı."},
  "İCRA":{k:"2",title:"İCRA",desc:"Şirket içi hukuki süreçlerin geliştirilmesi: sözleşme setleri, İK, KVKK ve dosya bazlı danışmanlık."},
  "DENETİM":{k:"3",title:"DENETİM",desc:"Hukuki denetim ve risk analizi: ön inceleme, Data Room kurulumu, due diligence ve risk haritası."},
  RAPORLAMA:{k:"4",title:"RAPORLAMA",desc:"Performans izleme ve raporlama: hedef–KPI/OKR sistemi, yönetim raporlaması, aksiyon ve karar takibi."},
};

const D="https://docs.google.com/document/d/", F="https://drive.google.com/drive/folders/", FL="https://drive.google.com/file/d/";

const doc=(no,t,owner,status,url,ent)=>({no,t,owner,status,url,ent});

const O={J:"Juris",JM:"Juris → Müvekkil Yönetimi",M:"Müvekkil Yönetimi",SM:"Mali Müşavir",SW:"Yazılım Ekibi (EDE TEK)",O:"Ortak"};

/* =========================================================
   MÜVEKKİL VERİSİ — QERVAN – WETRADE GRUP
   Bu dosya build.js ile src/template.html içindeki /*__CLIENT_DATA__*​/ yerine gömülür.
   Yardımcılar (D, F, FL, doc, O) ve FUNCTIONS şablondan gelir.
   ========================================================= */

const CLIENT = {
  id:"qervan-wetrade", startLabel:"Hizmet Planı · Hizmet Başlangıcı sayfası", name:"QERVAN – WETRADE GRUP",
  entities:["Qervan Yazılım Teknoloji A.Ş.","WeTrade Dış Ticaret Ltd. Şti."], short:["Qervan","WeTrade"],
  driveRoot:"https://drive.google.com/drive/folders/1o_mTaK-m94G_dP_iaRal6RKCiTxXWqAg",
  planSheet:"https://docs.google.com/spreadsheets/d/1tZ1NhwTiqgvoMl6mt_eEAYstZlls6zt7yqOTSa8fT8/edit?gid=1679663399#gid=1679663399",
  dataDate:"2026-10-18", kickoff:"15.09.2026", rhythm:[["2 haftada 1","Toplantı"],["Haftada 1","Doküman"],["Haftada 1","Arama"]],
  startDocs:[["1","Juris Avukatlık Ortaklığı Tanıtım Sunumu","15.06.2026"],["2","Şirketler Hukuku ve Kurumsal Yönetim Hizmet Teklifi","15.06.2026"],["3","Şirketler Hukuku ve Kurumsal Yönetim Danışmanlık Sözleşmesi","15.06.2026"],["3.1","EK-1: Mali Yapı, Finansman ve Teşvik Süreçleri Danışmanlığı","15.06.2026"],["4","Kick-off: Hizmet Planı ve Doküman Haritası Sunumu","15.09.2026"]],
  scopeIn:["Şirket Stratejisinin Analizi ve Geliştirilmesi","Hukuki Denetim ve Risk Analizi","Şirket İçi Hukuki Süreçlerin Geliştirilmesi","Kurumsal Yönetim ve Organizasyon Yapısının Geliştirilmesi","Uyuşmazlık ve Hukuki Süreç Danışmanlığı"],
  scopeOut:["İdari, ceza ve vergi davaları","Uluslararası tahkim","Birleşme ve devralma, yatırım süreçleri","Ruhsat, lisans, izin ve sertifika","Halka arz ve sermaye piyasası","FM başvuruları, itirazlar ve KVKK uyum projeleri (Mini KVKK hariç)","Proje finansmanı","Mali yapı, finansman ve teşvik danışmanlığı (EK-1 ile ayrıca)"],
  contacts:{ "Müvekkil Yönetimi":"Caner Aslan", "Mali Müşavir":"SMMM Özgür Demir", "Yazılım Ekibi":"EDE TEK", "Juris":"Gülşah Algın · İlayda · Melisa" },
};

const DATAROOM = [
 { id:"A", title:"A. Strateji ve Business", url:F+"17CZJxATdt9x7CAIvJPb0ojZAG3bvynA-", items:[
   { id:"A1", title:"A.1. İş Modeli", fn:"PLAN", area:"Şirket Stratejisinin Analizi ve Geliştirilmesi", url:F+"1HLA8Psey3wFOAXn-EAYYtg3-1mC8kMJj", guide:["A.1.1","İş Modeli Nedir ve Neden Analiz Edilir? – Bilgi Notu",FL+"1slGOR663IjlQfsOG-70kFqozHJULGMJS/view"],
     flow:["Juris İletir","Müvekkil Yönetimi Yanıtlar","Birlikte Onaylanır"], docs:[
     doc("A.1.1","İş Modeli Nedir ve Neden Analiz Edilir? – Bilgi Notu",O.J,"done",FL+"1slGOR663IjlQfsOG-70kFqozHJULGMJS/view"),
     doc("A.1.2","İş Modeli Soru Seti – Toplantı Formu",O.JM,"done",D+"1y4Nc0t_IRKFRzj10_TktTfTzv_vM8u5dF4s4g__aZ88/edit","Qervan"),
     doc("A.1.2","İş Modeli Soru Seti – Toplantı Formu",O.JM,"done",D+"1OgeOuhE_TasqcUQa8MXxJhvYB94zpeypAbyNDJ52A-4/edit","WeTrade"),
     doc("A.1.2","Cevaplanmış Soru Seti",O.M,"done",D+"1t3tQIMTxTIUHynHvqFNMrPasXKi3Qxc2dggSSDUAqME/edit","Qervan"),
     doc("A.1.2","Cevaplanmış Soru Seti",O.M,"done",D+"1qI-MGgZ33l3oTNz1WIc3eEkAaAzJErsGzRaeL2tRjg8/edit","WeTrade"),
     doc("A.1.3","İş Modeli Dokümanı – Çıktı",O.O,"review",D+"1qG-_pwn8gAIvry1sMW1qsE0F3RMsuR-Fqp70FH458y0/edit","Qervan"),
     doc("A.1.3","İş Modeli Dokümanı – Çıktı",O.O,"review",D+"1qKYu_FftcAmHVeRLaSDyPoOfhpjmMicUnX3j4RK5MhQ/edit","WeTrade"),
     doc("A.1.3","İş Modeli Sunumu (PDF)",O.J,"done",FL+"1g4InhGzjelkrJ31UoWi-3zfnL7Yv_BUr/view","Qervan"),
     doc("A.1.3","İş Modeli Sunumu (PDF)",O.J,"done",FL+"1IfAcV_7PzNRaPmwed2uKg9fy6Ip73DGP/view","WeTrade"),
     doc("A.1.3","WeTrade → Qervan İş Modeli Etkisi",O.J,"review",D+"1sbxkovpfhsTEbaEDy0GbrIk53TTvub4J6pMTpNOfsLI/edit","Grup"),
     doc("A.1.3","Qervan – WeTrade İlişkisine İlişkin İş Modeli (PDF)",O.J,"review",FL+"1PyXoDFd4Xz852ui3tfefTxjd9ocjHqFs/view","Grup") ]},
   { id:"A2", title:"A.2. İş Planı", fn:"PLAN", area:"Şirket Stratejisinin Analizi ve Geliştirilmesi", url:F+"19J43BRcsU2quPpqsKvPlU9BZ6Pe-u91S", empty:true, guide:["A.2.1","İş Planı Nedir ve Neden Analiz Edilir? – Bilgi Notu"],
     flow:["Juris İletir","Müvekkil Yönetimi + Mali Müşavir Yanıtlar","Birlikte Onaylanır"], docs:[
     doc("A.2.1","İş Planı Nedir ve Neden Analiz Edilir? – Bilgi Notu",O.J,"pending"),
     doc("A.2.2","İş Planı Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("A.2.3","İş Planı Dokümanı (Bütçe · Satış · Pazarlama · Operasyon/Üretim · İş Geliştirme) + OKR seti",O.O,"pending") ]},
   { id:"A3", title:"A.3. Yönetişim", fn:"PLAN", area:"Kurumsal Yönetim ve Organizasyon Yapısının Geliştirilmesi", url:F+"1wC40wchyL4sGM9KCtJ8J2Y5yaBWdcKbR", guide:["32","Kurumsal Yönetim ve Organizasyon Yapısı – Bilgi Notu"],
     subfolders:[["1. Yönetim ve Karar Alma Yapısı",F+"1POktWXr1o2G_t6W6Qg7dM0bTW8iXsudo",true],["2. Organizasyon Şeması",F+"1yQMc0dnfEe_DW5F8ZMwNo_tS-SR8erjZ",true],["3. Operasyon Yetki Görev Takip ve Sorumluluk",F+"19jXjRQM6AD0b3zXBbsh7ttkD3l88ak8n",true]],
     flow:["Juris İletir","Müvekkil Yönetimi Yanıtlar","Birlikte Onaylanır"], docs:[
     doc("32","Kurumsal Yönetim ve Organizasyon Yapısı – Bilgi Notu",O.J,"pending"),
     doc("32","Kurumsal Yönetim ve Organizasyon Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("36","Yönetim ve Karar Mekanizmaları Dokümanı",O.O,"pending"),
     doc("37","İcra Yönergesi",O.J,"pending"),
     doc("38","Yönetim Kurulu İç Yönergesi / Çalışma Esasları",O.J,"pending"),
     doc("33","Organizasyon Şeması – Çıktı",O.O,"pending"),
     doc("34","Görev, Yetki ve Sorumluluk Matrisi",O.O,"pending"),
     doc("35","Yetki ve Onay Matrisi",O.O,"pending"),
     doc("39","Yönetim Toplantıları ve Karar Takip Sistemi",O.J,"pending") ]},
   { id:"A4", title:"A.4. Yatırımcı Sunumu", fn:"PLAN", area:"Şirket Stratejisinin Analizi ve Geliştirilmesi", url:F+"1ey-HbDFfX_4OsIDE6dvzD4OlY0MZy6Db", empty:true, guide:["A.4.1","Yatırım Öncesi Düşünme Rehberi"],
     flow:["Juris İletir","Müvekkil Yönetimi Yanıtlar","Birlikte Onaylanır"], docs:[
     doc("A.4.1","Yatırım Öncesi Düşünme Rehberi",O.J,"pending"), doc("A.4.2","Yatırımcı Sunumu (Pitch Deck) Bilgi Notu",O.J,"pending"), doc("A.4.3","Pitch Deck (.pptx)",O.O,"pending") ]},
   { id:"A5", title:"A.5. Performans İzleme ve Raporlama", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", noFolder:true, guide:["10","Performans İzleme ve KPI Sistemi – Bilgi Notu"],
     flow:["Juris İletir","Müvekkil Yönetimi Yanıtlar","Birlikte Onaylanır"], docs:[
     doc("10","Performans İzleme ve KPI Sistemi – Bilgi Notu",O.J,"pending"), doc("11","Performans ve Raporlama Soru Seti – Toplantı Formu",O.JM,"pending"), doc("12","Hedefler ve KPI/OKR Matrisi – Çıktı",O.O,"pending"),
     doc("13","Yönetim Raporlama Sistemi – Kılavuz",O.J,"pending"), doc("14","Yönetici Özeti ve Performans Scorecard – Şablon",O.J,"pending"), doc("15","Yönetim Aksiyon ve Karar Takip Tablosu",O.O,"pending") ]},
 ]},
 { id:"B", title:"B. Finans", url:F+"14BTztabU1KYfFrmbCyTSxlR-UtpmRm52", items:[
   { id:"B1", title:"B.1. Bütçe", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:F+"1pP83EYBmF9wLu_ZqqwGMIFwbNkmIomJY", empty:true, flow:["Juris Yönerge Verir","Müvekkil Yönetimi + Mali Müşavir Yükler"], docs:[
     doc("DR","2026 Bütçe ve 2027 Bütçe Taslağı",O.M,"input",null,"Qervan"), doc("DR","2026 Bütçe ve 2027 Bütçe Taslağı",O.M,"input",null,"WeTrade") ]},
   { id:"B2", title:"B.2. Nakit Akışı", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:F+"1mJJ37ptB9VFPfn8VGBfyeRu5VQZ4l8zU", empty:true, flow:["Juris Yönerge Verir","Mali Müşavir Yükler"], docs:[
     doc("DR","Aylık Nakit Akış Tablosu (son 12 ay)",O.SM,"input",null,"Qervan"), doc("DR","Aylık Nakit Akış Tablosu (son 12 ay)",O.SM,"input",null,"WeTrade") ]},
   { id:"B3", title:"B.3. Bilanço", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"1q-dM7dPqa9AjZqalCb82UBQP6t3UA0Ex", empty:true, flow:["Juris Yönerge Verir","Mali Müşavir Yükler"], docs:[
     doc("DR","2023–2024–2025 Bilanço ve Gelir Tablosu (yıllara sari)",O.SM,"input",null,"WeTrade"), doc("DR","Kuruluş bilançosu ve 2026 ara dönem",O.SM,"input",null,"Qervan") ]},
 ]},
 { id:"C", title:"C. Muhasebe", url:F+"1n7s-fPG2Pf_gAhZ0zQBzuQMyET6phufc", items:[
   { id:"C1", title:"C.1. Hesap Planı", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"16en3FThIzIu02ZWmL589fFjAV_QYl5z1", empty:true, flow:["Mali Müşavir Yükler","Juris İnceler"], docs:[
     doc("DR","Tek düzen hesap planı",O.SM,"input",null,"Qervan"), doc("DR","Tek düzen hesap planı",O.SM,"input",null,"WeTrade") ]},
   { id:"C2", title:"C.2. Mizan", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"1dvVvst-5ByiK2b2xpv8sy1mIQBK-sC-h", empty:true, flow:["Mali Müşavir Yükler","Juris İnceler"], docs:[
     doc("DR","31.12.2023 mizanı (SMMM raporuna esas) + güncel mizan",O.SM,"input",null,"WeTrade"), doc("DR","Güncel mizan",O.SM,"input",null,"Qervan") ]},
 ]},
 { id:"D", title:"D. Operasyonlar", url:F+"1izQ8y6MOkc7syAuDwnrlOkmXHiM__-OC", items:[
   { id:"D1", title:"D.1. Ana Faaliyetler", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1DimI0D10MFOh6B8k3Ia4TFxJAFRZRTNf", empty:true, flow:["Müvekkil Yönetimi Yükler","Juris İnceler"], docs:[
     doc("DR","Gelir getiren iş türleri bazında ciro kırılımı (ithalat/transit/ihracat/komisyon) – son 2 yıl",O.M,"input",null,"WeTrade"),
     doc("DR","Platform modül listesi ve hizmet kataloğu (whitepaper)",O.SW,"input",null,"Qervan"),
     doc("DR","Mevcut proforma / sipariş teyidi / tedarikçi sözleşme örnekleri",O.M,"input",null,"WeTrade") ]},
   { id:"D2", title:"D.2. Projeler", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1q88AuOAMO4RKXmzX7LUQrzNelUx8NtmU", empty:true, flow:["Müvekkil Yönetimi Yükler","Juris İnceler"], docs:[
     doc("DR","Proje listesi: aşama, kaynak, bütçe, beklenen getiri",O.M,"input"), doc("DR","Teknopark Ar-Ge proje onay belgeleri",O.M,"input",null,"Qervan") ]},
 ]},
 { id:"E", title:"E. Hukuk", url:F+"1GlUdnZ0JWy5KFYqRNnqWKBuwVzfXT1WM", items:[
   { id:"E1", title:"E-1. Hukuki Durum Tespiti ve Risk Analizi", fn:"DENETİM", area:"Hukuki Denetim ve Risk Analizi", url:F+"173Xous8YGS6DNCYfKb0iY7sFmjt8thhm", guide:["DD","Due Diligence Asgari İnceleme Kılavuzu (A.Ş. / Ltd.)"],
     subfolders:[["Hukuk Data Room | Qervan · 9 DD klasörü",F+"1i_ttftMjUIAY0YxqQQwtZYjv4ZAK9pfq",false],["Hukuk Data Room | Wetrade · 9 DD klasörü",F+"1I2FnHRvCxao9bIie9lrDouPOI4cs0NNg",true]],
     flow:["Juris Sorar","Müvekkil Yönetimi Cevaplar","Mali Müşavir + Yönetim Yükler","Juris Oluşturur","Birlikte Değerlendirilir"], docs:[
     doc("16","Hukuki Bilgilendirme ve Risk Tespiti Formu (A.Ş.) – 76 soru, cevaplar bekleniyor",O.JM,"review",D+"1kEMFD5fOCzJ_0dUA6AvCm59WOlhcIUqhsae4ZWmNH2U/edit","Qervan"),
     doc("16","Hukuki Bilgilendirme ve Risk Tespiti Formu (Ltd.) – 76 soru, cevaplar bekleniyor",O.JM,"review",D+"1JuRT5CTWD8rBdxgTe4yfgVJtuv1TLmzMivsx_XDxC40/edit","WeTrade"),
     doc("DR","DD Kapsamında Talep Edilen Belgeler",O.JM,"done",D+"1cZsMPH9sEIO_MXoSLwPhHJgs4YnYL5WR45vXGnVxVxw/edit","Qervan"),
     doc("DR","DD Kapsamında Talep Edilen Belgeler",O.JM,"done",D+"1J-MX5XY9FoPZTsuZjNi2_iGo_ISkxx54EpdDcKQbJ-c/edit","WeTrade"),
     doc("DR","Data Room belge yüklemesi (1/33 – Yazılım Geliştirme Sözleşmesi)",O.M+" / "+O.SM,"input",F+"1i_ttftMjUIAY0YxqQQwtZYjv4ZAK9pfq","Qervan"),
     doc("DR","Data Room belge yüklemesi (0/32)",O.M+" / "+O.SM,"input",F+"1I2FnHRvCxao9bIie9lrDouPOI4cs0NNg","WeTrade"),
     doc("DR","Data Room Sisteminin Kurulması (A–F + 9'ar DD klasörü)",O.J,"done",F+"1o_mTaK-m94G_dP_iaRal6RKCiTxXWqAg"),
     doc("DR","Data Room Veri Yükleme Yönergesi",O.J,"pending"),
     doc("DD","Due Diligence Asgari İnceleme – A.Ş. Kılavuzu",O.J,"pending",null,"Qervan"),
     doc("DD","Due Diligence Asgari İnceleme – Ltd. Şti. Kılavuzu",O.J,"pending",null,"WeTrade"),
     doc("21","Hukuki Risk Envanteri ve Risk Haritası",O.J,"progress"),
     doc("22","Hukuki Denetim ve Risk Analizi Raporu (hedef 46–47. hafta)",O.J,"pending"),
     doc("23","Hukuki Risk Aksiyon Planı",O.O,"pending") ]},
   { id:"E2", title:"E-2. Şirket Ana Faaliyet Sözleşmeleri", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1dUR3UD0hAhfTsTaUIDQDaOo2W6JWsJYP", empty:true,
     flow:["Juris Sorar","Müvekkil Yönetimi Cevaplar","Yazılım Ekibi whitepaper iletir","Birlikte Onaylanır"], docs:[
     doc("24","Şirket Ana Faaliyet Sözleşmeleri Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("—","Platform iş akışları / whitepaper (sözleşmelere girdi)",O.SW,"input"),
     doc("25","Şirket Ana Faaliyet Sözleşme Seti – Çıktı (9 sözleşme)",O.J,"pending") ]},
   { id:"E3", title:"E-3. İnsan Kaynakları Projesi", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"19FKnxZP2YhkAy9k2nMC_JJBp57vFGuqE",
     subfolders:[["1-İşe Alım",F+"1Wflfv0Fu022DW2p22CcJyWwG_J0szsHv",false],["2-Fazla Çalışma",F+"1OKxZU0DC08yRiUSqTGmL_cyITtCFNwML",false],["3-İzin Dokümanları",F+"1KEO974jLNIxygWXMXhhoChKL-KSjD025",false],["4-Savunma ve Diğer",F+"1WswKOciCz8y0F0HzCg18N0Gn9j912IIy",false]],
     flow:["Juris Sorar","Müvekkil Yönetimi Cevaplar","Birlikte Onaylanır"], docs:[
     doc("28","İnsan Kaynakları Soru Seti – Toplantı Formu",O.JM,"done",D+"1c9mnW0_ZAdqYmeYmK8d3pkoUeS3s0OjgmnqYeaIACdI/edit","Qervan"),
     doc("28","İnsan Kaynakları Soru Seti – Toplantı Formu",O.JM,"done",D+"1GiLiyq8Bdw6KENcShjKN833LrTlGzCwofmvNrlsKHRA/edit","WeTrade"),
     doc("29","İK Doküman Seti – İşe Alım (7 doküman)",O.J,"review",F+"1Wflfv0Fu022DW2p22CcJyWwG_J0szsHv"),
     doc("29","İK Doküman Seti – Fazla Çalışma (1)",O.J,"review",F+"1OKxZU0DC08yRiUSqTGmL_cyITtCFNwML"),
     doc("29","İK Doküman Seti – İzin (5 form)",O.J,"review",F+"1KEO974jLNIxygWXMXhhoChKL-KSjD025"),
     doc("29","İK Doküman Seti – Savunma ve Diğer (5)",O.J,"review",F+"1WswKOciCz8y0F0HzCg18N0Gn9j912IIy") ]},
   { id:"E4", title:"E-4. NDA Sözleşme Seti", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1r-alFuXF5Q2kVKy9yJNBjHcAm7Bc3UFU",
     flow:["Juris Hazırlar","Müvekkil Yönetimi Onaylar","Kullanım bilgilendirmesi"], docs:[
     doc("26","NDA ve Gizlilik Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("27","Karşılıklı Gizlilik Sözleşmesi (TR)",O.J,"done",FL+"1uaEiQrIzdxjIVJH3x4wrxgvqgcjWZlEq/view","WeTrade"),
     doc("27","Tek Taraflı Gizlilik Sözleşmesi (TR)",O.J,"done",FL+"1NAazC9QpDECtsMnITLU3tfAb9-1egw9K/view","WeTrade"),
     doc("27","Mutual Non-Disclosure Agreement (EN)",O.J,"done",FL+"14E_z0SPqbRB5WLqOE7I0G_43ZXXat5l5/view","WeTrade"),
     doc("27","Unilateral Non-Disclosure Agreement (EN)",O.J,"done",FL+"1bDCU-QrrG3xbWia6QcqjcaL2GyTZ0CGN/view","WeTrade"),
     doc("27","Platform NDA seti (tek taraflı + karşılıklı, TR/EN)",O.J,"pending",null,"Qervan"),
     doc("27","Kullanım Bilgilendirme Dokümanı",O.J,"pending") ]},
   { id:"E5", title:"E-5. Hukuki Danışmanlık", fn:"İCRA", area:"Uyuşmazlık ve Hukuki Süreç Danışmanlığı", url:F+"1MyuSsjPfvtr0gXSWR_4hb_banR67klQS",
     flow:["Dosya / olay bazında sürekli hizmet"], docs:[
     doc("—","İstifa Dilekçesinde Dikkat Edilmesi Gerekenler – Bilgi Notu",O.J,"done",D+"1Go3IKn-sUF37C-g_8sYRz4OGF5eqSMYa0rZ98dz1rRk/edit"),
     doc("—","İstifa Dilekçesi Örneği",O.J,"done",D+"1BAEyfbQb87U-_UQrrjcUzxlzTUsRZABzV6p9h-bRML8/edit"),
     doc("—","Qervan – EDE TEK Yazılım Geliştirme Sözleşmesi (12.08.2026)",O.J,"done",FL+"1YjFe_zG1SCrWD6AlxnH0SB3HGgC0kkKj/view","Qervan"),
     doc("—","Qervan – EDE TEK Yazılım Bakım Sözleşmesi (12.08.2026)",O.J,"done",FL+"1-vpC22Lh1LZhX_sxXH3H-LuKbsQE0HTg/view","Qervan") ]},
   { id:"E6", title:"E-6. KVKK Projesi – Mini", fn:"İCRA", area:"Şirket İçi Hukuki Süreçlerin Geliştirilmesi", url:F+"1f9lfYWxXYP7IEoPVJnkRtCJ5dQC2-pFG", empty:true,
     flow:["Mali Müşavir bilanço toplamı iletir","Juris Sorar","Müvekkil Yönetimi Cevaplar","Teslim + Eğitim (51. hafta)"], docs:[
     doc("—","2025 yıl sonu bilanço toplamı (VERBİS eşiği)",O.SM,"input"),
     doc("30","Mini KVKK Soru Seti – Toplantı Formu",O.JM,"pending"),
     doc("31","Mini KVKK Doküman Seti – Çıktı",O.J,"pending") ]},
   { id:"E7", title:"E-7. Uyuşmazlık Takibi", fn:"İCRA", area:"Uyuşmazlık ve Hukuki Süreç Danışmanlığı", noFolder:true,
     flow:["Dosya / olay bazında yürütülen sürekli hizmet"], docs:[
     doc("—","Uyuşmazlık ve ihtilaf kaydı (açık dosya yok – Risk Formu 69–76 cevapları bekleniyor)",O.JM,"input"),
     doc("—","Hukuki görüş / süreç takip notu (dosya bazında)",O.J,"pending") ]},
 ]},
 { id:"F", title:"F. İletişim", url:F+"19zlhJUA5XYIBUgWmQe4Mpy-474ngz7OB", items:[
   { id:"F1", title:"F.1. Toplantılar", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", url:F+"19zlhJUA5XYIBUgWmQe4Mpy-474ngz7OB",
     flow:["Gündem","Toplantı","Tutanak + Aksiyon","Teslim / Teslim edilemeyen","Sonraki gündem"], docs:[
     doc("TT","Qervan & WeTrade – Juris Toplantısı · 17.09.2026",O.J,"done",D+"1UlBIDmzO8fXcj6VMe5_3YljY7w5rtRu7khpJAdFt3nc/edit"),
     doc("TT","DD Toplantısı · 25.09.2026 (tutanak Drive'da yok)",O.J,"pending"),
     doc("TT","Toplantı · 01.10.2026 (2 haftalık ritim – tutanak yok)",O.J,"pending"),
     doc("TT","Toplantı · 15.10.2026 (2 haftalık ritim – tutanak yok)",O.J,"pending") ]},
   { id:"F2", title:"F.2. Mailler", fn:"RAPORLAMA", area:"Performans İzleme ve Raporlama Süreçlerinin Geliştirilmesi", noFolder:true,
     flow:["Teslim maili","Talep maili","Hatırlatma","Onay"], docs:[
     doc("M","30.09.2026 – WeTrade NDA seti teslimi (4 dosya)",O.J,"done",F+"1r-alFuXF5Q2kVKy9yJNBjHcAm7Bc3UFU","WeTrade"),
     doc("M","01.10.2026 – DD belge talep listeleri iletildi",O.J,"done",D+"1cZsMPH9sEIO_MXoSLwPhHJgs4YnYL5WR45vXGnVxVxw/edit"),
     doc("M","Hatırlatma – whitepaper ve 2025 bilanço toplamı (17.09 aksiyonları)",O.J,"pending"),
     doc("M","Hatırlatma – Data Room yüklemesi (1/65)",O.J,"pending") ]},
 ]},
];

const BASIS_COUNT={doc:["A.1 İş Modeli (2 şirket + grup)","E-1 Risk Tespiti Formları","E-1 DD Belge Listeleri","E-3 İK Doküman Seti","E-4 WeTrade NDA Seti","E-5 Yazılım Sözleşmeleri","F.1 Tutanak 17.09"],beyan:["B Finans (ciro, kârlılık)","C Muhasebe","D.1 Ana Faaliyetler (gelir dağılımı)","A.3 Yönetişim (sicil + beyan)"],none:["A.2 İş Planı","A.4 Yatırımcı Sunumu","E-2 Sözleşme Seti","E-6 KVKK","A.5 Performans/OKR"]};

const SRC={ bm:{t:"6. İş Modeli Dokümanı · 21.09.2026",u:D+"1qG-_pwn8gAIvry1sMW1qsE0F3RMsuR-Fqp70FH458y0/edit",k:"doc"}, bmw:{t:"8. WeTrade İş Modeli Dokümanı · 21.09.2026",u:D+"1qKYu_FftcAmHVeRLaSDyPoOfhpjmMicUnX3j4RK5MhQ/edit",k:"doc"}, etki:{t:"10. WeTrade–Qervan İş Modeli Etkisi · 21.09.2026",u:D+"1sbxkovpfhsTEbaEDy0GbrIk53TTvub4J6pMTpNOfsLI/edit",k:"doc"}, rfq:{t:"Risk Tespiti Formu – Qervan · 01.10.2026",u:D+"1kEMFD5fOCzJ_0dUA6AvCm59WOlhcIUqhsae4ZWmNH2U/edit",k:"doc"}, rfw:{t:"Risk Tespiti Formu – WeTrade · 01.10.2026",u:D+"1JuRT5CTWD8rBdxgTe4yfgVJtuv1TLmzMivsx_XDxC40/edit",k:"doc"}, ddq:{t:"DD Talep Listesi – Qervan · 01.10.2026",u:D+"1cZsMPH9sEIO_MXoSLwPhHJgs4YnYL5WR45vXGnVxVxw/edit",k:"doc"}, ddw:{t:"DD Talep Listesi – WeTrade · 01.10.2026",u:D+"1J-MX5XY9FoPZTsuZjNi2_iGo_ISkxx54EpdDcKQbJ-c/edit",k:"doc"}, tt:{t:"Tutanak · 17.09.2026",u:D+"1UlBIDmzO8fXcj6VMe5_3YljY7w5rtRu7khpJAdFt3nc/edit",k:"doc"}, beyan:{t:"Soru seti / toplantı beyanı – belge bekleniyor",k:"beyan"}, none:{t:"Henüz doküman yok – iskelet",k:"none"} };

const BMC={
 Qervan:{kp:["<b>WeTrade</b> – ilk müşteri","<b>EDE TEK</b> – geliştirme ve bakım (12.08.2026)","Bulut altyapı sağlayıcıları","Lisanslı ödeme kuruluşları (2027)","Lojistik / finansman / veri entegrasyonları","Hukuk ve mali danışmanlar"],
  ka:["Yazılım geliştirme ve Ar-Ge (Teknopark)","Platform işletimi; fiyat/navlun/vergi verisi güncelleme","Teklif–proforma–sipariş modüllerinin işletimi","Bilgi güvenliği, KVKK/GDPR","Kurumsal müşteri kazanımı ve destek","<b>Mal alım-satımı yok</b>"],
  kr:["Platform yazılımı, kaynak kod, FM hakları (<b>devir teyidi</b>)","546 SKU × 10 menşe fiyat matrisi","Qervan markası (TÜRKPATENT)","Caner Aslan know-how","Teknik ekip, bulut, Teknopark"],
  vp:["Uluslararası ticaret operasyonunun <b>tek dijital platformdan</b> yönetimi","Price Live · Product Catalog · Market Live · Logistic","Sipariş Sihirbazı · Proforma · My Order · CRM","Fiyatı hesaplar, <b>satış taahhüdü vermez</b>","Yol haritası: Kasım 2026 lansman · 2027 ödeme/navlun API · Clara AI · 2028 yeni ürün grupları"],
  cr:["Sözleşmeye dayalı kurumsal üyelik","Self-servis + teknik destek / hesap yönetimi","Büyük müşteriye özel temsilci","36 ay / 810 EUR CAC / 84.500 EUR LTV varsayımları <b>yeniden hesaplanacak</b>"],
  ch:["Web tabanlı SaaS","Doğrudan kurumsal satış","WeTrade iş ağı (referans)","Dijital pazarlama 3.000–5.000 USD/ay","Fuarlar, referans ağı"],
  cs:["Uluslararası ticaret şirketleri","Bağımsız traderlar","İthalatçı / ihracatçı şirketler","Ticari aracılar","Çok ülkeli ticaret organizasyonları","İlk uzmanlık <b>mimari cam</b>; ABD, Balkanlar, Avrupa → Körfez, K. Afrika, G. Amerika"],
  co:["Geliştirme ve Ar-Ge · teknik personel · bulut ve lisanslar","Bakım ve güvenlik · Teknopark kira/aidat","Pazarlama · destek · hukuk/mali danışmanlık","İki aşamada 8 kişilik ekip; öz sermaye + destekler + pre-seed"],
  rs:["Kurumsal abonelik (tekrarlayan)","Kullanıcı bedeli · işlem bazlı hizmet bedeli","Modül/lisans · kurulum/entegrasyon · veri ve raporlama","Referans: Explorer ücretsiz · Intelligence 149 EUR · Partner 499 EUR/ay","<b>%85 ticaret / %15 üyelik ayrımı geçersiz</b>"]},
 WeTrade:{kp:["Cam üreticileri – 7 ülke (Çin, Mısır, TR, Malezya, Fransa, BAE, HK)","Hammadde ve endüstriyel ürün tedarikçileri","Forwarder, lojistik, gümrük müşavirleri","Bankalar / ödeme kuruluşları","<b>Qervan</b> – dijital platform","Hukuk ve mali müşavirlik"],
  ka:["Pazar geliştirme, müşteri edinimi, tedarikçi araştırması","Fiyatlandırma (maliyet + hedef marj), müzakere","Sipariş, satın alma, ödeme koordinasyonu","Dış ticaret operasyonu, lojistik, satış sonrası","Varlık-hafif: üretim/depo/stok yok","<b>Yazılı prosedür yok</b>"],
  kr:["Caner Aslan ~15 yıl deneyim (<b>cironun ~%70'i</b>)","3 kişilik satış-pazarlama ekibi (~%30)","17 ülkede müşteri, 7 ülkede tedarik","Ticari know-how, üretici ilişkileri","Qervan platformu"],
  vp:["Çok ülkeli tedariki müşteri yerine üstlenen <b>dış kaynaklı tedarik fonksiyonu</b>","Rekabetçi fiyat, üreticiye erişim, aynı gün teklif","Tedarikten teslimata uçtan uca operasyon","Emtia ürün → farklılaşma hız, ağ, fiyatlama deneyimi"],
  cr:["Doğrudan, birebir (e-posta, telefon, WhatsApp, WeChat)","Proforma + sipariş onayı; <b>çerçeve sözleşme yok</b>","CRM yok → Qervan","Düzenli müşteri kaybı yok (beyan)"],
  ch:["%100 doğrudan satış","İthalat %40 · Transit %40 · İhracat %20","Transit ve ihracat öncelikli","Qervan dijital kanal","ABD başta yeni pazarlar"],
  cs:["Cam toptancı / distribütör (Gaviota vb.)","Cam işleme tesisleri","Mimari proje yüklenicileri","Cam sistemleri, mobilya/ayna üreticileri","Tamamlayıcı: cam fabrikaları (2 fabrika)","Fırsat bazlı: alüminyum, carbon black, kauçuk"],
  co:["Mal alımları (en büyük) · navlun/lojistik · sigorta","Personel · dijital pazarlama · Qervan bedeli","Hukuk, mali müşavirlik, genel yönetim","Ağırlıklı değişken; sabit yük sınırlı"],
  rs:["Mal satışı (~%95+) · aracılık komisyonu","Ciro <b>100–130 mn TL</b> · kârlılık <b>~%7</b> (brüt/net teyit)","Tahsilat %30 onay + %70 yükleme · USD/EUR","Kredi yok, vade yok (beyan)","Qervan platform geliri <b>WeTrade'e ait değil</b>"]}};

const LEAN={
 Qervan:{pr:["Operasyonlar kopuk manuel süreçlerle","Çok ülkeli fiyat/navlun/vergi karşılaştırması zor","Belge ve sevkiyat takibi dağınık","<b>Alternatifler:</b> e-posta/WhatsApp, Excel, ayrı CRM"],so:["Price Live + Logistic: teslim maliyeti","Sipariş Sihirbazı + Proforma + My Order","CRM ve entegrasyon altyapısı"],km:["Aktif / ücretli kurumsal müşteri","MRR, ARPA","Müşteri kaybı, CAC","İşlem adedi ve hacmi (2027: 300 konteyner/ay)","Kullanılabilirlik"],vp:["Uluslararası ticareti <b>tek platformdan</b> yönet","Ticaret şirketleri için işletim sistemi"],ua:["Gerçek işlemlerden beslenen veri","WeTrade canlı operasyonu üzerinden geliştirme","Kurucu know-how'ı"],ch:["Doğrudan kurumsal satış","WeTrade referansı","Dijital pazarlama, fuarlar"],cs:["Bağımsız traderlar ve ticaret şirketleri","<b>Early adopter:</b> WeTrade"],co:["Ar-Ge · ekip · bulut · Teknopark · pazarlama"],rs:["Abonelik + işlem + modül + entegrasyon + veri"]},
 WeTrade:{pr:["Orta ölçekli alıcılar çok ülkeli satın alma kuramıyor","Üreticiye erişim ve rekabetçi fiyat zor","Belge, lojistik, ödeme yükü","<b>Alternatifler:</b> üretici, yerel distribütör, diğer traderlar"],so:["Tedarikten teslimata dış kaynak","Aynı gün teklif, çok ülkeli karşılaştırma","Qervan dijital takip"],km:["Hasılat, brüt marj, işlem başına kâr","Müşteri sayısı, tekrar sipariş","İthalat/transit/ihracat kırılımı","Tahsilat süresi, tedarikçi ödeme"],vp:["<b>Çok ülkeli tedarikçi ağına tek temas noktasından</b> rekabetçi, hızlı, teslimata kadar yönetilen erişim"],ua:["7 ülke tedarik + 17 ülke müşteri","~15 yıllık ilişkiler","Sistematik müşteri geliştirme"],ch:["Doğrudan satış, veri temelli hedefleme","Qervan dijital kanal"],cs:["Cam toptancı, işlemeci, proje, cam sistemleri, mobilya/ayna","Tamamlayıcı: cam fabrikaları; fırsat: endüstriyel"],co:["Mal · navlun · sigorta · personel · Qervan"],rs:["Mal satışı ~%95 · komisyon · maliyet + marj"]}};

const OKR={
 Qervan:[{t:"Bütçe",o:"2027 bütçesi WeTrade'den ayrıştırılmış, platform gelirine dayalı",kr:[["2027 bütçe onayı (YK)","Ara 2026",0],["Aylık gider / nakit takibi","12/12 ay",0],["Pre-seed finansman kapanışı","Q2 2027",0]]},{t:"Satış Planı",o:"Tek müşteri bağımlılığından çok müşterili platforma",kr:[["Ücretli kurumsal müşteri","≥ 5 (WeTrade hariç)",0],["MRR","hedef belirlenecek",0],["WeTrade platform hizmet sözleşmesi imzası","Q4 2026",0]]},{t:"Pazarlama Planı",o:"Trader segmentinde bilinirlik",kr:[["Nitelikli demo / lead","≥ 30 / çeyrek",0],["Dijital pazarlama bütçesi kullanımı","3–5k USD/ay",0],["Fuar / sektörel organizasyon","≥ 2",0]]},{t:"Operasyon ve Üretim",o:"Kasım 2026 lansmanı ve işletim sürekliliği",kr:[["Platform lansmanı","Kasım 2026",30],["Kullanılabilirlik (SLA)","≥ %99",0],["Ödeme ve navlun API entegrasyonu","2027",0],["Kaynak kod / FM devrinin tamamlanması","Q4 2026",20]]},{t:"İş Geliştirme",o:"Ekosistem ortaklıkları",kr:[["WorldFirst / ödeme kuruluşu anlaşması","görüşme planlı",10],["Asset Lojistik entegrasyonu","görüşme planlı",10],["Alibaba iş birliği değerlendirmesi","görüşme planlı",0]]}],
 WeTrade:[{t:"Bütçe",o:"Kârlılığı yüksek işlere kaydırılmış 2027 bütçesi",kr:[["2027 ciro hedefi","belirlenecek (taban 100–130 mn TL)",0],["Faaliyet kârı","> %7",0],["Qervan platform bedeli bütçelenmesi","Ara 2026",0]]},{t:"Satış Planı",o:"Transit ve ihracat payını büyütmek",kr:[["Transit + ihracat payı","%60 → %70",0],["Kurucu dışı satış payı","%30 → %45",0],["Yeni müşteri (ABD)","≥ 3",0],["Tekrar sipariş oranı","ölçüm başlat",0]]},{t:"Pazarlama Planı",o:"Veri temelli hedef müşteri geliştirme",kr:[["Hedef müşteri listesi (ülke bazlı)","17 ülke",0],["Sektörel fuar katılımı","≥ 2",0],["Referans / vaka çalışması","≥ 3",0]]},{t:"Operasyon ve Üretim",o:"Kişiye bağımlı operasyonu yazılı sürece taşımak",kr:[["Operasyon el kitabı","Q1 2027",0],["Qervan üzerinden işlem oranı","%80",0],["Standart satış ve tedarik sözleşmesi kullanımı","%100 yeni işlemde",0]]},{t:"İş Geliştirme",o:"Yeni ürün grupları ve yapılar",kr:[["Hammadde düzenli satış modeli","2 fabrika → sözleşmeli",10],["Hong Kong yapısı kararı","Q4 2026",10],["Finansman görüşmeleri (KT, Exim)","Q1 2027",0]]}]};

const RACI={roles:["Genel Kurul / Ortak","YK / Müdür","İcra","Satış","Operasyon","Finans","Juris"],rows:[["Stratejik plan ve bütçe onayı","A","R","C","C","C","C","I"],["Sözleşme imzası (olağan)","I","A","R","C","C","I","C"],["Sözleşme imzası (eşik üstü)","A","R","C","I","I","C","C"],["Fiyat ve marj onayı","I","A","R","R","C","C","x"],["Tedarikçi seçimi","x","A","R","C","R","I","x"],["Yeni pazar / ürün grubu","A","R","R","C","C","C","C"],["İşe alım ve fesih","I","A","R","I","I","C","C"],["Qervan–WeTrade hizmet bedeli","A","A","R","x","x","C","C"]]};

const FIN={ WeTrade:{years:["2023","2024","2025","2026E","2027B"],revenue:[null,115,115,null,null],range:[null,[100,130],[100,130],null,null],margin:[null,7,7,null,null],note:"Ciro aralığı 100–130 mn TL (son 2 yıl) ve ~%7 kârlılık beyanı; orta nokta çizildi. Yıllık bilanço/gelir tablosu gelince gerçek değerler."}, Qervan:{years:["2023","2024","2025","2026E","2027B"],revenue:[null,null,null,0,null],range:[null,null,null,null,null],margin:[null,null,null,null,null],note:"Kuruluş 01.07.2026; 2026'da gelir yok (lansman Kasım 2026). 2027 bütçe hedefi belirlenecek."} };

const REVACT={ WeTrade:[["İthalat (mimari cam)",40,"Mal satış geliri","Ana"],["Transit ticaret (mimari cam)",40,"Mal satış geliri · yüksek birim kâr","Ana – büyüme"],["İhracat (mimari cam)",20,"Mal satış geliri · yüksek birim kâr","Ana – büyüme"],["Ticari aracılık komisyonu",2,"Komisyon","Tamamlayıcı"],["Cam hammaddeleri (2 fabrika)",0,"Mal satışı · düzenli model yok","Tamamlayıcı"],["Endüstriyel ürünler (Al, carbon black, kauçuk)",0,"Fırsat bazlı","Fırsat"]],
 Qervan:[["Kurumsal platform aboneliği",0,"Tekrarlayan · lansman Kasım 2026","Ana (planlanan)"],["İşlem bazlı hizmet bedeli",0,"İşlem bazlı","Ana (planlanan)"],["Modül / lisans bedeli",0,"Tekrarlayan veya proje","Tamamlayıcı"],["Kurulum / entegrasyon",0,"Proje bazlı","Tamamlayıcı"],["Veri ve raporlama hizmetleri",0,"Abonelik","Tamamlayıcı"]] };

const VALPROC={ WeTrade:["Pazar geliştirme","Müşteri edinimi","Tedarikçi araştırması","Fiyatlandırma","Ticari müzakere","Sipariş yönetimi","Satın alma","Ödeme koordinasyonu","Dış ticaret operasyonu","Lojistik","Satış sonrası","Dijital operasyon (Qervan)"], Qervan:["Ar-Ge ve geliştirme","Platform işletimi","Veri güncelleme","Talep–teklif–proforma","Sipariş ve sevkiyat izleme","Müşteri yönetimi","Entegrasyonlar","Güvenlik ve veri koruma","Müşteri kazanımı ve destek","Yeni sektör / ürün grubu"] };

const PROJECTS=[
 {t:"Qervan platform lansmanı",ent:"Qervan",st:3,res:"EDE TEK + teknik ekip · bulut",bud:"Bütçelenmedi (belge yok)",ret:"Abonelik + işlem geliri · 2027'den itibaren",due:"Kasım 2026"},
 {t:"Ödeme entegrasyonu + navlun API + iskonto motoru",ent:"Qervan",st:1,res:"Lisanslı ödeme kuruluşu (WorldFirst görüşmesi)",bud:"Belirlenecek",ret:"İşlem bazlı gelir · kullanıcı tutma",due:"2027"},
 {t:"Clara – yapay zekâ asistanı",ent:"Qervan",st:0,res:"Ar-Ge ekibi · Teknopark desteği",bud:"Belirlenecek",ret:"Modül geliri · farklılaşma",due:"2027"},
 {t:"Yeni ürün gruplarına genişleme",ent:"Qervan",st:0,res:"Veri matrisi · sektör uzmanlığı",bud:"—",ret:"Yeni müşteri segmentleri",due:"2028+"},
 {t:"ABD pazarına giriş",ent:"WeTrade",st:1,res:"Satış ekibi · ABD alıcı listesi",bud:"Pazarlama bütçesi içinde",ret:"İhracat cirosu · yüksek marj",due:"2027"},
 {t:"Hammadde düzenli satış modeli",ent:"WeTrade",st:1,res:"2 fabrika ilişkisi · tedarik sözleşmesi",bud:"İşletme sermayesi",ret:"Tamamlayıcı tekrarlayan ciro",due:"Q1 2027"},
 {t:"Hong Kong yapısı ve teşvikler",ent:"Grup",st:1,res:"Onur Sabri Durak görüşmesi · Juris",bud:"Danışmanlık",ret:"Vergi/teşvik etkisi · operasyon kolaylığı",due:"Q4 2026"},
 {t:"Ekosistem iş birlikleri (Alibaba, Asset Lojistik, KT/Exim)",ent:"Grup",st:0,res:"Yönetim · Juris",bud:"—",ret:"Kanal, lojistik maliyeti, finansman",due:"Planlanacak"}];

const DD={ Qervan:[["1. Şirket Kayıtları ve Kurumsal Yönetim",["Esas Sözleşme","YK Karar Defteri","Pay Defteri","GK Toplantı ve Müzakere Defteri","Sermaye dekontu (62.500 TL)","Güncel imza sirküleri","Vekaletnameler ve iç yönerge"],"Müvekkil Yönetimi"],["2. Lisanslar, İzinler, Regülasyon",["Teknopark kabul yazısı, Ar-Ge proje onayları","Teknokent / Ticaret Bakanlığı destek başvuruları","4875 s.K. YYBS bildirimleri"],"Müvekkil Yönetimi"],["3. Kredi, Finansman ve Teminatlar",["Banka / hesap sözleşmesi","Vergi borcu yoktur","SGK borcu yoktur"],"Mali Müşavir"],["4. Sözleşmeler ve Ticari İlişkiler",["Teknopark kira ve aidat sözleşmesi","EDE TEK Yazılım Geliştirme Sözleşmesi ek/değişiklikleri","EDE TEK Bakım ve Destek Sözleşmesi","Sosyal medya / grafik tasarım sözleşmesi","Bulut altyapı aboneliği","Mali müşavirlik sözleşmesi","İmzalanmış NDA'lar","Diğer sözleşmeler"],"Müvekkil Yönetimi"],["5. Çalışanlar ve İK",["Güncel çalışan listesi","İş sözleşmeleri","SGK sicil no ve işe giriş bildirgeleri","Teknopark Ar-Ge personel listesi","Yabancı uyruklu YK üyesi/çalışan çalışma izinleri"],"Mali Müşavir + Yönetim"],["7. BT, Veri Koruma, Fikri Mülkiyet",["Domain listesi ve sahiplik","Qervan markası TÜRKPATENT başvurusu","Kaynak kod teslim kayıtları","3. taraf yazılım lisansları / açık kaynak listesi"],"Yazılım Ekibi (EDE TEK)"],["8. Sigorta",["Tamamlayıcı sağlık sigortası poliçesi"],"Müvekkil Yönetimi"]],
 WeTrade:[["1. Şirket Kayıtları ve Kurumsal Yönetim",["Güncel şirket sözleşmesi (tadillerle)","Pay Defteri","GK Toplantı ve Müzakere Defteri","Müdürler Kurulu Karar Defteri","01.06.2023, 28.10.2024, 22.04.2025 GK kararları","Kuruluş sermayesi dekontu (100.000 TL)","SMMM tespit raporu 2024-10/2","Güncel imza sirküleri","Vekaletnameler"],"Müvekkil Yönetimi"],["2. Lisanslar, İzinler, Regülasyon",["İhracatçı Birliği üyelik belgesi","Kimyasal ithalat/ihracat izin ve bildirimleri"],"Müvekkil Yönetimi"],["3. Kredi, Finansman ve Teminatlar",["Banka / hesap sözleşmeleri","Akreditif ve dış ticaret banka sözleşmeleri","Vergi borcu yoktur","SGK borcu yoktur"],"Mali Müşavir"],["4. Sözleşmeler ve Ticari İlişkiler",["Merkez kira sözleşmesi / kullanım dayanağı","Mali müşavirlik sözleşmesi","Metal satış sözleşmeleri","Proforma ve sipariş teyidi örnekleri","Komisyon / aracılık sözleşme ve yazışmaları","Forwarder ve gümrük müşavirliği sözleşmeleri","Qervan yazılım yatırımı sözleşme ve ödeme kayıtları","İmzalanmış NDA'lar","Diğer sözleşmeler"],"Müvekkil Yönetimi"],["5. Çalışanlar ve İK",["Güncel çalışan listesi","İş / hizmet sözleşmeleri","SGK sicil no ve işe giriş bildirgeleri","Yurt dışı çalışan sözleşme ve ödeme kayıtları"],"Mali Müşavir + Yönetim"],["7. BT, Veri Koruma, Fikri Mülkiyet",["Domain listesi ve sahiplik","Müşteri verisi bulut depolama abonelik bilgileri"],"Müvekkil Yönetimi"],["8. Sigorta",["Nakliyat sigortası poliçe örnekleri"],"Müvekkil Yönetimi"]] };

const DD_DONE={Qervan:["EDE TEK Yazılım Geliştirme Sözleşmesi ek/değişiklikleri"],WeTrade:[]};

const CONTRACTS=[["Qervan – WeTrade Platform Hizmet Sözleşmesi","Hizmet kapsamı, ücret, kullanım hakkı, süre, fesih","Qervan ↔ WeTrade","R5"],["Kurumsal Kullanıcı / Üyelik Sözleşmesi","Diğer trader müşterilerle ilişki","Qervan ↔ Trader","R2"],["Platform Kullanım Şartları","Hesap, yetki, kurallar","Qervan → kullanıcılar","R5"],["Hizmet Seviyesi ve Teknik Destek","Kullanılabilirlik, bakım, veri iadesi","Qervan ↔ müşteri","R5"],["Veri İşleme ve Gizlilik Düzenlemeleri","KVKK/GDPR rolleri, yurt dışı aktarım","Qervan ↔ müşteri","R7"],["Ticari Satış ve Tedarik Sözleşmeleri","Alıcı ve tedarikçi işlemleri","WeTrade ↔ 3. kişiler","R4"],["Fikri Mülkiyet ve Veri Kullanım Düzenlemeleri","Kaynak kod, marka, veri setleri","Qervan ↔ EDE TEK / WeTrade","R1"],["Müşteri Yönlendirme / Ticari Destek Sözleşmesi","WeTrade'in Qervan'a ayrı hizmeti","WeTrade ↔ Qervan","R6"],["Trader Komisyon Sözleşmesi","Aracılık/komisyon + sözleşme öncesi gizlilik","Platform ↔ Trader","R5"]];

const RISKS=[
 {id:"R1",t:"Kaynak kod / fikri hak devrinin fiilen tamamlanmaması",ent:"Qervan",p:4,i:5,ifnot:"FM ve Veri Kullanım Düzenlemeleri + DD 7. başlık belgeleri",src:SRC.bm},
 {id:"R2",t:"Tek müşteriye (WeTrade) bağımlılık",ent:"Qervan",p:5,i:4,ifnot:"Üyelik sözleşmesi + satış OKR (≥5 müşteri)",src:SRC.bm},
 {id:"R3",t:"Kurucuya bağımlı satış (~%70)",ent:"WeTrade",p:4,i:4,ifnot:"Org şeması, yetki matrisi, satış OKR",src:SRC.bmw},
 {id:"R4",t:"Çerçeve sözleşme yok; proforma-teyit ile ilişki",ent:"WeTrade",p:5,i:3,ifnot:"Ticari Satış ve Tedarik Sözleşme Seti (25)",src:SRC.bmw},
 {id:"R5",t:"Qervan–WeTrade hizmet sözleşmesi ve veri dayanağı yok",ent:"Grup",p:5,i:4,ifnot:"Platform Hizmet Sözleşmesi + Kullanım Şartları + SLA",src:SRC.etki},
 {id:"R6",t:"İlişkili kişi işlemleri / transfer fiyatlandırması; Teknopark gelir ayrımı",ent:"Grup",p:3,i:4,ifnot:"Mali müşavir incelemesi + ayrı bütçeler",src:SRC.etki},
 {id:"R7",t:"KVKK/GDPR ve VERBİS belirsizliği",ent:"Grup",p:4,i:3,ifnot:"Mini KVKK projesi (51. hafta) + 2025 bilanço toplamı",src:SRC.tt},
 {id:"R8",t:"Kalan sermaye 187.500 TL – 01.07.2028",ent:"Qervan",p:2,i:3,ifnot:"YK kararı ve ödeme takvimi (A.3 karar mekanizması)",src:SRC.rfq},
 {id:"R9",t:"Yurt dışı personel ödemeleri ve HK yapısı",ent:"Grup",p:3,i:3,ifnot:"Hong Kong fizibilitesi + İK sözleşmeleri",src:SRC.tt},
 {id:"R10",t:"Yazılı operasyon prosedürü yok",ent:"WeTrade",p:3,i:2,ifnot:"Operasyon el kitabı (Operasyon OKR)",src:SRC.bmw},
 {id:"R11",t:"Şirket sözleşmesi amaç maddesi aşırı geniş",ent:"WeTrade",p:2,i:2,ifnot:"Sözleşme tadili (DD sonrası)",src:SRC.rfw},
 {id:"R12",t:"Kimyasal ithalat/ihracat izin ve bildirimleri",ent:"WeTrade",p:2,i:3,ifnot:"DD 2. başlık belgeleri",src:SRC.ddw}];

const MEETINGS=[{d:"17.09.2026",t:"Qervan & WeTrade – Juris Toplantısı",who:"Caner Arslan, Gülşah Algın",agenda:["Platform özelleştirme, HS Code, sigorta","Platform sözleşmeleri ve KVKK","Trader ilişkisi, HK yapısı, NDA, DD, yurt dışı personel"],delivered:["NDA seti – WeTrade (30.09)","DD belge listeleri (01.10)","Risk tespiti formları (01.10)"],undelivered:["Whitepaper (Qervan → Juris)","2025 bilanço toplamı (Mali Müşavir)","Platform sözleşme ön görüşmesi (43. hafta)"],url:D+"1UlBIDmzO8fXcj6VMe5_3YljY7w5rtRu7khpJAdFt3nc/edit",st:"done"},{d:"25.09.2026",t:"DD Toplantısı",who:"Caner, İlayda, Gülşah, Melisa",agenda:["DD kapsamı ve belge listesi"],delivered:[],undelivered:["Tutanak Drive'da yok"],st:"pending"},{d:"01.10.2026",t:"2 haftalık toplantı",who:"—",agenda:["Trader komisyon modeli","HK yapısı","Yurt dışı personel ödemesi"],delivered:[],undelivered:["Tutanak yok"],st:"pending"},{d:"15.10.2026",t:"2 haftalık toplantı",who:"—",agenda:["İş modeli onayı","Data Room yüklemesi (1/65)"],delivered:[],undelivered:["Tutanak yok"],st:"pending"}];

const MAILS=[["30.09.2026","Juris → WeTrade","NDA seti teslimi (4 dosya TR/EN)","done"],["01.10.2026","Juris → Qervan / WeTrade","DD kapsamında talep edilen belgeler listesi","done"],["01.10.2026","Juris → Qervan / WeTrade","Hukuki Bilgilendirme ve Risk Tespiti Formları","done"],["—","Juris → Yazılım Ekibi","Hatırlatma: platform whitepaper / iş akışları","pending"],["—","Juris → Mali Müşavir","Talep: 2025 bilanço toplamı, mizan, vergi/SGK yazıları","pending"],["—","Juris → Müvekkil Yönetimi","Hatırlatma: Data Room yüklemesi (Qervan 1/33, WeTrade 0/32)","pending"],["—","Müvekkil Yönetimi → Juris","Onay: İş Modeli Dokümanları (A.1)","pending"]];

const ONBOARD=[["Hizmet sözleşmesi ve kick-off sunumu","15.09.2026 · kick-off",1],["Data Room açılışı ve erişim","A–F klasörleri + 9'ar DD klasörü",1],["İş Modeli soru setleri yanıtlandı","Qervan 18.09 · WeTrade 10.09",1],["İlk tutanak ve aksiyon döngüsü","17.09.2026",1],["Risk Tespiti Formları yanıtlanıyor","76 soru · cevaplar boş",0],["Data Room belge yüklemesi","1/65 · sorumlu bazında",0],["İş Modeli onayı → İş Planı","A.1 onay bekliyor",0],["OKR / raporlama ritmi kuruldu","Yönetim Raporlama Sistemi (13)",0]];

const LEARN=[{no:"4",t:"İş Modeli Nedir ve Neden Analiz Edilir? – Bilgi Notu",url:FL+"1slGOR663IjlQfsOG-70kFqozHJULGMJS/view",st:"applied",for:"A.1"},{no:"7",t:"Yatırım Öncesi Düşünme Rehberi",st:"planned",for:"A.4"},{no:"8",t:"Yatırımcı Sunumu (Pitch Deck) Bilgi Notu",st:"planned",for:"A.4"},{no:"4b",t:"İş Planı Nedir ve Neden Analiz Edilir? – Bilgi Notu",st:"planned",for:"A.2"},{no:"10",t:"Performans İzleme ve KPI/OKR Sistemi – Bilgi Notu",st:"planned",for:"A.2 / A.5"},{no:"13",t:"Yönetim Raporlama Sistemi – Kılavuz",st:"planned",for:"A.5"},{no:"32",t:"Kurumsal Yönetim ve Organizasyon Yapısı – Bilgi Notu",st:"planned",for:"A.3"},{no:"DD",t:"Due Diligence Asgari İnceleme Kılavuzu – A.Ş.",st:"planned",for:"E-1 Qervan"},{no:"DD",t:"Due Diligence Asgari İnceleme Kılavuzu – Ltd. Şti.",st:"planned",for:"E-1 WeTrade"},{no:"DR",t:"Data Room Veri Yükleme Yönergesi",st:"planned",for:"E-1 / B / C"},{no:"—",t:"İstifa Dilekçesinde Dikkat Edilmesi Gerekenler – Bilgi Notu",url:D+"1Go3IKn-sUF37C-g_8sYRz4OGF5eqSMYa0rZ98dz1rRk/edit",st:"shared",for:"E-5"},{no:"27",t:"NDA Kullanım Bilgilendirme Dokümanı",st:"planned",for:"E-4"}];



/* ---------- state ---------- */

const ASSESS_TABS=[["A","Strateji ve Business","Kanvas · OKR · Org şeması · RACI"],["B","Finans","Trend · Bütçe · Nakit · Bilanço"],["C","Muhasebe","Hesap planı · Mizan"],["D","Operasyonlar","Gelir faaliyetleri · Süreç · Projeler"],["E","Hukuk","DD · Sözleşme · İK · NDA · KVKK · Risk"],["F","İletişim","Toplantı döngüsü · Mailler"]];

function assessA(){const e=assessEnt==="WeTrade"?"WeTrade":"Qervan";const src=e==="Qervan"?SRC.bm:SRC.bmw;
 return `${docH("A.1 İş Modeli Kanvası","Osterwalder – Business Model Canvas",src,"review",entTabs())}${canvas(BMC[e])}
 ${docH("A.1 Lean Canvas","Ash Maurya – Lean Canvas",src,"review",entTabs())}${canvas(LEAN[e],true)}
 ${docH("A.1 Grup İlişki Modeli","Şirketler arası hizmet modeli",SRC.etki,"review")}
 <div class="card pad"><div class="rel"><div class="box navy"><b>Qervan</b><span>Platform · abonelik, işlem, modül, entegrasyon geliri</span></div><div class="arr">Platform hizmet sözleşmesi<br>↔<br>abonelik + işlem bedeli</div><div class="box"><b>WeTrade</b><span>İlk kurumsal müşteri · kendi adına mal ticareti</span></div><div class="box"><b>Diğer Traderlar</b><span>Bağımsız müşteriler · münhasırlık yok</span></div><div class="arr">Üyelik / kullanım şartları</div><div class="box"><b>Alıcılar · Tedarikçiler · Lojistik · Finansman</b><span>Ticaret şirketlerinin ilişkileri; Qervan taraf değil</span></div></div></div>
 ${docH("A.2 İş Planı – 5 bölüm × OKR","İş Planı · 3–5 KR / bölüm",SRC.none,"pending",entTabs())}
 ${ghost("Klasör boş. OKR hedefleri iş modeli dokümanlarından türetilmiş <b>öneri</b>; İş Planı Soru Seti yanıtlanınca hedef ve mevcut değerler yönetim + mali müşavir girdisiyle kesinleşir.","blue")}
 ${okrGrid(OKR[e])}
 ${docH("A.3 Yönetişim – Çıktı Dokümanları","Doküman şeridi · 32–39",SRC.beyan,"pending",entTabs())}
 ${docbar([["A3","32"],["A3","33"],["A3","34"],["A3","35"],["A3","36"],["A3","37"],["A3","38"],["A3","39"]])}
 <div class="grid2"><div class="card pad">${lbl("33 · Organizasyon Şeması (sicil + beyan)")}<div style="height:10px"></div>${e==="Qervan"?`<div class="org"><div class="node top"><b>Genel Kurul</b><span>Tek pay sahibi: Inna Aslan · 250.000 TL (62.500 ödendi)</span></div><div class="line"></div><div class="node"><b>Yönetim Kurulu</b><span>Inna Aslan · Başkan · münferiden temsil · 3 yıl (→ 01.07.2029)</span></div><div class="line"></div><div class="node ghost"><b>İcra / Genel Müdür</b><span>İcra Yönergesi (37) ile tanımlanacak</span></div><div class="row"><div><div class="node ghost"><b>Yazılım / Ar-Ge</b><span>EDE TEK + teknik ekip</span></div></div><div><div class="node ghost"><b>Ürün ve Veri</b><span>fiyat/navlun/vergi</span></div></div><div><div class="node ghost"><b>Müşteri ve Satış</b><span>kurumsal satış, destek</span></div></div><div><div class="node ghost"><b>Finans / Uyum</b><span>mali müşavir, KVKK</span></div></div></div></div>`:`<div class="org"><div class="node top"><b>Genel Kurul</b><span>Tek ortak: Caner Aslan · 3.000.000 TL</span></div><div class="line"></div><div class="node"><b>Müdürler Kurulu</b><span>Caner Aslan · Başkan · tek başına temsil</span></div><div class="line"></div><div class="node"><b>Kurucu / İcra</b><span>cironun ~%70'i</span></div><div class="row"><div><div class="node"><b>Satış-Pazarlama</b><span>3 kişi · ~%30</span></div></div><div><div class="node ghost"><b>Dış Ticaret Operasyonu</b><span>gümrük, evrak, lojistik</span></div></div><div><div class="node ghost"><b>Finans</b><span>SMMM Özgür Demir (dış)</span></div></div><div><div class="node ghost"><b>Yurt dışı personel</b><span>ödeme modeli belirlenecek</span></div></div></div></div>`}</div>
 <div class="card pad">${lbl("36–38 · Karar mekanizması ve yetki eşikleri (taslak)")}<div class="tbl-wrap" style="margin-top:8px"><table><thead><tr><th>Karar</th><th>Organ</th><th>Eşik / kural</th></tr></thead><tbody>${[["Bütçe, stratejik plan","Genel Kurul","Yıllık onay"],["Olağan sözleşmeler","İcra","İcra Yönergesi eşiği altı"],["Eşik üstü / olağan dışı sözleşme","YK / Müdürler Kurulu","Yazılı karar + defter"],["İlişkili taraf işlemi (Qervan ↔ WeTrade)","YK + GK bilgilendirme","Emsal bedel, mali müşavir görüşü"],["Sermaye ödeme takvimi (Qervan)","YK","187.500 TL → 01.07.2028"],["Toplantı ritmi","Yönetim","2 haftada 1, tutanak + aksiyon"]].map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td style="color:var(--ink-2)">${r[2]}</td></tr>`).join("")}</tbody></table></div></div></div>
 ${docH("A.3 Yönetişim – Görev, Yetki ve Onay Matrisi","RACI · 34–35",SRC.none,"pending")}
 <div class="card"><div class="tbl-wrap"><table class="matrix"><thead><tr><th>Karar / İşlem</th>${RACI.roles.map(r=>`<th>${r}</th>`).join("")}</tr></thead><tbody>${RACI.rows.map(r=>`<tr><td>${r[0]}</td>${r.slice(1).map(c=>`<td><span class="rc ${c}">${c==="x"?"–":c}</span></td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="legend" style="padding:0 14px 12px"><span><i style="background:var(--navy)"></i>R Yürütür</span><span><i style="background:var(--red-ink)"></i>A Onaylar</span><span><i style="background:var(--info)"></i>C Danışılır</span><span><i style="background:var(--neutral)"></i>I Bilgilendirilir</span></div></div>
 ${docH("A.4 Yatırımcı Sunumu","Pitch Deck · 12 slayt",SRC.none,"pending")}
 <div class="slides">${["Kapak","Problem","Çözüm / Ürün","Neden şimdi","Pazar büyüklüğü","İş modeli","Çekiş: WeTrade, 17 ülke","Rekabet ve haksız avantaj","Yol haritası","Ekip","Finansal projeksiyon","Talep: pre-seed"].map((t,i)=>`<div class="slide"><b>${t}</b><span class="n">${String(i+1).padStart(2,"0")}</span></div>`).join("")}</div>`;}

function assessB(){const e=assessEnt;const ents=e==="Konsolide"?["Qervan","WeTrade"]:[e];const tabs=entTabs(["Qervan","WeTrade","Konsolide"]);
 const trend=ents.map(x=>`<div class="card pad"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap">${lbl(x+" · Yıllık ciro (mn TL)")}<span class="pill amber">beyan</span></div>${barChart(FIN[x].years,FIN[x].revenue,FIN[x].range,"mn TL")}<div class="muted" style="margin-top:6px">${FIN[x].note}</div></div>`).join("");
 const row=(l,vals,cls="")=>`<tr class="${cls}"><td>${l}</td>${vals.map(v=>`<td class="n ${v===""?"empty":""}">${v===""?"—":v}</td>`).join("")}</tr>`;
 const budget=x=>x==="Qervan"?row("Platform abonelik geliri",["","","149/499 EUR referans"])+row("İşlem bazlı hizmet geliri",["","","300 konteyner/ay göstergesi"])+row("Kurulum / entegrasyon",["","",""])+row("Toplam gelir",["","",""],"sum")+row("Geliştirme / Ar-Ge",["","","EDE TEK"])+row("Personel",["","","8 kişi (2 aşama)"])+row("Bulut, lisans, Teknopark",["","",""])+row("Pazarlama",["","","3–5k USD/ay"])+row("Toplam gider",["","",""],"sum")+row("FAVÖK",["","",""],"sum")
  :row("Mal satış geliri",["100–130 mn","","beyan · ~%95+"])+row("Aracılık komisyonu",["","",""])+row("Toplam gelir",["","",""],"sum")+row("Satılan malın maliyeti",["","","en büyük kalem"])+row("Navlun, lojistik, sigorta",["","",""])+row("Personel",["","","3 satış + kurucu"])+row("Qervan platform bedeli",["","","yeni kalem"])+row("Toplam gider",["","",""],"sum")+row("Faaliyet kârı",["~%7","","brüt/net teyit"],"sum");
 return `${docH("B · Yıllara Sari Trend","Ciro ve kârlılık trendi · 2023–2027",SRC.beyan,"input",tabs)}
 ${ghost("Grafikler <b>beyana</b> dayalı; yıllık bilanço ve gelir tabloları (Mali Müşavir) yüklendikçe gerçek değerler ve 2027 bütçesi işlenir. Konsolide görünümde Qervan↔WeTrade hizmet bedeli <b>elimine</b> edilir.","blue")}
 <div class="grid2">${trend}</div>
 ${e==="Konsolide"?`<div class="card pad" style="margin-top:12px">${lbl("Konsolidasyon notu")}<div class="tbl-wrap" style="margin-top:8px"><table><thead><tr><th>Kalem</th><th>Qervan</th><th>WeTrade</th><th>Eliminasyon</th><th>Grup</th></tr></thead><tbody>${[["Platform hizmet bedeli","+ gelir","− gider","✓ elimine","0"],["Mal satış geliri","—","+","—","WeTrade"],["Yazılım yatırımı (geçmiş)","aktif?","gider?","hak sahipliği incelenecek","?"],["Transfer fiyatlandırması","emsal","emsal","mali müşavir","—"]].map(r=>`<tr>${r.map((c,i)=>`<td ${i?'style="color:var(--ink-2)"':''}>${i?c:`<b>${c}</b>`}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`:""}
 ${docH("B.1 Bütçe","Yıllık bütçe · 2026 gerçekleşen / 2027 bütçe",SRC.beyan,"input",tabs)}
 ${ents.map(x=>`<div class="card" style="margin-bottom:12px"><div style="padding:10px 14px 0">${lbl(x)}</div><div class="tbl-wrap"><table class="fin"><thead><tr><th>Kalem</th><th style="text-align:right">2026</th><th style="text-align:right">2027B</th><th style="text-align:right">Not</th></tr></thead><tbody>${budget(x)}</tbody></table></div></div>`).join("")}
 ${docH("B.2 Nakit Akışı","Aylık nakit akış · son 12 ay + 12 ay projeksiyon",SRC.none,"input",tabs)}
 <div class="card"><div class="tbl-wrap"><table class="fin"><thead><tr><th>Kalem</th>${["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"].map(m=>`<th style="text-align:right">${m}</th>`).join("")}</tr></thead><tbody>${["Dönem başı nakit","Tahsilat (%30 onay + %70 yükleme)","Tedarikçi ödemeleri","Operasyon giderleri","Qervan ↔ WeTrade hizmet bedeli","Finansman","Dönem sonu nakit"].map((l,i)=>row(l,Array(12).fill(""),i===6?"sum":"")).join("")}</tbody></table></div></div>
 ${docH("B.3 Bilanço","Özet bilanço · yıllara sari",SRC.rfw,"input",tabs)}
 <div class="grid2">${ents.map(x=>`<div class="card pad">${lbl(x+" · Pasif / öz kaynak (sicil verisi)")}<div class="tbl-wrap" style="margin-top:8px"><table class="fin"><tbody>${x==="Qervan"?row("Sermaye",["250.000 TL"])+row("Ödenmemiş sermaye (–)",["187.500 TL → 01.07.2028"])+row("Duran varlık: yazılım / FM",["aktifleştirme incelenecek"]):row("Sermaye",["3.000.000 TL"])+row("İç kaynak artırımı (2024)",["2.900.000 TL geçmiş yıl kârı"])+row("31.12.2023 mizanı",["SMMM raporu 2024-10/2"])}${row("Toplam aktif / pasif",[""],"sum")}</tbody></table></div></div>`).join("")}</div>`;}

function assessC(){return `${docH("C.1 Hesap Planı","Tek Düzen Hesap Planı · ana gruplar",SRC.none,"input")}
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>Grup</th><th>Hesap sınıfı</th><th>Şirkete özgü dikkat noktası</th><th>Kimden</th></tr></thead><tbody>${[["1","Dönen Varlıklar","Alıcılar 17 ülke, USD/EUR; %30 sipariş avansı"],["2","Duran Varlıklar","Qervan: yazılım geliştirme harcamalarının aktifleştirilmesi"],["3","KV Yabancı Kaynaklar","Satıcılar; akreditif"],["4","UV Yabancı Kaynaklar","Kredi yok (beyan)"],["5","Öz Kaynaklar","Qervan ödenmemiş sermaye; WeTrade iç kaynak artırımı"],["6","Gelir Tablosu","Qervan: yalnızca platform hizmet geliri; Teknopark istisnası"],["7","Maliyet","Navlun, sigorta, gümrük; Ar-Ge"]].map(r=>`<tr><td class="num">${r[0]}</td><td><b>${r[1]}</b></td><td style="color:var(--ink-2)">${r[2]}</td><td class="owner">Mali Müşavir</td></tr>`).join("")}</tbody></table></div></div>
 ${docH("C.2 Mizan","Aylık mizan özeti",SRC.none,"input")}
 ${ghost("DD kapsamında <b>Mali müşavirlik sözleşmesi</b>, <b>Vergi/SGK borcu yoktur</b> yazıları ve WeTrade için <b>31.12.2023 mizanına dayalı SMMM tespit raporu</b> istendi. VERBİS için 2025 yıl sonu bilanço toplamı da Mali Müşavir'den bekleniyor.","blue")}
 <div class="card"><div class="tbl-wrap"><table class="fin"><thead><tr><th>Hesap</th><th style="text-align:right">Borç</th><th style="text-align:right">Alacak</th><th style="text-align:right">Borç bakiye</th><th style="text-align:right">Alacak bakiye</th></tr></thead><tbody>${["100 Kasa","102 Bankalar","120 Alıcılar","159 Verilen Sipariş Avansları","320 Satıcılar","500 Sermaye","501 Ödenmemiş Sermaye (–)","601 Yurt Dışı Satışlar","770 Genel Yönetim Giderleri"].map(h=>`<tr><td>${h}</td><td class="n empty">—</td><td class="n empty">—</td><td class="n empty">—</td><td class="n empty">—</td></tr>`).join("")}</tbody></table></div></div>`;}

function assessD(){const e=assessEnt==="WeTrade"?"WeTrade":"Qervan";const src=e==="Qervan"?SRC.bm:SRC.bmw;
 return `${docH("D.1a Gelir Getiren Faaliyetler","Bütçeye esas iş türleri · ciro payı",src,"review",entTabs())}
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>İş türü</th><th style="min-width:160px">Ciro payı</th><th>Gelir niteliği</th><th>Konum</th></tr></thead><tbody>${REVACT[e].map(r=>`<tr><td><b>${r[0]}</b></td><td><div style="display:flex;align-items:center;gap:8px"><div class="bar" style="flex:1"><i class="s-done" style="width:${r[1]}%;background:var(--navy)"></i></div><span class="num muted" style="min-width:34px;text-align:right">${r[1]?"%"+r[1]:"—"}</span></div></td><td style="color:var(--ink-2)">${r[2]}</td><td><span class="pill ${r[3].startsWith("Ana")?"blue":r[3]==="Fırsat"?"amber":""}">${r[3]}</span></td></tr>`).join("")}</tbody></table></div></div>
 ${e==="Qervan"?ghost("Qervan'da bugün gelir yok; faaliyetler <b>planlanan</b> gelir kalemleridir. Bütçeye esas alınacak ilk kalem: WeTrade platform hizmet bedeli (sözleşme bekliyor).","blue"):ghost("Paylar 21.09 iş modeli dokümanındaki beyandır; <b>son 2 yıl ciro kırılımı</b> (D.1 Data Room girdisi, Müvekkil Yönetimi) gelince gerçek değerlerle değişir.","blue")}
 ${docH("D.1b Değer Yaratan Süreç Haritası","Uçtan uca süreç",src,"review")}
 <div class="card pad"><div class="proc">${VALPROC[e].map((s,i)=>`<div class="st"><b>${String(i+1).padStart(2,"0")}</b>${s}</div>`).join("")}</div></div>
 ${docH("D.2 Projeler","Aşama · kaynak · bütçe · beklenen getiri",SRC.etki,"progress")}
 ${ghost("Projeler henüz gelir getirmeyen, ayrı odak ve bütçe gerektiren işlerdir. Aşama çubuğu Fikir → Fizibilite → Bütçe → Geliştirme → Lansman → Gelir.","blue")}
 <div class="grid2">${PROJECTS.map(p=>`<div class="card pad"><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline"><b style="font-size:13.5px">${p.t}</b><span class="pill">${p.ent}</span></div><div style="margin:10px 0">${stagesEl(p.st)}</div><dl class="kv" style="display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:12.5px;margin:0"><dt class="muted">Kaynak</dt><dd style="margin:0">${p.res}</dd><dt class="muted">Bütçe</dt><dd style="margin:0">${p.bud}</dd><dt class="muted">Beklenen getiri</dt><dd style="margin:0">${p.ret}</dd><dt class="muted">Hedef</dt><dd style="margin:0" class="num">${p.due}</dd></dl></div>`).join("")}</div>`;}

function assessE(){const e=assessEnt==="WeTrade"?"WeTrade":"Qervan";const dd=ddList(e);
 return `${docH("E-1 Due Diligence Belge Checklist","DD asgari inceleme · 9 başlık",e==="Qervan"?SRC.ddq:SRC.ddw,"input",`<span class="pill">Qervan ${ddList("Qervan").ok}/${ddList("Qervan").tot}</span><span class="pill">WeTrade ${ddList("WeTrade").ok}/${ddList("WeTrade").tot}</span>${entTabs()}`)}
 ${dd.html}
 ${ghost("Risk Tespiti Formları (76 soru) her iki şirket için düzenlendi, <b>cevap sütunları boş</b>. Belgeler geldikçe bu checklist ve sonundaki risk haritası dokümana dayalı hale gelir.","blue")}
 ${docH("E-2 Şirket Ana Faaliyet Sözleşme Seti","Sözleşme matrisi · 9 sözleşme",SRC.etki,"pending")}
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>Sözleşme</th><th>Kapsam</th><th>Taraflar</th><th>Kapattığı risk</th><th>Durum</th></tr></thead><tbody>${CONTRACTS.map(r=>`<tr><td><b>${r[0]}</b></td><td style="color:var(--ink-2)">${r[1]}</td><td class="muted">${r[2]}</td><td><span class="pill red">${r[3]}</span></td><td><span class="status pending">Başlamadı</span></td></tr>`).join("")}</tbody></table></div></div>
 ${docH("E-3 İnsan Kaynakları Doküman Seti","Envanter · 4 klasör · 18 doküman",{t:"Drive E-3 · 12.08.2026",u:F+"19FKnxZP2YhkAy9k2nMC_JJBp57vFGuqE",k:"doc"},"review")}
 <div class="check">${[["1 – İşe Alım",["Aday Çalışan Aydınlatma Metni","Anahtar Kullanım Politikası","Bilgisayar/Donanım Politikası","E-Posta Kullanım Politikası","Araç Gereç Politikası","Kapı Şifresi Politikası","İş Sözleşmesi ve Ekleri (klasör)"],[1,1,1,1,1,1,0]],["2 – Fazla Çalışma",["Fazla Çalışma Onay Belgesi"],[1]],["3 – İzin",["İzin Kullanım Formu","Yıllık Ücretli İzin Formu","Ücretsiz İzin Talep Formu","Fazla Çalışma Karşılığı İzin Formu","Yıllık Ücretli İzin Kaydı"],[1,1,1,1,1]],["4 – Savunma ve Diğer",["Tutanak","Savunma Talebi","Savunma Dilekçesi","İş Arama İzni – Günlük","İş Arama İzni – Toplu"],[1,1,1,1,1]]].map(([g,items,st])=>`<div class="grp"><h5>${g}<span>${st.filter(Boolean).length}/${items.length}</span></h5><ul>${items.map((it,i)=>`<li class="${st[i]?"ok":""}"><i></i>${it}</li>`).join("")}</ul></div>`).join("")}</div>
 ${docH("E-4 NDA Sözleşme Seti","Matris · Platform / Şirket × Tek taraflı / Karşılıklı × TR / EN",SRC.tt,"progress")}
 <div class="card"><div class="tbl-wrap"><table class="matrix"><thead><tr><th>Şablon</th><th>Qervan – Platform</th><th>Qervan – Şirket</th><th>WeTrade – Şirket</th></tr></thead><tbody>${[["Tek Taraflı NDA (TR)","pending","pending","done"],["Karşılıklı NDA (TR)","pending","pending","done"],["Unilateral NDA (EN)","pending","pending","done"],["Mutual NDA (EN)","pending","pending","done"],["Kullanım Bilgilendirme Dokümanı","pending","pending","pending"]].map(r=>`<tr><td><b>${r[0]}</b></td>${r.slice(1).map(s=>`<td><span class="status ${s}">${STATUS[s]}</span></td>`).join("")}</tr>`).join("")}</tbody></table></div></div>
 ${docH("E-5 Hukuki Danışmanlık","Dosya bazlı iş listesi",{t:"Drive E-5",u:F+"1MyuSsjPfvtr0gXSWR_4hb_banR67klQS",k:"doc"},"done")}
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>Dosya</th><th>Çıktı</th><th>Tarih</th><th>Durum</th></tr></thead><tbody>${[["Qervan – EDE TEK yazılım ilişkisi","Yazılım Geliştirme + Bakım Sözleşmesi","12.08.2026","done"],["İstifa süreci","Bilgi Notu + Dilekçe Örneği","17.09.2026","done"],["Hong Kong yapısı ve teşvikler","Görüşme (Onur Sabri Durak)","—","pending"],["Yurt dışı personel ödeme modeli","Değerlendirme","—","pending"],["Trader komisyon modeli","Sözleşme + gizlilik","—","pending"]].map(r=>`<tr><td><b>${r[0]}</b></td><td style="color:var(--ink-2)">${r[1]}</td><td class="muted">${r[2]}</td><td><span class="status ${r[3]}">${STATUS[r[3]]}</span></td></tr>`).join("")}</tbody></table></div></div>
 ${docH("E-6 Mini KVKK Projesi","Uyum checklist · 51. hafta hedefi",SRC.tt,"pending")}
 <div class="check">${[["Ön tespit",["VERBİS yükümlülüğü (2025 bilanço toplamı – Mali Müşavir)","Veri envanteri – şirket","Veri envanteri – platform (whitepaper – Yazılım Ekibi)"]],["Şirket doküman seti",["Aydınlatma metinleri","Açık rıza metinleri","Saklama ve imha politikası","KVKK politikası ve prosedürler"]],["Platform doküman seti",["Platform Aydınlatma Metni","Çerez politikası","Veri işleme sözleşmesi (B2B)","Yurt dışı aktarım (GDPR / 17 ülke)"]],["Eğitim ve teslim",["Çalışan eğitimi","Kullanım kılavuzu"]]].map(([g,items])=>`<div class="grp"><h5>${g}<span>0/${items.length}</span></h5><ul>${items.map(it=>`<li><i></i>${it}</li>`).join("")}</ul></div>`).join("")}</div>
 ${docH("Bunları yapmazsak: Hukuki Risk Haritası","Aksiyon → risk · Olasılık × Etki (5×5)",SRC.etki,"progress")}
 ${ghost("Yukarıdaki her çıktı bir riski kapatır. Tablo, <b>yapılmadığında</b> hangi riskin açık kaldığını gösterir; puanlar Juris ön değerlendirmesidir, DD belgeleri geldikçe güncellenir.")}
 <div class="grid2" style="grid-template-columns:minmax(300px,1fr) minmax(300px,1.2fr)"><div class="card pad">${heatmap()}</div>
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>#</th><th>Yapılmazsa oluşan risk</th><th>Kapatan aksiyon / doküman</th><th>O×E</th><th>Dayanak</th></tr></thead><tbody>${RISKS.slice().sort((a,b)=>b.p*b.i-a.p*a.i).map(r=>{const s=r.p*r.i;return `<tr><td style="font-family:var(--font-mono);font-size:11px">${r.id}</td><td><b>${r.t}</b><div class="muted">${r.ent}</div></td><td style="color:var(--ink-2)">${r.ifnot}</td><td><span class="pill ${s>=16?"red":s>=10?"amber":s>=6?"blue":"green"}">${s}</span></td><td>${r.src.u?`<a class="linkbtn" href="${r.src.u}" target="_blank" rel="noopener">belge ↗</a>`:`<span class="muted">beyan</span>`}</td></tr>`;}).join("")}</tbody></table></div></div></div>`;}

function assessF(){
 return `${docH("F.1 Toplantı Döngüsü","Gündem → Toplantı → Tutanak + Aksiyon → Teslim / Teslim edilemeyen → Sonraki gündem",SRC.tt,"progress")}
 <div class="card pad"><div class="flow">${["Gündem","Toplantı (2 haftada 1)","Tutanak + Aksiyon","Teslim edilen / edilemeyen","Sonraki gündem"].map((s,i)=>(i?`<em>→</em>`:"")+`<span>${s}</span>`).join("")}</div></div>
 ${MEETINGS.map(m=>`<div class="card" style="margin-top:12px"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:12px 16px;border-bottom:1px solid var(--divider)"><span class="num" style="font-family:var(--font-mono);font-size:12px;color:var(--ink-3)">${m.d}</span><b style="font-size:13.5px">${m.t}</b><span class="muted">${m.who}</span><span style="margin-left:auto" class="status ${m.st}">${m.st==="done"?"Tutanak var":"Tutanak yok"}</span>${m.url?`<a class="linkbtn" href="${m.url}" target="_blank" rel="noopener">Aç ↗</a>`:""}</div>
 <div class="grid3" style="padding:12px 16px"><div>${lbl("Gündem")}<ul style="margin:6px 0 0;padding-left:16px;font-size:12.5px;color:var(--ink-2)">${li(m.agenda)}</ul></div><div>${lbl("Teslim edilen")}<ul style="margin:6px 0 0;padding-left:16px;font-size:12.5px;color:var(--success)">${m.delivered.length?li(m.delivered):"<li class='muted'>—</li>"}</ul></div><div>${lbl("Teslim edilemeyen / açık")}<ul style="margin:6px 0 0;padding-left:16px;font-size:12.5px;color:var(--red-ink)">${m.undelivered.length?li(m.undelivered):"<li class='muted'>—</li>"}</ul></div></div></div>`).join("")}
 ${docH("17.09 Aksiyon Takibi","Aksiyon tablosu · hafta hedefleri",SRC.tt,"progress")}
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>Sahibi</th><th>Aksiyon</th><th>Hedef</th><th>Çıktı</th><th>Durum</th></tr></thead><tbody>${[["Yazılım Ekibi (Qervan)","Platform iş akışları / whitepaper'ın Juris'e iletilmesi","Hemen","—","input"],["Mali Müşavir (Qervan)","2025 yıllık bilanço toplamı","Hemen","—","input"],["Juris","NDA seti TR/EN + kullanım bilgilendirme","39. hafta","NDA Seti","progress"],["Juris","Platform sözleşmeleri ve KVKK metinleri ön görüşme","43. hafta","Platform Sözleşme ve KVKK Seti","pending"],["Yönetim + Juris","DD süreci; belgelerden sonra 2 ayda rapor","46–47. hafta","Şirket DD Raporları","progress"],["Juris","Şirket KVKK projesi","51. hafta","KVKK Teslimi ve Eğitim","pending"]].map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td class="muted" style="font-family:var(--font-mono);font-size:11.5px">${r[2]}</td><td style="color:var(--ink-2)">${r[3]}</td><td><span class="status ${r[4]}">${STATUS[r[4]]}</span></td></tr>`).join("")}</tbody></table></div></div>
 ${docH("Sonraki Toplantı Gündemi (öneri)","Haftalık görev çıkarımı",SRC.tt,"pending")}
 <div class="grid2"><div class="card pad"><b style="font-size:13.5px">Gündem</b><ol style="margin:8px 0 0;padding-left:18px;font-size:13px;color:var(--ink-2)"><li>İş Modeli dokümanlarının onayı (A.1) → İş Planı soru setine geçiş</li><li>Trader komisyon modeli ve sözleşmesi</li><li>Hong Kong yapısı; yurt dışı personel ödeme modeli</li><li>Data Room yüklemesi (1/65) – sorumlu bazında (Yönetim / Mali Müşavir / Yazılım Ekibi)</li><li>Whitepaper ve 2025 bilanço toplamı</li></ol></div>
 <div class="card pad"><b style="font-size:13.5px">Bu haftanın görevleri (Juris)</b><ul style="margin:8px 0 0;padding-left:18px;font-size:13px;color:var(--ink-2)"><li>Qervan NDA seti (platform + şirket) taslakları</li><li>İş Planı Bilgi Notu + Soru Seti (A.2)</li><li>DD kılavuzları (A.Ş. / Ltd.)</li><li>Hatırlatma mailleri: whitepaper, bilanço toplamı, Data Room</li><li>25.09 / 01.10 / 15.10 tutanaklarının Drive'a yüklenmesi</li></ul></div></div>
 ${docH("F.2 Mailler","Teslim / talep / hatırlatma / onay kaydı",SRC.none,"progress")}
 <div class="card pad">${MAILS.map(m=>`<div class="mail" style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 12px;font-size:12.5px;padding:8px 0;border-top:1px solid var(--divider);align-items:center"><span class="num" style="font-family:var(--font-mono);font-size:11px;color:var(--ink-3)">${m[0]}</span><span><b>${m[1]}</b> · ${m[2]}</span><span class="status ${m[3]}">${m[3]==="done"?"Gönderildi":"Planlı"}</span></div>`).join("")}</div>`;}

/* ---------- Onboard & Learn ---------- */

function viewInsights(){
 const items=allItems(), c=stats(items), ob=onboardStats();
 const okrAvg=ent=>OKR[ent].map(o=>[o.t,Math.round(o.kr.reduce((a,k)=>a+k[2],0)/o.kr.length)]);
 const krTotal=["Qervan","WeTrade"].reduce((a,e)=>a+OKR[e].reduce((x,o)=>x+o.kr.length,0),0);
 const krStarted=["Qervan","WeTrade"].reduce((a,e)=>a+OKR[e].reduce((x,o)=>x+o.kr.filter(k=>k[2]>0).length,0),0);
 const ddq=ddList("Qervan"), ddw=ddList("WeTrade");
 const riskBands=[["Kritik (≥16)",RISKS.filter(r=>r.p*r.i>=16).length,"var(--red-ink)"],["Yüksek (10–15)",RISKS.filter(r=>{const s=r.p*r.i;return s>=10&&s<16;}).length,"var(--warn)"],["Orta (6–9)",RISKS.filter(r=>{const s=r.p*r.i;return s>=6&&s<10;}).length,"var(--info)"],["Düşük (<6)",RISKS.filter(r=>r.p*r.i<6).length,"var(--success)"]];
 const basis=[["Dokümana dayalı",BASIS_COUNT.doc.length,"var(--success)"],["Beyana dayalı",BASIS_COUNT.beyan.length,"var(--warn)"],["Dayanak yok",BASIS_COUNT.none.length,"var(--neutral)"]]; const basisTot=basis.reduce((a,b)=>a+b[1],0);
 const owners={}; items.forEach(it=>it.docs.forEach((d,i)=>{if(stOf(it,i)==="input"){const k=d.owner.split(" / ")[0];owners[k]=(owners[k]||0)+1;}}));
 const actions=[["Teslim edildi",3],["Devam ediyor",2],["Girdi bekleniyor",2],["Planlı",2]];
 const meetingsDone=MEETINGS.filter(m=>m.st==="done").length;
 const weeks=["38","39","40","41","42"]; const cadence=weeks.map(w=>[w, w==="38"?1:w==="40"?0.5:0]);
 return `<div class="page-h"><div><div class="eyebrow">Genel Bakış · Insights</div><h1>Insights</h1><p>İş planı metrikleri (OKR) ve genel durum göstergeleri; karar destek ve toplantı gündemini hızlı geçmek için.</p></div><div class="right"><button class="btn" data-view="as-A">İş Planı OKR'ları</button><button class="btn" data-view="as-E">Risk Haritası</button></div></div>
 ${sec("A · İş Planı Metrikleri (OKR)","5 bölüm × 3–4 KR · şirket bazında ortalama ilerleme")}
 <div class="tiles"><div class="tile accent"><div class="l">KR ilerlemesi (ort.)</div><div class="v num">${Math.round(["Qervan","WeTrade"].reduce((a,e)=>a+okrAvg(e).reduce((x,o)=>x+o[1],0),0)/10)}<small>%</small></div><div class="d" style="color:rgba(255,255,255,.65)">${krStarted}/${krTotal} KR başladı</div></div><div class="tile"><div class="l">Toplam KR</div><div class="v num">${krTotal}</div><div class="d">2 şirket × 5 bölüm</div></div><div class="tile"><div class="l">Hedefi kesinleşen KR</div><div class="v num">0</div><div class="d">İş Planı Soru Seti sonrası</div></div><div class="tile"><div class="l">İş Planı dokümanı</div><div class="v num">A.2.3</div><div class="d"><span class="status pending">Başlamadı</span></div></div></div>
 <div class="grid2" style="margin-top:12px">${["Qervan","WeTrade"].map(e=>`<div class="card pad">${lbl(e+" · bölüm bazında KR ilerlemesi")}<div style="height:10px"></div>${hbar(okrAvg(e))}</div>`).join("")}</div>
 <div class="card pad" style="margin-top:12px">${lbl("Öne çıkan KR'lar (hedef · mevcut)")}<div class="tbl-wrap" style="margin-top:8px"><table><thead><tr><th>Şirket</th><th>Bölüm</th><th>KR</th><th>Hedef</th><th style="min-width:120px">İlerleme</th></tr></thead><tbody>${["Qervan","WeTrade"].flatMap(e=>OKR[e].flatMap(o=>o.kr.map(k=>({e,b:o.t,k})))).filter(x=>x.k[2]>0||/sözleşme|lansman|müşteri|ciro|pay/i.test(x.k[0])).slice(0,10).map(x=>`<tr><td class="muted">${x.e}</td><td>${x.b}</td><td><b>${x.k[0]}</b></td><td class="muted" style="font-family:var(--font-mono);font-size:11px">${x.k[1]}</td><td><div class="bar" style="height:6px"><i class="s-done" style="width:${x.k[2]}%"></i></div></td></tr>`).join("")}</tbody></table></div></div>
 ${sec("B · Genel Durum Metrikleri","Doküman, fonksiyon, dayanak, DD, risk, iletişim")}
 <div class="tiles"><div class="tile accent"><div class="l">Hizmet planı tamamlanma</div><div class="v num">${c.pct}<small>%</small></div><div style="margin-top:10px">${bar(c)}</div></div><div class="tile"><div class="l">Data Room belge</div><div class="v num">${ddq.ok+ddw.ok}<small>/ ${ddq.tot+ddw.tot}</small></div><div class="d">Qervan ${ddq.ok}/${ddq.tot} · WeTrade ${ddw.ok}/${ddw.tot}</div></div><div class="tile"><div class="l">Açık girdi</div><div class="v num">${c.input}</div><div class="d">${Object.entries(owners).map(([k,v])=>`${k.split(" ")[0]} ${v}`).join(" · ")}</div></div><div class="tile"><div class="l">Kritik + yüksek risk</div><div class="v num">${riskBands[0][1]+riskBands[1][1]}<small>/ ${RISKS.length}</small></div><div class="d">tamamı sözleşme setiyle kapanıyor</div></div><div class="tile"><div class="l">Toplantı tutanağı</div><div class="v num">${meetingsDone}<small>/ ${MEETINGS.length}</small></div><div class="d">2 haftalık ritim</div></div><div class="tile"><div class="l">Onboarding</div><div class="v num">${ob.obPct}<small>%</small></div><div class="d">rehber özümsenme ${ob.lnPct}%</div></div></div>
 <div class="grid2" style="margin-top:12px">
  <div class="card pad">${lbl("Data Room bölümleri · doküman durumu")}<div style="height:10px"></div><div style="display:flex;flex-direction:column;gap:8px">${DATAROOM.map(sct=>stackRow(sct.title,stats(sct.items))).join("")}</div>${legend}</div>
  <div class="card pad">${lbl("Fonksiyonlar · tamamlanma")}<div style="height:10px"></div>${hbar(Object.keys(FUNCTIONS).map(k=>[k,stats(items.filter(i=>i.fn===k)).pct]))}<div style="height:16px"></div>${lbl("Dayanak dağılımı · panel sayısı")}<div style="height:10px"></div>${hbar(basis.map(b=>[b[0],b[1],b[2],b[1]+" panel"]),basisTot)}</div>
  <div class="card pad">${lbl("Due Diligence · başlık bazında yükleme")}<div style="height:10px"></div>${hbar(DD.Qervan.map(([g,items])=>["Q · "+g.slice(0,34),items.filter(i=>DD_DONE.Qervan.includes(i)).length,"var(--navy)",`${items.filter(i=>DD_DONE.Qervan.includes(i)).length}/${items.length}`]).concat(DD.WeTrade.map(([g,items])=>["W · "+g.slice(0,34),0,"var(--navy)",`0/${items.length}`])),9)}</div>
  <div class="card pad">${lbl("Risk dağılımı · O×E bandı")}<div style="height:10px"></div>${hbar(riskBands.map(r=>[r[0],r[1],r[2],r[1]+" risk"]),RISKS.length)}<div style="height:16px"></div>${lbl("17.09 aksiyonları")}<div style="height:10px"></div>${hbar(actions.map((a,i)=>[a[0],a[1],["var(--success)","var(--warn)","var(--red-ink)","var(--neutral)"][i],a[1]+" aksiyon"]),9)}</div>
  <div class="card pad">${lbl("Girdi bekleyen · sorumlu bazında")}<div style="height:10px"></div>${hbar(Object.entries(owners).sort((a,b)=>b[1]-a[1]).map(([k,v])=>[k,v,"var(--red-ink)",v+" kalem"]),Math.max(...Object.values(owners),1))}</div>
  <div class="card pad">${lbl("Toplantı ritmi · hafta bazında (1 = tutanaklı toplantı, ½ = tutanaksız)")}<div style="height:10px"></div><svg class="chart" viewBox="0 0 320 110" role="img" aria-label="Toplantı ritmi"><line class="grid" x1="20" x2="310" y1="85" y2="85"/>${cadence.map((w,i)=>{const x=30+i*58,h=w[1]*60;return `<rect x="${x}" y="${85-h}" width="34" height="${h}" rx="3" fill="${w[1]===1?"var(--navy)":"var(--tint-12)"}"><title>${w[0]}. hafta</title></rect>${w[1]===0?`<rect x="${x}" y="25" width="34" height="60" rx="3" fill="none" stroke="var(--border-strong)" stroke-dasharray="4 3"/>`:""}<text x="${x+17}" y="100" text-anchor="middle">${w[0]}. hf</text>`;}).join("")}</svg><div class="muted">Hedef: 2 haftada 1 tutanaklı toplantı (38, 40, 42. haftalar). 40 ve 42 tutanaksız/yok.</div></div>
 </div>`;}

/* ---------- router / nav ---------- */
