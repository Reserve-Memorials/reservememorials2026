import { Heart, Quote, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/marketing/FadeIn";
import { ParallaxSection } from "@/components/marketing/ParallaxSection";

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
    <div className="-mx-4 sm:-mx-6 lg:-mx-10">
      <ParallaxSection imageSrc="/license/license-testimonial-bg.jpg">
        <div className="flex items-center justify-center px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl space-y-10">
            <FadeIn>
              <div className="space-y-3 text-center">
                <Badge
                  variant="secondary"
                  className="bg-white/15 text-white border-white/25 backdrop-blur-sm"
                >
                  Our Vision
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Built on trust and craftsmanship
                </h2>
              </div>
            </FadeIn>

            <div className="grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <FadeIn key={t.attribution} delay={i * 0.15}>
                  <Card className="h-full border-white/10 bg-white/10 shadow-lg backdrop-blur-md">
                    <CardContent className="space-y-4 p-8">
                      <Quote className="h-8 w-8 text-accent/60" />
                      <p className="text-sm leading-relaxed text-white/90 italic">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
                          <t.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {t.attribution}
                          </div>
                          <div className="text-xs text-white/70">
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}
