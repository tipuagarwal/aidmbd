"use client";

import { motion, useReducedMotion } from "motion/react";
import { Orbit } from "@/components/motion/Orbit";
import { cn } from "@/lib/cn";

/**
 * Copper globe in a breathing glow with two orbits, echoing the logo.
 * Stands in for the founder portrait until a real cut-out photo is supplied (requirements §4).
 */
export function HeroVisual({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("relative mx-auto aspect-square w-full max-w-[15rem] sm:max-w-[22rem] lg:max-w-[28rem]", className)}
    >
      <motion.div
        className="bg-glow-copper absolute -inset-1/4"
        animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <Globe className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2" />
      <Orbit
        tilt={-14}
        className="absolute left-1/2 top-1/2 w-[132%] max-w-none -translate-x-1/2 -translate-y-1/2"
      />
      <Orbit
        tilt={30}
        nodes={1}
        duration={34}
        className="absolute left-1/2 top-1/2 w-[96%] -translate-x-1/2 -translate-y-1/2 opacity-60"
      />
    </div>
  );
}

function Globe({ className }: { className?: string }) {
  return (
    <div
      className={cn("aspect-square rounded-full", className)}
      style={{
        background:
          "radial-gradient(circle at 32% 28%, var(--color-copper-300) 0%, var(--color-copper-500) 22%, var(--color-copper-700) 52%, #1a0f08 80%)",
        boxShadow:
          "0 0 90px -10px rgb(200 120 63 / 0.55), inset -18px -24px 48px rgb(0 0 0 / 0.55)",
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" className="size-full">
        <g stroke="rgb(255 255 255 / 0.16)" strokeWidth="0.5">
          <circle cx="50" cy="50" r="49" />
          <ellipse cx="50" cy="50" rx="17" ry="49" />
          <ellipse cx="50" cy="50" rx="35" ry="49" />
          <line x1="1" y1="50" x2="99" y2="50" />
          <line x1="8" y1="25" x2="92" y2="25" />
          <line x1="8" y1="75" x2="92" y2="75" />
        </g>
      </svg>
    </div>
  );
}
