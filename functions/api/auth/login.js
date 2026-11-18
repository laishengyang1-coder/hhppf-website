import { hashPassword, verifyPassword, randomToken, sessionExpiresAt, setSessionCookie, json, readBody } from "../_lib.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await readBody(request);
  const role = String(body.role || "").toLowerCase();
  const username = String(body.username || "").trim();
  const password = String(body.password || "");

  if (!username || !password || !role) {
    return json({ ok: false, error: "missing_fields" }, 400);
  }

  const user = await env.DB
    .prepare("SELECT id, role, username, dealer_code, password_hash FROM users WHERE username = ? AND role = ?")
    .bind(username, role)
    .first();

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return json({ ok: false, error: "invalid_credentials" }, 401);
  }

  // Transparently upgrade legacy SHA-256 hash to PBKDF2 on successful login
  if (!String(user.password_hash).startsWith("pbkdf2$")) {
    try {
      const upgraded = await hashPassword(password);
      await env.DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?").bind(upgraded, user.id).run();
    } catch (_) {
      // ignore non-critical upgrade error
    }
  }

  const token = randomToken();
  await env.DB
    .prepare("INSERT INTO sessions (token, role, username, dealer_code, expires_at) VALUES (?, ?, ?, ?, ?)")
    .bind(token, user.role, user.username, user.dealer_code || null, sessionExpiresAt())
    .run();

  const isSecure = new URL(request.url).protocol === "https:";
  return json(
    { ok: true, role: user.role, username: user.username, dealerCode: user.dealer_code || null },
    200,
    { "Set-Cookie": setSessionCookie(token, isSecure) },
  );
}
