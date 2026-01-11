Below is a **copy/paste-ready PRD** for an LLM coding agent to build a **production-scalable MVP** using **Next.js (App Router) + Supabase (Postgres + Auth + RLS + Storage) + Stripe (Checkout + Webhooks)**.

I wrote this assuming you’ll host the Next.js app on Vercel and keep WordPress (lobodamonuments.com) as the marketing site, linking to the app on a subdomain (recommended but not required).

---

# PRD: Reserve Memorials – Licensee Portal + Territory Routing + Deposits/Merch MVP

## 0) Product Summary

Reserve Memorials is launching an AI Design Program and a franchise/license model where **licensees own ZIP territories**. The system must:

- Let **prospects design a headstone** online, then **route them to the correct licensee** by ZIP
- Let **licensees log in** and manage leads/design sessions/orders for their territory
- Let **Corporate admin** see everything (real-time oversight), manage licensees/territories, and audit actions
- Collect **deposits** and optionally sell **merchandise** (vases, urns, silk flowers)

**Tech**: Next.js App Router (Route Handlers) ([Next.js][1]) + Supabase SSR Auth ([Supabase][2]) + Postgres RLS ([Supabase][3]) + Storage access control via RLS on `storage.objects` ([Supabase][4]) + Stripe Checkout Sessions ([Stripe Docs][5]) + Stripe Webhook signature verification ([Stripe Docs][6])

---

## 1) Goals (MVP)

### 1.1 Business goals

- Launch territory-based sales workflow this month
- Centralize transactions + accountability across licensees
- Collect deposits reliably and attribute to correct licensee/territory

### 1.2 MVP success metrics (examples)

- 95%+ of new design leads successfully assigned to a territory or “unassigned” queue
- 99%+ payment events reconciled via webhooks
- Corporate can view sales by licensee + ZIP with <2 second load time for last 30 days

---

## 2) Personas & Roles

### 2.1 Personas

- **Prospect (public user)**: uses design flow, enters ZIP/contact info, pays deposit, buys merch
- **Licensee Sales User**: sees assigned leads/designs/orders; initiates checkout links; updates order status
- **Corporate Admin**: manages licensees + territories; sees all metrics; exports transactions; audit logs

### 2.2 Role model (RBAC)

Use Supabase Auth users + org membership table.
Roles:

- `corporate_admin`
- `licensee_owner`
- `licensee_sales`
- (optional later) `fulfillment`, `support`

Authorization enforced primarily by **Postgres RLS** (defense-in-depth). ([Supabase][3])

---

## 3) Scope

### 3.1 MVP In-Scope

1. Secure login portal for licensees + corporate
2. Territory routing: ZIP → licensee org assignment + fallback (unassigned queue)
3. Lead capture + design session tracking
4. Stripe deposit checkout + webhook reconciliation
5. Basic merchandise catalog + Stripe checkout for merch (simple DB-backed catalog)
6. Licensee dashboard (leads, sessions, orders)
7. Corporate dashboard (all leads/orders, filters, exports)
8. Audit logging for critical actions
9. Storage for design exports (images/PDF) using signed URLs

### 3.2 Post-MVP (Phase 2+)

- Stripe Connect automatic payouts/splits (destination charges / transfers) ([Stripe Docs][7])
- Advanced quoting/invoicing
- Automated email/SMS sequences
- Multi-factor auth enforcement for licensees (optional) ([Supabase][8])
- Realtime dashboards via Supabase Realtime (optional) ([Supabase][9])

---

## 4) User Journeys (Detailed)

### 4.1 Prospect journey (public)

1. Prospect visits `/design`
2. Enters ZIP + contact info (name, email, phone)
3. System looks up territory assignment:

   - If ZIP matched → assigned licensee org
   - If not matched → assigned to corporate “unassigned” queue

4. System creates:

   - `prospect` record
   - `design_session` record (status: `started`)

5. Prospect uses AI design tool (embedded or external)
6. On “Save/Export,” system uploads design artifacts to Supabase Storage and links them to `design_session`
7. Prospect proceeds to **Deposit Checkout**
8. Stripe Checkout completes and redirects to `/payment/success`
9. Webhook marks payment/order final status

### 4.2 Licensee journey

1. Licensee logs in at `/portal`
2. Sees:

   - “New Leads” list
   - “Design Sessions” list
   - “Orders” list

3. Opens a lead, views design, updates lead status: `contacted`, `qualified`, `won`, `lost`
4. Can generate a payment link (or trigger Checkout session) for deposit/merch if needed

