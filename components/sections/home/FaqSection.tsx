import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqGroups, faqs } from "@/content/faqs";
import { faqSection } from "@/content/home";
import type { FaqGroup } from "@/lib/types";

const groups = (Object.keys(faqGroups) as FaqGroup[])
  .map((group) => ({ group, items: faqs.filter((faq) => faq.group === group) }))
  .filter(({ items }) => items.length > 0);

export function FaqSection() {
  return (
    <Section id="faq" tone="raised" aria-labelledby="faq-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeading id="faq-title" eyebrow={faqSection.eyebrow} title={faqSection.title} intro={faqSection.intro} />
          <ButtonLink href={faqSection.cta.href} variant="link" arrow className="mt-6">
            {faqSection.cta.label}
          </ButtonLink>
        </div>
        <div className="space-y-10 lg:col-span-8">
          {groups.map(({ group, items }) => (
            <div key={group}>
              <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-copper-400">{faqGroups[group]}</h3>
              <Accordion
                name="faq"
                className="mt-3"
                items={items.map((faq) => ({ id: faq.id, title: faq.question, content: faq.answer }))}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
