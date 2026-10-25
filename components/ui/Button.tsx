import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonStyle = {
  variant?: "primary" | "outline" | "link";
  size?: "md" | "lg";
  /** Trailing arrow, as in the hero reference. */
  arrow?: boolean;
};

const variants = {
  // Hover adds glow instead of a lighter fill, keeping white text above 4.5:1.
  primary:
    "bg-linear-to-b from-copper-600 to-copper-700 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] hover:shadow-glow-strong",
  outline:
    "border border-copper-500/70 text-titanium-50 hover:border-copper-400 hover:bg-copper-500/10",
  link: "text-copper-400 underline-offset-4 hover:text-copper-300 hover:underline",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.9375rem]",
};

function buttonClasses({ variant = "primary", size = "md" }: ButtonStyle, className?: string) {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-[background-color,border-color,box-shadow,color] duration-300 ease-brand disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    variant !== "link" && sizes[size],
    className,
  );
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      className="size-4 transition-transform duration-300 ease-brand motion-safe:group-hover:translate-x-0.5"
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & ButtonStyle;

export function ButtonLink({
  variant,
  size,
  arrow = variant !== "link",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size }, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & ButtonStyle;

export function Button({
  variant,
  size,
  arrow = false,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size }, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
