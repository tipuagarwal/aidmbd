import { courseLevels, getAcademyCategory } from "@/content/academy";
import { courses, getCourse } from "@/content/courses";
import { site } from "@/content/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `A course at the ${site.shortName} Learning Academy`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const course = getCourse((await params).slug);
  if (!course) return renderOgImage({ eyebrow: "Learning Academy", title: site.name });
  const category = getAcademyCategory(course.category);
  return renderOgImage({ eyebrow: `${category?.title} · ${courseLevels[course.level]}`, title: course.title });
}
