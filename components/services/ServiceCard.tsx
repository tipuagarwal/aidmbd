import Link from "next/link";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { IconCircleArrow } from "@/components/ui/IconCircleArrow";
import type { Service } from "@/lib/types";

const PREVIEW_SUB_SERVICES = 4;

/** Overview card for the /services grid. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const remaining = service.subServices.length - PREVIEW_SUB_SERVICES;

  return (
    <Link href={`/services/${service.slug}`} className="group block h-full rounded-xl">
      <Card interactive className="flex h-full flex-col p-7">
        <div className="flex items-start justify-between">
          <span className="flex size-12 items-center justify-center rounded-xl border border-copper-500/30 bg-copper-500/10">
            <Icon name={service.icon} className="size-6 text-copper-400" />
          </span>
          <span className="font-mono text-xs text-copper-400">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h2 className="mt-6 text-xl font-semibold transition-colors group-hover:text-copper-300">
          {service.title}
        </h2>
        <p className="mt-3 leading-relaxed text-titanium-500">{service.summary}</p>
        <ul className="mt-6 space-y-2.5">
          {service.subServices.slice(0, PREVIEW_SUB_SERVICES).map((item) => (
            <li key={item} className="flex gap-3 text-sm text-titanium-300">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-400" />
              {item}
            </li>
          ))}
        </ul>
        {remaining > 0 && <p className="mt-3 text-sm text-titanium-500">+ {remaining} more</p>}
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-4 border-t border-line pt-6">
            <span className="text-sm text-titanium-500">{service.pricing}</span>
            <IconCircleArrow />
          </div>
        </div>
      </Card>
    </Link>
  );
}
