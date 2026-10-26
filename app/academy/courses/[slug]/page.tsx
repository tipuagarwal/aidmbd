import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetails } from "@/components/academy/course/CourseDetails";
import { CourseEnroll } from "@/components/academy/course/CourseEnroll";
import { CourseFormats } from "@/components/academy/course/CourseFormats";
import { CourseHero } from "@/components/academy/course/CourseHero";
import { CourseOverview } from "@/components/academy/course/CourseOverview";
import { CourseSyllabus } from "@/components/academy/course/CourseSyllabus";
import { CourseCard } from "@/components/academy/CourseCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coursePage, getAcademyCategory } from "@/content/academy";
import { courses, getCourse, toCourseSummary } from "@/content/courses";
import { pageMetadata } from "@/lib/metadata";
import { courseSchema } from "@/lib/structuredData";

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

// Every slug is prerendered, so a navigation here waits on one cached fetch. Reading params
// inside <Suspense> instead would let React paint a placeholder before this large page,
// shifting the layout on direct visits (requirements §15.1).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/academy/courses/[slug]">): Promise<Metadata> {
  const course = getCourse((await params).slug);
  if (!course) return {};
  return pageMetadata({ title: course.title, description: course.summary, path: `/academy/courses/${course.slug}`, ownImage: true });
}

export default async function CoursePage({ params }: PageProps<"/academy/courses/[slug]">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();
  const category = getAcademyCategory(course.category)!;

  // Same path first, then the rest of the catalog.
  const more = [
    ...courses.filter((item) => item.category === course.category && item.slug !== course.slug),
    ...courses.filter((item) => item.category !== course.category),
  ].slice(0, 3);

  return (
    <>
      <JsonLd data={courseSchema(course)} />
      <CourseHero course={course} category={category} />
      <CourseOverview course={course} />
      <CourseSyllabus course={course} />
      <CourseFormats course={course} />
      <CourseDetails course={course} />
      <CourseEnroll course={course} category={category} />
      <Section aria-labelledby="more-courses-title">
        <SectionHeading id="more-courses-title" eyebrow={coursePage.more.eyebrow} title={coursePage.more.title} />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((item) => (
            <li key={item.slug}>
              <CourseCard course={toCourseSummary(item)} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
