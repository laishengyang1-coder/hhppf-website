import { json } from "../_lib.js";

const SAMPLE_VIN = "XTA210990R1234567";

function maskCustomerName(name) {
  const s = String(name || "").trim();
  if (!s) return "***";
  const parts = s.split(/\s+/);
  if (parts.length === 1) {
    return s.slice(0, 1) + "***";
  }
  return `${parts[0]} ${parts[1].slice(0, 1)}***`;
}

const DEMO_SAMPLE_RECORDS = [
  {
    id: "DEMO-WR-2026-0001",
    warrantyCode: "HH-APEX-2026-DEMO",
    vin: SAMPLE_VIN,
    customerName: "Alex P*** (Sample Preview)",
    vehicleMake: "BMW",
    vehicleModel: "X5",
    vehicleYear: "2026",
    productType: "PPF",
    productName: "HEHE PPF APEX 190",
    installationCategory: "FULL_CAR_PPF",
    installationDate: "2026-10-15",
    warrantyExpiryDate: "2041-10-15",
    dealerCode: "RU-MSK-001",
    dealerName: "H&H Authorized Detailing Center (Sample)",
    country: "Russia",
    city: "Moscow",
    status: "Active",
    photos: [],
    reviewNote: "Sample electronic certificate preview (15-Year Dual-PC PPF).",
  },
  {
    id: "DEMO-WR-2026-0002",
    warrantyCode: "HH-DS70-2026-DEMO",
    vin: SAMPLE_VIN,
    customerName: "Alex P*** (Sample Preview)",
    vehicleMake: "BMW",
    vehicleModel: "X5",
    vehicleYear: "2026",
    productType: "WINDOW_FILM",
    productName: "HEHE Dual Silver Series DS 70",
    installationCategory: "WINDOW_FILM",
    installationDate: "2026-10-15",
    warrantyExpiryDate: "2036-10-15",
    dealerCode: "RU-MSK-001",
    dealerName: "H&H Authorized Detailing Center (Sample)",
    country: "Russia",
    city: "Moscow",
    status: "Active",
    photos: [],
    reviewNote: "Sample electronic certificate preview (10-Year Dual Silver Window Film).",
  },
];

// GET /api/public/verify?vin=XXX — privacy-safe public owner VIN verification
export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const vin = String(url.searchParams.get("vin") || "").trim().toUpperCase();

  if (!vin || vin.length < 5) {
    return json({ ok: true, records: [] });
  }

  let matched = [];
  try {
    const row = await env.DB.prepare("SELECT value FROM app_data WHERE key = 'main'").first();
    if (row && row.value) {
      const blob = JSON.parse(row.value);
      matched = (blob.warrantyRecords || [])
        .filter((r) => r && r.status === "Active" && String(r.vin || "").trim().toUpperCase() === vin)
        .map((r) => ({
          id: r.id,
          warrantyCode: r.warrantyCode,
          vin: r.vin,
          customerName: maskCustomerName(r.customerName),
          vehicleMake: r.vehicleMake,
          vehicleModel: r.vehicleModel,
          vehicleYear: r.vehicleYear,
          productType: r.productType,
          productName: r.productName,
          installationCategory: r.installationCategory,
          installationDate: r.installationDate,
          warrantyExpiryDate: r.warrantyExpiryDate,
          dealerCode: r.dealerCode,
          dealerName: r.dealerName,
          country: r.country,
          city: r.city,
          status: "Active",
          photos: r.photos || [],
        }));
    }
  } catch (_) {
    matched = [];
  }

  if (matched.length === 0 && vin === SAMPLE_VIN) {
    return json({ ok: true, isSample: true, records: DEMO_SAMPLE_RECORDS });
  }

  return json({ ok: true, records: matched });
}
