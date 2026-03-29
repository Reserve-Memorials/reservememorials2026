import { Heart, Quote, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/marketing/FadeIn";

const TESTIMONIALS = [
  {
    quote:
      "Our mission is to make the memorial experience modern, guided, and compassionate. We\u2019re building a network of licensees who share that vision and want to serve families in their own communities.",
    attribution: "Mark Loboda",
    role: "Founder, Reserve Memorials",
    icon: Heart,
  },
  {
    quote:
      "Families deserve a guided experience when choosing a memorial. Our platform and support system ensure every licensee can deliver that level of care from day one.",
    attribution: "Reserve Memorials",
    role: "Family-Owned Since Day One",
    icon: Shield,
  },
];

export function LicenseTestimonials() {
  return (
    <section className="mx-auto max-w-5xl space-y-10">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            Our Vision
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built on trust and craftsmanship
          </h2>
        </div>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={t.attribution} delay={i * 0.15}>
            <Card className="h-full border-border/60 shadow-sm">
              <CardContent className="space-y-4 p-8">
                <Quote className="h-8 w-8 text-accent/40" />
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                    <t.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {t.attribution}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
