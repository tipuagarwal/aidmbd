import { Check, Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coursePage } from "@/content/academy";
import type { Course } from "@/lib/types";

/** Overview, learning outcomes and prerequisites (requirements §8.3, field 2). */
export function CourseOverview({ course }: { course: Course }) {
  const copy = coursePage.overview;

  return (
    <Section tone="raised" aria-labelledby="overview-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionHeading id="overview-title" eyebrow={copy.eyebrow} title={copy.title} intro={course.overview} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {course.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-3 rounded-lg border border-line bg-white/[0.02] px-4 py-3.5 text-sm text-titanium-300"
              >
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-400" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 lg:col-span-4 lg:self-start">
          <Card className="p-7">
            <h3 className="text-lg font-semibold">{copy.prerequisites}</h3>
            <ul className="mt-5 space-y-3">
              {course.prerequisites.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-titanium-300">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-copper-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          {course.notes && (
            <div className="flex gap-3 rounded-xl border border-copper-500/30 bg-copper-500/5 p-5">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-copper-400" />
              <ul className="space-y-2 text-sm leading-relaxed text-titanium-300">
                {course.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
