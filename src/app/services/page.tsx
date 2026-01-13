import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServicesPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[14]" />
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
        <ServiceCard
          title="Columbariums"
          description="Durable, beautiful spaces for remembrance and community."
        />
        <ServiceCard
          title="Traditional headstones"
          description="Classic upright and flat markers in premium stone."
        />
        <ServiceCard
          title="Veteran memorials"
          description="Respectful designs with clear guidance on details and options."
        />
        <ServiceCard
          title="Design consultation"
          description="A guided session to choose style, layout, and timeline confidently."
        />
        <ServiceCard
          title="Custom statues & features"
          description="Unique elements that honor a story with craftsmanship."
        />
        <ServiceCard
          title="Grief coaching"
          description="Support resources for families navigating loss."
        />
      </section>

      <Card className="overflow-hidden">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 py-6">
          <div className="text-sm text-muted-foreground">
            Next: we’ll build out service detail pages (SEO + gallery + FAQs) one-by-one.
          </div>
          <Button asChild variant="secondary" className="group">
            <Link href="/contact-us">
              Contact us
              <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="group relative overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12),transparent_60%)]" />
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

