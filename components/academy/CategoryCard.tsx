import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { courseFormats } from "@/content/academy";
import type { AcademyCategory } from "@/lib/types";

/** "11 modules", or "4 languages" for the programming path. */
export function categoryContentCount(category: AcademyCategory) {
  if (category.tracks) return `${category.tracks.length} languages`;
  const modules = category.modules.length + (category.advancedModules?.modules.length ?? 0);
  return `${modules} modules`;
}

export function CategoryCard({ category }: { category: AcademyCategory }) {
  return (
    <Link href={`/academy/${category.slug}`} className="group block h-full rounded-xl">
      <Card interactive className="flex h-full flex-col">
        <Icon name={category.icon} className="size-8 text-copper-400" />
        <h3 className="mt-5 font-semibold leading-snug transition-colors group-hover:text-copper-300">
          {category.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-titanium-500">{category.summary}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <ul className="flex gap-2">
            {category.formats.map((format) => (
              <li key={format}>
                <Badge tone="copper">{courseFormats[format]}</Badge>
              </li>
            ))}
          </ul>
          <span className="text-xs text-titanium-500">{categoryContentCount(category)}</span>
        </div>
      </Card>
    </Link>
  );
}
