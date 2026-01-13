# PRD v4 (Final): ReserveMemorials.com Rebuild + Headless WordPress Blog + Portal (No-Break)

**Last updated:** 2026-01-12
**Frontends:** Next.js App Router (Next.js 16+)
**Portal stack:** Next.js + Supabase (Postgres/RLS/Auth/Storage) + Stripe (Checkout/Webhooks)
**Headless blog CMS:** WordPress at `https://anandi14.sg-host.com/` (content authoring only)

---

## 1) Product Summary

You are relaunching the existing **lobodamonuments.com** marketing site as **reservememorials.com** (Next.js front-end), while keeping the existing **licensee/corporate portal app**

- **Marketing + Blog:** `https://reservememorials.com`
- **Portal App (existing):** `https://portal.reservememorials.com`
- **WordPress CMS (headless):** `https://anandi14.sg-host.com`

The system must:

1. Serve a fast, SEO-safe marketing experience on `reservememorials.com`
2. Render blog posts on `reservememorials.com/blog/*` from the headless WordPress install
3. Keep the portal’s existing routes, DB schema, RLS, and Stripe flows **unchanged** (additive enhancements only)
4. Route marketing **contact submissions into Supabase `prospects`** (using portal API + territory routing)

---

## 2) No-Break Compatibility Contract (Portal)

### 2.1 Non-negotiable invariants

1. **Portal remains a separate Next.js deployment** with the same App Router approach and Route Handlers for APIs. ([Next.js][1])
2. **Stripe webhook remains authoritative** and must verify signature using the **raw request body** + `Stripe-Signature` header (no JSON parsing before verification). ([Stripe Docs][2])
3. **Supabase RLS is the primary authorization layer**, using helper functions (e.g., `auth.uid()`, security definer functions) to enforce org scoping and corporate bypass. ([Supabase][3])
4. Schema changes are **additive only** (new columns/tables/indexes/policies). No renames/drops that could break existing code.

---

## 3) Architecture

### 3.1 Apps

**A) Marketing App (reservememorials.com)**

- Next.js App Router site for: Home, Services, service detail pages, Gallery, Contact, About, FAQs
- Blog pages rendered from WP: `/blog`, `/blog/[slug]`
- Calls **Portal API** to create prospects from contact submissions (no Supabase service role key in marketing).

**B) Portal App (portal.reservememorials.com)**

- Existing Next.js app (App Router)
- Auth + licensee portal + corporate admin
- Public design + shop + payment routes (see §5)
- Stripe checkout + webhooks
- Supabase Auth + RLS + Storage

**C) WordPress (anandi14.sg-host.com)**

- Headless content only (posts/categories/tags/media)
- REST API for querying..we will implement GRAPHGQL down the line

### 3.2 Caching + content freshness

- Use Next.js caching + **on-demand revalidation** for blog updates (publish → webhook → `revalidatePath`/`revalidateTag`). ([Next.js][6])

---

## 4) Domain Migration & SEO Requirements

### 4.3 Indexing control

- WordPress CMS domain must be **noindex** (or otherwise blocked from indexing) to prevent duplicate content vs `reservememorials.com/blog/*`.

---

## 5) Portal App (Existing) — Route Map Alignment (from `/app` screenshot)

Your portal repo already contains these top-level route groups:

**Top-level route folders present:**

- `app/admin`
- `app/api`
- `app/auth`
- `app/design`
- `app/login`
- `app/logout`
- `app/payment`
- `app/portal`
- `app/reset-password`
- `app/shop`

### 5.1 Canonical portal routes (do not rename)

**Public / prospect-facing**

- `GET /design` (start design)
- `GET /design/session/[id]` (continue session)
- `GET /shop`
- `GET /payment/success`
- `GET /payment/cancel`

**Auth**

- `GET /login`
- `GET /logout`
- `GET /reset-password`
- `GET /auth/*` (callbacks / auth utilities)

