import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  /** Trailing words shown in copper. */
  accent?: string;
  className?: string;
};

export function Eyebrow({ children, accent, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-titanium-500",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-copper-500" />
      <span>
        {children}
        {accent && <span className="text-copper-400"> {accent}</span>}
      </span>
    </p>
  );
}
