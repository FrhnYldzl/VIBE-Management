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

v1.0 planı ve durum: [docs/product/V1-PLAN.md](docs/product/V1-PLAN.md) · yol haritası verisi: [data/roadmap.json](data/roadmap.json) (admin → Yol Haritası).

## Yapı

```
apps/server               TEK SERVİS (Fastify): / landing · /app/ Ana Merkez · /admin/ yönetim · /api/* (health, roadmap,
                          releases, sample = Claude köprüsü). Railway bunu çalıştırır (railway.json).
apps/ana-merkez/public    MTFG Ana Merkez — index.html (portföy + Vibe stüdyosu) + 5 müvekkil paneli (kitten üretilir)   ← ÜRÜNÜN ANA YÜZÜ
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

Tek servis (http://localhost:8787 → `/` landing · `/app/` Ana Merkez · `/admin/` yönetim). Vibe için `apps/server/.env` içine `ANTHROPIC_API_KEY` (bkz. `.env.example`):

```bash
npm start
```

Panelleri kitten yeniden üret ve Ana Merkez'e kopyala:

```bash
npm run panels
```

Mr. F operatör konsolu (web http://localhost:5173 · API 127.0.0.1:4310, `VIBE_API_PORT`):

```bash
npm run dev:mrf
```

**Railway:** repo'yu bağla, `railway.json` okunur (`npm start`, health `/api/health`). Volume ekle (mount `/data`). Variables: `SESSION_SECRET`,
`PASSWORD_USERS`, `DATA_PATH=/data/vibe.db`, `ANTHROPIC_API_KEY`, isteğe bağlı `GITHUB_CLIENT_ID/SECRET` + `ALLOWED_GITHUB_USERS` (bkz. `.env.example`). Tek servis, tek port.

Çalışma zamanı verisi `var/vibe.db` dosyasına yazılır (git dışı).

```bash
npm run typecheck
```

```bash
npm test
```

Mr. F konsolunu üretim için derlemek: `npm run build:mrf` (tek servis bunu kullanmaz; Railway build fazı yok).

## Sürüm

Güncel: **v0.4.0** — tek servis + admin iskeleti; v1.0 yolu `data/roadmap.json`'da izlenir. Ayrıntı: [CHANGELOG.md](CHANGELOG.md).
