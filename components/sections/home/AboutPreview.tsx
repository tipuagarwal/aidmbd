import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutSection } from "@/content/home";

// A founder card joins this section once a real photo and verifiable bio are supplied (requirements §6.6).
export function AboutPreview() {
  return (
    <Section tone="raised" aria-labelledby="about-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="about-title"
            eyebrow={aboutSection.eyebrow}
            title={aboutSection.title}
            intro={aboutSection.intro}
          />
          <ButtonLink href={aboutSection.cta.href} variant="outline" className="mt-8">
            {aboutSection.cta.label}
          </ButtonLink>
        </div>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:self-center">
          {aboutSection.principles.map((principle, index) => (
            <StaggerItem key={principle.title} className="h-full">
              <Card className="h-full">
                <span className="font-mono text-xs text-copper-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-titanium-500">{principle.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
