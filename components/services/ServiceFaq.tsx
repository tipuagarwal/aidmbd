import { FaqBlock } from "@/components/sections/FaqBlock";
import { serviceDetail } from "@/content/services";
import type { Service } from "@/lib/types";

export function ServiceFaq({ service }: { service: Service }) {
  return (
    <FaqBlock
      id="service-faq-title"
      eyebrow={serviceDetail.faq.eyebrow}
      title={serviceDetail.faq.title}
      items={service.faqs}
    />
  );
}