### 4.3 Corporate admin journey

1. Corporate logs in at `/admin`
2. Sees global metrics:

   - deposits count, deposit revenue, merch revenue
   - by licensee, by ZIP, by date range

3. Manages territories:

   - assign ZIPs to licensees
   - set effective dates

4. Manages licensees:

   - create org + invite users

5. Views audit log

---

## 5) Information Architecture (Routes)

### 5.1 Public

- `GET /` (high-level landing page)

### 5.2 Auth

- `GET /login`
- `GET /logout`
- `GET /reset-password`

### 5.3 Licensee portal

- `GET /portal` (dashboard)
- `GET /portal/design` (ZIP + contact capture + start session)
- `GET /portal/design/session/[id]` (design flow UI)
- `GET /portal/shop` (merch listing)
- `GET /portal/payment/success?session_id=...`
- `GET /portal/payment/cancel`
- `GET /portal/leads`
- `GET /portal/leads/[id]`
- `GET /portal/sessions`
- `GET /portal/orders`

### 5.4 Corporate admin

- `GET /admin` (dashboard)
- `GET /admin/licensees`
- `GET /admin/territories`
- `GET /admin/orders`
- `GET /admin/audit`

### 5.5 API (Next.js Route Handlers)

Use Route Handlers in `/app/api/**/route.ts` ([Next.js][10])

---

## 6) Data Model (Postgres Schema)

> All tables (except public catalog tables) must include `created_at`, `updated_at`.

### 6.1 Core tables

**organizations**

- `id (uuid, pk)`
- `name (text)`
- `type (enum: corporate | licensee)`
- `status (enum: active | suspended)`
- `stripe_account_id (text, nullable)` (Phase 2 for Connect)
- `created_at`, `updated_at`

**org_members**

- `id (uuid, pk)`
- `org_id (uuid, fk organizations.id)`
- `user_id (uuid, fk auth.users.id)`
- `role (enum: corporate_admin | licensee_owner | licensee_sales)`
- `created_at`

**territories**

- `id (uuid, pk)`
- `zip (text)` (store as string to preserve leading zeros)
- `org_id (uuid, fk organizations.id)` (licensee org)
- `active_from (date)`
- `active_to (date, nullable)`
- `priority (int default 0)` (for conflict resolution if ever needed)
- Unique constraint suggestion: `(zip, active_from)` (or use exclusion constraints later)

**prospects**

- `id (uuid, pk)`
- `org_id (uuid, fk organizations.id)` (assigned org at capture time)
- `zip (text)`
- `name (text)`
- `email (text)`
- `phone (text)`
- `status (enum: new | contacted | qualified | won | lost)`
- `source (enum: design | manual | import)`
- `created_at`, `updated_at`

**design_sessions**

- `id (uuid, pk)`
- `org_id (uuid, fk organizations.id)`
- `prospect_id (uuid, fk prospects.id)`
- `status (enum: started | in_progress | exported | archived)`
- `metadata (jsonb)` (design params)
- `export_count (int default 0)`
- `created_at`, `updated_at`

**design_assets**

- `id (uuid, pk)`
- `org_id (uuid)`
- `design_session_id (uuid)`
- `bucket (text)`
- `path (text)` (storage path)
- `type (enum: image | pdf | other)`
- `created_at`

**products** (MVP merch catalog)

- `id (uuid, pk)`
- `name (text)`
- `description (text)`
- `price_cents (int)`
- `currency (text default 'usd')`
- `active (bool)`
- `image_asset_path (text nullable)`
- `created_at`, `updated_at`

**orders**

- `id (uuid, pk)`
- `org_id (uuid)` (territory/licensee attributed)
- `prospect_id (uuid, nullable)`
- `type (enum: deposit | merch)`
- `status (enum: pending | paid | cancelled | refunded | failed)`
- `total_cents (int)`
- `currency (text)`
- `stripe_checkout_session_id (text)`
- `stripe_payment_intent_id (text nullable)`
- `created_at`, `updated_at`

**order_items**

- `id (uuid, pk)`
- `order_id (uuid)`
- `product_id (uuid nullable)` (null for deposit line)
- `name (text)` (denormalize)
- `quantity (int)`
- `unit_price_cents (int)`
- `created_at`

**payments** (optional if you want separate from orders; otherwise store on orders)

- `id (uuid, pk)`
- `order_id (uuid)`
- `provider (text default 'stripe')`
- `status (text)`
- `amount_cents (int)`
- `stripe_event_id_last (text nullable)`
- `created_at`, `updated_at`

