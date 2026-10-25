import { FolderSearch } from "lucide-react";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/content/caseStudies";
import { serviceDetail } from "@/content/services";
import type { Service } from "@/lib/types";

/** Case studies linked to this service, or an offer of samples when none are published. */
export function ServiceProof({ service }: { service: Service }) {
  const related = caseStudies.filter((study) => study.relatedService === service.slug);

  return (
    <Section tone="raised" aria-labelledby="proof-title">
      <SectionHeading id="proof-title" eyebrow={serviceDetail.proof.eyebrow} title={serviceDetail.proof.title} />
      {related.length > 0 ? (
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((study) => (
            <StaggerItem key={study.slug} className="h-full">
              <CaseStudyCard study={study} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <Card className="mt-12 flex flex-col gap-6 p-8 md:flex-row md:items-center">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-copper-500/30 bg-copper-500/10">
            <FolderSearch aria-hidden className="size-7 text-copper-400" />
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{serviceDetail.noProof.title}</h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-titanium-500">{serviceDetail.noProof.intro}</p>
          </div>
          <ButtonLink href={service.cta.href} variant="outline">
            {service.cta.label}
          </ButtonLink>
        </Card>
      )}
    </Section>
  );
}
