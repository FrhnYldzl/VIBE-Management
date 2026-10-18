/* ---------- state ---------- */
const STATUS={done:"Tamamlandı",review:"Onay Bekliyor",progress:"Devam Ediyor",input:"Girdi Bekleniyor",pending:"Başlamadı"};
const CYCLE=["pending","input","progress","review","done"];
const LS="juris-panel:"+CLIENT.id;
let overrides={}; try{overrides=JSON.parse(localStorage.getItem(LS)||"{}");}catch(e){overrides={};}
let current="home", assessTab="A", assessEnt="Onscala";
try{assessTab=localStorage.getItem(LS+":atab")||"A";assessEnt=localStorage.getItem(LS+":aent")||"Onscala";}catch(e){}
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
