"use client";

import { useSearchParams } from "next/navigation";
import { getBookingType } from "@/content/booking";
import { interestValues, type InterestGroup } from "@/lib/booking/schema";
import { BookingFlow } from "./BookingFlow";

/** Pre-selects the flow from links like /book?type=project-discussion&service=web-development. */
export function BookingFromUrl({ interestGroups }: { interestGroups: InterestGroup[] }) {
  const params = useSearchParams();
  const type = getBookingType(params.get("type") ?? "")?.slug ?? "";
  const service = `service:${params.get("service")}`;
  const interest = interestValues(interestGroups).includes(service) ? service : "";

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
