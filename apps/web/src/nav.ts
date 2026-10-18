import { Activity, BarChart3, Building2, GitBranch, LayoutDashboard, Layers, type LucideIcon } from "lucide-react";

/** Juris paneli dizilimi: her nav kaleminin mono bir kodu (k) ve bölümü var. */
export interface NavItem { to: string; k: string; label: string; icon: LucideIcon; section: string }

export const NAV: NavItem[] = [
  { to: "/", k: "00", label: "Genel Bakış", icon: LayoutDashboard, section: "Çalışma alanı" },
  { to: "/raf", k: "01", label: "Problem Rafı", icon: Layers, section: "Çalışma alanı" },
  { to: "/karar", k: "02", label: "Karar Panosu", icon: BarChart3, section: "Çalışma alanı" },
  { to: "/sektorler", k: "03", label: "Sektörler", icon: Building2, section: "Çalışma alanı" },
  { to: "/sinyaller", k: "04", label: "Talep Sinyalleri", icon: Activity, section: "Ürün yönetimi" },
  { to: "/surumler", k: "05", label: "Sürümler & Geri Bildirim", icon: GitBranch, section: "Ürün yönetimi" },
];
