# Ürün Vizyonu — VIBE Management · Mr. F

> Kaynak: [`docs/kurucu-dokuman.html`](../kurucu-dokuman.html) (Kurucu Doküman v1). Bu dosya onun
> **ürün** karşılığıdır: kim için, ne, hangi kaliteyle.

## Tek cümle

Türk işletmelerinin ortak problemlerini raflayan, çözümleri **ölçülmüş kanıtla** karşılaştıran ve
alıcıyı çözüme kadar götüren bir pazaryeri — altında, her işi her ay biraz daha ucuza yapan
**Mr. F** motoru.

## İki yarım

| Yarım | Kullanıcı | Bugünkü ürün yüzeyi |
|---|---|---|
| **Platform** (Problem Pazaryeri) | KOBİ kurucusu, finans/hukuk/operasyon yöneticisi | Problem rafı, problem sayfası, kanıt kartları, "biz kuralım" |
| **Operatör konsolu** (VIBE Management) | Kurucu ekip (biz) | Karar panosu, talep sinyalleri, sürüm + geri bildirim, ileride Mr. F ledger/router |

v0.x boyunca **önce operatör konsolu** inşa edilir: veriyi, skorları ve talep sinyalini biz
yönetemezsek alıcıya gösterecek kanıtımız olmaz.

## Kuzey yıldızları

| Eksen | Referans | Ne alıyoruz |
|---|---|---|
| Vibe | **Claude** | Sakin, sıcak, okunaklı; serif + sans dengesi; içerik önce, krom sonra; tek birincil aksiyon |
| Vibe | **Higgsfield** | Koyu temada sinematik kontrast; cesur tipografi; "ürün bir sahne" hissi |
| Kurumsal | **McKinsey / Deloitte** | Kanıt dili: her iddianın yanında sayı; editoryal tablolar; şekil numarası + açıklama; karar izi |
| Ürün | **ClickUp** | Liste ↔ pano görünümü, filtre/grup/sırala çubuğu, hiyerarşi |
| Ürün | **Slack** | Sol kenar çubuğu, çalışma alanı hissi, ⌘K hızlı geçiş |
| Ürün | **GitHub** | Durum rozetleri, sürüm notları, issue gibi geri bildirim, yoğun ama düzenli tablolar |

## Tasarım ilkeleri (bozulmaz)

1. **Kanıt önce.** Skor, eşik ve kaynak her zaman görünür. Doğrulanmamış veri açıkça etiketlenir.
2. **Tek token seti.** Renk/tipografi yalnız `apps/web/src/styles/tokens.css` üzerinden; sayfa içinde ham hex yok.
3. **Açık + koyu tema eşit.** Koyu tema Higgsfield ciddiyetinde, açık tema Claude sıcaklığında.
4. **Yoğun ama sakin.** Tablo yoğunluğu GitHub, nefes Claude.
5. **Klavye birinci sınıf.** ⌘K, `/` arama, ok tuşları.
6. **Türkçe birinci dil.** Arayüz metni Türkçe; kod ve alan adları şemadaki gibi.

## Sınırlar

Kurucu dokümandaki "yapmayacağız" listesi ürün kararlarını da bağlar — özellikle:
doğrulanmamış çözüm adı **yayın yüzeyinde** gösterilmez (konsolda "doğrulanmamış" etiketiyle görünür).
