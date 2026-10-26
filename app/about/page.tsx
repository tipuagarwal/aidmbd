import type { Metadata } from "next";
import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BookingCta } from "@/components/sections/BookingCta";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPage, founder } from "@/content/about";
import { aboutSection } from "@/content/home";
import { processSteps } from "@/content/process";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: aboutPage.description,
  path: "/about",
});

export default function AboutPage() {
  const { purpose, areas, principles, process, team } = aboutPage;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        intro={aboutPage.intro}
      />

      <Section tone="raised" aria-labelledby="purpose-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading id="purpose-title" eyebrow={purpose.eyebrow} title={purpose.title} className="lg:col-span-5" />
          <div className="space-y-5 lg:col-span-7">
            {purpose.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-titanium-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="areas-title">
        <SectionHeading id="areas-title" eyebrow={areas.eyebrow} title={areas.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {areas.items.map((item) => (
            <Card key={item.title} className="flex flex-col p-7 md:p-8">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-titanium-500">{item.description}</p>
              <ButtonLink href={item.cta.href} variant="outline" className="mt-8 self-start">
                {item.cta.label}
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Section>

      {founder && (
        <Section tone="raised" aria-labelledby="founder-title">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Image
              src={founder.photo}
              alt={founder.name}
              width={640}
              height={800}
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="w-full rounded-2xl border border-copper-500/25 object-cover lg:col-span-4"
            />
            <div className="lg:col-span-8">
              <SectionHeading id="founder-title" eyebrow={aboutPage.founder.eyebrow} title={founder.name} intro={founder.role} />
              <p className="mt-6 text-lg leading-relaxed text-titanium-300">{founder.bio}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                {founder.links.map((link) => (
                  <ButtonLink key={link.href} href={link.href} variant="outline">
                    {link.label}
                  </ButtonLink>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      <Section tone={founder ? "base" : "raised"} aria-labelledby="principles-title">
        <SectionHeading id="principles-title" eyebrow={principles.eyebrow} title={principles.title} />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutSection.principles.map((principle, index) => (
            <StaggerItem key={principle.title} className="h-full">
              <Card className="h-full">
                <span className="font-mono text-xs text-copper-400">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-titanium-500">{principle.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone={founder ? "raised" : "base"} aria-labelledby="delivery-title">
        <SectionHeading id="delivery-title" eyebrow={process.eyebrow} title={process.title} />
        <ProcessTimeline steps={processSteps} />
      </Section>

      <Section id="team" tone={founder ? "base" : "raised"} aria-labelledby="team-title">
        <SectionHeading id="team-title" eyebrow={team.eyebrow} title={team.title} intro={team.intro} />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.roles.map((role) => (
            <StaggerItem key={role.title} className="h-full">
              <Card className="h-full">
                <h3 className="font-semibold">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-titanium-500">{role.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <BookingCta eyebrow={aboutPage.cta.eyebrow} title={aboutPage.cta.title} intro={aboutPage.cta.intro} />
    </>
  );
}
