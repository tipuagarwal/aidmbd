import { courseFormats, courseLevels } from "@/content/academy";
import { blogCategories } from "@/content/posts";
import { site } from "@/content/site";
import type { Course, LinkItem, Post, Service } from "@/lib/types";
import { absoluteUrl } from "./siteUrl";

// schema.org data for search engines (requirements §15.1). Only facts the site already states
// are included: no prices, ratings or schedules until the client confirms them. Add `sameAs`
// (social profiles) and a `contactPoint` to the organization once those details exist.

const context = "https://schema.org";
const organizationId = absoluteUrl("/#organization");

export function siteSchema() {
  return {
    "@context": context,
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        alternateName: site.shortName,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/brand/logo.png"),
        description: site.description,
        slogan: site.footerTagline,
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: site.name,
        url: absoluteUrl("/"),
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function breadcrumbSchema(items: LinkItem[]) {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": context,
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": organizationId },
  };
}

export function courseSchema(course: Course) {
  return {
    "@context": context,
    "@type": "Course",
    name: course.title,
    description: course.summary,
    url: absoluteUrl(`/academy/courses/${course.slug}`),
    educationalLevel: courseLevels[course.level],
    provider: { "@type": "Organization", "@id": organizationId, name: site.name, sameAs: absoluteUrl("/") },
    hasCourseInstance: course.formats.map((format) => ({
      "@type": "CourseInstance",
      courseMode: format === "live" ? "Online, live" : "Online, self-paced",
      name: `${course.title} (${courseFormats[format]})`,
    })),
  };
}

export function articleSchema(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": context,
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: blogCategories[post.category],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author, url: absoluteUrl("/about") },
    publisher: { "@id": organizationId },
    mainEntityOfPage: url,
    url,
    image: `${url}/opengraph-image`,
  };
}
