import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coursePage } from "@/content/academy";
import type { Course } from "@/lib/types";

/** Module-wise syllabus and project list (requirements §8.3, field 3). */
export function CourseSyllabus({ course }: { course: Course }) {
  const copy = coursePage.syllabus;

  return (
    <Section aria-labelledby="syllabus-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionHeading id="syllabus-title" eyebrow={copy.eyebrow} title={copy.title} />
          <ol className="mt-10 grid gap-3 sm:grid-cols-2">
            {course.syllabus.map((module, index) => (
              <li
                key={module}
                className="flex items-baseline gap-4 rounded-lg border border-line bg-white/[0.02] px-4 py-3.5"
              >
                <span className="font-mono text-xs text-copper-400">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm text-titanium-300">{module}</span>
              </li>
            ))}
          </ol>
        </div>

        <Card className="p-7 lg:col-span-4 lg:self-start">
          <h3 className="text-lg font-semibold">{copy.projects}</h3>
          <ul className="mt-5 space-y-4">
            {course.projects.map((project) => (
              <li key={project} className="flex gap-3 text-sm leading-relaxed text-titanium-300">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-copper-500" />
                {project}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
