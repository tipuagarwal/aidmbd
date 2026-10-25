"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav, primaryCta } from "@/content/site";
import type { ServiceSummary } from "@/lib/types";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavDropdown } from "./NavDropdown";
import { isActivePath, navLinkClasses } from "./navStyles";

const MOBILE_MENU_ID = "mobile-menu";

export function Header({ services }: { services: ServiceSummary[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Transparent at the top of the page; a blurred bar once the page scrolls.
  const { scrollY } = useScroll();
  const backdropOpacity = useTransform(scrollY, [0, 8], [0, 1]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <motion.div
        aria-hidden
        style={{ opacity: menuOpen ? 1 : backdropOpacity }}
        className="absolute inset-0 border-b border-line bg-ink-950/80 backdrop-blur-lg"
      />
      <Container className="relative flex h-16 items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  {item.hasMenu ? (
                    <NavDropdown
                      label={item.label}
                      href={item.href}
                      active={active}
                      services={services}
                    />
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={navLinkClasses(active)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href={primaryCta.href} variant="outline" className="hidden sm:inline-flex">
            {primaryCta.label}
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-titanium-50 transition-colors hover:bg-white/5 lg:hidden"
          >
            {menuOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </Container>

      <MobileMenu
        id={MOBILE_MENU_ID}
        open={menuOpen}
        onClose={closeMenu}
        pathname={pathname}
        services={services}
      />
    </header>
  );
}
