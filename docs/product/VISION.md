# Ürün Vizyonu — VIBE Management

## Çerçeve (2026-10-18 itibarıyla)

**VIBE Management = MTFG Ana Merkez.** MTFG'nin varlıklarını — şirketler (Onscala, Codemag, Zyrone,
Qervan-Wetrade, Meown AI…), projeler, Drive data room'ları — tek yerden yöneten merkez. Üç katman:

1. **MTFG Portföy Yönetim Paneli** — PE / family office mantığı: nakit akışı × değer, tez uyumu, risk, yönetişim takvimi.
2. **Juris Kurumsal Yönetim Panelleri** — müvekkil başına Data Room → fonksiyon → doküman · sorumlu · durum · dayanak.
   `packages/juris-panel-kit` master'ından üretilir, Ana Merkez'e iframe'le gömülür.
3. **Vibe Management stüdyosu** — Claude ile portföy + panel + Data Room bağlamında çalışan operatör asistanı.

Kaynak kod kurucunun tek-dosya HTML'leridir (`apps/ana-merkez`); **birebir korunur**, iterasyonlar
aynı dizilim ve token setiyle yapılır. Veri kaynağı: Google Drive (MTFG Ana Merkez sürücüsü + data room klasörleri), Notion Command Center.

**Mr. F / Problem Pazaryeri** bu merkezin altında bir venture-building projesidir (03. Projeler). Aşağıdaki
bölümler Mr. F'in ürün vizyonudur; operatör konsolu `apps/web` + `apps/api`.

---

# Mr. F · Problem Pazaryeri

> Kaynak: [`docs/kurucu-dokuman.html`](../kurucu-dokuman.html) (Kurucu Doküman v1). Bu bölüm onun
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

**Görsel standart ve dizilim (bağlayıcı):** Juris Kurumsal Yönetim Paneli / MTFG Portföy Paneli
(`VIBE Management/Saas UI Dashboards`). Aşağıdakiler bu standardın *içinde* ilham kaynağıdır, onu değiştirmez.

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
2. **Tek token seti.** Juris kimliği (lacivert/kırmızı, Playfair · Inter · JetBrains Mono) yalnız `apps/web/src/styles/tokens.css` üzerinden; sayfa içinde ham hex yok.
3. **Açık + koyu tema eşit.** Panellerdeki koyu tema (gece lacivert + fildişi) birebir.
4. **Yoğun ama sakin.** Tablo yoğunluğu GitHub, nefes Claude.
5. **Klavye birinci sınıf.** ⌘K, `/` arama, ok tuşları.
6. **Türkçe birinci dil.** Arayüz metni Türkçe; kod ve alan adları şemadaki gibi.

## Sınırlar

Kurucu dokümandaki "yapmayacağız" listesi ürün kararlarını da bağlar — özellikle:
doğrulanmamış çözüm adı **yayın yüzeyinde** gösterilmez (konsolda "doğrulanmamış" etiketiyle görünür).
