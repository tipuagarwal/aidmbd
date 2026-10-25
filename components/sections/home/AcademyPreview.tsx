import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { academyCategories, courseFormats } from "@/content/academy";
import { academySection } from "@/content/home";
import type { AcademyCategory } from "@/lib/types";

function contentCount(category: AcademyCategory) {
  if (category.tracks) return `${category.tracks.length} languages`;
  const modules = category.modules.length + (category.advancedModules?.modules.length ?? 0);
  return `${modules} modules`;
}

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
            <Link href={`/academy/${category.slug}`} className="group block h-full rounded-xl">
              <Card interactive className="flex h-full flex-col">
                <Icon name={category.icon} className="size-8 text-copper-400" />
                <h3 className="mt-5 font-semibold leading-snug transition-colors group-hover:text-copper-300">
                  {category.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-titanium-500">{category.summary}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <ul className="flex gap-2">
                    {category.formats.map((format) => (
                      <li key={format}>
                        <Badge tone="copper">{courseFormats[format]}</Badge>
                      </li>
                    ))}
                  </ul>
                  <span className="text-xs text-titanium-500">{contentCount(category)}</span>
                </div>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
