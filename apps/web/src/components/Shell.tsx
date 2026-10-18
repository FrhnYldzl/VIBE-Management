import { Menu, Monitor, Moon, Search, Sun } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useMeta } from "../api.ts";
import { NAV } from "../nav.ts";
import { CommandPalette } from "./CommandPalette.tsx";
import { FeedbackWidget } from "./FeedbackWidget.tsx";

type Theme = "system" | "light" | "dark";

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const t = localStorage.getItem("vibe-theme");
      return t === "light" || t === "dark" ? t : "system";
    } catch { return "system"; }
  });
  useEffect(() => {
    const el = document.documentElement;
    if (theme === "system") delete el.dataset.theme; else el.dataset.theme = theme;
    try { localStorage.setItem("vibe-theme", theme); } catch { /* depolama kapalı olabilir */ }
  }, [theme]);
  const cycle = () => setTheme((t) => (t === "system" ? "light" : t === "light" ? "dark" : "system"));
  return [theme, cycle];
}

export function Shell({ children }: { children: ReactNode }) {
  const { data: meta } = useMeta();
  const [theme, cycleTheme] = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const loc = useLocation();

  const contentRef = useRef<HTMLElement>(null);
  useEffect(() => {
    setNavOpen(false);
    contentRef.current?.scrollTo(0, 0);
  }, [loc.pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = [...NAV].sort((a, b) => b.to.length - a.to.length).find((n) => n.to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(n.to));
  const sections = [...new Set(NAV.map((n) => n.section))];
  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const pct = meta ? Math.round((meta.problemSayisi / meta.hedefProblem) * 100) : 0;

  return (
    <div className={`shell${navOpen ? " nav-open" : ""}`}>
      <aside className="sidebar" aria-label="Ana menü">
        <div className="ws">
          <div className="ws-logo" aria-hidden>F</div>
          <div>
            <div className="ws-name">VIBE · Mr. F</div>
            <div className="ws-sub">OPERATÖR KONSOLU</div>
          </div>
        </div>
        {sections.map((sec) => (
          <nav key={sec}>
            <div className="nav-section">{sec}</div>
            {NAV.filter((n) => n.section === sec).map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === "/"} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>
                <n.icon size={16} strokeWidth={1.8} />
                {n.label}
                {n.to === "/raf" && meta && <span className="count">{meta.problemSayisi}</span>}
              </NavLink>
            ))}
          </nav>
        ))}
        <div className="sidebar-foot">
          <div className="phase-mini"><b>Faz A</b> · Operatör konsolu</div>
          <div className="phase-mini">Veri seti <b className="mono">{meta?.problemSayisi ?? "–"}/{meta?.hedefProblem ?? 120}</b></div>
          <div className="progress" aria-label={`Veri seti %${pct}`}><span style={{ width: `${pct}%` }} /></div>
          <div className="phase-mini mono">v{meta?.surum ?? "…"}</div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="icon-btn menu-btn" onClick={() => setNavOpen(true)} aria-label="Menüyü aç"><Menu size={18} /></button>
          <div className="crumbs">
            <span>Mr. F</span><span>/</span><b>{current?.label ?? "—"}</b>
          </div>
          <div className="topbar-spacer" />
          <button className="search-trigger" onClick={() => setPaletteOpen(true)} aria-label="Ara ve git">
            <Search size={15} /><span>Problem ara, sayfaya git…</span><kbd>Ctrl K</kbd>
          </button>
          <button className="icon-btn" onClick={cycleTheme} aria-label={`Tema: ${theme}`} title={`Tema: ${theme === "system" ? "sistem" : theme === "light" ? "açık" : "koyu"}`}>
            <ThemeIcon size={16} />
          </button>
        </header>
        <main className="content" ref={contentRef} onClick={() => navOpen && setNavOpen(false)}>{children}</main>
      </div>

      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
      <FeedbackWidget />
    </div>
  );
}
