// Google Drive Data Room tarayıcı (bağımlılıksız). Hem sunucu (apps/server) hem kit CLI (tools/kit.js drive) kullanır.
// Yetki: service account JSON (GOOGLE_SERVICE_ACCOUNT_JSON — ham JSON ya da base64). Drive klasörleri SA e-postasıyla paylaşılır.
import { createSign } from "node:crypto";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const SCOPE = "https://www.googleapis.com/auth/drive.readonly";
const FOLDER = "application/vnd.google-apps.folder";

/* ---------- kimlik ---------- */
export function serviceAccountFromEnv(env = process.env) {
  // Railway Raw Editor tırnak/boşluk/satır sonu ekleyebilir; ham JSON ya da base64 kabul edilir
  let raw = (env.GOOGLE_SERVICE_ACCOUNT_JSON ?? "").trim().replace(/^['"]|['"]$/g, "").trim();
  if (!raw) return null;
  let txt = raw;
  if (!raw.startsWith("{")) {
    txt = Buffer.from(raw.replace(/\s+/g, ""), "base64").toString("utf8");
    if (!txt.trim().startsWith("{")) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON ne JSON ne geçerli base64 (ilk karakterler: " + raw.slice(0, 12) + "…)");
  }
  let sa;
  try { sa = JSON.parse(txt); } catch (e) { throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON çözümlenemedi: " + e.message + " — JSON eksik/yarım yapıştırılmış olabilir"); }
  if (!sa.client_email || !sa.private_key) throw new Error("Service account JSON eksik: client_email / private_key");
  // private_key içinde gerçek satır sonları yerine kaçışlı \n gelmiş olabilir (Raw Editor) → düzelt
  sa.private_key = String(sa.private_key).replace(/\\n/g, "\n");
  return sa;
}

const b64u = (s) => Buffer.from(s).toString("base64url");
export async function getAccessToken(sa, fetchImpl = fetch) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64u(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64u(JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const sig = createSign("RSA-SHA256").update(`${header}.${claims}`).sign(sa.private_key, "base64url");
  const res = await fetchImpl("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${header}.${claims}.${sig}` }),
  });
  const j = await res.json();
  if (!j.access_token) throw new Error("Google token alınamadı: " + (j.error_description || j.error || res.status));
  return j.access_token;
}

/* ---------- Drive istemcisi ---------- */
export function makeDriveClient(token, fetchImpl = fetch) {
  async function list(folderId) {
    const files = []; let pageToken;
    do {
      const q = new URLSearchParams({
        q: `'${folderId}' in parents and trashed = false`, fields: "nextPageToken,files(id,name,mimeType,modifiedTime,webViewLink,size)",
        pageSize: "200", supportsAllDrives: "true", includeItemsFromAllDrives: "true", orderBy: "name",
      });
      if (pageToken) q.set("pageToken", pageToken);
      const res = await fetchImpl(`https://www.googleapis.com/drive/v3/files?${q}`, { headers: { authorization: `Bearer ${token}` } });
      if (!res.ok) { const t = await res.text(); throw new Error(`Drive ${res.status} (${folderId}): ${t.slice(0, 200)}`); }
      const j = await res.json();
      for (const f of j.files ?? []) files.push({ id: f.id, name: f.name, mime: f.mimeType, folder: f.mimeType === FOLDER, modified: f.modifiedTime, link: f.webViewLink, size: f.size ? Number(f.size) : null });
      pageToken = j.nextPageToken;
    } while (pageToken);
    return files;
  }
  return { list };
}

/* ---------- müvekkil verisi (.data.js) ---------- */
export function folderIdFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  const m = url.match(/\/folders\/([A-Za-z0-9_-]{10,})/) || url.match(/[?&]id=([A-Za-z0-9_-]{10,})/);
  return m ? m[1] : null;
}
export function fileIdFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  const m = url.match(/\/d\/([A-Za-z0-9_-]{10,})/) || url.match(/\/file\/d\/([A-Za-z0-9_-]{10,})/) || url.match(/[?&]id=([A-Za-z0-9_-]{10,})/);
  return m ? m[1] : null;
}

/** .data.js dosyasını sandbox'ta çalıştırıp CLIENT ve DATAROOM'u döndürür (görünüm fonksiyonları çağrılmaz). */
export function loadClientData(path) {
  const src = readFileSync(path, "utf8");
  const ctx = vm.createContext({ console });
  vm.runInContext(src + "\n;__out={CLIENT,DATAROOM};", ctx, { filename: path });
  const { CLIENT, DATAROOM } = ctx.__out;
  return { CLIENT, DATAROOM: DATAROOM.filter((s) => !s.virtual) };
}

/* ---------- eşleştirme ---------- */
const TR = { ı: "i", ğ: "g", ü: "u", ş: "s", ö: "o", ç: "c", İ: "i" };
export const norm = (s) => String(s ?? "").toLowerCase().replace(/[ığüşöçİ]/g, (c) => TR[c]).replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const STOP = new Set(["ve", "ile", "icin", "the", "and", "v1", "v2", "v3", "taslak", "final", "pdf", "docx", "xlsx", "pptx", "doc", "dokuman", "dokumani", "belge", "belgesi", "formu", "listesi"]);
const words = (s) => norm(s).split(" ").filter((w) => w.length > 3 && !STOP.has(w));
const codeOf = (no) => { const n = norm(no).replace(/\s/g, ""); return n && !/^(—|-|dr)$/.test(n) ? n : null; }; // "A.1", "E-3", "Ç1" → "a1","e3","c1"

/** Dosya adı dokümanı işaret ediyor mu? → 0..1 skor */
export function matchScore(docRow, fileName) {
  const fn = norm(fileName); const fnc = fn.replace(/\s/g, "");
  const code = codeOf(docRow.no);
  if (code && code.length <= 4 && new RegExp(`(^|[^a-z0-9])${code}([^a-z0-9]|$)`).test(fn.replace(/[.\-]/g, ""))) return 1;
  if (code && fnc.includes(code)) return 0.95;
  const dw = words(docRow.t); if (!dw.length) return 0;
  const hit = dw.filter((w) => fn.includes(w)).length;
  const ratio = hit / dw.length;
  if (hit >= 3 || (hit >= 2 && ratio >= 0.5)) return Math.min(0.9, 0.5 + ratio / 2);
  return 0;
}

/* ---------- tarama ---------- */
/**
 * @param drive  {list(folderId)}
 * @param data   {CLIENT, DATAROOM}
 * @param current  {docKey: status} mevcut paylaşımlı override'lar (öneri karşılaştırması için)
 */
export async function scanClient(drive, data, current = {}) {
  const { CLIENT, DATAROOM } = data;
  const report = { client: CLIENT.id, name: CLIENT.name, scannedAt: new Date().toISOString(), root: CLIENT.driveRoot ?? null, sections: [], items: [], proposals: [], errors: [], totals: { folders: 0, files: 0, matched: 0 } };
  const seenFolders = new Map();
  const listSafe = async (id, where) => {
    if (!id) return null;
    if (seenFolders.has(id)) return seenFolders.get(id);
    try { const f = await drive.list(id); seenFolders.set(id, f); report.totals.folders++; return f; }
    catch (e) { report.errors.push({ where, folderId: id, error: String(e.message || e) }); seenFolders.set(id, null); return null; }
  };

  for (const sec of DATAROOM) {
    const sid = folderIdFromUrl(sec.url);
    const sfiles = await listSafe(sid, sec.title);
    report.sections.push({ id: sec.id, title: sec.title, folderId: sid, exists: sfiles !== null, subfolders: sfiles ? sfiles.filter((f) => f.folder).map((f) => f.name) : [] });
    for (const it of sec.items) {
      const fid = folderIdFromUrl(it.url);
      let files = await listSafe(fid, it.title);
      // alt klasörleri bir seviye tara (D.1.2 Satış vb.)
      if (files) {
        for (const sub of files.filter((f) => f.folder)) {
          const sf = await listSafe(sub.id, `${it.title} / ${sub.name}`);
          if (sf) files = files.concat(sf.filter((f) => !f.folder).map((f) => ({ ...f, via: sub.name })));
        }
      }
      const docsOnly = (files ?? []).filter((f) => !f.folder);
      report.totals.files += docsOnly.length;
      const item = { id: it.id, section: sec.id, title: it.title, fn: it.fn, folderId: fid, exists: files !== null, declaredEmpty: Boolean(it.empty), noFolder: Boolean(it.noFolder), count: docsOnly.length,
        files: docsOnly.map((f) => ({ id: f.id, name: f.name, link: f.link, modified: f.modified, mime: f.mime, via: f.via ?? null })), docs: [] };
      // doküman satırları ↔ dosyalar
      it.docs.forEach((d, i) => {
        const key = `${it.id}:${i}`;
        const cur = current[key] || d.status;
        let best = null, bestScore = 0;
        for (const f of docsOnly) { const s = matchScore(d, f.name); if (s > bestScore) { best = f; bestScore = s; } }
        const linked = fileIdFromUrl(d.url);
        const row = { key, no: d.no, title: d.t, owner: d.owner, status: cur, linkedFile: linked, match: bestScore >= 0.5 ? { id: best.id, name: best.name, link: best.link, modified: best.modified, score: Math.round(bestScore * 100) } : null };
        item.docs.push(row);
        if (row.match) {
          report.totals.matched++;
          if (cur === "pending" || cur === "input") report.proposals.push({ key, item: it.id, itemTitle: it.title, doc: d.t, from: cur, to: "review", reason: `Drive'da dosya var: “${best.name}”`, file: row.match });
        }
      });
      if (files !== null && docsOnly.length === 0 && !it.empty && it.docs.some((d, i) => (current[`${it.id}:${i}`] || d.status) === "done")) {
        report.proposals.push({ key: null, item: it.id, itemTitle: it.title, doc: null, from: null, to: null, reason: "Klasör boş ama 'Tamamlandı' doküman var — dayanak Drive dışında mı?", file: null, info: true });
      }
      if (files !== null && docsOnly.length > 0 && it.empty) {
        report.proposals.push({ key: null, item: it.id, itemTitle: it.title, doc: null, from: null, to: null, reason: `Veri 'klasör boş' diyor; Drive'da ${docsOnly.length} dosya var → .data.js empty:false yapılmalı`, file: null, info: true });
      }
      report.items.push(item);
    }
  }
  return report;
}

/** Rapordan panele gömülecek dayanak listesi: { itemId: [{name, link, modified, via}] } */
export function driveFilesFromReport(report) {
  const out = {};
  for (const it of report.items) if (it.files.length) out[it.id] = it.files.map((f) => ({ name: f.name, link: f.link, modified: f.modified, via: f.via }));
  return out;
}
