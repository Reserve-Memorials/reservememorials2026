import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/marketing/FadeIn";

const REVENUE_STREAMS = [
  "Single monuments",
  "Companion monuments",
  "Flat markers",
  "Slant markers",
  "Benches",
  "Cremation memorials and columbariums",
  "Veteran memorials",
  "Custom statues",
  "Design consultation services",
  "Accessories and add-on memorial products",
];

export function LicenseIncomePotential() {
  return (
    <section className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-accent/10 text-accent border-accent/20"
          >
            Business Model
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Income Potential and Business Model
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            A Reserve Memorials licensee can generate revenue through:
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REVENUE_STREAMS.map((stream) => (
            <div
              key={stream}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-muted/40"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-evergreen/10 text-evergreen">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-sm text-foreground">{stream}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          With many monument purchases ranging from several thousand dollars to
          $10,000+ for custom work, the business model allows for meaningful
          revenue per family served.
        </p>
      </FadeIn>
    </section>
  );
}
