import { getSessionUser, json } from "./_lib.js";

const PUBLIC_PATHS = ["/api/auth/login", "/api/setup", "/api/health", "/api/ping", "/api/public-stats", "/api/migrate-baselines"];

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  // Allow preflight + public endpoints
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (PUBLIC_PATHS.includes(path)) return context.next();
  // GET /api/data is public (read-only, no secrets); mutations require auth below
  if (path === "/api/data" && request.method === "GET") return context.next();
  // GET /api/photo/* is public (serve images)
  if (path.startsWith("/api/photo/") && request.method === "GET") return context.next();

  const user = await getSessionUser(env.DB, request);
  if (!user) {
    return json({ error: "unauthorized" }, 401);
  }
  context.data = context.data || {};
  context.data.user = user;
  return context.next();
}
