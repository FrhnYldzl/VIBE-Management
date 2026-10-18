# VIBE Management · v1.0 Hazırlık Planı

> Hedef: **iki kullanıcının (Ferhan, Gülşah) her gün güvenle kullandığı**, verisi doğru, Railway'de çalışan,
> landing + uygulama + admin'den oluşan tam ürün. Müvekkil erişimi v1'de yok. Abartmadan, veri doğruluğu önce.
> Makine-okunur karşılığı: [`data/roadmap.json`](../../data/roadmap.json) → admin panelindeki Yol Haritası görünümü.

## 0. Bugün neredeyiz (dürüst durum)

| Katman | Durum | Boşluk |
|---|---|---|
| Ana Merkez (portföy + 5 panel + Vibe) | Çalışıyor, Juris standardında, tek dosya | Veri HTML içine gömülü; durum çipleri ve Vibe oturumları **tarayıcı localStorage'da** (paylaşılmıyor, cihaz değişince kaybolur) |
| Panel kiti | Tek master, 5 müvekkil, smoke+compare | Veri elle yazılıyor; Drive ile bağ yok |
| Vibe stüdyosu | UI hazır, köprü sunucu var | `ANTHROPIC_API_KEY` yok; SDK eski (0.52); maliyet sınırı yok |
| Sunucu | Ham `node:http`, statik + /api/sample | Kimlik doğrulama yok, oturum yok, admin yok, Railway yapılandırması yok |
| Admin paneli | Yok | — |
| Landing | Yok | — |
| Veri doğruluğu | Panellerdeki rakamlar panel yazımı anındaki Drive/yazışma okumasına dayalı | Doğrulama protokolü ve "son güncelleme" damgası yok |
| Güvenlik | Yok (yerel) | OAuth, parola, oturum çerezi, CSP, hız sınırı |
| Mr. F konsolu (apps/web, apps/api) | Çalışıyor, ayrı modül | v1 kritik yolunda değil; proje modülü olarak kalır |

## 1. Tam kullanılabilirlik önündeki aşamalar

### Teknik
1. **Tek servis** — `apps/ana-merkez/server` Fastify'a taşınır; aynı süreç: landing (`/`), uygulama (`/app`), admin (`/admin`), API (`/api/*`), Anthropic köprüsü. Railway tek servis, tek port. ✅ v0.4.0'da başladı.
2. **Kimlik** — **E-posta + parola** ana yol (scrypt hash, env'den; Gülşah için GitHub gerekmez); GitHub OAuth yalnız geliştirici hesabı (FrhnYldzl). Oturum: HMAC imzalı HttpOnly çerez. Landing ve `/api/health` hariç her şey kimlik ister. ✅ v0.4.1.
3. **Paylaşımlı durum** — localStorage'daki şeyler veritabanına: panel durum çipleri (`juris-panel:*`), Vibe oturumları/kütüphane ✅ v0.4.2; geri bildirim (v0.6.1). Küçük veri; bkz. §3. Railway: Volume `/data` + `DATA_PATH=/data/vibe.db`.
4. **Drive senkronu** — Service account ile Data Room A–F taraması → `DATAROOM` durumları (dosya var → done/review, boş → pending, bekleniyor → input) + dayanak linkleri → `.data.js` yeniden üretim → kit build → panel yenilenir. Admin'de "son senkron / fark" ekranı.
5. **Admin paneli** — Yol haritası (v1/v2/v3), sürüm notları, geri bildirim gelen kutusu, paneller & senkron durumu, kullanıcılar, sağlık/ortam. Juris standardı, tek dosya.
6. **Landing** — Herkese açık tek sayfa: ne, kim için, giriş. Juris standardı. Marka: VIBE Management · MTFG Ana Merkez.
7. **Vibe** — API anahtarı Railway env'de; SDK güncel; model kademeleri (Haiku 5.5 / Opus 5.5 / Fable 5.1); aylık token tavanı ve kullanım sayacı (admin'de).
8. **Veri doğruluğu** — Her panelde "veri tarihi" damgası; `compare` + Drive farkı raporu; Gülşah ile müvekkil başına 30 dk doğrulama turu (checklist admin'de).
9. **Güvenlik temel** — HTTPS (Railway), çerez flag'leri, CSP (Google Fonts + cdnjs), hız sınırı (/api/sample), gizli bilgiler yalnız env, `npm audit`.
10. **Yayın disiplini** — her sürüm: CHANGELOG + `roadmap.json` + tag + Railway deploy; smoke yeşil olmadan deploy yok.

### Teknik olmayan
- **Veri sahipliği**: Gülşah = müvekkil verisi (Drive + panel metinleri); Ferhan = portföy/MTFG verisi ve yol haritası.
- **Drive klasör standardı**: her müvekkil A–F + alt başlık kodları aynı; dosya adında kod (ör. `A.1 İş Modeli – v2.docx`). Senkron buna dayanır.
- **Çalışma ritmi**: Pazartesi 15 dk: senkron farkları + geri bildirim triage; sürüm ayda 1–2.
- **Alan adı & e-posta**: `vibe.jurishukuk.com` (öneri) → Railway custom domain.
- **Maliyet**: Railway Hobby (~5 $/ay) + Anthropic kullanımı (2 kullanıcı, tavan ör. 30 $/ay). Postgres gerekirse +5 $.
- **KVKK**: belgeler Drive'da kalır; uygulama yalnız meta veri (başlık, durum, link) tutar. Vibe'a gönderilen bağlam Anthropic'e gider → kurumsal API, eğitimde kullanılmaz; yine de kişisel veri içeren belgeleri eklerken dikkat (admin'de uyarı metni).
- **Yedek**: DB günlük dump → Drive "06. Sistem" klasörüne (otomasyon v1.1).

