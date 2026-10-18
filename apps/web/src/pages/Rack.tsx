import { useQuery } from "@tanstack/react-query";
import { Columns3, List, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  DURUMLAR, DURUM_ETIKETLERI, FONKSIYONLAR, FONKSIYON_ETIKETLERI, FIRSAT_SKORLARI, SKOR_ETIKETLERI,
  type ScoredProblem, type TuretilenSkor,
} from "@vibe/core";
import { api, useSectors } from "../api.ts";
import { AdayBadge, DurumBadge, Empty, ErrorNote, FonksiyonBadge, LoadingRows, PageHead, ScoreBar } from "../components/ui.tsx";

const SIRALA: TuretilenSkor[] = [...FIRSAT_SKORLARI, "risk_skoru"];
type Grup = "fonksiyon" | "durum" | "paket";

export function Rack() {
  const [params, setParams] = useSearchParams();
  const nav = useNavigate();
  const sectors = useSectors();
  const [qInput, setQInput] = useState(params.get("q") ?? "");

  const f = {
    q: params.get("q") ?? "",
    sektor: params.get("sektor") ?? "",
    fonksiyon: params.get("fonksiyon") ?? "",
    durum: params.get("durum") ?? "",
    aday: params.get("aday") ?? "",
    sirala: (params.get("sirala") as TuretilenSkor) || "icerik_onceligi",
  };
  const gorunum = params.get("gorunum") === "pano" ? "pano" : "liste";
  const grup = (params.get("grup") as Grup) || "fonksiyon";

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true });
  };

  // yazarken URL'yi güncelle (hafif debounce)
  useEffect(() => {
    const t = setTimeout(() => { if (qInput !== f.q) set("q", qInput.trim()); }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qInput]);

  const list = useQuery({ queryKey: ["problems", f], queryFn: () => api.problems(f), placeholderData: (prev) => prev });

  // Talep sinyali: kullanıcı yazmayı bıraktıktan sonra bir kez kaydet
  const lastLogged = useRef("");
  useEffect(() => {
    if (!f.q || f.q.length < 2 || !list.data || list.isPlaceholderData) return;
    const key = `${f.q}|${f.sektor}`;
    const t = setTimeout(() => {
      if (lastLogged.current === key) return;
      lastLogged.current = key;
      const sonuc = list.data.toplam;
      api.sendSignal({ tip: sonuc === 0 ? "bos_sonuc" : "arama", sorgu: f.q, sonuc_sayisi: sonuc, sektor: f.sektor || undefined });
    }, 1200);
    return () => clearTimeout(t);
  }, [f.q, f.sektor, list.data, list.isPlaceholderData]);

  const aktifFiltre = [f.q, f.sektor, f.fonksiyon, f.durum, f.aday].some(Boolean);
  const items = list.data?.items ?? [];
  const esik = list.data?.esikler;

  return (
    <div className="page">
      <PageHead
        eyebrow="Problem rafı"
        title="Problemler"
        standfirst="Birincil anahtar problem; sektör yalnızca filtre. Skor çubuğundaki çentik P75 eşiğidir — çentiği geçen her satır o kararın üst çeyreğindedir."
      />

      <div className="toolbar">
        <div className="segmented" role="group" aria-label="Görünüm">
          <button aria-pressed={gorunum === "liste"} onClick={() => set("gorunum", "")}><List size={14} />Liste</button>
          <button aria-pressed={gorunum === "pano"} onClick={() => set("gorunum", "pano")}><Columns3 size={14} />Pano</button>
        </div>
        <div className="sep" />
        <label className="input-icon grow">
          <Search size={14} />
          <span className="visually-hidden">Ara</span>
          <input className="input" value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder="Müşteri diliyle ara: “fatura”, “iade”, “KVKK”…" />
        </label>
        <select className="select" value={f.sektor} onChange={(e) => set("sektor", e.target.value)} aria-label="Sektör">
          <option value="">Tüm sektörler</option>
          {sectors.data?.map((s) => <option key={s.id} value={s.id}>{s.ad} ({s.problemSayisi})</option>)}
        </select>
        <select className="select" value={f.fonksiyon} onChange={(e) => set("fonksiyon", e.target.value)} aria-label="Fonksiyon">
          <option value="">Tüm fonksiyonlar</option>
          {FONKSIYONLAR.map((x) => <option key={x} value={x}>{FONKSIYON_ETIKETLERI[x]}</option>)}
        </select>
        <select className="select" value={f.durum} onChange={(e) => set("durum", e.target.value)} aria-label="Durum">
          <option value="">Tüm durumlar</option>
          {DURUMLAR.map((x) => <option key={x} value={x}>{DURUM_ETIKETLERI[x]}</option>)}
        </select>
        <button className={`btn${f.aday ? " primary" : ""}`} onClick={() => set("aday", f.aday ? "" : "1")} aria-pressed={!!f.aday}>PL adayları</button>
        <div className="sep" />
        <select className="select" value={f.sirala} onChange={(e) => set("sirala", e.target.value)} aria-label="Sırala">
          {SIRALA.map((s) => <option key={s} value={s}>Sırala: {SKOR_ETIKETLERI[s]}</option>)}
        </select>
        {gorunum === "pano" && (
          <select className="select" value={grup} onChange={(e) => set("grup", e.target.value)} aria-label="Grupla">
            <option value="fonksiyon">Grupla: Fonksiyon</option>
            <option value="durum">Grupla: Durum</option>
            <option value="paket">Grupla: Paket</option>
          </select>
        )}
        {aktifFiltre && (
          <button className="btn ghost" onClick={() => { setQInput(""); setParams(gorunum === "pano" ? { gorunum } : {}, { replace: true }); }}>
            <X size={14} />Temizle
          </button>
        )}
        <span className="result-count">{list.data ? `${list.data.toplam} problem` : ""}</span>
      </div>

      {list.isError && <ErrorNote error={list.error} />}
      {list.isLoading && <LoadingRows />}
      {list.data && items.length === 0 && (
        <div className="card">
          <Empty
            title="Bu arama rafta karşılık bulmadı"
            text={<>Boş sonuç <b>talep sinyali</b> olarak kaydedildi — yeni problem paketine aday olabilir.</>}
          />
        </div>
      )}

      {items.length > 0 && esik && (gorunum === "liste"
        ? <ListView items={items} sirala={f.sirala} esik={esik} onOpen={(id) => nav(`/raf/${id}`)} />
        : <BoardView items={items} grup={grup} sirala={f.sirala} esik={esik} onOpen={(id) => nav(`/raf/${id}`)} />)}
    </div>
  );
}

