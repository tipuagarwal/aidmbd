import { cn } from "@/lib/cn";

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop nav item: copper with an underline when active, as in the hero reference. */
export function navLinkClasses(active: boolean) {
  return cn(
    "relative inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-200",
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-copper-400 after:transition-opacity",
    active
      ? "text-copper-400 after:opacity-100"
      : "text-titanium-300 after:opacity-0 hover:text-titanium-50",
  );
}
