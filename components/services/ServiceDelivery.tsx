import { Info } from "lucide-react";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";
import { serviceDetail } from "@/content/services";
import type { Service } from "@/lib/types";

/** Shared process steps plus this service's delivery assumptions. */
export function ServiceDelivery({ service }: { service: Service }) {
  return (
    <Section aria-labelledby="delivery-title">
      <SectionHeading
        id="delivery-title"
        eyebrow={serviceDetail.delivery.eyebrow}
        title={serviceDetail.delivery.title}
      />
      <ProcessTimeline steps={processSteps} />
      <div className="mt-16 rounded-xl border border-line bg-white/[0.02] p-6 md:p-8">
        <h3 className="flex items-center gap-3 font-semibold">
          <Info aria-hidden className="size-5 text-copper-400" />
          {serviceDetail.assumptionsTitle}
        </h3>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-titanium-300">
          {service.notes.map((note) => (
            <li key={note} className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-copper-500" />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
