-- H&H Warranty System — D1 schema
-- Database: hhppf-warranty

-- ── Users (HQ admin + dealer accounts, server-side auth) ──
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role TEXT NOT NULL,              -- 'admin' | 'dealer'
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,     -- SHA-256(app_salt + password)
  dealer_code TEXT,                -- links dealer users to dealers.code
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Settings (key/value) ──
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- ── Products ──
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  external_model TEXT,
  warranty_years INTEGER NOT NULL DEFAULT 5,
  usage_type TEXT NOT NULL DEFAULT 'Single',
  default_usage_limit INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'Active',
  remark TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ── Dealers ──
CREATE TABLE IF NOT EXISTS dealers (
  code TEXT PRIMARY KEY,
  username TEXT,
  name TEXT NOT NULL,
  country TEXT,
  city TEXT,
  level TEXT,
  status TEXT NOT NULL DEFAULT 'Active',
  points INTEGER NOT NULL DEFAULT 0,
  parent_code TEXT
);

-- ── Warranty Codes ──
CREATE TABLE IF NOT EXISTS warranty_codes (
  code TEXT PRIMARY KEY,
  factory_roll_no TEXT,
  batch_no TEXT,
  shipment_no TEXT,
  product_type TEXT,
  product_name TEXT,
  warranty_years INTEGER,
  usage_type TEXT,
  usage_limit INTEGER,
  used_count INTEGER NOT NULL DEFAULT 0,
  dealer_code TEXT,
  import_batch TEXT,
  status TEXT NOT NULL DEFAULT 'Unallocated',
  remark TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Warranty Records ──
CREATE TABLE IF NOT EXISTS warranty_records (
  id TEXT PRIMARY KEY,
  warranty_code TEXT,
  vin TEXT,
  customer_name TEXT,
  vehicle_make TEXT,
  vehicle_model TEXT,
  vehicle_year TEXT,
  product_type TEXT,
  product_name TEXT,
  installation_category TEXT,
  installation_date TEXT,
  warranty_expiry_date TEXT,
  dealer_code TEXT,
  dealer_name TEXT,
  country TEXT,
  city TEXT,
  status TEXT NOT NULL DEFAULT 'Pending Review',
  photos TEXT,                     -- JSON array of URLs/filenames
  review_note TEXT,
  points_awarded INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Points Ledger ──
CREATE TABLE IF NOT EXISTS points_ledger (
  id TEXT PRIMARY KEY,
  dealer_code TEXT,
  dealer_name TEXT,
  change INTEGER NOT NULL DEFAULT 0,
  type TEXT,
  reason TEXT,
  operator TEXT,
  time TEXT
);

-- ── Rewards ──
CREATE TABLE IF NOT EXISTS rewards (
  id TEXT PRIMARY KEY,
  category TEXT,
  name TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Available for Redemption',
  stock_status TEXT
);

-- ── Redemptions ──
CREATE TABLE IF NOT EXISTS redemptions (
  id TEXT PRIMARY KEY,
  dealer_code TEXT,
  dealer_name TEXT,
  reward_id TEXT,
  reward_name TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 1,
  status TEXT,
  remark TEXT,
  time TEXT
);

-- ── Import Batches ──
CREATE TABLE IF NOT EXISTS import_batches (
  id TEXT PRIMARY KEY,
  name TEXT,
  time TEXT,
  operator TEXT,
  total_codes INTEGER NOT NULL DEFAULT 0,
  product_types TEXT,
  dealer TEXT,
  status TEXT,
  remark TEXT
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_wc_dealer ON warranty_codes(dealer_code);
CREATE INDEX IF NOT EXISTS idx_wc_status ON warranty_codes(status);
CREATE INDEX IF NOT EXISTS idx_wr_dealer ON warranty_records(dealer_code);
CREATE INDEX IF NOT EXISTS idx_wr_status ON warranty_records(status);
CREATE INDEX IF NOT EXISTS idx_wr_code ON warranty_records(warranty_code);
CREATE INDEX IF NOT EXISTS idx_pl_dealer ON points_ledger(dealer_code);
