# Reserve Memorials (MVP)

Next.js (App Router) + Supabase (Postgres/Auth/RLS/Storage) + Stripe (Checkout/Webhooks).

PRD lives in `docs/PRD.md`.

## Local dev

1. Install deps

```bash
npm install
```

2. Configure env

Copy `env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- `CORPORATE_ORG_ID` (org UUID used for “unassigned” routing)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## RBAC (roles)

RBAC is modeled via `public.org_members.role` with roles:

- `corporate_admin` (full corporate visibility / can manage orgs + members)
- `licensee_owner`
- `licensee_sales`

For a brand-new project, the app will **auto-assign the first logged-in user** as a `corporate_admin`
for `CORPORATE_ORG_ID` (requires `SUPABASE_SERVICE_ROLE_KEY`). After a corporate admin exists, this becomes a no-op.

## Corporate admin features (MVP)

Corporate admins can manage:

- Licensee organizations (create)
- Users (invite by email, assign/update roles, remove users from orgs)

Entry point: `/admin/licensees`

## Demo / seed data (tagged)

We tag demo rows with `seed_tag = 'demo_2026_01_03'` so it’s easy to flush before production.

- **Demo seed script**: `supabase/seed/demo_2026_01_03.sql`
- **Cleanup script**: `supabase/seed/cleanup_demo.sql`

3. Apply DB migrations

This repo includes a first migration at `supabase/migrations/0001_init.sql`.

Recommended flow:

- Install Supabase CLI
- Link to your Supabase project
- Run migrations

4. Create storage bucket

In Supabase Storage, create a **private** bucket named:

- `design-exports`

5. Run dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Stripe webhook

Point Stripe to:

- `POST /api/stripe/webhook`

and set `STRIPE_WEBHOOK_SECRET` accordingly.
