"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animated SVG map of Ohio with accurate state outline derived from
 * geographic boundary coordinates. Cities positioned at real lat/lon
 * locations. The outline draws itself when scrolled into view.
 */

// Accurate Ohio outline from simplified geographic boundary data
const OHIO_PATH =
  "M 31 57 L 31 85 L 31 98 L 126 61 L 168 61 L 206 74 L 235 79 L 269 99 " +
  "L 300 87 L 337 89 L 351 88 L 375 89 L 411 89 L 438 89 L 470 89 " +
  "L 470 134 L 470 195 L 470 254 L 462 261 L 457 282 L 449 308 L 438 320 " +
  "L 433 337 L 421 350 L 406 357 L 392 372 L 382 386 L 375 402 L 362 411 " +
  "L 347 418 L 331 431 L 317 445 L 306 448 L 296 455 L 283 464 L 262 468 " +
  "L 245 460 L 229 455 L 214 452 L 201 443 L 188 443 L 173 439 L 160 436 " +
  "L 147 443 L 136 448 L 126 452 L 114 436 L 102 423 L 91 418 L 85 411 " +
  "L 81 394 L 71 386 L 61 382 L 44 384 L 30 382 " +
  "L 30 335 L 30 273 L 30 212 L 30 175 L 30 150 L 30 120 L 31 57 Z";

interface City {
  name: string;
  x: number;
  y: number;
  isHQ?: boolean;
  /** Label placement relative to dot */
  labelSide: "right" | "left" | "below";
}

const CITIES: City[] = [
  { name: "Toledo", x: 160, y: 71, labelSide: "right" },
  { name: "Cleveland", x: 350, y: 89, labelSide: "left" },
  { name: "Hudson", x: 376, y: 121, isHQ: true, labelSide: "right" },
  { name: "Akron", x: 368, y: 141, labelSide: "left" },
  { name: "Canton", x: 382, y: 175, labelSide: "right" },
  { name: "Youngstown", x: 457, y: 138, labelSide: "left" },
  { name: "Columbus", x: 217, y: 278, labelSide: "right" },
  { name: "Dayton", x: 94, y: 303, labelSide: "right" },
  { name: "Cincinnati", x: 62, y: 384, labelSide: "right" },
];

function labelOffset(side: City["labelSide"], dotSize: number) {
  switch (side) {
    case "right":
      return { dx: dotSize + 7, dy: 4, anchor: "start" as const };
    case "left":
      return { dx: -(dotSize + 7), dy: 4, anchor: "end" as const };
    case "below":
      return { dx: 0, dy: dotSize + 14, anchor: "middle" as const };
  }
}

export function OhioMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* State outline draws itself */}
        <motion.path
          d={OHIO_PATH}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary/60"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Fill fades in after outline completes */}
        <motion.path
          d={OHIO_PATH}
          className="fill-primary/5 dark:fill-primary/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
        />

        {/* City markers */}
        {CITIES.map((city, i) => {
          const dotSize = city.isHQ ? 6 : 4;
          const label = labelOffset(city.labelSide, dotSize);

          return (
            <motion.g
              key={city.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: 2.0 + i * 0.12,
                type: "spring",
                stiffness: 200,
              }}
            >
              {/* HQ pulse ring */}
              {city.isHQ && (
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={12}
                  className="fill-accent/15 stroke-accent/25"
                  strokeWidth="1"
                  animate={
                    isInView
                      ? { r: [12, 22, 12], opacity: [0.4, 0, 0.4] }
                      : {}
                  }
                  transition={{ duration: 2.5, repeat: Infinity, delay: 3 }}
                />
              )}

              {/* Dot */}
              <circle
                cx={city.x}
                cy={city.y}
                r={dotSize}
                className={city.isHQ ? "fill-accent" : "fill-primary/50"}
              />

              {/* City name */}
              <text
                x={city.x + label.dx}
                y={city.y + label.dy}
                textAnchor={label.anchor}
                className={
                  city.isHQ
                    ? "fill-foreground text-[13px] font-semibold"
                    : "fill-muted-foreground text-[11px]"
                }
                fontFamily="var(--font-body)"
              >
                {city.name}
              </text>

              {/* HQ subtitle */}
              {city.isHQ && (
                <text
                  x={city.x + label.dx}
                  y={city.y + label.dy + 14}
                  textAnchor={label.anchor}
                  className="fill-accent text-[9px] font-semibold tracking-wider"
                  fontFamily="var(--font-body)"
                >
                  HQ
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
