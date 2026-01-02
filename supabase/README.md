# Supabase setup (MVP)

## 1) Run migrations

This repo includes:

- `supabase/migrations/0001_init.sql`
- `supabase/migrations/0002_storage_policies.sql` (Storage RLS policies)

Apply it via Supabase CLI migrations (recommended) or by running the SQL in the Supabase SQL editor.

## 2) Create the corporate org (for “unassigned” ZIP routing)

Create an `organizations` row with `type='corporate'` and note its UUID.

Set that UUID as:

- `CORPORATE_ORG_ID` in `.env.local`

## 3) Create your first admin user

1. Create a Supabase Auth user (via dashboard auth UI or sign up in-app).
2. Add an `org_members` row mapping that user to the corporate org with `role='corporate_admin'`.

Example SQL (replace the UUIDs):

```sql
insert into public.org_members (org_id, user_id, role)
values ('<corporate_org_uuid>'::uuid, '<auth_user_uuid>'::uuid, 'corporate_admin');
```

## 4) Storage bucket

Create a **private** bucket named:

- `design-exports`

Then apply `supabase/migrations/0002_storage_policies.sql`.

Important:

- Run it in the **Supabase Dashboard → SQL Editor** while connected as **`postgres`** (DB owner), or via **Supabase CLI** using the project’s DB password.
- Do **not** run it via the Supabase MCP `execute_sql` tool — that runner is not the owner of `storage.objects` and will fail with `ERROR: 42501: must be owner of table objects`.

Those policies allow read/write based on org membership, assuming paths are shaped like:

- `<org_id>/<design_session_id>/...`

## 5) Seed products (optional)

Add a few `products` rows so `/shop` has items to display.


