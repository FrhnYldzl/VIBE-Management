import { afterAll, describe, expect, it } from "vitest";
import { buildApp } from "./app.ts";
import { openStore } from "./store.ts";

const store = openStore(":memory:");
const app = buildApp({ auth: { secret: "t", allowedGithubUsers: [], passwordUsers: {}, disabled: true }, store });
afterAll(async () => { await app.close(); store.close(); });

describe("paylaşımlı durum", () => {
  it("panel durum çipi: yaz, oku, toplu taşı, günlük", async () => {
    expect((await app.inject("/api/panels/qervan/status")).json()).toEqual({ client: "qervan", overrides: {} });
    const put = await app.inject({ method: "PUT", url: "/api/panels/qervan/status", payload: { key: "A1:0", status: "done" } });
    expect(put.statusCode).toBe(200);
    const bulk = await app.inject({ method: "PUT", url: "/api/panels/qervan/status/bulk", payload: { "A1:1": "review", "B2:0": "input" } });
    expect(bulk.json().adet).toBe(2);
    expect((await app.inject("/api/panels/qervan/status")).json().overrides).toEqual({ "A1:0": "done", "A1:1": "review", "B2:0": "input" });
    // güncelleme üzerine yazar, başka müvekkile sızmaz
    await app.inject({ method: "PUT", url: "/api/panels/qervan/status", payload: { key: "A1:0", status: "pending" } });
    expect((await app.inject("/api/panels/qervan/status")).json().overrides["A1:0"]).toBe("pending");
    expect((await app.inject("/api/panels/zyrone/status")).json().overrides).toEqual({});
    expect((await app.inject("/api/panels/qervan/status/log")).json()[0]).toMatchObject({ updated_by: "dev" });
  });
  it("geçersiz durum / müvekkil reddedilir", async () => {
    expect((await app.inject({ method: "PUT", url: "/api/panels/qervan/status", payload: { key: "x", status: "yok" } })).statusCode).toBe(400);
    expect((await app.inject("/api/panels/Q%20ervan/status")).statusCode).toBe(400);
  });
  it("vibe oturumları ve kütüphane", async () => {
    expect((await app.inject("/api/vibe/state")).json()).toEqual({ sessions: null, library: null, egitim: null, dogrulama: null });
    const r = await app.inject({ method: "PUT", url: "/api/vibe/state/sessions", payload: [{ id: "s1", title: "Deneme", msgs: [] }] });
    expect(r.json()).toMatchObject({ ok: true, adet: 1 });
    const st = (await app.inject("/api/vibe/state")).json();
    expect(st.sessions.value[0].id).toBe("s1"); expect(st.sessions.updated_by).toBe("dev"); expect(st.library).toBeNull();
    expect((await app.inject({ method: "PUT", url: "/api/vibe/state/baska", payload: [] })).statusCode).toBe(400);
    expect((await app.inject({ method: "PUT", url: "/api/vibe/state/library", payload: { not: "array" } })).statusCode).toBe(400);
  });
  it("panel düzenlemeleri: ekle, listele, güncelle, sil; izin verilmeyen alan düşer", async () => {
    const a = await app.inject({ method: "PUT", url: "/api/panels/qervan/edits/action", payload: { owner: "Juris", action: "Pay defteri güncellemesi", prio: "Yüksek", output: "Defter", status: "pending", hack: "x" } });
    expect(a.statusCode).toBe(200); const id = a.json().id; expect(a.json().hack).toBeUndefined();
    await app.inject({ method: "PUT", url: "/api/panels/qervan/edits/note", payload: { id: "A1:0", key: "A1:0", text: "Taslak 2 bekleniyor" } });
    let e = (await app.inject("/api/panels/qervan/edits")).json();
    expect(e.action).toHaveLength(1); expect(e.note[0].text).toBe("Taslak 2 bekleniyor"); expect(e.action[0].updated_by).toBe("dev");
    await app.inject({ method: "PUT", url: "/api/panels/qervan/edits/action", payload: { id, status: "done" } });
    e = (await app.inject("/api/panels/qervan/edits")).json(); expect(e.action[0].status).toBe("done"); expect(e.action[0].action).toBeUndefined(); // tam kayıt gönderilir (istemci birleştirir)
    expect((await app.inject({ method: "PUT", url: "/api/panels/qervan/edits/bilinmeyen", payload: { x: "y" } })).statusCode).toBe(400);
    expect((await app.inject({ method: "PUT", url: "/api/panels/qervan/edits/action", payload: { hack: "x" } })).statusCode).toBe(400);
    expect((await app.inject({ method: "DELETE", url: `/api/panels/qervan/edits/action/${id}` })).statusCode).toBe(200);
    expect((await app.inject({ method: "DELETE", url: `/api/panels/qervan/edits/action/${id}` })).statusCode).toBe(404);
  });
  it("kurumsal yönetim skoru: panel gönderir, toplu okunur, geçersiz reddedilir", async () => {
    const s = { toplam: 62, harf: "C", seviye: "Gelişen", versiyon: "v1 · 2026-10", veriTarihi: "18.10.2026", kriterler: [{ k: "dok", t: "Dokümantasyon", w: 25, puan: 40, not: "10/25" }, { k: "kpi", t: "KPI", w: 15, puan: 80 }] };
    expect((await app.inject({ method: "PUT", url: "/api/panels/onscala/score", payload: s })).json()).toMatchObject({ ok: true, toplam: 62, harf: "C" });
    const all = (await app.inject("/api/panels/scores")).json();
    expect(all.onscala.toplam).toBe(62); expect(all.onscala.kriterler).toHaveLength(2); expect(all.onscala.updated_by).toBe("dev");
    expect((await app.inject({ method: "PUT", url: "/api/panels/onscala/score", payload: { toplam: 140, harf: "Z", seviye: "x", kriterler: [] } })).statusCode).toBe(400);
  });
  it("istatistik + health db", async () => {
    expect((await app.inject("/api/state/stats")).json()).toMatchObject({ panelOverrides: 3, panelClients: 1 });
    expect((await app.inject("/api/health")).json().db).toBe("bellek");
  });
});