**Licensee portal**

- `GET /portal` (dashboard)
- `GET /portal/leads`
- `GET /portal/leads/[id]`
- `GET /portal/sessions`
- `GET /portal/orders`

**Corporate admin**

- `GET /admin`
- `GET /admin/licensees`
- `GET /admin/territories`
- `GET /admin/orders`
- `GET /admin/audit`

**API (Route Handlers)**

- `app/api/**/route.ts` using supported HTTP methods. ([Next.js][10])

### 5.2 Access control rule (critical)

Do **not** assume everything under `/portal/*` is public or private:

- `/portal/*` should generally require auth
- `/design/*`, `/shop/*`, `/payment/*` must remain accessible per your current app behavior

---

## 6) Marketing Site (reservememorials.com) — Page Inventory & Features

### 6.1 Pages to include (rebuild parity)

Rebuild and relaunch these (ported from Loboda IA, rebranded to Reserve Memorials):

- `/` (Home)
- `/services/`
- `/columbariums/`
- `/traditional-headstones/`
- `/veteran-memorials/`
- `/dove-release/`
- `/design-consultation/`
- `/statues/`
- `/grief-coaching/`
- `/gallery/`
- `/contact-us/`
- `/about-us/` (fix previously broken)
- `/faqs/` (fix previously broken)
- `/blog/` (headless WP)
- `/blog/[slug]/` (headless WP)

### 6.2 Global components

- Header nav + primary CTA: **Start Your Design** → `https://portal.reservememorials.com/design`
- Sticky CTA (optional) on services pages
- Footer: NAP, phone/email, service areas, business hours (content provided by you)

### 6.3 Media handling

Use `next/image` everywhere for performance, and configure `remotePatterns` for:

- WordPress media domain (`anandi14.sg-host.com`)
- Any CDN domains you use
  Next Image + `remotePatterns` docs: ([Next.js][11])

---

## 7) Headless Blog (WordPress → Next.js)

### 7.1 CMS requirements (WordPress)

- Authors create posts, categories, tags, set featured image
- Recommended plugin: **WPGraphQL** for typed content queries. ([WPGraphQL][4])
  Fallback: WordPress REST API posts endpoint. ([WordPress Developer Resources][5])

### 7.2 Next.js blog rendering (marketing app)

Routes:

- `/blog` (paginated list; category filters optional)
- `/blog/[slug]` (post detail)
- Optional: `/blog/category/[slug]`

### 7.3 Publish → revalidate workflow (must-have)

- WP triggers a webhook to marketing site: `POST https://reservememorials.com/api/revalidate`
- Marketing validates secret token and runs:

  - `revalidatePath('/blog')` and `revalidatePath('/blog/<slug>')` ([Next.js][6])
  - OR tag-based `revalidateTag('wp-posts')` ([Next.js][12])

---

## 8) Marketing Contact → Supabase Prospects (Confirmed)

### 8.1 UX requirements (marketing contact form)

Route: `reservememorials.com/contact-us`

Fields:

- Required: `zip`, `name`, `email`, `phone`, `message`
- Optional: `preferred_contact_method`, `preferred_time`

### 8.2 Data requirements (must match DB)

Your `public.prospects` table currently includes:

- `org_id (required)`, `zip`, `name`, `email`, `phone`, `status`, `source`, timestamps
  …and your enum includes `prospect_source: 'design' | 'manual' | 'import'`.

**Therefore:**

- Marketing submissions must set `source = 'manual'` (do not add new enum values unless you update code + validations).

### 8.3 Integration approach (no service role key in marketing)

Marketing app should call the portal API (server-to-server) to create prospects:

- `POST https://portal.reservememorials.com/api/prospects`

Portal API responsibilities:

1. territory lookup (`territories` table; active dates; priority)
2. create `prospects` row (immutable org attribution)
3. optionally create `design_sessions` if the marketing CTA was “Start Design”

