import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  /** Lift and glow on hover, for cards that link somewhere. */
  interactive?: boolean;
  /** Turn off for cards with edge-to-edge media. */
  padded?: boolean;
};

export function Card({ interactive = false, padded = true, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-copper-500/25 bg-ink-800/40",
        padded && "p-6",
        interactive &&
          "transition-[border-color,box-shadow,translate] duration-300 ease-brand hover:border-copper-500/60 hover:shadow-glow motion-safe:hover:-translate-y-1",
        className,
      )}
      {...props}
    />
  );
}
