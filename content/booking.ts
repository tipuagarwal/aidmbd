import type { BookingFieldName } from "@/lib/booking/schema";
import type { BookingType, BookingTypeSlug, Step, TimeSlot } from "@/lib/types";

// Draft details to confirm with the client (requirements §9.1): durations, formats, what to
// prepare, budget ranges and the rescheduling terms. Fees stay "agreed before the meeting"
// until the client sets them.
const fee = "Agreed before the meeting";
const online = "Online video call";

export const bookingTypes: BookingType[] = [
  {
    slug: "business-consultation",
    title: "Business Consultation",
    topic: "Understand your needs and choose the right service.",
    duration: "30 minutes",
    fee,
    format: online,
    prepare: [
      "A short overview of your business",
      "The problem you want to solve",
      "Tools or systems you already use",
    ],
    fields: ["company", "website", "budget", "timeline"],
    interest: "services",
  },
  {
    slug: "project-discussion",
    title: "Project Discussion",
    topic: "Talk through a website, automation, content or marketing project.",
    duration: "45 minutes",
    fee,
    format: online,
    prepare: [
      "Your project goals and must-have features",
      "Examples or references you like",
      "Your timeline and budget range",
    ],
    fields: ["company", "website", "budget", "timeline"],
    interest: "services",
  },
  {
    slug: "learning-guidance",
    title: "Learning Guidance",
    topic: "Find the right course and learning path for you.",
    duration: "30 minutes",
    fee,
    format: online,
    prepare: [
      "Your current skill level",
      "What you want to learn, and why",
      "How much time you can give each week",
    ],
    fields: ["skillLevel"],
    interest: "courses",
  },
  {
    slug: "research-mentorship",
    title: "Research Mentorship",
    topic: "Get help with your topic, methodology or draft review.",
    duration: "60 minutes",
    fee,
    format: online,
    prepare: [
      "Your research topic, proposal or draft",
      "Your target journal or conference, if any",
      "Any deadlines you're working to",
    ],
    fields: ["institution", "skillLevel"],
    interest: "courses",
  },
  {
    slug: "corporate-training",
    title: "Corporate Training",
    topic: "Plan training around your team size, goals and delivery format.",
    duration: "45 minutes",
    fee,
    format: "Online, or in person by arrangement",
    prepare: [
      "Your team size and roles",
      "What the training should achieve",
      "Preferred format and dates",
    ],
    fields: ["company", "budget", "timeline"],
    interest: "services",
  },
];

export function getBookingType(slug: string) {
  return bookingTypes.find((type) => type.slug === slug);
}

/** Builds a /book link that pre-selects a booking type and, optionally, a service. */
export function bookingHref(type: BookingTypeSlug, service?: string) {
  const params = new URLSearchParams({ type });
  if (service) params.set("service", service);
  return `/book?${params}`;
}

/** The team confirms requests in its local time. */
export const businessTimeZone = { id: "Asia/Dhaka", label: "Dhaka" };

// Real availability arrives with calendar integration (requirements §9.3, steps 8–10).
export const timeSlots: TimeSlot[] = [
  { id: "morning", label: "Morning", start: "09:00", end: "12:00" },
  { id: "midday", label: "Midday", start: "12:00", end: "15:00" },
  { id: "afternoon", label: "Afternoon", start: "15:00", end: "18:00" },
  { id: "evening", label: "Evening", start: "18:00", end: "21:00" },
];

export const skillLevels = ["Beginner", "Intermediate", "Advanced"];
export const budgetRanges = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "Over $5,000", "Not sure yet"];
export const timelines = ["As soon as possible", "Within a month", "1–3 months", "3+ months", "Just exploring"];

export const bookingLabels = {
  type: "Meeting type",
  interest: "Service or course of interest",
  date: "Preferred date",
  slot: "Preferred time slot",
  timeZone: "Your timezone",
  fullName: "Full name",
  email: "Email",
  phone: "Phone or WhatsApp",
  company: "Company or institution",
  institution: "Institution",
  website: "Website",
  skillLevel: "Current skill level",
  budget: "Budget range",
  timeline: "Expected timeline",
  message: "What would you like to discuss?",
} satisfies Record<BookingFieldName, string>;

