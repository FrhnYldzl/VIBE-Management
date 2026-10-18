import { useQuery } from "@tanstack/react-query";
import type { Esikler, ScoredProblem, Sektor, TuretilenSkor } from "@vibe/core";

async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, { ...init, headers: { "content-type": "application/json", ...init?.headers } });
  if (!r.ok) {
    const body = (await r.json().catch(() => ({}))) as { hata?: string };
    throw new Error(body.hata ?? `HTTP ${r.status}`);
  }
  return r.json() as Promise<T>;
}

export interface Meta {
  surum: string;
  problemSayisi: number;
  hedefProblem: number;
  sektorSayisi: number;
  lansmanSektor: number;
  adaySayisi: number;
  temelSkor: number;
  esikler: Esikler;
  paketler: { paket: number; ad: string; surum: string }[];
  durumDagilimi: Record<string, number>;
}
export interface SektorRow extends Sektor { problemSayisi: number }
export interface ProblemList { toplam: number; esikler: Esikler; items: ScoredProblem[] }
export interface ProblemDetail { problem: ScoredProblem; esikler: Esikler; sira: Record<TuretilenSkor, number>; toplam: number }
export interface RankRow { id: string; ad: string; paket: number; fonksiyon: string; skor: number }
export interface Rankings {
  esikler: Esikler;
  gecen: Record<TuretilenSkor, number>;
  listeler: Record<"icerik_onceligi" | "affiliate_skoru" | "hizmet_skoru" | "private_label", RankRow[]>;
  adaylar: { id: string; ad: string; paket: number; fonksiyon: string; private_label: number; risk_skoru: number }[];
}
export interface Sinyal { id: number; tip: string; sorgu: string | null; problem_id: string | null; sonuc_sayisi: number | null; sektor: string | null; olusturma: string }
export interface Signals {
  ozet: {
    tipler: { tip: string; adet: number }[];
    bosSorgular: { sorgu: string; adet: number; son: string }[];
    ilgi: { problem_id: string; goruntuleme: number; biz_kuralim: number }[];
  };
  son: Sinyal[];
}
export type Triage = "yeni" | "simdi" | "sonraki" | "fikir" | "ret";
export interface GeriBildirim { id: number; tur: string; mesaj: string; sayfa: string; surum: string; puan: number | null; triage: Triage; olusturma: string }
export interface Releases {
  guncel: string;
  surumler: { surum: string; tarih: string; faz: string; baslik: string; durum: string; degisiklikler: { tur: string; metin: string }[] }[];
  planli: { surum: string; baslik: string; ozet: string }[];
}

export type ProblemFilters = Partial<Record<"q" | "sektor" | "fonksiyon" | "durum" | "yayilim" | "aday" | "sirala", string>>;

export const api = {
  meta: () => http<Meta>("/api/meta"),
  sectors: () => http<SektorRow[]>("/api/sectors"),
  problems: (f: ProblemFilters = {}) => {
    const qs = new URLSearchParams(Object.entries(f).filter(([, v]) => v) as [string, string][]);
    return http<ProblemList>(`/api/problems?${qs}`);
  },
  problem: (id: string) => http<ProblemDetail>(`/api/problems/${encodeURIComponent(id)}`),
  rankings: () => http<Rankings>("/api/rankings"),
  signals: () => http<Signals>("/api/signals"),
  feedback: () => http<GeriBildirim[]>("/api/feedback"),
  releases: () => http<Releases>("/api/releases"),
  sendSignal: (body: { tip: string; sorgu?: string; problem_id?: string; sonuc_sayisi?: number; sektor?: string }) =>
    http<{ ok: true }>("/api/signals", { method: "POST", body: JSON.stringify(body) }).catch(() => undefined),
  sendFeedback: (body: { tur: string; mesaj: string; sayfa: string; puan?: number }) =>
    http<GeriBildirim>("/api/feedback", { method: "POST", body: JSON.stringify(body) }),
  setTriage: (id: number, triage: Triage) =>
    http<GeriBildirim>(`/api/feedback/${id}`, { method: "PATCH", body: JSON.stringify({ triage }) }),
};

export const useMeta = () => useQuery({ queryKey: ["meta"], queryFn: api.meta, staleTime: 60_000 });
export const useSectors = () => useQuery({ queryKey: ["sectors"], queryFn: api.sectors, staleTime: 60_000 });
export const useAllProblems = () => useQuery({ queryKey: ["problems", {}], queryFn: () => api.problems(), staleTime: 60_000 });
