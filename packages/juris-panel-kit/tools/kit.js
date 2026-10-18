#!/usr/bin/env node
/* Juris Kurumsal Yönetim Paneli — tek kit araçları
 *
 *   node tools/kit.js template                 → src/template.html   (master'dan ortak kod)
 *   node tools/kit.js extract <html> <slug>    → src/clients/<slug>.data.js (müvekkil blokları)
 *   node tools/kit.js build <slug>             → dist/juris-panel-<slug>.html
 *   node tools/kit.js smoke <slug>             → tüm görünümleri render eder, undefined/NaN arar
 *   node tools/kit.js compare <slug> <eski.html> → görünüm bazında metin benzerliği (sadakat kontrolü)
 *   node tools/kit.js all [--deploy]           → her müvekkil için build + smoke (+ apps/ana-merkez/public'e kopya)
 *
 * İlke: tasarım ve ortak kod tek master'da (juris-kurumsal-yonetim-paneli_master.html, Zyrone tabanlı, 18.10.2026);
 * müvekkile göre yalnız veri blokları ve müvekkile özgü görünüm metinleri (assessA–F, viewInsights) değişir.
 */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const MASTER = path.join(ROOT, "juris-kurumsal-yonetim-paneli_master.html");
const MARKER = "/*__CLIENT_DATA__*/";

/* Ortak (template) tanımlar — bunların dışındaki her üst düzey tanım müvekkil verisidir */
const TEMPLATE_NAMES = new Set([
  "STATUS","CYCLE","LS","overrides","current","openSections","assessEnt","allItems","docKey","stOf","setStatus","stats",
  "esc","bar","legend","li","ghost","shortTitle","tiles","docTable","areaCard","viewHome","viewFn","viewItem",
  "basisLine","docH","entTabs","blk","docbar","canvas","okrGrid","barChart","STAGES","stagesEl","ddList","ddAll","heatmap",
  "assessHead","viewAssess","sec","lbl","LSTAT","onboardStats","viewOnboard","viewLearn","hbar","stackRow",
  "crumbFor","render","hashFor","go","renderNav","navEl","closeNav","h",
]);
const DECL = /^(?:const|let|var|function|async function)\s+([A-Za-z_$][\w$]*)/;

/* HTML → {head, blocks, tail}  (tek <script> bloğu varsayımı; master ve tüm dist paneller böyle) */
/* Panel HTML'inde tek <script> bloğu vardır; bazı eski çıktılarda sondaki </script> yinelenmiş olabilir → ilk kapanışı al */
function scriptBounds(html) {
  const a = html.indexOf("<script>"); const b = html.indexOf("</script>", a);
  if (a < 0 || b < 0) throw new Error("script bloğu yok");
  return [a, b];
}
function parse(html) {
  const [a, b] = scriptBounds(html);
  const head = html.slice(0, a + "<script>".length);
  const js = html.slice(a + "<script>".length, b);
  const tail = html.slice(b);
  const lines = js.split("\n");
  const blocks = []; let cur = { name: null, lines: [] };
  for (const line of lines) {
    const m = line.match(DECL);
    if (m) { blocks.push(cur); cur = { name: m[1], lines: [line] }; }
    else cur.lines.push(line);
  }
  blocks.push(cur);
  return { head, blocks, tail };
}
const isClient = (b) => b.name && !TEMPLATE_NAMES.has(b.name);

