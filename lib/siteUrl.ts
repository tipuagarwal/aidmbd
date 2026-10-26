// The public origin for canonical URLs, the sitemap, social images and structured data.
// Set SITE_URL for production builds; Vercel's production domain is used if it isn't set.
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = new URL(
  process.env.SITE_URL ?? (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000"),
);

/** An absolute URL for a site path, such as "/blog". */
export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
