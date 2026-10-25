import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { Section } from "@/components/ui/Section";
import { getPolicy, policies, policyPage } from "@/content/policies";
import { longDate } from "@/lib/format";

export function generateStaticParams() {
  return policies.map(({ slug }) => ({ slug }));
}

// Every slug is prerendered, so a navigation here waits on one cached fetch (requirements §15.1).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const policy = getPolicy((await params).slug);
  if (!policy) return {};
  return { title: policy.title, description: policy.summary };
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const policy = getPolicy((await params).slug);
  if (!policy) notFound();

  const { default: Body } = await import(`@/content/policies/${policy.slug}.mdx`);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: policy.title, href: `/policies/${policy.slug}` },
        ]}
        eyebrow={policyPage.eyebrow}
        title={policy.title}
        intro={policy.summary}
      >
        {policy.updatedAt && (
          <p className="mt-6 text-sm text-titanium-500">
            {policyPage.updated} <time dateTime={policy.updatedAt}>{longDate.format(new Date(policy.updatedAt))}</time>
          </p>
        )}
      </PageHero>

      <Section aria-label={policy.title} className="pt-8 md:pt-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <article className="max-w-3xl lg:col-span-8 [&>*:first-child]:mt-0">
            <Body />
          </article>
          <aside className="space-y-6 lg:col-span-4">
            <Card className="p-7">
              <Overline>{policyPage.others}</Overline>
              <ul className="mt-4 space-y-1">
                {policies
                  .filter((item) => item.slug !== policy.slug)
                  .map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/policies/${item.slug}`}
                        className="flex min-h-11 items-center text-titanium-300 transition-colors hover:text-copper-300"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </Card>
            <Card className="p-7">
              <h2 className="text-lg font-semibold">{policyPage.questions.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-titanium-500">{policyPage.questions.intro}</p>
              <ButtonLink href={policyPage.questions.cta.href} variant="outline" className="mt-6">
                {policyPage.questions.cta.label}
              </ButtonLink>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
