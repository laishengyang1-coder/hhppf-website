import { json } from "./_lib.js";

// GET /api/public/stats — public aggregate statistics (no auth required)
// Returns only summary numbers, never individual records or PII.
export async function onRequestGet(context) {
  const { env } = context;
  const row = await env.DB.prepare("SELECT value FROM app_data WHERE key = ?").bind("main").first();
  if (!row || !row.value) {
    return json({
      ok: true,
      activeWarranties: 0,
      uniqueVehicles: 0,
      activeDealers: 0,
      coveredCountries: 0,
      updatedAt: new Date().toISOString(),
    });
  }

  try {
    const data = JSON.parse(row.value);
    const records = data.warrantyRecords || [];
    const dealers = data.dealers || [];

    // Only count Active warranty records (approved and in effect)
    const activeRecords = records.filter((r) => r.status === "Active");
    const activeWarranties = activeRecords.length;

    // Unique vehicles = distinct VINs among active records
    const vinSet = new Set(activeRecords.map((r) => (r.vin || "").toUpperCase()).filter(Boolean));
    const uniqueVehicles = vinSet.size;

    // Active dealers = dealers with status "Active"
    const activeDealerList = dealers.filter((d) => d.status === "Active");
    const activeDealers = activeDealerList.length;

    // Covered countries = distinct countries among active dealers
    const countrySet = new Set(
      activeDealerList.map((d) => (d.country || "").trim()).filter(Boolean),
    );
    const coveredCountries = countrySet.size;

    // Cache for 5 minutes via Cache-Control header
    return json(
      {
        ok: true,
        activeWarranties,
        uniqueVehicles,
        activeDealers,
        coveredCountries,
        updatedAt: new Date().toISOString(),
      },
      200,
      { "Cache-Control": "public, max-age=300" },
    );
  } catch (e) {
    return json({ ok: false, error: "parse_error" }, 500);
  }
}
