import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Check, CirclePlay, Radio } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatDetails } from "@/content/academy";
import { cn } from "@/lib/cn";
import type { CourseFormat } from "@/lib/types";

type FormatCardProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  format: CourseFormat;
  /** Shown top right, such as whether a course offers this format. */
  badge?: ReactNode;
  /** Pinned to the bottom of the card. */
  footer?: ReactNode;
};

const icons = { live: Radio, recorded: CirclePlay };

/** One side of Live vs Recorded (requirements §8.3). */
export function FormatCard({ format, badge, footer, className, ...props }: FormatCardProps) {
  const details = formatDetails[format];
  const FormatIcon = icons[format];

  return (
    <Card className={cn("flex h-full flex-col p-7 md:p-8", className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-xl border border-copper-500/30 bg-copper-500/10">
          <FormatIcon aria-hidden className="size-6 text-copper-400" />
        </span>
        {badge}
      </div>
      <h3 className="mt-6 text-xl font-semibold">{details.title}</h3>
      <p className="mt-2 leading-relaxed text-titanium-500">{details.summary}</p>
      <ul className="mt-6 space-y-3">
        {details.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm text-titanium-300">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-400" />
            {point}
          </li>
        ))}
      </ul>
      {footer && <div className="mt-auto pt-8">{footer}</div>}
    </Card>
  );
}
