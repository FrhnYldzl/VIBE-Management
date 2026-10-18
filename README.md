# VIBE Management · Mr. F ve Problem Pazaryeri

Türk işletmelerinin ortak problemlerini raflayan, çözümleri ölçülmüş kanıtla karşılaştıran ve
kendi ürünlerini talep verisiyle seçen bir pazaryeri — ve onu besleyen Mr. F motoru.

- Tez ve mimari: [docs/kurucu-dokuman.html](docs/kurucu-dokuman.html)
- Ürün vizyonu: [docs/product/VISION.md](docs/product/VISION.md)
- Yol haritası (faz + sürüm): [docs/product/ROADMAP.md](docs/product/ROADMAP.md)
- İterasyon sistemi: [docs/product/ITERATION.md](docs/product/ITERATION.md)
- Tasarım sistemi: [docs/design/DESIGN-SYSTEM.md](docs/design/DESIGN-SYSTEM.md)

## Yapı

```
data/               Problem veri seti (tek doğruluk kaynağı) — şema: data/schema.md
scripts/score.py    Python skorlayıcı → data/problems.csv, data/rankings.md
packages/core       @vibe/core — tipler + skor motoru (score.py ile parite testli)
apps/api            @vibe/api  — Fastify API, SQLite (talep sinyali + geri bildirim)
apps/web            @vibe/web  — React + Vite operatör konsolu
docs/               Kurucu doküman, ürün, tasarım, ADR
```

## Çalıştırma

Gereken: Node 22.13+ (yerleşik `node:sqlite` için).

```bash
npm install
```

```bash
npm run dev
```

Web: http://localhost:5173 · API: http://127.0.0.1:4310 (`VIBE_API_PORT` ile değişir).
Çalışma zamanı verisi `var/vibe.db` dosyasına yazılır (git dışı).

```bash
npm run typecheck
```

```bash
npm test
```

Üretim: `npm run build` sonra `npm start` — API derlenmiş arayüzü aynı porttan sunar.

## Sürüm

Güncel: **v0.1.1** (Faz A — operatör konsolu temeli, Juris görsel standardı). Ayrıntı: [CHANGELOG.md](CHANGELOG.md).
