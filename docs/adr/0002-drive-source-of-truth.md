# ADR 0002 — Google Drive gerçek kaynak, sunucu durumu küçük (SQLite + Volume)

- Durum: Kabul · 2026-10-18 · v0.4.0

## Bağlam
Ürün iki kullanıcıya hizmet eder (Ferhan, Gülşah). Belgeler zaten Google Drive Data Room'larında; müvekkil
panel verisi bu belgelerden türetilir. Railway'e taşınırken "Postgres mi?" sorusu doğdu.

## Karar
1. **Drive = master data.** Uygulama belgeleri kopyalamaz; Data Room'u tarar ve `DATAROOM` durum/link bloklarını türetir.
   Türetilen panel verisi (`.data.js`) **Git'te** yaşar (sürümlü, gözden geçirilebilir, deploy ile gelir).
2. **Sunucu durumu küçüktür**: kullanıcılar, oturumlar, panel durum çipleri, Vibe oturumları/kütüphane, geri bildirim,
   yol haritası düzenlemeleri, senkron günlüğü. v1'de **SQLite (`node:sqlite`) + Railway Volume**.
3. Repository katmanı arkasında tutulur; **Postgres'e geçiş tetikleyicileri**: çoklu instance, müvekkil erişimi (v2), >50 MB veri.
4. **Tek servis**: Fastify; landing `/`, uygulama `/app`, admin `/admin`, API `/api/*`, Anthropic köprüsü `/api/sample`.

## Sonuçlar
- Railway'de tek servis + bir volume; ek yönetilen DB yok (maliyet ve karmaşıklık düşük).
- Drive API için service account gerekir (Drive klasörleri bu hesapla paylaşılır).
- KVKK: belgeler Drive'da kalır; uygulama meta veri tutar.
- Volume = tek instance kısıtı; v2'de Postgres'e geçişle kalkar.
