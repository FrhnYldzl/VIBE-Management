# Brief: <sürüm> · <sayfa / bileşen>

> Claude Design'a olduğu gibi verilir. Dönüş: tek HTML dosyası (inline CSS), açık + koyu tema.

## Amaç
Bu ekran kullanıcıya hangi kararı verdirir? (1 cümle)

## Kullanıcı ve bağlam
Kim, hangi anda, neyle geliyor?

## İçerik (gerçek veri)
Alan listesi + örnek değerler (data/ altından kopyala; uydurma veri yok).

## Zorunlu kısıtlar
- Yalnız şu token'lar: `--ground --surface --surface-2 --ink --ink-soft --muted --border --border-2 --brass --brass-bg --verdi --verdi-bg --danger`
- Fontlar: Archivo (UI), Source Serif 4 (düzyazı), IBM Plex Mono (veri)
- Tek birincil aksiyon (brass); skor rengi yalnız P75 üstünde
- Durumlar: yükleniyor / boş / hata / dolu · 375px genişlik

## Referanslar
Vibe: Claude (sakin, sıcak), Higgsfield (koyu tema sahnesi) · Kurumsal: McKinsey/Deloitte editoryal ·
Ürün: ClickUp / Slack / GitHub — bu ekranda özellikle: <hangisi, neden>

## Dönüşte beklenen
- [ ] Masaüstü + mobil
- [ ] Açık + koyu
- [ ] Bileşen sınırları işaretli (hangi parça yeniden kullanılır)
