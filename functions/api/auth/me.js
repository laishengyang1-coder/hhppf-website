import { json } from "../_lib.js";

export async function onRequestGet(context) {
  const user = context.data && context.data.user;
  if (!user) return json({ error: "unauthorized" }, 401);
  return json({ ok: true, role: user.role, username: user.username, dealerCode: user.dealerCode || null });
}
