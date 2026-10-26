import type { Metadata } from "next";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BookingCta } from "@/components/sections/BookingCta";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { services, servicesPage } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description: servicesPage.intro,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: servicesPage.eyebrow, href: "/services" },
        ]}
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        intro={servicesPage.intro}
      />

      <Section tone="raised" aria-label="All services">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
        </Stagger>

        <Card className="mt-10 flex flex-col gap-6 p-7 md:flex-row md:items-center md:p-8">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-copper-500/30 bg-copper-500/10">
            <Icon name="graduation-cap" className="size-7 text-copper-400" />
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{servicesPage.academy.title}</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-titanium-500">{servicesPage.academy.intro}</p>
          </div>
          <ButtonLink href={servicesPage.academy.cta.href} variant="outline">
            {servicesPage.academy.cta.label}
          </ButtonLink>
        </Card>
      </Section>

      <Process />
      <BookingCta />
    </>
  );
}
