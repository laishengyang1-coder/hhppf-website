# H&H Warranty & Partner Points System V1

This document turns the current static portal preview into a production-ready Cloudflare implementation plan for `warranty.hhppf.com`.

## 1. Recommended Project Structure

```text
hhppf-website/
  index.html
  index-zh.html
  warranty/
    index.html              # Current static interactive V1 preview
    styles.css
    app.js
  docs/
    warranty-system-design.md

future warranty app/
  apps/web/                 # Cloudflare Pages frontend
  apps/api/                 # Cloudflare Workers API
  packages/shared/          # enums, validation schemas, i18n labels
  migrations/               # Cloudflare D1 schema migrations
  worker.toml
```

Current repository is a static website. The implemented `warranty/` directory is a front-end prototype with local browser storage. Production should replace local storage actions with Workers API calls.

## 2. Database Tables

Core tables for Cloudflare D1:

```sql
users (
  id, email, password_hash, role, dealer_id, status,
  created_at, updated_at
)

dealers (
  id, dealer_code, name, country, city, level,
  parent_dealer_id, status, points_balance,
  created_at, updated_at
)

products (
  id, product_type, product_name, default_warranty_years,
  usage_type, default_usage_limit, status, remark,
  created_at, updated_at
)

warranty_codes (
  id, warranty_code, factory_roll_no, batch_no, shipment_no,
  product_id, warranty_years, usage_type, usage_limit,
  used_count, dealer_id, import_batch_id, status, remark,
  created_at, updated_at
)

warranty_records (
  id, warranty_code_id, dealer_id, vin, customer_name,
  vehicle_make, vehicle_model, vehicle_year,
  installation_category, installation_date, warranty_expiry_date,
  status, review_note, reviewed_by, reviewed_at,
  certificate_pdf_key, created_at, updated_at
)

warranty_record_images (
  id, warranty_record_id, r2_key, public_url,
  sort_order, created_at
)

import_batches (
  id, import_batch_name, operator_id, total_codes,
  product_types, dealer_id, status, error_report_json,
  remark, created_at
)

points_ledger (
  id, dealer_id, points_change, type, reason,
  related_record_id, operator_id, expiration_date,
  created_at
)

rewards (
  id, category, name, points_required,
  stock_status, internal_stock_quantity, status,
  remark, created_at, updated_at
)

redemptions (
  id, dealer_id, reward_id, quantity, points_frozen,
  status, review_note, reviewed_by, shipped_with_order_no,
  created_at, updated_at
)
```

Enums should live in shared code:

- `role`: `ADMIN`, `DEALER`
- `product_type`: `PPF`, `WINDOW_FILM`, `TPU_COLOR_PPF`, `MANUAL_PARTIAL`, `ARCHITECTURAL_FILM`
- `usage_type`: `SINGLE`, `MULTI`
- `warranty_code_status`: `UNALLOCATED`, `ALLOCATED`, `PENDING_REVIEW`, `ACTIVE`, `REJECTED`, `VOIDED`, `EXHAUSTED`
- `warranty_record_status`: `PENDING_REVIEW`, `ACTIVE`, `REJECTED`
- `redemption_status`: `PENDING_REVIEW`, `APPROVED_WAITING_SHIPMENT`, `REJECTED`, `SHIPPED_WITH_ORDER`
- `reward_stock_status`: `AVAILABLE`, `OUT_OF_STOCK`, `COMING_SOON`

## 3. Page Routes

Public:

- `/` - Warranty home
- `/verify` - Owner VIN query
- `/terms` - Full warranty terms

Dealer:

- `/dealer/login`
- `/dealer/dashboard`
- `/dealer/register-warranty`
- `/dealer/warranty-records`
- `/dealer/points`
- `/dealer/rewards`

Admin:

- `/admin/login`
- `/admin/dashboard`
- `/admin/products`
- `/admin/dealers`
- `/admin/warranty-codes`
- `/admin/import`
- `/admin/allocation`
- `/admin/reviews`
- `/admin/points`
- `/admin/rewards`
- `/admin/redemptions`
- `/admin/export`

## 4. API Design

Authentication:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Public:

- `GET /api/public/warranties?vin=...`
- `GET /api/public/warranties/:id`
- `GET /api/public/warranties/:id/pdf`

