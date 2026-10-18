# Juris Kurumsal Yönetim Paneli – üretim kiti

Bu klasör, Juris'in standart müvekkil panelini (tek HTML artifact) üretir. Tasarım tek master'dan gelir; müvekkile göre yalnızca veri blokları değişir.

## Dosyalar
- `juris-kurumsal-yonetim-paneli_master.html` — MASTER. CSS ve görünüm fonksiyonları buradadır. Müvekkil bazında DEĞİŞTİRME.
- `juris-panel-meown.html` — MEOWN AI için üretilmiş örnek çıktı (referans).
- `build/block_config.js` — CLIENT, FUNCTIONS, O (sorumlular), U (Drive linkleri), DATAROOM (A–F), BASIS_COUNT.
- `build/block_assess.js` — ASSESS_TABS, SRC, ENTS, BMC, LEAN, OKR, RACI, FIN, FINSTRUCT, REVACT, VALPROC, PROJECTS, DD, DD_DONE, CONTRACTS, RISKS, MEETINGS, ACTIONS, DECISIONS, MAILS. `//@@KEEP a-b` satırları master'ın o satırlarını (yardımcı fonksiyonlar) olduğu gibi alır — silme.
- `build/block_views.js` — assessA–F görünümlerinin müvekkile özgü metinleri + ONBOARD + LEARN. Yapı aynı kalır, cümleler müvekkile göre yazılır.
- `build/assemble.py` — master + 3 bloğu birleştirir, Zyrone'a özgü kalıntıları kontrol eder, çıktıyı yazar.
- `build/smoke.js` — jsdom ile tüm görünümleri render eder; `undefined`/`NaN` arar.

## Yeni müvekkil için adımlar
1. Drive Data Room'u (A–F ve alt klasörleri) listele; çıktı dokümanlarını oku. Dosya varsa `done`/`review`, klasör boşsa `pending`, müvekkil yükleyecekse `input`.
2. `build/block_config.js` → CLIENT (id, name, entities, short, driveRoot, planSheet, kickoff, rhythm, startDocs, scopeIn/Out, contacts), U linkleri, DATAROOM.
3. `build/block_assess.js` → tüm veri sabitleri. ENTS/BMC/LEAN/OKR/FIN/REVACT/VALPROC/DD/DD_DONE anahtarı = CLIENT.short[0].
4. `build/block_views.js` → E0 = CLIENT.short[0]; ghost() metinleri, ilişki modeli, org şeması, karar tablosu, pitch deck slaytları, checklist'ler, toplantı gündemi; ONBOARD, LEARN.
5. `assemble.py` içindeki `rep` listesi (Insights sayfasındaki tile metinleri, aylar/toplantı sayıları, KR regex) ve `title` değişimini müvekkile göre güncelle; çıktı adı `juris-panel-<slug>.html`.
6. `python3 build/assemble.py && npm i jsdom && node build/smoke.js juris-panel-<slug>.html` → "bad 0" olmalı; "WARN leftover" çıkmamalı.
7. HTML'i artifact olarak yayımla (ilk yayında icon: dashboard). Drive'a HTML koyma; A.5 klasörüne linki içeren kısa Doc koy.

## Kurallar
- Her panel bir dayanak gösterir: Belge (linkli) / Beyan / Dayanak yok. Beyanı belge gibi gösterme.
- "Müvekkil" jenerik sorumlu kullanma: Müvekkil Yönetimi · Mali Müşavir · Yazılım Ekibi · Juris · Ortak.
- Projeler = henüz gelir getirmeyen işler; ana faaliyetlerden ayrı.
- Hukuk sekmesi en sonda "Bunları yapmazsak" risk haritasıyla biter (O×E 5×5).
- Renk/tipografi: navy #0A2240, red #BC2F2C, Playfair Display + Inter + JetBrains Mono — master'da sabittir.
