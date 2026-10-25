import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/content/caseStudies";
import { caseStudiesSection } from "@/content/home";

const featured = caseStudies.filter((study) => study.featured).slice(0, 3);

export function CaseStudiesPreview() {
  if (featured.length === 0) return null;

  return (
    <Section aria-labelledby="case-studies-title">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="case-studies-title"
          eyebrow={caseStudiesSection.eyebrow}
          title={caseStudiesSection.title}
          intro={caseStudiesSection.intro}
        />
        <ButtonLink href={caseStudiesSection.cta.href} variant="outline" className="self-start lg:self-auto">
          {caseStudiesSection.cta.label}
        </ButtonLink>
      </div>
      <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((study) => (
          <StaggerItem key={study.slug} className="h-full">
            <CaseStudyCard study={study} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
