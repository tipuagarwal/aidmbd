import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

// Long-form reading styles for blog posts and policies (requirements §3.1: calm, plain areas).
// Pages start at h1, so MDX content uses h2 and below.

const textLink =
  "text-copper-400 underline decoration-copper-400/40 underline-offset-4 transition-colors hover:text-copper-300 hover:decoration-copper-300";

function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} className={textLink} {...props} />;
  return <a href={href} className={textLink} target="_blank" rel="noopener noreferrer" {...props} />;
}

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 text-2xl font-bold tracking-tight text-titanium-50 sm:text-3xl" {...props} />,
  h3: (props) => <h3 className="mt-10 text-xl font-semibold text-titanium-50" {...props} />,
  p: (props) => <p className="mt-5 text-lg leading-relaxed text-titanium-300" {...props} />,
  a: Anchor,
  ul: (props) => (
    <ul className="mt-5 space-y-2 pl-6 text-lg leading-relaxed text-titanium-300 marker:text-copper-500 list-disc" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-5 space-y-2 pl-6 text-lg leading-relaxed text-titanium-300 marker:text-copper-400 list-decimal" {...props} />
  ),
  li: (props) => <li className="pl-1.5" {...props} />,
  strong: (props) => <strong className="font-semibold text-titanium-50" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-8 border-l-2 border-copper-500 bg-copper-500/5 py-1 pr-5 pl-5 [&>p]:mt-3 [&>p]:text-titanium-50" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-copper-300" {...props} />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-xl border border-line bg-ink-900 p-5 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-titanium-300"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-line" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
