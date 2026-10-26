import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 rounded-md", className)}>
      <Image
        src="/brand/logo.png"
        alt="AIDMBD International Ltd — home"
        width={152}
        height={44}
        sizes="(min-width: 1024px) 152px, 124px"
        loading="eager"
        className="h-9 w-auto lg:h-11"
      />
    </Link>
  );
}
