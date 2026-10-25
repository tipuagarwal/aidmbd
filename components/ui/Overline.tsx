import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label above a list or value. */
export function Overline({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-xs font-medium uppercase tracking-[0.2em] text-titanium-500", className)}
      {...props}
    />
  );
}
