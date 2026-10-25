import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Overline } from "@/components/ui/Overline";
import { serviceDetail, servicesPage } from "@/content/services";
import type { Service } from "@/lib/types";

type ServiceIntroProps = {
  service: Service;
  /** Position in the services list, for the "Service 02 / 06" eyebrow. */
  position: number;
  total: number;
};

export function ServiceIntro({ service, position, total }: ServiceIntroProps) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <PageHero
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: servicesPage.eyebrow, href: "/services" },
        { label: service.title, href: `/services/${service.slug}` },
      ]}
      eyebrow={`Service ${pad(position)} / ${pad(total)}`}
      title={service.title}
      intro={service.description}
      aside={
        <Card className="bg-ink-900/70 p-7 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-xl border border-copper-500/30 bg-copper-500/10">
              <Icon name={service.icon} className="size-6 text-copper-400" />
            </span>
            <p className="font-semibold">At a glance</p>
          </div>
          <dl className="mt-6 divide-y divide-line text-sm">
            <div className="py-4">
              <dt className="text-titanium-500">Pricing</dt>
              <dd className="mt-1 text-titanium-50">{service.pricing}</dd>
            </div>
            <div className="py-4">
              <dt className="text-titanium-500">{serviceDetail.included.eyebrow}</dt>
              <dd className="mt-1 text-titanium-50">{service.subServices.length} sub-services</dd>
            </div>
            <div className="pt-4">
              <dt className="text-titanium-500">Every proposal lists</dt>
              <dd className="mt-1 text-titanium-50">{serviceDetail.proposalIncludes.join(", ").toLowerCase()}</dd>
            </div>
          </dl>
        </Card>
      }
    >
      <div className="mt-8 max-w-2xl border-l-2 border-copper-500 pl-5">
        <Overline>The problem it solves</Overline>
        <p className="mt-2 leading-relaxed text-titanium-300">{service.problem}</p>
      </div>

      <Overline className="mt-8">Who it&apos;s for</Overline>
      <ul className="mt-3 flex flex-wrap gap-2">
        {service.audience.map((audience) => (
          <li key={audience}>
            <Badge>{audience}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <ButtonLink href={service.cta.href} size="lg">
          {service.cta.label}
        </ButtonLink>
        {service.secondaryCta && (
          <ButtonLink href={service.secondaryCta.href} variant="outline" size="lg">
            {service.secondaryCta.label}
          </ButtonLink>
        )}
      </div>
    </PageHero>
  );
}
