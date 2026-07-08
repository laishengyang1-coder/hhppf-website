import { hashPassword, randomToken, sessionExpiresAt, setSessionCookie, json, readBody } from "../_lib.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await readBody(request);
  const role = String(body.role || "").toLowerCase();
  const username = String(body.username || "").trim();
  const password = String(body.password || "");

  if (!username || !password || !role) {
    return json({ ok: false, error: "missing_fields" }, 400);
  }

  const hash = await hashPassword(password);
  const user = await env.DB
    .prepare("SELECT id, role, username, dealer_code, password_hash FROM users WHERE username = ? AND role = ?")
    .bind(username, role)
    .first();

  if (!user || user.password_hash !== hash) {
    return json({ ok: false, error: "invalid_credentials" }, 401);
  }

  const token = randomToken();
  await env.DB
    .prepare("INSERT INTO sessions (token, role, username, dealer_code, expires_at) VALUES (?, ?, ?, ?, ?)")
    .bind(token, user.role, user.username, user.dealer_code || null, sessionExpiresAt())
    .run();

  return json(
    { ok: true, role: user.role, username: user.username, dealerCode: user.dealer_code || null },
    200,
    { "Set-Cookie": setSessionCookie(token) },
  );
}
