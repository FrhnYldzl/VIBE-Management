import { FileText, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FONKSIYON_ETIKETLERI } from "@vibe/core";
import { useAllProblems } from "../api.ts";
import { NAV } from "../nav.ts";
import { norm } from "../search.ts";

interface Item { key: string; group: string; label: string; sub?: string; icon: typeof Search; to: string }

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const nav = useNavigate();
  const { data } = useAllProblems();
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(() => {
    const n = norm(q);
    const pages = NAV.filter((p) => !n || norm(p.label).includes(n)).map((p) => ({
      key: p.to, group: "Sayfalar", label: p.label, icon: p.icon, to: p.to,
    }));
    const probs = (data?.items ?? [])
      .filter((p) => !n || norm([p.ad, p.id, ...p.musteri_dili].join(" ")).includes(n))
      .slice(0, 8)
      .map((p) => ({ key: p.id, group: "Problemler", label: p.ad, sub: FONKSIYON_ETIKETLERI[p.fonksiyon], icon: FileText, to: `/raf/${p.id}` }));
    const search: Item[] = q.trim() ? [{ key: "__ara", group: "Rafta ara", label: `“${q.trim()}” için rafta ara`, icon: Search, to: `/raf?q=${encodeURIComponent(q.trim())}` }] : [];
    return [...probs, ...pages, ...search];
  }, [q, data]);

  useEffect(() => setSel(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const go = (it?: Item) => { if (!it) return; nav(it.to); onClose(); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); go(items[sel]); }
  };

  let lastGroup = "";
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Komut paleti" onKeyDown={onKey}>
        <div className="palette-input">
          <Search size={18} className="muted" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Problem, müşteri dili ya da sayfa…" aria-label="Ara" />
          <kbd>Esc</kbd>
        </div>
        <div className="palette-list" ref={listRef} role="listbox">
          {items.length === 0 && <div className="palette-empty">Sonuç yok.</div>}
          {items.map((it, i) => {
            const header = it.group !== lastGroup ? <div className="palette-group">{it.group}</div> : null;
            lastGroup = it.group;
            return (
              <div key={it.key}>
                {header}
                <div className="palette-item" data-i={i} role="option" aria-selected={i === sel} onMouseMove={() => setSel(i)} onClick={() => go(it)}>
                  <it.icon size={16} strokeWidth={1.8} />
                  <span>{it.label}</span>
                  {it.sub && <span className="sub">{it.sub}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="palette-foot"><span><kbd>↑</kbd> <kbd>↓</kbd> gez</span><span><kbd>↵</kbd> aç</span><span><kbd>Ctrl K</kbd> kapat</span></div>
      </div>
    </div>
  );
}
