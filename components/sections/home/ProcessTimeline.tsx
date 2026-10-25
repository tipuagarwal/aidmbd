"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import type { Step } from "@/lib/types";

/** Numbered steps joined by a copper line that fills as the section scrolls past. */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const progress = reduceMotion ? 1 : scrollYProgress;

  return (
    <div ref={ref} className="relative mt-14">
      {/* Vertical track below lg; from lg a horizontal track from the first to the last step marker. */}
      <div aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-line lg:hidden" />
      <motion.div
        aria-hidden
        style={{ scaleY: progress }}
        className="absolute top-5 bottom-5 left-5 w-px origin-top bg-linear-to-b from-copper-600 via-copper-400 to-copper-300 lg:hidden"
      />
      <div aria-hidden className="absolute top-5 left-5 right-[calc((100%-6rem)/5-1.25rem)] hidden h-px bg-line lg:block" />
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute top-5 left-5 right-[calc((100%-6rem)/5-1.25rem)] hidden h-px origin-left bg-linear-to-r from-copper-600 via-copper-400 to-copper-300 lg:block"
      />

      <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className="relative pl-16 lg:pt-16 lg:pl-0">
            <span className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border border-copper-500/60 bg-ink-950 font-mono text-sm text-copper-300 shadow-glow">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="pt-2 font-semibold lg:pt-0">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-titanium-500">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
