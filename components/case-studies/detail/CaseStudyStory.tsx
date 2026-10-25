import { Check, Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudyPage } from "@/content/caseStudies";
import type { CaseStudy } from "@/lib/types";

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-lg border border-line bg-white/[0.02] px-4 py-3.5 text-sm text-titanium-300"
        >
          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-400" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * The case study itself, in the order requirements §10 sets: context and problem with
 * objectives, scope and AIDMBD's role, the solution, then verified results and limitations.
 */
export function CaseStudyStory({ study }: { study: CaseStudy }) {
  const copy = caseStudyPage;

  return (
    <>
      <Section aria-labelledby="challenge-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading id="challenge-title" eyebrow={copy.context.eyebrow} title={copy.context.title} />
            <p className="mt-6 text-lg leading-relaxed text-titanium-300">{study.context}</p>
            <p className="mt-4 text-lg leading-relaxed text-titanium-500">{study.problem}</p>
          </div>
          <Card className="p-7 lg:col-span-5 lg:self-start">
            <h3 className="text-lg font-semibold">{copy.objectives}</h3>
            <ol className="mt-6 space-y-4">
              {study.objectives.map((objective, index) => (
                <li key={objective} className="flex gap-4 text-sm leading-relaxed text-titanium-300">
                  <span className="font-mono text-xs leading-6 text-copper-400">{String(index + 1).padStart(2, "0")}</span>
                  {objective}
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </Section>

      <Section tone="raised" aria-labelledby="scope-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading id="scope-title" eyebrow={copy.scope.eyebrow} title={copy.scope.title} />
            <div className="mt-10">
              <Checklist items={study.scope} />
            </div>
          </div>
          <Card className="p-7 lg:col-span-4 lg:self-end">
            <Overline>{copy.scope.role}</Overline>
            <p className="mt-3 leading-relaxed text-titanium-300">{study.role}</p>
          </Card>
        </div>
      </Section>

      <Section aria-labelledby="solution-title">
        <SectionHeading id="solution-title" eyebrow={copy.solution.eyebrow} title={copy.solution.title} intro={study.solution} />
        <div className="mt-10">
          <Checklist items={study.features} />
        </div>
      </Section>

      <Section tone="raised" aria-labelledby="results-title">
        <SectionHeading id="results-title" eyebrow={copy.results.eyebrow} title={copy.results.title} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {study.results.length > 0 ? (
            <Card className="p-7">
              <ul className="space-y-3">
                {study.results.map((result) => (
                  <li key={result} className="flex gap-3 leading-relaxed text-titanium-300">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-copper-400" />
                    {result}
                  </li>
                ))}
              </ul>
            </Card>
          ) : (
            <div className="flex gap-3 rounded-xl border border-copper-500/30 bg-copper-500/5 p-6">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-copper-400" />
              <p className="leading-relaxed text-titanium-300">{copy.results.pending}</p>
            </div>
          )}
          {study.limitations && (
            <Card className="p-7">
              <Overline>{copy.results.limitations}</Overline>
              <p className="mt-3 leading-relaxed text-titanium-300">{study.limitations}</p>
            </Card>
          )}
        </div>
      </Section>
    </>
  );
}
