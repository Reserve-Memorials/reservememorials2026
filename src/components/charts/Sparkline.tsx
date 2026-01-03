import { cn } from "@/lib/utils";

export function Sparkline({
  values,
  className,
  strokeClassName = "stroke-primary",
  fillClassName = "fill-primary/10",
}: {
  values: number[];
  className?: string;
  strokeClassName?: string;
  fillClassName?: string;
}) {
  const w = 240;
  const h = 64;
  const pad = 6;
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);
  const range = Math.max(1e-9, max - min);

  const pts = values.map((v, i) => {
    const x = pad + (i * (w - pad * 2)) / Math.max(1, values.length - 1);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return { x, y };
  });

  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const area = `${d} L ${(pad + (w - pad * 2)).toFixed(2)} ${(h - pad).toFixed(
    2
  )} L ${pad.toFixed(2)} ${(h - pad).toFixed(2)} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-16 w-full", className)}
      role="img"
      aria-label="Trend"
    >
      <path className={cn(fillClassName)} d={area} />
      <path
        className={cn("fill-none", strokeClassName)}
        d={d}
        strokeWidth="2.25"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}


