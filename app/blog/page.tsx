import type { Metadata } from "next";
import { BlogCatalog } from "@/components/blog/BlogCatalog";
import { BookingCta } from "@/components/sections/BookingCta";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { blogPage, posts, postPage } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: blogPage.description,
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        eyebrow={blogPage.eyebrow}
        title={blogPage.title}
        intro={blogPage.intro}
      />
      <Section tone="raised" aria-labelledby="articles-title">
        <h2 id="articles-title" className="sr-only">
          {blogPage.listTitle}
        </h2>
        <BlogCatalog posts={posts} />
      </Section>
      <BookingCta eyebrow={postPage.cta.eyebrow} title={postPage.cta.title} intro={postPage.cta.intro} />
    </>
  );
}
