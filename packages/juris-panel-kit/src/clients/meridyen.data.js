/* =========================================================
   PORTFÖY ŞİRKETİ VERİSİ — meridyen · INTAKE-LITE TASLAĞI
   Kaynak: Drive Data Room taraması · 2026-10-22T09:00:00.000Z · 0 dosya / 0 alt klasör
   Bu dosya tools/intake.js tarafından üretildi; metinler MTFG tarafından doldurulacak.
   ========================================================= */

const CLIENT = {
  id:"meridyen", name:"Meridyen", startLabel:"MTFG VCP Projesi · Gate 0 · panel 22.10.2026",
  portfolio:{"tur":"VCP Projesi","kategori":"Yatırım","pay":100,"digerleri":"—","rol":"VCP","gate":"Gate 0","not":"Finansal varlık yönetimi aracı · Meridyen API (v2 yol haritası)"},
  entities:["Meridyen (API · VCP projesi)"], short:["Meridyen"],
  driveRoot:"https://drive.google.com/drive/folders/1DK1NzgJ_-kS5kPfV5r3SjPcY2yFul2o5",
  planSheet:"https://drive.google.com/drive/folders/1DK1NzgJ_-kS5kPfV5r3SjPcY2yFul2o5", planLabel:"Değer Yaratma Planı (hazırlanacak)",
  dataDate:"2026-10-22", kickoff:"2026-10-22", rhythm:[["Aylık","Yönetim toplantısı + raporlama (kurulacak)"],["Haftalık","Doküman teslim ve girdi takibi"],["Talep bazlı","Dosya bazlı görüş"]],
  startDocs:[["DR","Drive Data Room A–F açılışı ve ilk tarama (Intake-lite)","2026-10-22"],["Ç1","Hizmet Teklifi (yüklenecek)","—"],["Ç2","Danışmanlık Sözleşmesi (yüklenecek)","—"]],
  scopeIn:["Şirket Stratejisinin Analizi ve Geliştirilmesi","Hukuki Denetim ve Risk Analizi","Şirket İçi Hukuki Süreçlerin Geliştirilmesi","Kurumsal Yönetim ve Organizasyon Yapısının Geliştirilmesi","Uyuşmazlık ve Hukuki Süreç Danışmanlığı"],
  scopeOut:["İdari, ceza ve vergi davaları","Uluslararası tahkim","Birleşme ve devralma işlemlerinin yürütülmesi","Ruhsat, lisans, izin ve sertifika","Halka arz ve sermaye piyasası","Marka tescil / itiraz işlemleri","Mali yapı, finansman ve teşvik danışmanlığı (EK-1 ile ayrıca)"],
  contacts:{"Şirket Yönetimi":"teyit edilecek","Mali Müşavir":"teyit edilecek","MTFG":"Ferhan Yıldızlı · Gülşah Algın"},
};

const FUNCTIONS = {
  PLAN:{k:"1",title:"PLAN",desc:"Strateji ve kurumsal yapılandırma: iş modeli, iş planı, yönetişim, yatırımcı hazırlığı."},
  "İCRA":{k:"2",title:"İCRA",desc:"Sözleşme danışmanlığı ve şirket içi hukuki süreçler: ana faaliyet sözleşmeleri, İK, KVKK, projeler."},
  "DENETİM":{k:"3",title:"DENETİM",desc:"Hukuki durum tespiti (DD): belge seti, risk haritası, muhasebe ve mali denetim girdileri."},
  RAPORLAMA:{k:"4",title:"RAPORLAMA",desc:"Finansal raporlama ve iletişim: bütçe, nakit, bilanço; toplantı → tutanak → aksiyon döngüsü."},
};
const D="https://docs.google.com/document/d/", S="https://docs.google.com/spreadsheets/d/", P="https://docs.google.com/presentation/d/", F="https://drive.google.com/drive/folders/", FL="https://drive.google.com/file/d/";
const doc=(no,t,owner,status,url,ent)=>({no,t,owner,status,url,ent});
const O={J:"MTFG",JM:"MTFG → Şirket Yönetimi",M:"Şirket Yönetimi",SM:"Mali Müşavir",YK:"YK (Yönetim Kurulu)",TE:"Yazılım / Operasyon Ekibi",O:"Ortak"};
const U={ root:"https://drive.google.com/drive/folders/1DK1NzgJ_-kS5kPfV5r3SjPcY2yFul2o5" };

