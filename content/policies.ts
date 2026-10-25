import type { LinkItem } from "@/lib/types";

// Each policy's text is content/policies/<slug>.mdx. These are plain-English drafts that describe
// only what the site does today: they must be reviewed by a lawyer and confirmed by the client
// before launch, then given an `updatedAt` date. Update the privacy policy whenever the site adds
// analytics, cookies, payments or accounts.
export type Policy = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, set when the reviewed text is published. */
  updatedAt?: string;
};

export const policies: Policy[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "What we collect through this website, why we collect it, and the choices you have.",
  },
  {
    slug: "terms",
    title: "Terms of Service",
    summary: "The terms for using this website, including how requests, courses and certificates work.",
  },
  {
    slug: "refund",
    title: "Refund Policy",
    summary: "How refunds work for courses and services.",
  },
  {
    slug: "cancellation",
    title: "Cancellation Policy",
    summary: "Cancelling or rescheduling meetings, projects and course enrollments.",
  },
];

export function getPolicy(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}

export const policyPage = {
  eyebrow: "Policies",
  updated: "Last updated",
  others: "Other policies",
  questions: {
    title: "Questions about this policy?",
    intro: "Send us a message and we'll answer by email.",
    cta: { label: "Contact us", href: "/contact" } satisfies LinkItem,
  },
};
