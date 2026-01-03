-- Prevent duplicate memberships for the same user/org.
-- This makes role updates safe via UPSERT.

do $$
begin
  alter table public.org_members
    add constraint org_members_org_user_unique unique (org_id, user_id);
exception
  when duplicate_object then null;
end $$;


