import { caseStudies, caseStudyCategories, caseStudyPage, getCaseStudy } from "@/content/caseStudies";
import { site } from "@/content/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `A case study from ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) return renderOgImage({ eyebrow: "Case study", title: site.name });
  // Demo Projects stay labelled wherever they're shared.
  const label = study.isDemo ? caseStudyPage.types.demo : caseStudyCategories[study.category].label;
  return renderOgImage({ eyebrow: label, title: study.title });
}
