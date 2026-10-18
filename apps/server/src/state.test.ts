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
    expect((await app.inject("/api/vibe/state")).json()).toEqual({ sessions: null, library: null });
    const r = await app.inject({ method: "PUT", url: "/api/vibe/state/sessions", payload: [{ id: "s1", title: "Deneme", msgs: [] }] });
    expect(r.json()).toMatchObject({ ok: true, adet: 1 });
    const st = (await app.inject("/api/vibe/state")).json();
    expect(st.sessions.value[0].id).toBe("s1"); expect(st.sessions.updated_by).toBe("dev"); expect(st.library).toBeNull();
    expect((await app.inject({ method: "PUT", url: "/api/vibe/state/baska", payload: [] })).statusCode).toBe(400);
    expect((await app.inject({ method: "PUT", url: "/api/vibe/state/library", payload: { not: "array" } })).statusCode).toBe(400);
  });
  it("istatistik + health db", async () => {
    expect((await app.inject("/api/state/stats")).json()).toMatchObject({ panelOverrides: 3, panelClients: 1 });
    expect((await app.inject("/api/health")).json().db).toBe("bellek");
  });
});