Dealer:

- `GET /api/dealer/dashboard`
- `GET /api/dealer/warranty-codes?status=allocated`
- `POST /api/dealer/warranty-records`
- `GET /api/dealer/warranty-records`
- `GET /api/dealer/points`
- `GET /api/dealer/rewards`
- `POST /api/dealer/redemptions`

Admin:

- `GET /api/admin/dashboard`
- `CRUD /api/admin/products`
- `CRUD /api/admin/dealers`
- `GET /api/admin/warranty-codes`
- `POST /api/admin/warranty-codes`
- `POST /api/admin/imports`
- `GET /api/admin/imports`
- `POST /api/admin/allocations`
- `GET /api/admin/reviews`
- `POST /api/admin/reviews/:id/approve`
- `POST /api/admin/reviews/:id/reject`
- `GET /api/admin/points`
- `POST /api/admin/points/manual-adjustment`
- `CRUD /api/admin/rewards`
- `GET /api/admin/redemptions`
- `POST /api/admin/redemptions/:id/approve`
- `POST /api/admin/redemptions/:id/reject`
- `POST /api/admin/redemptions/:id/ship`
- `GET /api/admin/export/warranty-records`
- `GET /api/admin/export/points`
- `GET /api/admin/export/redemptions`

File handling:

- `POST /api/uploads/image-url` returns a signed R2 upload URL.
- `POST /api/uploads/complete` stores image metadata after upload.
- PDF certificates should be generated after admin approval and stored in R2.

## 5. Permission Design

Admin:

- Full access to products, dealers, warranty codes, imports, allocations, reviews, points, rewards, redemptions, and exports.
- V1 does not split admin permissions.

Dealer:

- Can only see warranty codes allocated to its own dealer account.
- Can only see and edit warranty records submitted by itself before review.
- Can see its own points ledger and redemption history.
- Can create redemption requests but cannot approve or ship them.

Reserved V2 hierarchy:

- HQ admin
- Country partner / major dealer
- Regional store / sub-dealer

For V2, parent dealers may view child dealer statistics, but VIN, owner name, email, and phone fields should be masked by default.

## 6. Development Task Split

Phase 1 - Current preview:

- Add main website Warranty entry.
- Build static warranty portal preview.
- Demonstrate VIN query, dealer registration, admin review, points, rewards, and CSV export.

Phase 2 - Production foundation:

- Create Cloudflare Pages project for `warranty.hhppf.com`.
- Create Workers API project.
- Add D1 migrations and shared enums.
- Add login sessions and password hashing.
- Replace local storage with API calls.

Phase 3 - Core business workflows:

- Product management.
- Dealer management.
- Excel import with full-file validation and error report.
- Warranty code allocation.
- Dealer registration with R2 image upload.
- Admin review with automatic expiry, points, and PDF generation.
- Owner VIN query and certificate PDF download.

Phase 4 - Rewards and exports:

- Rewards inventory management.
- Redemption review, approval, rejection, and shipped status.
- Points freezing and deduction.
- Excel exports for warranty records, points ledger, and redemptions.

## 7. Cloudflare Deployment

Recommended setup:

- `hhppf.com`: existing brand website.
- `warranty.hhppf.com`: Cloudflare Pages project for the warranty app.
- `api.warranty.hhppf.com` or `/api/*`: Cloudflare Workers API route.
- `D1`: relational business data.
- `R2`: uploaded installation photos and generated PDF certificates.

Environment bindings:

```toml
[[d1_databases]]
binding = "DB"
database_name = "hh-warranty"
database_id = "..."

[[r2_buckets]]
binding = "WARRANTY_FILES"
bucket_name = "hh-warranty-files"

[vars]
DEFAULT_LANGUAGE = "en"
DEFAULT_WARRANTY_POINTS = "100"
PUBLIC_VERIFY_BASE_URL = "https://warranty.hhppf.com/verify"
```

Production notes:

- Images and PDFs must not be stored in D1.
- Import should be transactional: any row-level error blocks the whole file.
- PDF should include full VIN; web certificate should mask VIN.
- English should be the default UI language, with Chinese and Russian supported through label dictionaries.
- Email notifications are intentionally out of V1 and can be added in V2.
