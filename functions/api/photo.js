import { json } from "./_lib.js";

const ALLOWED = ["jpg", "jpeg", "png", "webp", "gif"];

// POST /api/photo — upload image to R2, returns URL
export async function onRequestPost(context) {
  const { request, env } = context;
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return json({ ok: false, error: "no_file" }, 400);
  }
  const ext = String((file.name || "photo.jpg").split(".").pop() || "jpg").toLowerCase();
  const safeExt = ALLOWED.includes(ext) ? ext : "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${safeExt}`;
  const r2Key = `warranty/${filename}`;
  const arrayBuffer = await file.arrayBuffer();
  await env.PHOTOS.put(r2Key, arrayBuffer, {
    httpMetadata: { contentType: file.type || "image/jpeg" },
  });
  return json({ ok: true, url: `/api/photo/${filename}` });
}
