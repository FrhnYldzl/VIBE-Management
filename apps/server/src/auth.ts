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

const SHORT_AGE_S = 12 * 3600; // "beni hatırla" işaretli değilse: 12 saat, tarayıcı oturumu çerezi

export function createSession(cfg: AuthConfig, s: Omit<Session, "exp">, remember = true): string {
  const payload = b64u(JSON.stringify({ ...s, exp: Math.floor(Date.now() / 1000) + (remember ? MAX_AGE_S : SHORT_AGE_S) } satisfies Session));
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

export function sessionCookie(token: string, secure: boolean, remember = true): string {
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax${remember ? `; Max-Age=${MAX_AGE_S}` : ""}${secure ? "; Secure" : ""}`;
}

/** Güçlü başlangıç parolası: 3 kelime + 2 rakam, yazması kolay */
export function generatePassword(): string {
  const W = ["kule", "liman", "sedir", "defne", "kaya", "ruzgar", "nehir", "zeytin", "bulut", "cinar", "mavi", "kehribar", "orman", "yelken", "safak", "gunes"];
  const pick = () => W[randomBytes(1)[0]! % W.length]!;
  const cap = (w: string) => w[0]!.toUpperCase() + w.slice(1);
  return `${cap(pick())}-${pick()}-${cap(pick())}-${(randomBytes(1)[0]! % 90) + 10}`;
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

/* ---- parola: scrypt~salt~hash (base64url). Ayraç '~' — Railway Raw Editor '$' işaretini değişken referansı sanıp bozuyor;
   eski 'scrypt$salt$hash' biçimi de kabul edilir. ---- */
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  return `scrypt~${b64u(salt)}~${b64u(scryptSync(password, salt, 32))}`;
}
const splitHash = (stored: string) => stored.split(stored.includes("~") ? "~" : "$");
/** Hash biçimsel olarak sağlam mı? (teşhis — değer sızdırmaz) */
export function hashLooksValid(stored: string): boolean {
  const [alg, salt, hash] = splitHash(stored);
  return alg === "scrypt" && !!salt && !!hash && Buffer.from(salt, "base64url").length === 16 && Buffer.from(hash, "base64url").length === 32;
}
export function verifyPassword(password: string, stored: string): boolean {
  const [alg, salt, hash] = splitHash(stored);
  if (alg !== "scrypt" || !salt || !hash) return false;
  const got = scryptSync(password, Buffer.from(salt, "base64url"), 32);
  const want = Buffer.from(hash, "base64url");
  return got.length === want.length && timingSafeEqual(got, want);
}

export const randomState = () => randomBytes(16).toString("base64url");