function makeTemplate() {
  const { head, blocks, tail } = parse(fs.readFileSync(MASTER, "utf8"));
  const out = [];
  let markerPlaced = false;
  for (const b of blocks) {
    if (isClient(b)) { if (!markerPlaced) { out.push(MARKER); markerPlaced = true; } continue; }
    out.push(...b.lines);
  }
  let js = out.join("\n")
    // müvekkile özgü varsayılanlar → CLIENT'tan
    .replace(/assessEnt="Dynamics"/g, "assessEnt=CLIENT.short[0]")
    .replace(/\|\|"Dynamics"/g, "||CLIENT.short[0]")
    .replace(/if\(!DD\[ent\]\)ent="Dynamics";/, "if(!DD[ent])ent=CLIENT.short[0];")
    .replace(/DURUM DEĞERLENDİRMESİ — veri \(Zyrone\)/, "DURUM DEĞERLENDİRMESİ — ortak yardımcılar (veri müvekkil dosyasında)")
    // onboarding başlık metası müvekkile özgü → CLIENT.startLabel
    .replace(/sec\("Hizmet başlangıcı dokümanları","Hizmet başlangıcı · Mart–Ekim 2026"\)/, 'sec("Hizmet başlangıcı dokümanları",CLIENT.startLabel||"Hizmet başlangıcı")');
  if (!/CLIENT\.startLabel/.test(js)) console.warn("UYARI: startLabel bağlanamadı");
  if (!/assessEnt=CLIENT\.short\[0\]/.test(js)) console.warn("UYARI: assessEnt varsayılanı bulunamadı");
  const title = head.replace(/<title>[^<]*<\/title>/, "<title>Juris Kurumsal Yönetim Paneli</title>");
  const html = title + js + tail;
  fs.mkdirSync(path.join(ROOT, "src"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "src", "template.html"), html);
  const leftover = ["Zyrone", "Dynamics", "Tactics", "Havelsan", "Roketsan"].map((w) => [w, (js.match(new RegExp(w, "g")) || []).length]).filter(([, n]) => n);
  console.log("template yazıldı:", (html.length / 1024).toFixed(0) + " KB", leftover.length ? "· müvekkil kalıntısı: " + leftover.map((x) => x.join("×")).join(", ") : "· kalıntı yok");
}

