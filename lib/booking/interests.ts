import { academyCategories } from "@/content/academy";
import { bookingPage } from "@/content/booking";
import { services } from "@/content/services";
import type { InterestGroup } from "./schema";

// Built on the server and passed to the form as props, so the full service and course
// content stays out of the browser bundle.
export const interestGroups: InterestGroup[] = [
  {
    id: "services",
    label: bookingPage.interestGroups.services,
    options: services.map(({ slug, title }) => ({ value: `service:${slug}`, label: title })),
  },
  {
    id: "courses",
    label: bookingPage.interestGroups.courses,
    options: academyCategories.map(({ slug, title }) => ({ value: `course:${slug}`, label: title })),
  },
];
