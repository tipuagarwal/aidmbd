import { Info } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryPage } from "@/content/academy";

/** The research learner's path, with the cautions every research page carries (requirements §8.2). */
export function ResearchPath({ notes }: { notes: string[] }) {
  const copy = categoryPage.researchPath;

  return (
    <Section aria-labelledby="research-path-title">
      <SectionHeading id="research-path-title" eyebrow={copy.eyebrow} title={copy.title} />
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {copy.steps.map((step, index) => (
          <li key={step.title} className="border-t border-copper-500/40 pt-5">
            <span className="font-mono text-xs text-copper-400">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-titanium-500">{step.description}</p>
          </li>
        ))}
      </ol>
      {notes.length > 0 && (
        <div className="mt-12 flex gap-3 rounded-xl border border-copper-500/30 bg-copper-500/5 p-5 lg:max-w-3xl">
          <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-copper-400" />
          <ul className="space-y-2 text-sm leading-relaxed text-titanium-300">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
