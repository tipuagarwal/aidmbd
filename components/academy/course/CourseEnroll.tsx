import { Orbit } from "@/components/motion/Orbit";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryPage, coursePage } from "@/content/academy";
import { bookingHref } from "@/content/booking";
import type { AcademyCategory, Course } from "@/lib/types";
import { WaitlistForm } from "../WaitlistForm";

/** Join the waitlist or request enrollment, or ask a question first (requirements §8.3, field 13). */
export function CourseEnroll({ course, category }: { course: Course; category: AcademyCategory }) {
  const copy = course.status === "enrolling" ? coursePage.enroll : coursePage.waitlist;

  return (
    <Section id="enroll" tone="raised" aria-labelledby="enroll-title" className="relative overflow-hidden">
      <div aria-hidden className="bg-glow-copper absolute -bottom-1/2 -left-1/4 size-192 opacity-60" />
      <Orbit tilt={-14} className="pointer-events-none absolute -top-24 -right-40 hidden w-[36rem] opacity-60 lg:block" />
      <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionHeading id="enroll-title" eyebrow={copy.eyebrow} title={copy.title(course.title)} intro={copy.intro} />
          <p className="mt-8 text-titanium-300">{copy.ask}</p>
          <ButtonLink
            href={bookingHref(category.guidance, { course: category.slug })}
            variant="link"
            arrow
            className="mt-2"
          >
            {categoryPage.questions}
          </ButtonLink>
        </div>
        <Card className="bg-ink-900/80 p-6 backdrop-blur-sm sm:p-8 lg:col-span-6">
          <WaitlistForm course={{ slug: course.slug, title: course.title, formats: course.formats, status: course.status }} />
        </Card>
      </div>
    </Section>
  );
}
