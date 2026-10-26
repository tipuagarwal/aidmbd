import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadata = {
  /** Omit on the home page to keep the default title. */
  title?: string;
  description: string;
  /** The page's path, such as "/services/ai-automation". */
  path: string;
  article?: { publishedTime: string; modifiedTime?: string; authors: string[] };
  /** The route has its own opengraph-image file. Images set here would override it. */
  ownImage?: boolean;
};

/** The site-wide social image from app/opengraph-image.tsx. */
const defaultImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` };

/**
 * Title, description, canonical URL and social cards for one page. The social fields are
 * complete on every page because Next replaces a parent's `openGraph`, rather than merging it.
 */
export function pageMetadata({ title, description, path, article, ownImage = false }: PageMetadata): Metadata {
  const socialTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`;
  const images = ownImage ? {} : { images: [defaultImage] };

  return {
    // An explicit undefined would replace the layout's default title, so leave the key out.
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en",
      ...images,
      ...(article ? { type: "article", ...article } : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, ...images },
  };
}
