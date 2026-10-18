# İterasyon Sistemi — nasıl ilerliyoruz

## Döngü (her sürüm)

```
 1 Hedef        → ROADMAP.md'de sürüm satırı + çıkış kriteri
 2 Tasarım      → gerekiyorsa docs/design/briefs/<sürüm>-<sayfa>.md → Claude Design'dan dönüş
 3 Yapım        → feature branch: feat/v0.x-<konu>
 4 Demo         → yerel çalıştırma + sürüm notu taslağı
 5 Geri bildirim→ uygulama içi "Geri bildirim" butonu + sohbet
 6 Karar        → triage: şimdi / sonraki sürüm / fikir / ret (gerekçeli)
 7 Yayın        → CHANGELOG.md + apps/api/src/releases.json + git tag vX.Y.Z
```

## Sürümleme

- **SemVer 0.x**: `0.MINOR.PATCH`. Her iterasyon bir MINOR; düzeltmeler PATCH.
- Sürüm numarası tek yerde: kök `package.json` → API `/api/health` ve arayüz rozeti buradan okur.
- Her sürüm bir git etiketi (`v0.1.0`) ve CHANGELOG girdisi alır.

## Geri bildirim

| Kaynak | Nereye düşer | Triage |
|---|---|---|
| Uygulama içi buton | `feedback` tablosu (SQLite) → Sürümler sayfası | Her iterasyon başında |
| Sohbet (kurucu) | `docs/product/FEEDBACK-LOG.md` | Anında |

Tür: `hata` · `istek` · `tasarım` · `veri`. Her kayıt sayfa bağlamıyla tutulur.

## Tasarım dönüşleri (Claude Design)

Yeni bir sayfa ya da bileşen tasarım sistemine sığmıyorsa:
1. `docs/design/briefs/` altına brief yazılır (amaç, içerik, token'lar, referanslar, durumlar).
2. Kurucu brief'i Claude Design'a verir, çıktıyı (HTML/görsel) `docs/design/returns/` altına koyar.
3. Çıktı token'lara eşlenerek koda alınır; token dışı renk/font **eklenmez**, gerekirse önce token güncellenir.

## Kalite kapısı (her sürüm)

- `npm run typecheck` ve `npm run test` temiz
- `npm run build` temiz
- Açık + koyu tema ve 375px genişlik gözle kontrol
- Skor motoru `scripts/score.py` ile aynı sonucu verir (test)