function ListView({ items, sirala, esik, onOpen }: { items: ScoredProblem[]; sirala: TuretilenSkor; esik: Record<TuretilenSkor, number>; onOpen: (id: string) => void }) {
  const cols = FIRSAT_SKORLARI;
  return (
    <div className="table-wrap">
      <table className="data">
        <thead>
          <tr>
            <th>#</th>
            <th>Problem</th>
            {cols.map((c) => <th key={c} style={c === sirala ? { color: "var(--brass)" } : undefined}>{SKOR_ETIKETLERI[c]}</th>)}
            <th>Risk</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p, i) => (
            <tr key={p.id} className="clickable" onClick={() => onOpen(p.id)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen(p.id)}>
              <td className="rank">{i + 1}</td>
              <td style={{ minWidth: 280 }}>
                <div className="cell-title">{p.ad}</div>
                <div className="cell-sub" style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 6, flexWrap: "wrap" }}>
                  <FonksiyonBadge fonksiyon={p.fonksiyon} />
                  <span className="mono">P{p.paket}</span>
                  <span>· {p.yayilim === "yatay" ? "yatay" : `${p.sektorler.length} sektör`}</span>
                  {p.plAday && <AdayBadge />}
                </div>
              </td>
              {cols.map((c) => <td key={c} style={{ width: 130 }}><ScoreBar value={p.hesaplanan[c]} threshold={esik[c]} /></td>)}
              <td style={{ width: 120 }}><ScoreBar value={p.hesaplanan.risk_skoru} threshold={esik.risk_skoru} risk /></td>
              <td><DurumBadge durum={p.durum} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BoardView({ items, grup, sirala, esik, onOpen }: { items: ScoredProblem[]; grup: Grup; sirala: TuretilenSkor; esik: Record<TuretilenSkor, number>; onOpen: (id: string) => void }) {
  const cols = useMemo(() => {
    const keys: string[] =
      grup === "durum" ? [...DURUMLAR]
      : grup === "paket" ? [...new Set(items.map((p) => String(p.paket)))].sort()
      : FONKSIYONLAR.filter((x) => items.some((p) => p.fonksiyon === x));
    return keys.map((k) => ({
      key: k,
      label: grup === "durum" ? DURUM_ETIKETLERI[k] : grup === "paket" ? `Paket ${k}` : FONKSIYON_ETIKETLERI[k],
      items: items.filter((p) => (grup === "durum" ? p.durum : grup === "paket" ? String(p.paket) : p.fonksiyon) === k),
    }));
  }, [items, grup]);

  return (
    <div className="board">
      {cols.map((c) => (
        <section key={c.key} className="board-col" aria-label={c.label}>
          <div className="board-col-head">{c.label}<span className="mono">{c.items.length}</span></div>
          {c.items.map((p) => (
            <article key={p.id} className="board-card" onClick={() => onOpen(p.id)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen(p.id)}>
              <div className="board-card-title">{p.ad}</div>
              <ScoreBar value={p.hesaplanan[sirala]} threshold={esik[sirala]} risk={sirala === "risk_skoru"} />
              <div className="board-card-meta">
                {grup !== "fonksiyon" && <FonksiyonBadge fonksiyon={p.fonksiyon} />}
                {grup !== "durum" && <DurumBadge durum={p.durum} />}
                {p.plAday && <AdayBadge />}
              </div>
            </article>
          ))}
          {c.items.length === 0 && <div className="muted" style={{ padding: 8, fontSize: 12.5 }}>Boş</div>}
        </section>
      ))}
    </div>
  );
}
