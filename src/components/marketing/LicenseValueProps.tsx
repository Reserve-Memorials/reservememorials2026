import Image from "next/image";
import {
  GraduationCap,
  Hammer,
  MapPin,
  PackageCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/marketing/FadeIn";

const VALUE_PROPS = [
  {
    icon: GraduationCap,
    title: "Training included.",
    image: "/license/license-value-training.jpg",
  },
  {
    icon: PackageCheck,
    title: "No heavy lifting. Ever.",
    image: "/license/license-value-overhead.jpg",
  },
  {
    icon: Sparkles,
    title: "Substantial opportunity.",
    image: "/license/license-value-market.jpg",
  },
  {
    icon: Hammer,
    title: "Vetted engravers and installers ready to work for you.",
    image: "/license/license-value-support.jpg",
  },
  {
    icon: Wrench,
    title: "Sales driven to you through this website.",
    image: "/license/license-value-brand.jpg",
  },
  {
    icon: MapPin,
    title: "Your hometown territory.",
    image: "/license/license-value-territory.jpg",
  },
];

export function LicenseValueProps() {
  return (
    <section className="mx-auto max-w-6xl space-y-10">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            License Benefits
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What you get with a Reserve Memorials license
          </h2>
        </div>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {VALUE_PROPS.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1}>
            <Card className="group h-full border-border/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
              <div className="relative overflow-hidden border-b border-border/50 bg-muted/20">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_60%)]" />
                </div>
              </div>
              <CardHeader className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg leading-snug">
                  {item.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
