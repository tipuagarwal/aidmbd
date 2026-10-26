import type { Metadata } from "next";
import { BookingCta } from "@/components/sections/BookingCta";
import { Process } from "@/components/sections/Process";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { AcademyPreview } from "@/components/sections/home/AcademyPreview";
import { CaseStudiesPreview } from "@/components/sections/home/CaseStudiesPreview";
import { FaqSection } from "@/components/sections/home/FaqSection";
import { Hero } from "@/components/sections/home/Hero";
import { LatestPosts } from "@/components/sections/home/LatestPosts";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ description: site.description, path: "/" });

// Section order follows requirements.md §6.
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <CaseStudiesPreview />
      <AcademyPreview />
      <Process />
      <AboutPreview />
      <Testimonials />
      <LatestPosts />
      <FaqSection />
      <BookingCta />
    </>
  );
}
