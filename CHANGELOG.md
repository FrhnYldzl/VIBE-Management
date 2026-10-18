# Changelog

Biçim: [Keep a Changelog](https://keepachangelog.com/) · Sürümleme: SemVer 0.x (her iterasyon bir MINOR).
Uygulama içi sürüm notları `apps/api/src/releases.json` dosyasından okunur; ikisi birlikte güncellenir.

## [0.2.0] — 2026-10-18 · MTFG Ana Merkez

### Eklendi
- `apps/ana-merkez`: kurucunun **MTFG Ana Merkez** kodu birebir (public/index.html — portföy paneli + Vibe Management
  stüdyosu, onscala.html, codemag.html, claude-adapter.js, server/index.mjs). Root script `npm run ana-merkez` (port 8787).
- `packages/juris-panel-kit`: Juris Kurumsal Yönetim Paneli master HTML + müvekkil veri blokları (config/assess/views)
  + `assemble.py` / `smoke.js` üretim kiti, Meown AI örnek çıktısı.

### Değişti
- Ürün çerçevesi: VIBE Management = MTFG Ana Merkez (varlık + data room yönetimi); Mr. F konsolu alt modül.
- `server/index.mjs` TIER model kimlikleri güncel Claude 5 ailesine çekildi (haiku-5-5 / opus-5-5 / fable-5-1); diğer dosyalar değişmedi.

## [0.1.1] — 2026-10-18 · Faz A · Juris görsel standardı

### Değişti
- Tasarım sistemi **Juris Kurumsal Kimlik** standardına taşındı (kurucu geri bildirimi): lacivert #0A2240 / kırmızı #BC2F2C,
  Playfair Display · Inter · JetBrains Mono; panellerle birebir token seti ve dizilim (lacivert ray + program kutusu + kodlu nav,
  page-h, tile, pill, not kutusu)
- `Note` bileşeni (▲ + etiket + metin), nav kalemlerine mono kod (00–05), Genel Bakış'ta vurgulu tile

## [0.1.0] — 2026-10-18 · Faz A · Temel

### Eklendi
- Monorepo (npm workspaces): `@vibe/core`, `@vibe/api`, `@vibe/web`
- `@vibe/core`: şema tipleri ve `scripts/score.py`'nin TS karşılığı skor motoru (P75 eşik, private-label adayı) + parite testi
- `@vibe/api`: `/api/meta`, `/api/sectors`, `/api/problems` (Türkçe aksan-toleranslı arama, filtre, sıralama), `/api/problems/:id`, `/api/rankings`, `/api/signals`, `/api/feedback` (+ triage), `/api/releases`
- Talep sinyali logu (SQLite): arama, boş sonuç, problem görüntüleme, "biz kuralım"
- Operatör konsolu: Genel Bakış, Problem Rafı (liste + pano, filtre/grup/sırala), Problem sayfası, Karar Panosu, Sektörler, Talep Sinyalleri, Sürümler & Geri Bildirim
- ⌘K / Ctrl K komut paleti, uygulama içi geri bildirim, açık/koyu/sistem tema
- Ürün sistemi dokümanları: vizyon, yol haritası, iterasyon, muadil ürünler, tasarım sistemi, Claude Design brief şablonu
