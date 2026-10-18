# Juris Kurumsal Yönetim Paneli — Kod Paketi

Juris Şirketler Hukuku ve Kurumsal Yönetim hizmet planı için standart müvekkil paneli.
Tek dosyalık HTML (bağımlılık yok; yalnızca Google Fonts). Tasarım tek şablonda, müvekkil verisi ayrı dosyada.

## Yapı
```
src/template.html                 Kabuk: CSS token'ları, bileşenler, görünümler, yönlendirici (müvekkilden bağımsız)
src/clients/<slug>.data.js        Müvekkil verisi: CLIENT, DATAROOM, BMC/LEAN, OKR, FIN, REVACT/VALPROC/PROJECTS,
                                  DD/DD_DONE/CONTRACTS/RISKS, MEETINGS/MAILS, ONBOARD/LEARN, SRC, BASIS_COUNT, RACI
src/tokens.css                    Renk/tipografi token'ları (template.html :root ile aynı) — referans
build.js                          node build.js <slug>  → dist/juris-panel-<slug>.html
tools/smoke-test.js               node tools/smoke-test.js dist/juris-panel-<slug>.html  (tüm görünümleri render eder)
dist/                             Üretilmiş paneller
SKILL.md                          Claude skill tanımı (Drive'dan veri çıkarıp yeni müvekkil paneli üretme prosedürü)
```

## Yeni müvekkil
1. `src/clients/qervan-wetrade.data.js` dosyasını kopyala → `src/clients/<slug>.data.js`.
2. Yalnızca veri bloklarını doldur. Şablon (`template.html`) değişmez.
3. `node build.js <slug>` → `node tools/smoke-test.js dist/juris-panel-<slug>.html`.
4. Dağıtım: dosyayı doğrudan paylaşmak yerine artifact / statik host olarak yayımla; Drive'a yalnızca link koy.

## Veri sözleşmesi (kısa)
- `doc(no, başlık, sorumlu, durum, url?, şirket?)` — durum: `done | review | progress | input | pending`
- Sorumlu: `O.J` Juris · `O.JM` Juris → Müvekkil Yönetimi · `O.M` Müvekkil Yönetimi · `O.SM` Mali Müşavir · `O.SW` Yazılım Ekibi · `O.O` Ortak
  (jenerik "Müvekkil" kullanılmaz; girdi kimden bekleniyorsa o yazılır)
- `DATAROOM[].items[]`: `id` (A1, B2, E7 …), `fn` (PLAN | İCRA | DENETİM | RAPORLAMA), `area`, `url`, `empty`, `noFolder`, `subfolders`, `guide`, `flow`, `docs`
- Her Durum Değerlendirmesi paneli bir `SRC` kaydına bağlanır: `{t, u?, k: "doc" | "beyan" | "none"}` → Belge / Beyan / Dayanak yok rozeti
- Durum çipleri tarayıcıda `localStorage` ile saklanır (`juris-panel:<CLIENT.id>`); ekipçe ortak durum için paylaşımlı veri katmanı eklenmelidir (bkz. Yol haritası).

## Tasarım
- Token'lar: navy `#0A2240` (Pantone 289C), red `#BC2F2C` (Pantone 7620C); Playfair Display (display), Inter (body), JetBrains Mono (sayısal)
- Açık/koyu tema; `prefers-color-scheme` ve `data-theme` destekli. Tüm renkler `:root` token'larından türetilir — bileşenlerde literal renk yok.
- Bölümler: Genel Bakış · Insights · Fonksiyonlar · Durum Değerlendirmesi (A–F) · Data Room · Onboard & Learn

## Yol haritası
- [ ] Paylaşımlı durum katmanı (localStorage → sunucu/DB), kullanıcı bazlı yetki
- [ ] Drive API ile Data Room'un otomatik taranması ve `DATAROOM` durumlarının üretilmesi
- [ ] Çok müvekkilli kabuk: `CLIENT` seçici + ortak Insights (Juris portföy görünümü)
- [ ] Hizmet Planı Google Sheet'inden doküman haritasının otomatik çekilmesi
