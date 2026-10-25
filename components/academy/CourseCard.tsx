import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { IconCircleArrow } from "@/components/ui/IconCircleArrow";
import { Overline } from "@/components/ui/Overline";
import { courseFormats, courseLevels, courseStatus } from "@/content/academy";
import type { CourseSummary } from "@/lib/types";

export function CourseCard({ course }: { course: CourseSummary }) {
  return (
    <Link href={`/academy/courses/${course.slug}`} className="group block h-full rounded-xl">
      <Card interactive className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <Overline className="text-copper-400">{course.categoryTitle}</Overline>
          <Badge className="shrink-0">{courseStatus[course.status].badge}</Badge>
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors group-hover:text-copper-300">
          {course.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-titanium-500">{course.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          <li>
            <Badge tone="copper">{courseLevels[course.level]}</Badge>
          </li>
          {course.formats.map((format) => (
            <li key={format}>
              <Badge>{courseFormats[format]}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="text-sm text-titanium-500">{course.moduleCount} modules</span>
          <IconCircleArrow />
        </div>
      </Card>
    </Link>
  );
}
