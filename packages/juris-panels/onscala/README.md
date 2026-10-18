# Juris Kurumsal Yönetim Paneli – Onscala

Tek dosyalı (self-contained) HTML panel. Qervan–WeTrade master şablonundan türetilmiştir; CSS ve görünüm fonksiyonları master ile aynıdır, yalnızca veri blokları Onscala'ya özgüdür.

## Dosyalar
- `juris-panel-onscala.html` — yayına hazır, birleştirilmiş tek dosya (bunu açın / deploy edin)
- `src/head.html`   — <head> + CSS (Juris kurumsal kimlik tokenları) + sol panel/shell HTML
- `src/data.js`     — CLIENT, FUNCTIONS, Drive URL kısayolları (U), DATAROOM (A–F doküman haritası), BASIS_COUNT
- `src/helpers.js`  — durum sözlüğü, localStorage override, stats/bar/tiles/docTable/areaCard
- `src/core.js`     — viewHome / viewFn / viewItem
- `src/assess.js`   — Durum Değerlendirmesi verileri ve görünümleri (BMC, Lean, OKR, RACI, FIN, DEBT, REVACT, PROJECTS, DD, CONTRACTS, RISKS, MEETINGS, ACTIONS, MAILS), Onboard/Learn, Insights
- `src/router.js`   — hash router, nav render, click handling
- `build.py`        — src/* dosyalarını tek HTML'e birleştirir
- `smoke.js`        — Playwright ile 36 görünümü render edip undefined/NaN/konsol hatası tarar

## Build & test
    python3 build.py
    node smoke.js        # playwright gerekir

## Yeni müvekkil
Sadece `data.js` (CLIENT, U, DATAROOM, BASIS_COUNT) ve `assess.js` içindeki veri sabitlerini değiştirin; CSS ve görünüm fonksiyonlarına dokunmayın.
