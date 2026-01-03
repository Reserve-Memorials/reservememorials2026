"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Building2, Plus, UserPlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Org = {
  id: string;
  name: string;
  type: "corporate" | "licensee";
  status: "active" | "suspended";
  created_at: string;
};

type MemberRole = "corporate_admin" | "licensee_owner" | "licensee_sales";

type OrgMember = {
  org_id: string;
  user_id: string;
  role: MemberRole;
  created_at: string;
  email: string | null;
};

export default function LicenseesAdminClient({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState<Org[]>([]);
  const [members, setMembers] = useState<OrgMember[]>([]);

  const [createOpen, setCreateOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [creating, setCreating] = useState(false);

  const [inviteEmail, setInviteEmail] = useState<Record<string, string>>({});
  const [inviteRole, setInviteRole] = useState<Record<string, MemberRole>>({});
  const [invitingOrgId, setInvitingOrgId] = useState<string | null>(null);

  const corporateOrg = useMemo(
    () => organizations.find((o) => o.type === "corporate") ?? null,
    [organizations]
  );
  const licensees = useMemo(
    () => organizations.filter((o) => o.type === "licensee"),
    [organizations]
  );

  const membersByOrg = useMemo(() => {
    const m = new Map<string, OrgMember[]>();
    for (const mem of members) {
      const arr = m.get(mem.org_id) ?? [];
      arr.push(mem);
      m.set(mem.org_id, arr);
    }
    for (const [k, v] of m.entries()) {
      v.sort((a, b) => (a.email ?? "").localeCompare(b.email ?? ""));
      m.set(k, v);
    }
    return m;
  }, [members]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/licensees", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed to load");
      setOrganizations(json.organizations ?? []);
      setMembers(json.members ?? []);
    } catch (e) {
      toast.error("Could not load admin data", {
        description: e instanceof Error ? e.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function createLicensee() {
    setCreating(true);
    try {
      const res = await fetch("/api/admin/licensees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newOrgName }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed to create");
      toast.success("Licensee created");
      setNewOrgName("");
      setCreateOpen(false);
      await load();
    } catch (e) {
      toast.error("Could not create licensee", {
        description: e instanceof Error ? e.message : "Unknown error",
      });
    } finally {
      setCreating(false);
    }
  }

  async function invite(org: Org) {
    const email = (inviteEmail[org.id] ?? "").trim();
    const role =
      inviteRole[org.id] ??
      (org.type === "corporate" ? "corporate_admin" : "licensee_owner");

    if (!email) {
      toast.error("Email required");
      return;
    }

    setInvitingOrgId(org.id);
    try {
      const res = await fetch("/api/admin/members/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, orgId: org.id, role }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Invite failed");
      toast.success(json.invited ? "Invite sent" : "User added", {
        description: json.invited
          ? "They’ll receive an email to join."
          : "Existing user now has access.",
      });
      setInviteEmail((s) => ({ ...s, [org.id]: "" }));
      await load();
    } catch (e) {
      toast.error("Could not invite user", {
        description: e instanceof Error ? e.message : "Unknown error",
      });
    } finally {
      setInvitingOrgId(null);
    }
  }

  async function updateRole(orgId: string, userId: string, role: MemberRole) {
    try {
      const res = await fetch("/api/admin/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId, userId, role }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Update failed");
      toast.success("Role updated");
      await load();
    } catch (e) {
      toast.error("Could not update role", {
        description: e instanceof Error ? e.message : "Unknown error",
      });
    }
  }

  async function removeMember(orgId: string, userId: string) {
    if (userId === currentUserId) {
      toast.error("You can’t remove yourself here.");
      return;
    }
    try {
      const res = await fetch("/api/admin/members", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId, userId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Remove failed");
      toast.success("User removed from org");
      await load();
    } catch (e) {
      toast.error("Could not remove member", {
        description: e instanceof Error ? e.message : "Unknown error",
      });
    }
  }

  function roleOptionsForOrg(org: Org): MemberRole[] {
    if (org.type === "corporate") return ["corporate_admin"];
    return ["licensee_owner", "licensee_sales"];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 text-primary" />
            Admin
          </div>
          <h1 className="truncate text-xl font-semibold tracking-tight">Licensees & Users</h1>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="group">
              <Plus className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              New licensee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a licensee organization</DialogTitle>
              <DialogDescription>
                This creates an org record. Then invite users and assign roles.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="org-name">Licensee name</Label>
              <Input
                id="org-name"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                placeholder="Ohio Memorials"
              />
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createLicensee} disabled={creating || newOrgName.trim().length < 2}>
                {creating ? "Creating…" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-8 text-sm text-muted-foreground">Loading…</CardContent>
        </Card>
      ) : null}

      {corporateOrg ? (
        <OrgCard
          org={corporateOrg}
          members={membersByOrg.get(corporateOrg.id) ?? []}
          inviteEmail={inviteEmail[corporateOrg.id] ?? ""}
          onInviteEmail={(v) => setInviteEmail((s) => ({ ...s, [corporateOrg.id]: v }))}
          inviteRole={inviteRole[corporateOrg.id] ?? "corporate_admin"}
          onInviteRole={(v) => setInviteRole((s) => ({ ...s, [corporateOrg.id]: v }))}
          inviting={invitingOrgId === corporateOrg.id}
          roleOptions={roleOptionsForOrg(corporateOrg)}
          onInvite={() => invite(corporateOrg)}
          onUpdateRole={updateRole}
          onRemove={removeMember}
        />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {licensees.map((org) => (
          <OrgCard
            key={org.id}
            org={org}
            members={membersByOrg.get(org.id) ?? []}
            inviteEmail={inviteEmail[org.id] ?? ""}
            onInviteEmail={(v) => setInviteEmail((s) => ({ ...s, [org.id]: v }))}
            inviteRole={inviteRole[org.id] ?? "licensee_owner"}
            onInviteRole={(v) => setInviteRole((s) => ({ ...s, [org.id]: v }))}
            inviting={invitingOrgId === org.id}
            roleOptions={roleOptionsForOrg(org)}
            onInvite={() => invite(org)}
            onUpdateRole={updateRole}
            onRemove={removeMember}
          />
        ))}
      </div>
    </div>
  );
}

function OrgCard({
  org,
  members,
  inviteEmail,
  onInviteEmail,
  inviteRole,
  onInviteRole,
  inviting,
  roleOptions,
  onInvite,
  onUpdateRole,
  onRemove,
}: {
  org: Org;
  members: OrgMember[];
  inviteEmail: string;
  onInviteEmail: (v: string) => void;
  inviteRole: MemberRole;
  onInviteRole: (v: MemberRole) => void;
  inviting: boolean;
  roleOptions: MemberRole[];
  onInvite: () => void;
  onUpdateRole: (orgId: string, userId: string, role: MemberRole) => void;
  onRemove: (orgId: string, userId: string) => void;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate text-base">{org.name}</CardTitle>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="font-mono">
                {org.type}
              </Badge>
              <Badge variant="secondary" className="font-mono">
                {org.status}
              </Badge>
              <span className="font-mono">{org.id.slice(0, 8)}…</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              {members.length} users
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
          <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
            <div className="space-y-1.5">
              <Label>Invite user by email</Label>
              <Input
                value={inviteEmail}
                onChange={(e) => onInviteEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={(v) => onInviteRole(v as MemberRole)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={onInvite} disabled={inviting}>
                <UserPlus className="mr-2 h-4 w-4" />
                {inviting ? "Sending…" : "Invite"}
              </Button>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            If the email already exists, we’ll just grant access + set role.
          </p>
        </div>

        <div className="rounded-lg border border-border/60">
          <div className="max-w-full overflow-x-auto">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((m) => (
                  <TableRow key={`${m.org_id}:${m.user_id}`} className="hover:bg-muted/40">
                    <TableCell className="py-3">
                      <div className="font-medium">{m.email ?? "—"}</div>
                      <div className="font-mono text-xs text-muted-foreground">{m.user_id}</div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={m.role}
                        onValueChange={(v) => onUpdateRole(org.id, m.user_id, v as MemberRole)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemove(org.id, m.user_id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!members.length ? (
                  <TableRow>
                    <TableCell colSpan={3} className="py-6 text-muted-foreground">
                      No users yet.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


