"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { easeBrand } from "./easing";

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeBrand } },
};

/** Reveals its `StaggerItem` children one after another. */
export function Stagger(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    />
  );
}

export function StaggerItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={item} {...props} />;
}
