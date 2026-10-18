# @vibe/drive-sync — DURDURULDU (v0.5.0 WIP)

Kurucu kararı (2026-10-18): önce Railway canlıya alınır, Drive senkronu sonra. Bu paket **hiçbir yere bağlı değildir**;
yalnız birim testleri çalışır (`npx vitest run packages/drive-sync`).

Hazır olan: service account JWT ile Drive token, klasör listeleme (paylaşımlı sürücü dahil), `.data.js` okuyucu (CLIENT + DATAROOM),
dosya ↔ doküman eşleştirme (kod / başlık), tarama raporu ve **durum önerileri** (pending/input → review) + bilgi uyarıları.

Devam planı: `apps/server` rotaları (tara / rapor / önerileri paylaşımlı durum çiplerine uygula), admin "Paneller & Senkron",
`kit.js drive <slug>` → `.drive.json` → panelde dayanak linkleri. Env: `GOOGLE_SERVICE_ACCOUNT_JSON`; Drive klasörleri SA e-postasıyla paylaşılır.
