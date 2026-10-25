"use client";

import { useSearchParams } from "next/navigation";
import { getBookingType } from "@/content/booking";
import { interestValues, type InterestGroup } from "@/lib/booking/schema";
import { BookingFlow } from "./BookingFlow";

/**
 * Pre-selects the flow from links like /book?type=project-discussion&service=web-development
 * or /book?type=learning-guidance&course=programming.
 */
export function BookingFromUrl({ interestGroups }: { interestGroups: InterestGroup[] }) {
  const params = useSearchParams();
  const type = getBookingType(params.get("type") ?? "")?.slug ?? "";
  const requested = params.has("service") ? `service:${params.get("service")}` : `course:${params.get("course")}`;
  const interest = interestValues(interestGroups).includes(requested) ? requested : "";

  // A new pre-selection starts a fresh request.
  return (
    <BookingFlow
      key={`${type}|${interest}`}
      interestGroups={interestGroups}
      initialType={type}
      initialInterest={interest}
    />
  );
}
