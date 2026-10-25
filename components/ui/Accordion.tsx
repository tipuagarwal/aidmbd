import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Items sharing a name open one at a time. */
  name?: string;
  className?: string;
};

/** Native details/summary: keyboard accessible and works without JavaScript. */
export function Accordion({ items, name, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.id} name={name} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-semibold transition-colors hover:text-copper-300 [&::-webkit-details-marker]:hidden">
            {item.title}
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-copper-400 transition-transform duration-300 ease-brand group-open:rotate-180"
            />
          </summary>
          <div className="pb-6 pr-10 leading-relaxed text-titanium-500">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
