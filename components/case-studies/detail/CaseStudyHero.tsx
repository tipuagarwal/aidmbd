import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { caseStudyCategories, caseStudyPage, caseStudyStatus, similarProjectHref } from "@/content/caseStudies";
import { getService } from "@/content/services";
import type { CaseStudy } from "@/lib/types";

export function CaseStudyHero({ study }: { study: CaseStudy }) {
  const category = caseStudyCategories[study.category];
  const service = getService(study.relatedService);
  const { facts, types } = caseStudyPage;
  const rows = [
    { label: facts.category, value: category.label },
    { label: facts.type, value: study.isDemo ? types.demo : types.client },
    { label: facts.status, value: caseStudyStatus[study.status] },
    { label: facts.service, value: service?.title },
  ];

  return (
    <PageHero
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Case Studies", href: "/case-studies" },
        { label: study.title, href: `/case-studies/${study.slug}` },
      ]}
      eyebrow={category.label}
      title={study.title}
      intro={study.summary}
      aside={
        <Card className="p-6 sm:p-7">
          <dl className="divide-y divide-line">
            {rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-6 py-3 first:pt-0 last:pb-0">
                <dt className="text-sm text-titanium-500">{row.label}</dt>
                <dd className="text-right font-medium text-titanium-50">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      }
    >
      <ul className="mt-6 flex flex-wrap gap-2">
        <li>
          <Badge tone="copper">{category.label}</Badge>
        </li>
        {study.isDemo && (
          <li>
            <Badge>{types.demo}</Badge>
          </li>
        )}
        <li>
          <Badge>{caseStudyStatus[study.status]}</Badge>
        </li>
      </ul>
      <div className="mt-8 flex flex-wrap gap-4">
        <ButtonLink href={similarProjectHref(study)} size="lg">
          {caseStudyPage.similar}
        </ButtonLink>
        {service && (
          <ButtonLink href={`/services/${service.slug}`} variant="outline" size="lg">
            {service.title}
          </ButtonLink>
        )}
      </div>
    </PageHero>
  );
}
