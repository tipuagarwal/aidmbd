import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { caseStudyCategories, caseStudyPage, caseStudyStatus } from "@/content/caseStudies";
import type { CaseStudy } from "@/lib/types";
import { CaseStudyArt } from "./CaseStudyArt";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const category = caseStudyCategories[study.category];

  return (
    <Link href={`/case-studies/${study.slug}`} className="group block h-full rounded-xl">
      <Card interactive padded={false} className="flex h-full flex-col overflow-hidden">
        <CaseStudyArt icon={category.icon} className="aspect-16/10 border-b border-copper-500/20" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-2">
            <Badge tone="copper">{category.label}</Badge>
            {study.isDemo && <Badge>{caseStudyPage.types.demo}</Badge>}
            {study.status === "in-development" && <Badge>{caseStudyStatus[study.status]}</Badge>}
          </div>
          <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors group-hover:text-copper-300">
            {study.title}
          </h3>
          <dl className="mt-4 space-y-3 text-sm leading-relaxed">
            <div>
              <dt className="font-medium text-titanium-300">Challenge</dt>
              <dd className="mt-1 text-titanium-500">{study.problem}</dd>
            </div>
            <div>
              <dt className="font-medium text-titanium-300">Approach</dt>
              <dd className="mt-1 text-titanium-500">{study.solution}</dd>
            </div>
          </dl>
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-copper-400">
            View case study
            <ArrowRight aria-hidden className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