### 8.4 Store the contact “message”

**Additive schema change required (recommended):**

- Add `message text null` to `public.prospects` (so marketing inquiries are visible in the portal UI)
- Keep it nullable to avoid breaking existing writes

---

## 9) Portal APIs (Route Handlers)

Route Handlers must be in `app/api/**/route.ts`. ([Next.js][10])

### 9.1 Prospect + territory APIs

**POST `/api/territory/lookup`**

- Body: `{ zip: string }`
- Response: `{ assignedOrgId: string|null, assignmentType: 'matched'|'unassigned' }`

**POST `/api/prospects`**

- Body: `{ zip, name, email, phone, source?: 'design'|'manual'|'import', message?: string }`
- Action:

  - lookup territory
  - create `prospects` record
  - if request indicates design flow: create `design_sessions` (status `started`)

- Response: `{ prospectId, assignedOrgId, designSessionId? }`

### 9.2 Design assets

**POST `/api/design-sessions/[id]/export`**

- Auth: licensee/corporate OR public with signed token (if implemented)
- Action:

  - upload files to Supabase Storage bucket `design-exports`
  - insert `design_assets`
  - increment `design_sessions.export_count`

### 9.3 Stripe checkout + webhooks

**POST `/api/stripe/checkout/deposit`**
**POST `/api/stripe/checkout/cart`**
**POST `/api/stripe/webhook`**

- Webhook must verify signature using raw body and Stripe library guidance. ([Stripe Docs][2])
- Idempotency via `public.stripe_events (event_id primary key)`.

---

## 10) Supabase Data Model (as implemented by your migrations)

### 10.1 Enums (as created)

- `org_type`: corporate | licensee
- `org_status`: active | suspended
- `member_role`: corporate_admin | licensee_owner | licensee_sales
- `prospect_status`: new | contacted | qualified | won | lost
- `prospect_source`: design | manual | import
- `design_session_status`: started | in_progress | exported | archived
- `design_asset_type`: image | pdf | other
- `order_type`: deposit | merch
- `order_status`: pending | paid | cancelled | refunded | failed

### 10.2 Tables (core)

- `organizations`
- `org_members` (**unique(org_id, user_id)**)
- `territories`
- `prospects`
- `design_sessions`
- `design_assets`
- `products`
- `orders`
- `order_items`
- `audit_events`
- `stripe_events` (webhook idempotency)

### 10.3 Seed data management

Your migrations add `seed_tag` columns + indexes to allow flushing demo data safely before production.

---

## 11) Security & Authorization

### 11.1 Supabase SSR auth

Use cookie-based SSR via `@supabase/ssr` as the supported approach. ([Supabase][13])

### 11.2 RLS design

- Licensee users see only rows where `org_id` ∈ `user_org_ids()`
- Corporate admins can see all rows
  Supabase guidance supports policies using `auth.uid()` / `auth.jwt()` and security definer helpers. ([Supabase][3])

### 11.3 Storage access control

Design exports must be in private bucket `design-exports`, with access controlled via RLS policies on `storage.objects`. ([Supabase][14])

---

## 12) Non-Functional Requirements

### 12.1 Performance

- Paginate portal lists (leads/orders/sessions)
- Add indexes (if not already):

  - `territories(zip, active_from, active_to)`
  - `prospects(org_id, created_at)`
  - `orders(org_id, created_at, status)`

### 12.2 Reliability

- Webhooks are source of truth; must be idempotent via `stripe_events`.
- Portal API should return stable error codes; log failures to `audit_events`.

### 12.3 Observability

- Structured logs for:

  - prospect creation
  - territory lookup results
  - checkout session creation
  - webhook events + idempotency decisions

---

## 13) Implementation Plan (Step-by-step)

### Phase 1 — Marketing App build (reservememorials.com)

