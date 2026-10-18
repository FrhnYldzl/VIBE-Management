import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { api, useMeta } from "../api.ts";
import { ErrorNote, PageHead, ScoreBar, SectionLabel, Skeleton } from "../components/ui.tsx";

const FAZLAR = [
  { num: "FAZ A · v0.1–0.4", ad: "Operatör konsolu", when: "şimdi", text: "Veri, skor, talep sinyali ve kanıt katmanını biz yönetiyoruz. Mr. F MVP-0 burada doğar.", rev: "Altyapı · iş fazı 1'i taşır", current: true },
  { num: "FAZ B · v0.5–0.7", ad: "Yayın yüzeyi", when: "talep sinyaliyle", text: "Herkese açık problem sayfaları, konfigüratör, affiliate + 'biz kuralım' hunisi.", rev: "Affiliate · hizmet geliri" },
  { num: "FAZ C · v1.0", ad: "Kendi ürünler", when: "kanıt + talep sonrası", text: "Dört filtreyi geçen ve canlı talep verisiyle doğrulanan 1-2 dar ürün.", rev: "MRR başlar" },
];

export function Overview() {
  const meta = useMeta();
  const rank = useQuery({ queryKey: ["rankings"], queryFn: api.rankings });
  const sig = useQuery({ queryKey: ["signals"], queryFn: api.signals });
  const nav = useNavigate();
  const m = meta.data;
  const sinyalToplam = sig.data?.ozet.tipler.reduce((a, t) => a + t.adet, 0) ?? 0;

  return (
    <div className="page">
      <PageHead
        hero
        eyebrow={`Operatör Konsolu · v${m?.surum ?? "…"}`}
        title="Mr. F ve Problem Pazaryeri"
        standfirst="Sektörlerin ortak problemlerini raflayan, çözümleri kanıtla karşılaştıran ve kendi ürünlerini talep verisiyle seçen bir pazaryeri — altında, her işi her ay biraz daha ucuza yapan bir motor."
        actions={<Link to="/raf" className="btn primary lg">Problem Rafı <ArrowRight size={16} /></Link>}
      />

      {meta.isError && <ErrorNote error={meta.error} />}

      <div className="stat-grid">
        <div className="stat">
          <div className="k">Problem veri seti</div>
          <div className="v">{m ? m.problemSayisi : "–"}<small> / {m?.hedefProblem ?? 120}</small></div>
          <div className="progress"><span style={{ width: `${m ? (m.problemSayisi / m.hedefProblem) * 100 : 0}%` }} /></div>
        </div>
        <div className="stat"><div className="k">Temel skor sütunu</div><div className="v">{m?.temelSkor ?? "–"}</div><div className="d">+5 türetilen skor</div></div>
        <div className="stat"><div className="k">Sektör</div><div className="v">{m?.sektorSayisi ?? "–"}<small> · {m?.lansmanSektor ?? "–"} lansman</small></div></div>
        <div className="stat"><div className="k">Private-label adayı</div><div className="v">{m?.adaySayisi ?? "–"}</div><div className="d">aday ≠ karar</div></div>
        <div className="stat"><div className="k">Talep sinyali</div><div className="v">{sinyalToplam}</div><div className="d">arama · boş sonuç · ilgi</div></div>
      </div>

      <SectionLabel aside="kurucu doküman · ekonomik model">Fazlar</SectionLabel>
      <div className="phases">
        {FAZLAR.map((f) => (
          <div key={f.num} className={`phase${f.current ? " current" : ""}`}>
            <span className="num">{f.num}</span>
            <h4>{f.ad}</h4>
            <p className="when">{f.when}</p>
            <p>{f.text}</p>
            <p className="rev">{f.rev}</p>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 8 }}>
        <div>
          <SectionLabel aside={rank.data ? `P75 = ${rank.data.esikler.icerik_onceligi.toFixed(0)}` : undefined}>İlk yazılacak içerikler</SectionLabel>
          <div className="table-wrap">
            <table className="data">
              <tbody>
                {rank.isLoading && <tr><td><Skeleton h={160} /></td></tr>}
                {rank.data?.listeler.icerik_onceligi.slice(0, 6).map((r, i) => (
                  <tr key={r.id} className="clickable" onClick={() => nav(`/raf/${r.id}`)}>
                    <td className="rank">{i + 1}</td>
                    <td><div className="cell-title">{r.ad}</div></td>
                    <td style={{ width: 150 }}><ScoreBar value={r.skor} threshold={rank.data.esikler.icerik_onceligi} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <SectionLabel aside="private_label ≥ P75 ve risk < P75">Private-label adayları</SectionLabel>
          <div className="table-wrap">
            <table className="data">
              <tbody>
                {rank.isLoading && <tr><td><Skeleton h={160} /></td></tr>}
                {rank.data?.adaylar.slice(0, 6).map((r, i) => (
                  <tr key={r.id} className="clickable" onClick={() => nav(`/raf/${r.id}`)}>
                    <td className="rank">{i + 1}</td>
                    <td><div className="cell-title">{r.ad}</div></td>
                    <td style={{ width: 150 }}><ScoreBar value={r.private_label} threshold={rank.data.esikler.private_label} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SectionLabel>Disiplin</SectionLabel>
      <div className="grid-2">
        <div className="note">
          <span className="label">Skor adayı belirler</span>
          Geliştirme kararını canlı talep verisi onaylar. En görünür problem çoğu zaman en kötü ürün fırsatıdır.
        </div>
        <div className="note stop">
          <span className="label">Katı kural</span>
          Talep sinyali toplanmadan Faz C'ye geçilmez. Her arama ve boş sonuç bu konsolda kayda girer.
        </div>
      </div>
    </div>
  );
}
