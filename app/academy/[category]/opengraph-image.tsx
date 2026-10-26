import { academyCategories, categoryPage, getAcademyCategory } from "@/content/academy";
import { site } from "@/content/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `A learning path at the ${site.shortName} Learning Academy`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return academyCategories.map(({ slug }) => ({ category: slug }));
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const category = getAcademyCategory((await params).category);
  return renderOgImage({ eyebrow: categoryPage.eyebrow, title: category?.title ?? site.name });
}
