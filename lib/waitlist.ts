import { waitlistForm } from "@/content/academy";
import { formCopy } from "@/content/forms";
import { isEmail, readFields, type FormErrors, type FormState, type FormValues } from "@/lib/forms";
import type { CourseFormat } from "@/lib/types";

// One validator for the course waitlist form: the browser checks before posting and the Server
// Action runs the same rules again on whatever was actually posted.

export const waitlistFieldNames = ["course", "fullName", "email", "format"] as const;

export type WaitlistFieldName = (typeof waitlistFieldNames)[number];
export type WaitlistValues = FormValues<WaitlistFieldName>;
export type WaitlistErrors = FormErrors<WaitlistFieldName>;
export type WaitlistState = FormState<WaitlistFieldName>;

/** Lets the visitor leave the format open when a course offers both. */
export const ANY_FORMAT = "either" as const;

export const waitlistMaxLengths = { fullName: 100, email: 254 };

export function normalizeWaitlist(input: Partial<Record<string, unknown>>): WaitlistValues {
  return readFields(input, waitlistFieldNames);
}

/**
 * `formats` are the course's formats, or undefined when the course doesn't accept requests.
 * A single-format course needs no format choice.
 */
export function validateWaitlist(values: WaitlistValues, formats: CourseFormat[] | undefined) {
  const { errors: copy } = formCopy;
  const errors: WaitlistErrors = {};

  if (!formats) errors.course = waitlistForm.errors.course;
  if (!values.fullName) errors.fullName = copy.fullName;
  else if (values.fullName.length > waitlistMaxLengths.fullName) errors.fullName = copy.tooLong(waitlistMaxLengths.fullName);
  if (!values.email) errors.email = copy.email;
  else if (!isEmail(values.email) || values.email.length > waitlistMaxLengths.email) errors.email = copy.emailFormat;
  const choices: readonly string[] = [...(formats ?? []), ANY_FORMAT];
  if (formats && formats.length > 1 && !choices.includes(values.format)) errors.format = waitlistForm.errors.format;

  return errors;
}
