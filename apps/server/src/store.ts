// Paylaşımlı durum deposu — SQLite (node:sqlite), ADR 0002: sunucu durumu küçüktür.
// Yol: DATA_PATH (Railway Volume, örn. /data/vibe.db) · yerelde var/vibe.db · testte ":memory:".
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";

export interface PanelStatusRow { key: string; status: string; updated_by: string; updated_at: string }

export function openStore(path: string) {
  if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`
    PRAGMA journal_mode = WAL;
    -- panel durum çipleri: juris-panel:<client> → {docKey: status}
    CREATE TABLE IF NOT EXISTS panel_status (
      client TEXT NOT NULL, key TEXT NOT NULL, status TEXT NOT NULL,
      updated_by TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      PRIMARY KEY (client, key)
    );
    -- Vibe stüdyosu: oturumlar ve kütüphane — iki kullanıcı için tek belge/anahtar (son yazan kazanır)
    CREATE TABLE IF NOT EXISTS vibe_state (
      key TEXT PRIMARY KEY, json TEXT NOT NULL,
      updated_by TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    );
  `);
  const qStatus = db.prepare("SELECT key, status, updated_by, updated_at FROM panel_status WHERE client = ?");
  const uStatus = db.prepare(`INSERT INTO panel_status (client, key, status, updated_by) VALUES (?, ?, ?, ?)
    ON CONFLICT(client, key) DO UPDATE SET status = excluded.status, updated_by = excluded.updated_by, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')`);
  const qState = db.prepare("SELECT json, updated_by, updated_at FROM vibe_state WHERE key = ?");
  const uState = db.prepare(`INSERT INTO vibe_state (key, json, updated_by) VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET json = excluded.json, updated_by = excluded.updated_by, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')`);

  return {
    path,
    panelStatus(client: string): Record<string, string> {
      return Object.fromEntries((qStatus.all(client) as unknown as PanelStatusRow[]).map((r) => [r.key, r.status]));
    },
    panelStatusRows: (client: string) => qStatus.all(client) as unknown as PanelStatusRow[],
    setPanelStatus(client: string, key: string, status: string, by: string) { uStatus.run(client, key, status, by); },
    vibeState<T = unknown>(key: string): { value: T; updated_by: string; updated_at: string } | null {
      const r = qState.get(key) as { json: string; updated_by: string; updated_at: string } | undefined;
      return r ? { value: JSON.parse(r.json) as T, updated_by: r.updated_by, updated_at: r.updated_at } : null;
    },
    setVibeState(key: string, value: unknown, by: string) { uState.run(key, JSON.stringify(value), by); },
    stats() {
      const p = db.prepare("SELECT COUNT(*) AS n, COUNT(DISTINCT client) AS c FROM panel_status").get() as { n: number; c: number };
      const v = db.prepare("SELECT key, length(json) AS bytes, updated_at FROM vibe_state").all() as { key: string; bytes: number; updated_at: string }[];
      return { panelOverrides: p.n, panelClients: p.c, vibe: v };
    },
    close: () => db.close(),
  };
}
export type Store = ReturnType<typeof openStore>;
