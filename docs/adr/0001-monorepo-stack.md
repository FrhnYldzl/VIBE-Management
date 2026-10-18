# ADR 0001 — Monorepo ve teknoloji yığını

- Durum: Kabul · 2026-10-18 · v0.1.0

## Bağlam
Solo kurucu + AI eşli geliştirme; hızlı iterasyon, tek dil, düşük operasyon yükü gerekli.
Veri seti JSON + Python skorlayıcı olarak zaten mevcut.

## Karar
- **npm workspaces** monorepo: `packages/core`, `apps/api`, `apps/web`. (pnpm/turbo gereksiz karmaşa — ihtiyaç doğunca.)
- **TypeScript** her yerde; `@vibe/core` derleme adımı olmadan kaynak olarak paylaşılır.
- **API: Fastify 5 + zod**, `tsx` ile çalışır. Hızlı, şema-dostu, düşük boilerplate.
- **Kalıcılık:** problem verisi `data/*.json` (git'te, gözden geçirilebilir); çalışma zamanı verisi
  Node yerleşik **`node:sqlite`** (native bağımlılık yok). v0.2 editörüyle Postgres'e geçiş
  `DataStore`/`Db` arayüzleri arkasında yapılır.
- **Web: React 18 + Vite 6 + React Router + TanStack Query**, CSS değişkenli token sistemi (Tailwind yok:
  kurucu dokümanın tipografi/renk dili birebir taşınmalı).
- `scripts/score.py` kalır; TS motoru onunla parite testine bağlıdır.

## Sonuçlar
- Tek `npm run dev` ile tüm sistem ayağa kalkar; tek süreçle üretime çıkar.
- `node:sqlite` deneysel uyarısı basar; Node 24 LTS'de kararlı.
- Proje OneDrive altında: `node_modules` senkronu yavaşlatır, dosya izleyici zaman zaman değişikliği kaçırabilir.
  Repo GitHub'a taşındıktan sonra OneDrive dışı bir klasörde çalışmak önerilir.
