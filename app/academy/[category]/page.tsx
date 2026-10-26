import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategorySyllabus } from "@/components/academy/category/CategorySyllabus";
import { ResearchPath } from "@/components/academy/category/ResearchPath";
import { categoryContentCount } from "@/components/academy/CategoryCard";
import { CourseCard } from "@/components/academy/CourseCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BookingCta } from "@/components/sections/BookingCta";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  academyCategories,
  academyPage,
  categoryPage,
  courseFormats,
  courseLevels,
  getAcademyCategory,
  researchNotes,
} from "@/content/academy";
import { bookingHref, getBookingType } from "@/content/booking";
import { courses, toCourseSummary } from "@/content/courses";
import { faqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return academyCategories.map(({ slug }) => ({ category: slug }));
}

// Every slug is prerendered, so a navigation here waits on one cached fetch. Reading params
// inside <Suspense> instead would let React paint a placeholder before this large page,
// shifting the layout on direct visits (requirements §15.1).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/academy/[category]">): Promise<Metadata> {
  const category = getAcademyCategory((await params).category);
  if (!category) return {};
  // "Courses" keeps paths distinct from services with the same name, such as AI Automation.
  return pageMetadata({ title: `${category.title} Courses`, description: category.description, path: `/academy/${category.slug}`, ownImage: true });
}

export default async function CategoryPage({ params }: PageProps<"/academy/[category]">) {
  const category = getAcademyCategory((await params).category);
  if (!category) notFound();

  const pathCourses = courses.filter((course) => course.category === category.slug);
  const levels = [...new Set(pathCourses.map((course) => course.level))];
  const isResearch = category.slug === "research-paper-writing";
  const guidance = {
    label: `Book ${getBookingType(category.guidance)?.title}`,
    href: bookingHref(category.guidance, { course: category.slug }),
  };
  const facts = [
    { label: category.tracks ? categoryPage.facts.languages : categoryPage.facts.modules, value: categoryContentCount(category) },
    { label: categoryPage.facts.formats, value: category.formats.map((format) => courseFormats[format]).join(" · ") },
    { label: categoryPage.facts.courses, value: `${pathCourses.length} · ${levels.map((level) => courseLevels[level]).join(", ")}` },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Academy", href: "/academy" },
          { label: category.title, href: `/academy/${category.slug}` },
        ]}
        eyebrow={categoryPage.eyebrow}
        title={category.title}
        intro={category.description}
        aside={
          <Card className="p-6 sm:p-7">
            <dl className="divide-y divide-line">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-6 py-3 first:pt-0 last:pb-0">
                  <dt className="text-sm text-titanium-500">{fact.label}</dt>
                  <dd className="text-right font-medium text-titanium-50">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        }
      >
        <ul className="mt-6 flex flex-wrap gap-2">
          {category.formats.map((format) => (
            <li key={format}>
              <Badge tone="copper">{courseFormats[format]}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="#courses" size="lg">
            {categoryPage.seeCourses}
          </ButtonLink>
          <ButtonLink href={guidance.href} variant="outline" size="lg">
            {categoryPage.questions}
          </ButtonLink>
        </div>
      </PageHero>

      <CategorySyllabus category={category} />
      {isResearch && <ResearchPath notes={researchNotes} />}

      <Section id="courses" tone={isResearch ? "raised" : "base"} aria-labelledby="path-courses-title">
        <SectionHeading id="path-courses-title" eyebrow={categoryPage.courses.eyebrow} title={categoryPage.courses.title} />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pathCourses.map((course) => (
            <StaggerItem key={course.slug} className="h-full">
              <CourseCard course={toCourseSummary(course)} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <FaqBlock
        id="path-faq-title"
        eyebrow={academyPage.faq.eyebrow}
        title={academyPage.faq.title}
        items={faqs.filter((faq) => faq.group === "courses")}
        tone={isResearch ? "base" : "raised"}
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
