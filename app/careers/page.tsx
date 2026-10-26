import type { Metadata } from "next";
import { Check, ShieldCheck } from "lucide-react";
import { TalentPoolForm } from "@/components/careers/TalentPoolForm";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { careersPage, openings } from "@/content/careers";
import { longDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description: careersPage.description,
  path: "/careers",
});

export default function CareersPage() {
  const { why, openings: openingsCopy, process, talentPool, privacy } = careersPage;
  const labels = openingsCopy.labels;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
        eyebrow={careersPage.eyebrow}
        title={careersPage.title}
        intro={careersPage.intro}
      />

      <Section tone="raised" aria-labelledby="why-title">
        <SectionHeading id="why-title" eyebrow={why.eyebrow} title={why.title} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.points.map((point) => (
            <Card key={point.title} className="h-full">
              <h3 className="font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-titanium-500">{point.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="openings-title">
        <SectionHeading id="openings-title" eyebrow={openingsCopy.eyebrow} title={openingsCopy.title} intro={openingsCopy.terms} />
        {openings.length > 0 ? (
          <ul className="mt-12 space-y-6">
            {openings.map((opening) => (
              <li key={opening.slug}>
                <Card className="p-7 md:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold">{opening.title}</h3>
                    <Badge tone="copper">{opening.type}</Badge>
                  </div>
                  <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                    <div className="flex gap-2">
                      <dt className="text-titanium-500">{labels.location}</dt>
                      <dd className="text-titanium-300">{opening.location}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-titanium-500">{labels.deadline}</dt>
                      <dd className="text-titanium-300">
                        <time dateTime={opening.deadline}>{longDate.format(new Date(opening.deadline))}</time>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {[
                      { title: labels.responsibilities, items: opening.responsibilities },
                      { title: labels.skills, items: opening.skills },
                    ].map((list) => (
                      <div key={list.title}>
                        <Overline>{list.title}</Overline>
                        <ul className="mt-3 space-y-2 text-sm text-titanium-300">
                          {list.items.map((item) => (
                            <li key={item} className="flex gap-3">
                              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <Card className="mt-12 p-7 md:p-8">
            <h3 className="text-xl font-semibold">{openingsCopy.none.title}</h3>
            <p className="mt-2 leading-relaxed text-titanium-500">{openingsCopy.none.intro}</p>
          </Card>
        )}
      </Section>

      <Section tone="raised" aria-labelledby="hiring-title">
        <SectionHeading id="hiring-title" eyebrow={process.eyebrow} title={process.title} />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {process.steps.map((step, index) => (
            <li key={step.title} className="border-t border-copper-500/40 pt-5">
              <span className="font-mono text-xs text-copper-400">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-titanium-500">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="talent-pool" aria-labelledby="talent-pool-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="talent-pool-title" eyebrow={talentPool.eyebrow} title={talentPool.title} intro={talentPool.intro} />
            <div className="mt-10 flex gap-4 rounded-xl border border-line bg-white/[0.02] p-6">
              <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-copper-400" />
              <div>
                <h3 className="font-semibold">{privacy.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-titanium-500">
                  {privacy.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Card className="p-6 sm:p-8 lg:col-span-7">
            <TalentPoolForm />
          </Card>
        </div>
      </Section>
    </>
  );
}
