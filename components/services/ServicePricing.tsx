import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceDetail } from "@/content/services";
import type { Service } from "@/lib/types";

/** Pricing format, what every proposal spells out, separate costs, and support after delivery. */
export function ServicePricing({ service }: { service: Service }) {
  return (
    <Section aria-labelledby="pricing-title">
      <SectionHeading id="pricing-title" eyebrow={serviceDetail.pricing.eyebrow} title={serviceDetail.pricing.title} />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Card className="p-7 md:p-8">
          <Overline>Pricing format</Overline>
          <p className="mt-3 text-2xl font-semibold leading-snug">{service.pricing}</p>

          <Overline className="mt-8">Every proposal lists</Overline>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {serviceDetail.proposalIncludes.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-titanium-300">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-400" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line pt-6">
            <Overline>{serviceDetail.extraCostsTitle}</Overline>
            {service.extraCosts.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-titanium-300">
                {service.extraCosts.map((cost) => (
                  <li key={cost} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-copper-500" />
                    {cost}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-sm text-titanium-500">{serviceDetail.extraCostsNote}</p>
          </div>
        </Card>

        <Card className="flex flex-col p-7 md:p-8">
          <h3 className="text-xl font-semibold">{serviceDetail.support.title}</h3>
          <p className="mt-4 leading-relaxed text-titanium-300">{service.support}</p>
          <div className="mt-auto flex flex-wrap gap-4 pt-8">
            <ButtonLink href={service.cta.href}>{service.cta.label}</ButtonLink>
            {service.secondaryCta && (
              <ButtonLink href={service.secondaryCta.href} variant="outline">
                {service.secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        </Card>
      </div>
    </Section>
  );
}
