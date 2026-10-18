# Yol Haritası — fazlar ve sürümler

## Ana Merkez (VIBE Management çekirdeği)

| Sürüm | Tema | Kapsam | Durum |
|---|---|---|---|
| **v0.2.0** | Birebir alım | `apps/ana-merkez` + `packages/juris-panel-kit` repoda, `npm run ana-merkez` ile çalışır | ✅ |
| **v0.2.1** | Paneller | Zyrone, Qervan-Wetrade, Meown AI panelleri `public/` + `PANELS` + menü + Vibe kapsamları | ✅ |
| **v0.2.2** | Kaynak paketleri | Qervan v4 · Zyrone · Onscala kod paketleri repoda; PANEL_EXTRACT toleranslı → 5 panel canlı | ✅ |
| **v0.3.0** | Tek panel kiti | En güncel master (Zyrone tabanlı) → `template.html` + `clients/<slug>.data.js` + `tools/kit.js`; 5 müvekkil aynı master'dan, smoke 187 görünüm, compare %99–100 | ✅ |
| v0.3.1 | Drive senkronu | Drive API ile data room klasörlerini tarayıp `.data.js` içindeki DATAROOM durumlarını (done/pending/input) ve dayanak linklerini üretme | 🧭 |
| v0.4 | Çok-müvekkil kabuk | Ana Merkez'den yeni müvekkil = veri dosyası; build konsoldan; paylaşımlı durum katmanı (localStorage → DB) | 💭 |

## Mr. F (venture-building projesi) — aşağıdaki fazlar

Kurucu dokümandaki iş fazları (Faz 1 Katalog+sinyal · Faz 2 Hizmet · Faz 3 Kendi ürünler) **iş**
fazlarıdır. Aşağıdakiler onları taşıyan **ürün** sürümleridir. Her sürüm bir iterasyondur:
hedef → yapım → demo → geri bildirim → karar. Ayrıntılı kural: [ITERATION.md](ITERATION.md).

Durum: ✅ yayında · 🔨 yapımda · 🧭 planlı · 💭 fikir (geri bildirime açık)

## Faz A — Operatör konsolu (iş fazı 1'in altyapısı)

| Sürüm | Tema | Kapsam | Çıkış kriteri | Durum |
|---|---|---|---|---|
| **v0.1** | Temel | Monorepo, tasarım token'ları, API (problem/sektör/sıralama/sinyal/geri bildirim), uygulama kabuğu, Problem Rafı (liste+pano), problem sayfası, Karar Panosu, Sektörler, Talep Sinyalleri, Sürümler+Geri bildirim, ⌘K | Kurucu 40 problemi konsolda gezip skorları ve adayları görebiliyor; geri bildirim uygulama içinden bırakılabiliyor | 🔨 |
| v0.2 | Veri editörü | Problem oluştur/düzenle (form + doğrulama), paket 3-6 girişi, `mevzuat_oynakligi` + yeni risk formülü, durum akışı (taslak→yayında), değişiklik geçmişi | 120 problem konsoldan girilebiliyor; score.py ile TS motor aynı sonucu veriyor | 🧭 |
| v0.3 | Kanıt katmanı v1 | Çözüm kaydı (4 zorunlu sütun: KVKK, TR ödeme/fatura, Türkçe, TR entegrasyon), kanıt metriği → ölçüm kaydı, doğrulama iş akışı | Bir problemde 3 çözüm, ölçülmüş kanıtla yan yana | 🧭 |
| v0.4 | Mr. F MVP-0 | Ledger (çağrı/maliyet/gecikme), router (cascade), eval koşucusu, ilk kanıt raporu | İlk Türkçe iş-görevi eval raporu konsolda | 🧭 |

## Faz B — Yayın yüzeyi (alıcıya açılış)

| Sürüm | Tema | Kapsam | Durum |
|---|---|---|---|
| v0.5 | Herkese açık problem sayfaları | SSR/SEO, problem × sektör matrisi, "biz kuralım" formu, analytics | 💭 |
| v0.6 | Konfigüratör | "Derdini anlat" → problem eşleştirme (müşteri_dili), boş sonuç logu | 💭 |
| v0.7 | Affiliate + hizmet hunisi | Affiliate link takibi, teklif/proje kaydı, sonuç verisi geri dönüşü | 💭 |

## Faz C — Kendi ürünler

| Sürüm | Tema | Durum |
|---|---|---|
| v1.0 | Private-label karar odası: aday × canlı talep sinyali → geliştirme kararı | 💭 |

## Kural

**Talep sinyali toplanmadan Faz C'ye geçilmez** (kurucu doküman). Bu yüzden talep sinyali logu
v0.1'den itibaren her aramayı ve boş sonucu kaydeder.
