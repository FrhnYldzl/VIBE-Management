import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { api, type GeriBildirim, type Triage } from "../api.ts";
import { Empty, ErrorNote, LoadingRows, PageHead, SectionLabel, tarih } from "../components/ui.tsx";

const TRIAGE: { id: Triage; label: string; tone: string }[] = [
  { id: "yeni", label: "Yeni", tone: "" },
  { id: "simdi", label: "Şimdi", tone: "brass" },
  { id: "sonraki", label: "Sonraki sürüm", tone: "verdi" },
  { id: "fikir", label: "Fikir", tone: "" },
  { id: "ret", label: "Ret", tone: "danger" },
];
const TUR: Record<string, string> = { hata: "Hata", istek: "İstek", tasarim: "Tasarım", veri: "Veri" };
const DEGISIKLIK: Record<string, string> = { yeni: "brass", iyilestirme: "verdi", duzeltme: "danger", test: "" };

export function ReleasesPage() {
  const rel = useQuery({ queryKey: ["releases"], queryFn: api.releases });
  const fb = useQuery({ queryKey: ["feedback"], queryFn: api.feedback });
  const [filtre, setFiltre] = useState<Triage | "">("");
  const items = (fb.data ?? []).filter((g) => !filtre || g.triage === filtre);

  return (
    <div className="page">
      <PageHead
        eyebrow={`Güncel sürüm · v${rel.data?.guncel ?? "…"}`}
        title="Sürümler ve geri bildirim"
        standfirst="Her sürüm bir iterasyon: hedef → yapım → demo → geri bildirim → karar. Uygulamanın her sayfasındaki 'Geri bildirim' butonu buraya düşer; triage bir sonraki sürümün kapsamını belirler."
      />
      {rel.isError && <ErrorNote error={rel.error} />}

      <div className="grid-2" style={{ alignItems: "start" }}>
        <div>
          <SectionLabel aside="CHANGELOG.md">Sürüm notları</SectionLabel>
          <div className="card card-pad timeline">
            {rel.isLoading && <LoadingRows n={4} />}
            {rel.data?.surumler.map((s) => (
              <div key={s.surum} className="tl-item">
                <div className="tl-ver">v{s.surum}<div className="muted" style={{ fontSize: 11 }}>{s.tarih}</div></div>
                <div>
                  <h4>{s.baslik} <span className="badge brass">{s.durum === "yapimda" ? "Yapımda" : "Yayında"}</span><span className="badge outline">Faz {s.faz}</span></h4>
                  {s.degisiklikler.map((d, i) => (
                    <div key={i} className="change"><span className={`badge ${DEGISIKLIK[d.tur] ?? ""}`}>{d.tur}</span><span>{d.metin}</span></div>
                  ))}
                </div>
              </div>
            ))}
            {rel.data?.planli.map((s) => (
              <div key={s.surum} className="tl-item" style={{ opacity: 0.75 }}>
                <div className="tl-ver">v{s.surum}<div className="muted" style={{ fontSize: 11 }}>planlı</div></div>
                <div><h4>{s.baslik}</h4><div className="muted" style={{ fontSize: 13.5 }}>{s.ozet}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel aside={`${fb.data?.length ?? 0} kayıt`}>Geri bildirim gelen kutusu</SectionLabel>
          <div className="segmented" role="group" aria-label="Triage filtresi" style={{ marginBottom: 12, flexWrap: "wrap" }}>
            <button aria-pressed={filtre === ""} onClick={() => setFiltre("")}>Tümü</button>
            {TRIAGE.map((t) => (
              <button key={t.id} aria-pressed={filtre === t.id} onClick={() => setFiltre(t.id)}>
                {t.label} <span className="mono muted">{fb.data?.filter((g) => g.triage === t.id).length ?? 0}</span>
              </button>
            ))}
          </div>
          {fb.isError && <ErrorNote error={fb.error} />}
          <div className="stack" style={{ gap: 10 }}>
            {fb.isLoading && <LoadingRows n={3} />}
            {fb.data && items.length === 0 && (
              <div className="card"><Empty icon={<MessageSquare size={28} strokeWidth={1.5} />} title="Kayıt yok" text="Sağ alttaki 'Geri bildirim' butonuyla ilkini bırakın." /></div>
            )}
            {items.map((g) => <FeedbackCard key={g.id} g={g} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackCard({ g }: { g: GeriBildirim }) {
  const qc = useQueryClient();
  const m = useMutation({
    mutationFn: (t: Triage) => api.setTriage(g.id, t),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["feedback"] }),
  });
  const tone = TRIAGE.find((t) => t.id === g.triage)?.tone ?? "";
  return (
    <article className="card card-pad" style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <span className="mono muted">#{g.id}</span>
        <span className="badge outline">{TUR[g.tur] ?? g.tur}</span>
        {g.puan && <span className="badge brass">{"★".repeat(g.puan)}</span>}
        <span className="mono muted" style={{ fontSize: 11.5 }}>{g.sayfa} · v{g.surum} · {tarih(g.olusturma)}</span>
      </div>
      <div className="prose" style={{ fontSize: 15, whiteSpace: "pre-wrap" }}>{g.mesaj}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className={`badge ${tone}`}><span className="dot" />{TRIAGE.find((t) => t.id === g.triage)?.label}</span>
        <select className="select" value={g.triage} onChange={(e) => m.mutate(e.target.value as Triage)} aria-label="Triage" style={{ marginLeft: "auto" }}>
          {TRIAGE.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
      </div>
    </article>
  );
}
