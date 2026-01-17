import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PORTAL_URL = "https://portal.reservememorials.com";

export function ServiceDetailPage({
  eyebrow,
  title,
  description,
  highlights,
}: {
  eyebrow: string;
  title: string;
  description: string;
  highlights: { title: string; desc: string }[];
}) {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[16]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_60%)]/[12]" />
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge className="w-fit" variant="secondary">
              {eyebrow}
            </Badge>
            <Link className="text-sm text-muted-foreground hover:text-foreground transition" href="/services">
              ← Back to services
            </Link>
          </div>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="bg-linear-to-r from-primary via-chart-4 to-primary bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">{description}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="group">
              <Link href="/contact-us">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/design-consultation">Request a consultation</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <Pill icon={<BadgeCheck className="h-3.5 w-3.5" />} text="Clear guidance" />
            <Pill icon={<MapPin className="h-3.5 w-3.5" />} text="Local coordination" />
            <Pill icon={<Sparkles className="h-3.5 w-3.5" />} text="Premium finish" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((h) => (
          <Card key={h.title} className="group relative overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,var(--color-primary),transparent_60%)]/[12]" />
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_60%)]/[10]" />
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg">{h.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{h.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="text-sm font-medium">Not sure which option fits?</div>
            <div className="text-sm text-muted-foreground">We’ll help you pick a direction quickly and confidently.</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary" className="group">
              <Link href="/contact-us">
                Talk to an advisor
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">Explore services</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
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