**audit_events**

- `id (uuid, pk)`
- `actor_user_id (uuid nullable)` (null for system/webhooks)
- `org_id (uuid nullable)`
- `event_type (text)` (e.g. TERRITORY_ASSIGNED, ORDER_REFUNDED)
- `entity_type (text)` (territory/order/prospect/session)
- `entity_id (uuid nullable)`
- `metadata (jsonb)`
- `created_at`

---

## 7) Security & Authorization (Must-Have)

### 7.1 Supabase Auth + SSR session handling

- Use `@supabase/ssr` for cookie-based session storage in SSR/Route Handlers. ([Supabase][2])
- Do **not** expose service role key to the client.

### 7.2 RLS (Row Level Security) rules (must implement)

RLS provides “defense in depth” and integrates with Supabase Auth. ([Supabase][3])

**Policy design principle**

- Licensee users: can only access rows where `org_id` equals their org(s)
- Corporate admins: can access all rows

**Implementation pattern**

- Create a SQL function `is_corporate_admin()` and `user_org_ids()` to simplify policies.
- Enable RLS on all private tables: prospects, design_sessions, design_assets, orders, order_items, territories (write limited), audit_events.

> Supabase’s RLS docs explicitly recommend using RLS with Auth and JWT helpers like `auth.uid()` / `auth.jwt()`. ([Supabase][3])

### 7.3 Storage access control

- Use private buckets for design assets.
- Create RLS policies on `storage.objects` to permit read/write only for the owning org users. ([Supabase][4])
- Deliver assets to UI via **signed URLs**. ([Supabase][11])

### 7.4 Optional MFA (Phase 2)

Supabase supports MFA flows (TOTP/phone). ([Supabase][8])

---

## 8) Territory Routing Requirements

### 8.1 ZIP lookup behavior

- Input: `zip` (string)
- Determine active territory:

  - `territories.zip = zip`
  - `active_from <= today`
  - `active_to is null OR active_to >= today`
  - Choose highest priority if multiple

- Output:

  - `assigned_org_id`
  - `assignment_type = matched | unassigned`

### 8.2 Immutable attribution

When a prospect is created, store the assigned `org_id` on `prospects` and `design_sessions` so that later territory edits do not change historical attribution.

---

## 9) Payments Requirements (Stripe)

### 9.1 Checkout creation (deposit + merch)

Use **Stripe Checkout Sessions API** for hosted checkout. ([Stripe Docs][12])

- Deposit checkout:

  - single line item “Design Deposit”
  - ties to `prospect_id`, `org_id`, `design_session_id` via metadata

- Merch checkout:

  - line items derived from `products` + cart quantities

### 9.2 Webhooks (reconciliation must be authoritative)

Stripe requires webhook signature verification using the raw request body + `Stripe-Signature`. ([Stripe Docs][6])

- Webhook handler updates `orders.status` and writes `audit_events`.
- Must be idempotent: store processed Stripe `event.id` and ignore repeats.

### 9.3 Where to run webhooks

Two valid patterns:

- Next.js Route Handler `/api/stripe/webhook`
- Supabase Edge Function (Supabase provides a Stripe webhooks example). ([Supabase][13])

### 9.4 Phase 2: Payouts / Splits (Stripe Connect)

If/when needed:

- Destination charges: charge customer and transfer to connected account ([Stripe Docs][7])
- Separate charges and transfers: decouple charge and transfers ([Stripe Docs][14])
- Read Stripe’s integration recommendations before implementing. ([Stripe Docs][15])

---

## 10) API Specs (Route Handlers)

Next.js Route Handlers are the standard approach in App Router. ([Next.js][1])

### 10.1 Public endpoints

**POST `/api/territory/lookup`**

- Body: `{ zip: string }`
- Response: `{ assignedOrgId: string|null, assignmentType: 'matched'|'unassigned' }`

**POST `/api/prospects`**

- Body: `{ zip, name, email, phone }`
- Server actions:

  - lookup territory
  - create prospect + design session

- Response: `{ prospectId, designSessionId, assignedOrgId }`

**POST `/api/design-sessions/[id]/export`**

- Auth: public allowed only with signed token OR authenticated licensee/corporate
- Body: export metadata + asset references
- Action: upload to storage (or accept uploaded paths), create `design_assets`, increment `export_count`

### 10.2 Payment endpoints

**POST `/api/stripe/checkout/deposit`**

