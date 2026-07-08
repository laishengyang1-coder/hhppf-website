import { json } from "../_lib.js";

// GET /api/photo/:filename — serve image from R2
export async function onRequestGet(context) {
  const { env, params } = context;
  const filename = params && params.filename;
  if (!filename) return json({ ok: false, error: "no_key" }, 400);
  const object = await env.PHOTOS.get(`warranty/${filename}`);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}
