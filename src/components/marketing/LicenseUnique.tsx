import { Armchair, HandHeart, LayoutGrid, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/marketing/FadeIn";

const FEATURES = [
  {
    icon: HandHeart,
    title: "Guidance, not pressure",
    description:
      "Families are helped through a thoughtful process, not pushed into a decision.",
  },
  {
    icon: Armchair,
    title: "The “Rocking Chair Remedy” experience",
    description:
      "Reserve Memorials uses a warm consultation setting designed for comfort and conversation instead of a cold sales desk.",
  },
  {
    icon: Wrench,
    title: "Full-service support",
    description:
      "Families receive help with design, cemetery approval, foundation planning, and installation coordination.",
  },
  {
    icon: LayoutGrid,
    title: "Multiple product categories",
    description:
      "Traditional headstones, columbariums, veteran memorials, statues, dove release, grief coaching, and accessories create multiple ways to serve families.",
  },
];

export function LicenseUnique() {
  return (
    <section className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            What Sets Us Apart
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What Makes Reserve Memorials Unique
          </h2>
          <p className="mx-auto max-w-2xl text-base italic leading-relaxed text-muted-foreground">
            Reserve Memorials is not built around pressure selling. It is built
            around conversation.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, i) => (
          <FadeIn key={feature.title} delay={i * 0.1}>
            <Card className="group h-full border-border/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="space-y-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
