import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coursePage } from "@/content/academy";
import type { Course } from "@/lib/types";
import { FormatCard } from "../FormatCard";

/** Live vs Recorded for this course, with the live batch details (requirements §8.3, field 6). */
export function CourseFormats({ course }: { course: Course }) {
  const copy = coursePage.formats;

  return (
    <Section tone="raised" aria-labelledby="formats-title">
      <SectionHeading id="formats-title" eyebrow={copy.eyebrow} title={copy.title} />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {(["live", "recorded"] as const).map((format) => {
          const offered = course.formats.includes(format);
          return (
            <FormatCard
              key={format}
              format={format}
              badge={<Badge tone={offered ? "copper" : "neutral"}>{offered ? copy.offered : copy.notOffered}</Badge>}
              footer={
                format === "live" && offered ? (
                  <div className="border-t border-line pt-6 text-sm">
                    <p className="text-titanium-500">
                      {copy.schedule}:{" "}
                      <span className={course.schedule ? "font-medium text-titanium-50" : undefined}>
                        {course.schedule ?? coursePage.pending}
                      </span>
                    </p>
                    <p className="mt-2 text-titanium-500">{copy.recordings}</p>
                  </div>
                ) : undefined
              }
            />
          );
        })}
      </div>
    </Section>
  );
}
