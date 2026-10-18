const {JSDOM}=require('jsdom');
const fs=require('fs');
const html=fs.readFileSync(process.argv[2],"utf8").replace("</script>","window.__t={allItems,go,stats};</script>");
const errs=[];
const dom=new JSDOM(html,{runScripts:"dangerously",url:"https://example.org/",beforeParse(w){w.addEventListener('error',e=>errs.push(e.message));}});
const w=dom.window;
if(errs.length){console.log("LOAD ERRORS",errs);process.exit(1);}
const views=["home","insights","fn-PLAN","fn-İCRA","fn-DENETİM","fn-RAPORLAMA","as-A","as-B","as-C","as-D","as-E","as-F","ob-onboarding","ob-learn"].concat(w.__t.allItems().map(i=>i.id));
let bad=0;
for(const v of views){try{w.__t.go(v);const t=w.document.getElementById('view').textContent;const m=t.match(/undefined|NaN|\[object Object\]/g);if(m){console.log("BAD",v,m.slice(0,5));bad++;}}catch(e){console.log("ERR",v,e.message);bad++;}}
console.log("views checked",views.length,"bad",bad, "items",w.__t.allItems().length, "docs",w.__t.stats(w.__t.allItems()).total, "pct", w.__t.stats(w.__t.allItems()).pct);
