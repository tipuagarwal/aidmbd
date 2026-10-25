import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { IconCircleArrow } from "@/components/ui/IconCircleArrow";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/types";

/** The three quick-access service cards under the hero CTAs. */
export function QuickCards({ services, className }: { services: Service[]; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {services.map((service) => (
        <li key={service.slug}>
          <Link href={`/services/${service.slug}`} className="group block h-full rounded-xl">
            <Card interactive className="flex h-full flex-col gap-4 bg-ink-900/70 p-5 backdrop-blur-sm">
              <span className="flex items-center gap-3">
                <Icon name={service.icon} className="size-7 shrink-0 text-copper-400" />
                <span className="font-semibold leading-snug">{service.title}</span>
              </span>
              <span className="flex flex-1 items-end justify-between gap-3">
                <span className="text-sm leading-relaxed text-titanium-500">{service.summary}</span>
                <IconCircleArrow />
              </span>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
