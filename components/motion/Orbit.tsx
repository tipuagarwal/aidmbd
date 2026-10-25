"use client";

import { useEffect, useId } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { easeBrand } from "./easing";

// Ellipse geometry in viewBox units; the SVG scales to its container.
const CX = 300;
const CY = 150;
const RX = 284;
const RY = 104;

const DRAW_DURATION = 1.6;

type OrbitProps = {
  className?: string;
  /** Rotation of the ellipse in degrees. */
  tilt?: number;
  /** Glowing nodes travelling along the orbit. */
  nodes?: number;
  /** Seconds per revolution. */
  duration?: number;
};

/** The logo's copper orbit ring: draws itself in, then nodes travel along it. */
export function Orbit({ className, tilt = -12, nodes = 2, duration = 24 }: OrbitProps) {
  const id = useId().replace(/[^\w-]/g, "");
  const progress = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(progress, 1, {
      duration,
      ease: "linear",
      repeat: Infinity,
      delay: DRAW_DURATION,
    });
    return () => controls.stop();
  }, [progress, reduceMotion, duration]);

  return (
    <svg viewBox="0 0 600 300" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--color-copper-600)", stopOpacity: 0.2 }} />
          <stop offset="0.6" style={{ stopColor: "var(--color-copper-400)", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "var(--color-copper-300)", stopOpacity: 0.7 }} />
        </linearGradient>
        <filter id={`${id}-glow`} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform={`rotate(${tilt} ${CX} ${CY})`}>
        <motion.ellipse
          cx={CX}
          cy={CY}
          rx={RX}
          ry={RY}
          stroke={`url(#${id}-stroke)`}
          strokeWidth={1.25}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: DRAW_DURATION, ease: easeBrand }}
        />
        {Array.from({ length: nodes }, (_, index) => (
          <OrbitNode
            key={index}
            progress={progress}
            phase={index / nodes}
            filter={`url(#${id}-glow)`}
          />
        ))}
      </g>
    </svg>
  );
}

type OrbitNodeProps = {
  progress: MotionValue<number>;
  phase: number;
  filter: string;
};

function OrbitNode({ progress, phase, filter }: OrbitNodeProps) {
  const cx = useTransform(progress, (p) => CX + RX * Math.cos((p + phase) * Math.PI * 2));
  const cy = useTransform(progress, (p) => CY + RY * Math.sin((p + phase) * Math.PI * 2));

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={3.5}
      filter={filter}
      className="fill-copper-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: DRAW_DURATION * 0.75, duration: 0.8 }}
    />
  );
}