1. Create Next.js App Router project
2. Implement marketing page routes + shared layout components
3. Configure `next/image` remote patterns for WP media ([Next.js][11])
4. Build blog pages with WPGraphQL or REST
5. Add `/api/revalidate` and confirm publish → revalidate flow ([Next.js][6])

### Phase 2 — Contact → portal prospect creation

1. Add ZIP + phone required on contact form
2. Add portal endpoint support for `source='manual'` + `message`
3. Add additive migration: `prospects.message text null` (recommended)
4. Confirm new prospects appear in licensee/corporate views and respect RLS

### Phase 3 — Domain migration launch

1. Deploy marketing to `reservememorials.com`
2. Configure 301 redirects from `lobodamonuments.com` to `reservememorials.com` with path mapping ([Google for Developers][7])
3. Submit sitemaps + validate via Search Console (post-launch)

---

## 14) Acceptance Criteria (Release Gate)

### Marketing + Blog

- All required pages exist and render on `reservememorials.com`
- Blog lists and post pages render from WP
- WP publish triggers on-demand revalidation and updates are visible quickly ([Next.js][6])

### Contact → Prospects

- Contact submission creates `prospects` row with correct `org_id` derived from territory routing
- `source='manual'` set for marketing submissions
- Message is visible (either in `prospects.message` or via `audit_events`)

### Portal No-Break

- Existing design, shop, payment, admin, and portal routes function as before
- Stripe webhook signature verification still succeeds using raw body ([Stripe Docs][2])
- RLS continues to enforce org boundaries ([Supabase][3])

---

## 15) Explicit Out of Scope (for V4)

- Stripe Connect payouts/splits
- Automated email/SMS sequences
- Full CRM pipeline automation beyond lead creation
- Complex inventory/shipping workflows

---

If you want next: I can turn this PRD into a **single “LLM coding agent prompt”** with:

- exact route scaffolding for the marketing app
- WPGraphQL queries + types
- `/api/revalidate` contract + WP webhook payload format
- `/api/prospects` extended request schema + validation rules
- the additive SQL migration for `prospects.message` and any indexes

[1]: https://nextjs.org/docs/app/getting-started/route-handlers?utm_source=chatgpt.com "Getting Started: Route Handlers"
[2]: https://docs.stripe.com/webhooks/signature?utm_source=chatgpt.com "Resolve webhook signature verification errors"
[3]: https://supabase.com/docs/guides/database/postgres/row-level-security?utm_source=chatgpt.com "Row Level Security | Supabase Docs"
[4]: https://www.wpgraphql.com/docs/introduction?utm_source=chatgpt.com "WPGraphQL Introduction"
[5]: https://developer.wordpress.org/rest-api/reference/posts/?utm_source=chatgpt.com "Posts – REST API Handbook - WordPress Developer Resources"
[6]: https://nextjs.org/docs/app/api-reference/functions/revalidatePath?utm_source=chatgpt.com "Functions: revalidatePath"
[7]: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?utm_source=chatgpt.com "Site Moves and Migrations | Google Search Central"
[8]: https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects?utm_source=chatgpt.com "redirects - next.config.js"
[9]: https://vercel.com/docs/rewrites?utm_source=chatgpt.com "Rewrites on Vercel"
[10]: https://nextjs.org/docs/app/api-reference/file-conventions/route?utm_source=chatgpt.com "File-system conventions: route.js"
[11]: https://nextjs.org/docs/app/api-reference/components/image?utm_source=chatgpt.com "Image Component"
[12]: https://nextjs.org/docs/app/api-reference/functions/revalidateTag?utm_source=chatgpt.com "Functions: revalidateTag"
[13]: https://supabase.com/docs/guides/auth/server-side/creating-a-client?utm_source=chatgpt.com "Creating a Supabase client for SSR"
[14]: https://supabase.com/docs/guides/storage/security/access-control?utm_source=chatgpt.com "Storage Access Control | Supabase Docs"
