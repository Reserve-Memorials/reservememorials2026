import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/marketing/FadeIn";

export function LicenseWhyChoose() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            Why Reserve
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why Choose Reserve Memorials Over Other Opportunities
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            This is not a fad business. It is a relationship business.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Reserve Memorials offers a chance to build a respected local
            company around trust, service, craftsmanship, and legacy. The
            industry is fragmented, which gives a thoughtful operator room to
            stand out with better communication, stronger presentation, and a
            more compassionate customer experience.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
