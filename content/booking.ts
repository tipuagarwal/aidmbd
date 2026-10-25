import type { BookingType } from "@/lib/types";

// Duration, fee, format and preparation per type are pending from the client (requirements §9.1).
export const bookingTypes: BookingType[] = [
  {
    slug: "business-consultation",
    title: "Business Consultation",
    topic: "Understand your needs and choose the right service.",
  },
  {
    slug: "project-discussion",
    title: "Project Discussion",
    topic: "Talk through a website, automation, content or marketing project.",
  },
  {
    slug: "learning-guidance",
    title: "Learning Guidance",
    topic: "Find the right course and learning path for you.",
  },
  {
    slug: "research-mentorship",
    title: "Research Mentorship",
    topic: "Get help with your topic, methodology or draft review.",
  },
  {
    slug: "corporate-training",
    title: "Corporate Training",
    topic: "Plan training around your team size, goals and delivery format.",
  },
];

/** Builds a /book link that pre-selects a booking type and, optionally, a service. */
export function bookingHref(type: BookingType["slug"], service?: string) {
  const params = new URLSearchParams({ type });
  if (service) params.set("service", service);
  return `/book?${params}`;
}
