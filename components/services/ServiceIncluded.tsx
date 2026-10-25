import { Check } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceDetail } from "@/content/services";
import type { Service } from "@/lib/types";

/** Sub-services grid plus what the client receives. */
export function ServiceIncluded({ service }: { service: Service }) {
  return (
    <Section tone="raised" aria-labelledby="included-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionHeading
            id="included-title"
            eyebrow={serviceDetail.included.eyebrow}
            title={serviceDetail.included.title}
          />
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
            {service.subServices.map((item) => (
              <StaggerItem key={item}>
                <div className="flex h-full items-start gap-3 rounded-lg border border-line bg-white/[0.02] px-4 py-3.5 text-sm text-titanium-300">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-400" />
                  {item}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Card className="p-7 lg:col-span-4 lg:self-start">
          <h3 className="text-lg font-semibold">{serviceDetail.deliverablesTitle}</h3>
          <ol className="mt-6 space-y-4">
            {service.deliverables.map((item, index) => (
              <li key={item} className="flex gap-4 text-sm leading-relaxed text-titanium-300">
                <span className="font-mono text-xs leading-6 text-copper-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </Section>
  );
}
