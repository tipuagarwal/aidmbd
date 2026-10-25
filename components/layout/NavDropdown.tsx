"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { easeBrand } from "@/components/motion/easing";
import { Icon } from "@/components/ui/Icon";
import { academyLink } from "@/content/site";
import { cn } from "@/lib/cn";
import type { ServiceSummary } from "@/lib/types";
import { navLinkClasses } from "./navStyles";

type NavDropdownProps = {
  label: string;
  href: string;
  active: boolean;
  services: ServiceSummary[];
};

/** Services mega-menu. Opens on click or Enter; closes on Escape, outside click or focus leaving. */
export function NavDropdown({ label, href, active, services }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function closeIfOutside(event: Event) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }

    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("focusin", closeIfOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("focusin", closeIfOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={navLinkClasses(active || open)}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform duration-300 ease-brand", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: easeBrand }}
            className="absolute left-1/2 top-full z-50 mt-5 w-[min(46rem,calc(100vw-4rem))] -translate-x-1/2 rounded-2xl border border-copper-500/25 bg-ink-900/95 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            <ul className="grid grid-cols-2 gap-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={close}
                    className="group flex gap-4 rounded-xl p-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-copper-500/30 bg-copper-500/10">
                      <Icon name={service.icon} className="size-5 text-copper-400" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-titanium-50 transition-colors group-hover:text-copper-300">
                        {service.title}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-titanium-500">
                        {service.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between gap-4 border-t border-line px-4 pt-4 pb-2 text-sm font-semibold">
              <Link
                href={academyLink.href}
                onClick={close}
                className="group inline-flex items-center gap-2 text-copper-400 hover:text-copper-300"
              >
                {academyLink.label}
                <ArrowRight aria-hidden className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
              </Link>
              <Link href={href} onClick={close} className="text-titanium-300 hover:text-titanium-50">
                All services
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
