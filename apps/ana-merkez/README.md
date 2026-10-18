# MTFG Ana Merkez

Tek sayfalık yönetim merkezi: **MTFG Portföy Yönetim Paneli** (üst katman), gömülü **Juris Kurumsal Yönetim Panelleri** (Onscala, Codemag) ve Claude tabanlı **Vibe Management** stüdyosu.

Kaynak artifact: https://claude.ai/artifact/1ht944FZdTkgW8EWeP7RMS (claude.ai içinde Claude bağlantısı otomatik çalışır).

## Dosya yapısı

```
public/
  index.html          Ana sayfa: MTFG paneli + Vibe Management + panel çerçeveleri (tek dosya: CSS + HTML + JS)
  onscala.html        Juris Kurumsal Yönetim Paneli – Onscala (iframe ile gömülür, tek başına da açılır)
  codemag.html        Juris Kurumsal Yönetim Paneli – Codemag
  zyrone.html         Juris Kurumsal Yönetim Paneli – Zyrone (kit master ile aynı)
  qervan.html         Juris Kurumsal Yönetim Paneli – Qervan–WeTrade (v4, packages/juris-panels/qervan-wetrade/dist)
  meown.html          Juris Kurumsal Yönetim Paneli – Meown AI (packages/juris-panel-kit ile üretildi)

Panel kaynakları: packages/juris-panels/<müvekkil>/ (her biri kendi build'iyle). PANEL_EXTRACT eksik veri setlerini
(ACTIONS/DECISIONS/MEETINGS) boş geçer; böylece farklı kit sürümleri de Vibe'a canlı okunur.
  claude-adapter.js   claude.ai dışında window.claude.use("sample") şimi → /api/sample
server/
  index.mjs           Statik sunucu + Anthropic Messages API köprüsü (SSE akış)
```

## Çalıştırma (yerel)

```bash
npm install
cp .env.example .env   # ANTHROPIC_API_KEY girin
ANTHROPIC_API_KEY=sk-ant-... npm start
# → http://localhost:8787
```

Tarayıcıda `public/index.html` dosyasını doğrudan (file://) açarsanız sayfa görünür ama Vibe istekleri ve panel-veri okuması çalışmaz (file:// origin kısıtı). Sunucu üzerinden açın.

## index.html içindeki bloklar

| Blok | İçerik | Nerede |
|---|---|---|
| `:root` tokenları | Juris kimliği: lacivert `#0A2240`, kırmızı `#BC2F2C`; Playfair Display + Inter + JetBrains Mono; `--v-*` Vibe stüdyosu renkleri | `<style>` başı |
| `ASSETS`, `CRIT`, `FUNNEL`, `MATRIX`, `RISKS`, `DOCS` | MTFG portföy verisi (Notion "03. Stratejik Portföy" + Yatırımcıya Dönüşüm 1.0) | script başı |
| `PANELS` | Gömülü paneller: dosya adı, kısa özet, Claude için yedek metin | script |
| `PANEL_EXTRACT` | iframe içinden panel verisini JSON'a çeviren ifade (CLIENT, durumlar, riskler, aksiyonlar, OKR) | script |
| `SCOPES`, `ALANLAR`, `SOURCES`, `SCOPE_SRC` | Vibe kapsam çipleri, alan mercekleri, veri kaynakları | script |
| `TEMPLATES`, `TCATS`, `QUICK` | Şablon kartları (Doküman şablonları `file:true`) | script |
| `INSTR` | Claude'a verilen sistem talimatı (Türkçe, belge/beyan ayrımı, veri dışı rakam yok) | script |
| `SEED_SESS` | Örnek oturumlar (Claude çıktısı değil; "Örnek" etiketli) | script |
| `run()`, `buildContext()` | İstek akışı: bağlam = portföy + risk + Data Room + panel JSON + yüklenen dosyalar; `sample(turns, opts)` | script |

Panel durumları, oturumlar ve çıktı kütüphanesi `localStorage`'da tutulur (`mtfg-vibe-sessions`, `mtfg-vibe-library`, `juris-panel:*`).

## Claude bağlantısı

- **claude.ai içinde:** `window.claude.use("sample")` runtime'ı; sayfa `capabilities: {sample:{images:true}}` ile yayımlandı. İlk çalıştırmada izleyiciden izin ister.
- **Yerelde:** `claude-adapter.js` aynı arayüzü sağlar ve `server/index.mjs` üzerinden Anthropic API'ye gider. Model eşlemesi `TIER` sabitinde (Hızlı / Dengeli / Derin).

## Yeni müvekkil paneli eklemek

1. `public/<slug>.html` olarak panel dosyasını koyun (Juris Kurumsal Yönetim Paneli master'ından; yalnızca `CLIENT`, `DATAROOM`, değerlendirme veri blokları değişir).
2. `index.html` içinde `PANELS` nesnesine kayıt, sol menüye `data-view="p-<slug>"` düğmesi, `titles` nesnesine başlık, `SCOPES`/`SOURCES`/`SCOPE_SRC`'ye kapsam ekleyin.
3. `COS` listesine şirketi ekleyin.

## Notlar

- Dış kaynaklar yalnızca Google Fonts ve cdnjs (pdf.js, PDF metni için) — artifact CSP'si ile uyumlu.
- Dosya yükleme: txt/md/csv/json/html doğrudan; PDF → pdf.js ile metin; görseller Claude'a görsel olarak gider.
