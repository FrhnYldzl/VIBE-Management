import { Route, Routes } from "react-router-dom";
import { Shell } from "./components/Shell.tsx";
import { Overview } from "./pages/Overview.tsx";
import { ProblemDetailPage } from "./pages/ProblemDetail.tsx";
import { Rack } from "./pages/Rack.tsx";
import { RankingsPage } from "./pages/Rankings.tsx";
import { ReleasesPage } from "./pages/Releases.tsx";
import { SectorsPage } from "./pages/Sectors.tsx";
import { SignalsPage } from "./pages/Signals.tsx";
import { Empty } from "./components/ui.tsx";

export function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/raf" element={<Rack />} />
        <Route path="/raf/:id" element={<ProblemDetailPage />} />
        <Route path="/karar" element={<RankingsPage />} />
        <Route path="/sektorler" element={<SectorsPage />} />
        <Route path="/sinyaller" element={<SignalsPage />} />
        <Route path="/surumler" element={<ReleasesPage />} />
        <Route path="*" element={<div className="page"><Empty title="Sayfa bulunamadı" text="Sol menüden ya da ⌘K ile devam edin." /></div>} />
      </Routes>
    </Shell>
  );
}
