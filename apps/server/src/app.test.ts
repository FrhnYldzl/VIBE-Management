import { afterAll, describe, expect, it } from "vitest";
import { buildApp } from "./app.ts";
import { type AuthConfig, hashPassword, verifyPassword } from "./auth.ts";

const auth: AuthConfig = {
  secret: "test-secret", github: { clientId: "id", clientSecret: "sec" },
  allowedGithubUsers: ["frhnyldzl"], passwordUsers: { "f.yildizli@jurishukuk.com": hashPassword("doğru-parola") }, disabled: false,
};
const app = buildApp({ auth });
const open = buildApp({ auth: { ...auth, disabled: true } });
afterAll(async () => { await app.close(); await open.close(); });

const cookieOf = (r: { headers: Record<string, unknown> }) => String(r.headers["set-cookie"]).split(";")[0]!;

describe("kimlik", () => {
  it("açık yollar oturumsuz çalışır", async () => {
    expect((await app.inject("/api/health")).statusCode).toBe(200);
    expect((await app.inject("/")).statusCode).toBe(200);
    expect((await app.inject("/login")).statusCode).toBe(200);
    expect((await app.inject("/login")).body).toContain('name="email"');
    expect((await app.inject("/login")).body).toContain("GitHub ile giriş");
  });
  it("korunan yollar: HTML → /login, API → 401", async () => {
    const r = await app.inject({ url: "/app/", headers: { accept: "text/html" } });
    expect(r.statusCode).toBe(302); expect(r.headers.location).toContain("/login?next=%2Fapp%2F");
    expect((await app.inject("/api/roadmap")).statusCode).toBe(401);
    expect((await app.inject({ url: "/admin/", headers: { accept: "text/html" } })).statusCode).toBe(302);
  });
  it("e-posta + parola: yanlış reddedilir, doğru oturum açar", async () => {
    const form = { "content-type": "application/x-www-form-urlencoded" };
    const bad = await app.inject({ method: "POST", url: "/auth/password", payload: "email=f.yildizli%40jurishukuk.com&password=yanlis", headers: form });
    expect(bad.statusCode).toBe(302); expect(bad.headers.location).toContain("error="); expect(bad.headers["set-cookie"]).toBeUndefined();
    const notEmail = await app.inject({ method: "POST", url: "/auth/password", payload: "email=ferhan&password=x", headers: form });
    expect(notEmail.headers.location).toContain("error=");
    const ok = await app.inject({ method: "POST", url: "/auth/password", payload: "email=F.Yildizli%40jurishukuk.com&password=do%C4%9Fru-parola&next=%2Fadmin%2F", headers: form });
    expect(ok.statusCode).toBe(302); expect(ok.headers.location).toBe("/admin/");
    const cookie = cookieOf(ok);
    expect(cookie).toMatch(/^vibe_session=/);
    const me = await app.inject({ url: "/api/me", headers: { cookie } });
    expect(me.json()).toMatchObject({ u: "f.yildizli@jurishukuk.com", name: "f.yildizli", via: "password" });
    expect((await app.inject({ url: "/api/roadmap", headers: { cookie } })).statusCode).toBe(200);
    expect((await app.inject({ url: "/app/index.html", headers: { cookie } })).statusCode).toBe(200);
  });
  it("sahte / süresi geçmiş çerez reddedilir", async () => {
    expect((await app.inject({ url: "/api/roadmap", headers: { cookie: "vibe_session=abc.def" } })).statusCode).toBe(401);
    const forged = Buffer.from(JSON.stringify({ u: "x", name: "x", via: "password", exp: 9e9 })).toString("base64url");
    expect((await app.inject({ url: "/api/roadmap", headers: { cookie: `vibe_session=${forged}.AAAA` } })).statusCode).toBe(401);
  });
  it("GitHub: state uyuşmazlığı reddedilir; allowlist yapılandırmada", async () => {
    const start = await app.inject("/auth/github?next=%2Fapp%2F");
    expect(start.statusCode).toBe(302); expect(start.headers.location).toContain("github.com/login/oauth/authorize");
    const cb = await app.inject({ url: "/auth/github/callback?code=x&state=yanlis", headers: { cookie: cookieOf(start) } });
    expect(cb.headers.location).toContain("state");
    expect((await app.inject("/api/auth/config")).json()).toMatchObject({ github: true, password: 1, emails: ["f.yildizli@jurishukuk.com"], allowedGithubUsers: ["frhnyldzl"] });
  });
  it("çıkış çerezi siler", async () => {
    const r = await app.inject({ method: "POST", url: "/auth/logout" });
    expect(String(r.headers["set-cookie"])).toContain("Max-Age=0");
  });
  it("geliştirme modu (kimlik kapalı) her yolu açar", async () => {
    expect((await open.inject("/api/roadmap")).statusCode).toBe(200);
    expect((await open.inject("/api/health")).json().kimlik).toBe("kapalı");
  });
  it("scrypt parola", () => {
    const h = hashPassword("abc"); expect(verifyPassword("abc", h)).toBe(true); expect(verifyPassword("abd", h)).toBe(false);
  });
});

describe("tek servis", () => {
  it("roadmap v1/v2/v3 + yüzeyler (kimlik kapalı)", async () => {
    expect((await open.inject("/api/roadmap")).json().surumler.map((s: { v: string }) => s.v)).toEqual(["1.0", "2.0", "3.0"]);
    expect((await open.inject("/app")).statusCode).toBe(302);
    expect((await open.inject("/app/qervan.html")).statusCode).toBe(200);
    expect((await open.inject("/admin/")).statusCode).toBe(200);
  });
  it("sample anahtar yokken 503", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    expect((await open.inject({ method: "POST", url: "/api/sample", payload: { messages: [{ role: "user", content: "x" }] } })).statusCode).toBe(503);
  });
});
