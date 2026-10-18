import { Activity, BarChart3, Building2, GitBranch, LayoutDashboard, Layers, type LucideIcon } from "lucide-react";

export interface NavItem { to: string; label: string; icon: LucideIcon; section: "Çalışma alanı" | "Ürün" }

export const NAV: NavItem[] = [
  { to: "/", label: "Genel Bakış", icon: LayoutDashboard, section: "Çalışma alanı" },
  { to: "/raf", label: "Problem Rafı", icon: Layers, section: "Çalışma alanı" },
  { to: "/karar", label: "Karar Panosu", icon: BarChart3, section: "Çalışma alanı" },
  { to: "/sektorler", label: "Sektörler", icon: Building2, section: "Çalışma alanı" },
  { to: "/sinyaller", label: "Talep Sinyalleri", icon: Activity, section: "Ürün" },
  { to: "/surumler", label: "Sürümler & Geri Bildirim", icon: GitBranch, section: "Ürün" },
];
