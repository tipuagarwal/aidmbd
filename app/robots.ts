import type { MetadataRoute } from "next";

// The sitemap entry is added in Phase 6, once the production domain is known.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
