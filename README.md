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
- `CORPORATE_ORG_ID` (org UUID used for "unassigned" routing)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `WORDPRESS_URL` (optional - URL of your WordPress site for blog content, defaults to https://anandi13.sg-host.com)

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

## WordPress Blog Integration

The marketing site (`/blog`) pulls content from WordPress via the REST API.

### Configuration

Set `WORDPRESS_URL` in your `.env.local` file (defaults to `https://anandi13.sg-host.com`):

```bash
WORDPRESS_URL=https://your-wordpress-site.com
```

### How it works

- **Blog listing**: `/blog` fetches published posts with `_embed=1` to include featured images
- **Blog detail**: `/blog/[slug]` fetches a single post by slug
- **Featured images**: Automatically extracted from WordPress `_embedded['wp:featuredmedia']`
- **Caching**: Posts are cached for 5 minutes (300s) by default

### Requirements

Your WordPress site must:
- Have the REST API enabled (enabled by default in modern WordPress)
- Set posts to "Published" status (not Draft or Private)
- Be accessible from your deployment environment

### Troubleshooting

**Images not showing:**
- Verify featured images are set in WordPress
- Check that `WORDPRESS_URL` is correct and accessible
- Ensure CORS isn't blocking requests (not usually an issue with WordPress REST API)

**404 errors on blog posts:**
- Confirm posts are published in WordPress
- Check that the WordPress REST API is accessible at `{WORDPRESS_URL}/wp-json/wp/v2/posts`
- Verify the post slug matches the URL you're trying to access
