import { afterAll, describe, expect, it } from "vitest";
import { buildApp } from "./app.ts";
import { costUsd, monthStart } from "./sample.ts";
import { openStore } from "./store.ts";

const store = openStore(":memory:");
const app = buildApp({ auth: { secret: "t", allowedGithubUsers: [], passwordUsers: {}, disabled: true }, store, drive: null });
afterAll(async () => { await app.close(); store.close(); });

describe("Vibe maliyet", () => {
  it("fiyat hesabı (resmi tarife, 22.10.2026)", () => {
    expect(costUsd("claude-opus-5-5", { input_tokens: 1_000_000, output_tokens: 100_000 })).toBeCloseTo(4 + 2, 6);
    expect(costUsd("claude-fable-5-1", { input_tokens: 10_000, output_tokens: 2_000, cache_read_input_tokens: 100_000 })).toBeCloseTo(0.1 + 0.1 + 0.025, 6);
    expect(costUsd("claude-haiku-5-5", { input_tokens: 50_000, output_tokens: 1_000 })).toBeCloseTo(0.005 + 0.0005, 6);
    expect(costUsd("claude-haiku-5-5", { input_tokens: 150_000, output_tokens: 1_000 })).toBeCloseTo(0.075 + 0.0025, 6); // >100K tarife
    expect(costUsd("bilinmeyen", { input_tokens: 1, output_tokens: 1 })).toBe(0);
  });
  it("kullanım özeti, bütçe ayarı ve tavan dolunca 402", async () => {
    store.addUsage({ user: "a@x", model: "claude-opus-5-5", tier: "default", kaynak: "studyo", input: 1000, output: 500, cacheWrite: 0, cacheRead: 0, usd: 3 });
    store.addUsage({ user: "b@x", model: "claude-haiku-5-5", tier: "quick", kaynak: "vibe-duzenle", input: 100, output: 50, cacheWrite: 0, cacheRead: 0, usd: 1 });
    let u = (await app.inject("/api/vibe/usage")).json();
    expect(u.ay.usd).toBeCloseTo(4); expect(u.ay.istek).toBe(2); expect(u.kullanici[0].k).toBe("a@x"); expect(u.kademeler.complex.model).toBe("claude-fable-5-1");
    expect(u.fiyatKaynak.okundu).toBe("2026-10-22"); expect(u.ay.baslangic).toBe(monthStart());
    const put = await app.inject({ method: "PUT", url: "/api/vibe/budget", payload: { aylikUsd: 4, uyariYuzde: 80, tierMax: { quick: 2000, default: 8000, complex: 16000 }, kapali: ["complex"] } });
    expect(put.json().butce.aylikUsd).toBe(4);
    u = (await app.inject("/api/vibe/usage")).json(); expect(u.uyari).toBe(true); expect(u.oran).toBeCloseTo(1);
    const prev = process.env.ANTHROPIC_API_KEY; process.env.ANTHROPIC_API_KEY = "test-anahtar";
    const r = await app.inject({ method: "POST", url: "/api/sample", payload: { messages: [{ role: "user", content: "x" }], modelTier: "default" } });
    expect(r.statusCode).toBe(402); expect(r.body).toContain("bütçe");
    await app.inject({ method: "PUT", url: "/api/vibe/budget", payload: { aylikUsd: 100, uyariYuzde: 80, tierMax: { quick: 2000, default: 8000, complex: 16000 }, kapali: ["complex"] } });
    const k = await app.inject({ method: "POST", url: "/api/sample", payload: { messages: [{ role: "user", content: "x" }], modelTier: "complex" } });
    expect(k.statusCode).toBe(403);
    if (prev === undefined) delete process.env.ANTHROPIC_API_KEY; else process.env.ANTHROPIC_API_KEY = prev;
    expect((await app.inject({ method: "PUT", url: "/api/vibe/budget", payload: { aylikUsd: -1 } })).statusCode).toBe(400);
  });
});
