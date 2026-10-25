import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LinkItem } from "@/lib/types";

/** The last item is the current page and is not linked. */
export function Breadcrumb({ items }: { items: LinkItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-titanium-500">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <ChevronRight aria-hidden className="size-3.5" />}
              {current ? (
                <span aria-current="page" className="text-titanium-300">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-copper-300">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
