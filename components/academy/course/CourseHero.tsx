import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { categoryPage, coursePage, courseFormats, courseLevels, courseStatus } from "@/content/academy";
import { bookingHref } from "@/content/booking";
import type { AcademyCategory, Course } from "@/lib/types";

/** Key facts at a glance. Anything the client hasn't confirmed yet reads as pending. */
function CourseFacts({ course }: { course: Course }) {
  const copy = coursePage.facts;
  const facts = [
    { label: copy.format, value: course.formats.map((format) => courseFormats[format]).join(" · ") },
    { label: copy.level, value: courseLevels[course.level] },
    { label: copy.language, value: course.language },
    { label: copy.duration, value: course.duration },
    ...(course.formats.includes("live") ? [{ label: copy.schedule, value: course.schedule }] : []),
    { label: copy.fee, value: course.fee },
    { label: copy.status, value: courseStatus[course.status].badge },
  ];

  return (
    <Card className="p-6 sm:p-7">
      <dl className="divide-y divide-line">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-baseline justify-between gap-6 py-3 first:pt-0 last:pb-0">
            <dt className="text-sm text-titanium-500">{fact.label}</dt>
            <dd className={fact.value ? "text-right font-medium text-titanium-50" : "text-right text-sm text-titanium-500"}>
              {fact.value ?? coursePage.pending}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

/** Title, format and level, with the enroll and question CTAs (requirements §8.3, fields 1 and 13). */
export function CourseHero({ course, category }: { course: Course; category: AcademyCategory }) {
  return (
    <PageHero
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Academy", href: "/academy" },
        { label: category.title, href: `/academy/${category.slug}` },
        { label: course.title, href: `/academy/courses/${course.slug}` },
      ]}
      eyebrow={category.title}
      title={course.title}
      intro={course.summary}
      aside={<CourseFacts course={course} />}
    >
      <ul className="mt-6 flex flex-wrap gap-2">
        <li>
          <Badge tone="copper">{courseLevels[course.level]}</Badge>
        </li>
        {course.formats.map((format) => (
          <li key={format}>
            <Badge>{courseFormats[format]}</Badge>
          </li>
        ))}
        <li>
          <Badge>{courseStatus[course.status].badge}</Badge>
        </li>
      </ul>
      <div className="mt-8 flex flex-wrap gap-4">
        <ButtonLink href="#enroll" size="lg">
          {courseStatus[course.status].cta}
        </ButtonLink>
        <ButtonLink href={bookingHref(category.guidance, { course: category.slug })} variant="outline" size="lg">
          {categoryPage.questions}
        </ButtonLink>
      </div>
    </PageHero>
  );
}
