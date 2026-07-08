import { clearSessionCookie, json, parseCookies } from "../_lib.js";

const SESSION_COOKIE = "hh_session";

export async function onRequestPost(context) {
  const { request, env } = context;
  const cookies = parseCookies(request.headers.get("Cookie"));
  const token = cookies[SESSION_COOKIE];
  if (token) {
    await env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
  }
  return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
}
