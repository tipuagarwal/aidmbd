import { Orbit } from "@/components/motion/Orbit";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { notFoundPage } from "@/content/site";

/** Shown for unknown URLs and for unknown slugs on dynamic pages. Next adds noindex. */
export default function NotFound() {
  return (
    <Section aria-labelledby="not-found-title" className="relative overflow-hidden md:py-36">
      <Orbit tilt={-14} className="pointer-events-none absolute top-1/2 -right-40 hidden w-[40rem] -translate-y-1/2 opacity-70 lg:block" />
      <div className="relative">
        <SectionHeading
          as="h1"
          id="not-found-title"
          eyebrow={notFoundPage.eyebrow}
          title={notFoundPage.title}
          intro={notFoundPage.intro}
        />
        <ul className="mt-10 flex flex-wrap gap-4">
          {notFoundPage.links.map((link, index) => (
            <li key={link.href}>
              <ButtonLink href={link.href} variant={index === 0 ? "primary" : "outline"}>
                {link.label}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