## 2. Ürün UI vs Admin paneli

| | Ürün UI (Ana Merkez) | Admin paneli |
|---|---|---|
| Kullanıcı | Ferhan, Gülşah (operatör); v2'de müvekkil (salt okunur) | Ferhan (ürün sahibi), Gülşah (veri sahibi) |
| İşlev | Portföy kokpiti, müvekkil panelleri, Vibe stüdyosu | Veri ve ürün yönetimi: senkron, doğrulama, yol haritası, sürümler, geri bildirim, kullanıcılar, sağlık |
| Veri yönü | Okur (Drive→kit→panel), küçük yazımlar (durum çipi, Vibe oturumu) | Yazar: senkron tetikler, roadmap/sürüm/kullanıcı düzenler, geri bildirimi triage eder |
| Tasarım | Juris: lacivert ray + kâğıt; Vibe koyu sahne | Aynı token seti; daha yoğun tablo; tek dosya HTML |
| Değerlendirme | Güçlü ve bitmiş görünüyor; zayıf nokta veri yolu (elle, gömülü) | Ürünün "üretim hattı"; v1'de olmadan sürdürülemez |

Karar: Admin, Ana Merkez'in **kardeş sayfası** (`/admin`), aynı sunucu, aynı token'lar, aynı sol ray dizilimi; nav kodları `A0 Yol haritası · A1 Sürümler · A2 Geri bildirim · A3 Paneller & Senkron · A4 Kullanıcılar · A5 Sağlık`.

## 3. Veri mimarisi — Drive mi, Postgres mi?

**Drive = gerçek kaynak (master data)**. Uygulama Drive'ı yeniden saklamaz; tarar ve türetir. Sunucuda tutulması gereken veri **çok küçük ve değişken**:

| Veri | Nerede | Neden |
|---|---|---|
| Belgeler, klasörler, dayanaklar | **Google Drive** | Zaten orada; KVKK; ekip alışkanlığı |
| Müvekkil panel verisi (`.data.js`) | **Git** (kit) — Drive senkronu DATAROOM bloğunu üretir, metinler elle | Sürümlü, gözden geçirilebilir, deploy ile gelir |
| Portföy/MTFG verisi | Git (Ana Merkez `ASSETS/RISKS/DOCS`) → v1.1'de Notion okuma | Küçük, ayda birkaç değişiklik |
| Kullanıcılar (2), oturumlar | **DB** | Kimlik |
| Panel durum çipleri (override) | **DB** | Paylaşımlı olmalı |
| Vibe oturumları, kütüphane, token sayacı | **DB** | Paylaşımlı + maliyet |
| Geri bildirim, yol haritası düzenlemeleri, senkron günlüğü | **DB** | Küçük, ilişkisel |

