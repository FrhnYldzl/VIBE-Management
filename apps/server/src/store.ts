// Paylaşımlı durum deposu — SQLite (node:sqlite), ADR 0002: sunucu durumu küçüktür.
// Yol: DATA_PATH (Railway Volume, örn. /data/vibe.db) · yerelde var/vibe.db · testte ":memory:".
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";

export interface PanelStatusRow { key: string; status: string; updated_by: string; updated_at: string }
export interface PanelRow {
  slug: string; name: string; short: string[]; entities: string[]; drive_root: string;
  status: "ok" | "warn" | "error"; files: number; folders: number; smoke: { ok: boolean; bad: string[]; views: number; items: number; docs: number; pct: number } | null;
  created_by: string; created_at: string; scanned_at: string | null; error: string | null;
}
export interface PanelEdit { kind: string; id: string; updated_by: string; updated_at: string; [k: string]: unknown }
type PanelRaw = Omit<PanelRow, "short" | "entities" | "smoke"> & { short: string; entities: string; smoke: string | null };
const panelRow = (r: PanelRaw): PanelRow => ({ ...r, short: JSON.parse(r.short), entities: JSON.parse(r.entities), smoke: r.smoke ? JSON.parse(r.smoke) : null });

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
    -- kullanıcılar: e-posta + scrypt parola; PASSWORD_USERS yalnız ilk tohum, sonrası uygulamadan değiştirilir
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY, name TEXT NOT NULL, hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      password_changed_at TEXT, last_login_at TEXT
    );
    -- panel düzenlemeleri (v0.5.5): kullanıcı eklediği aksiyon / karar / toplantı / not — .data.js'e dokunmaz, yeniden taramada korunur
    CREATE TABLE IF NOT EXISTS panel_edits (
      client TEXT NOT NULL, kind TEXT NOT NULL, id TEXT NOT NULL, json TEXT NOT NULL,
      updated_by TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      PRIMARY KEY (client, kind, id)
    );
    -- Kurumsal Yönetim Skoru (v0.5.6): panel kendi verisinden hesaplar, son anlık görüntü burada (admin / Ana Merkez okur)
    CREATE TABLE IF NOT EXISTS panel_scores (
      client TEXT PRIMARY KEY, json TEXT NOT NULL,
      updated_by TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    );
    -- Intake-lite panelleri: Drive linki → üretilen .data.js + HTML (dosyalar Volume'de, kayıt burada)
    CREATE TABLE IF NOT EXISTS panels (
      slug TEXT PRIMARY KEY, name TEXT NOT NULL, short TEXT NOT NULL, entities TEXT NOT NULL, drive_root TEXT NOT NULL,
      status TEXT NOT NULL, files INTEGER NOT NULL DEFAULT 0, folders INTEGER NOT NULL DEFAULT 0, smoke TEXT,
      created_by TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      scanned_at TEXT, error TEXT
    );
  `);
  const qPanel = db.prepare("SELECT * FROM panels WHERE slug = ?");
  const qPanels = db.prepare("SELECT * FROM panels ORDER BY created_at");
  const uPanel = db.prepare(`INSERT INTO panels (slug, name, short, entities, drive_root, status, files, folders, smoke, created_by, scanned_at, error)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET name = excluded.name, short = excluded.short, entities = excluded.entities, drive_root = excluded.drive_root,
      status = excluded.status, files = excluded.files, folders = excluded.folders, smoke = excluded.smoke, scanned_at = excluded.scanned_at, error = excluded.error`);
  const dPanel = db.prepare("DELETE FROM panels WHERE slug = ?");
  const qEdits = db.prepare("SELECT kind, id, json, updated_by, updated_at FROM panel_edits WHERE client = ? ORDER BY updated_at");
  const uEdit = db.prepare(`INSERT INTO panel_edits (client, kind, id, json, updated_by) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(client, kind, id) DO UPDATE SET json = excluded.json, updated_by = excluded.updated_by, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')`);
  const dEdit = db.prepare("DELETE FROM panel_edits WHERE client = ? AND kind = ? AND id = ?");
  const qScores = db.prepare("SELECT client, json, updated_by, updated_at FROM panel_scores ORDER BY client");
  const uScore = db.prepare(`INSERT INTO panel_scores (client, json, updated_by) VALUES (?, ?, ?)
    ON CONFLICT(client) DO UPDATE SET json = excluded.json, updated_by = excluded.updated_by, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')`);
  const qUser = db.prepare("SELECT email, name, hash, created_at, password_changed_at, last_login_at FROM users WHERE email = ?");
  const qUsers = db.prepare("SELECT email, name, created_at, password_changed_at, last_login_at FROM users ORDER BY email");
  const iUser = db.prepare("INSERT OR IGNORE INTO users (email, name, hash) VALUES (?, ?, ?)");
  const uHash = db.prepare("UPDATE users SET hash = ?, password_changed_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE email = ?");
  const uLogin = db.prepare("UPDATE users SET last_login_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE email = ?");
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
    /* ---- kullanıcılar ---- */
    getUser: (email: string) => qUser.get(email.toLowerCase()) as { email: string; name: string; hash: string; created_at: string; password_changed_at: string | null; last_login_at: string | null } | undefined,
    listUsers: () => qUsers.all() as unknown as { email: string; name: string; created_at: string; password_changed_at: string | null; last_login_at: string | null }[],
    /** Var olanı ezmez (tohumlama için) → eklendi mi? */
    addUserIfMissing(email: string, name: string, hash: string): boolean { return iUser.run(email.toLowerCase(), name, hash).changes > 0; },
    setUserHash(email: string, hash: string): boolean { return uHash.run(hash, email.toLowerCase()).changes > 0; },
    touchLogin(email: string) { uLogin.run(email.toLowerCase()); },
    /* ---- Intake-lite panelleri ---- */
    getPanel: (slug: string) => { const r = qPanel.get(slug) as PanelRaw | undefined; return r ? panelRow(r) : undefined; },
    listPanels: () => (qPanels.all() as unknown as PanelRaw[]).map(panelRow),
    upsertPanel(p: Omit<PanelRow, "created_at">) {
      uPanel.run(p.slug, p.name, JSON.stringify(p.short), JSON.stringify(p.entities), p.drive_root, p.status, p.files, p.folders, p.smoke ? JSON.stringify(p.smoke) : null, p.created_by, p.scanned_at, p.error);
    },
    deletePanel: (slug: string) => dPanel.run(slug).changes > 0,
    /* ---- panel düzenlemeleri ---- */
    panelEdits(client: string): PanelEdit[] {
      return (qEdits.all(client) as unknown as { kind: string; id: string; json: string; updated_by: string; updated_at: string }[])
        .map((r) => ({ kind: r.kind, id: r.id, ...JSON.parse(r.json), updated_by: r.updated_by, updated_at: r.updated_at }));
    },
    setPanelEdit(client: string, kind: string, id: string, data: Record<string, unknown>, by: string) { uEdit.run(client, kind, id, JSON.stringify(data), by); },
    deletePanelEdit: (client: string, kind: string, id: string) => dEdit.run(client, kind, id).changes > 0,
    /* ---- Kurumsal Yönetim Skoru ---- */
    setScore(client: string, score: Record<string, unknown>, by: string) { uScore.run(client, JSON.stringify(score), by); },
    scores(): Record<string, Record<string, unknown> & { updated_by: string; updated_at: string }> {
      const out: Record<string, Record<string, unknown> & { updated_by: string; updated_at: string }> = {};
      for (const r of qScores.all() as unknown as { client: string; json: string; updated_by: string; updated_at: string }[]) out[r.client] = { ...JSON.parse(r.json), updated_by: r.updated_by, updated_at: r.updated_at };
      return out;
    },
    stats() {
      const p = db.prepare("SELECT COUNT(*) AS n, COUNT(DISTINCT client) AS c FROM panel_status").get() as { n: number; c: number };
      const v = db.prepare("SELECT key, length(json) AS bytes, updated_at FROM vibe_state").all() as { key: string; bytes: number; updated_at: string }[];
      return { panelOverrides: p.n, panelClients: p.c, vibe: v };
    },
    close: () => db.close(),
  };
}
export type Store = ReturnType<typeof openStore>;
