import { CategoryCard } from "@/components/academy/CategoryCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { academyCategories } from "@/content/academy";
import { academySection } from "@/content/home";

export function AcademyPreview() {
  return (
    <Section id="academy" tone="raised" aria-labelledby="academy-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <SectionHeading
          id="academy-title"
          eyebrow={academySection.eyebrow}
          title={academySection.title}
          intro={academySection.intro}
          className="lg:col-span-7"
        />
        <div className="lg:col-span-5">
          <p className="leading-relaxed text-titanium-500">{academySection.formats}</p>
          <ButtonLink href={academySection.cta.href} className="mt-6">
            {academySection.cta.label}
          </ButtonLink>
        </div>
      </div>

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {academyCategories.map((category) => (
          <StaggerItem key={category.slug} className="h-full">
            <CategoryCard category={category} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
