import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/marketing/FadeIn";

export function LicenseWhyViable() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            The Opportunity
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why This Is a Viable Business
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every year, thousands of Ohio families face the responsibility of
            choosing a permanent memorial. Many are overwhelmed by cemetery
            rules, design choices, timelines, and pricing. Reserve Memorials
            gives licensees a clear way to serve those families with compassion
            and professionalism.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Unlike many businesses that depend on trends, the memorial industry
            serves a permanent human need: honoring life, preserving legacy,
            and helping families make lasting decisions.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
