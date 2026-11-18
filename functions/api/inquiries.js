import { json, readBody } from "./_lib.js";

async function ensureTable(db) {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        company TEXT NOT NULL,
        country TEXT NOT NULL,
        business_type TEXT,
        interest TEXT,
        contact TEXT NOT NULL,
        message TEXT,
        lang TEXT,
        status TEXT NOT NULL DEFAULT 'Pending',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    )
    .run();
  try {
    await db.prepare("ALTER TABLE inquiries ADD COLUMN status TEXT NOT NULL DEFAULT 'Pending'").run();
  } catch (_) {
    // column already exists
  }
}

function requireAdmin(context) {
  const user = context.data && context.data.user;
  return Boolean(user && user.role === "admin");
}

// POST /api/inquiries — public B2B partner / sample kit inquiry submission
export async function onRequestPost(context) {
  const { env, request } = context;
  const body = await readBody(request);
  const name = String(body.name || "").trim().slice(0, 120);
  const company = String(body.company || "").trim().slice(0, 160);
  const country = String(body.country || "").trim().slice(0, 120);
  const businessType = String(body.businessType || "").trim().slice(0, 120);
  const interest = String(body.interest || "").trim().slice(0, 200);
  const contact = String(body.contact || "").trim().slice(0, 180);
  const message = String(body.message || "").trim().slice(0, 2000);
  const lang = String(body.lang || "en").trim().slice(0, 12);

  if (!name || !company || !country || !contact) {
    return json({ ok: false, error: "missing_required_fields" }, 400);
  }

  if (!env || !env.DB) {
    return json({ ok: false, error: "db_unavailable" }, 503);
  }

  await ensureTable(env.DB);
  await env.DB
    .prepare(
      "INSERT INTO inquiries (name, company, country, business_type, interest, contact, message, lang, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')",
    )
    .bind(name, company, country, businessType, interest, contact, message, lang)
    .run();

  return json({ ok: true });
}

// GET /api/inquiries — admin only
export async function onRequestGet(context) {
  if (!requireAdmin(context)) {
    return json({ ok: false, error: "forbidden_admin_only" }, 403);
  }
  await ensureTable(context.env.DB);
  const { results } = await context.env.DB
    .prepare("SELECT * FROM inquiries ORDER BY id DESC LIMIT 500")
    .all();
  return json({ ok: true, inquiries: results || [] });
}

// PUT /api/inquiries — admin toggle follow-up status
export async function onRequestPut(context) {
  if (!requireAdmin(context)) {
    return json({ ok: false, error: "forbidden_admin_only" }, 403);
  }
  const body = await readBody(context.request);
  const id = parseInt(body.id, 10);
  const status = body.status === "Contacted" ? "Contacted" : "Pending";
  if (!id) return json({ ok: false, error: "missing_id" }, 400);
  await ensureTable(context.env.DB);
  await context.env.DB.prepare("UPDATE inquiries SET status = ? WHERE id = ?").bind(status, id).run();
  return json({ ok: true });
}

// DELETE /api/inquiries?id=XX — admin delete inquiry
export async function onRequestDelete(context) {
  if (!requireAdmin(context)) {
    return json({ ok: false, error: "forbidden_admin_only" }, 403);
  }
  const url = new URL(context.request.url);
  const id = parseInt(url.searchParams.get("id") || "", 10);
  if (!id) return json({ ok: false, error: "missing_id" }, 400);
  await ensureTable(context.env.DB);
  await context.env.DB.prepare("DELETE FROM inquiries WHERE id = ?").bind(id).run();
  return json({ ok: true });
}
