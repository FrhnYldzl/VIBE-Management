# Juris Kurumsal Yönetim Paneli – tek kit (v0.3)

Beş müvekkil paneli (Onscala, Codemag, Zyrone, Qervan–WeTrade, Meown AI) **tek master**'dan üretilir.
Tasarım ve ortak kod `src/template.html`'de; müvekkile göre yalnız `src/clients/<slug>.data.js` değişir.

## Dosyalar
- `juris-kurumsal-yonetim-paneli_master.html` — MASTER (Zyrone tabanlı, 18.10.2026; Insights, çok tüzel kişilik ENTS, FINSTRUCT, ACTIONS/DECISIONS). Tasarım değişikliği **yalnız burada** yapılır, sonra `template` yeniden üretilir.
- `src/template.html` — master'dan türetilen ortak kod (CSS + kabuk + helpers + router). `CLIENT_DATA` işaretçisi müvekkil verisinin yeridir. Elle düzenleme; `node tools/kit.js template` üretir.
- `src/clients/<slug>.data.js` — müvekkil blokları: `CLIENT` (+`startLabel`), `FUNCTIONS`, `D/doc/O/U`, `DATAROOM`, `BASIS_COUNT`, `ASSESS_TABS`, `SRC`, `ENTS`, `BMC/LEAN/OKR/RACI`, `FIN` (+`FINSTRUCT`/`DEBT`/`LEASING`), `REVACT/VALPROC/PROJECTS`, `DD/DD_DONE/CONTRACTS/RISKS`, `MEETINGS/ACTIONS/DECISIONS/MAILS`, `E0`, `assessA–F`, `viewInsights`, `ONBOARD/LEARN`.
  `assessA–F` ve `viewInsights` müvekkile özgü **metin** taşıdığı için veri dosyasındadır; yapı template helper'larını (docH, canvas, okrGrid, barChart, ddList, heatmap…) kullanır.
- `tools/kit.js` — `template` · `extract <html> <slug>` · `build <slug>` · `smoke <slug>` · `compare <slug> <eski.html>` · `all [--deploy]`. Modül olarak da kullanılır: `buildFile(dataFile, outFile, title)`, `smokeFile(file)` (sunucu Intake-lite bunu çağırır).
- `tools/intake.js` — **Intake-lite** (v0.5.1): Drive taramasından (`scanRoot`) jenerik `.data.js` üretir (`generateDataJs`). Eksik A–F bölümleri standarttan tamamlanır; metinler "Intake-lite taslağı" diliyledir, Juris doldurur. Sunucu üretimini `var/panels` (Railway: `/data/panels`) altına yazar; repoya girmez.
- `dist/juris-panel-<slug>.html` — üretilen paneller. `--deploy` ile `apps/ana-merkez/public/<slug>.html`'e kopyalanır.
- `build/` (assemble.py, block_*.js) — **eski akış, arşiv**. Kullanılmaz.
- Kaynak arşiv: `packages/juris-panels/` (kurucunun paket halinde verdiği Qervan/Zyrone/Onscala kaynakları, birebir).

## Akış
```bash
node tools/kit.js all --deploy        # 5 panel: build + smoke + Ana Merkez'e kopya   (root: npm run panels)
node tools/kit.js build <slug> && node tools/kit.js smoke <slug>
```
Smoke: tüm görünümleri (home, insights, fn-*, 21 başlık, as-A–F × tüzel kişilik, onboarding, learn) DOM taklidiyle render eder; `undefined/NaN/[object Object]` ve istisna arar.
Compare: eski panelle görünüm bazında kelime benzerliği; %90 altı görünümler listelenir.

## Yeni müvekkil
1. Drive Data Room'u (A–F) tara; çıktı dokümanlarını oku. Dosya varsa `done`/`review`, klasör boşsa `pending`, müvekkil yükleyecekse `input`.
2. En yakın müvekkilin `.data.js` dosyasını kopyala → `src/clients/<slug>.data.js`; `CLIENT` (id, name, entities, short, startLabel, driveRoot, planSheet, kickoff, rhythm, startDocs, scopeIn/Out, contacts), `U`, `DATAROOM`, `BASIS_COUNT`'ı doldur.
3. Veri sabitlerini doldur. `ENTS`/`BMC`/`LEAN`/`OKR`/`FIN`/`REVACT`/`VALPROC`/`DD`/`DD_DONE` anahtarı = `CLIENT.short[0]` (= `E0`).
4. `assessA–F` ve `viewInsights` metinlerini müvekkile göre yaz; yapı aynı kalır.
5. `node tools/kit.js build <slug> && node tools/kit.js smoke <slug>` → "OK". Sonra Ana Merkez `index.html`: `PANELS`, sol menü, `titles`, `SCOPES/SOURCES`, `COS`, funnel.
6. HTML'i artifact olarak yayımla; Drive'a HTML koyma, A.5 klasörüne linki içeren kısa Doc koy.

## Kurallar
- Her panel bir dayanak gösterir: Belge (linkli) / Beyan / Dayanak yok. Beyanı belge gibi gösterme.
- "Müvekkil" jenerik sorumlu kullanma: Müvekkil Yönetimi · Mali Müşavir · Yazılım Ekibi · Juris · Ortak.
- Projeler = henüz gelir getirmeyen işler; ana faaliyetlerden ayrı.
- Hukuk sekmesi en sonda "Bunları yapmazsak" risk haritasıyla biter (O×E 5×5).
- Renk/tipografi: navy #0A2240, red #BC2F2C, Playfair Display + Inter + JetBrains Mono — master'da sabittir; template'te müvekkil adı/metni geçmez (`template` komutu kalıntı tarar).
