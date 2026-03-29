"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  motion,
} from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/marketing/FadeIn";

const STATS = [
  { value: 1.6, prefix: "$", suffix: "B", label: "Est. Market Size" },
  { value: 2.6, prefix: "$", suffix: "B", label: "Projected by 2030" },
  { value: 6.4, prefix: "", suffix: "%", label: "Est. Annual Growth" },
];

function StatCounter({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (v) => {
    if (value < 10) return `${prefix}${v.toFixed(1)}${suffix}`;
    return `${prefix}${Math.round(v)}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration: 2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, motionValue, value]);

  return (
    <div ref={ref} className="space-y-2 text-center">
      <motion.div className="text-4xl font-bold text-accent sm:text-5xl">
        {display}
      </motion.div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function LicenseIndustryStats() {
  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-10 sm:p-16">
      <div className="mx-auto max-w-5xl space-y-10">
        <FadeIn>
          <div className="space-y-3 text-center">
            <Badge
              variant="secondary"
              className="bg-evergreen/10 text-evergreen border-evergreen/20"
            >
              <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
              Industry Opportunity
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              A growing industry with steady demand
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-3 gap-8">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              The memorial industry benefits from consistent, long-term
              demand. A growing personalization trend is creating new
              opportunities, while cremation growth is opening entirely new
              product categories like columbariums and cremation memorials.
            </p>
            <p>
              There is a significant technology gap in the industry that
              Reserve Memorials fills with its modern platform. Combined with
              demographic trends increasing demand, now is a compelling time
              to explore the memorial services space.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Industry estimates based on publicly available market research.
              Actual results may vary.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
