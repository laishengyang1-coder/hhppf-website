// Shared helpers for H&H Warranty API (Cloudflare Pages Functions)

const APP_SALT = "hhppf_warranty_salt_v1";
const SESSION_COOKIE = "hh_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(password) {
  const data = new TextEncoder().encode(APP_SALT + String(password || ""));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function sessionExpiresAt() {
  const d = new Date(Date.now() + SESSION_MAX_AGE * 1000);
  return d.toISOString().replace("T", " ").slice(0, 19);
}

export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  header.split(";").forEach((part) => {
    const idx = part.indexOf("=");
    if (idx > -1) {
      out[part.slice(0, idx).trim()] = part.slice(idx + 1).trim();
    }
  });
  return out;
}

export function setSessionCookie(token) {
  return `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`;
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
}

export async function getSessionUser(db, request) {
  const cookies = parseCookies(request.headers.get("Cookie"));
  const token = cookies[SESSION_COOKIE];
  if (!token) return null;
  const row = await db
    .prepare("SELECT role, username, dealer_code, expires_at FROM sessions WHERE token = ?")
    .bind(token)
    .first();
  if (!row) return null;
  if (new Date(row.expires_at + "Z").getTime() < Date.now()) return null;
  return { role: row.role, username: row.username, dealerCode: row.dealer_code };
}

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...extraHeaders },
  });
}

export async function readBody(request) {
  try {
    return await request.json();
  } catch (e) {
    return {};
  }
}
