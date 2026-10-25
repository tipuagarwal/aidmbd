import {
  bookingErrors,
  bookingPage,
  budgetRanges,
  getBookingType,
  skillLevels,
  timeSlots,
  timelines,
} from "@/content/booking";
import { cleanText, isEmail, isWebsite } from "@/lib/forms";
import type { BookingField } from "@/lib/types";
import { addDays, isIsoDate, isValidTimeZone, todayIn } from "./time";

// One validator for both sides: the form checks each step as the visitor goes, and the
// Server Action runs the same rules again on whatever was actually posted.

/** In form order, so the first error found is the first one on the page. */
export const bookingFieldNames = [
  "type",
  "interest",
  "date",
  "slot",
  "timeZone",
  "fullName",
  "email",
  "phone",
  "company",
  "institution",
  "website",
  "skillLevel",
  "budget",
  "timeline",
  "message",
] as const;

export type BookingFieldName = (typeof bookingFieldNames)[number];
export type BookingValues = Record<BookingFieldName, string>;
export type BookingErrors = Partial<Record<BookingFieldName, string>>;
export type BookingResult = { ok: true } | { ok: false; errors?: BookingErrors; message?: string };

export type InterestOption = { value: string; label: string };
export type InterestGroup = { id: "services" | "courses"; label: string; options: InterestOption[] };

export const OTHER_INTEREST = "other";
export const BOOKING_WINDOW_DAYS = 90;
export const MESSAGE_MIN = 20;

export const maxLengths = {
  fullName: 100,
  email: 254,
  phone: 30,
  company: 120,
  institution: 120,
  website: 200,
  message: 1500,
} satisfies Partial<Record<BookingFieldName, number>>;

const typeFields: readonly string[] = ["company", "institution", "website", "skillLevel", "budget", "timeline"] satisfies BookingField[];

const choices: Partial<Record<BookingFieldName, readonly string[]>> = {
  skillLevel: skillLevels,
  budget: budgetRanges,
  timeline: timelines,
};

const PHONE = /^\+?[\d\s().-]{7,25}$/;

export const emptyBooking = Object.fromEntries(bookingFieldNames.map((name) => [name, ""])) as BookingValues;

export function interestValues(groups: InterestGroup[]) {
  return [...groups.flatMap((group) => group.options.map((option) => option.value)), OTHER_INTEREST];
}

/** Includes the group, since a service and a course can share a title. */
export function interestLabel(value: string, groups: InterestGroup[]) {
  for (const group of groups) {
    const option = group.options.find((item) => item.value === value);
    if (option) return `${option.label} · ${group.label}`;
  }
  return value === OTHER_INTEREST ? bookingPage.interestOther : "";
}

/** Cleans every value and drops the optional fields the chosen meeting type doesn't ask for. */
export function normalizeBooking(input: Partial<Record<string, unknown>>): BookingValues {
  const asked = new Set<string>(getBookingType(String(input.type ?? "").trim())?.fields);
  const values = { ...emptyBooking };
  for (const name of bookingFieldNames) {
    const value = input[name];
    if (typeof value !== "string") continue;
    if (typeFields.includes(name) && !asked.has(name)) continue;
    values[name] = cleanText(value, name === "message");
  }
  return values;
}

/** Expects normalized values. `interests` lists the allowed interest values. */
export function validateBooking(values: BookingValues, interests: readonly string[], now = new Date()) {
  const errors: BookingErrors = {};

  if (!getBookingType(values.type)) errors.type = bookingErrors.type;
  if (!interests.includes(values.interest)) errors.interest = bookingErrors.interest;

  const zoneIsValid = isValidTimeZone(values.timeZone);
  if (!zoneIsValid) errors.timeZone = bookingErrors.timeZone;
  if (!isIsoDate(values.date)) {
    errors.date = bookingErrors.date;
  } else if (zoneIsValid) {
    const today = todayIn(values.timeZone, now);
    if (values.date <= today || values.date > addDays(today, BOOKING_WINDOW_DAYS)) {
      errors.date = bookingErrors.dateRange(BOOKING_WINDOW_DAYS);
    }
  }
  if (!timeSlots.some((slot) => slot.id === values.slot)) errors.slot = bookingErrors.slot;

  if (!values.fullName) errors.fullName = bookingErrors.fullName;
  if (!values.email) errors.email = bookingErrors.email;
  else if (!isEmail(values.email)) errors.email = bookingErrors.emailFormat;
  if (values.phone && (!PHONE.test(values.phone) || values.phone.replace(/\D/g, "").length < 7)) {
    errors.phone = bookingErrors.phone;
  }
  if (values.website && !isWebsite(values.website)) errors.website = bookingErrors.website;
  for (const [name, options] of Object.entries(choices)) {
    const value = values[name as BookingFieldName];
    if (value && !options.includes(value)) errors[name as BookingFieldName] = bookingErrors.choice;
  }
  if (!values.message) errors.message = bookingErrors.message;
  else if (values.message.length < MESSAGE_MIN) errors.message = bookingErrors.tooShort(MESSAGE_MIN);

  for (const [name, max] of Object.entries(maxLengths)) {
    const field = name as keyof typeof maxLengths;
    if (!errors[field] && values[field].length > max) errors[field] = bookingErrors.tooLong(max);
  }

  return errors;
}