const DATAROOM = [
 { id:"A", title:"A. Strateji ve Business", url:"", items:[
   { id:"A1", title:"A.1. Strateji ve Business", fn:"PLAN", area:"Strateji ve Kurumsal Yapılandırma", url:"", empty:true, noFolder:true, flow:["Klasör açılır","Şirket Yönetimi yükler","Juris inceler"], docs:[
     doc("—","Drive'da klasör yok — açılacak",O.J,"pending") ]}
 ]},
 { id:"B", title:"B. Finans", url:"", items:[
   { id:"B1", title:"B.1. Finans", fn:"RAPORLAMA", area:"Finansal Raporlama", url:"", empty:true, noFolder:true, flow:["Klasör açılır","Şirket Yönetimi yükler","Juris inceler"], docs:[
     doc("—","Drive'da klasör yok — açılacak",O.J,"pending") ]}
 ]},
 { id:"C", title:"C. Muhasebe", url:"", items:[
   { id:"C1", title:"C.1. Muhasebe", fn:"DENETİM", area:"Muhasebe ve Mali Denetim", url:"", empty:true, noFolder:true, flow:["Klasör açılır","Şirket Yönetimi yükler","Juris inceler"], docs:[
     doc("—","Drive'da klasör yok — açılacak",O.J,"pending") ]}
 ]},
 { id:"D", title:"D. Operasyonlar", url:"", items:[
   { id:"D1", title:"D.1. Operasyonlar", fn:"İCRA", area:"Operasyon ve Sözleşmeler", url:"", empty:true, noFolder:true, flow:["Klasör açılır","Şirket Yönetimi yükler","Juris inceler"], docs:[
     doc("—","Drive'da klasör yok — açılacak",O.J,"pending") ]}
 ]},
 { id:"E", title:"E. Hukuk", url:"", items:[
   { id:"E1", title:"E.1. Hukuk", fn:"DENETİM", area:"Hukuki Durum Tespiti (DD)", url:"", empty:true, noFolder:true, flow:["Klasör açılır","Şirket Yönetimi yükler","Juris inceler"], docs:[
     doc("—","Drive'da klasör yok — açılacak",O.J,"pending") ]}
 ]},
 { id:"F", title:"F. İletişim", url:"", items:[
   { id:"F1", title:"F.1. İletişim", fn:"RAPORLAMA", area:"İletişim ve Raporlama", url:"", empty:true, noFolder:true, flow:["Klasör açılır","Şirket Yönetimi yükler","Juris inceler"], docs:[
     doc("—","Drive'da klasör yok — açılacak",O.J,"pending") ]}
 ]}
];

const BASIS_COUNT={doc:[],beyan:[],none:["A · İş modeli ve OKR (taslak)","B · Finans tabloları","C · Mali disiplin esasları","D · Faaliyet ve süreç haritası","E · DD checklist ve risk haritası","F · Toplantı döngüsü"]};

const ASSESS_TABS=[["A","Strateji ve Business","Kanvas · Pay yapısı · OKR · Org şeması · RACI"],["B","Finans","Trend · Bütçe · Nakit · Finansman · Bilanço"],["C","Muhasebe","Hesap planı · Mizan · Finansal disiplin"],["D","Operasyonlar","Gelir faaliyetleri · Süreç haritası · Projeler"],["E","Hukuk","DD · Sözleşme · İK · NDA · KVKK · Uyuşmazlık · Risk"],["F","İletişim","Toplantı döngüsü · Aksiyonlar · Mailler"]];
const SRC={ drive:{t:"Drive Data Room taraması · 2026-10-22 · 0 dosya / 0 alt klasör",u:"https://drive.google.com/drive/folders/1DK1NzgJ_-kS5kPfV5r3SjPcY2yFul2o5",k:"none"}, beyan:{t:"Toplantı / yazışma beyanı – belge bekleniyor",k:"beyan"}, none:{t:"Henüz doküman yok – Intake-lite taslağı",k:"none"} };
const ENTS=["Meridyen"];
const BMC={ "Meridyen":{kp:["Kilit ortaklar – teyit edilecek"],ka:["Ana faaliyetler – teyit edilecek"],kr:["Kilit kaynaklar – teyit edilecek"],vp:["Değer önerisi – İş Modeli Soru Seti ile netleşecek"],cr:["Müşteri ilişkisi – teyit edilecek"],ch:["Kanallar – teyit edilecek"],cs:["Müşteri segmentleri – teyit edilecek"],co:["Maliyet yapısı – mali tablolar sonrası"],rs:["Gelir akışları – mali tablolar sonrası"]} };
const LEAN={ "Meridyen":{pr:["Problem – soru setiyle"],so:["Çözüm – soru setiyle"],km:["Kilit metrikler – bütçe ile"],vp:["Benzersiz değer önerisi"],ua:["Haksız avantaj"],ch:["Kanallar"],cs:["Müşteri segmentleri"],co:["Maliyet yapısı"],rs:["Gelir akışları"]} };
const OKR={ "Meridyen":[
  {t:"Bütçe",o:"Finansal görünürlük: mali tablolar, bütçe, nakit akışı",kr:[["Son dönem mali tablolar ve mizan Data Room'da","tablo seti",0],["Yıllık bütçe","bütçe",0],["Aylık nakit akışı","tablo",0]]},
  {t:"Satış Planı",o:"Gelirin sözleşme dayanağı",kr:[["Ana müşteri / satış sözleşme seti","set",0],["Fiyatlandırma ve teklif formatı","format",0]]},
  {t:"Pazarlama Planı",o:"Marka ve pazar konumu",kr:[["Marka tescil durumu","liste",0],["Pazarlama planı ve KPI","plan",0]]},
  {t:"Operasyon ve Ürün",o:"Süreç ve İK altyapısı",kr:[["Görev tanımları ve RACI","matris",0],["İK doküman seti","set",0],["Aylık toplantı ve tutanak ritmi","aylık",0]]},
  {t:"İş Geliştirme",o:"Yatırıma / büyümeye hazırlık",kr:[["DD belge seti tamam","checklist",0],["Pay sahipliği ve yönetişim belgeleri","belge seti",0]]}] };
