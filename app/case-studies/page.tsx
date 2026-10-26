import type { Metadata } from "next";
import { Info } from "lucide-react";
import { CaseStudyCatalog } from "@/components/case-studies/CaseStudyCatalog";
import { BookingCta } from "@/components/sections/BookingCta";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { bookingHref } from "@/content/booking";
import { caseStudies, caseStudiesPage } from "@/content/caseStudies";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description: caseStudiesPage.description,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
        ]}
        eyebrow={caseStudiesPage.eyebrow}
        title={caseStudiesPage.title}
        intro={caseStudiesPage.intro}
      />
      <Section tone="raised" aria-labelledby="projects-title">
        <h2 id="projects-title" className="sr-only">
          {caseStudiesPage.listTitle}
        </h2>
        <p className="mb-10 flex max-w-3xl gap-3 rounded-xl border border-copper-500/30 bg-copper-500/5 p-5 text-sm leading-relaxed text-titanium-300">
          <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-copper-400" />
          {caseStudiesPage.demoNote}
        </p>
        <CaseStudyCatalog studies={caseStudies} />
      </Section>
      <BookingCta
        eyebrow={caseStudiesPage.cta.eyebrow}
        title={caseStudiesPage.cta.title}
        intro={caseStudiesPage.cta.intro}
        cta={{ label: "Discuss Your Project", href: bookingHref("project-discussion") }}
        showTypes={false}
      />
    </>
  );
}
