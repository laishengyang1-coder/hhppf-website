import { hashPassword, json, readBody } from "./_lib.js";
import { SEED_ADMIN, SEED_DEALERS, buildSeedBlob } from "./_seed.js";

const DATA_VERSION = 5;

// POST /api/setup — one-time initialization (requires INIT_SECRET or body.initialPassword if DB is empty)
export async function onRequestPost(context) {
  const { env, request } = context;

  const existing = await env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();
  if (existing && existing.cnt > 0) {
    return json({ ok: true, alreadyInitialized: true, message: "System already initialized." });
  }

  const body = await readBody(request);
  const initPassword = String(env.INIT_ADMIN_PASSWORD || body.initialPassword || "").trim();
  if (!initPassword || initPassword.length < 8) {
    return json(
      {
        ok: false,
        error: "initial_password_required",
        message: "Provide INIT_ADMIN_PASSWORD env secret or initialPassword (>= 8 chars) to initialize empty database.",
      },
      400,
    );
  }

  const adminHash = await hashPassword(initPassword);
  await env.DB
    .prepare("INSERT INTO users (role, username, password_hash, dealer_code) VALUES ('admin', ?, ?, NULL)")
    .bind(SEED_ADMIN.username, adminHash)
    .run();

  for (const dealer of SEED_DEALERS) {
    const hash = await hashPassword(initPassword);
    await env.DB
      .prepare("INSERT INTO users (role, username, password_hash, dealer_code) VALUES ('dealer', ?, ?, ?)")
      .bind(dealer.username, hash, dealer.code)
      .run();
  }

  const blob = buildSeedBlob(DATA_VERSION);
  await env.DB
    .prepare(
      "INSERT INTO app_data (key, value, updated_at) VALUES ('main', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
    )
    .bind(JSON.stringify(blob))
    .run();

  return json({
    ok: true,
    initialized: true,
    message: "System initialized successfully.",
  });
}

export async function onRequestGet(context) {
  const { env } = context;
  try {
    const users = await env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();
    const data = await env.DB.prepare("SELECT value FROM app_data WHERE key = 'main'").first();
    return json({
      ok: true,
      initialized: !!(users && users.cnt > 0),
      hasData: !!data,
    });
  } catch (e) {
    return json({ ok: false, error: String(e && e.message ? e.message : e) }, 500);
  }
}
