import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicesSection } from "@/content/home";
import { services } from "@/content/services";
import { ServiceAccordion } from "./ServiceAccordion";
import { ServiceExplorer } from "./ServiceExplorer";

export function ServicesSection() {
  return (
    <Section id="services" tone="raised" aria-labelledby="services-title">
      <SectionHeading
        id="services-title"
        eyebrow={servicesSection.eyebrow}
        title={servicesSection.title}
        intro={servicesSection.intro}
      />
      <ServiceExplorer services={services} className="mt-14 hidden lg:grid" />
      <ServiceAccordion services={services} className="mt-12 lg:hidden" />
      <p className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-titanium-500">
        {servicesSection.help}
        <ButtonLink href={servicesSection.helpCta.href} variant="link" arrow>
          {servicesSection.helpCta.label}
        </ButtonLink>
      </p>
    </Section>
  );
}
