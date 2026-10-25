import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/lib/types";

const VISIBLE_SUB_SERVICES = 8;

const labelClasses = "text-xs font-medium uppercase tracking-[0.2em] text-titanium-500";

type ServicePanelProps = {
  service: Service;
  /** The accordion shows the title in its summary row instead. */
  showTitle?: boolean;
};

/** Service details shared by the desktop explorer and the mobile accordion. */
export function ServicePanel({ service, showTitle = true }: ServicePanelProps) {
  const visible = service.subServices.slice(0, VISIBLE_SUB_SERVICES);
  const remaining = service.subServices.length - visible.length;

  return (
    <div>
      {showTitle && (
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-copper-500/30 bg-copper-500/10">
            <Icon name={service.icon} className="size-6 text-copper-400" />
          </span>
          <h3 className="text-2xl font-bold tracking-tight">{service.title}</h3>
        </div>
      )}

      <p className="mt-5 leading-relaxed text-titanium-300 first:mt-0">{service.description}</p>

      <div className="mt-6">
        <p className={labelClasses}>Who it&apos;s for</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {service.audience.map((audience) => (
            <li key={audience}>
              <Badge>{audience}</Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <p className={labelClasses}>What&apos;s included</p>
        <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {visible.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-snug text-titanium-300">
              <Check aria-hidden className="mt-px size-4 shrink-0 text-copper-400" />
              {item}
            </li>
          ))}
        </ul>
        {remaining > 0 && (
          <p className="mt-4 text-sm text-titanium-500">+ {remaining} more on the service page</p>
        )}
      </div>

      <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-titanium-500">
        <span className="font-semibold text-titanium-300">Pricing: </span>
        {service.pricing}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <ButtonLink href={service.cta.href}>{service.cta.label}</ButtonLink>
        {service.secondaryCta && (
          <ButtonLink href={service.secondaryCta.href} variant="outline">
            {service.secondaryCta.label}
          </ButtonLink>
        )}
        <ButtonLink href={`/services/${service.slug}`} variant="link" arrow>
          View details
        </ButtonLink>
      </div>
    </div>
  );
}
