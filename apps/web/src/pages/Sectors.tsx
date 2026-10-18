import { useNavigate } from "react-router-dom";
import { useSectors } from "../api.ts";
import { ErrorNote, LoadingRows, PageHead, SectionLabel } from "../components/ui.tsx";
import type { SektorRow } from "../api.ts";

export function SectorsPage() {
  const q = useSectors();
  const lansman = q.data?.filter((s) => s.lansman) ?? [];
  const diger = q.data?.filter((s) => !s.lansman) ?? [];

  return (
    <div className="page">
      <PageHead
        eyebrow="Sektörler"
        title="Sektör bir filtredir, kayıt değil"
        standfirst="Aynı problem N sektörde farklı nüansla görünür ve problem × sektör sayfa matrisini üretir. Lansman için beş sektör işaretli."
      />
      {q.isError && <ErrorNote error={q.error} />}
      {q.isLoading && <LoadingRows />}
      {q.data && (
        <>
          <SectionLabel aside={`${lansman.length} sektör`}>Lansman</SectionLabel>
          <div className="grid-3">{lansman.map((s) => <SectorCard key={s.id} s={s} />)}</div>
          <SectionLabel aside={`${diger.length} sektör`}>Sonraki dalga</SectionLabel>
          <div className="grid-3">{diger.map((s) => <SectorCard key={s.id} s={s} />)}</div>
        </>
      )}
    </div>
  );
}

function SectorCard({ s }: { s: SektorRow }) {
  const nav = useNavigate();
  return (
    <article className="card sector-card" onClick={() => nav(`/raf?sektor=${s.id}`)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && nav(`/raf?sektor=${s.id}`)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <h3>{s.ad}</h3>
        {s.lansman && <span className="badge brass">Lansman</span>}
      </div>
      <div><span className="n">{s.problemSayisi}</span> <span className="muted">problem</span></div>
      {s.not && <p className="muted" style={{ margin: 0, fontSize: 13, fontFamily: "var(--font-prose)" }}>{s.not}</p>}
    </article>
  );
}
