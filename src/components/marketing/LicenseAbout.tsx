import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/marketing/FadeIn";

export function LicenseAbout() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            About
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            About Reserve Memorials
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          Reserve Memorials is a modern memorial company built to help families
          plan headstones, monuments, columbariums, veteran memorials, statues,
          and design consultations with clarity and care. Based in Hudson,
          Ohio, our model combines personal service, premium craftsmanship,
          cemetery coordination, and guided design support.
        </p>
      </FadeIn>
    </section>
  );
}
