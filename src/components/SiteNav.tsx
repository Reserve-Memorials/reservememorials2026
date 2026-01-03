import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-primary/90 to-primary text-primary-foreground shadow-sm ring-1 ring-border/50 transition-transform group-hover:-translate-y-0.5">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">
              Reserve Memorials
            </div>
            <div className="text-xs text-muted-foreground">
              Territories • Deposits • Merch
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/design" icon={<Sparkles className="h-4 w-4" />}>
            Design
          </NavLink>
          <NavLink href="/shop" icon={<ShoppingBag className="h-4 w-4" />}>
            Shop
          </NavLink>
          <NavLink
            href="/portal"
            icon={<LayoutDashboard className="h-4 w-4" />}
          >
            Portal
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild size="sm" className="group">
            <Link href="/login">
              Login
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition",
        "hover:bg-accent hover:text-foreground hover:shadow-sm"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
