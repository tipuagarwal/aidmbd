"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { easeBrand } from "@/components/motion/easing";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/types";
import { ServicePanel } from "./ServicePanel";

const KEY_STEPS: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

/** Desktop service tabs: a vertical list on the left, the selected service on the right. */
export function ServiceExplorer({ services, className }: { services: Service[]; className?: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const service = services[active];

  function focusTab(index: number) {
    const next = (index + services.length) % services.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key in KEY_STEPS) focusTab(active + KEY_STEPS[event.key]);
    else if (event.key === "Home") focusTab(0);
    else if (event.key === "End") focusTab(services.length - 1);
    else return;
    event.preventDefault();
  }

  return (
    <div className={cn("grid grid-cols-12 gap-8", className)}>
      <div
        role="tablist"
        aria-label="Services"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="col-span-5 flex flex-col gap-2"
      >
        {services.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.slug}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${id}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "group relative flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-[background-color,border-color,box-shadow] duration-300 ease-brand",
                selected
                  ? "border-copper-500/50 bg-copper-500/[0.07] shadow-glow"
                  : "border-transparent hover:border-line hover:bg-white/[0.02]",
              )}
            >
              {selected && (
                <span aria-hidden className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-copper-400" />
              )}
              <span className={cn("font-mono text-xs", selected ? "text-copper-400" : "text-titanium-500")}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <Icon
                name={item.icon}
                className={cn(
                  "size-6 shrink-0 transition-colors",
                  selected ? "text-copper-400" : "text-titanium-500 group-hover:text-copper-400",
                )}
              />
              <span className="min-w-0 flex-1">
                <span className={cn("block font-semibold", selected ? "text-titanium-50" : "text-titanium-300")}>
                  {item.title}
                </span>
                <span className="mt-1 block truncate text-sm text-titanium-500">{item.summary}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className="col-span-7 min-h-[38rem] rounded-2xl border border-copper-500/25 bg-ink-800/50 p-8 xl:p-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25, ease: easeBrand }}
          >
            <ServicePanel service={service} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
