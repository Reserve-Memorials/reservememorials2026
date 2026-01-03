-- Fix RLS recursion / "stack depth limit exceeded"
-- The policies reference helper functions that query `public.org_members`, which itself has RLS.
-- Making these helpers SECURITY DEFINER (owned by table owner) prevents infinite recursion.

create or replace function public.user_org_ids()
returns uuid[]
language sql
stable
security definer
set search_path = public, auth
as $$
  select coalesce(array_agg(org_id), '{}'::uuid[])
  from public.org_members
  where user_id = auth.uid()
$$;

create or replace function public.is_corporate_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists(
    select 1
    from public.org_members
    where user_id = auth.uid()
      and role = 'corporate_admin'
  )
$$;

create or replace function public.is_org_member(target_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select public.is_corporate_admin() or target_org_id = any(public.user_org_ids())
$$;


