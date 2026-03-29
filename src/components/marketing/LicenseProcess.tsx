import Image from "next/image";
import { FileText, Mail, Phone, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/marketing/FadeIn";

const STEPS = [
  {
    icon: Mail,
    title: "Express Your Interest",
    description:
      "Fill out our inquiry form. We\u2019ll send you a detailed information packet about the Reserve Memorials license opportunity.",
  },
  {
    icon: Phone,
    title: "Discovery Call",
    description:
      "Schedule a one-on-one call with our team to discuss your goals, territory preferences, and answer your questions.",
  },
  {
    icon: FileText,
    title: "Review and Agreement",
    description:
      "Review the complete opportunity details. Once approved, sign your license agreement and secure your exclusive territory.",
  },
  {
    icon: Rocket,
    title: "Training and Launch",
    description:
      "Complete our training program and launch your business with full access to the Reserve Memorials platform, brand, and support.",
  },
];

export function LicenseProcess() {
  return (
    <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
      <div
        className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.12),transparent)] blur-3xl animate-gentle-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10">
        <FadeIn>
          <div className="space-y-3 text-center">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              Process
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From first inquiry to launch day, we guide you through every step.
            </p>
          </div>
        </FadeIn>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          {/* Left: Steps */}
          <div className="grid gap-6 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="group space-y-3 rounded-xl border border-border/40 bg-background/40 p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary font-semibold transition-transform duration-300 group-hover:scale-110">
                      {i + 1}
                    </div>
                    <step.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Right: Image */}
          <FadeIn delay={0.2}>
            <div className="relative hidden overflow-hidden rounded-2xl border border-border/60 shadow-sm lg:block">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/license/license-process.jpg"
                  alt="Business partnership handshake"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.3),transparent_50%)]" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
