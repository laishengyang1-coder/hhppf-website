import { json } from "./_lib.js";

// GET /api/public/stats — public aggregate statistics (no auth required)
// Returns only summary numbers, never individual records or PII.
export async function onRequestGet(context) {
  const { env } = context;
  const row = await env.DB.prepare("SELECT value FROM app_data WHERE key = ?").bind("main").first();

  const defaultWarrantyBaseline = 7654;
  if (!row || !row.value) {
    return json(
      {
        ok: true,
        historicalWarrantyBaseline: defaultWarrantyBaseline,
        activeWarrantyCount: 0,
        displayWarrantyTotal: defaultWarrantyBaseline,
        historicalVehicleBaseline: 0,
        uniqueVehicleCount: 0,
        displayVehicleTotal: 0,
        historicalDealerBaseline: 0,
        activeDealerCount: 0,
        displayDealerTotal: 0,
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

    const historicalWarrantyBaseline =
      typeof settings.historicalWarrantyBaseline === "number"
        ? settings.historicalWarrantyBaseline
        : 7654;
    const historicalVehicleBaseline =
      typeof settings.historicalVehicleBaseline === "number"
        ? settings.historicalVehicleBaseline
        : 0;
    const historicalDealerBaseline =
      typeof settings.historicalDealerBaseline === "number"
        ? settings.historicalDealerBaseline
        : 0;

    // Active warranties
    const activeRecords = records.filter((r) => r.status === "Active");
    const activeWarrantyCount = activeRecords.length;
    const displayWarrantyTotal = historicalWarrantyBaseline + activeWarrantyCount;

    // Unique vehicles
    const vinSet = new Set(
      activeRecords.map((r) => (r.vin || "").toUpperCase()).filter(Boolean),
    );
    const uniqueVehicleCount = vinSet.size;
    const displayVehicleTotal = historicalVehicleBaseline + uniqueVehicleCount;

    // Active dealers
    const activeDealerList = dealers.filter((d) => d.status === "Active");
    const activeDealerCount = activeDealerList.length;
    const displayDealerTotal = historicalDealerBaseline + activeDealerCount;

    // Covered countries
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
        historicalVehicleBaseline,
        uniqueVehicleCount,
        displayVehicleTotal,
        historicalDealerBaseline,
        activeDealerCount,
        displayDealerTotal,
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
