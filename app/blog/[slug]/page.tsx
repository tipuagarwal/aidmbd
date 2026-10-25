import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { BookingCta } from "@/components/sections/BookingCta";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogCategories, getPost, postPage, posts } from "@/content/posts";
import { longDate } from "@/lib/format";

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

// Every slug is prerendered, so a navigation here waits on one cached fetch (requirements §15.1).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: { type: "article", publishedTime: post.publishedAt, modifiedTime: post.updatedAt },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/blog/${post.slug}.mdx`);
  const more = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
        eyebrow={blogCategories[post.category]}
        title={post.title}
        intro={post.excerpt}
        compact
      >
        <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-sm text-titanium-500">
          <span className="text-titanium-300">{post.author}</span>
          <span aria-hidden>·</span>
          <span>
            {postPage.published} <time dateTime={post.publishedAt}>{longDate.format(new Date(post.publishedAt))}</time>
          </span>
          {post.updatedAt && (
            <>
              <span aria-hidden>·</span>
              <span>
                {postPage.updated} <time dateTime={post.updatedAt}>{longDate.format(new Date(post.updatedAt))}</time>
              </span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{postPage.readingTime(post.readingMinutes)}</span>
        </p>
      </PageHero>

      <Section aria-label={post.title} className="pt-8 md:pt-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <article className="max-w-3xl lg:col-span-8 [&>*:first-child]:mt-0">
            <Body />
          </article>
          <aside className="lg:col-span-4">
            <Card className="p-7 lg:sticky lg:top-28">
              <Overline>{postPage.related[post.related.kind].label}</Overline>
              <p className="mt-3 text-lg font-semibold">{post.related.label}</p>
              <ButtonLink href={post.related.href} variant="outline" className="mt-6">
                {postPage.related[post.related.kind].cta}
              </ButtonLink>
            </Card>
          </aside>
        </div>
      </Section>

      {more.length > 0 && (
        <Section tone="raised" aria-labelledby="more-posts-title">
          <SectionHeading id="more-posts-title" eyebrow={postPage.more.eyebrow} title={postPage.more.title} />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {more.map((item) => (
              <li key={item.slug}>
                <PostCard post={item} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <BookingCta eyebrow={postPage.cta.eyebrow} title={postPage.cta.title} intro={postPage.cta.intro} />
    </>
  );
}
