// Seed data for H&H Warranty System initialization
// Updated to October 2026 official H&H global product lineup (no prices / no internal factory codes)

export const SEED_SETTINGS = {
  defaultWarrantyPoints: 100,
  pointsValidityMonths: 12,
  historicalWarrantyBaseline: 7654,
  historicalVehicleBaseline: 4567,
  historicalDealerBaseline: 234,
};

export const SEED_PRODUCTS = [
  { type: "PPF", name: "HEHE PPF Classic 190", externalModel: "HH Classic 190", warrantyYears: 5, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Entry, 7.5±0.3mil, 26MPa, 140GU Class A, lotus hydrophobic & fast self-healing. 5-year warranty." },
  { type: "PPF", name: "HEHE PPF Plus 190", externalModel: "HH Plus 190", warrantyYears: 5, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Mid-range, 7.5±0.3mil, 28MPa, 142GU Class A, high stain defense & crack-free coating. 5-year warranty." },
  { type: "PPF", name: "HEHE PPF Pro 210", externalModel: "HH Pro 210", warrantyYears: 12, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Upper-mid, 8.5±0.3mil, Polycarbonate hydrophobic topcoat, anti-yellowing & anti-hydrolysis. 12-year warranty." },
  { type: "PPF", name: "HEHE PPF APEX 190", externalModel: "HH APEX 190", warrantyYears: 15, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "High-end global debut, 7.5±0.3mil, Dual-Polycarbonate PPF, 143GU, extreme anti-aging. 15-year warranty." },
  { type: "PPF", name: "HEHE PPF Ultra 240", externalModel: "HH Ultra 240", warrantyYears: 10, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Top flagship, 9.5±0.3mil, Lubrizol TPU resin, 144GU Class A, superior anti-stain. 10-year warranty." },
  { type: "PPF", name: "HEHE Matte PPF", externalModel: "HH Matte", warrantyYears: 5, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Satin matte, 7.5±0.3mil, 35MPa, 8.8GU silky soft-touch surface. 5-year warranty." },
  { type: "WINDOW_FILM", name: "HEHE Dual Silver Series DS 70", externalModel: "HH DS70", warrantyYears: 10, usageType: "Multi", defaultUsageLimit: 24, status: "Active", remark: "Front windshield, 11-layer dual-silver sputtering, VLT 70%, IRR 95%, TSER 58%, 3mil. 10-year warranty." },
  { type: "WINDOW_FILM", name: "HEHE Dual Silver Series DS 20", externalModel: "HH DS20", warrantyYears: 10, usageType: "Multi", defaultUsageLimit: 24, status: "Active", remark: "Side/rear windows, 11-layer dual-silver sputtering, VLT 25%, IRR 95%, TSER 65%, 3mil. 10-year warranty." },
  { type: "WINDOW_FILM", name: "HEHE UV Shield Series UV70", externalModel: "HH UV70", warrantyYears: 10, usageType: "Multi", defaultUsageLimit: 24, status: "Active", remark: "Front windshield, UV400 100% block, VLT 70%, IRR 95%, TSER 48%, 2mil. 10-year warranty." },
  { type: "WINDOW_FILM", name: "HEHE UV Shield Series UV15", externalModel: "HH UV15", warrantyYears: 10, usageType: "Multi", defaultUsageLimit: 24, status: "Active", remark: "Side/rear windows, UV400 100% block, VLT 18%, IRR 95%, TSER 66%, 2mil. 10-year warranty." },
  { type: "WINDOW_FILM", name: "HEHE Ceramic IR CIR70", externalModel: "HH CIR70", warrantyYears: 10, usageType: "Multi", defaultUsageLimit: 24, status: "Active", remark: "Front windshield, 5G nano-ceramic, VLT 75%, UVR ≥99%, IRR 92%, TSER 46%, 2mil. 10-year warranty." },
  { type: "WINDOW_FILM", name: "HEHE Ceramic IR CIR15", externalModel: "HH CIR15", warrantyYears: 10, usageType: "Multi", defaultUsageLimit: 24, status: "Active", remark: "Side/rear windows, 5G nano-ceramic, VLT 20%, UVR ≥99%, IRR 94%, TSER 63%, 2mil. 10-year warranty." },
  { type: "WINDOW_FILM", name: "HEHE Blush Gold", externalModel: "HH Blush Gold", warrantyYears: 8, usageType: "Multi", defaultUsageLimit: 24, status: "Active", remark: "Rose-gold chameleon nano-ceramic tint, VLT 70%, IRR 94%, TSER 47%, 2mil. 8-year warranty." },
  { type: "WINDOW_FILM", name: "HEHE Sky Cyan", externalModel: "HH Sky Cyan", warrantyYears: 8, usageType: "Multi", defaultUsageLimit: 24, status: "Active", remark: "Multi-layer optical micro-structure chameleon film, VLT 75%, IRR 92%, TSER 49%, 3mil. 8-year warranty." },
  { type: "TPU_COLOR_PPF", name: "TPU Color PPF Crystal Series", externalModel: "TPU Color PPF Crystal Series", warrantyYears: 5, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Entry crystal gloss, AIOC cross-linked 7.5±0.5mil TPU, 1.52×18m. 5-year warranty." },
  { type: "TPU_COLOR_PPF", name: "TPU Color PPF Metallic Series", externalModel: "TPU Color PPF Metallic Series", warrantyYears: 5, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Mid-range pearl/metallic, AIOC cross-linked 7.5±0.5mil TPU, 1.52×18m. 5-year warranty." },
  { type: "TPU_COLOR_PPF", name: "TPU Color PPF Satin Series", externalModel: "TPU Color PPF Satin Series", warrantyYears: 5, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "High-end velvet satin matte, AIOC cross-linked 7.5±0.5mil TPU, 1.52×18m. 5-year warranty." },
  { type: "TPU_COLOR_PPF", name: "TPU Color PPF Color Shift Series", externalModel: "TPU Color PPF Color Shift Series", warrantyYears: 5, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Flagship aurora chameleon shift, AIOC cross-linked 7.5±0.5mil TPU, 1.52×18m. 5-year warranty." },
  { type: "SPECIAL_FILM", name: "HEHE Architectural Film", externalModel: "HH Architectural Film", warrantyYears: 10, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Commercial building glass film, PET material, 1.52×30m. 10-year warranty." },
  { type: "SPECIAL_FILM", name: "HEHE Interior Film", externalModel: "HH Interior Film", warrantyYears: 10, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Interior decoration film, PET material, 1.52×30m. 10-year warranty." },
  { type: "SPECIAL_FILM", name: "HEHE Skylight Armor", externalModel: "HH Skylight Armor", warrantyYears: 3, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Sunroof protection, 6.5mil TPU, high UV/IR block. 3-year warranty." },
  { type: "SPECIAL_FILM", name: "HEHE Safety Shield", externalModel: "HH Safety Shield", warrantyYears: 1, usageType: "Single", defaultUsageLimit: 1, status: "Active", remark: "Glass protection, 6mil EPU, high strength & transparency. 1-year warranty." },
  { type: "MANUAL_PARTIAL", name: "Manual Partial Warranty", externalModel: "", warrantyYears: 2, usageType: "Single", defaultUsageLimit: 1, status: "Reserved", remark: "HQ manual handling for repairs, short-meter use, and partial installs." },
];

export const SEED_DEALERS = [
  { code: "RU-MSK-001", username: "moscow", name: "Moscow Auto Studio", country: "Russia", city: "Moscow", level: "Country Partner", status: "Active", points: 860, parentCode: "HQ" },
  { code: "RU-SPB-002", username: "spb", name: "Saint Petersburg Detail Lab", country: "Russia", city: "Saint Petersburg", level: "Regional Dealer", status: "Active", points: 340, parentCode: "RU-MSK-001" },
];

export const SEED_ADMIN = { username: "anhuiheheppf" };

export const SEED_REWARDS = [
  { id: "RW-001", category: "Workwear", name: "H&H Workwear", points: 420, status: "Available for Redemption", stockStatus: "Available for Redemption" },
  { id: "RW-002", category: "Workwear", name: "H&H Cap", points: 160, status: "Available for Redemption", stockStatus: "Available for Redemption" },
  { id: "RW-003", category: "Sample Material", name: "TPU Color Film Color Card", points: 520, status: "Available for Redemption", stockStatus: "Available for Redemption" },
  { id: "RW-004", category: "Sample Material", name: "PPF Sample Book", points: 680, status: "Out of Stock", stockStatus: "Out of Stock" },
  { id: "RW-005", category: "Tools", name: "Installation Tool Kit", points: 760, status: "Available for Redemption", stockStatus: "Available for Redemption" },
  { id: "RW-006", category: "Tools", name: "Seat Cover", points: 120, status: "Coming Soon", stockStatus: "Coming Soon" },
];

export const SEED_WARRANTY_CODES = [
  { code: "HH-PPF-2026-0001", factoryRollNo: "FR-PPF-8891", batchNo: "B-PPF-2026-07", shipmentNo: "HH-RU-2026-07-A", productType: "PPF", productName: "HEHE PPF APEX 190", warrantyYears: 15, usageType: "Single", usageLimit: 1, usedCount: 1, dealerCode: "RU-MSK-001", importBatch: "IMP-2026-0706-A", status: "Active", remark: "Factory code used as certificate number." },
  { code: "HH-WF-2026-0008", factoryRollNo: "FR-WF-1018", batchNo: "B-WF-2026-07", shipmentNo: "HH-RU-2026-07-A", productType: "WINDOW_FILM", productName: "HEHE Dual Silver Series DS 70", warrantyYears: 10, usageType: "Multi", usageLimit: 24, usedCount: 3, dealerCode: "RU-MSK-001", importBatch: "IMP-2026-0706-A", status: "Allocated", remark: "21 uses remaining." },
  { code: "HH-TPU-2026-0012", factoryRollNo: "FR-TPU-4410", batchNo: "B-TPU-2026-07", shipmentNo: "HH-RU-2026-07-B", productType: "TPU_COLOR_PPF", productName: "TPU Color PPF Crystal Series", warrantyYears: 5, usageType: "Single", usageLimit: 1, usedCount: 0, dealerCode: "RU-MSK-001", importBatch: "IMP-2026-0706-B", status: "Allocated", remark: "" },
  { code: "HH-PPF-2026-0044", factoryRollNo: "FR-PPF-8910", batchNo: "B-PPF-2026-07", shipmentNo: "", productType: "PPF", productName: "HEHE PPF Pro 210", warrantyYears: 12, usageType: "Single", usageLimit: 1, usedCount: 0, dealerCode: "", importBatch: "IMP-2026-0706-C", status: "Unallocated", remark: "Ready for manual allocation." },
];

export const SEED_RECORDS = [
  { id: "WR-2026-0001", warrantyCode: "HH-PPF-2026-0001", vin: "XTA210990R1234567", customerName: "Alex Petrov", vehicleMake: "BMW", vehicleModel: "X5", vehicleYear: "2024", productType: "PPF", productName: "HEHE PPF APEX 190", installationCategory: "FULL_CAR_PPF", installationDate: "2026-07-10", warrantyExpiryDate: "2041-07-10", dealerCode: "RU-MSK-001", dealerName: "Moscow Auto Studio", country: "Russia", city: "Moscow", status: "Active", photos: [], reviewNote: "Approved by HQ.", pointsAwarded: 100 },
  { id: "WR-2026-0002", warrantyCode: "HH-WF-2026-0008", vin: "XTA210990R1234567", customerName: "Alex Petrov", vehicleMake: "BMW", vehicleModel: "X5", vehicleYear: "2024", productType: "WINDOW_FILM", productName: "HEHE Dual Silver Series DS 70", installationCategory: "WINDOW_FILM", installationDate: "2026-07-10", warrantyExpiryDate: "2036-07-10", dealerCode: "RU-MSK-001", dealerName: "Moscow Auto Studio", country: "Russia", city: "Moscow", status: "Active", photos: [], reviewNote: "Window film use count updated.", pointsAwarded: 100 },
  { id: "WR-2026-0003", warrantyCode: "HH-TPU-2026-0012", vin: "JTMRFREV0HJ123456", customerName: "Irina Volkova", vehicleMake: "Toyota", vehicleModel: "RAV4", vehicleYear: "2025", productType: "TPU_COLOR_PPF", productName: "TPU Color PPF Crystal Series", installationCategory: "FULL_CAR_PPF", installationDate: "2026-07-12", warrantyExpiryDate: "", dealerCode: "RU-MSK-001", dealerName: "Moscow Auto Studio", country: "Russia", city: "Moscow", status: "Pending Review", photos: [], reviewNote: "", pointsAwarded: 0 },
];

export const SEED_POINTS = [
  { id: "PT-2026-0001", dealerCode: "RU-MSK-001", dealerName: "Moscow Auto Studio", change: 100, type: "Warranty Approval", reason: "WR-2026-0001 approved", operator: "System", time: "2026-07-10 10:32" },
  { id: "PT-2026-0002", dealerCode: "RU-MSK-001", dealerName: "Moscow Auto Studio", change: 100, type: "Warranty Approval", reason: "WR-2026-0002 approved", operator: "System", time: "2026-07-10 10:36" },
  { id: "PT-2026-0003", dealerCode: "RU-MSK-001", dealerName: "Moscow Auto Studio", change: 300, type: "Manual Adjustment", reason: "Launch training participation", operator: "HQ Admin", time: "2026-07-11 15:10" },
];

export const SEED_REDEMPTIONS = [
  { id: "RD-2026-0001", dealerCode: "RU-MSK-001", dealerName: "Moscow Auto Studio", rewardId: "RW-002", rewardName: "H&H Cap", points: 160, quantity: 2, status: "Approved, Waiting for Next Shipment", remark: "Ship with next film order.", time: "2026-07-12 09:45" },
];

export const SEED_BATCHES = [
  { id: "IMP-2026-0706-A", name: "Russia first launch shipment", time: "2026-07-06 11:20", operator: "HQ Admin", totalCodes: 2, productTypes: "PPF, WINDOW_FILM", dealer: "RU-MSK-001", status: "Imported", remark: "Dealer code matched automatically." },
];

export function buildSeedBlob(version) {
  return {
    version,
    settings: SEED_SETTINGS,
    products: SEED_PRODUCTS,
    dealers: SEED_DEALERS,
    warrantyCodes: SEED_WARRANTY_CODES,
    warrantyRecords: SEED_RECORDS,
    pointsLedger: SEED_POINTS,
    rewards: SEED_REWARDS,
    redemptions: SEED_REDEMPTIONS,
    importBatches: SEED_BATCHES,
  };
}
