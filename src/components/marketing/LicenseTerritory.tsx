import { Globe, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/marketing/FadeIn";
import { OhioMap } from "@/components/marketing/OhioMap";

export function LicenseTerritory() {
  return (
    <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
      <div
        className="absolute -right-16 -bottom-16 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85_/_0.12),transparent)] blur-3xl animate-gentle-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Left: Content */}
          <div className="space-y-8">
            <FadeIn>
              <div className="space-y-3">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  <Globe className="mr-1.5 h-3.5 w-3.5" />
                  Territories
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Territories Available Nationwide
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-muted-foreground">
                We&apos;re actively growing our licensee network. Territories
                are currently available in Ohio and expanding across the United
                States. Each licensee receives a protected geographic territory
                defined by ZIP codes &mdash; no one else in the Reserve
                Memorials network can operate in your area.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-evergreen/10 text-evergreen border-evergreen/20"
                >
                  <MapPin className="mr-1 h-3 w-3" />
                  Ohio (Available Now)
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-muted text-muted-foreground border-border/60"
                >
                  Expanding Nationwide
                </Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Button size="lg" asChild>
                <a href="#license-inquiry-form">
                  Check Territory Availability
                </a>
              </Button>
            </FadeIn>
          </div>

          {/* Right: Ohio Map */}
          <FadeIn delay={0.2}>
            <OhioMap className="mx-auto h-[340px] w-full max-w-[300px] lg:h-[400px] lg:max-w-[340px]" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
