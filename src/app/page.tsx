import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,theme(colors.primary/18),transparent_60%)]" />

        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Badge className="w-fit" variant="secondary">
            Production-scalable MVP
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Territory-based lead routing + deposits + merch — in one clean
            portal.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Secure, role-based dashboards for corporate admins and licensees.
            Territory routing, design sessions, and Stripe payments are available after sign-in.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group">
              <Link href="/login">
                Sign in
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/portal">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Go to dashboard
              </Link>
            </Button>
          </div>

          <div className="pt-2 text-sm text-muted-foreground">
            Setup: copy{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">
              env.example
            </code>{" "}
            to{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">
              .env.local
            </code>
            .
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          icon={<Sparkles className="h-4 w-4" />}
          title="Design intake"
          description="Capture ZIP + contact, create a session, upload exports, and move to deposit checkout (logged in)."
          href="/portal/design"
        />
        <FeatureCard
          icon={<LayoutDashboard className="h-4 w-4" />}
          title="Licensee portal"
          description="Leads, sessions, and orders scoped by org (RLS). Built for speed and clarity."
          href="/portal"
        />
        <FeatureCard
          icon={<LayoutDashboard className="h-4 w-4" />}
          title="Merch store"
          description="DB-backed catalog + cart checkout. Totals validated server-side before Stripe (logged in)."
          href="/portal/shop"
        />
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Card className="group relative overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-border/50 transition group-hover:bg-primary/15">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button asChild variant="ghost" className="px-0">
          <Link href={href} className="group/link">
            Explore
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </Button>
      </CardContent>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12),transparent_60%)]" />
    </Card>
  );
}
