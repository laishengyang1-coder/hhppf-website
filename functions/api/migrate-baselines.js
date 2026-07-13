import { json } from "./_lib.js";

export async function onRequestGet(context) {
  const { env } = context;
  const row = await env.DB.prepare("SELECT value FROM app_data WHERE key = ?").bind("main").first();
  if (!row || !row.value) return json({ ok: false, error: "no_data" });
  const data = JSON.parse(row.value);
  if (!data.settings) data.settings = {};
  const old = {
    warranty: data.settings.historicalWarrantyBaseline,
    vehicle: data.settings.historicalVehicleBaseline,
    dealer: data.settings.historicalDealerBaseline,
  };
  data.settings.historicalWarrantyBaseline = 7654;
  data.settings.historicalVehicleBaseline = 4567;
  data.settings.historicalDealerBaseline = 234;
  const serialized = JSON.stringify(data);
  await env.DB.prepare("UPDATE app_data SET value = ?, updated_at = datetime('now') WHERE key = 'main'").bind(serialized).run();
  return json({ ok: true, old, new: { warranty: 7654, vehicle: 4567, dealer: 234 } });
}