const RACI={roles:["Genel Kurul","YK / Şirket Yönetimi","Operasyon Ekibi","Mali Müşavir","MTFG"],rows:[["Stratejik plan ve bütçe","A","R","C","C","C"],["Sermaye, pay devri, ortaklık yapısı","A","R","I","C","R"],["Ana faaliyet sözleşmeleri","I","A","C","x","R"],["İK sözleşmeleri ve politikalar","I","A","C","C","R"],["KVKK ve uyum","I","A","R","x","R"],["DD belge yükleme (Data Room)","I","A","R","R","C"]]};
const FIN={ "Meridyen":{years:["2025","2026","2027E"],revenue:[null,null,null],range:[null,null,null],note:"Mali tablo, bütçe veya ciro verisi Data Room'da henüz yok (Intake-lite taslağı)."} };
const FINSTRUCT=[["Ödenmiş sermaye","Pay sahipleri","Belge bekleniyor","input"],["Banka hesapları ve krediler","Bankalar","Belge bekleniyor","input"],["Teminat, kefalet, taahhüt","—","Beyan alınacak","pending"],["Teşvik ve destekler","Kamu kurumları","Beyan alınacak","pending"]];
const REVACT={ "Meridyen":[["Ana faaliyet – teyit edilecek",0,"Gelir niteliği ve sözleşme dayanağı belirlenecek","Ana"]] };
const VALPROC={ "Meridyen":["Teklif / sipariş","Sözleşme","Üretim / hizmet","Teslim","Fatura · tahsilat","Muhasebe kaydı","Raporlama","Arşiv · saklama"] };
const PROJECTS=[{t:"Hukuki durum tespiti (DD) ve Data Room tamamlama",ent:"Meridyen",st:1,res:"Data Room A–F taraması · belge talepleri",bud:"Sözleşme kapsamında",ret:"Belgeli, yatırıma hazır şirket",due:"Belge seti"}];
const DD={ "Meridyen":[["1. Şirket Kayıtları ve Kurumsal Yönetim",["Esas sözleşme ve tadiller","Ticaret sicil gazeteleri","YK karar defteri","Pay defteri","Genel kurul defteri","İmza sirküleri","Pay sahipliği sözleşmesi"],"Şirket Yönetimi"],["2. Lisanslar, İzinler, Regülasyon",["Faaliyet izinleri ve ruhsatlar","Sektörel uyum belgeleri"],"Şirket Yönetimi"],["3. Kredi, Finansman ve Teminatlar",["Banka sözleşmeleri","Kredi ve teminat belgeleri","Vergi ve SGK borcu yoktur yazıları"],"Mali Müşavir"],["4. Sözleşmeler ve Ticari İlişkiler",["Müşteri sözleşmeleri","Tedarikçi sözleşmeleri","Kira sözleşmeleri","NDA'lar"],"Şirket Yönetimi"],["5. Çalışanlar ve İnsan Kaynakları",["İş sözleşmeleri","Bordro ve SGK kayıtları","İK politikaları"],"Şirket Yönetimi"],["6. Gayrimenkul ve Malvarlığı",["Tapu / kira kayıtları","Demirbaş listesi"],"Şirket Yönetimi"],["7. BT, Veri Koruma ve FM",["Marka ve patent kayıtları","Domain ve yazılım envanteri","KVKK envanteri ve VERBİS"],"Operasyon Ekibi"],["8. Sigorta ve Risk Transferi",["Sigorta poliçeleri"],"Şirket Yönetimi"],["9. Uyuşmazlık ve Takipler",["Derdest dava / icra listesi","İhtarnameler"],"Şirket Yönetimi"]] };
const DD_DONE={ "Meridyen":[] };
const CONTRACTS=[];
const RISKS=[];
const MEETINGS=[];
const ACTIONS=[["MTFG","Data Room A–F taraması ve ilk panel taslağı (Intake-lite)","Yüksek","Panel","done"],["Şirket Yönetimi","DD belge setinin Data Room'a yüklenmesi","Kritik","Belge seti","input"],["MTFG","İş Modeli Bilgi Notu + Soru Seti","Yüksek","Soru seti","pending"],["MTFG","Hizmet planı ve doküman haritasının onayı","Yüksek","Plan","pending"]];
const DECISIONS=[["DD yöntemi","Data Room A–F + DD checklist (9 başlık)","done"],["Toplantı ritmi","Aylık yönetim toplantısı + tutanak — tarih belirlenecek","pending"]];
const MAILS=[];
const DRIVE_META={"scannedAt":"2026-10-22T09:00:00.000Z","files":0,"folders":0,"root":"https://drive.google.com/drive/folders/1DK1NzgJ_-kS5kPfV5r3SjPcY2yFul2o5"};

