// Shared helpers for H&H Warranty API (Cloudflare Pages Functions)

const LEGACY_APP_SALT = "hhppf_warranty_salt_v1";
const SESSION_COOKIE = "hh_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const PBKDF2_ITERATIONS = 100000;

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex) {
  const clean = String(hex || "");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

export async function legacyHashPassword(password) {
  const data = new TextEncoder().encode(LEGACY_APP_SALT + String(password || ""));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return bytesToHex(new Uint8Array(hash));
}

export async function hashPassword(password) {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(String(password || "")),
    { name: "PBKDF2" },
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${bytesToHex(salt)}$${bytesToHex(new Uint8Array(derived))}`;
}

export async function verifyPassword(password, storedHash) {
  if (!storedHash) return false;
  if (String(storedHash).startsWith("pbkdf2$")) {
    const parts = String(storedHash).split("$");
    if (parts.length !== 4) return false;
    const iterations = parseInt(parts[1], 10) || PBKDF2_ITERATIONS;
    const salt = hexToBytes(parts[2]);
    const expectedHex = parts[3];
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(String(password || "")),
      { name: "PBKDF2" },
      false,
      ["deriveBits"],
    );
    const derived = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
      keyMaterial,
      256,
    );
    return bytesToHex(new Uint8Array(derived)) === expectedHex;
  }
  const legacy = await legacyHashPassword(password);
  return legacy === storedHash;
}

export function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
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

export function setSessionCookie(token, isSecure = true) {
  const secureFlag = isSecure ? "; Secure" : "";
  return `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}${secureFlag}`;
}

export function clearSessionCookie(isSecure = true) {
  const secureFlag = isSecure ? "; Secure" : "";
  return `${SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secureFlag}`;
}

export async function getSessionUser(db, request) {
  if (!db) return null;
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
  } catch (_) {
    return {};
  }
}
