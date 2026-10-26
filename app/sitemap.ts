import type { MetadataRoute } from "next";
import { academyCategories } from "@/content/academy";
import { caseStudies } from "@/content/caseStudies";
import { courses } from "@/content/courses";
import { policies } from "@/content/policies";
import { posts } from "@/content/posts";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/siteUrl";

const staticPaths = ["/", "/services", "/academy", "/case-studies", "/blog", "/book", "/about", "/careers", "/contact", "/faq"];

// Every public page, built from the same content as the routes. Only content with a real date
// gets lastModified; the rest is left out rather than guessed.
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, lastModified?: string) => ({ url: absoluteUrl(path), ...(lastModified && { lastModified }) });

  return [
    ...staticPaths.map((path) => entry(path)),
    ...services.map(({ slug }) => entry(`/services/${slug}`)),
    ...academyCategories.map(({ slug }) => entry(`/academy/${slug}`)),
    ...courses.map(({ slug }) => entry(`/academy/courses/${slug}`)),
    ...caseStudies.map(({ slug }) => entry(`/case-studies/${slug}`)),
    ...posts.map(({ slug, publishedAt, updatedAt }) => entry(`/blog/${slug}`, updatedAt ?? publishedAt)),
    ...policies.map(({ slug, updatedAt }) => entry(`/policies/${slug}`, updatedAt)),
  ];
}
