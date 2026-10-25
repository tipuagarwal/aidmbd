import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { services } from "@/content/services";
import { footerGroups, primaryCta, site } from "@/content/site";
import type { FooterGroup } from "@/lib/types";
import { Logo } from "./Logo";

const servicesGroup: FooterGroup = {
  title: "Services",
  links: services.map((service) => ({ label: service.title, href: `/services/${service.slug}` })),
};

const [companyGroup, ...otherGroups] = footerGroups;
const groups = [companyGroup, servicesGroup, ...otherGroups];

// Cached so the prerendered footer is allowed to read the clock (Cache Components).
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950">
      <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-titanium-500">{site.description}</p>
          <ButtonLink href={primaryCta.href} variant="outline" className="mt-8">
            {primaryCta.label}
          </ButtonLink>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5"
        >
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-titanium-50">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.soon ? (
                      <span className="inline-flex flex-wrap items-center gap-2 text-sm text-titanium-500">
                        {link.label}
                        <Badge>Soon</Badge>
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-titanium-500 transition-colors hover:text-copper-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-xs text-titanium-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.3em]">{site.footerTagline}</p>
        </Container>
      </div>
    </footer>
  );
}
