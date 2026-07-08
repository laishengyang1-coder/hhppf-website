import { json } from "./_lib.js";

// GET /api/health — diagnostic endpoint (no auth required via middleware? it IS required)
// But middleware calls getSessionUser which needs DB... so this is behind auth.
// Let's make a raw health check that doesn't go through the lib.
export async function onRequestGet(context) {
  const { env } = context;
  const diag = {
    hasDB: !!env.DB,
    hasPHOTOS: !!env.PHOTOS,
    keys: Object.keys(env),
  };
  return json({ ok: true, diag });
}
