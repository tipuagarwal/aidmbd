import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogSection } from "@/content/home";
import { blogCategories, posts } from "@/content/posts";

const latest = posts.slice(0, 3);

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function LatestPosts() {
  if (latest.length === 0) return null;

  return (
    <Section aria-labelledby="blog-title">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="blog-title" eyebrow={blogSection.eyebrow} title={blogSection.title} intro={blogSection.intro} />
        <ButtonLink href={blogSection.cta.href} variant="outline" className="self-start lg:self-auto">
          {blogSection.cta.label}
        </ButtonLink>
      </div>
      <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
        {latest.map((post) => (
          <StaggerItem key={post.slug} className="h-full">
            <Link href={`/blog/${post.slug}`} className="group block h-full rounded-xl">
              <Card interactive className="flex h-full flex-col">
                <Badge tone="copper" className="self-start">
                  {blogCategories[post.category]}
                </Badge>
                <h3 className="mt-5 text-lg font-semibold leading-snug transition-colors group-hover:text-copper-300">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-titanium-500">{post.excerpt}</p>
                <p className="mt-6 flex flex-wrap gap-x-2 border-t border-line pt-5 text-xs text-titanium-500">
                  <span>{post.author}</span>
                  <span aria-hidden>·</span>
                  {post.publishedAt && (
                    <>
                      <time dateTime={post.publishedAt}>{dateFormat.format(new Date(post.publishedAt))}</time>
                      <span aria-hidden>·</span>
                    </>
                  )}
                  <span>{post.readingMinutes} min read</span>
                </p>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
