import { existsSync } from "node:fs";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import { z } from "zod";
import { DURUMLAR, FONKSIYONLAR, TURETILEN_SKORLAR, type ScoredProblem } from "@vibe/core";
import { normalize, type DataStore } from "./data.ts";
import { GERI_BILDIRIM_TURLERI, SINYAL_TIPLERI, TRIAGE, type Db } from "./db.ts";
import releases from "../../../data/releases.json" with { type: "json" };

export interface AppOptions {
  data: DataStore;
  db: Db;
  version: string;
  webDist?: string;
  logger?: boolean;
}

const listQuery = z.object({
  q: z.string().trim().max(200).optional(),
  sektor: z.string().optional(),
  fonksiyon: z.enum(FONKSIYONLAR).optional(),
  durum: z.enum(DURUMLAR).optional(),
  yayilim: z.enum(["yatay", "secili"]).optional(),
  aday: z.enum(["1"]).optional(),
  sirala: z.enum(TURETILEN_SKORLAR).default("icerik_onceligi"),
});

const sinyalBody = z.object({
  tip: z.enum(SINYAL_TIPLERI),
  sorgu: z.string().trim().max(200).nullish(),
  problem_id: z.string().max(120).nullish(),
  sonuc_sayisi: z.number().int().min(0).nullish(),
  sektor: z.string().max(80).nullish(),
});

const geriBildirimBody = z.object({
  tur: z.enum(GERI_BILDIRIM_TURLERI),
  mesaj: z.string().trim().min(3).max(4000),
  sayfa: z.string().max(300),
  puan: z.number().int().min(1).max(5).nullish(),
});

function eslesir(p: ScoredProblem, q: string): boolean {
  const hedef = normalize([p.id, p.ad, p.ozet, ...p.musteri_dili, p.tetikleyici].join(" "));
  return normalize(q).split(" ").every((kelime) => hedef.includes(kelime));
}

export function buildApp({ data, db, version, webDist, logger = false }: AppOptions) {
  const app = Fastify({ logger });

  app.setErrorHandler((err, _req, reply) => {
    if (err instanceof z.ZodError) return reply.status(400).send({ hata: "Geçersiz istek", ayrinti: err.issues });
    app.log.error(err);
    const e = err as { statusCode?: number; message?: string };
    return reply.status(e.statusCode ?? 500).send({ hata: e.message ?? "Sunucu hatası" });
  });

  app.get("/api/health", async () => ({ ok: true, surum: version }));

  app.get("/api/meta", async () => ({
    surum: version,
    problemSayisi: data.problemler.length,
    hedefProblem: 120,
    sektorSayisi: data.sektorler.length,
    lansmanSektor: data.sektorler.filter((s) => s.lansman).length,
    adaySayisi: data.adaylar.length,
    temelSkor: 13,
    esikler: data.esikler,
    paketler: data.paketler,
    durumDagilimi: Object.fromEntries(DURUMLAR.map((d) => [d, data.problemler.filter((p) => p.durum === d).length])),
  }));

  app.get("/api/sectors", async () =>
    data.sektorler.map((s) => ({
      ...s,
      problemSayisi: data.problemler.filter((p) => p.sektorler.includes(s.id)).length,
    })),
  );

  app.get("/api/problems", async (req) => {
    const f = listQuery.parse(req.query);
    const items = data.problemler
      .filter((p) => !f.q || eslesir(p, f.q))
      .filter((p) => !f.sektor || p.sektorler.includes(f.sektor))
      .filter((p) => !f.fonksiyon || p.fonksiyon === f.fonksiyon)
      .filter((p) => !f.durum || p.durum === f.durum)
      .filter((p) => !f.yayilim || p.yayilim === f.yayilim)
      .filter((p) => !f.aday || p.plAday)
      .sort((a, b) => b.hesaplanan[f.sirala] - a.hesaplanan[f.sirala]);
    return { toplam: items.length, esikler: data.esikler, items };
  });

  app.get<{ Params: { id: string } }>("/api/problems/:id", async (req, reply) => {
    const p = data.problemler.find((x) => x.id === req.params.id);
    if (!p) return reply.status(404).send({ hata: "Problem bulunamadı" });
    const sira = Object.fromEntries(
      TURETILEN_SKORLAR.map((ad) => [
        ad,
        [...data.problemler].sort((a, b) => b.hesaplanan[ad] - a.hesaplanan[ad]).findIndex((x) => x.id === p.id) + 1,
      ]),
    );
    return { problem: p, esikler: data.esikler, sira, toplam: data.problemler.length };
  });

  app.get("/api/rankings", async () => {
    const top = (ad: (typeof TURETILEN_SKORLAR)[number], n = 10) =>
      [...data.problemler]
        .sort((a, b) => b.hesaplanan[ad] - a.hesaplanan[ad])
        .slice(0, n)
        .map((p) => ({ id: p.id, ad: p.ad, paket: p.paket, fonksiyon: p.fonksiyon, skor: p.hesaplanan[ad] }));
    return {
      esikler: data.esikler,
      gecen: Object.fromEntries(
        TURETILEN_SKORLAR.map((ad) => [ad, data.problemler.filter((p) => p.hesaplanan[ad] >= data.esikler[ad]).length]),
      ),
      listeler: {
        icerik_onceligi: top("icerik_onceligi"),
        affiliate_skoru: top("affiliate_skoru"),
        hizmet_skoru: top("hizmet_skoru"),
        private_label: top("private_label"),
      },
      adaylar: data.adaylar.map((p) => ({
        id: p.id, ad: p.ad, paket: p.paket, fonksiyon: p.fonksiyon,
        private_label: p.hesaplanan.private_label, risk_skoru: p.hesaplanan.risk_skoru,
      })),
    };
  });

  app.post("/api/signals", async (req, reply) => {
    const s = sinyalBody.parse(req.body);
    db.addSinyal({
      tip: s.tip, sorgu: s.sorgu ?? null, problem_id: s.problem_id ?? null,
      sonuc_sayisi: s.sonuc_sayisi ?? null, sektor: s.sektor ?? null,
    });
    return reply.status(201).send({ ok: true });
  });

  app.get("/api/signals", async () => ({ ozet: db.sinyalOzet(), son: db.listSinyal(100) }));

  app.post("/api/feedback", async (req, reply) => {
    const g = geriBildirimBody.parse(req.body);
    return reply.status(201).send(db.addGeriBildirim({ ...g, puan: g.puan ?? null, surum: version }));
  });

  app.get("/api/feedback", async () => db.listGeriBildirim());

  app.patch<{ Params: { id: string } }>("/api/feedback/:id", async (req, reply) => {
    const { triage } = z.object({ triage: z.enum(TRIAGE) }).parse(req.body);
    const g = db.setTriage(Number(req.params.id), triage);
    if (!g) return reply.status(404).send({ hata: "Geri bildirim bulunamadı" });
    return g;
  });

  app.get("/api/releases", async () => ({ guncel: version, ...releases }));

  // Üretim: derlenmiş web arayüzünü aynı süreçten sun (SPA fallback)
  if (webDist && existsSync(webDist)) {
    app.register(fastifyStatic, { root: webDist, wildcard: false });
    app.setNotFoundHandler((req, reply) =>
      req.url.startsWith("/api/") ? reply.status(404).send({ hata: "Bulunamadı" }) : reply.sendFile("index.html"),
    );
  }

  return app;
}
