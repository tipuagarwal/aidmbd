import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type ChoiceCardProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "title" | "className"> & {
  title: string;
  description?: string;
  meta?: ReactNode;
  className?: string;
};

/** A radio option styled as a card. The native radio keeps arrow-key navigation within the group. */
export function ChoiceCard({ title, description, meta, className, ...props }: ChoiceCardProps) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer flex-col rounded-xl border border-white/10 bg-ink-950/40 p-4 transition-colors duration-200 hover:border-copper-500/50",
        "has-checked:border-copper-500 has-checked:bg-copper-500/10 has-[[aria-invalid=true]]:border-danger-500/60",
        "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-copper-400",
        className,
      )}
    >
      <input type="radio" className="sr-only" {...props} />
      <span className="flex items-start justify-between gap-3">
        <span className="font-semibold text-titanium-50">{title}</span>
        <span
          aria-hidden
          className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors group-has-checked:border-copper-400 group-has-checked:bg-copper-500"
        >
          <Check strokeWidth={3} className="size-3 text-white opacity-0 group-has-checked:opacity-100" />
        </span>
      </span>
      {description && <span className="mt-1.5 text-sm leading-relaxed text-titanium-500">{description}</span>}
      {meta && <span className="mt-3 flex items-center gap-1.5 text-xs font-medium text-copper-300">{meta}</span>}
    </label>
  );
}
