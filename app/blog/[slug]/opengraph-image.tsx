import { blogCategories, getPost, posts } from "@/content/posts";
import { site } from "@/content/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `An article from the ${site.shortName} blog`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return renderOgImage({ eyebrow: post ? blogCategories[post.category] : "Blog", title: post?.title ?? site.name });
}
