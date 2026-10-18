import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, Wrench } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_SKORLAR, SKOR_ETIKETLERI, TURETILEN_SKORLAR } from "@vibe/core";
import { api, useSectors } from "../api.ts";
import { AdayBadge, DurumBadge, Empty, ErrorNote, FonksiyonBadge, LoadingRows, Note, Pips, ScoreBar, SectionLabel } from "../components/ui.tsx";

// Yüksek değerin kötü olduğu temel skorlar (şema notları)
const TERS_IPUCU: Partial<Record<string, string>> = {
  gecis_maliyeti: "yüksek = PL için kötü",
  cozum_bollugu: "yüksek = affiliate iyi, PL kötü",
  kurulum_karmasikligi: "yüksek = hizmet için iyi",
  mevzuat_bagimliligi: "çift yönlü: moat + risk",
  rekabet_yogunlugu: "yüksek = PL için kötü",
};

const goruldu = new Set<string>();

export function ProblemDetailPage() {
  const { id = "" } = useParams();
  const q = useQuery({ queryKey: ["problem", id], queryFn: () => api.problem(id) });
  const sectors = useSectors();
  const kur = useMutation({ mutationFn: () => api.sendSignal({ tip: "biz_kuralim", problem_id: id }) });

  useEffect(() => {
    if (goruldu.has(id)) return;
    goruldu.add(id);
    api.sendSignal({ tip: "problem_goruntuleme", problem_id: id });
  }, [id]);

  if (q.isLoading) return <div className="page"><LoadingRows n={8} /></div>;
  if (q.isError) {
    return (
      <div className="page">
        {String((q.error as Error).message).includes("bulunamadı")
          ? <Empty title="Problem bulunamadı" text={<Link to="/raf" className="btn">Rafa dön</Link>} />
          : <ErrorNote error={q.error} />}
      </div>
    );
  }
  const { problem: p, esikler, sira, toplam } = q.data!;
  const sektorAd = (sid: string) => sectors.data?.find((s) => s.id === sid)?.ad ?? sid;

  return (
    <div className="page">
      <Link to="/raf" className="btn ghost" style={{ marginBottom: 14, paddingLeft: 6 }}><ArrowLeft size={15} />Problem rafı</Link>

      <header className="page-head">
        <p className="eyebrow">{p.id} · paket {p.paket}</p>
        <h1 className="page-title">{p.ad}</h1>
        <p className="standfirst">{p.ozet}</p>
        <div className="chips" style={{ marginTop: 14 }}>
          <FonksiyonBadge fonksiyon={p.fonksiyon} />
          <DurumBadge durum={p.durum} />
          <span className="badge outline">{p.yayilim === "yatay" ? "Yatay" : "Seçili sektörler"}</span>
          {p.plAday && <AdayBadge />}
        </div>
      </header>

      <div className="detail">
        <div>
          <SectionLabel aside="SEO/GEO ve konfigüratör eşleştirmesinin temeli">Müşteri dili</SectionLabel>
          <div className="chips">{p.musteri_dili.map((m) => <span key={m} className="chip">“{m}”</span>)}</div>

          <SectionLabel>Bağlam</SectionLabel>
          <div className="ctx-grid">
            <div className="ctx"><h4>Tetikleyici</h4><p>{p.tetikleyici}</p></div>
            <div className="ctx"><h4>Bugün nasıl çözülüyor</h4><p>{p.bugun_nasil_cozuluyor}</p></div>
            <div className="ctx"><h4>Alıcı persona</h4><p>{p.alici_persona}</p></div>
            <div className="ctx"><h4>Ödeme istekliliği</h4><p>{p.odeme_istekliligi}</p></div>
            <div className="ctx" style={{ gridColumn: "1 / -1" }}><h4>Türkiye özgünlüğü</h4><p>{p.tr_ozgunluk_notu}</p></div>
          </div>

          <SectionLabel aside="ölçülemeyen problem sayfası yayınlanmaz">Kanıt metriği</SectionLabel>
          <div className="card card-pad">
            <ul className="list-plain">{p.kanit_metrigi.map((k) => <li key={k}>{k}</li>)}</ul>
            <p className="muted" style={{ margin: "12px 0 0", fontSize: 13 }}><b>Veri ihtiyacı:</b> {p.veri_ihtiyaci}</p>
          </div>

          <SectionLabel>Çözüm adayları</SectionLabel>
          <div style={{ marginBottom: 12 }}>
            <Note label="Doğrulanmamış · v0 tarama tohumu">
              Mr. F katalog taraması teyit edene ve dört sütun (KVKK, TR ödeme/fatura, Türkçe performans, TR entegrasyon) dolana kadar bu adlar yayın yüzeyine çıkmaz.
            </Note>
          </div>
          <div className="grid-2">
            <div className="card card-pad"><h3 className="card-title" style={{ marginBottom: 10 }}>Türkiye</h3><div className="chips">{p.cozum_adaylari.turkiye.map((c) => <span key={c} className="chip">{c}</span>)}</div></div>
            <div className="card card-pad"><h3 className="card-title" style={{ marginBottom: 10 }}>Global</h3><div className="chips">{p.cozum_adaylari.global.map((c) => <span key={c} className="chip">{c}</span>)}</div></div>
          </div>

          <SectionLabel aside="1–5 tamsayı">Temel skorlar</SectionLabel>
          <div className="card card-pad">
            <div className="base-scores">
              {BASE_SKORLAR.map((s) => (
                <div key={s} className="base-score">
                  <div>
                    <div>{SKOR_ETIKETLERI[s]}</div>
                    {TERS_IPUCU[s] && <div className="hint">{TERS_IPUCU[s]}</div>}
                  </div>
                  <Pips value={p.skorlar[s]} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="detail-aside">
          <div className="card">
            <div className="card-head"><h3 className="card-title">Karar skorları</h3><span className="mono muted" style={{ fontSize: 11 }}>çentik = P75</span></div>
            <div className="card-pad derived">
              {TURETILEN_SKORLAR.map((s) => (
                <div key={s} className="derived-row">
                  <div className="lbl"><span>{SKOR_ETIKETLERI[s]}</span><span className="mono">#{sira[s]} / {toplam}</span></div>
                  <ScoreBar value={p.hesaplanan[s]} threshold={esikler[s]} risk={s === "risk_skoru"} />
                </div>
              ))}
            </div>
          </div>

          <div className="card card-pad">
            <dl className="props">
              <dt>Fonksiyon</dt><dd><FonksiyonBadge fonksiyon={p.fonksiyon} /></dd>
              <dt>Sektörler</dt><dd><div className="chips">{p.sektorler.map((s) => <Link key={s} to={`/raf?sektor=${s}`} className="badge outline">{sektorAd(s)}</Link>)}</div></dd>
              <dt>Paket</dt><dd className="mono">{p.paket}</dd>
            </dl>
          </div>

          <div className="card card-pad" style={{ display: "grid", gap: 10 }}>
            <h3 className="card-title">Biz kuralım</h3>
            <p className="muted" style={{ margin: 0, fontSize: 13 }}>
              Faz B'de alıcıya açılacak hizmet çağrısı. Şimdilik tıklama, hizmet talebi sinyali olarak kaydedilir.
            </p>
            <button className="btn primary" onClick={() => kur.mutate()} disabled={kur.isSuccess}>
              {kur.isSuccess ? <><Check size={15} />Sinyal kaydedildi</> : <><Wrench size={15} />Kurulum talebi sinyali</>}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
