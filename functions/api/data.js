import { json, readBody } from "./_lib.js";

function computePublicStats(raw) {
  const records = raw.warrantyRecords || [];
  const dealers = raw.dealers || [];
  const settings = raw.settings || {};

  const historicalWarrantyBaseline =
    typeof settings.historicalWarrantyBaseline === "number"
      ? settings.historicalWarrantyBaseline
      : 7654;
  const historicalVehicleBaseline =
    typeof settings.historicalVehicleBaseline === "number"
      ? settings.historicalVehicleBaseline
      : 4567;
  const historicalDealerBaseline =
    typeof settings.historicalDealerBaseline === "number"
      ? settings.historicalDealerBaseline
      : 234;

  const activeRecords = records.filter((r) => r.status === "Active");
  const vinSet = new Set(
    activeRecords.map((r) => String(r.vin || "").toUpperCase().trim()).filter(Boolean),
  );
  const activeDealers = dealers.filter((d) => d.status === "Active");
  const countrySet = new Set(
    activeDealers.map((d) => String(d.country || "").trim().toLowerCase()).filter(Boolean),
  );

  return {
    displayWarrantyTotal: historicalWarrantyBaseline + activeRecords.length,
    displayVehicleTotal: historicalVehicleBaseline + vinSet.size,
    displayDealerTotal: historicalDealerBaseline + activeDealers.length,
    coveredCountryCount: countrySet.size,
  };
}

function scopeForPublic(raw) {
  return {
    version: raw.version || 4,
    settings: raw.settings || {},
    publicStats: computePublicStats(raw),
    products: (raw.products || []).filter((p) => p.status === "Active"),
    dealers: [],
    warrantyCodes: [],
    warrantyRecords: [],
    pointsLedger: [],
    rewards: raw.rewards || [],
    redemptions: [],
    importBatches: [],
  };
}

function scopeForDealer(raw, dealerCode) {
  const code = String(dealerCode || "");
  const allowedDealers = (raw.dealers || []).filter(
    (d) => d.code === code || d.parentCode === code,
  );
  return {
    version: raw.version || 4,
    settings: raw.settings || {},
    publicStats: computePublicStats(raw),
    products: raw.products || [],
    dealers: allowedDealers,
    warrantyCodes: (raw.warrantyCodes || []).filter((c) => c.dealerCode === code),
    warrantyRecords: (raw.warrantyRecords || []).filter((r) => r.dealerCode === code),
    pointsLedger: (raw.pointsLedger || []).filter((p) => p.dealerCode === code),
    rewards: raw.rewards || [],
    redemptions: (raw.redemptions || []).filter((r) => r.dealerCode === code),
    importBatches: [],
  };
}

// GET /api/data — role-scoped dataset (prevents PII/VIN/warranty-code leakage)
export async function onRequestGet(context) {
  const { env } = context;
  const user = context.data && context.data.user;
  const row = await env.DB.prepare("SELECT value FROM app_data WHERE key = ?").bind("main").first();
  if (!row || !row.value) {
    return json({ ok: true, data: null });
  }
  try {
    const fullData = JSON.parse(row.value);
    if (user && user.role === "admin") {
      return json({ ok: true, role: "admin", data: { ...fullData, publicStats: computePublicStats(fullData) } });
    }
    if (user && user.role === "dealer" && user.dealerCode) {
      return json({ ok: true, role: "dealer", data: scopeForDealer(fullData, user.dealerCode) });
    }
    return json({ ok: true, role: "public", data: scopeForPublic(fullData) });
  } catch (_) {
    return json({ ok: false, error: "data_corrupt" }, 500);
  }
}

