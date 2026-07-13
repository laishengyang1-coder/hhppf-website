import { json } from "./_lib.js";

// GET /api/public/stats — public aggregate statistics (no auth required)
// Returns only summary numbers, never individual records or PII.
export async function onRequestGet(context) {
  const { env } = context;
  const row = await env.DB.prepare("SELECT value FROM app_data WHERE key = ?").bind("main").first();

  // Default fallback (no data yet)
  const baseline = 1717;
  if (!row || !row.value) {
    return json(
      {
        ok: true,
        historicalWarrantyBaseline: baseline,
        activeWarrantyCount: 0,
        displayWarrantyTotal: baseline,
        uniqueVehicleCount: 0,
        activeDealerCount: 0,
        coveredCountryCount: 0,
        updatedAt: new Date().toISOString(),
      },
      200,
      { "Cache-Control": "public, max-age=60" },
    );
  }

  try {
    const data = JSON.parse(row.value);
    const records = data.warrantyRecords || [];
    const dealers = data.dealers || [];
    const settings = data.settings || {};

    // Historical baseline from settings (default 1717)
    const historicalWarrantyBaseline =
      typeof settings.historicalWarrantyBaseline === "number"
        ? settings.historicalWarrantyBaseline
        : 1717;

    // Only count Active warranty records (approved and in effect)
    const activeRecords = records.filter((r) => r.status === "Active");
    const activeWarrantyCount = activeRecords.length;

    // Display total = baseline + active system records
    const displayWarrantyTotal = historicalWarrantyBaseline + activeWarrantyCount;

    // Unique vehicles = distinct VINs among active records
    const vinSet = new Set(
      activeRecords.map((r) => (r.vin || "").toUpperCase()).filter(Boolean),
    );
    const uniqueVehicleCount = vinSet.size;

    // Active dealers = dealers with status "Active"
    const activeDealerList = dealers.filter((d) => d.status === "Active");
    const activeDealerCount = activeDealerList.length;

    // Covered countries = distinct countries among active dealers
    // Normalize: trim, lowercase for comparison to avoid duplicates
    const seen = new Set();
    for (const d of activeDealerList) {
      const c = (d.country || "").trim();
      if (c) seen.add(c.toLowerCase());
    }
    const coveredCountryCount = seen.size;

    return json(
      {
        ok: true,
        historicalWarrantyBaseline,
        activeWarrantyCount,
        displayWarrantyTotal,
        uniqueVehicleCount,
        activeDealerCount,
        coveredCountryCount,
        updatedAt: new Date().toISOString(),
      },
      200,
      { "Cache-Control": "public, max-age=60" },
    );
  } catch (e) {
    return json({ ok: false, error: "parse_error" }, 500);
  }
}
