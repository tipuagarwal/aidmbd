"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { easeBrand } from "@/components/motion/easing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FilterPills } from "@/components/ui/FilterPills";
import { caseStudiesPage as copy, caseStudyCategories } from "@/content/caseStudies";
import type { CaseStudy, CaseStudyCategory } from "@/lib/types";
import { CaseStudyCard } from "./CaseStudyCard";

type Filter = "all" | CaseStudyCategory;

const options: Array<{ value: Filter; label: string }> = [
  { value: "all", label: copy.all },
  ...(Object.keys(caseStudyCategories) as CaseStudyCategory[]).map((category) => ({
    value: category,
    label: caseStudyCategories[category].label,
  })),
];

/** Category filter and grid. The filter is component state, so the page stays static. */
export function CaseStudyCatalog({ studies }: { studies: CaseStudy[] }) {
  const [category, setCategory] = useState<Filter>("all");
  const shown = studies.filter((study) => category === "all" || study.category === category);

  return (
    <>
      <FilterPills name="case-study-category" legend={copy.filterLegend} options={options} value={category} onChange={setCategory} />
      <p aria-live="polite" className="mt-8 text-sm text-titanium-500">
        {copy.count(shown.length)}
      </p>

      {shown.length > 0 ? (
        <ul className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((study) => (
              <motion.li
                key={study.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: easeBrand }}
              >
                <CaseStudyCard study={study} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <Card className="mt-5 flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-titanium-50">{copy.empty.title}</p>
            <p className="mt-1 text-titanium-500">{copy.empty.intro}</p>
          </div>
          <Button variant="outline" onClick={() => setCategory("all")}>
            {copy.reset}
          </Button>
        </Card>
      )}
    </>
  );
}
