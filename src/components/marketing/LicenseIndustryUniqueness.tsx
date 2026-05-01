import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/marketing/FadeIn";

export function LicenseIndustryUniqueness() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            Industry
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The Uniqueness of the Memorial Industry
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            Few businesses matter at such an important moment in a family&apos;s
            life.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            A memorial is not simply a product. It is a permanent tribute.
            Families need someone who can listen, guide, simplify the process,
            and help them make a decision they will feel good about for
            generations.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
