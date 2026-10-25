"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { easeBrand } from "@/components/motion/easing";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { academyLink, mainNav, primaryCta } from "@/content/site";
import { cn } from "@/lib/cn";
import type { ServiceSummary } from "@/lib/types";
import { isActivePath } from "./navStyles";

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  pathname: string;
  services: ServiceSummary[];
};

const rowClasses =
  "flex min-h-12 w-full items-center justify-between rounded-lg px-3 text-lg font-semibold transition-colors hover:bg-white/[0.04]";

/** Full-height sheet under the header for screens below `lg`. */
export function MobileMenu({ id, open, onClose, pathname, services }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    const desktop = window.matchMedia("(min-width: 1024px)");
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) onClose();
    }

    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: easeBrand }}
          className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto border-t border-line bg-ink-950 lg:hidden"
        >
          <nav aria-label="Main" className="flex-1 px-4 py-6">
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const active = isActivePath(pathname, item.href);

                if (item.hasMenu) {
                  return (
                    <li key={item.href}>
                      <details className="group">
                        <summary
                          className={cn(
                            rowClasses,
                            "cursor-pointer list-none [&::-webkit-details-marker]:hidden",
                            active ? "text-copper-400" : "text-titanium-50",
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            aria-hidden
                            className="size-5 text-copper-400 transition-transform duration-300 group-open:rotate-180"
                          />
                        </summary>
                        <ul className="mt-1 mb-3 space-y-1 border-l border-line ml-3 pl-3">
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}`}
                                onClick={onClose}
                                className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-titanium-300 transition-colors hover:bg-white/[0.04] hover:text-titanium-50"
                              >
                                <Icon name={service.icon} className="size-5 shrink-0 text-copper-400" />
                                {service.title}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="flex min-h-11 items-center rounded-lg px-3 text-titanium-300 hover:bg-white/[0.04] hover:text-titanium-50"
                            >
                              All services
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={academyLink.href}
                              onClick={onClose}
                              className="flex min-h-11 items-center rounded-lg px-3 font-semibold text-copper-400 hover:bg-white/[0.04]"
                            >
                              {academyLink.label}
                            </Link>
                          </li>
                        </ul>
                      </details>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(rowClasses, active ? "text-copper-400" : "text-titanium-50")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="sticky bottom-0 border-t border-line bg-ink-950 p-4">
            <ButtonLink href={primaryCta.href} onClick={onClose} size="lg" className="w-full">
              {primaryCta.label}
            </ButtonLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
