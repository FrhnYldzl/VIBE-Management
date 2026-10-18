/* node tools/smoke-test.js dist/juris-panel-<slug>.html — tüm görünümleri DOM taklidiyle render eder, undefined/NaN arar */
const fs=require("fs");const file=process.argv[2];const s=fs.readFileSync(file,"utf8");
const js=s.split("<script>")[1].split("</script>")[0];
const els={};const mk=()=>({innerHTML:"",scrollTop:0,textContent:"",classList:{toggle(){},remove(){},add(){}},addEventListener(){},dataset:{}});
global.document={getElementById:id=>els[id]||(els[id]=mk()),querySelectorAll:()=>[],addEventListener(){}};
global.localStorage={getItem:()=>null,setItem(){}};global.location={hash:""};global.history={replaceState(){}};
const test=`
const __bad=[];const __views=["home","insights","fn-PLAN","fn-İCRA","fn-DENETİM","fn-RAPORLAMA","ob-onboarding","ob-learn",...allItems().map(i=>i.id)];
for(const v of __views){current=v;render();if(/undefined|NaN/.test(document.getElementById("view").innerHTML))__bad.push(v);}
for(const t of "ABCDEF")for(const e of ["Qervan","WeTrade","Konsolide"]){assessEnt=e;current="as-"+t;render();if(/undefined|NaN/.test(document.getElementById("view").innerHTML))__bad.push("as-"+t+"/"+e);}
if(__bad.length){console.error("SORUN:",__bad.join(", "));process.exit(1);}console.log("OK —",__views.length+18,"görünüm temiz");`;
eval(js+"\n"+test);
