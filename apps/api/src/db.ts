// Çalışma zamanı verisi: talep sinyali logu + geri bildirim. Node yerleşik SQLite'ı (sıfır native bağımlılık).
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";

export const SINYAL_TIPLERI = ["arama", "bos_sonuc", "problem_goruntuleme", "biz_kuralim"] as const;
export const GERI_BILDIRIM_TURLERI = ["hata", "istek", "tasarim", "veri"] as const;
export const TRIAGE = ["yeni", "simdi", "sonraki", "fikir", "ret"] as const;

export interface Sinyal {
  id: number;
  tip: (typeof SINYAL_TIPLERI)[number];
  sorgu: string | null;
  problem_id: string | null;
  sonuc_sayisi: number | null;
  sektor: string | null;
  olusturma: string;
}

export interface GeriBildirim {
  id: number;
  tur: (typeof GERI_BILDIRIM_TURLERI)[number];
  mesaj: string;
  sayfa: string;
  surum: string;
  puan: number | null;
  triage: (typeof TRIAGE)[number];
  olusturma: string;
}

export function openDb(path: string) {
  if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS sinyal (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tip TEXT NOT NULL,
      sorgu TEXT,
      problem_id TEXT,
      sonuc_sayisi INTEGER,
      sektor TEXT,
      olusturma TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    );
    CREATE INDEX IF NOT EXISTS sinyal_tip ON sinyal(tip, olusturma);
    CREATE TABLE IF NOT EXISTS geri_bildirim (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tur TEXT NOT NULL,
      mesaj TEXT NOT NULL,
      sayfa TEXT NOT NULL,
      surum TEXT NOT NULL,
      puan INTEGER,
      triage TEXT NOT NULL DEFAULT 'yeni',
      olusturma TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    );
  `);

  const insSinyal = db.prepare(
    "INSERT INTO sinyal (tip, sorgu, problem_id, sonuc_sayisi, sektor) VALUES (?, ?, ?, ?, ?)",
  );
  const insGb = db.prepare(
    "INSERT INTO geri_bildirim (tur, mesaj, sayfa, surum, puan) VALUES (?, ?, ?, ?, ?) RETURNING *",
  );

  return {
    addSinyal(s: Omit<Sinyal, "id" | "olusturma">) {
      insSinyal.run(s.tip, s.sorgu, s.problem_id, s.sonuc_sayisi, s.sektor);
    },
    listSinyal(limit = 200): Sinyal[] {
      return db.prepare("SELECT * FROM sinyal ORDER BY id DESC LIMIT ?").all(limit) as unknown as Sinyal[];
    },
    sinyalOzet() {
      const tipler = db.prepare("SELECT tip, COUNT(*) AS adet FROM sinyal GROUP BY tip").all() as { tip: string; adet: number }[];
      const bosSorgular = db.prepare(
        `SELECT sorgu, COUNT(*) AS adet, MAX(olusturma) AS son FROM sinyal
         WHERE tip = 'bos_sonuc' AND sorgu IS NOT NULL GROUP BY sorgu ORDER BY adet DESC, son DESC LIMIT 20`,
      ).all() as { sorgu: string; adet: number; son: string }[];
      const ilgi = db.prepare(
        `SELECT problem_id, SUM(tip = 'problem_goruntuleme') AS goruntuleme, SUM(tip = 'biz_kuralim') AS biz_kuralim
         FROM sinyal WHERE problem_id IS NOT NULL GROUP BY problem_id ORDER BY biz_kuralim DESC, goruntuleme DESC LIMIT 20`,
      ).all() as { problem_id: string; goruntuleme: number; biz_kuralim: number }[];
      return { tipler, bosSorgular, ilgi };
    },
    addGeriBildirim(g: Omit<GeriBildirim, "id" | "olusturma" | "triage">): GeriBildirim {
      return insGb.get(g.tur, g.mesaj, g.sayfa, g.surum, g.puan) as unknown as GeriBildirim;
    },
    listGeriBildirim(): GeriBildirim[] {
      return db.prepare("SELECT * FROM geri_bildirim ORDER BY id DESC").all() as unknown as GeriBildirim[];
    },
    setTriage(id: number, triage: GeriBildirim["triage"]): GeriBildirim | undefined {
      return db.prepare("UPDATE geri_bildirim SET triage = ? WHERE id = ? RETURNING *").get(triage, id) as
        | GeriBildirim
        | undefined;
    },
    close: () => db.close(),
  };
}

export type Db = ReturnType<typeof openDb>;
