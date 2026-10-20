# Changelog

Biçim: [Keep a Changelog](https://keepachangelog.com/) · Sürümleme: SemVer 0.x (her iterasyon bir MINOR).
Uygulama içi sürüm notları `apps/api/src/releases.json` dosyasından okunur; ikisi birlikte güncellenir.

## [0.5.6] — 2026-10-20 · Kurumsal Yönetim Skoru (KYS v1)

### Eklendi
- Panel master: **KYS v1** — `KYS.kriterler` (tek yer): Dokümantasyon %25 (Data Room doluluğu) · Dayanak kalitesi %10 (belge/beyan/yok) ·
  Yönetişim ritmi %15 (son 90 günde toplantı, tutanaklı bonus) · Karar ve aksiyon disiplini %15 (aksiyon kapanma + karar alınma) ·
  KPI/OKR ilerlemesi %15 (KR ortalaması) · DD %12 (checklist) · Risk yönetimi %8 (kayıt var mı, kritik sayısı). Toplam 0–100; seviye
  A ≥80 Olgun · B ≥65 İyi · C ≥50 Gelişen · D ≥35 Başlangıç · E Kritik. `kysScore()` panel verisinden (durum çipleri ve Süreç Kaydı
  eklemeleri dahil) hesaplar; Genel Bakış'ta skor kartı; açılışta ve her durum değişiminde `PUT /api/panels/:client/score`.
- Sunucu: `panel_scores` tablosu, `GET /api/panels/scores`, `PUT /api/panels/:client/score` (zod).
- Ana Merkez: portföy kartlarında **KYS rozeti**; `PANEL_EXTRACT`'a `kurumsalYonetimSkoru` (Vibe bağlamı). Admin → Paneller & Senkron →
  **Kurumsal Yönetim Skoru** tablosu (kriter bazında, güncelleme/kim, portföy ortalaması, kriter açıklaması).
- İlk ölçüm (18.10 verisi): Codemag 35 D · Meown 33 E · Zyrone 32 E · Qervan–WeTrade 30 E · Onscala 24 E — Data Room'lar boş,
  aksiyonlar açık; skor veri boşluğunu dürüstçe gösterir.

## [0.5.5] — 2026-10-20 · Süreç Kaydı (düzenlenebilir panel) + doğrulama checklist'i

### Eklendi
- Panel master: **Süreç Kaydı** görünümü (Genel Bakış altında) — `ACTIONS/DECISIONS/MEETINGS` + kullanıcı eklemeleri (`eklendi` rozeti) tek listede;
  aksiyon/karar/toplantı ekleme formları, eklenen aksiyonda durum döngüsü, silme; doküman satırında **not** (✎). Kayıtlar
  `panel_edits` tablosunda (`GET/PUT/DELETE /api/panels/:client/edits[/:kind[/:id]]`), `.data.js`'e dokunmaz → yeniden tarama /
  yeniden üretimde korunur. `file://` açılışta salt okunur. Veri tarihi damgası (`CLIENT.dataDate` ya da `DRIVE_META.scannedAt`) alt bilgide.
- Admin → Paneller & Senkron → **Doğrulama turu**: 5 kit + intake panelleri × 8 kontrol (künye, Data Room linkleri, OKR, finans, DD,
  riskler, toplantı/aksiyon, veri tarihi); hücreye tıkla → kim · ne zaman (`vibe_state: dogrulama`, paylaşımlı).
- Funnel: 0. aşamadaki aday **→ Müvekkil** terfi (eğitimden gelen ilişki 1. aşamaya geçer).
- Intake panelleri sunucu açılışında güncel template ile yeniden derlenir (Drive'a gitmeden şablon güncellemesi).

### Değişti
- 5 müvekkil `.data.js`: `dataDate:"2026-10-18"`; intake üreticisi `dataDate` = tarama tarihi. `TEMPLATE_NAMES` güncellendi.

## [0.5.4] — 2026-10-18 · Eğitim tasarla · Claude + Design brief

### Eklendi
- **✦ Eğitim tasarla · Claude** (Eğitim görünümü): konu/tema, hedef kitle (6 profil), düzey, ton, oturum ve ders sayısı, vurgulanacak Juris
  hizmetleri (5 kapsam maddesi), kurum/yer/başlangıç/aralık, eğitmen, koordinatör, kurucu notu → Opus (mevcut `/api/sample` köprüsü) **yalnız JSON**
  üretir: program künyesi (ad, tema, motto, "neden"), her modül için **teori** (kavramlar, mevzuat dayanağı "[teyit edilecek]" disipliniyle,
  literatür), **uygulama** (atölye/vaka, kontrol listesi, katılımcı çıktısı), **hizmet–fonksiyon–panel eşlemesi**, dersler + kazanımlar, misafir
  profili, kitap/film; final atölyesi ve kaynaklar. Ankara Teknopark kataloğu Claude'a derinlik/üslup referansı olarak gider.
- Önizleme (modül akordeonları) → **Programı kaydet**: `egBuildProgram` özel modülleri (`p.moduller`) ve derslerini programla birlikte saklar;
  oturum kartında teori/uygulama özeti, hizmet eşlemesi programın kendi modüllerinden; "Katalogdan program" ikincil düğme.
- **✦ Design brief** (her oturumda): Markdown — Juris görsel standardı (renk/tipografi), Teknopark slayt iskeleti (içerik → içindekiler → amaç →
  temalar → kazanımlar → tema slaytları + "Kaynak ve Dayanak" → uygulama → hizmet bağı → kitap/film → özet), modül içeriği, kurallar.
  Kopyala · `.md` indir · Çıktı Kütüphanesi'ne kaydet → Claude Design'a yapıştırılır; dönen slayt oturuma doküman linki olarak bağlanır.

## [0.5.3] — 2026-10-18 · Eğitim: program oluşturucu, katılımcılar → funnel

### Eklendi
- **＋ Yeni program**: kurum/ev sahibi, yer, program adı, başlangıç tarihi, oturum aralığı (haftalık · 2 haftada bir · aylık), varsayılan eğitmen,
  koordinatör, modül seçimi (8 modül, katalog sırası) → tarihli oturumlar; dersler Ankara Teknopark şablonundan, düzey/misafir önerisi modülden.
  Program sekmeleri (Ankara Teknopark + türetilenler), türetilen program silinebilir (katılımcı ve dokümanlarıyla). Kayıt `vibe_state: egitim` (`k:"prog"`).
- **Katılımcılar**: ad, şirket, rol (Girişimci / Yatırımcı / Paydaş / Danışman / Diğer), not; satırdan **Funnel'a aktar** → İş Geliştirme Funnel'ında
  yeni **0. Aday · Network** sütunu (kaynak: eğitim programı), tıklayınca eğitim görünümüne gider. Katılımcı tile'ı (liste / funnel'a aktarılan).
- Funnel 5 sütun (≤1100px 3, ≤900px 2).

## [0.5.2] — 2026-10-18 · Eğitim Programları + Panel ekle

### Eklendi
- **Eğitim → Eğitim Programları** (`apps/ana-merkez/public/egitim.data.js` + görünüm): Ankara Teknopark "Girişim & Yatırım Hukuku Eğitimi —
  Bir Girişimin Kuruluştan Exit'e Yolculuğu" (8 oturum × 3 ders, Salı, Eylül–Aralık 2026, Teknopark Ankara VIP Salon). Oturum zaman çizelgesi
  tarihe göre yapıldı / sıradaki / planlı (elle düzeltilebilir), dersler + eğitmenler + saatler, misafir katılımcılar, oturum dokümanları
  (bilinen slaytlar "link yok" → Drive linki ekle; yeni doküman ekle/sil), **hizmet–modül–panel eşlemesi** (PLAN/İCRA/DENETİM/RAPORLAMA),
  network kartı (ev sahibi, misafirler, final atölyesi). Durum düzeltmeleri ve dokümanlar sunucuda (`vibe_state: egitim`) — iki kullanıcıda ortak.
- Vibe kaynak çipi **Eğitim programı** (Juris ve Tüm portföy kapsamında açık): program, oturum durumu, dokümanlar ve hizmet eşlemesi bağlama girer.
- Sol panel: **"＋ Panel ekle · Drive linki"** formu (Intake-lite); Vibe'a yapıştırılan Drive linki aynı formu açar. Sol panel 304 px.

### Düzeltildi
- Intake: paylaşılmamış ya da alt klasörsüz Drive klasöründe boş panel yerine net hata (`files.get` ön kontrolü); bozuk
  `GOOGLE_SERVICE_ACCOUNT_JSON` servisi düşürmez, hata health/A3'te görünür.

## [0.5.1] — 2026-10-18 · Intake-lite: Drive linki → panel kartı

### Eklendi
- **Intake-lite** (kurucu önerisi 4): Admin → **Paneller & Senkron** formu — müvekkil adı + Drive Data Room kök linki (+ kısa ad, tüzel
  kişilikler, başlangıç) → service account ile tarama (bölüm A–F → alt başlık → dosya, bir seviye derin) → `tools/intake.js` standart
  `.data.js` taslağı (DATAROOM dosya satırları "Onay Bekliyor", eksik bölümler standarttan; BMC/OKR/RACI/DD/FIN iskeletleri, jenerik
  assessA–F + Insights, "Intake-lite taslağı" notları) → `kit.js buildFile` + `smokeFile` → kayıt (`panels` tablosu) → panel kartı.
- API: `POST /api/intake`, `GET /api/panels`, `GET /api/panels/:slug/data`, `POST /api/panels/:slug/rescan`, `DELETE /api/panels/:slug`,
  `GET /api/intake/status`. Üretilen HTML'ler Volume'de (`/data/panels`, `PANELS_DIR`) ve `/app/p/<slug>.html` altında (aynı origin → durum çipleri çalışır).
- Ana Merkez: paneller **dinamik** — `/api/panels` sol menüye, portföy kartlarına (Intake-lite rozeti), Vibe kapsam/kaynak çiplerine ve canlı
  okumaya eklenir; `#p-<slug>` ile doğrudan açılır. Health: `GOOGLE_SERVICE_ACCOUNT`, `PANELS_DIR`.
- `kit.js` modül API'si (`buildFile`, `smokeFile`); `@vibe/drive-sync` tip bildirimi; Google service account kurulumu `docs/ops/RAILWAY.md §3b`.

### Testler
- 38 test yeşil: intake üreteci (tarama → veri → derleme → smoke) ve sunucu akışı (sahte Drive; yeniden tarama, silme, 400/502/503 yolları).

## [0.4.4] — 2026-10-18 · Kurucu önerileri (canlı sonrası ilk tur)

### Eklendi
- Ana Merkez sol panel: **Oturumlar** ve **Çıktı Kütüphanesi** Vibe Management altında doğrudan erişilir (sayaçlı).
- Yanıt altına **"E-posta taslağı aç"**: konu (Konu: satırı ya da başlık) + düz metin gövdeyle varsayılan e-posta istemcisini açar (mailto).
- Yol haritası: Intake-lite v0.5.1'e çekildi (Drive linki → panel kartı); dışa aktarma Word/Excel/PDF + Juris anteti v0.6.0; Connectors (Gmail taslak) v0.6.2.

## [0.4.3] — 2026-10-18 · Kullanıcılar veritabanında, hesap sayfası, Railway canlı

### Eklendi
- `users` tablosu (SQLite): `PASSWORD_USERS` yalnız ilk tohum; DB'deki kullanıcı env'i ezer. `/hesap` sayfası (parola değiştir),
  girişte **Beni hatırla** (30 gün / 12 saat), Admin → Kullanıcılar: DB listesi, **Parola sıfırla**, **Kullanıcı ekle** (`/api/users`).
- Parola hash ayracı `~` (Railway Raw Editor `$` işaretini bozuyordu); eski `$` biçimi de kabul edilir; `seedHashOk` teşhisi.
- Anthropic anahtarı için `VIBE_MANAGEMENT` takma adı; health'te ortam teşhisi (ad/adet, değer yok) ve çalışan commit.
- Railway: tek servis (`@vibe/server`), Volume `/data`, Variables; `railway.json` buildCommand kaldırıldı (Nixpacks EBUSY).

## [0.4.2] — 2026-10-18 · Paylaşımlı durum (SQLite + Railway Volume)

### Eklendi
- `apps/server/src/store.ts` (node:sqlite; `DATA_PATH`, Railway Volume `/data/vibe.db`, yerelde `var/vibe.db`) ve API:
  `GET/PUT /api/panels/:client/status` (+`/bulk` tek seferlik taşıma, `/log`), `GET /api/vibe/state`, `PUT /api/vibe/state/:key`
  (sessions · library), `GET /api/state/stats`. Health `db` alanı; admin Sağlık'ta veritabanı tile'ı.
- Panel master: durum çipleri sunucuyla senkron (`syncOverrides`, `setStatus` → PUT); sunucu boşsa tarayıcıdaki override'lar
  otomatik taşınır; file:// açılışta localStorage'da kalır. 5 panel yeniden üretildi (smoke temiz).
- Ana Merkez: Vibe oturumları ve kütüphane `/api/vibe/state` ile paylaşımlı (`pullState`/`pushState`); localStorage önbellek.
  İki kullanıcı için son yazan kazanır (ADR 0002).

## [0.4.1] — 2026-10-18 · Kimlik

### Eklendi
- **E-posta + parola girişi** (ana yol; `PASSWORD_USERS=eposta:scrypt$salt$hash`, `npm run auth:hash -- <parola>`) ve
  **GitHub OAuth** yalnızca geliştirici hesabı için (`ALLOWED_GITHUB_USERS=FrhnYldzl`). Bağımlılıksız: HMAC imzalı HttpOnly
  oturum çerezi (30 gün, Secure/SameSite=Lax), scrypt parola, CSRF için OAuth `state` çerezi.
- Koruma: landing, `/login`, `/auth/*`, `/api/health` dışında her yol oturum ister (HTML → `/login?next=`, API → 401).
- `/login` sayfası (Juris standardı), `/auth/logout`, `/api/me`, `/api/auth/config`. Admin: Kullanıcılar görünümü canlı, üst çubukta oturum + Çıkış.
- Geliştirme modu: hiçbir yöntem tanımlı değilse ve `NODE_ENV!=production` ise kimlik kapalı (uyarı loglanır). `apps/server/.env` otomatik yüklenir.

## [0.4.0] — 2026-10-18 · Tek servis + admin iskeleti (v1.0 yolu başladı)

### Eklendi
- `docs/product/V1-PLAN.md`: tam kullanılabilirlik değerlendirmesi (teknik + teknik dışı), ürün UI vs admin, veri mimarisi
  (Drive gerçek kaynak, SQLite + Volume), v1.0 eksik listesi, v2.0/v3.0 vizyonu. `docs/adr/0002-drive-source-of-truth.md`.
- `data/roadmap.json`: makine-okunur yol haritası (v1.0 adımları + v2/v3 vizyon) → admin Yol Haritası görünümü.
- `apps/server` (Fastify, tek servis): `/` landing · `/app/` Ana Merkez · `/admin/` yönetim · `/api/health|roadmap|releases|sample`.
  Anthropic köprüsü SDK 0.70'e taşındı (Haiku 5.5 / Opus 5.5 / Fable 5.1); anahtar yoksa 503 ile açık mesaj.
- Admin paneli iskeleti (Juris standardı, tek dosya): Yol Haritası, Sürümler, Sağlık canlı; Geri Bildirim / Paneller & Senkron / Kullanıcılar yer tutucu.
- Landing yer tutucu (Juris standardı). `railway.json`, `.node-version`, `.env.example`.

### Değişti
- `apps/ana-merkez` yalnız statik uygulama; eski `server/index.mjs` ve paketi kaldırıldı. `releases.json` → `data/`.
- Root script'ler: `npm start` (tek servis, 8787) · `npm run dev` · `npm run dev:mrf` (Mr. F konsolu) · `npm run panels` (kit all --deploy).

## [0.3.0] — 2026-10-18 · Tek panel kiti

### Değişti
- Üç kit mimarisi (template+data.js / js modülleri / src parçaları / assemble.py) **tek kitte** birleşti: çekirdek = en güncel
  master (Zyrone tabanlı, 18.10 — Insights, ENTS, FINSTRUCT, ACTIONS/DECISIONS); paketleme = `src/template.html` +
  `src/clients/<slug>.data.js` + `tools/kit.js` (template · extract · build · smoke · compare · all --deploy).
- Beş müvekkil (Onscala, Codemag, Zyrone, Qervan–WeTrade, Meown AI) aynı template'ten üretildi ve Ana Merkez'e kopyalandı.
  Smoke: 187 görünüm temiz. Compare: eski panellerle görünüm bazında benzerlik Zyrone/Codemag/Onscala/Meown %100, Qervan %99
  (onboarding tablosu sütun başlığı farkı).
- Müvekkile özgü sabit metinler template'ten çıkarıldı: `assessEnt` varsayılanı → `CLIENT.short[0]`; onboarding metası → `CLIENT.startLabel`.
- `build/` (assemble.py) ve `packages/juris-panels/` arşiv olarak kaldı.

## [0.2.2] — 2026-10-18 · Panel kaynak paketleri + canlı okuma

### Eklendi
- `packages/juris-panels/{qervan-wetrade,zyrone,onscala}`: kurucunun panel kod paketleri birebir (her biri kendi build akışıyla).
- `public/qervan.html` v4'e (Insights, MEETINGS) yükseltildi; `zyrone.html` ve `onscala.html` paketlerdeki dist ile yenilendi.

### Değişti
- `PANEL_EXTRACT` eksik veri setlerini (`ACTIONS`, `DECISIONS`, `MEETINGS`, `RISKS`) boş geçer → tüm paneller Vibe bağlamına canlı okunur.

### Bilinen
- Vibe stüdyosu için `apps/ana-merkez/.env` içinde `ANTHROPIC_API_KEY` gerekir; yoksa istek `upstream_error` döner.
- Üç paket üç farklı kit mimarisi taşıyor (template+data.js / js modülleri / src parçaları) — 0.3'te tek kitte birleştirilecek.

## [0.2.1] — 2026-10-18 · Ana Merkez'e üç panel

### Eklendi
- `public/zyrone.html`, `public/qervan.html`, `public/meown.html` (kaynak HTML'ler birebir) + `PANELS`, sol menü (ZY · QW · MW),
  `titles`, `SCOPES`/`SOURCES`/`SCOPE_SRC`, `COS`, funnel "Panel aktif", Vibe `INSTR`. Panel sayısı artık `PANELS`'ten türetilir.

### Not
- Qervan paneli eski sürüm (ACTIONS/DECISIONS/MEETINGS yok): Vibe bağlamında canlı okuma yerine `fallback` özetine düşer;
  kit master'ından yeniden üretilince canlıya geçer.

## [0.2.0] — 2026-10-18 · MTFG Ana Merkez

### Eklendi
- `apps/ana-merkez`: kurucunun **MTFG Ana Merkez** kodu birebir (public/index.html — portföy paneli + Vibe Management
  stüdyosu, onscala.html, codemag.html, claude-adapter.js, server/index.mjs). Root script `npm run ana-merkez` (port 8787).
- `packages/juris-panel-kit`: Juris Kurumsal Yönetim Paneli master HTML + müvekkil veri blokları (config/assess/views)
  + `assemble.py` / `smoke.js` üretim kiti, Meown AI örnek çıktısı.

### Değişti
- Ürün çerçevesi: VIBE Management = MTFG Ana Merkez (varlık + data room yönetimi); Mr. F konsolu alt modül.
- `server/index.mjs` TIER model kimlikleri güncel Claude 5 ailesine çekildi (haiku-5-5 / opus-5-5 / fable-5-1); diğer dosyalar değişmedi.

## [0.1.1] — 2026-10-18 · Faz A · Juris görsel standardı

### Değişti
- Tasarım sistemi **Juris Kurumsal Kimlik** standardına taşındı (kurucu geri bildirimi): lacivert #0A2240 / kırmızı #BC2F2C,
  Playfair Display · Inter · JetBrains Mono; panellerle birebir token seti ve dizilim (lacivert ray + program kutusu + kodlu nav,
  page-h, tile, pill, not kutusu)
- `Note` bileşeni (▲ + etiket + metin), nav kalemlerine mono kod (00–05), Genel Bakış'ta vurgulu tile

## [0.1.0] — 2026-10-18 · Faz A · Temel

### Eklendi
- Monorepo (npm workspaces): `@vibe/core`, `@vibe/api`, `@vibe/web`
- `@vibe/core`: şema tipleri ve `scripts/score.py`'nin TS karşılığı skor motoru (P75 eşik, private-label adayı) + parite testi
- `@vibe/api`: `/api/meta`, `/api/sectors`, `/api/problems` (Türkçe aksan-toleranslı arama, filtre, sıralama), `/api/problems/:id`, `/api/rankings`, `/api/signals`, `/api/feedback` (+ triage), `/api/releases`
- Talep sinyali logu (SQLite): arama, boş sonuç, problem görüntüleme, "biz kuralım"
- Operatör konsolu: Genel Bakış, Problem Rafı (liste + pano, filtre/grup/sırala), Problem sayfası, Karar Panosu, Sektörler, Talep Sinyalleri, Sürümler & Geri Bildirim
- ⌘K / Ctrl K komut paleti, uygulama içi geri bildirim, açık/koyu/sistem tema
- Ürün sistemi dokümanları: vizyon, yol haritası, iterasyon, muadil ürünler, tasarım sistemi, Claude Design brief şablonu
