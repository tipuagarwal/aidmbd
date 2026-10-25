import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import type { LinkItem } from "@/lib/types";

type PageHeroProps = {
  breadcrumbs: LinkItem[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Extra content under the intro, such as CTAs. */
  children?: ReactNode;
  /** Optional right-hand column on large screens. */
  aside?: ReactNode;
  /** Smaller title for long ones, such as article headlines. */
  compact?: boolean;
};

/** Opening section for inner pages. Holds the page's only h1. */
export function PageHero({ breadcrumbs, eyebrow, title, intro, children, aside, compact = false }: PageHeroProps) {
  const hasAside = Boolean(aside);

  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="bg-grid absolute inset-0 mask-[linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden className="bg-glow-copper absolute -top-1/3 -right-1/4 size-200 opacity-80" />
      <Container
        className={cn("relative grid gap-12 py-14 md:py-20 lg:py-24", hasAside && "lg:grid-cols-12 lg:items-center")}
      >
        <div className={cn(hasAside && "lg:col-span-7")}>
          <Breadcrumb items={breadcrumbs} />
          <Eyebrow className="mt-10">{eyebrow}</Eyebrow>
          <h1
            id="page-title"
            className={cn(
              "mt-5 max-w-3xl text-balance font-extrabold tracking-tight",
              compact ? "text-[clamp(2rem,4vw,3rem)] leading-[1.1]" : "text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]",
            )}
          >
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-titanium-500">{intro}</p>}
          {children}
        </div>
        {hasAside && <div className="lg:col-span-5">{aside}</div>}
      </Container>
    </section>
  );
}
