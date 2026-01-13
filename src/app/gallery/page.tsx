import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CATEGORIES = [
  "All",
  "Headstones",
  "Columbariums",
  "Veterans",
  "Lettering",
  "Custom features",
];

export default function GalleryPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[14]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_60%)]/[10]" />
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Badge className="w-fit" variant="secondary">
            Gallery
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Crafted work, curated with intention.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            We’ll add real project photos here next. For now, this is a polished placeholder so the marketing nav never 404s.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="group">
              <Link href="/contact-us">
                Request examples
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">View services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden border-border/60 bg-card/60 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,var(--color-primary),transparent_60%)]/[12]" />
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_60%)]/[10]" />

              <div className="relative aspect-video bg-muted">
                <div className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[10]" />
                <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_60%)]/[10]" />
                <div className="absolute inset-0 grid place-items-center text-muted-foreground">
                  <div className="flex items-center gap-2 text-sm">
                    <ImageIcon className="h-4 w-4 text-primary" />
                    Gallery image placeholder
                  </div>
                </div>
              </div>
              <CardHeader className="space-y-1">
                <CardTitle className="text-base">Project example {idx + 1}</CardTitle>
                <div className="text-xs text-muted-foreground">Category • Location</div>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-sm text-muted-foreground">
                  Replace with real images + short captions for SEO and trust.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

