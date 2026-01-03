"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export type SidebarItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
};

export type SidebarSection = {
  title?: string;
  items: SidebarItem[];
};

export function DashboardShell({
  variant,
  title,
  userEmail,
  sections,
  children,
}: {
  variant: "admin" | "portal";
  title: string;
  userEmail: string;
  sections: SidebarSection[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebar = (
    <aside className="flex h-full flex-col">
      <div className="px-4 pb-4 pt-5">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-2xl ring-1 ring-border/60",
              variant === "admin"
                ? "bg-gradient-to-br from-primary/25 via-primary/10 to-background text-primary"
                : "bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-background text-emerald-500"
            )}
          >
            <span className="text-sm font-semibold tracking-tight">
              {variant === "admin" ? "RM" : "LP"}
            </span>
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-tight">{title}</div>
            <div className="truncate text-xs text-muted-foreground">{userEmail}</div>
          </div>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 space-y-4 overflow-y-auto px-2 py-4">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {section.title ? (
              <div className="px-3 text-[11px] font-medium tracking-wider text-muted-foreground/80">
                {section.title.toUpperCase()}
              </div>
            ) : null}
            <div className="space-y-1">
              {section.items.map((item) => {
                const active =
                  pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition",
                      active
                        ? "bg-primary/10 text-foreground ring-1 ring-primary/15"
                        : "text-foreground/80 hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-xl ring-1 ring-border/60 transition",
                          active ? "bg-background" : "bg-background/60 group-hover:bg-background"
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate font-medium">{item.label}</span>
                    </span>
                    {item.badge ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3">
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/logout">Logout</Link>
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="grid w-full gap-6 px-4 py-6 md:grid-cols-[260px_1fr] md:px-6 lg:px-10">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <div className="sticky top-[5.25rem] h-[calc(100vh-6.5rem)] overflow-hidden rounded-2xl border border-border/60 bg-background/60 backdrop-blur">
            {sidebar}
          </div>
        </div>

        {/* Main */}
        <div className="space-y-6">
          {/* Mobile header */}
          <div className="flex items-center justify-between gap-3 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                {sidebar}
              </SheetContent>
            </Sheet>

            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-tight">{title}</div>
              <div className="truncate text-xs text-muted-foreground">{userEmail}</div>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}


