import { json, readBody } from "./_lib.js";

// GET /api/data — returns the full app dataset (single source of truth)
export async function onRequestGet(context) {
  const { env } = context;
  const row = await env.DB.prepare("SELECT value FROM app_data WHERE key = ?").bind("main").first();
  if (!row || !row.value) {
    return json({ ok: true, data: null });
  }
  try {
    return json({ ok: true, data: JSON.parse(row.value) });
  } catch (e) {
    return json({ ok: false, error: "data_corrupt" }, 500);
  }
}

// PUT /api/data — saves the full app dataset
export async function onRequestPut(context) {
  const { env, request } = context;
  const body = await readBody(request);
  const payload = body.data;
  if (!payload || typeof payload !== "object") {
    return json({ ok: false, error: "invalid_payload" }, 400);
  }
  const serialized = JSON.stringify(payload);
  await env.DB
    .prepare(
      "INSERT INTO app_data (key, value, updated_at) VALUES ('main', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
    )
    .bind(serialized)
    .run();
  return json({ ok: true });
}
