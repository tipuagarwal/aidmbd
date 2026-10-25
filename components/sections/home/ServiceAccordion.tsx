import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/types";
import { ServicePanel } from "./ServicePanel";

/** Mobile and tablet version of the Service Explorer. Native details, so it works without JavaScript. */
export function ServiceAccordion({ services, className }: { services: Service[]; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {services.map((service, index) => (
        <details
          key={service.slug}
          name="services"
          open={index === 0}
          className="group rounded-xl border border-copper-500/25 bg-ink-800/40 transition-colors open:border-copper-500/50"
        >
          <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-xs text-copper-400">{String(index + 1).padStart(2, "0")}</span>
            <Icon name={service.icon} className="size-6 shrink-0 text-copper-400" />
            <h3 className="flex-1 font-semibold">{service.title}</h3>
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-copper-400 transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <div className="px-5 pb-6">
            <ServicePanel service={service} showTitle={false} />
          </div>
        </details>
      ))}
    </div>
  );
}
