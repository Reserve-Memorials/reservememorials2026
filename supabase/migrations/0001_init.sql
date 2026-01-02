-- Reserve Memorials MVP schema + RLS
-- Apply via Supabase CLI migrations.

create extension if not exists pgcrypto;

-- Enums
do $$ begin
  create type org_type as enum ('corporate', 'licensee');
exception when duplicate_object then null; end $$;

do $$ begin
  create type org_status as enum ('active', 'suspended');
exception when duplicate_object then null; end $$;

do $$ begin
  create type member_role as enum ('corporate_admin', 'licensee_owner', 'licensee_sales');
exception when duplicate_object then null; end $$;

do $$ begin
  create type prospect_status as enum ('new', 'contacted', 'qualified', 'won', 'lost');
exception when duplicate_object then null; end $$;

do $$ begin
  create type prospect_source as enum ('design', 'manual', 'import');
exception when duplicate_object then null; end $$;

do $$ begin
  create type design_session_status as enum ('started', 'in_progress', 'exported', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type design_asset_type as enum ('image', 'pdf', 'other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_type as enum ('deposit', 'merch');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_status as enum ('pending', 'paid', 'cancelled', 'refunded', 'failed');
exception when duplicate_object then null; end $$;

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Core tables
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type org_type not null,
  status org_status not null default 'active',
  stripe_account_id text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger organizations_set_updated_at
before update on public.organizations
for each row execute function public.set_updated_at();

create table if not exists public.org_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role member_role not null,
  created_at timestamptz not null default now()
);

create index if not exists org_members_user_id_idx on public.org_members(user_id);
create index if not exists org_members_org_id_idx on public.org_members(org_id);

create table if not exists public.territories (
  id uuid primary key default gen_random_uuid(),
  zip text not null,
  org_id uuid not null references public.organizations(id) on delete restrict,
  active_from date not null,
  active_to date null,
  priority int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists territories_zip_active_idx on public.territories(zip, active_from, active_to);

create trigger territories_set_updated_at
before update on public.territories
for each row execute function public.set_updated_at();

create table if not exists public.prospects (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete restrict,
  zip text not null,
  name text not null,
  email text not null,
  phone text not null,
  status prospect_status not null default 'new',
  source prospect_source not null default 'design',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists prospects_org_created_idx on public.prospects(org_id, created_at);

create trigger prospects_set_updated_at
before update on public.prospects
for each row execute function public.set_updated_at();

create table if not exists public.design_sessions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete restrict,
  prospect_id uuid not null references public.prospects(id) on delete cascade,
  status design_session_status not null default 'started',
  metadata jsonb not null default '{}'::jsonb,
  export_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger design_sessions_set_updated_at
before update on public.design_sessions
for each row execute function public.set_updated_at();

create table if not exists public.design_assets (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete restrict,
  design_session_id uuid not null references public.design_sessions(id) on delete cascade,
  bucket text not null,
  path text not null,
  type design_asset_type not null default 'other',
  created_at timestamptz not null default now()
);

create index if not exists design_assets_session_idx on public.design_assets(design_session_id, created_at desc);

-- Public merch catalog table (RLS off by default for public read)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text null,
  price_cents int not null,
  currency text not null default 'usd',
  active boolean not null default true,
  image_asset_path text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete restrict,
  prospect_id uuid null references public.prospects(id) on delete set null,
  type order_type not null,
  status order_status not null default 'pending',
  total_cents int not null,
  currency text not null default 'usd',
  stripe_checkout_session_id text not null,
  stripe_payment_intent_id text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_org_created_status_idx on public.orders(org_id, created_at, status);

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid null references public.products(id) on delete set null,
  name text not null,
  quantity int not null,
  unit_price_cents int not null,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid null references auth.users(id) on delete set null,
  org_id uuid null references public.organizations(id) on delete set null,
  event_type text not null,
  entity_type text not null,
  entity_id uuid null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_events_created_idx on public.audit_events(created_at desc);

-- Stripe webhook idempotency
create table if not exists public.stripe_events (
  event_id text primary key,
  type text not null,
  created_at timestamptz not null default now()
);

-- RLS helpers
create or replace function public.user_org_ids()
returns uuid[]
language sql
stable
as $$
  select coalesce(array_agg(org_id), '{}'::uuid[])
  from public.org_members
  where user_id = auth.uid()
$$;

create or replace function public.is_corporate_admin()
returns boolean
language sql
stable
as $$
  select exists(
    select 1
    from public.org_members
    where user_id = auth.uid()
      and role = 'corporate_admin'
  )
$$;

-- Enable RLS on private tables
alter table public.organizations enable row level security;
alter table public.org_members enable row level security;
alter table public.territories enable row level security;
alter table public.prospects enable row level security;
alter table public.design_sessions enable row level security;
alter table public.design_assets enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.audit_events enable row level security;
alter table public.stripe_events enable row level security;

-- organizations
drop policy if exists organizations_select on public.organizations;
create policy organizations_select
on public.organizations
for select
to authenticated
using (
  public.is_corporate_admin()
  or id = any(public.user_org_ids())
);

drop policy if exists organizations_write on public.organizations;
create policy organizations_write
on public.organizations
for all
to authenticated
using (public.is_corporate_admin())
with check (public.is_corporate_admin());

-- org_members
drop policy if exists org_members_select on public.org_members;
create policy org_members_select
on public.org_members
for select
to authenticated
using (
  public.is_corporate_admin()
  or user_id = auth.uid()
  or org_id = any(public.user_org_ids())
);

drop policy if exists org_members_write on public.org_members;
create policy org_members_write
on public.org_members
for all
to authenticated
using (public.is_corporate_admin())
with check (public.is_corporate_admin());

-- territories (licensees can read their own; only corporate can write)
drop policy if exists territories_select on public.territories;
create policy territories_select
on public.territories
for select
to authenticated
using (
  public.is_corporate_admin()
  or org_id = any(public.user_org_ids())
);

drop policy if exists territories_write on public.territories;
create policy territories_write
on public.territories
for all
to authenticated
using (public.is_corporate_admin())
with check (public.is_corporate_admin());

-- org-scoped tables (prospects, sessions, assets, orders, items, audit)
create or replace function public.is_org_member(target_org_id uuid)
returns boolean
language sql
stable
as $$
  public.is_corporate_admin() or target_org_id = any(public.user_org_ids())
$$;

-- prospects
drop policy if exists prospects_select on public.prospects;
create policy prospects_select on public.prospects
for select to authenticated
using (public.is_org_member(org_id));

drop policy if exists prospects_write on public.prospects;
create policy prospects_write on public.prospects
for all to authenticated
using (public.is_org_member(org_id))
with check (public.is_org_member(org_id));

-- design_sessions
drop policy if exists design_sessions_select on public.design_sessions;
create policy design_sessions_select on public.design_sessions
for select to authenticated
using (public.is_org_member(org_id));

drop policy if exists design_sessions_write on public.design_sessions;
create policy design_sessions_write on public.design_sessions
for all to authenticated
using (public.is_org_member(org_id))
with check (public.is_org_member(org_id));

-- design_assets
drop policy if exists design_assets_select on public.design_assets;
create policy design_assets_select on public.design_assets
for select to authenticated
using (public.is_org_member(org_id));

drop policy if exists design_assets_write on public.design_assets;
create policy design_assets_write on public.design_assets
for all to authenticated
using (public.is_org_member(org_id))
with check (public.is_org_member(org_id));

-- orders
drop policy if exists orders_select on public.orders;
create policy orders_select on public.orders
for select to authenticated
using (public.is_org_member(org_id));

drop policy if exists orders_write on public.orders;
create policy orders_write on public.orders
for all to authenticated
using (public.is_org_member(org_id))
with check (public.is_org_member(org_id));

-- order_items (joined through orders)
drop policy if exists order_items_select on public.order_items;
create policy order_items_select on public.order_items
for select to authenticated
using (
  public.is_corporate_admin()
  or exists(
    select 1 from public.orders o
    where o.id = order_id
      and o.org_id = any(public.user_org_ids())
  )
);

drop policy if exists order_items_write on public.order_items;
create policy order_items_write on public.order_items
for all to authenticated
using (
  public.is_corporate_admin()
  or exists(
    select 1 from public.orders o
    where o.id = order_id
      and o.org_id = any(public.user_org_ids())
  )
)
with check (
  public.is_corporate_admin()
  or exists(
    select 1 from public.orders o
    where o.id = order_id
      and o.org_id = any(public.user_org_ids())
  )
);

-- audit_events
drop policy if exists audit_events_select on public.audit_events;
create policy audit_events_select on public.audit_events
for select to authenticated
using (public.is_corporate_admin() or (org_id is not null and org_id = any(public.user_org_ids())));

drop policy if exists audit_events_write on public.audit_events;
create policy audit_events_write on public.audit_events
for insert to authenticated
with check (public.is_corporate_admin() or (org_id is not null and org_id = any(public.user_org_ids())));

-- stripe_events (corporate-only)
drop policy if exists stripe_events_select on public.stripe_events;
create policy stripe_events_select on public.stripe_events
for select to authenticated
using (public.is_corporate_admin());

drop policy if exists stripe_events_write on public.stripe_events;
create policy stripe_events_write on public.stripe_events
for insert to authenticated
with check (public.is_corporate_admin());

-- Storage RLS (design-exports bucket)
-- NOTE: You still need to create the bucket "design-exports" in the Supabase dashboard (private).
do $$ begin
  alter table storage.objects enable row level security;
exception when undefined_table then null; end $$;

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


