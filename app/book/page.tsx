import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingAside } from "@/components/booking/BookingAside";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { BookingFromUrl } from "@/components/booking/BookingFromUrl";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { bookingPage } from "@/content/booking";
import { primaryCta } from "@/content/site";
import { interestGroups } from "@/lib/booking/interests";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: primaryCta.label,
  description: bookingPage.description,
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, primaryCta]}
        eyebrow={bookingPage.eyebrow}
        title={bookingPage.title}
        intro={bookingPage.intro}
      />
      <Section aria-label={bookingPage.formLabel} className="pt-12 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            {/* useSearchParams needs a Suspense boundary to keep the page static. The fallback is
                the same form without a pre-selection, so the prerendered HTML is already usable. */}
            <Suspense fallback={<BookingFlow interestGroups={interestGroups} />}>
              <BookingFromUrl interestGroups={interestGroups} />
            </Suspense>
          </div>
          <BookingAside className="lg:col-span-4" />
        </div>
      </Section>
    </>
  );
}
