import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SKOR_ETIKETLERI, TURETILEN_SKORLAR } from "@vibe/core";
import { api, type Rankings } from "../api.ts";
import { ErrorNote, LoadingRows, Note, PageHead, ScoreBar, SectionLabel } from "../components/ui.tsx";

const LISTELER: { key: keyof Rankings["listeler"]; baslik: string; karar: string }[] = [
  { key: "icerik_onceligi", baslik: "İçerik önceliği", karar: "ilk dalga içerik" },
  { key: "affiliate_skoru", baslik: "Affiliate potansiyeli", karar: "anlaşma aranır" },
  { key: "hizmet_skoru", baslik: "Hizmet potansiyeli", karar: "'biz kuralım' teklifi" },
  { key: "private_label", baslik: "Private-label (ham)", karar: "risk filtresinden önce" },
];

const FORMUL = `icerik_onceligi = 0.40·hacim + 0.30·aci + 0.30·tr_surtunmesi
affiliate_skoru = 0.35·hacim + 0.35·cozum_bollugu + 0.30·odeme_gucu
hizmet_skoru    = 0.30·aci + 0.30·odeme_gucu + 0.25·kurulum_karmasikligi + 0.15·(6−satis_dongusu)
private_label   = 0.22·hacim + 0.22·tr_surtunmesi + 0.18·inference_yogunlugu
                + 0.13·(6−gecis_maliyeti) + 0.13·(6−cozum_bollugu) + 0.12·(6−rekabet_yogunlugu)
risk_skoru      = 0.40·mevzuat_bagimliligi + 0.30·mevsimsellik + 0.30·satis_dongusu`;

export function RankingsPage() {
  const q = useQuery({ queryKey: ["rankings"], queryFn: api.rankings });
  const nav = useNavigate();
  const r = q.data;

  return (
    <div className="page">
      <PageHead
        eyebrow="Karar panosu"
        title="Hangi problemle ne yapacağız"
        standfirst="Eşikler mutlak değil, göreli: her skorun üst çeyreği (P75). Veri seti büyüdükçe eşik kendini yeniden ayarlar — sabit 70 eşiği 20 problemin 16'sını geçiriyordu."
      />
      {q.isError && <ErrorNote error={q.error} />}
      {q.isLoading && <LoadingRows />}
      {r && (
        <>
          <div className="stat-grid">
            {TURETILEN_SKORLAR.map((s) => (
              <div key={s} className="stat">
                <div className="k">{SKOR_ETIKETLERI[s]} · P75</div>
                <div className="v">{r.esikler[s].toFixed(0)}<small> · {r.gecen[s]} geçen</small></div>
                {s === "risk_skoru" && <div className="d">yüksek = kötü</div>}
              </div>
            ))}
          </div>

          <SectionLabel aside="private_label ≥ P75 ve risk_skoru < P75">Private-label adayları</SectionLabel>
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th>#</th><th>Problem</th><th>Private-label</th><th>Risk</th><th className="num">Paket</th></tr></thead>
              <tbody>
                {r.adaylar.map((a, i) => (
                  <tr key={a.id} className="clickable" onClick={() => nav(`/raf/${a.id}`)}>
                    <td className="rank">{i + 1}</td>
                    <td><div className="cell-title">{a.ad}</div></td>
                    <td style={{ width: 180 }}><ScoreBar value={a.private_label} threshold={r.esikler.private_label} /></td>
                    <td style={{ width: 180 }}><ScoreBar value={a.risk_skoru} threshold={r.esikler.risk_skoru} risk /></td>
                    <td className="num">{a.paket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 12 }}>
            <Note label="Aday ≠ karar">Geliştirme kararı için canlı talep sinyali (arama / boş sonuç logu) şart. Bkz. Talep Sinyalleri.</Note>
          </div>

          <div className="grid-2" style={{ marginTop: 8 }}>
            {LISTELER.map((l) => (
              <div key={l.key}>
                <SectionLabel aside={`P75 ${r.esikler[l.key].toFixed(0)} → ${l.karar}`}>{l.baslik}</SectionLabel>
                <div className="table-wrap">
                  <table className="data">
                    <tbody>
                      {r.listeler[l.key].map((row, i) => (
                        <tr key={row.id} className="clickable" onClick={() => nav(`/raf/${row.id}`)}>
                          <td className="rank">{i + 1}</td>
                          <td><div className="cell-title" style={{ fontWeight: 500 }}>{row.ad}</div></td>
                          <td style={{ width: 140 }}><ScoreBar value={row.skor} threshold={r.esikler[l.key]} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <SectionLabel aside="data/schema.md · bölüm 5">Formüller</SectionLabel>
          <pre className="card card-pad mono" style={{ margin: 0, overflowX: "auto", fontSize: 12.5, lineHeight: 1.9, color: "var(--ink-2)" }}>{FORMUL}</pre>
          <div style={{ marginTop: 12 }}>
            <Note tone="stop" label="Açık metodolojik sorun · v0.2">
              Mevzuata bağımlılık ile mevzuatın oynaklığı aynı şey değil. Önerilen: <code className="mono">risk = 0.50·mevzuat_oynakligi + 0.30·satis_dongusu + 0.20·mevsimsellik</code>
            </Note>
          </div>
        </>
      )}
    </div>
  );
}
