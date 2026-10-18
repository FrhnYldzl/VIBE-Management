/* ORTAK: router, navigasyon, olay dinleyicileri, başlatma */
/* ---------- router / nav ---------- */
function crumbFor(v){const n=`<b>${esc(CLIENT.name)}</b>`;if(v==="home")return n+" · Genel Bakış";if(v==="insights")return n+" · Genel Bakış · Insights";if(v.startsWith("fn-"))return n+" · Fonksiyonlar · "+v.slice(3);if(v.startsWith("as-"))return n+" · Durum Değerlendirmesi · "+v.slice(3);if(v==="ob-onboarding")return n+" · Onboard &amp; Learn · Onboarding";if(v==="ob-learn")return n+" · Onboard &amp; Learn · Learn";const it=allItems().find(i=>i.id===v);return it?n+` · Data Room · ${esc(it.section.title)} · ${esc(it.title)}`:n;}
function render(){const v=current,el=document.getElementById("view");
 el.innerHTML=v==="home"?viewHome():v.startsWith("fn-")?viewFn(v.slice(3)):v.startsWith("as-")?viewAssess(v.slice(3)):v==="insights"?viewInsights():v==="ob-onboarding"?viewOnboard():v==="ob-learn"?viewLearn():viewItem(v);
 document.getElementById("crumb").innerHTML=crumbFor(v);renderNav();}
function hashFor(v){return v.startsWith("fn-")?"fn"+FUNCTIONS[v.slice(3)].k:v.replace(/[^\w\-]/g,"");}
function go(v){current=v;try{history.replaceState(null,"","#"+hashFor(v));}catch(e){}render();document.getElementById("main").scrollTop=0;closeNav();}
function renderNav(){const items=allItems();
 document.getElementById("clientBox").innerHTML=`<div class="lbl">Müvekkil</div><div class="cname">${esc(CLIENT.name)}</div><div class="ents">${CLIENT.entities.map(e=>`<span class="ent">${esc(e)}</span>`).join("")}</div>`;
 document.getElementById("fnNav").innerHTML=Object.keys(FUNCTIONS).map(k=>{const c=stats(items.filter(i=>i.fn===k));return `<button class="ni ${current==="fn-"+k?"active":""}" data-view="fn-${k}"><span class="k">${FUNCTIONS[k].k}</span><span class="t">${k}</span><span class="pct num">${c.pct}%</span></button>`;}).join("");
 document.getElementById("asNav").innerHTML=ASSESS_TABS.map(([k,t])=>`<button class="ni ${current==="as-"+k?"active":""}" data-view="as-${k}"><span class="k">${k}</span><span class="t">${t}</span></button>`).join("");
 document.getElementById("drNav").innerHTML=DATAROOM.filter(s=>!s.virtual).map(s=>{const open=openSections.has(s.id)||s.items.some(i=>i.id===current),c=stats(s.items);return `<button class="ni" data-toggle="${s.id}" aria-expanded="${open}"><span class="k">${s.id}</span><span class="t">${esc(s.title.replace(/^[A-F]\.\s*/,""))}</span><span class="pct num">${c.pct}%</span><svg class="chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3l5 5-5 5"/></svg></button><div class="sub-list ${open?"open":""}">${s.items.map(it=>{const cc=stats([it]),col=cc.pct===100?"var(--success)":cc.pct>0?"var(--warn)":"var(--nav-ink-3)";return `<button class="ni sub ${current===it.id?"active":""}" data-view="${it.id}"><span class="dot" style="background:${col}"></span><span class="t">${esc(shortTitle(it.title))}</span><span class="pct num">${cc.pct}%</span></button>`;}).join("")}</div>`;}).join("");
 const ob=onboardStats();document.getElementById("obNav").innerHTML=`<button class="ni ${current==="ob-onboarding"?"active":""}" data-view="ob-onboarding"><span class="k">OB</span><span class="t">Onboarding</span><span class="pct num">${ob.obPct}%</span></button><button class="ni ${current==="ob-learn"?"active":""}" data-view="ob-learn"><span class="k">LN</span><span class="t">Learn</span><span class="pct num">${ob.lnPct}%</span></button>`;
 document.querySelectorAll('.ni[data-view="home"]').forEach(b=>b.classList.toggle("active",current==="home"));document.querySelectorAll('.ni[data-view="insights"]').forEach(b=>b.classList.toggle("active",current==="insights"));}
document.addEventListener("click",e=>{
 const en=e.target.closest("[data-ent]");if(en){assessEnt=en.dataset.ent;try{localStorage.setItem(LS+":aent",assessEnt);}catch(x){}const y=document.getElementById("main").scrollTop;render();document.getElementById("main").scrollTop=y;return;}
 const v=e.target.closest("[data-view]");if(v){go(v.dataset.view);return;}
 const t=e.target.closest("[data-toggle]");if(t){const id=t.dataset.toggle;openSections.has(id)?openSections.delete(id):openSections.add(id);renderNav();return;}
 const s=e.target.closest("button.status[data-item]");if(s){const it=allItems().find(i=>i.id===s.dataset.item),i=+s.dataset.i,cur=stOf(it,i);setStatus(it,i,CYCLE[(CYCLE.indexOf(cur)+1)%CYCLE.length]);const y=document.getElementById("main").scrollTop;render();document.getElementById("main").scrollTop=y;return;}
});
const navEl=document.getElementById("nav"),scrim=document.getElementById("scrim");
function closeNav(){navEl.classList.remove("open");scrim.classList.remove("open");}
document.getElementById("menuBtn").addEventListener("click",()=>{navEl.classList.toggle("open");scrim.classList.toggle("open");});
scrim.addEventListener("click",closeNav);
document.getElementById("today").textContent=new Date().toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"});
const h=(location.hash||"").slice(1);
if(/^fn\d$/.test(h)){const k=Object.keys(FUNCTIONS).find(k=>FUNCTIONS[k].k===h[2]);if(k)current="fn-"+k;}
else if(/^as-[A-F]$/.test(h)||h==="home"||h==="insights"||h==="ob-onboarding"||h==="ob-learn"||allItems().some(i=>i.id===h))current=h;
render();
