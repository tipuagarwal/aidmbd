"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { easeBrand } from "@/components/motion/easing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FilterPills } from "@/components/ui/FilterPills";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { academyPage, courseLevels } from "@/content/academy";
import type { CourseFormat, CourseLevel, CourseSummary } from "@/lib/types";
import { CourseCard } from "./CourseCard";
import { FormatCard } from "./FormatCard";

type FormatFilter = "all" | CourseFormat;
type LevelFilter = "all" | CourseLevel;

const { formats: formatsCopy, catalog: copy } = academyPage;

const formatOptions: Array<{ value: FormatFilter; label: string }> = [
  { value: "all", label: copy.allFormats },
  { value: "live", label: copy.formatOptions.live },
  { value: "recorded", label: copy.formatOptions.recorded },
];

const levelOptions: Array<{ value: LevelFilter; label: string }> = [
  { value: "all", label: copy.allLevels },
  ...(Object.keys(courseLevels) as CourseLevel[]).map((level) => ({ value: level, label: courseLevels[level] })),
];

/**
 * Live vs Recorded plus the filterable course grid. Filters are component state, so the page
 * stays static; Next keeps the page mounted after navigation, so they survive a trip to a course.
 */
export function CourseCatalog({ courses }: { courses: CourseSummary[] }) {
  const [format, setFormat] = useState<FormatFilter>("all");
  const [level, setLevel] = useState<LevelFilter>("all");
  const catalogRef = useRef<HTMLElement>(null);

  const shown = courses.filter(
    (course) => (format === "all" || course.formats.includes(format)) && (level === "all" || course.level === level),
  );

  /** From a Live or Recorded card: filter the grid, then take the visitor to it. */
  function browse(next: CourseFormat) {
    setFormat(next);
    setLevel("all");
    catalogRef.current?.scrollIntoView({ block: "start" });
    catalogRef.current?.querySelector<HTMLInputElement>(`input[name="course-format"][value="${next}"]`)?.focus({ preventScroll: true });
  }

  function reset() {
    setFormat("all");
    setLevel("all");
  }

  return (
    <>
      <Section aria-labelledby="formats-title">
        <SectionHeading
          id="formats-title"
          eyebrow={formatsCopy.eyebrow}
          title={formatsCopy.title}
          intro={formatsCopy.intro}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {(["live", "recorded"] as const).map((item) => (
            <FormatCard
              key={item}
              id={item}
              format={item}
              footer={
                <Button variant="outline" arrow onClick={() => browse(item)}>
                  {formatsCopy.browse[item]}
                </Button>
              }
            />
          ))}
        </div>
      </Section>

      <Section ref={catalogRef} id="courses" tone="raised" aria-labelledby="catalog-title">
        <SectionHeading id="catalog-title" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:gap-12">
          <FilterPills name="course-format" legend={copy.formatLegend} options={formatOptions} value={format} onChange={setFormat} />
          <FilterPills name="course-level" legend={copy.levelLegend} options={levelOptions} value={level} onChange={setLevel} />
        </div>

        <p aria-live="polite" className="mt-8 text-sm text-titanium-500">
          {copy.count(shown.length)}
        </p>

        {shown.length > 0 ? (
          <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((course) => (
                <motion.li
                  key={course.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: easeBrand }}
                >
                  <CourseCard course={course} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <Card className="mt-5 flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-titanium-300">{copy.empty}</p>
            <Button variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </Card>
        )}
      </Section>
    </>
  );
}
