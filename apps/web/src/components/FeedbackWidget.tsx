import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquarePlus, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../api.ts";

const TURLER = [
  { id: "istek", label: "İstek" },
  { id: "hata", label: "Hata" },
  { id: "tasarim", label: "Tasarım" },
  { id: "veri", label: "Veri" },
] as const;

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [tur, setTur] = useState<(typeof TURLER)[number]["id"]>("istek");
  const [mesaj, setMesaj] = useState("");
  const [puan, setPuan] = useState<number | undefined>();
  const [toast, setToast] = useState(false);
  const loc = useLocation();
  const qc = useQueryClient();

  const send = useMutation({
    mutationFn: () => api.sendFeedback({ tur, mesaj, sayfa: loc.pathname + loc.search, puan }),
    onSuccess: () => {
      setMesaj(""); setPuan(undefined); setOpen(false); setToast(true);
      qc.invalidateQueries({ queryKey: ["feedback"] });
    },
  });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <>
      {open && (
        <form className="fb-panel" onSubmit={(e) => { e.preventDefault(); send.mutate(); }} aria-label="Geri bildirim formu">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>Geri bildirim</h3>
            <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Kapat"><X size={16} /></button>
          </div>
          <div className="segmented" role="group" aria-label="Tür">
            {TURLER.map((t) => (
              <button type="button" key={t.id} aria-pressed={tur === t.id} onClick={() => setTur(t.id)}>{t.label}</button>
            ))}
          </div>
          <textarea className="textarea" autoFocus value={mesaj} onChange={(e) => setMesaj(e.target.value)}
            placeholder="Ne gördün, ne bekliyordun? Bu sayfa bağlamıyla kaydedilir." />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div className="stars" aria-label="Sayfa puanı">
              {[1, 2, 3, 4, 5].map((i) => (
                <button type="button" key={i} className={puan && i <= puan ? "on" : ""} onClick={() => setPuan(i === puan ? undefined : i)} aria-label={`${i} yıldız`}>
                  <Star size={16} fill="currentColor" />
                </button>
              ))}
            </div>
            <span className="muted mono" style={{ fontSize: 11 }}>{loc.pathname}</span>
          </div>
          {send.isError && <div className="note stop">{(send.error as Error).message}</div>}
          <button className="btn primary" disabled={mesaj.trim().length < 3 || send.isPending}>
            {send.isPending ? "Gönderiliyor…" : "Gönder"}
          </button>
        </form>
      )}
      <button className="fb-fab" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <MessageSquarePlus size={16} /><span>Geri bildirim</span>
      </button>
      {toast && <div className="toast" role="status">Teşekkürler — Sürümler sayfasında triage'a düştü.</div>}
    </>
  );
}
