import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Circular arrow from the hero cards. Reacts to hover on a parent `group`. */
export function IconCircleArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-copper-500/60 text-copper-400 transition-colors duration-300 ease-brand group-hover:border-copper-500 group-hover:bg-copper-600 group-hover:text-white",
        className,
      )}
    >
      <ArrowRight className="size-4" />
    </span>
  );
}
