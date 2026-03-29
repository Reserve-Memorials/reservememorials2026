# Reserve Memorials -- Application Blueprint

> Comprehensive architecture, feature, and implementation reference for the Reserve Memorials platform.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Environment & Configuration](#4-environment--configuration)
5. [Database Schema (Supabase PostgreSQL)](#5-database-schema-supabase-postgresql)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [Routing Architecture](#7-routing-architecture)
8. [API Routes](#8-api-routes)
9. [Core Business Features](#9-core-business-features)
10. [Frontend Architecture](#10-frontend-architecture)
11. [Component Library](#11-component-library)
12. [Styling & Design System](#12-styling--design-system)
13. [Third-Party Integrations](#13-third-party-integrations)
14. [Marketing Pages](#14-marketing-pages)
15. [Data Flow Diagrams](#15-data-flow-diagrams)
16. [Deployment & Infrastructure](#16-deployment--infrastructure)
17. [Security Model](#17-security-model)

---

## 1. Project Overview

**Reserve Memorials** is a multi-tenant B2B/B2C platform for a memorial services company based in Hudson, Ohio. It enables a corporate entity ("Reserve Memorials") to manage a network of licensed memorial service providers (licensees), each assigned geographic territories by ZIP code. Families can browse services, start design consultations, and purchase memorial products through the platform.

### Business Model

```
Corporate (Reserve Memorials)
  |
  |-- Manages licensee organizations
  |-- Assigns ZIP-code territories to licensees
  |-- Oversees all orders, revenue, and audit trails
  |
  +-- Licensee A (e.g., "Ohio Memorials")
  |     |-- Owns ZIP territories (43215, 44114, ...)
  |     |-- Manages leads/prospects routed by ZIP
  |     |-- Runs design sessions
  |     |-- Processes deposits and merch orders
  |
  +-- Licensee B
        |-- Owns different ZIP territories
        |-- Same capabilities as above
```

### Key Capabilities

- **Public marketing site** with service pages, blog, gallery, FAQ, and contact forms
- **Lead capture and routing** -- prospects are automatically assigned to licensees based on ZIP code territory mapping
- **Design consultation workflow** -- licensees start sessions, upload design assets (PDFs/images), and collect deposits
- **E-commerce** -- merchandise catalog with Stripe-powered checkout
- **Admin dashboard** -- corporate admins manage licensees, territories, orders, and view audit logs
- **Licensee portal** -- licensees manage their leads, design sessions, shop, and orders
- **Headless WordPress blog** -- blog content fetched from a WordPress REST API
- **HubSpot contact forms** -- embedded forms for lead capture on marketing pages

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.1.6 |
| **Runtime** | React | 19.2.3 |
| **Language** | TypeScript (strict mode) | 5.x |
| **Styling** | Tailwind CSS (PostCSS plugin) | 4.x |
| **Animation** | Framer Motion | 12.23.26 |
| **Animation Utilities** | tw-animate-css | 1.4.0 |
| **Component Library** | shadcn/ui (New York style, Zinc base) | -- |
| **UI Primitives** | Radix UI | Various |
| **Icons** | Lucide React | 0.562.0 |
| **Database** | Supabase (PostgreSQL + RLS) | -- |
| **Auth** | Supabase Auth (email/password + magic link) | -- |
| **File Storage** | Supabase Storage | -- |
| **Payments** | Stripe (Checkout Sessions + Webhooks) | 20.1.0 |
| **CMS** | WordPress (headless, REST API) | -- |
| **Forms/CRM** | HubSpot Embedded Forms | -- |
| **Analytics** | Google Tag Manager + Vercel Analytics | -- |
| **Form Handling** | React Hook Form + Zod | 7.69.0 / 4.3.4 |
| **Date Utilities** | date-fns + react-day-picker | 4.1.0 / 9.13.0 |
| **Toasts** | Sonner | 2.0.7 |
| **Theming** | next-themes | 0.4.6 |
| **Variant Utility** | class-variance-authority (CVA) | 0.7.1 |
| **Class Merging** | clsx + tailwind-merge | 2.1.1 / 3.4.0 |
| **Deployment** | Vercel (inferred) | -- |

---

## 3. Project Structure

```
reservememorials2026/
|
|-- middleware.ts                    # Supabase session middleware (root)
|-- next.config.ts                  # Next.js configuration
|-- tsconfig.json                   # TypeScript config (strict, path alias @/*)
|-- postcss.config.mjs              # Tailwind CSS v4 PostCSS plugin
|-- eslint.config.mjs               # ESLint with Next.js core-web-vitals + TS
|-- components.json                 # shadcn/ui configuration
|-- package.json                    # Dependencies and scripts
|-- DEPLOY_TRIGGER                  # Touch file to trigger redeployments
|
|-- public/                         # Static assets
|   |-- Reserve Memorials.mp4       # Hero background video
|   |-- duck-video.mp4              # Decorative video
|   |-- reservelogoblack.png        # Brand logo (dark)
|   |-- reservelogowhite.png        # Brand logo (light)
|   |-- reserve-duck-black.jpg      # Mascot image (dark)
|   |-- reserve-duck-white.jpg      # Mascot image (light)
|   |-- traditional-headstone.png   # Service imagery
|   |-- columbariums.png            # Service imagery
|   |-- veteran-memorials.png       # Service imagery
|   |-- statues.png                 # Service imagery
|   |-- dove-release.png            # Service imagery
|   |-- grief-coaching.png          # Service imagery
|   |-- design-consultation.png     # Service imagery
|   |-- parallax-cemetery-landscape.jpg  # Parallax background
|   |-- file.svg, globe.svg, next.svg, vercel.svg  # Default Next.js assets
|
|-- docs/
|   |-- Cemeteries with addresses.json  # Static Ohio cemetery reference data
|
|-- supabase/
|   |-- migrations/
|   |   |-- 0001_init.sql                       # Core schema + RLS policies
|   |   |-- 0002_storage_policies.sql           # Storage bucket RLS
|   |   |-- 0003_seed_tag.sql                   # Seed tagging system
|   |   |-- 0004_rls_helpers_security_definer.sql  # SECURITY DEFINER helpers
|   |   |-- 0005_org_members_unique.sql         # Unique constraint for upserts
|   |-- seed/
|       |-- demo_2026_01_03.sql                 # Demo licensee + territories
|       |-- cleanup_demo.sql                    # Demo data cleanup
|
|-- src/
    |-- app/                        # Next.js App Router pages & API routes
    |   |-- globals.css             # Design system (OKLch color tokens, animations)
    |   |-- tw-animate.css          # Vendored animation utilities
    |   |-- layout.tsx              # Root layout (fonts, providers, GTM, analytics)
    |   |-- page.tsx                # Homepage
    |   |-- (pages...)              # See Section 7 for complete routing tree
    |   |-- api/                    # See Section 8 for all API routes
    |
    |-- components/
    |   |-- AppHeader.tsx           # Conditional header (marketing vs portal)
    |   |-- AppFooter.tsx           # Conditional footer (marketing only)
    |   |-- SiteNav.tsx             # Portal/admin navigation bar
    |   |-- mode-toggle.tsx         # Light/dark/system theme toggle
    |   |-- motion.tsx              # Framer Motion re-exports
    |   |-- theme-provider.tsx      # next-themes wrapper
    |   |-- dashboard/
    |   |   |-- DashboardShell.tsx  # Reusable sidebar layout (admin & portal)
    |   |-- marketing/
    |   |   |-- MarketingNav.tsx    # Public site navigation + promo banner
    |   |   |-- MarketingFooter.tsx # Public site footer
    |   |   |-- ServiceDetailPage.tsx  # Reusable service page template
    |   |   |-- FadeIn.tsx          # Viewport-triggered fade animation
    |   |   |-- ParallaxSection.tsx # Parallax background section
    |   |   |-- HubSpotContactForm.tsx  # HubSpot form embed
    |   |-- charts/
    |   |   |-- BarMiniChart.tsx    # SVG bar chart for dashboards
    |   |   |-- Sparkline.tsx       # SVG line chart for dashboards
    |   |-- ui/                     # shadcn/ui component library (20+ components)
    |       |-- accordion.tsx, avatar.tsx, badge.tsx, button.tsx, calendar.tsx,
    |       |   card.tsx, dialog.tsx, dropdown-menu.tsx, form.tsx, input.tsx,
    |       |   label.tsx, popover.tsx, select.tsx, separator.tsx, sheet.tsx,
    |       |   skeleton.tsx, sonner.tsx, table.tsx, tabs.tsx, textarea.tsx
    |
    |-- lib/
        |-- utils.ts                # cn() class merge utility
        |-- env.ts                  # Server-side env validation (Zod)
        |-- env-public.ts           # Client-side public env access
        |-- stripe.ts               # Stripe singleton client
        |-- cemeteries.ts           # Cemetery data loader (memoized)
        |-- wp.ts                   # WordPress headless CMS integration
        |-- auth/
        |   |-- roles.ts            # AppRole type + getMyOrgMembership()
        |   |-- bootstrap.ts        # First corporate admin bootstrapping
        |   |-- requireCorporateAdmin.ts  # Route guard middleware
        |-- supabase/
        |   |-- admin.ts            # Service-role admin client
        |   |-- browser.ts          # Browser client (anon key)
        |   |-- server.ts           # Server Component / Route Handler client
        |   |-- middleware.ts        # Session refresh middleware
        |   |-- database.types.ts   # Auto-generated TypeScript types
        |-- marketing/
            |-- contact.ts          # Company contact constants
```

---

## 4. Environment & Configuration

### Environment Variables

| Variable | Scope | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | -- | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | -- | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | -- | Supabase service role key (bypasses RLS) |
| `NEXT_PUBLIC_APP_URL` | Client + Server | `http://localhost:3000` | Application base URL |
| `CORPORATE_ORG_ID` | Server only | `ae87184d-...` | Corporate org UUID (fallback for unassigned ZIPs) |
| `STRIPE_SECRET_KEY` | Server only | -- | Stripe API secret key |
| `STRIPE_WEBHOOK_SECRET` | Server only | -- | Stripe webhook signing secret |
| `DEPOSIT_CURRENCY` | Server only | `usd` | Currency for design deposits |
| `DEPOSIT_AMOUNT_CENTS` | Server only | `5000` | Deposit amount ($50.00) |
| `WORDPRESS_BLOG_CMS_URL` | Server only | -- | WordPress REST API base URL |
| `WORDPRESS_URL` | Server only | `https://anandi13.sg-host.com` | Fallback WordPress URL |

### Env Validation

Server-side environment variables are validated at runtime using **Zod** in `src/lib/env.ts`. Client-side public variables are surfaced via `src/lib/env-public.ts` using direct `process.env.NEXT_PUBLIC_*` property access (required for Next.js bundler inlining).

### Next.js Configuration (`next.config.ts`)

- **Turbopack**: Root pinned to `__dirname` to prevent module resolution conflicts
- **Image remote patterns**: Allows images from `anandi14.sg-host.com`, `anandi13.sg-host.com`, `markl522.sg-host.com` (WordPress media hosts)

### TypeScript Configuration

- **Target**: ES2017
- **Strict mode**: Enabled
- **Module resolution**: Bundler
- **Path alias**: `@/*` maps to `./src/*`
- **JSX**: react-jsx (automatic runtime)

### shadcn/ui Configuration (`components.json`)

- **Style**: New York
- **RSC**: Enabled (React Server Components)
- **Base color**: Zinc
- **CSS variables**: Enabled
- **Icon library**: Lucide

---

## 5. Database Schema (Supabase PostgreSQL)

### Entity Relationship Overview

```
organizations (1)----(*) org_members (*)---->(1) auth.users
      |
      |----(1)----(*) territories (ZIP assignment)
      |
      |----(1)----(*) prospects
      |                  |
      |                  +----(1)----(*) design_sessions
      |                  |                    |
      |                  |                    +----(1)----(*) design_assets
      |                  |
      |                  +----(1)----(*) orders
      |                                    |
      |                                    +----(1)----(*) order_items ----> products
      |
      +----(1)----(*) audit_events

stripe_events (standalone deduplication table)
```

### Enums

| Enum | Values |
|---|---|
| `org_type` | `corporate`, `licensee` |
| `org_status` | `active`, `suspended` |
| `member_role` | `corporate_admin`, `licensee_owner`, `licensee_sales` |
| `prospect_status` | `new`, `contacted`, `qualified`, `won`, `lost` |
| `prospect_source` | `design`, `manual`, `import` |
| `design_session_status` | `started`, `in_progress`, `exported`, `archived` |
| `design_asset_type` | `image`, `pdf`, `other` |
| `order_type` | `deposit`, `merch` |
| `order_status` | `pending`, `paid`, `cancelled`, `refunded`, `failed` |

### Tables

#### `organizations`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | `gen_random_uuid()` |
| `name` | text NOT NULL | |
| `type` | org_type NOT NULL | `corporate` or `licensee` |
| `status` | org_status | Default: `active` |
| `stripe_account_id` | text | Stripe Connect account |
| `created_at` | timestamptz | Default: `now()` |
| `updated_at` | timestamptz | Default: `now()` |

#### `org_members`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `org_id` | uuid FK -> organizations | |
| `user_id` | uuid FK -> auth.users | |
| `role` | member_role NOT NULL | |
| `created_at` | timestamptz | |
| **Constraint** | UNIQUE(org_id, user_id) | Prevents duplicate memberships |

#### `territories`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `zip` | text NOT NULL | 5-digit ZIP code |
| `org_id` | uuid FK -> organizations (RESTRICT) | Owning licensee |
| `active_from` | date | Territory start date |
| `active_to` | date | Territory end date (null = indefinite) |
| `priority` | int | Default: 0 (higher = preferred) |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |
| **Index** | (zip, active_from, active_to) | Territory lookup optimization |

#### `prospects`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `org_id` | uuid FK -> organizations (RESTRICT) | Assigned licensee |
| `zip` | text | Prospect's ZIP code |
| `name` | text | |
| `email` | text | |
| `phone` | text | |
| `status` | prospect_status | Default: `new` |
| `source` | prospect_source | Default: `design` |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |
| **Index** | (org_id, created_at) | Licensee lead listing |

#### `design_sessions`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `org_id` | uuid FK -> organizations (RESTRICT) | |
| `prospect_id` | uuid FK -> prospects (CASCADE) | |
| `status` | design_session_status | Default: `started` |
| `metadata` | jsonb | Flexible session data |
| `export_count` | int | Default: 0, tracks exports |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

#### `design_assets`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `org_id` | uuid FK -> organizations (RESTRICT) | |
| `design_session_id` | uuid FK -> design_sessions (CASCADE) | |
| `bucket` | text NOT NULL | Storage bucket name |
| `path` | text NOT NULL | File path in bucket |
| `type` | design_asset_type | `image`, `pdf`, `other` |
| `created_at` | timestamptz | |
| **Index** | (design_session_id, created_at DESC) | Session asset listing |

#### `products`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `name` | text NOT NULL | |
| `description` | text | |
| `price_cents` | int NOT NULL | Price in cents |
| `currency` | text | Default: `usd` |
| `active` | boolean | Default: `true` |
| `image_asset_path` | text | Product image path |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

#### `orders`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `org_id` | uuid FK -> organizations (RESTRICT) | |
| `prospect_id` | uuid FK -> prospects (SET NULL) | |
| `type` | order_type NOT NULL | `deposit` or `merch` |
| `status` | order_status | Default: `pending` |
| `total_cents` | int NOT NULL | |
| `currency` | text | Default: `usd` |
| `stripe_checkout_session_id` | text | Stripe reference |
| `stripe_payment_intent_id` | text | Stripe reference |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |
| **Index** | (org_id, created_at, status) | Order listing/filtering |

#### `order_items`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `order_id` | uuid FK -> orders (CASCADE) | |
| `product_id` | uuid FK -> products (SET NULL) | |
| `name` | text NOT NULL | Snapshot of product name |
| `quantity` | int NOT NULL | Default: 1 |
| `unit_price_cents` | int NOT NULL | Snapshot of price at time of order |
| `created_at` | timestamptz | |
| **Index** | (order_id) | |

#### `audit_events`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `actor_user_id` | uuid FK -> auth.users (SET NULL) | Who performed the action |
| `org_id` | uuid FK -> organizations (SET NULL) | Which org context |
| `event_type` | text NOT NULL | e.g., `CHECKOUT_SESSION_CREATED` |
| `entity_type` | text | e.g., `order`, `prospect` |
| `entity_id` | text | UUID of affected entity |
| `metadata` | jsonb | Additional event data |
| `created_at` | timestamptz | |
| **Index** | (created_at DESC) | Chronological audit log |

#### `stripe_events`
| Column | Type | Notes |
|---|---|---|
| `event_id` | text (PK) | Stripe event ID (idempotency key) |
| `type` | text | Stripe event type |
| `created_at` | timestamptz | |

### Row-Level Security (RLS)

All tables have RLS enabled. Access is controlled by three helper functions:

```sql
-- Returns array of org IDs the current user belongs to
user_org_ids() RETURNS uuid[]

-- Returns true if the current user holds the corporate_admin role
is_corporate_admin() RETURNS boolean

-- Returns true if the user is a corporate admin OR a member of the target org
is_org_member(target_org_id uuid) RETURNS boolean
```

These helpers are declared as `SECURITY DEFINER` to prevent RLS recursion when querying `org_members` from within RLS policies.

**Policy pattern**: Corporate admins can read/write all data. Licensee users can only access data scoped to their organization(s).

### Storage Buckets

| Bucket | Access | Path Pattern |
|---|---|---|
| `design-exports` | Private (RLS) | `{org_id}/{session_id}/{timestamp}-{filename}` |

Storage RLS policies check `is_corporate_admin()` or verify the first path segment matches one of the user's org IDs.

### Seed Data

- **Demo seed** (`demo_2026_01_03.sql`): Creates a demo licensee org "Ohio Memorials (Demo Licensee)" with 6 Ohio ZIP territory assignments (43215, 44114, 45202, 44308, 45402, 43604)
- **Cleanup** (`cleanup_demo.sql`): Deletes all rows tagged with `demo_2026_01_03` via the `seed_tag` column
- All seed rows are tagged in a `seed_tag` column added by migration `0003` for safe cleanup

---

## 6. Authentication & Authorization

### Auth Provider

**Supabase Auth** with two sign-in methods:

1. **Email + Password** -- standard credential-based login via `signInWithPassword`
2. **Magic Link (OTP)** -- passwordless email link via `signInWithOtp`

### Session Management

```
Browser Request
    |
    v
middleware.ts
    |
    v
lib/supabase/middleware.ts -> updateSession()
    |-- Reads Supabase cookies from request
    |-- Refreshes session token if needed
    |-- Writes updated cookies to response
    |
    v
Route Handler / Page
```

The middleware runs on **all routes** except `_next/static`, `_next/image`, and `favicon.ico`.

### Supabase Client Variants

| Client | File | Usage |
|---|---|---|
| **Browser** | `lib/supabase/browser.ts` | Client Components (anon key) |
| **Server** | `lib/supabase/server.ts` | Server Components, Route Handlers (cookie-based session) |
| **Admin** | `lib/supabase/admin.ts` | Service role key (bypasses RLS, used for privileged ops) |

### Roles

```typescript
type AppRole = "corporate_admin" | "licensee_owner" | "licensee_sales"
```

| Role | Access |
|---|---|
| `corporate_admin` | Full access to admin dashboard, all orgs, all data |
| `licensee_owner` | Full access to their org's portal (leads, sessions, shop, orders) |
| `licensee_sales` | Same portal access scoped to their org |

### Role Resolution

`getMyOrgMembership()` in `lib/auth/roles.ts` fetches the current user's `org_members` records. Role checks are performed in:

- **Admin layout** (`src/app/admin/layout.tsx`): Requires `corporate_admin` role, redirects to `/login` otherwise
- **Portal layout** (`src/app/portal/layout.tsx`): Requires any authenticated user (non-corporate-admin)
- **API routes**: Use `requireCorporateAdmin()` guard for admin endpoints

### Bootstrap Flow

The first user to sign in is automatically made a `corporate_admin` via `bootstrapFirstCorporateAdmin()` in `lib/auth/bootstrap.ts`. This uses the service role key and only runs if no corporate admin exists yet. The event is logged to `audit_events`.

### Auth Callback (`/auth/callback`)

After OAuth/magic link confirmation:
1. Exchanges the code for a session
2. Calls `bootstrapFirstCorporateAdmin()` if applicable
3. Reads user roles
4. Redirects to `/admin` if corporate admin, otherwise `/portal`

---

## 7. Routing Architecture

### Complete Route Map

#### Public Marketing Pages

| Route | Description |
|---|---|
| `/` | Homepage -- hero video, value props, services grid, service area, contact card |
| `/about-us` | Company story, 6 values, service area, CTA |
| `/contact-us` | HubSpot contact form + contact details card |
| `/services` | Service index -- memorial options + ceremony/support categories |
| `/traditional-headstones` | Upright, flat, companion, family, slant, bevel markers; 4-step process; 5 FAQs |
| `/columbariums` | Freestanding, indoor, niche, garden, personalized, church options; planning process; 5 FAQs |
| `/veteran-memorials` | Veteran memorial types, VA eligibility, coordination services |
| `/statues` | Statue/sculpture types, featured artists, pricing tiers |
| `/dove-release` | Release ceremony options (single, pair, flock, family, graveside, service) |
| `/grief-coaching` | Support options, professional referrals, crisis resources, testimonials |
| `/design-consultation` | What to cover, what to bring, consultation formats (in-person, phone, video) |
| `/cemeteries-we-serve` | Searchable/filterable Ohio cemetery directory with Google Maps links |
| `/gallery` | Gallery grid with category filters (placeholder UI) |
| `/blog` | WordPress blog index (12 posts/page with pagination) |
| `/blog/[slug]` | Individual blog post (WordPress content with rewritten links) |
| `/faqs` | FAQ cards (placeholder content) |
| `/terms` | Terms of Service (placeholder) |
| `/privacy` | Privacy Policy (placeholder) |
| `/thank-you` | Form submission confirmation (noindex) |

#### Authentication Pages

| Route | Type | Description |
|---|---|---|
| `/login` | Page | Two-tab interface: Magic Link + Password login |
| `/auth/callback` | API (GET) | OAuth/magic link session exchange + role-based redirect |
| `/logout` | API (GET/POST) | Sign out and redirect to homepage |
| `/reset-password` | Page | Password reset request form |

#### Admin Dashboard (`/admin/*`)

Protected by `corporate_admin` role check in layout.

| Route | Description |
|---|---|
| `/admin` | Dashboard with 30-day revenue, leads, and sessions metrics (BarMiniChart + Sparkline) |
| `/admin/licensees` | CRUD for licensee organizations; invite/manage members; role assignment |
| `/admin/territories` | ZIP-to-org territory mapping viewer |
| `/admin/orders` | All orders table (type, status, total, created date) |
| `/admin/audit` | 200 most recent audit events |

#### Licensee Portal (`/portal/*`)

Protected by auth check (non-corporate-admin) in layout.

| Route | Description |
|---|---|
| `/portal` | Overview with quick-link cards and key metrics |
| `/portal/leads` | Prospect list (name, ZIP, status, created date) |
| `/portal/leads/[id]` | Lead detail view (name, email, phone, ZIP, status) |
| `/portal/sessions` | Design sessions table (status, export count) |
| `/portal/design` | Start new design session form (ZIP, name, email, phone) |
| `/portal/design/session/[id]` | Session detail + upload design exports |
| `/portal/shop` | Product catalog with cart and Stripe checkout |
| `/portal/orders` | Licensee's orders (type, status, total, created date) |
| `/portal/payment/success` | Stripe checkout success confirmation |
| `/portal/payment/cancel` | Payment cancelled / retry page |

#### Redirect Routes

These public-facing paths redirect into the portal:

| Public Route | Redirects To |
|---|---|
| `/design` | `/portal/design` |
| `/design/session/[id]` | `/portal/design/session/[id]` |
| `/shop` | `/portal/shop` |
| `/payment/success` | `/portal/payment/success` |
| `/payment/cancel` | `/portal/payment/cancel` |

### Layout Hierarchy

```
Root Layout (layout.tsx)
|-- Fonts: Cormorant Garamond (headings) + Inter (body)
|-- Providers: ThemeProvider, Toaster
|-- Scripts: Google Tag Manager, Vercel Analytics
|-- Structure: AppHeader > main > AppFooter
|
|-- Marketing pages (use MarketingNav + MarketingFooter)
|
|-- /admin/* Layout
|   |-- Auth guard: corporate_admin required
|   |-- DashboardShell variant="admin"
|   |-- Sidebar: Dashboard, Licensees, Territories, Orders, Audit log
|
|-- /portal/* Layout
    |-- Auth guard: authenticated user required
    |-- DashboardShell variant="portal"
    |-- Sidebar: Overview, Leads, Sessions, Design, Shop, Orders
```

### Conditional Header/Footer

`AppHeader.tsx` inspects `usePathname()`:
- Routes starting with `/portal` or `/admin` render `SiteNav` (minimal portal header)
- All other routes render `MarketingNav` (full marketing header with dropdowns, promo banner)

`AppFooter.tsx` hides the footer entirely for `/portal`, `/admin`, `/login`, `/auth`, `/reset-password`, `/logout` routes.

---

## 8. API Routes

### Territory & Lead Routing

#### `POST /api/territory/lookup`
- **Auth**: None required
- **Body**: `{ zip: string }`
- **Logic**: Queries `territories` table for the given ZIP where current date falls within `active_from`/`active_to` range, ordered by priority DESC
- **Response**: `{ assignedOrgId: string | null, assignmentType: "territory" | "corporate_fallback" }`

#### `POST /api/prospects`
- **Auth**: Required (Supabase server client)
- **Body**: `{ zip: string, name: string, email: string, phone: string }`
- **Logic**:
  1. Looks up territory by ZIP
  2. Falls back to `CORPORATE_ORG_ID` if no territory match
  3. Inserts `prospect` row with org assignment
  4. Inserts `design_session` row linked to prospect
  5. Logs audit event
- **Response**: `{ prospectId, designSessionId }`

### Design Sessions

#### `POST /api/design-sessions/[id]/export`
- **Auth**: None (relies on session context)
- **Body**: Multipart form data with `file` field
- **Logic**:
  1. Fetches design session for org_id
  2. Sanitizes filename
  3. Uploads to `design-exports` bucket at `{org_id}/{session_id}/{timestamp}-{filename}`
  4. Inserts `design_asset` record
  5. Updates session: `status` -> `exported`, increments `export_count`
  6. Logs audit event (`DESIGN_EXPORTED`)
- **Response**: `{ ok: true }`

### Stripe Checkout

#### `POST /api/stripe/checkout/cart`
- **Auth**: Required
- **Body**: `{ items: [{ productId: string, qty: number }], prospectId?: string }`
- **Logic**:
  1. Validates all products are active
  2. Resolves org_id from prospect or falls back to `CORPORATE_ORG_ID`
  3. Inserts `order` (type: `merch`) and `order_items`
  4. Creates Stripe Checkout Session with line items
  5. Metadata: `{ order_id, org_id, prospect_id, type: "merch" }`
  6. Logs audit event (`CHECKOUT_SESSION_CREATED`)
- **Response**: `{ url: string }` (Stripe checkout URL)

#### `POST /api/stripe/checkout/deposit`
- **Auth**: Required
- **Body**: `{ designSessionId: string }`
- **Logic**:
  1. Fetches design session (org_id, prospect_id)
  2. Inserts `order` (type: `deposit`, total from `DEPOSIT_AMOUNT_CENTS`)
  3. Creates Stripe Checkout Session with single line item
  4. Metadata: `{ order_id, org_id, prospect_id, design_session_id, type: "deposit" }`
  5. Logs audit event
- **Response**: `{ url: string }`

#### `POST /api/stripe/webhook`
- **Auth**: Stripe signature verification
- **Idempotency**: Checks `stripe_events` table before processing; inserts event ID to deduplicate
- **Handled events**:
  - `checkout.session.completed` -- Updates order status to `paid`, stores `payment_intent`
  - `checkout.session.expired` -- Updates order status to `cancelled`
- **Audit**: Logs payment events with metadata

### Admin Management

#### `GET /api/admin/licensees`
- **Auth**: Corporate admin required
- **Response**: All organizations with their members (emails resolved from Supabase Auth Admin API)

#### `POST /api/admin/licensees`
- **Auth**: Corporate admin required
- **Body**: `{ name: string }`
- **Logic**: Creates new licensee organization, logs audit event
- **Response**: Created organization record

#### `PATCH /api/admin/members`
- **Auth**: Corporate admin required
- **Body**: `{ orgId: string, userId: string, role: AppRole }`
- **Logic**: Upserts org_members record (uses UNIQUE constraint), logs audit event

#### `DELETE /api/admin/members`
- **Auth**: Corporate admin required
- **Body**: `{ orgId: string, userId: string }`
- **Logic**: Removes org membership, logs audit event

#### `POST /api/admin/members/invite`
- **Auth**: Corporate admin required
- **Body**: `{ email: string, orgId: string, role: AppRole }`
- **Logic**:
  1. Searches Auth Admin API for existing user by email
  2. If not found: invites via `admin.auth.admin.inviteUserByEmail()`, generates action link
  3. Upserts org_members with specified role
  4. Logs audit event (`invite_user` or `add_existing_user`)
- **Response**: `{ ok: true, userId, invited: boolean, actionLink: string | null }`

### Debug (Development)

#### `GET /api/_debug/auth`
- Returns: host, Supabase cookie presence, cookie names, user email

#### `GET /api/_debug/env`
- Returns: cwd, env var presence checks, safe host/key-length info

---

## 9. Core Business Features

### 9.1 Territory-Based Lead Routing

The platform automatically routes prospects to the correct licensee based on ZIP code:

```
Prospect submits ZIP (e.g., 44114)
    |
    v
POST /api/territory/lookup
    |-- Query: territories WHERE zip = '44114'
    |       AND now() BETWEEN active_from AND active_to
    |       ORDER BY priority DESC
    |
    |-- Match found? -> Return licensee org_id
    |-- No match?    -> Return CORPORATE_ORG_ID (fallback)
    |
    v
Prospect assigned to licensee org
```

Territories support:
- **Date ranges** (`active_from` / `active_to`) for time-limited assignments
- **Priority ordering** for overlapping assignments (higher priority wins)
- **Corporate fallback** for ZIPs not assigned to any licensee

### 9.2 Design Consultation Workflow

```
1. Licensee starts design session
   |-- Fills form: ZIP, customer name, email, phone
   |-- POST /api/prospects (creates prospect + session)
   |
2. Design session created (status: "started")
   |-- Licensee works on memorial design
   |
3. Export design assets
   |-- Upload PDFs/images via /api/design-sessions/[id]/export
   |-- Files stored in Supabase Storage (design-exports bucket)
   |-- Session status -> "exported", export_count incremented
   |
4. Collect deposit
   |-- POST /api/stripe/checkout/deposit
   |-- Customer pays via Stripe Checkout
   |-- Webhook updates order to "paid"
```

### 9.3 E-Commerce (Merchandise Shop)

```
1. Browse product catalog (/portal/shop)
   |-- Products loaded from `products` table
   |-- Add items to cart (client-side state)
   |
2. Checkout
   |-- POST /api/stripe/checkout/cart
   |-- Creates order + order_items
   |-- Redirects to Stripe Checkout
   |
3. Payment processing
   |-- Stripe webhook: checkout.session.completed -> order "paid"
   |-- Stripe webhook: checkout.session.expired  -> order "cancelled"
   |
4. Confirmation
   |-- /portal/payment/success (success page)
   |-- /portal/payment/cancel  (retry options)
```

### 9.4 Licensee Management (Admin)

Corporate admins can:
- **Create licensees**: New organization with `type: licensee`
- **Invite users**: By email; auto-creates Supabase Auth account if needed
- **Assign roles**: `licensee_owner` or `licensee_sales`
- **Remove members**: Delete org membership
- **View all data**: Orders, leads, audit trail across all orgs

### 9.5 Audit Trail

Every significant action is logged to the `audit_events` table:

| Event Type | Trigger |
|---|---|
| `PROSPECT_CREATED` | New prospect via design form |
| `DESIGN_EXPORTED` | Design asset uploaded |
| `CHECKOUT_SESSION_CREATED` | Stripe checkout initiated |
| `PAYMENT_RECEIVED` | Stripe checkout completed |
| `ORDER_CANCELLED` | Stripe checkout expired |
| `invite_user` | New user invited to org |
| `add_existing_user` | Existing user added to org |
| `remove_member` | User removed from org |
| `role_updated` | Member role changed |
| `licensee_created` | New licensee org created |
| `bootstrap_corporate_admin` | First admin bootstrapped |

Each event records: `actor_user_id`, `org_id`, `event_type`, `entity_type`, `entity_id`, and arbitrary `metadata` (JSONB).

---

## 10. Frontend Architecture

### Rendering Strategy

| Type | Usage |
|---|---|
| **Server Components** (default) | Pages, layouts, data fetching, auth checks |
| **Client Components** (`"use client"`) | Forms, interactive UI, client-side state, animations |
| **`force-dynamic`** | Admin and portal layouts (always fresh auth state) |
| **ISR (revalidate)** | Blog pages (300s cache, tagged `wp-posts`) |

### Client-Side State Management

No global state library is used. State is managed via:
- **React Hook Form** for form state and validation
- **React `useState`/`useEffect`** for local component state (e.g., cart in ShopClient)
- **URL search params** for pagination/filtering (cemetery search)

### Form Architecture

All forms follow a consistent pattern:

```typescript
// 1. Zod schema definition
const schema = z.object({ ... })

// 2. React Hook Form with zodResolver
const form = useForm({ resolver: zodResolver(schema) })

// 3. shadcn/ui Form components for rendering
<Form {...form}>
  <FormField control={form.control} name="fieldName" render={...} />
</Form>

// 4. Async onSubmit with fetch() to API routes
// 5. Sonner toast for success/error feedback
// 6. Loading state with Loader2 spinner icon
```

### Key Client Components

| Component | Location | Purpose |
|---|---|---|
| `LoginForm` | `app/login/` | Email + password sign-in |
| `MagicLinkForm` | `app/login/` | Passwordless OTP sign-in |
| `ResetPasswordForm` | `app/reset-password/` | Password reset request |
| `DesignStartForm` | `app/design/` | Start design consultation |
| `SessionActions` | `app/design/session/[id]/` | Upload exports + collect deposit |
| `ShopClient` | `app/shop/` | Product catalog, cart, checkout |
| `LicenseesAdminClient` | `app/admin/licensees/` | Full licensee CRUD + member management |
| `MarketingNav` | `components/marketing/` | Navigation + promo banner |
| `HubSpotContactForm` | `components/marketing/` | HubSpot form embed |
| `DashboardShell` | `components/dashboard/` | Sidebar navigation (admin/portal) |

---

## 11. Component Library

### shadcn/ui Components (`src/components/ui/`)

All built on Radix UI primitives with Tailwind CSS styling and CVA variants.

| Component | Primitives | Key Features |
|---|---|---|
| `Accordion` | Radix Accordion | Expandable sections, chevron rotation |
| `Avatar` | Radix Avatar | Circular image with fallback initials |
| `Badge` | -- | Variants: default, secondary, destructive, outline; `asChild` support |
| `Button` | -- | Variants: default, destructive, outline, secondary, ghost, link; Sizes: default, sm, lg, icon, icon-sm, icon-lg; `asChild` for polymorphic usage |
| `Calendar` | react-day-picker | Date picker with range support, keyboard nav |
| `Card` | -- | Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter |
| `Dialog` | Radix Dialog | Modal with overlay, zoom/fade animation, optional close button |
| `DropdownMenu` | Radix Dropdown | Full menu with groups, checkboxes, radios, sub-menus, shortcuts |
| `Form` | React Hook Form | FormProvider, FormField, FormItem, FormLabel, FormControl, FormMessage |
| `Input` | -- | Text input with file upload support, focus ring, disabled states |
| `Label` | Radix Label | Form label with group-disabled support |
| `Popover` | Radix Popover | Floating content panel with zoom/fade animation |
| `Select` | Radix Select | Dropdown select with scroll buttons, check icons; sizes: sm, default |
| `Separator` | Radix Separator | Horizontal/vertical divider |
| `Sheet` | Radix Dialog | Slide-out panel from any side (left, right, top, bottom) |
| `Skeleton` | -- | Pulsing placeholder for loading states |
| `Sonner (Toaster)` | Sonner | Toast notifications with themed icons (success, info, warning, error) |
| `Table` | -- | Full HTML table with header, body, footer, hover states |
| `Tabs` | Radix Tabs | Tabbed interface with active state styling |
| `Textarea` | -- | Multi-line input with dynamic height (`field-sizing-content`) |

### Custom Components

| Component | Purpose |
|---|---|
| `AppHeader` | Route-aware header switching (marketing vs portal nav) |
| `AppFooter` | Route-aware footer (hidden in portal/admin) |
| `SiteNav` | Minimal portal header with logo and dashboard link |
| `DashboardShell` | Reusable sidebar layout for admin and portal variants |
| `MarketingNav` | Full marketing header with service/contact dropdowns, promo banner, mobile menu |
| `MarketingFooter` | 4-column footer with nav links, contact info, branding |
| `ServiceDetailPage` | Reusable template for service detail pages (hero, highlights, CTA) |
| `FadeIn` | Framer Motion viewport-triggered fade-up animation wrapper |
| `ParallaxSection` | CSS parallax background with dark overlay |
| `HubSpotContactForm` | Script-injected HubSpot form embed |
| `BarMiniChart` | SVG mini bar chart for admin dashboard metrics |
| `Sparkline` | SVG sparkline with fill area for dashboard metrics |
| `ModeToggle` | Theme switcher dropdown (light/dark/system) |

---

## 12. Styling & Design System

### Color System (OKLch)

The design system uses OKLch color space for perceptually uniform colors, defined as CSS custom properties in `globals.css`.

#### Light Mode Palette

| Token | OKLch Value | Description |
|---|---|---|
| `--background` | `oklch(0.98 0.008 75)` | Stone Ivory |
| `--foreground` | `oklch(0.20 0.015 250)` | Granite Charcoal |
| `--primary` | `oklch(0.28 0.055 235)` | Deep Navy |
| `--secondary` | `oklch(0.92 0.015 65)` | Warm Sand |
| `--accent` | `oklch(0.65 0.095 85)` | Heritage Gold |
| `--muted` | `oklch(0.94 0.012 70)` | Soft Stone |
| `--destructive` | `oklch(0.50 0.24 25)` | Error Red |
| `--border` | `oklch(0.88 0.012 70)` | Subtle Stone Border |
| `--evergreen` | `oklch(0.35 0.055 155)` | Veterans/Community Green |

#### Dark Mode Palette

Inverted contrast with darker backgrounds (`oklch(0.16 0.015 245)` Dark Slate), lighter primaries, and adjusted accent brightness.

#### Chart Colors (5)

1. Deep Navy
2. Evergreen
3. Slate Blue
4. Heritage Gold
5. Warm Terracotta

### Typography

| Font | Variable | Usage |
|---|---|---|
| **Cormorant Garamond** | `--font-heading` | Headings, display text (serif, memorial-appropriate) |
| **Inter** | `--font-body` | Body text, UI elements (sans-serif, modern) |

### Custom CSS Animations

| Animation | Duration | Effect |
|---|---|---|
| `gentle-float` | 8s | Subtle vertical translation for memorial cards |
| `soft-glow` | 6s | Opacity pulse for highlighting |
| `fade-in-up` | 0.6s | Entrance animation (translateY + opacity) |
| `accordion-down` | 0.2s | Height expand for accordions |
| `accordion-up` | 0.2s | Height collapse for accordions |

### Utility Classes

| Class | Effect |
|---|---|
| `.stone-texture` | Radial gradient overlay for memorial aesthetic |
| `.wp-content` | Scoped WordPress post styling (headings, lists, quotes, tables, code, images) |

### Border Radius Scale

Derived from `--radius: 0.5rem`:
- `--radius-sm` through `--radius-4xl`

### Vendored Animation Library (`tw-animate.css`)

Provides CSS custom properties for controlling Tailwind animation utilities:
- fade-in, blur-in, zoom-in, spin-in, slide-in (all directions)
- Configurable duration, delay, timing function, fill mode, iteration count

---

## 13. Third-Party Integrations

### 13.1 Supabase

- **Auth**: Email/password + magic link OTP, session cookies via `@supabase/ssr`
- **Database**: PostgreSQL with Row-Level Security, auto-generated TypeScript types
- **Storage**: Private `design-exports` bucket with org-scoped RLS policies
- **Admin API**: Used for user invitations, email lookups, member management
- **Clients**: Browser (anon key), Server (cookie session), Admin (service role key)

### 13.2 Stripe

- **Checkout Sessions**: Created server-side for deposits and merchandise
- **Webhooks**: Listens for `checkout.session.completed` and `checkout.session.expired`
- **Idempotency**: Event IDs stored in `stripe_events` table to prevent duplicate processing
- **Metadata**: All sessions include `order_id`, `org_id`, `prospect_id`, `type`
- **Configuration**: `DEPOSIT_AMOUNT_CENTS` (default $50), `DEPOSIT_CURRENCY` (default USD)

### 13.3 WordPress (Headless CMS)

- **Integration file**: `src/lib/wp.ts`
- **API**: WordPress REST API v2 (`/wp-json/wp/v2/posts`)
- **Features**:
  - Fetch posts with pagination (`per_page`, `page`, `_embed`)
  - Fetch single post by slug
  - Featured image extraction with alt text
  - HTML stripping for excerpts
  - Internal link rewriting (WordPress URLs -> Next.js `/blog/*` routes)
  - Preserves `/wp-content/` media links
- **Caching**: 300-second revalidation, tagged `wp-posts`
- **Hosts**: `markl522.sg-host.com` (primary), `anandi13.sg-host.com` (fallback), `anandi14.sg-host.com` (alternate)

### 13.4 HubSpot

- **Component**: `HubSpotContactForm.tsx`
- **Portal ID**: 245064716
- **Form ID**: `1dc783e1-6731-4469-8121-acc1649cb4e4`
- **Region**: na2
- **Implementation**: Dynamic script injection of HubSpot forms SDK; creates form in a target div
- **Used on**: `/contact-us` page

### 13.5 Google Tag Manager

- **Container ID**: `GTM-KWXLGW3H`
- **Implementation**: Script + noscript tags in root `layout.tsx`
- **Scope**: All pages (global)

### 13.6 Vercel Analytics

- **Package**: `@vercel/analytics/next`
- **Implementation**: `<Analytics />` component in root layout
- **Scope**: All pages (automatic)

---

## 14. Marketing Pages

### Page Architecture Pattern

Most service pages follow a consistent structure:

```
1. Hero Section
   |-- Back link (to /services)
   |-- Badge / category label
   |-- Title (gradient text)
   |-- Description paragraph
   |-- CTA buttons (Contact Us, Request a consultation)

2. Options / Features Grid
   |-- 6 cards in 2-3 column grid
   |-- Each card: icon + title + description

3. Process / How It Works (optional)
   |-- 4-step numbered process
   |-- Each step: number badge + title + description

4. FAQ Accordion (optional)
   |-- 5 collapsible Q&A items

5. Bottom CTA Section
   |-- Muted background card
   |-- Title + description
   |-- Action buttons
```

### Page Inventory

| Page | Sections | Notable Features |
|---|---|---|
| **Homepage** (`/`) | Hero (video BG), value props (3 cards), parallax divider, services grid (7 cards), service area, contact card | Full-bleed layout, FadeIn animations, video background |
| **About Us** (`/about-us`) | Hero, story section, values grid (6), service area, CTA | Decorative duck images |
| **Services** (`/services`) | Hero, memorial options (3), ceremony & support (4), materials info, CTA | ServiceCard sub-component |
| **Traditional Headstones** | Hero, 6 monument types, 4-step process, 5 FAQs, CTA | Accordion FAQ |
| **Columbariums** | Hero, 6 columbarium options, planning process, 5 FAQs, CTA | |
| **Veteran Memorials** | Hero, 6 memorial types, "what we handle" checklist, VA eligibility, CTA | Evergreen color theme |
| **Statues** | Hero, 6 sculpture types, featured artists (Timothy Schmalz, Abundant Blessings), pricing tiers, CTA | 4 price tier cards |
| **Dove Release** | Hero, 6 release options, coordination items, 5 FAQs, CTA | |
| **Grief Coaching** | Hero, 6 support options, important note, referrals/crisis info, 2 testimonials, CTA | Support badge |
| **Design Consultation** | Hero, 7 coverage topics, "what to bring" list, 3 formats, CTA | |
| **Gallery** (`/gallery`) | Hero, category filters, 12 gallery items (3-col grid), CTA | Placeholder content |
| **Cemeteries** (`/cemeteries-we-serve`) | Search/filter UI, paginated directory (25/page), Google Maps links | Server component, async data loading from JSON |
| **Blog** (`/blog`) | Post grid, pagination | WordPress CMS integration |
| **Blog Post** (`/blog/[slug]`) | Featured image, content, WordPress styling | `.wp-content` scoped CSS |
| **FAQs** (`/faqs`) | 3 FAQ cards, contact CTA | Placeholder, expansion planned |
| **Contact Us** (`/contact-us`) | HubSpot form, contact details card | Decorative duck images |
| **Thank You** (`/thank-you`) | Success confirmation, service links | `noindex` robots meta |
| **Terms** (`/terms`) | Placeholder card | Content pending |
| **Privacy** (`/privacy`) | Placeholder card | Content pending |

### Marketing Navigation (`MarketingNav`)

- **Promo banner**: "Limited-time offer" for Free Installation (shown once per session via `sessionStorage`)
- **Desktop**: Sticky, backdrop-blurred header with service dropdown and contact dropdown
- **Mobile**: Sheet-based hamburger menu with full navigation
- **Services dropdown**: Traditional headstones, Columbariums, Veteran memorials, Design consultation, Dove release, Statues, Grief coaching
- **Contact dropdown**: Phone, email, address with icons
- **Theme toggle**: Light/dark/system mode switcher

### Marketing Footer (`MarketingFooter`)

- 4-column grid (responsive)
- Logo + company description
- Explore links: About Us, Services, Gallery, Blog, FAQs
- Contact info: Address, phone, email with Lucide icons
- Copyright with dynamic year

---

## 15. Data Flow Diagrams

### Prospect-to-Order Flow

```
                   Public Website
                        |
                  [Start Design]
                        |
                        v
              DesignStartForm (Client)
              ZIP, Name, Email, Phone
                        |
                        v
              POST /api/prospects --------> Territory Lookup
                        |                   (ZIP -> org_id)
                        |                        |
                        v                        v
              Insert prospect           Assigned org_id
              Insert design_session     (or CORPORATE fallback)
              Log audit event
                        |
                        v
              Redirect to /portal/design/session/[id]
                        |
                        |
          +-------------+-------------+
          |                           |
    Upload Exports              Collect Deposit
          |                           |
    POST .../export             POST .../checkout/deposit
    -> Supabase Storage         -> Create order
    -> Insert design_asset      -> Stripe Checkout Session
    -> Update session           -> Redirect to Stripe
    -> Log audit                      |
                                      v
                              Stripe Webhook
                              checkout.session.completed
                                      |
                                      v
                              Update order -> "paid"
                              Log audit event
```

### Admin Member Invitation Flow

```
Corporate Admin
      |
  [Invite User by Email]
      |
      v
POST /api/admin/members/invite
      |
      +-- Search Auth Admin for email
      |
      +-- User exists?
      |     |
      |     YES -> Upsert org_members with role
      |     |      Log: "add_existing_user"
      |     |
      |     NO  -> Invite via admin.auth.inviteUserByEmail()
      |            Generate action link
      |            Upsert org_members with role
      |            Log: "invite_user"
      |
      v
Return: { userId, invited, actionLink }
```

### Stripe Payment Flow

```
Client                    Server                       Stripe
  |                         |                            |
  |-- POST /checkout/cart ->|                            |
  |   or /checkout/deposit  |                            |
  |                         |-- Insert order ----------->|
  |                         |-- Create Checkout Session ->|
  |                         |<- Session URL -------------|
  |<- Redirect to Stripe --|                            |
  |                         |                            |
  |---------- Customer pays on Stripe.com ------------->|
  |                         |                            |
  |                         |<-- Webhook: completed -----|
  |                         |-- Check stripe_events      |
  |                         |   (idempotency)            |
  |                         |-- Update order -> "paid"   |
  |                         |-- Log audit event          |
  |                         |                            |
  |<-- Redirect to success--|                            |
```

---

## 16. Deployment & Infrastructure

### Deployment Platform

**Vercel** (inferred from `@vercel/analytics`, `.vercel` in `.gitignore`, and Next.js optimization)

### Deployment Mechanism

- **Automatic**: Push to `main` branch triggers Vercel deployment
- **Manual trigger**: Update the `DEPLOY_TRIGGER` file to force redeployment

### Build Configuration

| Setting | Value |
|---|---|
| Build command | `next build` |
| Dev command | `next dev` (Turbopack) / `next dev --webpack` (fallback) |
| Output | Vercel serverless functions + static assets |
| Node target | ES2017 |

### Required Environment Variables (Production)

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | For admin operations |
| `NEXT_PUBLIC_APP_URL` | Yes | Production URL (for Stripe redirects) |
| `CORPORATE_ORG_ID` | Yes | Corporate org UUID |
| `STRIPE_SECRET_KEY` | Yes | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing |
| `WORDPRESS_BLOG_CMS_URL` | Yes | WordPress REST API URL |
| `DEPOSIT_AMOUNT_CENTS` | No | Default: 5000 |
| `DEPOSIT_CURRENCY` | No | Default: usd |

### Stripe Webhook Configuration

The Stripe webhook endpoint must be configured at:
```
https://<your-domain>/api/stripe/webhook
```

Required events:
- `checkout.session.completed`
- `checkout.session.expired`

---

## 17. Security Model

### Authentication Security

| Mechanism | Implementation |
|---|---|
| Session management | Supabase SSR cookies, refreshed on every request via middleware |
| Password requirements | Minimum 6 characters (Zod validation) |
| Magic links | Supabase OTP with configurable redirect |
| Password reset | Supabase `resetPasswordForEmail` |
| Session cookie handling | `httpOnly`, `secure` in production |

### Authorization Layers

```
Layer 1: Middleware (middleware.ts)
  |-- Refreshes Supabase session on every request
  |-- Does NOT block unauthenticated users (handles session only)

Layer 2: Layout Guards (admin/layout.tsx, portal/layout.tsx)
  |-- Admin: Requires corporate_admin role -> redirect to /login
  |-- Portal: Requires any authenticated user -> redirect to /login

Layer 3: API Route Guards
  |-- requireCorporateAdmin() for admin APIs -> 401/403
  |-- Supabase server client for auth-required APIs

Layer 4: Row-Level Security (PostgreSQL)
  |-- All tables have RLS enabled
  |-- Policies use user_org_ids(), is_corporate_admin(), is_org_member()
  |-- Corporate admins bypass org restrictions
  |-- Licensee users scoped to their org(s)

Layer 5: Storage RLS (Supabase Storage)
  |-- design-exports bucket: org-scoped path-based policies
  |-- Read/write/delete restricted to org members + corporate admins
```

### Data Protection

| Concern | Approach |
|---|---|
| Env var validation | Zod schemas; server-only vars never exposed to client |
| Stripe webhook verification | `stripe.webhooks.constructEvent()` with signing secret |
| Webhook idempotency | `stripe_events` table prevents duplicate event processing |
| SQL injection | Supabase client with parameterized queries |
| XSS | React's built-in escaping; WordPress content rendered with `dangerouslySetInnerHTML` in scoped `.wp-content` class |
| CSRF | Supabase cookie-based auth with same-site cookies |
| Service role key | Server-only; used only for admin operations (bootstrap, invite, member management) |
| Price integrity | Order totals computed server-side from database prices, not client-submitted values |
| Audit trail | All material actions logged with actor, org, entity context |

### Role-Based Access Matrix

| Resource | corporate_admin | licensee_owner | licensee_sales | Anonymous |
|---|---|---|---|---|
| Admin dashboard | Full | -- | -- | -- |
| Licensee CRUD | Full | -- | -- | -- |
| Territory management | Full | -- | -- | -- |
| Portal dashboard | -- | Own org | Own org | -- |
| Leads/Prospects | All orgs | Own org | Own org | -- |
| Design sessions | All orgs | Own org | Own org | -- |
| Shop/Products | All | Own org | Own org | -- |
| Orders | All orgs | Own org | Own org | -- |
| Audit log | Full | -- | -- | -- |
| Marketing pages | Full | Full | Full | Full |
| Blog | Full | Full | Full | Full |
| Territory lookup | -- | -- | -- | Full |

---

## Appendix A: NPM Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev` | Development server (Turbopack) |
| `dev:webpack` | `next dev --webpack` | Development server (Webpack fallback) |
| `build` | `next build` | Production build |
| `start` | `next start` | Production server |
| `lint` | `eslint` | Run ESLint |

## Appendix B: File-by-File Reference

### Configuration Files
| File | Purpose |
|---|---|
| `middleware.ts` | Root middleware -- Supabase session refresh |
| `next.config.ts` | Next.js config -- Turbopack root, image remote patterns |
| `tsconfig.json` | TypeScript -- strict mode, `@/*` path alias |
| `postcss.config.mjs` | PostCSS -- Tailwind CSS v4 plugin |
| `eslint.config.mjs` | ESLint -- Next.js core-web-vitals + TypeScript rules |
| `components.json` | shadcn/ui -- New York style, Zinc base, Lucide icons |
| `DEPLOY_TRIGGER` | Touch file to trigger Vercel redeployment |

### Library Files (`src/lib/`)
| File | Exports | Purpose |
|---|---|---|
| `utils.ts` | `cn()` | Tailwind class merging (clsx + tailwind-merge) |
| `env.ts` | `getEnv()`, `Env` | Server-side environment validation (Zod) |
| `env-public.ts` | `getPublicEnv()`, `PublicEnv` | Client-side public env access |
| `stripe.ts` | `getStripe()` | Singleton Stripe client |
| `cemeteries.ts` | `getCemeteries()`, `CemeteryRecord` | Memoized Ohio cemetery data loader |
| `wp.ts` | `getWpPosts()`, `getWpPostBySlug()`, `wpGetFeaturedImage()`, `stripHtml()`, `rewriteWpInternalLinks()` | WordPress headless CMS integration |
| `auth/roles.ts` | `AppRole`, `getMyOrgMembership()`, `isCorporateAdmin()` | Role types and membership resolution |
| `auth/bootstrap.ts` | `bootstrapFirstCorporateAdmin()` | First-time admin setup |
| `auth/requireCorporateAdmin.ts` | `requireCorporateAdmin()` | API route guard |
| `supabase/admin.ts` | `createSupabaseAdminClient()` | Service-role client (bypasses RLS) |
| `supabase/browser.ts` | `createSupabaseBrowserClient()` | Client Component client |
| `supabase/server.ts` | `createSupabaseServerClient()` | Server Component / Route Handler client |
| `supabase/middleware.ts` | `updateSession()` | Middleware session refresh |
| `supabase/database.types.ts` | `Database` | Auto-generated Supabase TypeScript types |
| `marketing/contact.ts` | `MARKETING_CONTACT`, `phoneToTel()`, `MARKETING_PORTAL_URL` | Company contact constants |

## Appendix C: Database Migration History

| Migration | Description |
|---|---|
| `0001_init.sql` | Core schema: all tables, enums, RLS policies, indexes, RLS helper functions |
| `0002_storage_policies.sql` | `design-exports` bucket RLS policies (read/write/delete by org membership) |
| `0003_seed_tag.sql` | Adds `seed_tag` text column + indexes to all tables for safe demo data cleanup |
| `0004_rls_helpers_security_definer.sql` | Recreates `user_org_ids()`, `is_corporate_admin()`, `is_org_member()` as `SECURITY DEFINER` to prevent RLS recursion |
| `0005_org_members_unique.sql` | Adds `UNIQUE(org_id, user_id)` constraint on `org_members` for upsert support |
