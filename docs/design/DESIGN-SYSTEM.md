# Tasarım Sistemi v0.1.1 — Juris Kurumsal Kimlik standardı

**Görsel standart ve dizilim kaynağı:** `VIBE Management/Saas UI Dashboards/` altındaki paneller
(Juris Kurumsal Yönetim Paneli – Zyrone/Codemag/Onscala/Qervan Wetrade, MTFG Portföy Yönetim Paneli).
Kod karşılığı: `apps/web/src/styles/tokens.css` (token, panellerle birebir) + `apps/web/src/styles/app.css`.
Token dışı renk/font eklenmez.

## Renk (Pantone 289C lacivert · 7620C kırmızı)

| Token | Açık | Koyu | Anlam |
|---|---|---|---|
| `--navy` | #0A2240 | #F2F0EA | Marka, birincil buton, P75 üstü skor, aktif sekme |
| `--red` / `--red-ink` | #BC2F2C / #8A1F1D | — / #E26B68 | Logo, eyebrow, odak halkası, "girdi bekleniyor", risk |
| `--bg` / `--bg-elev` / `--bg-sunken` | #FAFAF7 / #FFF / #F3F2EE | #060F1F / #0D1B33 / #040A17 | Kâğıt zemin / kart / çukur alan |
| `--bg-nav` / `--bg-nav-2` | #0A2240 / #0E2B50 | #040A17 / #0A1830 | Sol ray, müvekkil/program kutusu |
| `--ink` → `--ink-4` | lacivert %100→36 | fildişi %100→32 | Metin kademeleri |
| `--success` `--warn` `--info` `--neutral` (+`-bg`) | | | Durum: tamamlandı · devam/beyan · onay bekliyor · başlamadı |
| `--track` `--chart-1..4` `--chart-ghost` | | | Çubuk/grafik |

## Tipografi

| Rol | Font | Kullanım |
|---|---|---|
| Display | Playfair Display 500–600 | h1 (30px), bölüm h2 (19px), tile değeri (30px), marka adı |
| Body | Inter 400–700 | Her şey |
| Mono | JetBrains Mono | Nav kodları (00, 01…), tarih, sayı, eyebrow değil (eyebrow Inter 11px .12em) |

## Dizilim (panellerle aynı)

```
.shell  = .sidebar (276px lacivert ray)  +  .main (kâğıt)
 sidebar: .ws (logo+ad)  →  .client (program kutusu)  →  .nav-section (.h başlık + .nav-item [.k kod][.t ad][.count])  →  .sidebar-foot
 main:    .topbar (crumbs · spacer · arama · tema)  →  .content > .page (max 1180)
 page:    .page-head (.eyebrow kırmızı → .page-title Playfair → .standfirst; sağda .btn + .btn.primary)
          .stat-grid (.stat / .stat.accent lacivert)  →  .legend
          .section-label (Playfair h2 + .aside meta)  →  .card / .table-wrap / .grid-2 / .grid-3
```

## Bileşenler

| Bileşen | Sınıf | Panel karşılığı |
|---|---|---|
| Tile | `.stat`, `.stat.accent` | `.tile`, `.tile.accent` |
| Durum pill | `.badge` + `.verdi/.info/.warn/.danger/.outline` + `.dot` | `.status.done/.review/.progress/.input/.pending` |
| Fonksiyon çipi | `.fnchip`, `.code` | `.fnchip`, `.area .code` |
| Not | `Note` (▲ + label + metin) `tone: ""|stop|ok|info` | `.note`, `.note.red/.blue` |
| Tablo | `table.data` | `table` (Doküman · Sorumlu · Durum · Drive) |
| Segment / sekme | `.segmented`, `.btn` | `.ent-tabs`, `.tab` |
| Skor çubuğu | `ScoreBar` (çentik = P75, kırmızı) | `.bar` / `.meter` |
| Pips (1–5) | `Pips` | `.lvl` |
| Pano | `.board` | `.kanban` |

## Durumlar (zorunlu)
Yükleniyor (skeleton) · boş (Empty + sonraki adım) · hata (`Note tone="stop"`) · dolu. Açık + koyu + 375px.

## Claude Design ile çalışma
Brief şablonu: [briefs/_TEMPLATE.md](briefs/_TEMPLATE.md). Brief'e bu dosya ve bir referans panel HTML'i eklenir;
dönüş token'lara eşlenerek koda alınır.
