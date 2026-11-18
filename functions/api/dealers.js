import { hashPassword, json, readBody } from "./_lib.js";

function requireAdmin(context) {
  const user = context.data && context.data.user;
  return Boolean(user && user.role === "admin");
}

async function getBlob(env) {
  const row = await env.DB.prepare("SELECT value FROM app_data WHERE key = 'main'").first();
  if (!row || !row.value) return null;
  try {
    return JSON.parse(row.value);
  } catch (_) {
    return null;
  }
}

async function saveBlob(env, blob) {
  const serialized = JSON.stringify(blob);
  await env.DB
    .prepare("INSERT INTO app_data (key, value, updated_at) VALUES ('main', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
    .bind(serialized)
    .run();
}

// POST /api/dealers — admin only
export async function onRequestPost(context) {
  if (!requireAdmin(context)) {
    return json({ ok: false, error: "forbidden_admin_only" }, 403);
  }
  const { env, request } = context;
  const body = await readBody(request);
  const { code, username, password, name, country, city, phone, address, contact, level, status, points, parentCode } = body;
  if (!code || !username || !name) {
    return json({ ok: false, error: "missing_fields" }, 400);
  }
  const existing = await env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(username).first();
  if (existing) {
    return json({ ok: false, error: "username_exists" }, 400);
  }
  if (!password) {
    return json({ ok: false, error: "password_required" }, 400);
  }
  const hash = await hashPassword(password);
  await env.DB
    .prepare("INSERT INTO users (role, username, password_hash, dealer_code) VALUES ('dealer', ?, ?, ?)")
    .bind(username, hash, code)
    .run();

  const blob = await getBlob(env);
  if (blob) {
    blob.dealers = blob.dealers || [];
    blob.dealers.push({
      code,
      username,
      name,
      country: country || "",
      city: city || "",
      phone: phone || "",
      address: address || "",
      contact: contact || "",
      level: level || "City Dealer",
      status: status || "Active",
      points: Number(points) || 0,
      parentCode: parentCode || "HQ",
    });
    await saveBlob(env, blob);
  }
  return json({ ok: true, dealer: { code, username, name } });
}

// PUT /api/dealers — admin only
export async function onRequestPut(context) {
  if (!requireAdmin(context)) {
    return json({ ok: false, error: "forbidden_admin_only" }, 403);
  }
  const { env, request } = context;
  const body = await readBody(request);
  const { code, username, password, name, country, city, phone, address, contact, level, status, points, parentCode } = body;
  if (!code) return json({ ok: false, error: "missing_code" }, 400);

  if (password) {
    const hash = await hashPassword(password);
    await env.DB
      .prepare("UPDATE users SET password_hash = ?, username = ? WHERE dealer_code = ?")
      .bind(hash, username, code)
      .run();
  } else if (username) {
    await env.DB.prepare("UPDATE users SET username = ? WHERE dealer_code = ?").bind(username, code).run();
  }

  const blob = await getBlob(env);
  if (blob) {
    blob.dealers = blob.dealers || [];
    const idx = blob.dealers.findIndex((d) => d.code === code);
    if (idx > -1) {
      blob.dealers[idx] = {
        ...blob.dealers[idx],
        code,
        username: username || blob.dealers[idx].username,
        name: name || blob.dealers[idx].name,
        country: country !== undefined ? country : blob.dealers[idx].country,
        city: city !== undefined ? city : blob.dealers[idx].city,
        phone: phone !== undefined ? phone : blob.dealers[idx].phone,
        address: address !== undefined ? address : blob.dealers[idx].address,
        contact: contact !== undefined ? contact : blob.dealers[idx].contact,
        level: level || blob.dealers[idx].level,
        status: status || blob.dealers[idx].status,
        points: Number(points !== undefined ? points : blob.dealers[idx].points),
        parentCode: parentCode || blob.dealers[idx].parentCode,
      };
      await saveBlob(env, blob);
    }
  }
  return json({ ok: true });
}

// DELETE /api/dealers?code=XXX — admin only
export async function onRequestDelete(context) {
  if (!requireAdmin(context)) {
    return json({ ok: false, error: "forbidden_admin_only" }, 403);
  }
  const { env, request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return json({ ok: false, error: "missing_code" }, 400);
  await env.DB.prepare("DELETE FROM users WHERE dealer_code = ?").bind(code).run();
  const blob = await getBlob(env);
  if (blob) {
    blob.dealers = (blob.dealers || []).filter((d) => d.code !== code);
    await saveBlob(env, blob);
  }
  return json({ ok: true });
}
