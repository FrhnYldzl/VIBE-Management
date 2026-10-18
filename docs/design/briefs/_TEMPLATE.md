# Brief: <sürüm> · <sayfa / bileşen>

> Claude Design'a olduğu gibi verilir. Dönüş: tek HTML dosyası (inline CSS), açık + koyu tema.

## Amaç
Bu ekran kullanıcıya hangi kararı verdirir? (1 cümle)

## Kullanıcı ve bağlam
Kim, hangi anda, neyle geliyor?

## İçerik (gerçek veri)
Alan listesi + örnek değerler (data/ altından kopyala; uydurma veri yok).

## Zorunlu kısıtlar
- Juris Kurumsal Kimlik token seti (bkz. DESIGN-SYSTEM.md): `--navy --red --red-ink --bg --bg-elev --bg-sunken --ink..--ink-4 --success --warn --info --neutral (+ -bg) --track`
- Fontlar: Playfair Display (display), Inter (body), JetBrains Mono (kod/sayı)
- Dizilim: lacivert ray + kâğıt çalışma alanı; page-h (eyebrow → h1 → p · sağda butonlar) → tiles → sec blokları
- Tek birincil aksiyon (navy); skor rengi yalnız P75 üstünde
- Referans HTML ekle: `VIBE Management/Saas UI Dashboards/Juris Kurumsal Yönetim Paneli – Zyrone.html`
- Durumlar: yükleniyor / boş / hata / dolu · 375px genişlik

## Referanslar
Standart: Juris paneli (bağlayıcı) · Vibe: Claude, Higgsfield · Kurumsal: McKinsey/Deloitte editoryal ·
Ürün: ClickUp / Slack / GitHub — bu ekranda özellikle: <hangisi, neden>

## Dönüşte beklenen
- [ ] Masaüstü + mobil
- [ ] Açık + koyu
- [ ] Bileşen sınırları işaretli (hangi parça yeniden kullanılır)
