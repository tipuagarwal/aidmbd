import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSection } from "@/content/home";
import { ProcessTimeline } from "./ProcessTimeline";

export function Process() {
  return (
    <Section aria-labelledby="process-title">
      <SectionHeading id="process-title" eyebrow={processSection.eyebrow} title={processSection.title} />
      <ProcessTimeline steps={processSection.steps} />
    </Section>
  );
}
