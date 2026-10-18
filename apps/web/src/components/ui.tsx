import { DURUM_ETIKETLERI, FONKSIYON_ETIKETLERI } from "@vibe/core";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

export function PageHead({ eyebrow, title, standfirst, actions, hero }: {
  eyebrow?: string; title: string; standfirst?: ReactNode; actions?: ReactNode; hero?: boolean;
}) {
  // Juris page-h dizilimi: sol blok (eyebrow + h1 + p), sağda aksiyonlar
  return (
    <header className="page-head">
      <div className="page-head-row">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={`page-title${hero ? " hero-title" : ""}`}>{title}</h1>
          {standfirst && <p className="standfirst">{standfirst}</p>}
        </div>
        {actions && <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{actions}</div>}
      </div>
    </header>
  );
}

export function SectionLabel({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <h2 className="section-label">
      <span>{children}</span>
      {aside && <span className="aside">{aside}</span>}
    </h2>
  );
}

/** 0-100 türetilen skor; P75 eşiği çentikle gösterilir. risk = yüksek kötü. */
export function ScoreBar({ value, threshold, risk }: { value: number; threshold?: number; risk?: boolean }) {
  const pass = threshold !== undefined && value >= threshold;
  return (
    <div className={`scorebar${pass ? " pass" : ""}${risk ? " risk" : ""}`} title={threshold !== undefined ? `P75 eşiği: ${threshold.toFixed(0)}` : undefined}>
      <div className="scorebar-track">
        <div className="scorebar-fill" style={{ width: `${Math.min(100, value)}%` }} />
        {threshold !== undefined && <div className="scorebar-tick" style={{ left: `calc(${threshold}% - 1px)` }} />}
      </div>
      <span className="scorebar-val">{value.toFixed(0)}</span>
    </div>
  );
}

export function Pips({ value }: { value: number }) {
  return (
    <span className="pips" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => <span key={i} className={i <= value ? "on" : ""} />)}
    </span>
  );
}

export function DurumBadge({ durum }: { durum: string }) {
  const tone = durum === "yayinda" ? "verdi" : durum === "olculdu" ? "brass" : "";
  return <span className={`badge ${tone}`}><span className="dot" />{DURUM_ETIKETLERI[durum] ?? durum}</span>;
}

export function FonksiyonBadge({ fonksiyon }: { fonksiyon: string }) {
  return <span className="badge outline">{FONKSIYON_ETIKETLERI[fonksiyon] ?? fonksiyon}</span>;
}

export function AdayBadge() {
  return <span className="badge brass" title="private_label P75 üstü ve risk P75 altı">PL adayı</span>;
}

export function Empty({ title, text, icon }: { title: string; text?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="empty">
      {icon ?? <Inbox size={28} strokeWidth={1.5} />}
      <h3>{title}</h3>
      {text && <div>{text}</div>}
    </div>
  );
}

export function Skeleton({ h = 16, w = "100%" }: { h?: number; w?: number | string }) {
  return <div className="skeleton" style={{ height: h, width: w }} />;
}

export function LoadingRows({ n = 6 }: { n?: number }) {
  return (
    <div className="stack" style={{ gap: 10 }}>
      {Array.from({ length: n }, (_, i) => <Skeleton key={i} h={36} />)}
    </div>
  );
}

/** Juris not kutusu: ▲ işareti + etiket + metin. tone: warn (varsayılan) · stop · ok · info */
export function Note({ label, tone = "", children }: { label?: string; tone?: "" | "stop" | "ok" | "info"; children: ReactNode }) {
  return (
    <div className={`note ${tone}`}>
      <span aria-hidden>▲</span>
      <div>
        {label && <span className="label">{label}</span>}
        {children}
      </div>
    </div>
  );
}

export function ErrorNote({ error }: { error: unknown }) {
  return (
    <Note tone="stop" label="Bağlantı hatası">
      {error instanceof Error ? error.message : "Bilinmeyen hata"} — API çalışıyor mu? (<code>npm run dev</code>)
    </Note>
  );
}

export const tarih = (iso: string) =>
  new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
