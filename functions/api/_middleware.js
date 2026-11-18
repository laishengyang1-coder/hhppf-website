import { getSessionUser, json } from "./_lib.js";

const PUBLIC_PATHS = [
  "/api/auth/login",
  "/api/setup",
  "/api/health",
  "/api/ping",
  "/api/public-stats",
  "/api/public/stats",
  "/api/public/verify",
];

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (PUBLIC_PATHS.includes(path)) return context.next();

  // Public B2B inquiry submission from main website (#partner form)
  if (path === "/api/inquiries" && request.method === "POST") {
    return context.next();
  }

  // GET /api/data attaches session user (if any) and returns strictly role-scoped data in data.js
  if (path === "/api/data" && request.method === "GET") {
    const optionalUser = await getSessionUser(env.DB, request);
    context.data = context.data || {};
    context.data.user = optionalUser;
    return context.next();
  }

  // GET /api/photo/* serves uploaded certificate/reward images
  if (path.startsWith("/api/photo/") && request.method === "GET") {
    return context.next();
  }

  const user = await getSessionUser(env.DB, request);
  if (!user) {
    return json({ error: "unauthorized" }, 401);
  }
  context.data = context.data || {};
  context.data.user = user;
  return context.next();
}
