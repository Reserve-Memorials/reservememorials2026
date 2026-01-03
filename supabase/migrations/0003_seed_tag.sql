-- Add an explicit tag to mark demo/seed data so it can be flushed before production.
-- Safe to apply multiple times.

alter table if exists public.organizations add column if not exists seed_tag text null;
alter table if exists public.territories add column if not exists seed_tag text null;
alter table if exists public.prospects add column if not exists seed_tag text null;
alter table if exists public.design_sessions add column if not exists seed_tag text null;
alter table if exists public.design_assets add column if not exists seed_tag text null;
alter table if exists public.products add column if not exists seed_tag text null;
alter table if exists public.orders add column if not exists seed_tag text null;
alter table if exists public.order_items add column if not exists seed_tag text null;
alter table if exists public.audit_events add column if not exists seed_tag text null;
alter table if exists public.stripe_events add column if not exists seed_tag text null;

create index if not exists organizations_seed_tag_idx on public.organizations(seed_tag);
create index if not exists territories_seed_tag_idx on public.territories(seed_tag);
create index if not exists prospects_seed_tag_idx on public.prospects(seed_tag);
create index if not exists design_sessions_seed_tag_idx on public.design_sessions(seed_tag);
create index if not exists design_assets_seed_tag_idx on public.design_assets(seed_tag);
create index if not exists products_seed_tag_idx on public.products(seed_tag);
create index if not exists orders_seed_tag_idx on public.orders(seed_tag);
create index if not exists order_items_seed_tag_idx on public.order_items(seed_tag);
create index if not exists audit_events_seed_tag_idx on public.audit_events(seed_tag);
create index if not exists stripe_events_seed_tag_idx on public.stripe_events(seed_tag);


