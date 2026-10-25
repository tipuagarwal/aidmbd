"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { easeBrand } from "./easing";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

/** Fades and lifts its content in once it scrolls into view. */
export function Reveal({ delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: easeBrand, delay }}
      {...props}
    />
  );
}