DB seçimi: **v1'de SQLite (Node yerleşik `node:sqlite`) + Railway Volume**. Gerekçe: iki kullanıcı, tek instance, sıfır ek servis, Mr. F API'de zaten kullanılıyor; repository katmanı (`db.ts`) arkasında olduğu için Postgres'e geçiş ~1 gün. **Postgres'e geçiş tetikleyicisi**: çoklu instance, müvekkil erişimi (v2) veya 50 MB üstü veri. Railway'de Postgres eklemek bir tık; o gün aynı şemayı taşırız.

## 4. v1.0 eksik listesi (sürüm sırası)

| Sürüm | Kapsam | Bitti sayılması |
|---|---|---|
| **v0.4.0** | Tek Fastify servis; Railway config; admin iskeleti + Yol Haritası görünümü (`roadmap.json`) | `npm start` tek portta landing/app/admin/api; Railway'de açılıyor |
| v0.4.1 | Kimlik: GitHub OAuth + parola yedeği, oturum çerezi, allowlist | İki kullanıcı giriş yapıyor; başkası 401 |
| v0.4.2 | Paylaşımlı durum: durum çipleri + Vibe oturumları/kütüphane DB'ye; localStorage'dan tek seferlik taşıma | İki cihazda aynı durum |
| v0.5.0 | Drive senkronu v1: A–F tarama → DATAROOM durum/link → `.data.js` → build; admin "Paneller & Senkron" | 5 müvekkil Drive'dan güncel; fark raporu |
| v0.5.1 | Veri doğruluğu turu: veri tarihi damgası, doğrulama checklist'i (admin), Gülşah ile 5 müvekkil | Checklist %100 |
| v0.6.0 | Vibe üretim: API key, SDK güncel, kademeler, token tavanı + sayaç | Vibe canlı, maliyet görünür |
| v0.6.1 | Admin tamam: sürümler, geri bildirim, kullanıcılar, sağlık | — |
| v0.7.0 | Landing + güvenlik taraması (CSP, rate limit, audit) + alan adı | Lighthouse ≥90, dış erişimde login zorunlu |
| **v1.0.0** | Kabul: 2 hafta kesintisiz günlük kullanım, açık hata 0, veri doğrulama tamam | Tag + sürüm notu |

## 5. v2.0 ve v3.0 vizyonu (admin'de izlenir)

> Bağlayıcı kaynak: landing'deki **"Sürümler ve Paketler"**, **North Star** (Nakit Akışı · Networth · Yönetilen Risk), **Ajan Orkestrasyonu**
> ve **Yatay × Dikey katman matrisi** (kurucu, 18.10.2026). `data/roadmap.json` bunu birebir taşır; aşağısı özet.

**v1.0 — Stüdyo** (şimdi): tek portföy, tek ekip; paneller elle, Claude istek anında okur. Ödeme: çalışma alanı başına · aylık.

**v2.0 — Ofis · Bağlı sistemler**: Vibe MCP bağlayıcıları (muhasebe, banka, e-fatura, e-ticaret, reklam, SGK); Data Room, Brifing,
Toplantı, Finans-Vergi ajanları; Gmail taslakları; ortak oturumlar, roller, onay kapıları; gerçek rakamla değerleme/nakit/borç;
pazarlama-satış katmanı. Ödeme: çalışma alanı + bağlı şirket başına.
**İlk adım (kurucu fikri):** *Intake-lite* — Vibe'a Data Room linki yapıştır → `drive-sync` tarar → `.data.js` taslağı → kit build →
panel HTML Kurumsal Yönetim Panelleri'ne eklenir. Tek kit (v0.3) ve drive-sync (WIP) bunun için hazır.

**v3.0 — Platform · Çok kiracılı**: kiracı başına Data Room/panel/kütüphane ve etik duvarlar; ajan orkestrasyonu (planla → onay →
paralel → atıf/denetim izi → hafıza); Intake, DD, Değerleme, Teşvik Radarı, Mevzuat Radarı; metodoloji paketleri ve paket pazarı
(Mr. F entegrasyonu); açık API + MCP; TR/EN, SSO, faturalama. Ödeme: platform lisansı + metodoloji paketi + API kullanımı.

## 6. Güvenlik (v1 düzeyi)
GitHub OAuth (allowlist) + parola yedeği · HttpOnly/Secure/SameSite çerez · HTTPS (Railway) · CSP · `/api/sample` hız sınırı ve token tavanı · gizli bilgiler yalnız env · bağımlılık denetimi · DB yedeği. Daha fazlası (2FA, denetim izi, SSO) v2.
