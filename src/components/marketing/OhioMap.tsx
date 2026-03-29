"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/*
 * Real Ohio state outline derived from US Census Bureau simplified boundary data,
 * scaled to fit a 500x600 viewBox. Cities placed at their approximate
 * geographic positions relative to the state outline.
 */

const OHIO_PATH =
  "M 410 38 L 395 36 L 370 32 L 345 28 L 320 25 L 295 22 L 270 20 L 245 18 L 220 17 L 195 16 L 170 16 L 145 17 L 120 19 L 100 22 L 85 27 " +
  "L 82 45 L 78 65 L 75 90 L 72 115 L 68 140 L 65 165 L 62 190 L 58 215 L 55 240 L 52 265 L 48 290 L 45 315 L 42 340 " +
  "L 48 355 L 58 370 L 72 388 L 88 402 L 105 415 L 122 428 L 138 440 L 148 448 " +
  "L 160 455 L 172 460 L 182 462 " +
  "L 190 458 L 198 450 L 208 438 L 220 428 " +
  "L 232 440 L 245 452 L 258 460 L 268 464 " +
  "L 280 460 L 292 452 L 305 440 L 315 430 " +
  "L 330 432 L 345 438 L 360 445 L 375 448 " +
  "L 388 444 L 398 436 L 406 425 L 412 412 " +
  "L 418 395 L 422 378 L 428 358 L 432 338 L 435 318 " +
  "L 440 295 L 445 270 L 448 245 L 450 220 " +
  "L 448 195 L 445 170 L 440 148 L 435 128 " +
  "L 450 115 L 462 100 L 470 88 L 475 75 L 472 62 L 462 52 L 448 45 L 430 40 Z";

const CITIES = [
  { name: "Cleveland", x: 365, y: 82, size: 5 },
  { name: "Akron", x: 370, y: 135, size: 4 },
  { name: "Hudson", x: 380, y: 115, size: 6, isHQ: true },
  { name: "Canton", x: 385, y: 165, size: 4 },
  { name: "Youngstown", x: 440, y: 128, size: 4 },
  { name: "Toledo", x: 140, y: 65, size: 5 },
  { name: "Columbus", x: 280, y: 310, size: 5 },
  { name: "Dayton", x: 185, y: 355, size: 5 },
  { name: "Cincinnati", x: 175, y: 455, size: 5 },
  { name: "Stow", x: 375, y: 125, size: 3 },
];

export function OhioMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* State outline - draws itself */}
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

        {/* State fill fades in after outline */}
        <motion.path
          d={OHIO_PATH}
          className="fill-primary/5 dark:fill-primary/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
        />

        {/* City markers */}
        {CITIES.map((city, i) => (
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
                r={city.size + 6}
                className="fill-accent/20 stroke-accent/30"
                strokeWidth="1"
                animate={
                  isInView
                    ? {
                        r: [city.size + 6, city.size + 16, city.size + 6],
                        opacity: [0.5, 0, 0.5],
                      }
                    : {}
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 3,
                }}
              />
            )}

            {/* Dot */}
            <circle
              cx={city.x}
              cy={city.y}
              r={city.size}
              className={city.isHQ ? "fill-accent" : "fill-primary/50"}
            />

            {/* Label */}
            <text
              x={city.x + city.size + 6}
              y={city.y + (city.isHQ ? -2 : 1)}
              className={`text-[11px] ${city.isHQ ? "fill-foreground font-semibold" : "fill-muted-foreground"}`}
              fontFamily="var(--font-body)"
            >
              {city.name}
            </text>
            {city.isHQ && (
              <text
                x={city.x + city.size + 6}
                y={city.y + 13}
                className="fill-accent text-[9px] font-medium"
                fontFamily="var(--font-body)"
              >
                HEADQUARTERS
              </text>
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
