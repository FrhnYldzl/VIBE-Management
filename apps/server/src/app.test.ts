import { afterAll, describe, expect, it } from "vitest";
import { buildApp } from "./app.ts";
import { type AuthConfig, generatePassword, hashLooksValid, hashPassword, verifyPassword } from "./auth.ts";
import { openStore } from "./store.ts";

const auth: AuthConfig = {
  secret: "test-secret", github: { clientId: "id", clientSecret: "sec" },
  allowedGithubUsers: ["frhnyldzl"],
  passwordUsers: { "f.yildizli@jurishukuk.com": hashPassword("doğru-parola"), "bozuk@x.com": "scrypt$kirik$" }, disabled: false,
};
const store = openStore(":memory:");
const app = buildApp({ auth, store });
const openStoreMem = openStore(":memory:");
const open = buildApp({ auth: { ...auth, disabled: true }, store: openStoreMem });
afterAll(async () => { await app.close(); await open.close(); store.close(); openStoreMem.close(); });

const form = { "content-type": "application/x-www-form-urlencoded" };
const cookieOf = (r: { headers: Record<string, unknown> }) => String(r.headers["set-cookie"]).split(";")[0]!;
const login = async (remember = true) => cookieOf(await app.inject({ method: "POST", url: "/auth/password", payload: `email=f.yildizli%40jurishukuk.com&password=do%C4%9Fru-parola${remember ? "&remember=1" : ""}`, headers: form }));

