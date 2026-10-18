# Juris Kurumsal Yönetim Paneli – ZYRONE

Juris Şirketler Hukuku ve Kurumsal Yönetim hizmet hattının standart müvekkil paneli; ZYRONE (Zyrone Dynamics A.Ş. + Zyrone Tactics) örneği.
Master şablon: Codemag paneli. Durum verisi: Drive Data Room "2. Zyrone" + teklif/sözleşme + Gmail yazışmaları (18.10.2026).

Yayımlanan sürüm: https://claude.ai/artifact/854U9oiWH3Gm11YsvuhD4P

## Klasör yapısı

```
juris-panel-zyrone/
├─ dist/juris-panel-zyrone.html   # Tek dosya – doğrudan açılır / artifact olarak yayımlanır
├─ src/
│  ├─ index.html                  # HTML iskeleti (nav + main), modülleri sırayla yükler
│  ├─ styles.css                  # Juris tokenları (navy #0A2240, red #BC2F2C), açık/koyu tema
│  └─ js/
│     ├─ 01-client-config.js      # MÜVEKKİLE ÖZGÜ: CLIENT, FUNCTIONS, U, DATAROOM, BASIS_COUNT
│     ├─ 02-core.js               # ORTAK: durum, yardımcılar, Genel Bakış / Fonksiyon / Data Room görünümleri
│     ├─ 03-assessments.js        # MÜVEKKİLE ÖZGÜ: Durum Değerlendirmesi A–F verisi + görünümleri, ONBOARD, LEARN
│     ├─ 04-onboard-insights.js   # Onboarding, Learn, Insights (birkaç kutucuk metni müvekkile özgü)
│     └─ 05-router.js             # ORTAK: router, nav, olaylar, başlatma
└─ build.py                       # src/ → dist/ tek dosya birleştirme
```

Çalıştırma: `src/index.html` dosyasını tarayıcıda açın (derleme gerekmez). Tek dosya üretmek için: `python3 build.py`.
Bağımlılık: yalnızca Google Fonts (Playfair Display, Inter, JetBrains Mono). Framework yok, vanilla JS.

## Veri modeli (koda aktarırken)

| Yapı | Dosya | Açıklama |
|---|---|---|
| `CLIENT` | 01 | id, ad, tüzel kişilikler, Drive kökü, ritim, başlangıç dokümanları, kapsam içi/dışı, kişiler |
| `FUNCTIONS` | 01 | PLAN · İCRA · DENETİM · RAPORLAMA |
| `DATAROOM` | 01 | A–F → alt başlık (`id, title, fn, area, url, flow, guide, docs[]`) |
| `doc(no, t, owner, status, url, ent)` | 01 | Doküman satırı. `status`: done · review · progress · input · pending |
| `BASIS_COUNT` | 01 | Dayanak: doc (belge) · beyan · none |
| `BMC`, `LEAN`, `OKR`, `RACI` | 03 | A – iş modeli, 5 bölüm × OKR, yetki matrisi |
| `FIN`, `FINSTRUCT` | 03 | B – şirket bazlı + konsolide trend, finansman/teminat |
| `REVACT`, `VALPROC`, `PROJECTS` | 03 | D – gelir faaliyetleri, süreç zinciri, projeler |
| `DD`, `DD_DONE`, `CONTRACTS`, `RISKS` | 03 | E – şirket bazlı DD checklist, sözleşme matrisi, 5×5 risk |
| `MEETINGS`, `ACTIONS`, `DECISIONS`, `MAILS` | 03 | F – toplantı döngüsü ve iletişim |
| `ONBOARD`, `LEARN` | 03 | Onboard & Learn |

Kullanıcı durum değişiklikleri `localStorage` anahtarı `juris-panel:zyrone` altında tutulur (tarayıcıya özel). Çok kullanıcılı yapıda bu katman API/DB ile değiştirilmeli (`setStatus`, `stOf` – 02-core.js).

Önerilen backend şeması: `clients` → `entities` → `dataroom_sections` → `items` → `documents(status, owner, basis, url, entity)`; ayrıca `risks`, `meetings`, `actions`, `decisions`, `mails`. Drive klasör ID'leri `U` ve `DATAROOM[].url` içinde.

## Yeni müvekkil eklemek

1. `01-client-config.js` → CLIENT, U ve DATAROOM'u yeni Drive Data Room'a göre doldurun.
2. `03-assessments.js` → veri bloklarını ve `assessA…F` içindeki müvekkile özgü metinleri güncelleyin.
3. `04-onboard-insights.js` → Insights "B · Şirket ve Finansal Göstergeler" kutucuklarını güncelleyin.
4. `02-core.js`, `05-router.js`, `styles.css` değişmez (tasarım değişikliği master'a uygulanır).

## ZYRONE – açık sorular (veri boşlukları)

- Danışmanlık sözleşmesinin imzalı nüshası Drive'da yok; teklif "KDV dahil", sözleşme "vergiler hariç"; Tactics sözleşme tarafı değil.
- Zyrone Tactics unvanı, ortaklık yapısı ve tüm DD belgeleri bekleniyor.
- 07.10'da paylaşılan "DD" klasörü Data Room E-1'e taşınmadı.
- Zyrone'a özgü Hizmet Planı / Doküman Haritası tablosu yok (plan butonu teklife bağlı).
- Mali müşavir ve "Mali Yapı, Finansman ve Teşvik" sözleşmesinin durumu teyitsiz.
- Aylık YK toplantı ritmi kurulmadı; 13.10 Kalite Toplantısı iptal.
