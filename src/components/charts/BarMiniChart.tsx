import { cn } from "@/lib/utils";

export function BarMiniChart({
  values,
  className,
  barClassName = "fill-primary/50",
}: {
  values: number[];
  className?: string;
  barClassName?: string;
}) {
  const w = 240;
  const h = 64;
  const pad = 6;
  const max = Math.max(...values, 1);
  const bw = (w - pad * 2) / Math.max(1, values.length);
  const gap = Math.max(1, bw * 0.18);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-16 w-full", className)}
      role="img"
      aria-label="Bars"
    >
      {values.map((v, i) => {
        const x = pad + i * bw + gap / 2;
        const innerW = Math.max(1, bw - gap);
        const bh = ((h - pad * 2) * v) / max;
        const y = h - pad - bh;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={innerW}
            height={bh}
            rx="3"
            className={cn(barClassName)}
          />
        );
      })}
    </svg>
  );
}


