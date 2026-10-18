# VIBE Management · MTFG Ana Merkez

MTFG'nin varlıklarını (şirketler, projeler, data room'lar) tek yerden yöneten merkez:
**MTFG Portföy Yönetim Paneli** (üst katman) + gömülü **Juris Kurumsal Yönetim Panelleri**
(müvekkil başına) + Claude tabanlı **Vibe Management** stüdyosu. Görsel standart ve dizilim:
Juris Kurumsal Kimlik (lacivert #0A2240 · kırmızı #BC2F2C · Playfair Display + Inter + JetBrains Mono).

**Mr. F / Problem Pazaryeri** bu merkezin altında bir venture-building projesidir; operatör konsolu
`apps/web` + `apps/api` altında yaşar.

- Ana Merkez: [apps/ana-merkez/README.md](apps/ana-merkez/README.md)
- Panel üretim kiti: [packages/juris-panel-kit/CLAUDE.md](packages/juris-panel-kit/CLAUDE.md)
- Ürün vizyonu: [docs/product/VISION.md](docs/product/VISION.md) · Yol haritası: [docs/product/ROADMAP.md](docs/product/ROADMAP.md) · İterasyon: [docs/product/ITERATION.md](docs/product/ITERATION.md)
- Tasarım sistemi: [docs/design/DESIGN-SYSTEM.md](docs/design/DESIGN-SYSTEM.md)
- Mr. F tezi: [docs/kurucu-dokuman.html](docs/kurucu-dokuman.html)

## Yapı

```
apps/ana-merkez           MTFG Ana Merkez — public/index.html (portföy + Vibe stüdyosu), onscala/codemag panelleri,
                          server/index.mjs (statik + Anthropic Messages API köprüsü, SSE)   ← ÜRÜNÜN ANA YÜZÜ
packages/juris-panel-kit  TEK PANEL KİTİ: master → src/template.html (ortak kod) + src/clients/<slug>.data.js (5 müvekkil)
                          tools/kit.js: template · extract · build · smoke · compare · all --deploy  (root: npm run panels)
packages/juris-panels/    Kaynak arşiv — kurucunun paket halinde verdiği Qervan/Zyrone/Onscala kaynakları (birebir, referans)
apps/web  · apps/api      Mr. F operatör konsolu (React + Vite · Fastify + SQLite)
packages/core             @vibe/core — Mr. F tipleri + skor motoru (score.py paritesi)
data/ · scripts/score.py  Mr. F problem veri seti ve Python skorlayıcı
docs/                     Ürün, tasarım, ADR, kurucu doküman
```

## Çalıştırma

Gereken: Node 22.13+.

```bash
npm install
```

Ana Merkez (http://localhost:8787 — Vibe stüdyosu için `apps/ana-merkez/.env` içine `ANTHROPIC_API_KEY`):

```bash
npm run ana-merkez
```

Mr. F operatör konsolu (web http://localhost:5173 · API 127.0.0.1:4310, `VIBE_API_PORT`):

```bash
npm run dev
```

Çalışma zamanı verisi `var/vibe.db` dosyasına yazılır (git dışı).

```bash
npm run typecheck
```

```bash
npm test
```

Üretim: `npm run build` sonra `npm start` — API derlenmiş arayüzü aynı porttan sunar.

## Sürüm

Güncel: **v0.2.0** (MTFG Ana Merkez + Juris panel kiti repoya birebir alındı; Mr. F konsolu alt modül). Ayrıntı: [CHANGELOG.md](CHANGELOG.md).
