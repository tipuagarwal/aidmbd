import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { faqGroups, faqPage, faqs } from "@/content/faqs";
import type { FaqGroup } from "@/lib/types";

export const metadata: Metadata = {
  title: "FAQ",
  description: faqPage.description,
};

const groups = (Object.keys(faqGroups) as FaqGroup[])
  .map((group) => ({ group, items: faqs.filter((faq) => faq.group === group) }))
  .filter(({ items }) => items.length > 0);

export default function FaqPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
        eyebrow={faqPage.eyebrow}
        title={faqPage.title}
        intro={faqPage.intro}
      >
        <nav aria-label={faqPage.jump} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {groups.map(({ group }) => (
              <li key={group}>
                <a
                  href={`#${group}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-white/[0.03] px-4 text-sm text-titanium-300 transition-colors hover:border-copper-500/60 hover:text-copper-300"
                >
                  {faqGroups[group]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section tone="raised" aria-label={faqPage.title}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-8">
            {groups.map(({ group, items }) => (
              <section key={group} id={group} aria-labelledby={`${group}-title`}>
                <h2 id={`${group}-title`} className="text-xs font-medium uppercase tracking-[0.3em] text-copper-400">
                  {faqGroups[group]}
                </h2>
                <Accordion
                  name={`faq-${group}`}
                  className="mt-3"
                  items={items.map((faq) => ({ id: faq.id, title: faq.question, content: faq.answer }))}
                />
              </section>
            ))}
          </div>
          <aside className="lg:col-span-4">
            <Card className="p-7 lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold">{faqPage.more.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-titanium-500">{faqPage.more.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={faqPage.more.contact.href}>{faqPage.more.contact.label}</ButtonLink>
                <ButtonLink href={faqPage.more.book.href} variant="outline">
                  {faqPage.more.book.label}
                </ButtonLink>
              </div>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
