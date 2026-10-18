// Kimlik çekirdeği — bağımlılıksız: HMAC imzalı oturum çerezi + scrypt parola (Node yerleşik crypto).
// Oturum durumsuzdur (DB yok, v0.4.2'de SQLite gelir); çerez = base64url(payload).base64url(hmac).
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export interface Session { u: string; name: string; via: "github" | "password"; exp: number }

export const COOKIE = "vibe_session";
const MAX_AGE_S = 30 * 24 * 3600;

export interface AuthConfig {
  secret: string;
  github?: { clientId: string; clientSecret: string };
  allowedGithubUsers: string[];           // küçük harf
  passwordUsers: Record<string, string>;  // kullanıcı → "scrypt$salt$hash"
  disabled: boolean;                      // yerel geliştirme: hiçbir yöntem tanımlı değilse ve production değilse
}

export function configFromEnv(env = process.env): AuthConfig {
  const allowed = (env.ALLOWED_GITHUB_USERS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  const passwordUsers: Record<string, string> = {};
  for (const pair of (env.PASSWORD_USERS ?? "").split(",").map((s) => s.trim()).filter(Boolean)) {
    const i = pair.indexOf(":");
    if (i > 0) passwordUsers[pair.slice(0, i).toLowerCase()] = pair.slice(i + 1);
  }
  const github = env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET ? { clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET } : undefined;
  const anyMethod = Boolean(github) || Object.keys(passwordUsers).length > 0;
  const disabled = env.AUTH_DISABLED === "1" || (!anyMethod && env.NODE_ENV !== "production");
  return {
    secret: env.SESSION_SECRET || (disabled ? "dev-secret" : ""),
    github, allowedGithubUsers: allowed, passwordUsers, disabled,
  };
}

const b64u = (b: Buffer | string) => Buffer.from(b).toString("base64url");
const sign = (data: string, secret: string) => createHmac("sha256", secret).update(data).digest("base64url");

export function createSession(cfg: AuthConfig, s: Omit<Session, "exp">): string {
  const payload = b64u(JSON.stringify({ ...s, exp: Math.floor(Date.now() / 1000) + MAX_AGE_S } satisfies Session));
  return `${payload}.${sign(payload, cfg.secret)}`;
}

export function readSession(cfg: AuthConfig, token: string | undefined): Session | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expect = sign(payload, cfg.secret);
  if (expect.length !== sig.length || !timingSafeEqual(Buffer.from(expect), Buffer.from(sig))) return null;
  try {
    const s = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session;
    return s.exp > Date.now() / 1000 ? s : null;
  } catch { return null; }
}

export function sessionCookie(token: string, secure: boolean): string {
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_S}${secure ? "; Secure" : ""}`;
}
export const clearCookie = (secure: boolean) => `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`;

export function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of (header ?? "").split(";")) {
    const i = part.indexOf("=");
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

/* ---- parola: scrypt$salt$hash (hepsi base64url) ---- */
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  return `scrypt$${b64u(salt)}$${b64u(scryptSync(password, salt, 32))}`;
}
export function verifyPassword(password: string, stored: string): boolean {
  const [alg, salt, hash] = stored.split("$");
  if (alg !== "scrypt" || !salt || !hash) return false;
  const got = scryptSync(password, Buffer.from(salt, "base64url"), 32);
  const want = Buffer.from(hash, "base64url");
  return got.length === want.length && timingSafeEqual(got, want);
}

export const randomState = () => randomBytes(16).toString("base64url");
