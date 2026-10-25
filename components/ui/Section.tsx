import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = ComponentProps<"section"> & {
  tone?: "base" | "raised";
};

export function Section({
  tone = "base",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-20 md:py-28", tone === "raised" && "bg-ink-900", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
