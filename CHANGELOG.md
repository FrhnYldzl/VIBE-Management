# Changelog

Biçim: [Keep a Changelog](https://keepachangelog.com/) · Sürümleme: SemVer 0.x (her iterasyon bir MINOR).
Uygulama içi sürüm notları `apps/api/src/releases.json` dosyasından okunur; ikisi birlikte güncellenir.

## [0.1.0] — 2026-10-18 · Faz A · Temel

### Eklendi
- Monorepo (npm workspaces): `@vibe/core`, `@vibe/api`, `@vibe/web`
- `@vibe/core`: şema tipleri ve `scripts/score.py`'nin TS karşılığı skor motoru (P75 eşik, private-label adayı) + parite testi
- `@vibe/api`: `/api/meta`, `/api/sectors`, `/api/problems` (Türkçe aksan-toleranslı arama, filtre, sıralama), `/api/problems/:id`, `/api/rankings`, `/api/signals`, `/api/feedback` (+ triage), `/api/releases`
- Talep sinyali logu (SQLite): arama, boş sonuç, problem görüntüleme, "biz kuralım"
- Operatör konsolu: Genel Bakış, Problem Rafı (liste + pano, filtre/grup/sırala), Problem sayfası, Karar Panosu, Sektörler, Talep Sinyalleri, Sürümler & Geri Bildirim
- ⌘K / Ctrl K komut paleti, uygulama içi geri bildirim, açık/koyu/sistem tema
- Ürün sistemi dokümanları: vizyon, yol haritası, iterasyon, muadil ürünler, tasarım sistemi, Claude Design brief şablonu