- Body: `{ designSessionId }`
- Action: create Stripe Checkout Session ([Stripe Docs][5])
- Response: `{ url }`

**POST `/api/stripe/checkout/cart`**

- Body: `{ items: [{productId, qty}], prospectId? }`
- Action: validate products & totals server-side; create session
- Response: `{ url }`

**POST `/api/stripe/webhook`**

- Action:

  - read raw body
  - verify signature ([Stripe Docs][6])
  - update order/payment statuses

### 10.3 Portal endpoints (licensee/corporate)

**GET `/api/portal/leads`**

- Returns prospects scoped by RLS

**PATCH `/api/portal/leads/[id]`**

- Update status/notes (audit logged)

**GET `/api/portal/orders`**

- Returns orders scoped by RLS

**GET `/api/admin/territories`**, **POST**, **PATCH**, **DELETE**

- Corporate only (enforced by RLS + server-side checks)

---

## 11) UI Requirements (Screens)

### 11.1 Public

- **Design start page**

  - ZIP input + contact form
  - CTA: “Start Design”

- **Design session page**

  - Design tool embed/flow
  - “Save Design” / “Continue to Deposit”

- **Shop**

  - product grid + cart
  - checkout CTA

### 11.2 Portal (licensee)

- Dashboard KPIs: new leads (7d), deposits (7d), open sessions
- Leads list + filters (new/contacted/qualified)
- Lead detail: contact info, ZIP, design assets, timeline
- Orders list: deposit/merch, paid/pending/refunded

### 11.3 Admin (corporate)

- Global KPIs: deposit revenue, merch revenue, order count
- Breakdown tables by licensee + ZIP
- Territory manager: bulk ZIP assign, effective dates, search
- Licensee manager: orgs, users, status
- Audit log viewer

---

## 12) Audit Logging (Explicit Events)

Write to `audit_events` for:

- territory created/updated/deleted
- prospect created
- design exported
- checkout session created
- payment succeeded/failed/refunded (from webhook)
- role changes / invites
- manual order status changes

---

## 13) Non-Functional Requirements (Production-Scalable MVP)

### 13.1 Reliability

- Webhooks are the source of truth for payment status ([Stripe Docs][16])
- Store Stripe event IDs and enforce idempotency.

### 13.2 Security

- RLS on all sensitive tables ([Supabase][3])
- Signed URLs for private files ([Supabase][11])
- SSR cookie-based auth configuration for Supabase ([Supabase][2])

### 13.3 Performance

- Add DB indexes:

  - `territories(zip, active_from, active_to)`
  - `prospects(org_id, created_at)`
  - `orders(org_id, created_at, status)`

- Paginate lists (leads/orders)

### 13.4 Environments + migrations

Use Supabase migrations tracked in repo via Supabase CLI. ([Supabase][17])

- Envs: local, staging, production
- No schema changes directly in prod without migration

---

## 14) Step-by-Step Build Plan (for the LLM coding agent)

### Step 1 — Repo & baseline

1. Create Next.js (App Router) TypeScript project
2. Add UI library (Tailwind + shadcn/ui recommended)
3. Add `@supabase/supabase-js` + `@supabase/ssr` and implement SSR client per Supabase docs ([Supabase][2])
4. Create environment variables:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
   - Stripe keys: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

### Step 2 — Supabase schema + RLS (core scalability)

1. Use Supabase CLI and create initial migration file ([Supabase][17])
2. Create tables in Section 6
3. Enable RLS on all private tables ([Supabase][3])
4. Implement RLS helper functions + policies:

   - corporate admin bypass
   - org-scoped access

5. Seed corporate org + first corporate admin mapping

### Step 3 — Auth pages

1. Implement `/login`, `/reset-password`, `/logout`
2. Implement role-based routing:

   - corporate → `/admin`
   - licensee → `/portal`

### Step 4 — Territory routing + lead capture

1. Build `/design` page with ZIP + contact form
2. Implement `/api/territory/lookup` and `/api/prospects`
3. Create `design_session` upon lead creation

### Step 5 — Design session UI + Storage

1. Build `/design/session/[id]`
2. Create private storage bucket: `design-exports`
3. Apply Storage RLS policies on `storage.objects` ([Supabase][4])
4. Implement upload + signed URL retrieval ([Supabase][11])

### Step 6 — Stripe Checkout (deposit + merch)

1. Implement deposit product config and create Checkout Session endpoint ([Stripe Docs][5])
2. Implement merch catalog + cart + checkout endpoint
3. Create `orders` rows as `pending` before redirecting to Stripe

