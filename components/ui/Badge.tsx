import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const tones = {
  copper: "bg-copper-500/15 text-copper-300 ring-copper-500/30",
  neutral: "bg-white/5 text-titanium-300 ring-white/10",
};

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: keyof typeof tones;
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
