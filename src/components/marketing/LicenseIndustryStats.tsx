"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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

const PRODUCT_IMAGES = [
  { src: "/traditional-headstone.png", alt: "Traditional headstones" },
  { src: "/columbariums.png", alt: "Columbariums" },
  { src: "/veteran-memorials.png", alt: "Veteran memorials" },
  { src: "/statues.png", alt: "Statues" },
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
    <section className="space-y-10">
      {/* Stats section */}
      <div className="rounded-2xl border border-border bg-muted/30 p-10 sm:p-16">
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
      </div>

      {/* Product showcase strip */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PRODUCT_IMAGES.map((img, i) => (
            <motion.div
              key={img.alt}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-muted/20 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.5),transparent_60%)]" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-xs font-medium text-white">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
