import Link from "next/link";
import { Orbit } from "@/components/motion/Orbit";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bookingHref, bookingTypes } from "@/content/booking";
import { bookingSection } from "@/content/home";
import type { LinkItem } from "@/lib/types";

type BookingCtaProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  cta?: LinkItem;
  /** Shortcut chips for each booking type. */
  showTypes?: boolean;
};

/** Closing call-to-action band. Defaults to the homepage copy. */
export function BookingCta({
  eyebrow = bookingSection.eyebrow,
  title = bookingSection.title,
  intro = bookingSection.intro,
  cta = bookingSection.cta,
  showTypes = true,
}: BookingCtaProps) {
  return (
    <section aria-labelledby="booking-title" className="py-20 md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-copper-500/30 bg-ink-900 px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
          <div aria-hidden className="bg-glow-copper absolute -top-1/2 -right-1/4 size-192" />
          <Orbit
            tilt={-18}
            className="pointer-events-none absolute top-1/2 -right-32 hidden w-[38rem] -translate-y-1/2 lg:block"
          />

          <div className="relative max-w-2xl">
            <SectionHeading id="booking-title" eyebrow={eyebrow} title={title} intro={intro} />
            {showTypes && (
              <ul className="mt-8 flex flex-wrap gap-3">
                {bookingTypes.map((type) => (
                  <li key={type.slug}>
                    <Link
                      href={bookingHref(type.slug)}
                      className="inline-flex min-h-11 items-center rounded-full border border-line bg-white/[0.03] px-4 text-sm text-titanium-300 transition-colors hover:border-copper-500/60 hover:text-copper-300"
                    >
                      {type.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <ButtonLink href={cta.href} size="lg" className="mt-10">
              {cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
