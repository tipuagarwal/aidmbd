import type { Metadata } from "next";
import { CategoryCard } from "@/components/academy/CategoryCard";
import { CourseCatalog } from "@/components/academy/CourseCatalog";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BookingCta } from "@/components/sections/BookingCta";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { academyCategories, academyPage } from "@/content/academy";
import { bookingHref } from "@/content/booking";
import { courses, toCourseSummary } from "@/content/courses";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Learning Academy",
  description: academyPage.description,
};

const guidance = { label: "Book Learning Guidance", href: bookingHref("learning-guidance") };

export default function AcademyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Academy", href: "/academy" },
        ]}
        eyebrow={academyPage.eyebrow}
        title={academyPage.title}
        intro={academyPage.intro}
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={academyPage.primaryCta.href} size="lg">
            {academyPage.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={guidance.href} variant="outline" size="lg">
            {academyPage.guidanceCta}
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="raised" aria-labelledby="paths-title">
        <SectionHeading
          id="paths-title"
          eyebrow={academyPage.categories.eyebrow}
          title={academyPage.categories.title}
          intro={academyPage.categories.intro}
        />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {academyCategories.map((category) => (
            <StaggerItem key={category.slug} className="h-full">
              <CategoryCard category={category} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CourseCatalog courses={courses.map(toCourseSummary)} />

      <FaqBlock
        id="academy-faq-title"
        eyebrow={academyPage.faq.eyebrow}
        title={academyPage.faq.title}
        items={faqs.filter((faq) => faq.group === "courses")}
        tone="base"
      />

      <BookingCta
        eyebrow={academyPage.cta.eyebrow}
        title={academyPage.cta.title}
        intro={academyPage.cta.intro}
        cta={guidance}
        showTypes={false}
      />
    </>
  );
}
