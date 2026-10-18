import { afterAll, describe, expect, it } from "vitest";
import { buildApp } from "./app.ts";

const app = buildApp();
afterAll(() => app.close());

describe("tek servis", () => {
  it("health", async () => {
    const r = await app.inject("/api/health");
    expect(r.statusCode).toBe(200);
    expect(r.json().ok).toBe(true);
  });
  it("roadmap v1/v2/v3", async () => {
    const r = await app.inject("/api/roadmap");
    expect(r.json().surumler.map((s: { v: string }) => s.v)).toEqual(["1.0", "2.0", "3.0"]);
  });
  it("yüzeyler", async () => {
    expect((await app.inject("/")).statusCode).toBe(200);
    expect((await app.inject("/app")).statusCode).toBe(302);
    expect((await app.inject("/app/index.html")).statusCode).toBe(200);
    expect((await app.inject("/app/qervan.html")).statusCode).toBe(200);
    expect((await app.inject("/admin/")).statusCode).toBe(200);
  });
  it("sample anahtar yokken 503", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const r = await app.inject({ method: "POST", url: "/api/sample", payload: { messages: [{ role: "user", content: "x" }] } });
    expect(r.statusCode).toBe(503);
  });
});
