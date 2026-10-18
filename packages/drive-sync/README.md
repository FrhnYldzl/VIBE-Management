# @vibe/drive-sync — Drive Data Room okuyucu

Bağımlılıksız Google Drive istemcisi: service account JWT → erişim belirteci → klasör listeleme (paylaşımlı sürücü dahil).
Env: `GOOGLE_SERVICE_ACCOUNT_JSON` (ham JSON ya da base64); Drive klasörleri SA e-postasıyla **Görüntüleyen** olarak paylaşılır
(kurulum: `docs/ops/RAILWAY.md §3b`).

**Kullanımda (v0.5.1 Intake-lite):** `apps/server/src/intake-routes.ts` → `serviceAccountFromEnv` + `getAccessToken` + `makeDriveClient`;
tarama ve veri üretimi `packages/juris-panel-kit/tools/intake.js`'te.

**Hazır ama henüz bağlı değil:** `.data.js` okuyucu (`loadClientData`), dosya ↔ doküman eşleştirme (`matchScore`), el yapımı paneller için
tarama raporu + durum önerileri (`scanClient`, pending/input → review). Plan: v0.5.2 veri doğruluğu turunda admin'den "yeniden tara → önerileri uygula".

Testler: `npx vitest run packages/drive-sync`.
