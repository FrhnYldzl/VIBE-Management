# Tasarım Sistemi v0.1

Kaynak dil: kurucu doküman. Kod karşılığı: `apps/web/src/styles/tokens.css` (token) +
`apps/web/src/styles/app.css` (bileşen). Token dışı renk/font eklenmez.

## Renk

| Token | Açık | Koyu | Anlam |
|---|---|---|---|
| `--ground` | #F3F4F7 | #0E1218 | Sayfa zemini |
| `--surface` / `--surface-2` | #FFF / #EBEDF1 | #161B23 / #1D232D | Kart / ikincil yüzey |
| `--ink` / `--ink-soft` / `--muted` | #151A22 / #3D4553 / #626C7D | #E5E9F0 / #BCC4D1 / #8B95A6 | Metin kademeleri |
| `--brass` | #8F5C11 | #D8A354 | **Vurgu ve birincil aksiyon**; P75 üstü skor |
| `--verdi` | #17595B | #5FAEB0 | Olumlu / kanıt / yayında |
| `--danger` | #8C2F27 | #D9776C | Risk, ret, boş sonuç |

Kural: bir ekranda tek birincil (brass) buton. Skor çubuğu yalnız P75'i geçince renk alır —
renk = karar, süs değil.

## Tipografi

| Rol | Font | Kullanım |
|---|---|---|
| UI | Archivo 400–700 | Menü, tablo, buton, başlık |
| Düzyazı | Source Serif 4 | Standfirst, problem bağlamı, geri bildirim metni |
| Veri | IBM Plex Mono | Sayılar, eyebrow, sürüm, zaman |

Editoryal kalıp (McKinsey/Deloitte): **eyebrow** (mono, brass, büyük harf) → **başlık** (Archivo 700,
sıkı harf aralığı) → **standfirst** (serif, ink-soft) → ince ayırıcı.

## Bileşenler

| Bileşen | Sınıf | Referans |
|---|---|---|
| Uygulama kabuğu | `.shell .sidebar .topbar` | Slack / Linear |
| Komut paleti | `.palette` | Linear ⌘K |
| Araç çubuğu | `.toolbar .segmented` | ClickUp görünüm çubuğu |
| Veri tablosu | `table.data` | GitHub |
| Pano | `.board .board-col .board-card` | ClickUp board |
| Skor çubuğu | `ScoreBar` (P75 çentikli) | Artificial Analysis |
| Puan pipleri | `Pips` (1–5) | — |
| Not kutusu | `.note` `.note.stop` `.note.ok` | Kurucu doküman |
| Rozet | `.badge` `.brass` `.verdi` `.danger` `.outline` | GitHub label |
| Geri bildirim | `.fb-fab .fb-panel` | Linear / Vercel feedback |

## Durumlar (her bileşen için zorunlu)

Yükleniyor (skeleton) · boş (Empty + sonraki adım) · hata (`.note.stop`) · dolu. Açık + koyu + 375px.

## Claude Design ile çalışma

Brief şablonu: [briefs/_TEMPLATE.md](briefs/_TEMPLATE.md). Dönüşler `returns/` altına konur ve
token'lara eşlenerek koda alınır.
