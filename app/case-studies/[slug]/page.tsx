import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { CaseStudyHero } from "@/components/case-studies/detail/CaseStudyHero";
import { CaseStudyMedia } from "@/components/case-studies/detail/CaseStudyMedia";
import { CaseStudyStory } from "@/components/case-studies/detail/CaseStudyStory";
import { BookingCta } from "@/components/sections/BookingCta";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies, caseStudiesPage, caseStudyPage, getCaseStudy, similarProjectHref } from "@/content/caseStudies";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

// Every slug is prerendered, so a navigation here waits on one cached fetch (requirements §15.1).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return pageMetadata({ title: study.title, description: study.summary, path: `/case-studies/${study.slug}`, ownImage: true });
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  // Same category first, then the rest.
  const others = [
    ...caseStudies.filter((item) => item.category === study.category && item.slug !== study.slug),
    ...caseStudies.filter((item) => item.category !== study.category),
  ].slice(0, 3);

  return (
    <>
      <CaseStudyHero study={study} />
      <CaseStudyMedia study={study} />
      <CaseStudyStory study={study} />
      <BookingCta
        eyebrow={caseStudiesPage.cta.eyebrow}
        title={caseStudiesPage.cta.title}
        intro={caseStudiesPage.cta.intro}
        cta={{ label: caseStudyPage.similar, href: similarProjectHref(study) }}
        showTypes={false}
      />
      <Section aria-labelledby="other-projects-title" className="pt-0 md:pt-0">
        <SectionHeading id="other-projects-title" eyebrow={caseStudyPage.more.eyebrow} title={caseStudyPage.more.title} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <li key={item.slug}>
              <CaseStudyCard study={item} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
