import { PostCard } from "@/components/blog/PostCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogSection } from "@/content/home";
import { posts } from "@/content/posts";

const latest = posts.slice(0, 3);

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
            <PostCard post={post} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
