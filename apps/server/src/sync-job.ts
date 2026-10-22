// Günlük senkron (v0.6.0): her gün 1 kez Drive ↔ paneller; sonuç ve hatalar Journal'a (admin → Journal).
//  1) Intake panelleri: kayıtlı Drive kökünden yeniden tara + derle + smoke (durum çipleri / düzenlemeler sunucuda kalır)
//  2) Kit panelleri (src/clients/*.data.js): drive-sync scanClient → erişilemeyen klasör, eşleşen dosya, durum önerisi (otomatik uygulanmaz)
//  3) Kontroller: KYS anlık görüntüsü 7 günden eski, performans verisi 14 günden eski
import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { FastifyInstance } from "fastify";
import { folderIdFromUrl, loadClientData, scanClient } from "@vibe/drive-sync";
import type { Drive } from "./intake-routes.ts";
import { ROOT } from "./paths.ts";
import type { Store } from "./store.ts";

const CLIENTS_DIR = join(ROOT, "packages", "juris-panel-kit", "src", "clients");
type Rescan = (slug: string, by: string) => Promise<{ status: string; files: number; folders: number; error: string | null }>;

export async function runDailySync(store: Store, getDrive: (() => Promise<Drive>) | null, rescan: Rescan, by = "günlük senkron") {
  const run = new Date().toISOString();
  const J = (tur: string, hedef: string | null, durum: "ok" | "uyari" | "hata" | "basladi", mesaj: string, detay?: unknown) => store.journal(run, tur, hedef, durum, mesaj, detay);
  J("gunluk", null, "basladi", `Günlük senkron başladı (${by})`);
  let hata = 0, uyari = 0;
  if (!getDrive) { J("drive", null, "uyari", "Drive bağlı değil (GOOGLE_SERVICE_ACCOUNT_JSON) — tarama atlandı"); uyari++; }
  else {
    // 1) intake panelleri
    for (const p of store.listPanels()) {
      try {
        const r = await rescan(p.slug, by);
        const d = r.status === "error" ? "hata" : r.files === 0 ? "uyari" : "ok";
        if (d === "hata") hata++; else if (d === "uyari") uyari++;
        J("intake", p.slug, d, d === "hata" ? `Derleme/smoke hatası: ${r.error ?? ""}` : `${r.files} dosya · ${r.folders} alt klasör${r.files === 0 ? " — Data Room boş" : ""}`);
      } catch (e) { hata++; J("intake", p.slug, "hata", `Tarama başarısız: ${(e as Error).message}`); }
    }
    // 2) kit panelleri
    let files: string[] = [];
    try { files = readdirSync(CLIENTS_DIR).filter((f) => f.endsWith(".data.js")); } catch { /* kit yoksa atla */ }
    const drive = await getDrive();
    for (const f of files) {
      try {
        const data = loadClientData(join(CLIENTS_DIR, f)) as Parameters<typeof scanClient>[1];
        const id = String((data.CLIENT as { id?: string }).id ?? f.replace(".data.js", ""));
        // Drive, paylaşılmamış klasörde hata yerine boş liste döndürür → önce kök klasöre erişimi doğrula
        const rootId = folderIdFromUrl(String((data.CLIENT as { driveRoot?: string }).driveRoot ?? ""));
        if (rootId && drive.get) {
          try { await drive.get(rootId); }
          catch { uyari++; J("kit", id, "uyari", "Data Room kök klasörü service account ile paylaşılmamış — tarama yapılamadı (Drive → Paylaş → Görüntüleyen)"); continue; }
        }
        const rep = await scanClient(drive as Parameters<typeof scanClient>[0], data, store.panelStatus(id)) as { errors: unknown[]; proposals: { info?: boolean }[]; totals: { folders: number; files: number; matched: number } };
        const err = rep.errors.length, prop = rep.proposals.filter((x) => !x.info).length, info = rep.proposals.filter((x) => x.info).length;
        const d = err ? "uyari" : "ok"; if (err) uyari++;
        J("kit", id, d, `${rep.totals.files} dosya · ${rep.totals.matched} eşleşme · ${prop} durum önerisi · ${info} bilgi${err ? ` · ${err} klasöre erişilemedi (service account ile paylaşılmamış olabilir)` : ""}`,
          { hatalar: rep.errors.slice(0, 20), oneriler: rep.proposals.slice(0, 40), toplam: rep.totals });
      } catch (e) { hata++; J("kit", f.replace(".data.js", ""), "hata", `Tarama başarısız: ${(e as Error).message}`); }
    }
  }
  // 3) tazelik kontrolleri
  const now = Date.now(), day = 86400000;
  for (const [client, s] of Object.entries(store.scores())) {
    const age = (now - Date.parse(String(s.updated_at).replace(" ", "T"))) / day;
    if (age > 7) { uyari++; J("kontrol", client, "uyari", `KYS ${Math.round(age)} gündür güncellenmedi — panel açılmamış`); }
  }
  const sonuc = hata ? "hata" : uyari ? "uyari" : "ok";
  J("gunluk", null, sonuc, `Günlük senkron bitti · ${hata} hata · ${uyari} uyarı`);
  return { run, hata, uyari, sonuc };
}

/** Zamanlayıcı: 30 dk'da bir bakar; bugün (TR saati) çalışmadıysa ve saat ≥ 06:00 ise çalıştırır. */
export function registerDailySync(app: FastifyInstance, store: Store, getDrive: (() => Promise<Drive>) | null, rescan: Rescan, { schedule = true } = {}) {
  let running = false;
  const trDate = (d = new Date()) => new Date(d.getTime() + 3 * 3600000).toISOString().slice(0, 10);
  const trHour = () => new Date(Date.now() + 3 * 3600000).getUTCHours();
  const go = async (by: string) => {
    if (running) return { busy: true };
    running = true;
    try { return await runDailySync(store, getDrive, rescan, by); }
    catch (e) { store.journal(new Date().toISOString(), "gunluk", null, "hata", `Senkron çöktü: ${(e as Error).message}`); return { hata: 1 }; }
    finally { running = false; }
  };
  const tick = () => { const last = store.lastDailyRun(); if (trHour() >= 6 && (!last || trDate(new Date(last.ts)) !== trDate())) void go("günlük senkron (otomatik)"); };
  if (schedule) { const t = setInterval(tick, 30 * 60000); t.unref(); setTimeout(tick, 60000).unref(); app.addHook("onClose", async () => clearInterval(t)); }

  app.get<{ Querystring: { limit?: string } }>("/api/journal", async (req) => {
    const last = store.lastDailyRun();
    return { son: last ?? null, calisiyor: running, kayitlar: store.journalList(Math.min(500, Number(req.query.limit) || 200)) };
  });
  app.post("/api/journal/run", async (req) => go(`elle · ${(req as unknown as { session?: { u?: string } }).session?.u ?? "admin"}`));
}
