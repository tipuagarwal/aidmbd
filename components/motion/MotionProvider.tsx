"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/** Honors the visitor's reduced-motion setting for every animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
