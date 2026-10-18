import { useQuery } from "@tanstack/react-query";
import { Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { api, useAllProblems } from "../api.ts";
import { Empty, ErrorNote, LoadingRows, PageHead, SectionLabel, tarih } from "../components/ui.tsx";

const TIP: Record<string, { label: string; tone: string }> = {
  arama: { label: "Arama", tone: "" },
  bos_sonuc: { label: "Boş sonuç", tone: "danger" },
  problem_goruntuleme: { label: "Görüntüleme", tone: "verdi" },
  biz_kuralim: { label: "Biz kuralım", tone: "brass" },
};

export function SignalsPage() {
  const q = useQuery({ queryKey: ["signals"], queryFn: api.signals, refetchInterval: 15_000 });
  const probs = useAllProblems();
  const ad = (id: string) => probs.data?.items.find((p) => p.id === id)?.ad ?? id;
  const adet = (tip: string) => q.data?.ozet.tipler.find((t) => t.tip === tip)?.adet ?? 0;

  return (
    <div className="page">
      <PageHead
        eyebrow="Talep sinyali logu"
        title="Ne arıyorlar, neyi bulamıyorlar"
        standfirst="Private-label kararı tahminle değil, bu veriyle verilir. Boş sonuçlar yeni problem paketlerinin, 'biz kuralım' tıklamaları hizmet katmanının ham maddesidir."
      />
      {q.isError && <ErrorNote error={q.error} />}
      {q.isLoading && <LoadingRows />}
      {q.data && (
        <>
          <div className="stat-grid">
            {Object.entries(TIP).map(([k, v]) => (
              <div key={k} className="stat"><div className="k">{v.label}</div><div className="v">{adet(k)}</div></div>
            ))}
          </div>

          <div className="grid-2" style={{ marginTop: 8 }}>
            <div>
              <SectionLabel aside="yeni paket adayları">Boş sonuç veren aramalar</SectionLabel>
              <div className="table-wrap">
                {q.data.ozet.bosSorgular.length === 0 ? <Empty title="Henüz boş sonuç yok" text="Rafta bulunamayan aramalar burada birikir." /> : (
                  <table className="data">
                    <thead><tr><th>Sorgu</th><th className="num">Adet</th><th>Son</th></tr></thead>
                    <tbody>
                      {q.data.ozet.bosSorgular.map((b) => (
                        <tr key={b.sorgu}><td className="cell-title">“{b.sorgu}”</td><td className="num">{b.adet}</td><td className="muted">{tarih(b.son)}</td></tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div>
              <SectionLabel aside="biz kuralım öncelikli">Problem ilgisi</SectionLabel>
              <div className="table-wrap">
                {q.data.ozet.ilgi.length === 0 ? <Empty title="Henüz ilgi verisi yok" /> : (
                  <table className="data">
                    <thead><tr><th>Problem</th><th className="num">Görüntüleme</th><th className="num">Biz kuralım</th></tr></thead>
                    <tbody>
                      {q.data.ozet.ilgi.map((r) => (
                        <tr key={r.problem_id}>
                          <td><Link to={`/raf/${r.problem_id}`} className="cell-title">{ad(r.problem_id)}</Link></td>
                          <td className="num">{r.goruntuleme}</td>
                          <td className="num" style={r.biz_kuralim ? { color: "var(--red-ink)", fontWeight: 600 } : undefined}>{r.biz_kuralim}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          <SectionLabel aside="son 100 · 15 sn'de bir yenilenir">Akış</SectionLabel>
          <div className="table-wrap">
            {q.data.son.length === 0 ? <Empty icon={<Activity size={28} strokeWidth={1.5} />} title="Akış boş" text="Rafta arama yapın ya da bir problem açın." /> : (
              <table className="data">
                <thead><tr><th>Zaman</th><th>Tip</th><th>Ayrıntı</th><th className="num">Sonuç</th></tr></thead>
                <tbody>
                  {q.data.son.map((s) => (
                    <tr key={s.id}>
                      <td className="mono muted" style={{ whiteSpace: "nowrap" }}>{tarih(s.olusturma)}</td>
                      <td><span className={`badge ${TIP[s.tip]?.tone ?? ""}`}>{TIP[s.tip]?.label ?? s.tip}</span></td>
                      <td>{s.sorgu ? `“${s.sorgu}”` : s.problem_id ? <Link to={`/raf/${s.problem_id}`}>{ad(s.problem_id)}</Link> : "—"}{s.sektor && <span className="muted"> · {s.sektor}</span>}</td>
                      <td className="num">{s.sonuc_sayisi ?? ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
