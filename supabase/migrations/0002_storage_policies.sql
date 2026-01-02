-- Storage RLS (design-exports bucket)
-- NOTE: `storage.objects` is owned by `supabase_storage_admin` in Supabase-managed Postgres.
-- In many projects, you cannot `SET ROLE supabase_storage_admin`, and `postgres` is not allowed
-- to CREATE POLICY/ALTER TABLE on `storage.objects`. If you hit permissions errors, use the
-- Supabase Dashboard UI: Storage → Policies.
--
-- IMPORTANT:
-- - Do NOT run this via the Supabase MCP `execute_sql` tool.
--   That runner is not the table owner for `storage.objects` and will fail with:
--   ERROR: 42501: must be owner of table objects
--
-- Prereq: create a private bucket named `design-exports`.

-- RLS is typically already enabled on storage.objects in new Supabase projects.
-- If you are able to run this migration with sufficient privileges, you can keep this line;
-- otherwise remove it.
-- alter table storage.objects enable row level security;

drop policy if exists "design_exports_read" on storage.objects;
create policy "design_exports_read"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'design-exports'
  and (
    public.is_corporate_admin()
    or (split_part(name, '/', 1))::uuid = any(public.user_org_ids())
  )
);

drop policy if exists "design_exports_write" on storage.objects;
create policy "design_exports_write"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'design-exports'
  and (
    public.is_corporate_admin()
    or (split_part(name, '/', 1))::uuid = any(public.user_org_ids())
  )
);

drop policy if exists "design_exports_delete" on storage.objects;
create policy "design_exports_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'design-exports'
  and (
    public.is_corporate_admin()
    or (split_part(name, '/', 1))::uuid = any(public.user_org_ids())
  )
);


