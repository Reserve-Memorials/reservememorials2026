-- Remove demo/seed rows before production.
-- This only deletes rows explicitly tagged with the demo seed_tag.

begin;

with c as (select 'demo_2026_01_03'::text as tag)
delete from public.order_items oi
using public.orders o, c
where oi.order_id = o.id and o.seed_tag = c.tag;

with c as (select 'demo_2026_01_03'::text as tag)
delete from public.orders o using c where o.seed_tag = c.tag;

with c as (select 'demo_2026_01_03'::text as tag)
delete from public.design_assets a using c where a.seed_tag = c.tag;

with c as (select 'demo_2026_01_03'::text as tag)
delete from public.design_sessions s using c where s.seed_tag = c.tag;

with c as (select 'demo_2026_01_03'::text as tag)
delete from public.prospects p using c where p.seed_tag = c.tag;

with c as (select 'demo_2026_01_03'::text as tag)
delete from public.territories t using c where t.seed_tag = c.tag;

with c as (select 'demo_2026_01_03'::text as tag)
delete from public.products p using c where p.seed_tag = c.tag;

with c as (select 'demo_2026_01_03'::text as tag)
delete from public.audit_events e using c where e.seed_tag = c.tag;

with c as (select 'demo_2026_01_03'::text as tag)
delete from public.stripe_events se using c where se.seed_tag = c.tag;

with c as (select 'demo_2026_01_03'::text as tag)
delete from public.organizations o using c where o.seed_tag = c.tag;

commit;


