import { hashPassword, json } from "./_lib.js";
import { SEED_ADMIN, SEED_DEALERS, buildSeedBlob } from "./_seed.js";

const DATA_VERSION = 4;

// POST /api/setup — one-time initialization (idempotent: only seeds if empty)
export async function onRequestPost(context) {
  const { env } = context;

  // Check if already initialized
  const existing = await env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();
  if (existing && existing.cnt > 0) {
    return json({ ok: true, alreadyInitialized: true, message: "System already initialized." });
  }

  // 1. Create admin user
  const adminHash = await hashPassword(SEED_ADMIN.password);
  await env.DB
    .prepare("INSERT INTO users (role, username, password_hash, dealer_code) VALUES ('admin', ?, ?, NULL)")
    .bind(SEED_ADMIN.username, adminHash)
    .run();

  // 2. Create dealer users
  for (const dealer of SEED_DEALERS) {
    const hash = await hashPassword(dealer.password);
    await env.DB
      .prepare("INSERT INTO users (role, username, password_hash, dealer_code) VALUES ('dealer', ?, ?, ?)")
      .bind(dealer.username, hash, dealer.code)
      .run();
  }

  // 3. Seed app_data blob
  const blob = buildSeedBlob(DATA_VERSION);
  const serialized = JSON.stringify(blob);
  await env.DB
    .prepare("INSERT INTO app_data (key, value, updated_at) VALUES ('main', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
    .bind(serialized)
    .run();

  return json({
    ok: true,
    initialized: true,
    message: "System initialized. Admin login: anhuiheheppf / hhppf. Dealer demo: moscow / hhppf.",
  });
}

// GET /api/setup — check initialization status
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
