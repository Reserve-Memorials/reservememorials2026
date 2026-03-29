"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animated SVG map of Ohio with a pulsing dot on Hudson.
 * The outline draws itself when scrolled into view.
 */
export function OhioMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Ohio state outline */}
        <motion.path
          d="M 95 18 L 120 15 L 155 12 L 185 10 L 215 10 L 250 12 L 280 16 L 310 22 L 335 30 L 350 42 L 358 58 L 360 80 L 355 105 L 345 130 L 338 155 L 335 180 L 340 210 L 348 235 L 355 260 L 358 285 L 352 310 L 340 335 L 330 360 L 318 380 L 300 395 L 278 405 L 255 412 L 230 418 L 205 425 L 180 430 L 155 432 L 130 428 L 108 420 L 90 408 L 78 390 L 68 370 L 60 345 L 55 320 L 52 295 L 50 270 L 52 245 L 55 220 L 58 195 L 62 170 L 65 145 L 68 120 L 72 95 L 78 70 L 85 45 Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary/60"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Fill that fades in after the outline draws */}
        <motion.path
          d="M 95 18 L 120 15 L 155 12 L 185 10 L 215 10 L 250 12 L 280 16 L 310 22 L 335 30 L 350 42 L 358 58 L 360 80 L 355 105 L 345 130 L 338 155 L 335 180 L 340 210 L 348 235 L 355 260 L 358 285 L 352 310 L 340 335 L 330 360 L 318 380 L 300 395 L 278 405 L 255 412 L 230 418 L 205 425 L 180 430 L 155 432 L 130 428 L 108 420 L 90 408 L 78 390 L 68 370 L 60 345 L 55 320 L 52 295 L 50 270 L 52 245 L 55 220 L 58 195 L 62 170 L 65 145 L 68 120 L 72 95 L 78 70 L 85 45 Z"
          className="fill-primary/5 dark:fill-primary/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
        />

        {/* Hudson, OH marker (approximate position NE Ohio) */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 2.2, type: "spring" }}
        >
          {/* Pulse ring */}
          <motion.circle
            cx="290"
            cy="130"
            r="12"
            className="fill-accent/20 stroke-accent/40"
            strokeWidth="1"
            animate={isInView ? { r: [12, 22, 12], opacity: [0.6, 0, 0.6] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, delay: 2.5 }}
          />
          {/* Dot */}
          <circle cx="290" cy="130" r="6" className="fill-accent" />
          {/* Label */}
          <text
            x="305"
            y="126"
            className="fill-foreground text-[13px] font-semibold"
            fontFamily="var(--font-body)"
          >
            Hudson
          </text>
          <text
            x="305"
            y="142"
            className="fill-muted-foreground text-[11px]"
            fontFamily="var(--font-body)"
          >
            HQ
          </text>
        </motion.g>

        {/* Cleveland marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 2.6, type: "spring" }}
        >
          <circle cx="268" cy="95" r="4" className="fill-primary/60" />
          <text
            x="248"
            y="85"
            className="fill-muted-foreground text-[10px]"
            fontFamily="var(--font-body)"
          >
            Cleveland
          </text>
        </motion.g>

        {/* Columbus marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 2.8, type: "spring" }}
        >
          <circle cx="230" cy="260" r="4" className="fill-primary/60" />
          <text
            x="242"
            y="264"
            className="fill-muted-foreground text-[10px]"
            fontFamily="var(--font-body)"
          >
            Columbus
          </text>
        </motion.g>

        {/* Cincinnati marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 3.0, type: "spring" }}
        >
          <circle cx="140" cy="395" r="4" className="fill-primary/60" />
          <text
            x="100"
            y="410"
            className="fill-muted-foreground text-[10px]"
            fontFamily="var(--font-body)"
          >
            Cincinnati
          </text>
        </motion.g>

        {/* Akron marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 2.4, type: "spring" }}
        >
          <circle cx="275" cy="155" r="3.5" className="fill-primary/60" />
          <text
            x="256"
            y="172"
            className="fill-muted-foreground text-[10px]"
            fontFamily="var(--font-body)"
          >
            Akron
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
