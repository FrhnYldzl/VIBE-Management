/* ORTAK ÇEKİRDEK: durum yönetimi, yardımcılar, Genel Bakış / Fonksiyon / Data Room görünümleri – müvekkilden bağımsız */
/* ---------- state ---------- */
const STATUS={done:"Tamamlandı",review:"Onay Bekliyor",progress:"Devam Ediyor",input:"Girdi Bekleniyor",pending:"Başlamadı"};
const CYCLE=["pending","input","progress","review","done"];
const LS="juris-panel:"+CLIENT.id;
let overrides={}; try{overrides=JSON.parse(localStorage.getItem(LS)||"{}");}catch(e){overrides={};}
let current="home", assessTab="A", assessEnt="Dynamics";
try{assessTab=localStorage.getItem(LS+":atab")||"A";assessEnt=localStorage.getItem(LS+":aent")||"Dynamics";}catch(e){}
const openSections=new Set(["A","E"]);
const allItems=()=>DATAROOM.flatMap(s=>s.items.map(it=>({...it,section:s})));
const docKey=(it,i)=>it.id+":"+i;
const stOf=(it,i)=>overrides[docKey(it,i)]||it.docs[i].status;
function setStatus(it,i,s){overrides[docKey(it,i)]=s;try{localStorage.setItem(LS,JSON.stringify(overrides));}catch(e){}}
function stats(items){const c={done:0,review:0,progress:0,input:0,pending:0,total:0};items.forEach(it=>it.docs.forEach((d,i)=>{c[stOf(it,i)]++;c.total++;}));c.pct=c.total?Math.round(100*(c.done+.5*(c.review+c.progress))/c.total):0;return c;}
const esc=s=>String(s??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
function bar(c){const w=k=>c.total?(100*c[k]/c.total)+"%":"0%";return `<div class="bar"><i class="s-done" style="width:${w("done")}"></i><i class="s-review" style="width:${w("review")}"></i><i class="s-progress" style="width:${w("progress")}"></i><i class="s-input" style="width:${w("input")}"></i></div>`;}
const legend=`<div class="legend"><span><i style="background:var(--success)"></i>Tamamlandı</span><span><i style="background:var(--info)"></i>Onay bekliyor</span><span><i style="background:var(--warn)"></i>Devam ediyor</span><span><i style="background:var(--red-ink)"></i>Girdi bekleniyor</span><span><i style="background:var(--neutral)"></i>Başlamadı</span></div>`;
const li=a=>a.map(x=>`<li>${x}</li>`).join("");
const ghost=(t,cls="")=>`<div class="note ${cls}"><span>▲</span><div>${t}</div></div>`;
const shortTitle=t=>t.replace(/^[A-F][.\-]\d\.?\s*/,"");

function tiles(c){return `<div class="tiles">
  <div class="tile accent"><div class="l">Tamamlanma</div><div class="v num">${c.pct}<small>%</small></div><div style="margin-top:10px">${bar(c)}</div></div>
  <div class="tile"><div class="l">Toplam doküman</div><div class="v num">${c.total}</div><div class="d">${c.done} tamamlandı</div></div>
  <div class="tile"><div class="l">Onay bekliyor</div><div class="v num">${c.review}</div><div class="d">müvekkil yönetimi incelemesinde</div></div>
  <div class="tile"><div class="l">Devam ediyor</div><div class="v num">${c.progress}</div><div class="d">Juris üzerinde</div></div>
  <div class="tile"><div class="l">Girdi bekleniyor</div><div class="v num">${c.input}</div><div class="d">yönetim / mali müşavir / üretim ekibi</div></div>
  <div class="tile"><div class="l">Başlamadı</div><div class="v num">${c.pending}</div><div class="d">planlı</div></div></div>`;}

function docTable(it){return `<div class="tbl-wrap"><table><thead><tr><th>Doküman</th><th>Sorumlu</th><th>Durum</th><th>Drive</th></tr></thead><tbody>
 ${it.docs.map((d,i)=>{const s=stOf(it,i);return `<tr><td class="doc"><span class="no">${esc(d.no)}</span>${esc(d.t)}${d.ent?`<span class="ent">· ${esc(d.ent)}</span>`:""}</td><td class="owner">${esc(d.owner)}</td><td><button class="status ${s}" data-item="${it.id}" data-i="${i}" title="Durumu değiştirmek için tıklayın">${STATUS[s]}</button></td><td>${d.url?`<a class="linkbtn" href="${d.url}" target="_blank" rel="noopener">Aç ↗</a>`:`<span class="muted">—</span>`}</td></tr>`;}).join("")}
 </tbody></table></div>`;}
function areaCard(it){const c=stats([it]);return `<button class="card area" data-view="${it.id}"><div class="top"><span class="code">${esc(it.id.replace(/(\D)(\d)/,"$1.$2"))}</span><span class="ttl">${esc(shortTitle(it.title))}</span><span class="pct num">${c.pct}%</span></div>${bar(c)}<div class="foot"><span class="fnchip ${it.fn}">${it.fn}</span><span>${c.done}/${c.total} tamamlandı</span>${c.input?`<span>· ${c.input} girdi</span>`:""}${it.noFolder?`<span>· Drive klasörü yok</span>`:""}</div></button>`;}

/* ---------- views ---------- */
function viewHome(){
  const items=allItems(), c=stats(items);
  const fnCards=Object.keys(FUNCTIONS).map(k=>{const its=items.filter(i=>i.fn===k), cc=stats(its);return `<button class="card area" data-view="fn-${k}"><div class="top"><span class="code">${FUNCTIONS[k].k}</span><span class="ttl">${k}</span><span class="pct num">${cc.pct}%</span></div>${bar(cc)}<div class="foot"><span>${its.length} alt başlık</span><span>· ${cc.done}/${cc.total} doküman</span></div></button>`;}).join("");
  const attention=[]; items.forEach(it=>it.docs.forEach((d,i)=>{const s=stOf(it,i);if(s==="review"||s==="input")attention.push({it,d,s});}));
  const ob=onboardStats();
  return `<div class="page-h"><div><div class="eyebrow">Genel Bakış</div><h1>${esc(CLIENT.name)}</h1><p>Hizmet planının dört fonksiyonu, A–F Data Room sırası ve Durum Değerlendirmesi çıktıları tek ekranda. Danışmanlık başlangıcı: ${CLIENT.kickoff}.</p></div>
   <div class="right"><a class="btn" href="${CLIENT.planSheet}" target="_blank" rel="noopener">${esc(CLIENT.planLabel||"Hizmet Planı")} ↗</a><a class="btn primary" href="${CLIENT.driveRoot}" target="_blank" rel="noopener">Data Room ↗</a></div></div>
  ${tiles(c)}${legend}
  <div class="sec"><button class="card area" data-view="insights" style="flex-direction:row;align-items:center;gap:14px"><span class="code">◈</span><span class="ttl">Insights – iş planı metrikleri ve genel durum grafikleri</span><span class="pct">Aç →</span></button></div>
  <div class="sec"><div class="sec-h"><h2>Dayanak durumu</h2><span class="meta">Panellerin dokümana mı beyana mı dayandığı</span></div><div class="grid3">
   ${[["doc","Dokümana dayalı","green"],["beyan","Beyana dayalı",  "amber"],["none","Dayanak yok","red"]].map(([k,t,col])=>`<div class="card pad"><div class="row" style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:13.5px">${t}</b><span class="pill ${col}">${BASIS_COUNT[k].length}</span></div><ul style="margin:8px 0 0;padding-left:16px;font-size:12.5px;color:var(--ink-2)">${li(BASIS_COUNT[k])}</ul></div>`).join("")}
  </div></div>
  <div class="sec"><div class="sec-h"><h2>Fonksiyonlar</h2></div><div class="grid2">${fnCards}</div></div>
  <div class="sec"><div class="sec-h"><h2>Durum Değerlendirmesi</h2><span class="meta">Çıktı dokümanları kendi formatında</span></div><div class="grid3">${ASSESS_TABS.map(([k,t,fmt])=>`<button class="card area" data-view="as-${k}"><div class="top"><span class="code">${k}</span><span class="ttl">${t}</span></div><div class="foot"><span>${fmt}</span></div></button>`).join("")}</div></div>
  <div class="sec"><div class="sec-h"><h2>Data Room</h2><span class="meta">Drive klasör sırası</span></div>
   ${DATAROOM.filter(s=>!s.virtual).map(s=>`<div style="margin-bottom:14px"><div class="sec-h" style="margin-bottom:8px"><h2 style="font-size:15px;font-family:var(--font-body);font-weight:600">${esc(s.title)}</h2>${s.url?`<a class="linkbtn" href="${s.url}" target="_blank" rel="noopener">Klasör ↗</a>`:""}</div><div class="grid2">${s.items.map(areaCard).join("")}</div></div>`).join("")}</div>
  <div class="sec"><div class="sec-h"><h2>Onboard &amp; Learn</h2><span class="meta">Müvekkil gelişim seviyesi</span></div><div class="grid2">
   <button class="card area" data-view="ob-onboarding"><div class="top"><span class="code">OB</span><span class="ttl">Onboarding</span><span class="pct num">${ob.obPct}%</span></div>${bar({done:ob.obDone,review:0,progress:0,input:0,total:ob.obTotal})}<div class="foot"><span>${ob.obDone}/${ob.obTotal} adım</span></div></button>
   <button class="card area" data-view="ob-learn"><div class="top"><span class="code">LN</span><span class="ttl">Learn – rehber ve bilgi notları</span><span class="pct num">${ob.lnPct}%</span></div>${bar({done:ob.lnDone,review:ob.lnShared,progress:0,input:0,total:ob.lnTotal})}<div class="foot"><span>${ob.lnDone} özümsendi · ${ob.lnShared} paylaşıldı · ${ob.lnTotal} toplam</span></div></button>
  </div></div>
  <div class="sec"><div class="sec-h"><h2>Dikkat gereken kalemler</h2><span class="meta">Onay ve girdi bekleyenler</span></div><div class="card"><div class="tbl-wrap"><table><thead><tr><th>Doküman</th><th>Alt başlık</th><th>Kimden</th><th>Durum</th></tr></thead><tbody>
   ${attention.map(a=>`<tr><td class="doc">${esc(a.d.t)}${a.d.ent?`<span class="ent">· ${esc(a.d.ent)}</span>`:""}</td><td><button class="linkbtn" data-view="${a.it.id}">${esc(a.it.title)}</button></td><td class="owner">${esc(a.d.owner)}</td><td><span class="status ${a.s}">${STATUS[a.s]}</span></td></tr>`).join("")}
  </tbody></table></div></div></div>
  <div class="sec"><div class="sec-h"><h2>Çalışma ritmi</h2></div><div class="rhythm">${CLIENT.rhythm.map(r=>`<div class="r"><b>${r[0]}</b><span>${r[1]}</span></div>`).join("")}<div class="r"><b>${CLIENT.entities.length}</b><span>Tüzel kişilik${CLIENT.legacy?` · ${CLIENT.legacy.length} eski yapı`:""}</span></div></div></div>`;
}
function viewFn(k){
  const f=FUNCTIONS[k], items=allItems().filter(i=>i.fn===k), c=stats(items); const byArea={}; items.forEach(i=>{(byArea[i.area]=byArea[i.area]||[]).push(i);});
  return `<div class="page-h"><div><div class="eyebrow">Fonksiyon ${f.k}</div><h1>${k}</h1><p>${esc(f.desc)}</p></div></div>${tiles(c)}${legend}
  ${Object.keys(byArea).map(a=>`<div class="sec"><div class="sec-h"><h2>${esc(a)}</h2><span class="meta">${byArea[a].length} alt başlık</span></div><div class="grid2">${byArea[a].map(areaCard).join("")}</div></div>`).join("")}
  <div class="sec"><div class="sec-h"><h2>Tüm dokümanlar</h2><span class="meta">Durum çipine tıklayarak güncelleyin</span></div>
  ${items.map(it=>`<div class="card" style="margin-bottom:12px"><div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--divider);flex-wrap:wrap"><button class="linkbtn" data-view="${it.id}" style="font-weight:600;font-size:13.5px;color:var(--ink)">${esc(it.title)}</button><span class="muted num">${stats([it]).pct}%</span>${it.url?`<a class="linkbtn" href="${it.url}" target="_blank" rel="noopener" style="margin-left:auto">Klasör ↗</a>`:`<span class="muted" style="margin-left:auto">Drive klasörü yok</span>`}</div>${docTable(it)}</div>`).join("")}</div>`;
}
function viewItem(id){
  const it=allItems().find(i=>i.id===id); if(!it) return viewHome(); const c=stats([it]);
  return `<div class="page-h"><div><div class="eyebrow">${esc(it.section.title)} · <span class="fnchip ${it.fn}">${it.fn}</span></div><h1>${esc(it.title)}</h1><p>${esc(it.area)}</p></div>
   <div class="right"><button class="btn" data-view="as-${it.id[0]}">Durum Değerlendirmesi</button>${it.url?`<a class="btn primary" href="${it.url}" target="_blank" rel="noopener">Drive klasörü ↗</a>`:""}</div></div>
  ${tiles(c)}${legend}
  <div class="sec"><div class="grid2">
   <div class="card pad"><div class="sec-h" style="margin-bottom:10px"><h2 style="font-size:15px">İş akışı</h2></div><div class="flow">${it.flow.map((s,i)=>(i?`<em>→</em>`:"")+`<span>${esc(s)}</span>`).join("")}</div>${it.guide?`<div class="basis" style="margin-top:12px"><span class="pill blue">Rehber</span><span>${esc(it.guide[0])}. ${esc(it.guide[1])}</span>${it.guide[2]?`<a class="guide" href="${it.guide[2]}" target="_blank" rel="noopener">Aç ↗</a>`:`<span class="muted">henüz paylaşılmadı</span>`}</div>`:""}</div>
   <div class="card pad"><div class="sec-h" style="margin-bottom:10px"><h2 style="font-size:15px">Drive yapısı</h2></div>${it.noFolder?`<div class="muted">Data Room'da karşılık gelen klasör henüz açılmadı.</div>`:it.subfolders?`<div class="folders">${it.subfolders.map(s=>`<a class="folder ${s[2]?"empty":""}" href="${s[1]}" target="_blank" rel="noopener">▸ ${esc(s[0])}${s[2]?" · boş":""}</a>`).join("")}</div>`:it.empty?`<div class="muted">Klasör açıldı, henüz doküman yüklenmedi.</div>`:`<div class="muted">Dokümanlar doğrudan klasörde.</div>`}</div>
  </div></div>
  ${it.empty||it.noFolder?ghost(`<b>Bu alt başlıkta henüz çıktı yok.</b> İlk adım: ${esc(it.docs[0].t)} (${esc(it.docs[0].owner)}).`):""}
  <div class="sec"><div class="sec-h"><h2>Dokümanlar</h2><span class="meta">Hizmet planı doküman haritası</span></div><div class="card">${docTable(it)}</div></div>`;
}

/* =========================================================
   DURUM DEĞERLENDİRMESİ — veri (Zyrone)
   ========================================================= */
