import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingCta } from "@/components/sections/BookingCta";
import { OtherServices } from "@/components/services/OtherServices";
import { ServiceDelivery } from "@/components/services/ServiceDelivery";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceIncluded } from "@/components/services/ServiceIncluded";
import { ServiceIntro } from "@/components/services/ServiceIntro";
import { ServicePricing } from "@/components/services/ServicePricing";
import { ServiceProof } from "@/components/services/ServiceProof";
import { getService, serviceDetail, services } from "@/content/services";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

// Every slug is prerendered, so a navigation here waits on one cached fetch. Reading params
// inside <Suspense> instead would let React paint a placeholder before this large page,
// shifting the layout on direct visits (requirements §15.1).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.title, description: service.description };
}

// Section order follows the service page template in requirements.md §7.1.
export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <ServiceIntro
        service={service}
        position={services.indexOf(service) + 1}
        total={services.length}
      />
      <ServiceIncluded service={service} />
      <ServiceDelivery service={service} />
      <ServiceProof service={service} />
      <ServicePricing service={service} />
      <ServiceFaq service={service} />
      <OtherServices current={service} />
      <BookingCta
        eyebrow={serviceDetail.cta.eyebrow}
        title={`Ready to talk about ${service.title}?`}
        intro={serviceDetail.cta.intro}
        cta={service.cta}
        showTypes={false}
      />
    </>
  );
}
