#!/usr/bin/env node
/* Kullanım: node build.js <client-slug>   → dist/juris-panel-<client-slug>.html
   Şablon: src/template.html, veri: src/clients/<client-slug>.data.js */
const fs=require("fs"),path=require("path");
const slug=process.argv[2]; if(!slug){console.error("Kullanım: node build.js <client-slug>");process.exit(1);}
const tpl=fs.readFileSync(path.join(__dirname,"src/template.html"),"utf8");
const data=fs.readFileSync(path.join(__dirname,"src/clients",slug+".data.js"),"utf8");
const marker="/*__CLIENT_DATA__*/"; if(!tpl.includes(marker)){console.error("Şablonda marker yok");process.exit(1);}
const out=tpl.replace(marker,()=>data);
fs.mkdirSync(path.join(__dirname,"dist"),{recursive:true});
const dest=path.join(__dirname,"dist",`juris-panel-${slug}.html`); fs.writeFileSync(dest,out); console.log("yazıldı:",dest,(out.length/1024).toFixed(0)+" KB");
