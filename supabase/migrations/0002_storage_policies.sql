-- Storage RLS (design-exports bucket)
-- Run this as the database owner (e.g. via Supabase SQL editor as `postgres`,
-- or via Supabase CLI configured with the database password).
--
-- Prereq: create a private bucket named `design-exports`.

alter table storage.objects enable row level security;

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