describe("kimlik", () => {
  it("tohumlama: geçerli hash DB'ye girer, bozuk hash atlanır", async () => {
    const cfgR = (await app.inject("/api/auth/config")).json();
    expect(cfgR.emails).toEqual(["f.yildizli@jurishukuk.com"]);
    expect(cfgR.seedHashOk).toEqual({ "f.yildizli@jurishukuk.com": true, "bozuk@x.com": false });
    expect((await app.inject("/api/health")).json().ortam.kullaniciDB).toBe(1);
  });
  it("açık yollar oturumsuz çalışır", async () => {
    expect((await app.inject("/api/health")).statusCode).toBe(200);
    expect((await app.inject("/")).statusCode).toBe(200);
    const l = await app.inject("/login"); expect(l.statusCode).toBe(200);
    expect(l.body).toContain('name="email"'); expect(l.body).toContain('name="remember"'); expect(l.body).toContain("GitHub ile giriş");
  });
  it("korunan yollar: HTML → /login, API → 401", async () => {
    const r = await app.inject({ url: "/app/", headers: { accept: "text/html" } });
    expect(r.statusCode).toBe(302); expect(r.headers.location).toContain("/login?next=%2Fapp%2F");
    expect((await app.inject("/api/roadmap")).statusCode).toBe(401);
    expect((await app.inject({ url: "/hesap", headers: { accept: "text/html" } })).statusCode).toBe(302);
  });
  it("e-posta + parola: yanlış reddedilir, doğru oturum açar; beni hatırla çerez ömrünü belirler", async () => {
    const bad = await app.inject({ method: "POST", url: "/auth/password", payload: "email=f.yildizli%40jurishukuk.com&password=yanlis", headers: form });
    expect(bad.statusCode).toBe(302); expect(bad.headers.location).toContain("error="); expect(bad.headers["set-cookie"]).toBeUndefined();
    const ok = await app.inject({ method: "POST", url: "/auth/password", payload: "email=F.Yildizli%40jurishukuk.com&password=do%C4%9Fru-parola&next=%2Fadmin%2F&remember=1", headers: form });
    expect(ok.statusCode).toBe(302); expect(ok.headers.location).toBe("/admin/");
    expect(String(ok.headers["set-cookie"])).toContain("Max-Age=2592000");
    const short = await app.inject({ method: "POST", url: "/auth/password", payload: "email=f.yildizli%40jurishukuk.com&password=do%C4%9Fru-parola", headers: form });
    expect(String(short.headers["set-cookie"])).not.toContain("Max-Age");
    const cookie = cookieOf(ok);
    expect((await app.inject({ url: "/api/me", headers: { cookie } })).json()).toMatchObject({ u: "f.yildizli@jurishukuk.com", via: "password" });
    expect((await app.inject({ url: "/api/roadmap", headers: { cookie } })).statusCode).toBe(200);
    expect(store.getUser("f.yildizli@jurishukuk.com")!.last_login_at).toBeTruthy();
  });
  it("hesap: parola değiştirme (DB kalıcı, eski parola geçersiz)", async () => {
    const cookie = await login();
    expect((await app.inject({ url: "/hesap", headers: { cookie } })).body).toContain("Parolayı değiştir");
    const mismatch = await app.inject({ method: "POST", url: "/hesap/parola", payload: "current=do%C4%9Fru-parola&next=yeni-parola-123&next2=farkli", headers: { ...form, cookie } });
    expect(mismatch.headers.location).toContain("error=");
    const wrongCur = await app.inject({ method: "POST", url: "/hesap/parola", payload: "current=yanlis&next=yeni-parola-123&next2=yeni-parola-123", headers: { ...form, cookie } });
    expect(wrongCur.headers.location).toContain("error=");
    const ok = await app.inject({ method: "POST", url: "/hesap/parola", payload: "current=do%C4%9Fru-parola&next=yeni-parola-123&next2=yeni-parola-123", headers: { ...form, cookie } });
    expect(ok.headers.location).toBe("/hesap?ok=1");
    expect((await app.inject({ method: "POST", url: "/auth/password", payload: "email=f.yildizli%40jurishukuk.com&password=do%C4%9Fru-parola", headers: form })).headers.location).toContain("error=");
    const again = await app.inject({ method: "POST", url: "/auth/password", payload: "email=f.yildizli%40jurishukuk.com&password=yeni-parola-123", headers: form });
    expect(again.headers.location).toBe("/app/");
  });
  it("admin: kullanıcı ekle ve parola sıfırla", async () => {
    const cookie = cookieOf(await app.inject({ method: "POST", url: "/auth/password", payload: "email=f.yildizli%40jurishukuk.com&password=yeni-parola-123", headers: form }));
    const add = await app.inject({ method: "POST", url: "/api/users", payload: { email: "gulsah@jurishukuk.com", name: "Gülşah", password: "gulsah-ilk-parola" }, headers: { cookie } });
    expect(add.statusCode).toBe(201);
    expect((await app.inject({ method: "POST", url: "/api/users", payload: { email: "gulsah@jurishukuk.com", name: "x", password: "gulsah-ilk-parola" }, headers: { cookie } })).statusCode).toBe(409);
    const reset = await app.inject({ method: "POST", url: "/api/users/gulsah%40jurishukuk.com/password", payload: { password: "gulsah-yeni-parola" }, headers: { cookie } });
    expect(reset.json()).toEqual({ ok: true, email: "gulsah@jurishukuk.com" });
    expect((await app.inject({ method: "POST", url: "/auth/password", payload: "email=gulsah%40jurishukuk.com&password=gulsah-yeni-parola", headers: form })).headers.location).toBe("/app/");
    expect((await app.inject({ url: "/api/users", headers: { cookie } })).json().map((u: { email: string }) => u.email)).toEqual(["f.yildizli@jurishukuk.com", "gulsah@jurishukuk.com"]);
    expect((await app.inject({ method: "POST", url: "/api/users/yok%40x.com/password", payload: { password: "0123456789" }, headers: { cookie } })).statusCode).toBe(404);
  });
  it("sahte / süresi geçmiş çerez reddedilir", async () => {
    expect((await app.inject({ url: "/api/roadmap", headers: { cookie: "vibe_session=abc.def" } })).statusCode).toBe(401);
    const forged = Buffer.from(JSON.stringify({ u: "x", name: "x", via: "password", exp: 9e9 })).toString("base64url");
    expect((await app.inject({ url: "/api/roadmap", headers: { cookie: `vibe_session=${forged}.AAAA` } })).statusCode).toBe(401);
  });
  it("GitHub: state uyuşmazlığı reddedilir", async () => {
    const start = await app.inject("/auth/github?next=%2Fapp%2F");
    expect(start.statusCode).toBe(302); expect(start.headers.location).toContain("github.com/login/oauth/authorize");
    const cb = await app.inject({ url: "/auth/github/callback?code=x&state=yanlis", headers: { cookie: cookieOf(start) } });
    expect(cb.headers.location).toContain("state");
  });
  it("çıkış çerezi siler", async () => {
    expect(String((await app.inject({ method: "POST", url: "/auth/logout" })).headers["set-cookie"])).toContain("Max-Age=0");
  });
  it("geliştirme modu (kimlik kapalı) her yolu açar", async () => {
    expect((await open.inject("/api/roadmap")).statusCode).toBe(200);
    expect((await open.inject("/api/health")).json().kimlik).toBe("kapalı");
  });
  it("scrypt parola: '~' ve eski '$' biçimi, biçim denetimi, parola üretici", () => {
    const h = hashPassword("abc"); expect(h.startsWith("scrypt~")).toBe(true); expect(h.includes("$")).toBe(false);
    expect(verifyPassword("abc", h)).toBe(true); expect(verifyPassword("abd", h)).toBe(false);
    expect(verifyPassword("abc", h.replace(/~/g, "$"))).toBe(true);
    expect(hashLooksValid(h)).toBe(true); expect(hashLooksValid("scrypt$$")).toBe(false); expect(hashLooksValid("scrypt~abc~def")).toBe(false);
    const p = generatePassword(); expect(p.length).toBeGreaterThanOrEqual(12); expect(p).toMatch(/^[A-Za-z]+-[a-z]+-[A-Za-z]+-\d\d$/);
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
