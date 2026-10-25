import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceDetail } from "@/content/services";
import type { Service } from "@/lib/types";

export function ServiceFaq({ service }: { service: Service }) {
  if (service.faqs.length === 0) return null;

  return (
    <Section tone="raised" aria-labelledby="service-faq-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <SectionHeading
          id="service-faq-title"
          eyebrow={serviceDetail.faq.eyebrow}
          title={serviceDetail.faq.title}
          className="lg:col-span-4"
        />
        <Accordion
          name="service-faq"
          className="lg:col-span-8 lg:self-start"
          items={service.faqs.map((faq, index) => ({
            id: String(index),
            title: faq.question,
            content: faq.answer,
          }))}
        />
      </div>
    </Section>
  );
}