function extract(file, slug) {
  const html = fs.readFileSync(file, "utf8");
  const { blocks } = parse(html);
  const picked = blocks.filter(isClient);
  // Eski panellerde onboarding meta metni görünüm kodunda sabitti → CLIENT.startLabel olarak taşı
  const startLabel = (html.match(/sec\("Hizmet başlangıcı dokümanları","([^"]+)"\)/) || [])[1];
  const client = picked.find((b) => b.name === "CLIENT");
  if (startLabel && client && !/startLabel:/.test(client.lines.join("\n"))) {
    const i = client.lines.findIndex((l) => /^\s*id:"/.test(l));
    if (i >= 0) client.lines[i] = client.lines[i].replace(/^(\s*id:"[^"]+",)/, `$1 startLabel:${JSON.stringify(startLabel)},`);
  }
  const names = picked.map((b) => b.name);
  const banner = `/* =========================================================\n   MÜVEKKİL VERİSİ — ${slug}\n   Kaynak: ${path.basename(file)} · çıkarım: tools/kit.js extract · ${new Date().toISOString().slice(0, 10)}\n   Bu dosya build sırasında src/template.html içindeki CLIENT_DATA işaretçisinin yerine gömülür.\n   Bloklar: ${names.join(", ")}\n   ========================================================= */\n`;
  const body = picked.map((b) => b.lines.join("\n").replace(/\s+$/, "")).join("\n\n") + "\n";
  fs.mkdirSync(path.join(ROOT, "src", "clients"), { recursive: true });
  const dest = path.join(ROOT, "src", "clients", slug + ".data.js");
  fs.writeFileSync(dest, banner + body);
  console.log(`${slug}: ${names.length} blok →`, path.relative(ROOT, dest), (body.length / 1024).toFixed(0) + " KB");
  return names;
}

function build(slug) {
  const tpl = fs.readFileSync(path.join(ROOT, "src", "template.html"), "utf8");
  const data = fs.readFileSync(path.join(ROOT, "src", "clients", slug + ".data.js"), "utf8");
  if (!tpl.includes(MARKER)) throw new Error("şablonda marker yok");
  const title = (data.match(/name:"([^"]+)"/) || [])[1];
  let out = tpl.replace(MARKER, () => data);
  if (title) out = out.replace("<title>Juris Kurumsal Yönetim Paneli</title>", `<title>Juris Kurumsal Yönetim Paneli – ${title}</title>`);
  fs.mkdirSync(path.join(ROOT, "dist"), { recursive: true });
  const dest = path.join(ROOT, "dist", `juris-panel-${slug}.html`);
  fs.writeFileSync(dest, out);
  console.log("yazıldı:", path.relative(ROOT, dest), (out.length / 1024).toFixed(0) + " KB");
  return dest;
}

/* DOM taklidi ile tüm görünümleri render et; undefined / NaN / [object Object] ara */
function smoke(slug) {
  const file = path.join(ROOT, "dist", `juris-panel-${slug}.html`);
  const s = fs.readFileSync(file, "utf8");
  const [a, b] = scriptBounds(s);
  const js = s.slice(a + 8, b);
  const els = {};
  const mk = () => ({ innerHTML: "", scrollTop: 0, textContent: "", hidden: false, classList: { toggle() {}, remove() {}, add() {}, contains: () => false }, addEventListener() {}, dataset: {}, setAttribute() {}, getAttribute: () => null, querySelectorAll: () => [], querySelector: () => null, style: {} });
  const doc = { getElementById: (id) => els[id] || (els[id] = mk()), querySelectorAll: () => [], querySelector: () => mk(), addEventListener() {}, documentElement: mk(), body: mk(), createElement: mk };
  const sandbox = {
    document: doc, window: { addEventListener() {}, matchMedia: () => ({ matches: false, addEventListener() {} }) },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} }, location: { hash: "", href: "" }, history: { replaceState() {} },
    console, setTimeout: () => 0, requestAnimationFrame: () => 0, navigator: { userAgent: "" }, Intl, Date, Math, JSON, Object, Array, String, Number, RegExp, Map, Set, Promise, Error,
  };
  sandbox.window.document = doc; sandbox.globalThis = sandbox; sandbox.self = sandbox;
  const test = `
    const __bad=[]; const __ents=CLIENT.short.concat(CLIENT.short.length>1?["Konsolide"]:[]);
    const __views=["home","insights","ob-onboarding","ob-learn",...Object.keys(FUNCTIONS).map(k=>"fn-"+k),...allItems().map(i=>i.id)];
    const __chk=(v,label=v)=>{ try{ current=v; render(); const h=document.getElementById("view").innerHTML; const m=h.match(/undefined|NaN|\\[object Object\\]/g); if(m) __bad.push(label+" ("+m.slice(0,3).join(",")+")"); } catch(e){ __bad.push(label+" ERR "+e.message); } };
    for(const v of __views) __chk(v);
    for(const t of "ABCDEF") for(const e of __ents){ assessEnt=e; __chk("as-"+t, "as-"+t+"/"+e); }
    __result={views:__views.length+6*__ents.length, bad:__bad, items:allItems().length, docs:stats(allItems()).total, pct:stats(allItems()).pct};`;
  const vm = require("vm");
  const ctx = vm.createContext(sandbox);
  try { vm.runInContext(js + "\n" + test, ctx, { filename: slug + ".html" }); }
  catch (e) { console.error(`${slug}: YÜKLEME HATASI → ${e.message}`); return false; }
  const r = ctx.__result;
  if (r.bad.length) { console.error(`${slug}: SORUN (${r.bad.length}/${r.views}) → ${r.bad.join(" | ")}`); return false; }
  console.log(`${slug}: OK — ${r.views} görünüm temiz · ${r.items} başlık · ${r.docs} doküman · %${r.pct}`);
  return true;
}

/* Her görünümü eski ve yeni dosyada render edip metin benzerliğini ölç (sadakat kontrolü) */
function renderAll(file) {
  const s = fs.readFileSync(file, "utf8");
  const [a0, b0] = scriptBounds(s); const js = s.slice(a0 + 8, b0);
  const els = {};
  const mk = () => ({ innerHTML: "", scrollTop: 0, textContent: "", hidden: false, classList: { toggle() {}, remove() {}, add() {}, contains: () => false }, addEventListener() {}, dataset: {}, setAttribute() {}, getAttribute: () => null, querySelectorAll: () => [], querySelector: () => null, style: {} });
  const doc = { getElementById: (id) => els[id] || (els[id] = mk()), querySelectorAll: () => [], querySelector: () => mk(), addEventListener() {}, documentElement: mk(), body: mk(), createElement: mk };
  const sandbox = { document: doc, window: { addEventListener() {}, matchMedia: () => ({ matches: false, addEventListener() {} }) }, localStorage: { getItem: () => null, setItem() {}, removeItem() {} }, location: { hash: "", href: "" }, history: { replaceState() {} }, console, setTimeout: () => 0, requestAnimationFrame: () => 0, navigator: { userAgent: "" }, Intl, Date, Math, JSON, Object, Array, String, Number, RegExp, Map, Set, Promise, Error };
  sandbox.window.document = doc; sandbox.globalThis = sandbox; sandbox.self = sandbox;
  const test = `
    __out={}; const __ents=CLIENT.short.concat(CLIENT.short.length>1?["Konsolide"]:[]);
    const __views=["home","insights","ob-onboarding","ob-learn",...Object.keys(FUNCTIONS).map(k=>"fn-"+k),...allItems().map(i=>i.id)];
    const __txt=(h)=>h.replace(/<[^>]+>/g," ").replace(/&[a-z]+;/g," ").replace(/\\s+/g," ").trim();
    for(const v of __views){ try{ current=v; render(); __out[v]=__txt(document.getElementById("view").innerHTML);}catch(e){__out[v]="ERR "+e.message;} }
    for(const t of "ABCDEF") for(const e of __ents){ try{ assessEnt=e; current="as-"+t; render(); __out["as-"+t+"/"+e]=__txt(document.getElementById("view").innerHTML);}catch(e2){__out["as-"+t+"/"+e]="ERR "+e2.message;} }`;
  const vm = require("vm"); const ctx = vm.createContext(sandbox);
  vm.runInContext(js + "\n" + test, ctx, { filename: path.basename(file) });
  return ctx.__out;
}
function similarity(a, b) { // kelime kümesi Jaccard
  const A = new Set(a.split(" ")), B = new Set(b.split(" "));
  let inter = 0; for (const w of A) if (B.has(w)) inter++;
  return A.size + B.size ? inter / (A.size + B.size - inter) : 1;
}
function compare(slug, oldFile) {
  const o = renderAll(path.resolve(oldFile)), n = renderAll(path.join(ROOT, "dist", `juris-panel-${slug}.html`));
  const rows = Object.keys({ ...o, ...n }).map((v) => [v, o[v] === undefined ? -1 : n[v] === undefined ? -2 : similarity(o[v], n[v])]);
  const low = rows.filter(([, s]) => s < 0.9);
  const avg = rows.filter(([, s]) => s >= 0).reduce((a, [, s]) => a + s, 0) / rows.filter(([, s]) => s >= 0).length;
  console.log(`${slug}: ${rows.length} görünüm · ortalama benzerlik %${Math.round(avg * 100)}` + (low.length ? ` · %90 altı: ${low.map(([v, s]) => v + (s === -1 ? " (eskide yok)" : s === -2 ? " (yenide yok)" : " %" + Math.round(s * 100))).join(", ")}` : " · tümü ≥%90"));
  return low;
}

function clients() {
  return fs.readdirSync(path.join(ROOT, "src", "clients")).filter((f) => f.endsWith(".data.js")).map((f) => f.replace(".data.js", ""));
}

const [, , cmd, ...args] = process.argv;
if (cmd === "template") makeTemplate();
else if (cmd === "extract") extract(path.resolve(args[0]), args[1]);
else if (cmd === "build") build(args[0]);
else if (cmd === "smoke") process.exit(smoke(args[0]) ? 0 : 1);
else if (cmd === "compare") compare(args[0], args[1]);
else if (cmd === "dump") { const o = renderAll(path.resolve(args[1]))[args[2]], n = renderAll(path.join(ROOT, "dist", `juris-panel-${args[0]}.html`))[args[2]]; console.log("ESKİ:\n" + o + "\n\nYENİ:\n" + n); }
else if (cmd === "all") {
  let ok = true; const deploy = args.includes("--deploy");
  const pub = path.join(ROOT, "..", "..", "apps", "ana-merkez", "public");
  for (const c of clients()) { const d = build(c); const good = smoke(c); ok = good && ok; if (deploy && good) { fs.copyFileSync(d, path.join(pub, c + ".html")); console.log("  → ana-merkez/public/" + c + ".html"); } }
  process.exit(ok ? 0 : 1);
}
else { console.log(fs.readFileSync(__filename, "utf8").split("*/")[0]); process.exit(1); }