### Step 7 — Stripe webhooks (payments become “real” here)

1. Implement `/api/stripe/webhook`
2. Verify signatures using raw body and `Stripe-Signature` ([Stripe Docs][6])
3. Update `orders.status` based on events
4. Log webhook-driven actions to `audit_events`

### Step 8 — Portals

**Licensee portal**

- leads list/detail (RLS ensures scoping)
- orders list
- design session list and asset viewing via signed URLs

**Corporate admin**

- territory CRUD
- licensee CRUD/invites
- global reporting filters and CSV export

### Step 9 — Hardening checklist (still MVP, but production-ready)

- Add indexes + pagination
- Add idempotency for webhook events
- Add basic rate limiting on public endpoints
- Add error logging + alerting hooks
- Add staging environment with migrations

---

## 15) Acceptance Criteria (MVP must pass)

1. Licensee can only see their own org data (validated by RLS tests) ([Supabase][3])
2. Corporate admin can view all org data
3. ZIP routing correctly assigns org_id or unassigned queue
4. Deposit checkout creates `order` → webhook marks it paid (authoritative) ([Stripe Docs][16])
5. Design exports stored privately and viewed via signed URLs only ([Supabase][4])
6. Territory edits are audit logged
7. All schema changes are migrations via Supabase CLI ([Supabase][17])

---

## 16) Out of Scope (explicit)

- Fully automated franchise royalty calculations
- Shipping/fulfillment workflows
- Complex product inventory management
- Full CRM features (email sequences, dialer, etc.)

---

If you want, I can also generate a **“single super-prompt”** for your LLM coding app that includes:

- exact folder structure
- exact migrations as SQL files
- RLS policy templates per table
- exact API contract types (TypeScript interfaces)
- page/component checklist

Say what LLM coding tool you’re using (Cursor, Lovable, v0, Replit AI, etc.) and whether you prefer **Stripe webhooks in Next.js** or **Supabase Edge Functions** (both are valid; Supabase provides a Stripe webhook Edge Function example). ([Supabase][13])

[1]: https://nextjs.org/docs/app/getting-started/route-handlers?utm_source=chatgpt.com "Getting Started: Route Handlers"
[2]: https://supabase.com/docs/guides/auth/server-side/creating-a-client?utm_source=chatgpt.com "Creating a Supabase client for SSR"
[3]: https://supabase.com/docs/guides/database/postgres/row-level-security?utm_source=chatgpt.com "Row Level Security | Supabase Docs"
[4]: https://supabase.com/docs/guides/storage/security/access-control?utm_source=chatgpt.com "Storage Access Control | Supabase Docs"
[5]: https://docs.stripe.com/api/checkout/sessions/create?utm_source=chatgpt.com "Create a Checkout Session | Stripe API Reference"
[6]: https://docs.stripe.com/webhooks/signature?utm_source=chatgpt.com "Resolve webhook signature verification errors"
[7]: https://docs.stripe.com/connect/destination-charges?utm_source=chatgpt.com "Create destination charges"
[8]: https://supabase.com/docs/guides/auth/auth-mfa?utm_source=chatgpt.com "Multi-Factor Authentication | Supabase Docs"
[9]: https://supabase.com/docs/guides/realtime/authorization?utm_source=chatgpt.com "Realtime Authorization | Supabase Docs"
[10]: https://nextjs.org/docs/app/api-reference/file-conventions/route?utm_source=chatgpt.com "File-system conventions: route.js"
[11]: https://supabase.com/docs/reference/javascript/storage-from-createsignedurl?utm_source=chatgpt.com "JavaScript: Create a signed URL"
[12]: https://docs.stripe.com/payments/checkout/how-checkout-works?utm_source=chatgpt.com "How Checkout works"
[13]: https://supabase.com/docs/guides/functions/examples/stripe-webhooks?utm_source=chatgpt.com "Handling Stripe Webhooks | Supabase Docs"
[14]: https://docs.stripe.com/connect/separate-charges-and-transfers?utm_source=chatgpt.com "Create separate charges and transfers"
[15]: https://docs.stripe.com/connect/integration-recommendations?utm_source=chatgpt.com "Recommended Connect integrations and charge types"
[16]: https://docs.stripe.com/webhooks?utm_source=chatgpt.com "Receive Stripe events in your webhook endpoint"
[17]: https://supabase.com/docs/guides/deployment/database-migrations?utm_source=chatgpt.com "Database Migrations | Supabase Docs"
