import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SERVICES = [
  {
    href: "/columbariums",
    title: "Columbariums",
    description: "Custom-designed columbariums for churches and cemeteries—beautiful, durable, and scalable.",
  },
  {
    href: "/traditional-headstones",
    title: "Traditional headstones",
    description: "Classic upright and flat markers with premium stone, engraving, and thoughtful layout guidance.",
  },
  {
    href: "/veteran-memorials",
    title: "Veteran memorials",
    description: "Honor service with respectful designs, emblems, and clear guidance on details and options.",
  },
  {
    href: "/design-consultation",
    title: "Design consultation",
    description: "A guided session to choose style, layout, materials, and timeline confidently.",
  },
  {
    href: "/dove-release",
    title: "Dove release",
    description: "A meaningful addition to memorial and graveside services—handled professionally with care.",
  },
  {
    href: "/statues",
    title: "Statues",
    description: "Custom features and sculptures that capture a story with craftsmanship and restraint.",
  },
  {
    href: "/grief-coaching",
    title: "Grief coaching",
    description: "Support resources for families navigating loss—compassionate, practical, and human.",
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[14]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_60%)]/[10]" />
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Badge className="w-fit" variant="secondary">
            Services
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Memorial services designed for clarity and care.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            From traditional headstones to columbariums and custom memorials, our process is guided,
            transparent, and built for quality.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="group">
              <Link href="/contact-us">
                Request a consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/gallery">See examples</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {SERVICES.map((s) => (
          <ServiceCard key={s.href} href={s.href} title={s.title} description={s.description} />
        ))}
      </section>

      <Card className="overflow-hidden">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 py-6">
          <div className="text-sm text-muted-foreground">
            Each service has a full detail page with a clearer overview and next steps.
          </div>
          <Button asChild variant="secondary" className="group">
            <Link href="/contact-us">
              Contact us
              <BadgeCheck className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ServiceCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="relative h-full overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,var(--color-primary),transparent_60%)]/[12]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_60%)]/[10]" />
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Service
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="inline-flex items-center text-sm font-medium">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

