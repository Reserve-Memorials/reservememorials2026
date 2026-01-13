import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  GalleryHorizontal,
  Gem,
  MapPin,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PORTAL_URL = "https://portal.reservememorials.com";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[16]" />
        <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,var(--color-primary),transparent_55%)]/[18] blur-2xl" />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Badge className="w-fit" variant="secondary">
              ReserveMemorials.com
            </Badge>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Beautiful memorials, designed with clarity — crafted with care.
            </h1>
            <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              We help families and communities create timeless memorials through a guided design
              experience, transparent timelines, and local service.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group">
                <a href={`${PORTAL_URL}/design`}>
                  Start your design
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/contact-us">
                  Talk to an advisor
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Pill icon={<ShieldCheck className="h-3.5 w-3.5" />} text="Clear guidance" />
              <Pill icon={<Timer className="h-3.5 w-3.5" />} text="Fast turnaround" />
              <Pill icon={<Gem className="h-3.5 w-3.5" />} text="Premium materials" />
            </div>
          </div>

          <Card className="relative overflow-hidden border-border/60 bg-background/50">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12),transparent_60%)]" />
            <CardHeader className="space-y-2">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                What you get
              </div>
              <CardTitle className="text-xl">A guided, modern experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FeatureRow
                icon={<BadgeCheck className="h-4 w-4 text-primary" />}
                title="Design review"
                desc="We help you choose style, materials, and layout with confidence."
              />
              <FeatureRow
                icon={<MapPin className="h-4 w-4 text-primary" />}
                title="Local coordination"
                desc="We coordinate with your local team for measurements and installation."
              />
              <FeatureRow
                icon={<ShieldCheck className="h-4 w-4 text-primary" />}
                title="Reliable updates"
                desc="Clear milestones so you always know what’s next."
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services preview */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Services</div>
            <h2 className="text-2xl font-semibold tracking-tight">Memorials made to last</h2>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/services">
              View all services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <MarketingCard
            icon={<Gem className="h-4 w-4" />}
            title="Traditional headstones"
            description="Classic upright and flat markers in premium stone."
            href="/services"
          />
          <MarketingCard
            icon={<Sparkles className="h-4 w-4" />}
            title="Columbariums"
            description="Elegant, durable spaces for remembrance and community."
            href="/services"
          />
          <MarketingCard
            icon={<BadgeCheck className="h-4 w-4" />}
            title="Veteran memorials"
            description="Honor service with respectful designs and details."
            href="/services"
          />
        </div>
      </section>

      {/* Gallery + Blog teaser */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="group relative overflow-hidden border-border/60 bg-card/60 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12),transparent_60%)]" />
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GalleryHorizontal className="h-4 w-4 text-primary" />
              Gallery
            </div>
            <CardTitle className="text-xl">Explore recent work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              A curated selection of styles, materials, and finishes — with real examples.
            </p>
            <Button asChild variant="ghost" className="px-0">
              <Link href="/gallery" className="group/link">
                Browse the gallery
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-border/60 bg-card/60 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12),transparent_60%)]" />
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              Blog
            </div>
            <CardTitle className="text-xl">Guides & planning tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Clear articles on design choices, timelines, and what to expect.
            </p>
            <Button asChild variant="ghost" className="px-0">
              <Link href="/blog" className="group/link">
                Read the blog
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-primary),transparent_60%)]/[14]" />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Ready when you are</div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Start your design — we’ll guide the rest.
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Begin with a few details. We’ll route you to the right team and help you move forward confidently.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="group">
              <a href={`${PORTAL_URL}/design`}>
                Start your design
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact-us">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1">
      <span className="text-primary">{icon}</span>
      <span>{text}</span>
    </span>
  );
}

function FeatureRow({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-border/50">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function MarketingCard({
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
    <Card className="group relative overflow-hidden border-border/60 bg-card/60 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12),transparent_60%)]" />
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
    </Card>
  );
}
