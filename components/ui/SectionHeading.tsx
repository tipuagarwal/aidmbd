import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow: string;
  eyebrowAccent?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  /** Pair with `aria-labelledby` on the parent section. */
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  eyebrowAccent,
  title,
  intro,
  align = "left",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <Eyebrow accent={eyebrowAccent} className={cn(centered && "justify-center")}>
        {eyebrow}
      </Eyebrow>
      <Heading
        id={id}
        className="mt-5 text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight"
      >
        {title}
      </Heading>
      {intro && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed text-titanium-500",
            centered && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
