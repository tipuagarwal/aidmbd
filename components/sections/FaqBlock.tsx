import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqBlockProps = {
  id: string;
  eyebrow: string;
  title: string;
  items: Array<{ question: string; answer: string }>;
  tone?: "base" | "raised";
};

/** Heading on the left, one-at-a-time accordion on the right. */
export function FaqBlock({ id, eyebrow, title, items, tone = "raised" }: FaqBlockProps) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone} aria-labelledby={id}>
      <div className="grid gap-10 lg:grid-cols-12">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} className="lg:col-span-4" />
        <Accordion
          name={id}
          className="lg:col-span-8 lg:self-start"
          items={items.map((item, index) => ({ id: String(index), title: item.question, content: item.answer }))}
        />
      </div>
    </Section>
  );
}
