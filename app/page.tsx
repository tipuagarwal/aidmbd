import Image from "next/image";
import { Orbit } from "@/components/motion/Orbit";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { IconCircleArrow } from "@/components/ui/IconCircleArrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { academyCategories } from "@/content/academy";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";

// Temporary Phase 0 preview of the design system. Phase 1 replaces this with the landing page.

const swatches = [
  ["ink-950", "bg-ink-950"],
  ["ink-900", "bg-ink-900"],
  ["ink-800", "bg-ink-800"],
  ["ink-700", "bg-ink-700"],
  ["titanium-50", "bg-titanium-50"],
  ["titanium-300", "bg-titanium-300"],
  ["titanium-500", "bg-titanium-500"],
  ["copper-300", "bg-copper-300"],
  ["copper-400", "bg-copper-400"],
  ["copper-500", "bg-copper-500"],
  ["copper-600", "bg-copper-600"],
  ["copper-700", "bg-copper-700"],
] as const;

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-glow-copper absolute -right-40 top-0 size-[44rem] opacity-80" />
        <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Image
              src="/brand/logo.png"
              alt="AIDMBD International Ltd"
              width={1106}
              height={320}
              loading="eager"
              className="h-14 w-auto md:h-16"
            />
            <Eyebrow accent="Practical Learning" className="mt-10 motion-safe:animate-fade-up">
              AI Solutions · Digital Development ·
            </Eyebrow>
            <h1 className="mt-6 text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.02em] motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
              <span className="text-gradient-titanium">Human vision.</span>
              <br />
              <span className="text-gradient-copper">Intelligent futures.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-titanium-500 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
              Design system preview for Phase 0. Every token, primitive and motion component
              the landing page will be built from.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="#services" size="lg">
                Explore Our Services
              </ButtonLink>
              <ButtonLink href="#academy" variant="outline" size="lg">
                Explore Learning Academy
              </ButtonLink>
              <ButtonLink href="#faq" variant="link">
                or Book a Consultation
              </ButtonLink>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <Orbit className="w-full" />
          </div>
        </Container>
      </section>

      <Section aria-labelledby="tokens-title">
        <SectionHeading id="tokens-title" eyebrow="Tokens" title="Colour palette" />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map(([name, bg]) => (
            <li key={name} className="overflow-hidden rounded-xl border border-line">
              <div className={`h-16 ${bg}`} />
              <p className="px-3 py-2 font-mono text-xs text-titanium-300">{name}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Badge tone="copper">Live</Badge>
          <Badge tone="copper">Recorded</Badge>
          <Badge>Demo Project</Badge>
          <Badge>Beginner</Badge>
          <Button>Plain button</Button>
          <Button variant="outline" arrow>
            Outline button
          </Button>
        </div>
      </Section>

      <Section id="services" tone="raised" aria-labelledby="services-title">
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          title="Six services. One practical partner."
          intro="Cards stagger in from content/services.ts and lift on hover."
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              {/* Becomes a link to /services/[slug] once Phase 2 adds those pages. */}
              <div className="group h-full">
                <Card interactive className="flex h-full flex-col">
                  <Icon name={service.icon} className="size-8 text-copper-400" />
                  <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-titanium-500">
                    {service.summary}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-titanium-500">
                      {service.subServices.length} sub-services
                    </span>
                    <IconCircleArrow />
                  </div>
                </Card>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="academy" aria-labelledby="academy-title">
        <SectionHeading
          id="academy-title"
          eyebrow="Learning Academy"
          title="Four ways to learn"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {academyCategories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.08} className="h-full">
              <Card className="h-full">
                <Icon name={category.icon} className="size-7 text-copper-400" />
                <h3 className="mt-4 font-semibold">{category.title}</h3>
                <div className="mt-3 flex gap-2">
                  {category.formats.map((format) => (
                    <Badge key={format} tone="copper" className="capitalize">
                      {format}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="faq" tone="raised" aria-labelledby="faq-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Native accordion"
            className="lg:col-span-4"
          />
          <Accordion
            name="faq"
            className="lg:col-span-8"
            items={faqs.slice(0, 4).map((faq) => ({
              id: faq.id,
              title: faq.question,
              content: faq.answer,
            }))}
          />
        </div>
      </Section>
    </>
  );
}
