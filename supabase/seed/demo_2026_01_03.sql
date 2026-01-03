-- Demo seed data for Reserve Memorials (tagged).
-- Tag: demo_2026_01_03
--
-- This is the same seed that was applied via Supabase MCP.
-- You can re-run it safely; it deletes previous rows with the same seed_tag first.

begin;

with c as (
  select
    'demo_2026_01_03'::text as tag,
    'ae87184d-2218-4cb3-8353-41554bc02082'::uuid as corporate_org_id
)
-- cleanup in dependency order
, del_items as (
  delete from public.order_items oi
  using public.orders o, c
  where oi.order_id = o.id and o.seed_tag = c.tag
  returning oi.id
)
, del_orders as (
  delete from public.orders o using c
  where o.seed_tag = c.tag
  returning o.id
)
, del_assets as (
  delete from public.design_assets a using c
  where a.seed_tag = c.tag
  returning a.id
)
, del_sessions as (
  delete from public.design_sessions s using c
  where s.seed_tag = c.tag
  returning s.id
)
, del_prospects as (
  delete from public.prospects p using c
  where p.seed_tag = c.tag
  returning p.id
)
, del_territories as (
  delete from public.territories t using c
  where t.seed_tag = c.tag
  returning t.id
)
, del_products as (
  delete from public.products p using c
  where p.seed_tag = c.tag
  returning p.id
)
, del_audit as (
  delete from public.audit_events e using c
  where e.seed_tag = c.tag
  returning e.id
)
, del_stripe as (
  delete from public.stripe_events se using c
  where se.seed_tag = c.tag
  returning se.event_id
)
, del_orgs as (
  delete from public.organizations o using c
  where o.seed_tag = c.tag
  returning o.id
)
select 1;

with c as (
  select
    'demo_2026_01_03'::text as tag,
    'ae87184d-2218-4cb3-8353-41554bc02082'::uuid as corporate_org_id
)
, licensee_org as (
  insert into public.organizations (name, type, status, stripe_account_id, seed_tag)
  values ('Ohio Memorials (Demo Licensee)', 'licensee', 'active', null, (select tag from c))
  returning id
)
insert into public.territories (zip, org_id, active_from, active_to, priority, seed_tag)
select * from (
  values
    ('43215'::text, (select id from licensee_org), '2025-01-01'::date, null::date, 10::int, (select tag from c)),
    ('44114'::text, (select id from licensee_org), '2025-01-01'::date, null::date, 10::int, (select tag from c)),
    ('45202'::text, (select id from licensee_org), '2025-01-01'::date, null::date, 10::int, (select tag from c)),
    ('44308'::text, (select id from licensee_org), '2025-01-01'::date, null::date, 10::int, (select tag from c)),
    ('45402'::text, (select id from licensee_org), '2025-01-01'::date, null::date, 10::int, (select tag from c)),
    ('43604'::text, (select id from licensee_org), '2025-01-01'::date, null::date, 10::int, (select tag from c))
) as v(zip, org_id, active_from, active_to, priority, seed_tag);

commit;