const E0="Meridyen";
const intakeNote=(t)=>ghost(t||"Bu bölüm <b>Intake-lite taslağıdır</b>: Drive Data Room taramasından otomatik kuruldu. Metinler ve rakamlar şirket belgeleri ve soru setleri geldikçe MTFG tarafından doldurulur.","blue");
function assessA(){ return `${docH("A.1 İş Modeli Kanvası","Osterwalder – Business Model Canvas",SRC.none,"pending")}${intakeNote()}${canvas(BMC[E0])}
 ${docH("A.1 Lean Canvas","Ash Maurya – Lean Canvas",SRC.none,"pending")}${canvas(LEAN[E0],true)}
 ${docH("A.2 İş Planı – 5 bölüm × OKR","İş Planı · KR'lar şirket hedefleriyle dolacak",SRC.none,"pending")}${okrGrid(OKR[E0])}
 ${docH("A.3 Yönetişim – Görev, Yetki ve Onay Matrisi","RACI (öneri)",SRC.none,"pending")}
 <div class="card"><div class="tbl-wrap"><table class="matrix"><thead><tr><th>Karar / İşlem</th>${RACI.roles.map(r=>`<th>${r}</th>`).join("")}</tr></thead><tbody>${RACI.rows.map(r=>`<tr><td>${r[0]}</td>${r.slice(1).map(c=>`<td><span class="rc ${c}">${c==="x"?"–":c}</span></td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="legend" style="padding:0 14px 12px"><span><i style="background:var(--navy)"></i>R Yürütür</span><span><i style="background:var(--red-ink)"></i>A Onaylar</span><span><i style="background:var(--info)"></i>C Danışılır</span><span><i style="background:var(--neutral)"></i>I Bilgilendirilir</span></div></div>
 ${docH("A.4 Yatırımcı Sunumu","Pitch Deck · DD ve iş modeli tamamlanınca",SRC.none,"pending")}
 <div class="slides">${["Kapak","Problem","Çözüm","Neden şimdi","Pazar","İş modeli","Çekiş","Ürün ve FM","Ekip ve pay yapısı","Uyum","Finansallar","Talep"].map((t,i)=>`<div class="slide"><b>${t}</b><span class="n">${String(i+1).padStart(2,"0")}</span></div>`).join("")}</div>`; }
function assessB(){ const fin=FIN[E0]; const row=(l,vals,cls="")=>`<tr class="${cls}"><td>${l}</td>${vals.map(v=>`<td class="n ${v===""?"empty":""}">${v===""?"—":v}</td>`).join("")}</tr>`;
 return `${docH("B · Yıllara Sari Trend","Ciro trendi",SRC.none,"input")}${intakeNote("Drive'da finansal belge bulunmadı ya da henüz sınıflandırılmadı. Mali tablolar, mizan ve borç yoktur yazıları Mali Müşavir'den istenecek.")}
 <div class="grid2"><div class="card pad">${lbl(E0+" · Yıllık ciro (mn TL)")}${barChart(fin.years,fin.revenue,fin.range,"mn TL")}<div class="muted" style="margin-top:6px">${fin.note}</div></div>
 <div class="card pad">${lbl("Bilinen finansal parametreler")}<div class="tbl-wrap" style="margin-top:8px"><table class="fin" style="min-width:0"><tbody>${row("Sermaye",["belge bekleniyor"])+row("Kredi / teminat",["beyan alınacak"])+row("Ciro / bütçe hedefi",["iletilmedi"],"sum")}</tbody></table></div></div></div>
 ${docH("B.1 Bütçe","Yıllık bütçe (format ${O.J}'ten, içerik Yönetim + Mali Müşavir'den)",SRC.none,"input")}
 <div class="card"><div class="tbl-wrap"><table class="fin"><thead><tr><th>Kalem</th><th style="text-align:right">Cari yıl</th><th style="text-align:right">Gelecek yıl</th><th style="text-align:right">Not</th></tr></thead><tbody>${row("Toplam gelir",["","",""],"sum")+row("Toplam gider",["","",""],"sum")+row("Faaliyet kârı / zararı",["","",""],"sum")}</tbody></table></div></div>
 ${docH("B.4 Finansman ve Sermaye Yapısı","Sermaye · banka · teminat · teşvik",SRC.none,"input")}
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>Araç</th><th>Muhatap</th><th>Durum</th><th></th></tr></thead><tbody>${FINSTRUCT.map(s=>`<tr><td><b>${s[0]}</b></td><td style="color:var(--ink-2)">${s[1]}</td><td class="muted">${s[2]}</td><td><span class="status ${s[3]}">${STATUS[s[3]]}</span></td></tr>`).join("")}</tbody></table></div></div>`; }
function assessC(){ return `${docH("C.0 Finansal Disiplin Esasları","Mali yönetim kuralları – önerilen çerçeve",SRC.none,"pending")}
 <div class="check">${[["1 · Kurumsal kayıt",["YK kararları yazılı ve karar defterinde","Faaliyet raporu","Pay defteri güncel"]],["2 · Faaliyet bazlı kayıt",["Gelir/gider ayrımı","Maliyet merkezleri"]],["3 · Sermaye ve finansman",["Sermaye ödeme kaydı","Ortak cari hesapları"]],["4 · Ekip ve ödemeler",["İş sözleşmesi vs hizmet faturası","SGK bildirimleri"]],["5 · Varlık ve FM",["Demirbaş listesi","Marka / domain envanteri"]],["6 · Raporlama",["Aylık mizan ve nakit raporu","Vergi / SGK borç yoktur (çeyreklik)"]]].map(([g,items])=>`<div class="grp"><h5>${g}<span>0/${items.length}</span></h5><ul>${items.map(it=>`<li><i></i>${it}</li>`).join("")}</ul></div>`).join("")}</div>
 ${intakeNote()}
 ${docH("C.2 Mizan","Aylık mizan özeti",SRC.none,"input")}
 <div class="card"><div class="tbl-wrap"><table class="fin"><thead><tr><th>Hesap</th><th style="text-align:right">Borç</th><th style="text-align:right">Alacak</th></tr></thead><tbody>${["100 Kasa","102 Bankalar","120 Alıcılar","320 Satıcılar","360 Ödenecek Vergi","500 Sermaye","600 Yurt İçi Satışlar","770 Genel Yönetim Giderleri"].map(h=>`<tr><td>${h}</td><td class="n empty">—</td><td class="n empty">—</td></tr>`).join("")}</tbody></table></div></div>`; }
function assessD(){ return `${docH("D.1a Gelir Getiren Faaliyetler","Bütçeye esas iş türleri",SRC.none,"input")}
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>İş türü</th><th style="min-width:160px">Ciro payı</th><th>Gelir niteliği</th><th>Konum</th></tr></thead><tbody>${REVACT[E0].map(r=>`<tr><td><b>${r[0]}</b></td><td><div style="display:flex;align-items:center;gap:8px"><div class="bar" style="flex:1"><i class="s-done" style="width:${r[1]}%;background:var(--navy)"></i></div><span class="num muted" style="min-width:34px;text-align:right">${r[1]?"%"+r[1]:"—"}</span></div></td><td style="color:var(--ink-2)">${r[2]}</td><td><span class="pill blue">${r[3]}</span></td></tr>`).join("")}</tbody></table></div></div>
 ${intakeNote()}
 ${docH("D.1b Değer Yaratan Süreç Haritası","Standart süreç zinciri · şirkete göre uyarlanacak",SRC.none,"pending")}
 <div class="card pad"><div class="proc">${VALPROC[E0].map((s,i)=>`<div class="st"><b>${String(i+1).padStart(2,"0")}</b>${s}</div>`).join("")}</div></div>
 ${docH("D.2 Projeler","Aşama · kaynak · bütçe · beklenen getiri",SRC.none,"progress")}
 <div class="grid2">${PROJECTS.map(p=>`<div class="card pad"><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline"><b style="font-size:13.5px">${p.t}</b><span class="pill">${p.ent}</span></div><div style="margin:10px 0">${stagesEl(p.st)}</div><dl class="kv" style="display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:12.5px;margin:0"><dt class="muted">Kaynak</dt><dd style="margin:0">${p.res}</dd><dt class="muted">Bütçe</dt><dd style="margin:0">${p.bud}</dd><dt class="muted">Beklenen getiri</dt><dd style="margin:0">${p.ret}</dd><dt class="muted">Hedef</dt><dd style="margin:0" class="num">${p.due}</dd></dl></div>`).join("")}</div>`; }
function assessE(){ const dd=ddList(E0);
 return `${docH("E-1 Due Diligence Belge Checklist","DD asgari inceleme · 9 başlık",SRC.drive,"input",`<span class="pill">${dd.ok}/${dd.tot}</span>`)}${dd.html}
 ${intakeNote("Checklist standart A.Ş. setidir; Drive'daki dosyalar doküman satırlarında 'Onay Bekliyor' olarak listelendi, ${O.J} inceleyip işaretler.")}
 ${docH("E-2 Ana Faaliyet Sözleşme Seti","Sözleşme matrisi",SRC.none,"pending")}
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>Sözleşme</th><th>Kapsam</th><th>Taraflar</th><th>Kapattığı risk</th><th>Durum</th></tr></thead><tbody>${CONTRACTS.length?CONTRACTS.map(r=>`<tr><td><b>${r[0]}</b></td><td style="color:var(--ink-2)">${r[1]}</td><td class="muted">${r[2]}</td><td><span class="pill red">${r[3]}</span></td><td><span class="status ${r[4]}">${STATUS[r[4]]}</span></td></tr>`).join(""):`<tr><td colspan="5" class="muted">Sözleşme envanteri Data Room D/E klasörlerinden çıkarılacak.</td></tr>`}</tbody></table></div></div>
 ${docH("E-6 KVKK Uyum","Mini KVKK checklist",SRC.none,"pending")}
 <div class="check">${[["Ön tespit",["VERBİS kayıt yükümlülüğü","Veri envanteri","Yurt dışı aktarım"]],["Doküman seti",["Aydınlatma metinleri","Açık rıza ve çerez","Saklama ve imha politikası"]]].map(([g,items])=>`<div class="grp"><h5>${g}<span>0/${items.length}</span></h5><ul>${items.map(it=>`<li><i></i>${it}</li>`).join("")}</ul></div>`).join("")}</div>
 ${docH("Bunları yapmazsak: Hukuki Risk Haritası","Olasılık × Etki (5×5)",SRC.none,"pending")}
 ${ghost("Risk kaydı DD mülakatı (Hukuki Bilgilendirme ve Risk Tespit Formu) sonrası doldurulur; harita o zaman renklenir.")}
 <div class="grid2" style="grid-template-columns:minmax(300px,1fr) minmax(300px,1.2fr)"><div class="card pad">${heatmap()}</div>
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>#</th><th>Yapılmazsa oluşan risk</th><th>Kapatan aksiyon</th><th>O×E</th></tr></thead><tbody>${RISKS.length?RISKS.slice().sort((a,b)=>b.p*b.i-a.p*a.i).map(r=>{const s=r.p*r.i;return `<tr><td style="font-family:var(--font-mono);font-size:11px">${r.id}</td><td><b>${r.t}</b></td><td style="color:var(--ink-2)">${r.ifnot}</td><td><span class="pill ${s>=16?"red":s>=10?"amber":s>=6?"blue":"green"}">${s}</span></td></tr>`;}).join(""):`<tr><td colspan="4" class="muted">Henüz risk kaydı yok.</td></tr>`}</tbody></table></div></div></div>`; }
function assessF(){ return `${docH("F-1 Toplantı Döngüsü","Gündem → Toplantı → Tutanak + Aksiyon → Sonraki gündem",SRC.none,"pending")}
 <div class="card pad"><div class="flow">${["Gündem","Toplantı","Tutanak + Aksiyon","Teslim edilen / edilemeyen","Sonraki gündem"].map((s,i)=>(i?`<em>→</em>`:"")+`<span>${s}</span>`).join("")}</div></div>
 ${intakeNote("Toplantı kaydı yok; aylık yönetim toplantısı ritmi kurulunca tutanaklar F klasöründen bu bölüme işlenir.")}
 ${MEETINGS.map(m=>`<div class="card" style="margin-top:12px"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:12px 16px"><span class="num" style="font-family:var(--font-mono);font-size:12px;color:var(--ink-3)">${m.d}</span><b style="font-size:13.5px">${m.t}</b><span class="muted">${m.who}</span></div></div>`).join("")}
 ${docH("Aksiyon Takibi","Sorumlu · öncelik · durum",SRC.drive,"progress")}
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>#</th><th>Sahibi</th><th>Aksiyon</th><th>Öncelik</th><th>Çıktı</th><th>Durum</th></tr></thead><tbody>${ACTIONS.map((r,i)=>`<tr><td class="num muted">${i+1}</td><td><b>${r[0]}</b></td><td>${r[1]}</td><td><span class="pill ${r[2]==="Kritik"?"red":r[2]==="Yüksek"?"amber":""}">${r[2]}</span></td><td style="color:var(--ink-2)">${r[3]}</td><td><span class="status ${r[4]}">${STATUS[r[4]]}</span></td></tr>`).join("")}</tbody></table></div></div>
 ${docH("Kararlar","Alınan ve bekleyen kararlar",SRC.none,"pending")}
 <div class="card"><div class="tbl-wrap"><table><thead><tr><th>Konu</th><th>Karar</th><th>Durum</th></tr></thead><tbody>${DECISIONS.map(r=>`<tr><td><b>${r[0]}</b></td><td style="color:var(--ink-2)">${r[1]}</td><td><span class="status ${r[2]}">${r[2]==="done"?"Karar alındı":"Karar bekliyor"}</span></td></tr>`).join("")}</tbody></table></div></div>
 ${docH("F-2 Mailler","Teslim / talep / hatırlatma kaydı",SRC.none,"pending")}
 <div class="card pad">${MAILS.length?MAILS.map(m=>`<div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 12px;font-size:12.5px;padding:8px 0;border-top:1px solid var(--divider);align-items:center"><span class="num" style="font-family:var(--font-mono);font-size:11px;color:var(--ink-3)">${m[0]}</span><span><b>${m[1]}</b> · ${m[2]}</span><span class="status ${m[3]}">${m[3]==="done"?"Gönderildi":"Planlı"}</span></div>`).join(""):`<div class="muted">Henüz mail kaydı yok.</div>`}</div>`; }
function viewInsights(){
 const items=allItems(), c=stats(items), ob=onboardStats(); const ents=CLIENT.short;
 const okrAvg=ent=>OKR[ent].map(o=>[o.t,Math.round(o.kr.reduce((a,k)=>a+k[2],0)/o.kr.length)]);
 const krTotal=ents.reduce((a,e)=>a+(OKR[e]||[]).reduce((x,o)=>x+o.kr.length,0),0);
 const dd=ddAll();
 const riskBands=[["Kritik (≥16)",RISKS.filter(r=>r.p*r.i>=16).length,"var(--red-ink)"],["Yüksek (10–15)",RISKS.filter(r=>{const s=r.p*r.i;return s>=10&&s<16;}).length,"var(--warn)"],["Orta (6–9)",RISKS.filter(r=>{const s=r.p*r.i;return s>=6&&s<10;}).length,"var(--info)"],["Düşük (<6)",RISKS.filter(r=>r.p*r.i<6).length,"var(--success)"]];
 const basis=[["Dokümana dayalı",BASIS_COUNT.doc.length,"var(--success)"],["Beyana dayalı",BASIS_COUNT.beyan.length,"var(--warn)"],["Dayanak yok",BASIS_COUNT.none.length,"var(--neutral)"]]; const basisTot=basis.reduce((a,b)=>a+b[1],0)||1;
 const owners={}; items.forEach(it=>it.docs.forEach((d,i)=>{if(stOf(it,i)==="input"){const k=d.owner.split(" / ")[0].split(" + ")[0];owners[k]=(owners[k]||0)+1;}}));
 return `<div class="page-h"><div><div class="eyebrow">Genel Bakış · Insights</div><h1>Insights</h1><p>Drive Data Room taramasından kurulan ilk panel. Rakamlar belge geldikçe dolar; ${O.J} inceleyip işaretler.</p></div><div class="right"><button class="btn" data-view="as-A">İş Planı OKR'ları</button><button class="btn" data-view="as-E">DD Checklist</button></div></div>
 ${CLIENT.portfolio?`${sec("MTFG portföy kaydı",CLIENT.portfolio.tur+(CLIENT.portfolio.gate?" · "+CLIENT.portfolio.gate:""))}<div class="tiles" style="margin-bottom:12px"><div class="tile accent"><div class="l">MTFG payı</div><div class="v num">${CLIENT.portfolio.pay==null?"—":"%"+String(CLIENT.portfolio.pay).replace(".",",")}</div><div class="d" style="color:rgba(255,255,255,.65)">${CLIENT.portfolio.rol}</div></div><div class="tile"><div class="l">Kategori</div><div class="v" style="font-size:18px">${CLIENT.portfolio.kategori}</div><div class="d">${CLIENT.portfolio.tur}</div></div><div class="tile" style="grid-column:span 2"><div class="l">Diğer paydaşlar</div><div class="d" style="font-size:13px;color:var(--ink-2);margin-top:6px">${CLIENT.portfolio.digerleri}</div><div class="d">${CLIENT.portfolio.not||""}</div></div></div>`:""}
 ${sec("A · Intake-lite taraması","Drive · "+DRIVE_META.scannedAt.slice(0,10))}
 <div class="tiles"><div class="tile accent"><div class="l">Drive dosyası</div><div class="v num">${DRIVE_META.files}</div><div class="d" style="color:rgba(255,255,255,.65)">${DRIVE_META.folders} alt klasör</div></div><div class="tile"><div class="l">Tüzel kişilik</div><div class="v num">${CLIENT.entities.length}</div><div class="d">${CLIENT.entities[0]}</div></div><div class="tile"><div class="l">Toplam KR</div><div class="v num">${krTotal}</div><div class="d">5 bölüm · hedefler iletilmedi</div></div><div class="tile"><div class="l">DD belge</div><div class="v num">${dd.ok}<small>/ ${dd.tot}</small></div><div class="d">checklist</div></div><div class="tile"><div class="l">Hizmet planı tamamlanma</div><div class="v num">${c.pct}<small>%</small></div><div style="margin-top:10px">${bar(c)}</div></div><div class="tile"><div class="l">Onboarding</div><div class="v num">${ob.obPct}<small>%</small></div><div class="d">rehber ${ob.lnPct}%</div></div></div>
 <div class="grid2" style="margin-top:12px">
  <div class="card pad">${lbl("Data Room bölümleri · doküman durumu")}<div style="height:10px"></div><div style="display:flex;flex-direction:column;gap:8px">${DATAROOM.map(sct=>stackRow(sct.title,stats(sct.items))).join("")}</div>${legend}</div>
  <div class="card pad">${lbl("Fonksiyonlar · tamamlanma")}<div style="height:10px"></div>${hbar(Object.keys(FUNCTIONS).map(k=>[k,stats(items.filter(i=>i.fn===k)).pct]))}<div style="height:16px"></div>${lbl("Dayanak dağılımı")}<div style="height:10px"></div>${hbar(basis.map(b=>[b[0],b[1],b[2],b[1]+" panel"]),basisTot)}</div>
  <div class="card pad">${lbl("Bölüm bazında KR ilerlemesi")}<div style="height:10px"></div>${hbar(okrAvg(E0))}</div>
  <div class="card pad">${lbl("Risk dağılımı · O×E bandı")}<div style="height:10px"></div>${hbar(riskBands.map(r=>[r[0],r[1],r[2],r[1]+" risk"]),Math.max(RISKS.length,1))}<div style="height:16px"></div>${lbl("Girdi bekleyen · sorumlu bazında")}<div style="height:10px"></div>${hbar(Object.entries(owners).sort((a,b)=>b[1]-a[1]).map(([k,v])=>[k,v,"var(--red-ink)",v+" kalem"]),Math.max(...Object.values(owners),1))}</div>
 </div>`; }
const ONBOARD=[["Drive Data Room A–F açılışı ve ilk tarama (Intake-lite)","2026-10-22",1],["Hizmet teklifi ve danışmanlık sözleşmesi","yüklenecek",0],["Hukuki Bilgilendirme ve Risk Tespit Formu (DD mülakatı)","planlanacak",0],["İş Modeli Bilgi Notu ve Soru Seti","gönderilecek",0],["DD belge setinin yüklenmesi","bekleniyor",0],["Aylık yönetim toplantısı ve rapor ritmi","kurulacak",0]];
const LEARN=[{no:"DD",t:"Due Diligence Asgari İnceleme Kılavuzu – A.Ş.",st:"planned",for:"E-1"},{no:"1",t:"İş Modeli Nedir ve Neden Analiz Edilir? – Bilgi Notu",st:"planned",for:"A.1"},{no:"DR",t:"Data Room Yapısı ve Kullanımı – A–F",st:"shared",for:"E-1"}];

