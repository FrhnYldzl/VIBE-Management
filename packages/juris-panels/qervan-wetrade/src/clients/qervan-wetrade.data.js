/* =========================================================
   MÜVEKKİL VERİSİ — QERVAN – WETRADE GRUP
   Bu dosya build.js ile src/template.html içindeki CLIENT_DATA işaretçisinin yerine gömülür.
   Yardımcılar (D, F, FL, doc, O) ve FUNCTIONS şablondan gelir.
   ========================================================= */

const CLIENT = {
  id:"qervan-wetrade", name:"QERVAN – WETRADE GRUP",
  entities:["Qervan Yazılım Teknoloji A.Ş.","WeTrade Dış Ticaret Ltd. Şti."], short:["Qervan","WeTrade"],
  driveRoot:"https://drive.google.com/drive/folders/1o_mTaK-m94G_dP_iaRal6RKCiTxXWqAg",
  planSheet:"https://docs.google.com/spreadsheets/d/1tZ1NhwTiqgvoMl6mt_eEAYstZlls6zt7yqOTSa8fT8/edit?gid=1679663399#gid=1679663399",
  kickoff:"15.09.2026", rhythm:[["2 haftada 1","Toplantı"],["Haftada 1","Doküman"],["Haftada 1","Arama"]],
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