// PUT /api/data — admin full save, or strictly validated dealer-scoped submission
export async function onRequestPut(context) {
  const { env, request } = context;
  const user = context.data && context.data.user;
  if (!user) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }

  const body = await readBody(request);
  const payload = body.data;
  if (!payload || typeof payload !== "object") {
    return json({ ok: false, error: "invalid_payload" }, 400);
  }

  if (user.role === "admin") {
    const toSave = { ...payload };
    delete toSave.publicStats;
    await env.DB
      .prepare(
        "INSERT INTO app_data (key, value, updated_at) VALUES ('main', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
      )
      .bind(JSON.stringify(toSave))
      .run();
    return json({ ok: true });
  }

  if (user.role === "dealer" && user.dealerCode) {
    const existingRow = await env.DB.prepare("SELECT value FROM app_data WHERE key = 'main'").first();
    if (!existingRow || !existingRow.value) {
      return json({ ok: false, error: "not_initialized" }, 400);
    }
    const serverBlob = JSON.parse(existingRow.value);
    const dCode = user.dealerCode;

    // 1. Only allow adding or updating Pending Review warranty records belonging to this dealer
    const serverRecords = serverBlob.warrantyRecords || [];
    const existingIds = new Set(serverRecords.map((r) => r.id));
    const incomingDealerRecords = Array.isArray(payload.warrantyRecords)
      ? payload.warrantyRecords.filter((r) => r && r.dealerCode === dCode)
      : [];

    for (const inc of incomingDealerRecords) {
      if (!existingIds.has(inc.id)) {
        serverRecords.unshift({
          ...inc,
          dealerCode: dCode,
          status: "Pending Review",
          pointsAwarded: 0,
        });
      } else {
        const idx = serverRecords.findIndex((r) => r.id === inc.id && r.dealerCode === dCode);
        if (idx > -1 && serverRecords[idx].status === "Pending Review") {
          serverRecords[idx] = {
            ...serverRecords[idx],
            vin: inc.vin,
            customerName: inc.customerName,
            vehicleMake: inc.vehicleMake,
            vehicleModel: inc.vehicleModel,
            vehicleYear: inc.vehicleYear,
            installationCategory: inc.installationCategory,
            installationDate: inc.installationDate,
            photos: inc.photos,
          };
        }
      }
    }
    serverBlob.warrantyRecords = serverRecords;

    // 2. Sync usage count/status only on warranty codes owned by this dealer
    if (Array.isArray(payload.warrantyCodes)) {
      const incomingCodeMap = new Map(
        payload.warrantyCodes.filter((c) => c && c.dealerCode === dCode).map((c) => [c.code, c]),
      );
      serverBlob.warrantyCodes = (serverBlob.warrantyCodes || []).map((sc) => {
        if (sc.dealerCode !== dCode || !incomingCodeMap.has(sc.code)) return sc;
        const inc = incomingCodeMap.get(sc.code);
        const safeStatuses = ["Allocated", "Pending Review", "Exhausted", "Active"];
        return {
          ...sc,
          usedCount: Math.max(sc.usedCount || 0, Number(inc.usedCount) || 0),
          status: safeStatuses.includes(inc.status) ? inc.status : sc.status,
        };
      });
    }

    // 3. Allow new Pending Review redemption requests if dealer has enough points
    const dealerIdx = (serverBlob.dealers || []).findIndex((d) => d.code === dCode);
    if (dealerIdx > -1 && Array.isArray(payload.redemptions)) {
      const serverRedemptions = serverBlob.redemptions || [];
      const existingRedIds = new Set(serverRedemptions.map((r) => r.id));
      for (const incRed of payload.redemptions) {
        if (incRed && incRed.dealerCode === dCode && !existingRedIds.has(incRed.id)) {
          const reward = (serverBlob.rewards || []).find((rw) => rw.id === incRed.rewardId);
          const qty = Math.max(1, parseInt(incRed.quantity, 10) || 1);
          const cost = reward ? Number(reward.points) * qty : 0;
          if (reward && cost > 0 && serverBlob.dealers[dealerIdx].points >= cost) {
            serverBlob.dealers[dealerIdx].points -= cost;
            serverRedemptions.unshift({
              ...incRed,
              dealerCode: dCode,
              points: reward.points,
              quantity: qty,
              status: "Pending Review",
            });
            serverBlob.pointsLedger = serverBlob.pointsLedger || [];
            serverBlob.pointsLedger.unshift({
              id: `PT-${Date.now()}`,
              dealerCode: dCode,
              dealerName: serverBlob.dealers[dealerIdx].name,
              change: -cost,
              type: "Reward Redemption",
              reason: `${reward.name} x${qty}`,
              operator: user.username,
              time: new Date().toISOString().replace("T", " ").slice(0, 16),
            });
          }
        }
      }
      serverBlob.redemptions = serverRedemptions;
    }

    await env.DB
      .prepare(
        "INSERT INTO app_data (key, value, updated_at) VALUES ('main', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
      )
      .bind(JSON.stringify(serverBlob))
      .run();
    return json({ ok: true });
  }

  return json({ ok: false, error: "forbidden" }, 403);
}
