# Problem Veri Seti — Şema v1

Bu veri seti platformun **omurgasıdır**. Katalog, içerik üretimi, kanıt katmanı, affiliate
önceliklendirmesi ve private-label kararlarının hepsi bu tablodan türer.

Birincil anahtar **PROBLEM**'dir. Sektör bir filtre/facet'tir, ayrı bir kayıt değil.
Aynı problem N sektörde farklı nüansla görünür → `problem × sektör` sayfa matrisini üretir.

---

## 1. Kimlik alanları

| Alan | Tip | Açıklama |
|---|---|---|
| `id` | slug | Kalıcı kimlik. Değiştirilmez (URL'lerin temeli). |
| `ad` | string | Problemin resmi adı |
| `ozet` | string | 1-2 cümle, problemin ne olduğu |
| `musteri_dili` | string[] | **Alıcının kendi kelimeleriyle** aradığı ifadeler. SEO/GEO ve konfigüratör eşleştirmesinin temeli. |
| `fonksiyon` | enum | `hukuk` `finans-muhasebe` `satis` `pazarlama` `ik` `operasyon` `tedarik` `musteri` `veri-bt` `yonetim` |
| `sektorler` | slug[] | Problemin belirgin şekilde görüldüğü sektörler (`sectors.json`) |
| `yayilim` | enum | `yatay` (neredeyse tüm sektörler) / `secili` (belirli sektörler) |

## 2. Bağlam alanları — içeriğin hammaddesi

| Alan | Tip | Açıklama |
|---|---|---|
| `tetikleyici` | string | Alıcı bu acıyı **ne zaman** hisseder? İçeriğin giriş cümlesi buradan çıkar. |
| `bugun_nasil_cozuluyor` | string | Mevcut manuel/yarı-manuel yöntem. Karşılaştırmanın referans noktası. |
| `alici_persona` | string | Kararı kim verir, bütçe kimde |
| `odeme_istekliligi` | string | ₺ aralığı ve modeli (aylık / proje / işlem başı) |
| `tr_ozgunluk_notu` | string | Türkiye'ye özgü ne var: mevzuat, kurum, entegrasyon, dil |

## 3. Çözüm ve kanıt alanları

| Alan | Tip | Açıklama |
|---|---|---|
| `cozum_adaylari.global` | string[] | Bilinen global çözümler (v0 — Mr. F taraması ile genişler/doğrulanır) |
| `cozum_adaylari.turkiye` | string[] | Yerel çözümler ve hizmet sağlayıcılar |
| `kanit_metrigi` | string[] | **Bu problemde neyi ölçeceğiz.** Kanıt katmanının tanımı. Ölçülemeyen problem sayfası yayınlanmaz. |
| `veri_ihtiyaci` | string | Ölçüm için gereken örnek veri tipi ve adedi |

## 4. Skorlar (1-5, tamsayı) — kararların girdisi

| Skor | 1 | 5 |
|---|---|---|
| `hacim` | Az işletmede var | Neredeyse her işletmede var |
| `aci` | Rahatsız edici | Para/ceza/müşteri kaybettiriyor |
| `ai_uygunlugu` | AI bugün zayıf | AI bugün gerçekten çözüyor |
| `tr_surtunmesi` | Global çözüm sorunsuz çalışır | Mevzuat/entegrasyon/dil nedeniyle global çözüm yetersiz — **moat sütunu** |
| `inference_yogunlugu` | Az token | Çok yüksek hacimli üretim/işleme — **Mr. F avantajı** |
| `gecis_maliyeti` | Kolay bırakılır | Sözleşme/sorumluluk/entegrasyon nedeniyle bağlı — *yüksek = private-label için kötü* |
| `cozum_bollugu` | Neredeyse hiç çözüm yok | Onlarca çözüm var — *yüksek = affiliate için iyi, private-label için kötü* |
| `odeme_gucu` | Bütçesiz | Ciddi bütçe ayrılır |
| `kurulum_karmasikligi` | Kendi kurar | Entegrasyon/veri/eğitim ister — *yüksek = hizmet geliri için iyi* |
| `mevzuat_bagimliligi` | Mevzuattan bağımsız | Tamamen düzenlemeye bağlı — *çift yönlü: hem moat hem risk* |
| `rekabet_yogunlugu` | TR'de bu işi hedefleyen yok | Onlarca yerli oyuncu/ajans var |
| `mevsimsellik` | Yıl boyu sabit talep | Keskin sezon (çağrı dönemi, kampanya, denetim) |
| `satis_dongusu` | Anında self-servis | 6+ ay kurumsal satın alma |

> `tr_surtunmesi` ile `mevzuat_bagimliligi` bilinçli olarak ayrı tutulur ve korelasyonludur.
> Birincisi **fırsatı** ölçer (global çözüm buraya uymuyor), ikincisi **riski** ölçer
> (bir tebliğ değişirse problem şekil değiştirir veya yok olur). Aynı gerçeğin iki yüzü.

## 5. Türetilen skorlar (0-100) — `scripts/score.py` hesaplar

```
icerik_onceligi  = 0.40·hacim + 0.30·aci + 0.30·tr_surtunmesi

affiliate_skoru  = 0.35·hacim + 0.35·cozum_bollugu + 0.30·odeme_gucu

hizmet_skoru     = 0.30·aci + 0.30·odeme_gucu + 0.25·kurulum_karmasikligi
                 + 0.15·(6−satis_dongusu)

private_label    = 0.22·hacim + 0.22·tr_surtunmesi + 0.18·inference_yogunlugu
                 + 0.13·(6−gecis_maliyeti) + 0.13·(6−cozum_bollugu)
                 + 0.12·(6−rekabet_yogunlugu)

risk_skoru       = 0.40·mevzuat_bagimliligi + 0.30·mevsimsellik + 0.30·satis_dongusu
```

Her sonuç ×20 ile 0-100'e ölçeklenir. `risk_skoru` **yüksek olması kötüdür** — diğer dördü tersi.

**Karar eşikleri — mutlak değil, göreli (üst çeyrek):**

Sabit 70 eşiği ayrıştırmıyordu (20 problemin 16'sı geçiyordu). Bunun yerine her skor için
**P75 (üst çeyrek)** eşik kabul edilir; veri seti büyüdükçe eşik kendini yeniden ayarlar.

- `icerik_onceligi` P75 üstü → ilk dalga içerik
- `affiliate_skoru` P75 üstü → affiliate anlaşması aranır
- `hizmet_skoru` P75 üstü → "biz kuralım" teklifi sayfaya konur
- `private_label` P75 üstü **ve** `risk_skoru` P75 altı → **aday**; talep sinyali teyit ederse geliştirilir

Kritik disiplin: private-label kararı **asla** sadece bu skorla verilmez. Skor adayı belirler,
canlı talep verisi onaylar. (bkz. `docs/kurucu-dokuman.md` → Kendi-Ürün Filtresi)

## 6. Durum alanları

| Alan | Değerler |
|---|---|
| `durum` | `taslak` → `dogrulandi` → `olculdu` → `yayinda` |
| `paket` | Kaçıncı 20'lik pakette geldiği |
| `kaynak_notu` | Çözüm adaylarının doğrulanma durumu |

> **v0 uyarısı:** `cozum_adaylari` alanları ilk turda bilgi temellidir ve **doğrulanmamıştır**.
> Mr. F'in katalog taraması bunları teyit edecek, fiyat/KVKK/TR-ödeme sütunlarını dolduracaktır.
> Doğrulanmadan hiçbir çözüm adı yayına çıkmaz.
