import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { IconName } from "@/lib/types";

/** Placeholder artwork until real project screenshots are supplied. */
export function CaseStudyArt({ icon, className }: { icon: IconName; className?: string }) {
  return (
    <div aria-hidden className={cn("relative overflow-hidden bg-ink-900", className)}>
      <div className="bg-grid absolute inset-0" />
      <div className="bg-glow-copper absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-2xl border border-copper-500/40 bg-ink-950/70 backdrop-blur-sm">
          <Icon name={icon} className="size-8 text-copper-400" />
        </span>
      </div>
    </div>
  );
}
