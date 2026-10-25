import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryPage } from "@/content/academy";
import type { AcademyCategory } from "@/lib/types";

function ModuleList({ modules, start = 1 }: { modules: string[]; start?: number }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {modules.map((module, index) => (
        <li key={module} className="flex items-baseline gap-4 rounded-lg border border-line bg-white/[0.02] px-4 py-3.5">
          <span className="font-mono text-xs text-copper-400">{String(start + index).padStart(2, "0")}</span>
          <span className="text-sm text-titanium-300">{module}</span>
        </li>
      ))}
    </ol>
  );
}

/** The path's modules, or the language tracks for Programming (requirements §8.2). */
export function CategorySyllabus({ category }: { category: AcademyCategory }) {
  const { syllabus, tracks: tracksCopy } = categoryPage;

  if (category.tracks) {
    return (
      <Section tone="raised" aria-labelledby="syllabus-title">
        <SectionHeading id="syllabus-title" eyebrow={tracksCopy.eyebrow} title={tracksCopy.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {category.tracks.map((track) => (
            <Card key={track.language} className="p-7">
              <h3 className="text-xl font-semibold">{track.language}</h3>
              <Overline className="mt-6">{tracksCopy.topics}</Overline>
              <ul className="mt-3 flex flex-wrap gap-2">
                {track.topics.map((topic) => (
                  <li key={topic} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-sm text-titanium-300">
                    {topic}
                  </li>
                ))}
              </ul>
              <Overline className="mt-6">{tracksCopy.project}</Overline>
              <p className="mt-2 text-titanium-300">{track.sampleProject}</p>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section tone="raised" aria-labelledby="syllabus-title">
      <SectionHeading id="syllabus-title" eyebrow={syllabus.eyebrow} title={syllabus.title} />
      <div className="mt-12">
        <ModuleList modules={category.modules} />
      </div>
      {category.advancedModules && (
        <div className="mt-12">
          <h3 className="text-lg font-semibold">{category.advancedModules.title}</h3>
          <div className="mt-5">
            <ModuleList modules={category.advancedModules.modules} start={category.modules.length + 1} />
          </div>
        </div>
      )}
    </Section>
  );
}