export const bookingHints: Partial<Record<BookingFieldName, string>> = {
  timeZone: "Detected from your browser. Change it if it's wrong.",
  email: "We'll reply here to confirm a time.",
  phone: "Include your country code, for example +880.",
  budget: "In US dollars. A rough range is fine.",
  message: "A few sentences about your goals or questions.",
};

export const bookingErrors = {
  type: "Choose a meeting type.",
  interest: "Choose what you'd like to discuss.",
  date: "Choose a preferred date.",
  dateRange: (days: number) => `Choose a date between tomorrow and ${days} days from now.`,
  slot: "Choose a time slot.",
  timeZone: "Choose your timezone.",
  fullName: "Enter your full name.",
  email: "Enter your email address.",
  emailFormat: "Enter a valid email address, like name@example.com.",
  phone: "Enter a valid phone or WhatsApp number.",
  website: "Enter a valid website address, like example.com.",
  choice: "Choose one of the options.",
  message: "Tell us what you'd like to discuss.",
  messageShort: (min: number) => `Tell us a little more: at least ${min} characters.`,
  tooLong: (max: number) => `Keep this under ${max.toLocaleString("en")} characters.`,
  send: "We couldn't send your request just now. Please try again in a few minutes.",
  network: "We couldn't reach our server. Check your connection and try again.",
};

const howItWorks: Step[] = [
  { title: "Send a request", description: "Pick a meeting type and the times that suit you." },
  {
    title: "We confirm by email",
    description: "We reply with a time and a meeting link, or suggest another slot.",
  },
  { title: "Meet and plan", description: "Bring the points listed under What to prepare." },
];

export const bookingPage = {
  description:
    "Request a consultation with AIDMBD International Ltd. Choose a meeting type and a time that suits you, and we'll confirm by email.",
  eyebrow: "Book a consultation",
  title: "Request a meeting.",
  intro:
    "Tell us what you'd like to discuss and when suits you. We'll reply by email to confirm a time. Nothing is booked until we do.",
  formLabel: "Meeting request",
  steps: [
    { label: "Meeting", title: "What would you like to discuss?" },
    { label: "Date & time", title: "When suits you?" },
    { label: "Your details", title: "Tell us about yourself." },
    { label: "Review", title: "Review your request." },
  ],
  stepCount: (current: number, total: number) => `Step ${current} of ${total}`,
  typeDetails: {
    duration: "Duration",
    fee: "Fee",
    format: "Format",
    prepare: "What to prepare",
    placeholder: "Choose a meeting type to see its duration, fee and what to prepare.",
  },
  interestPlaceholder: "Choose an option",
  interestGroups: { services: "Services", courses: "Learning Academy" },
  interestOther: "Not sure yet",
  choicePlaceholder: "Choose an option",
  timeZonePlaceholder: "Choose your timezone",
  timeSummary: {
    title: "Your preferred time",
    business: `In ${businessTimeZone.label} time`,
    note: "We'll confirm the exact time by email.",
  },
  optional: "Optional",
  messageCount: (length: number, max: number) => `${length} / ${max.toLocaleString("en")}`,
  review: {
    edit: "Edit",
    consent: "By sending this request, you agree that we may contact you by email about it. See our",
    privacy: { label: "Privacy Policy", href: "/policies/privacy" },
  },
  actions: { back: "Back", next: "Continue", submit: "Send request", sending: "Sending…" },
  honeypot: "Leave this field empty",
  success: {
    title: "Request received — we'll confirm by email.",
    intro: (name: string, email: string) =>
      `Thanks, ${name}. We'll email ${email} to agree a time and send the meeting link. Nothing is booked until then.`,
    requested: "You asked for",
    nextTitle: "What happens next",
    next: [
      "We review your request and check availability.",
      "We email you a time, or suggest another if yours isn't free.",
      "The email includes the meeting link and anything to prepare.",
    ],
    actions: [
      { label: "Back to home", href: "/" },
      { label: "Explore services", href: "/services" },
    ],
  },
  aside: {
    howItWorks: { title: "How it works", steps: howItWorks },
    terms: {
      title: "Rescheduling & cancellation",
      items: [
        "Sending a request is free. Any fee is agreed with you before the meeting.",
        "Need a different time? Reply to our email and we'll find another slot.",
        "Can't make it? Please let us know at least 24 hours before.",
      ],
    },
  },
};
