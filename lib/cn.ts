import { twMerge } from "tailwind-merge";

/** Joins class names, skipping falsy values. Later Tailwind classes override earlier conflicting ones. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
