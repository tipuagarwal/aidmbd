import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { academyCategories } from "@/content/academy";
import { caseStudies } from "@/content/caseStudies";
import { posts } from "@/content/posts";
import { primaryCta } from "@/content/site";

// Temporary placeholders so every link resolves while later phases build the real pages
// (requirements.md §5.2). A real route always wins over this catch-all; delete an entry
// once its page exists, and this file once the list is empty.
const plannedPages: Record<string, string> = {
  academy: "Learning Academy",
  ...Object.fromEntries(academyCategories.map((c) => [`academy/${c.slug}`, c.title])),
  "case-studies": "Case Studies",
  ...Object.fromEntries(caseStudies.map((c) => [`case-studies/${c.slug}`, c.title])),
  blog: "Blog",
  ...Object.fromEntries(posts.map((p) => [`blog/${p.slug}`, p.title])),
  about: "About AIDMBD",
  careers: "Careers",
  contact: "Contact",
  faq: "FAQ",
  "policies/privacy": "Privacy Policy",
  "policies/terms": "Terms of Service",
  "policies/refund": "Refund Policy",
  "policies/cancellation": "Cancellation Policy",
};

export function generateStaticParams() {
  return Object.keys(plannedPages).map((key) => ({ path: key.split("/") }));
}

async function getTitle(params: PageProps<"/[...path]">["params"]) {
  const { path } = await params;
  return plannedPages[path.join("/")];
}

export async function generateMetadata({ params }: PageProps<"/[...path]">): Promise<Metadata> {
  const title = await getTitle(params);
  return title ? { title, robots: { index: false } } : {};
}

export default async function PlannedPage({ params }: PageProps<"/[...path]">) {
  const title = await getTitle(params);
  if (!title) notFound();

  return (
    <Section aria-labelledby="planned-title" className="md:py-36">
      <SectionHeading
        as="h1"
        id="planned-title"
        eyebrow="Coming soon"
        title={title}
        intro="We're putting the finishing touches on this page. In the meantime, book a consultation and we'll answer your questions directly."
      />
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
      </div>
    </Section>
  );
}
