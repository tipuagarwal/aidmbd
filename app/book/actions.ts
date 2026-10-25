"use server";

import { bookingErrors } from "@/content/booking";
import { sendBookingEmail } from "@/lib/booking/email";
import { interestGroups } from "@/lib/booking/interests";
import {
  HONEYPOT_FIELD,
  interestLabel,
  interestValues,
  normalizeBooking,
  validateBooking,
  type BookingResult,
} from "@/lib/booking/schema";

// Anyone can POST to a Server Action, so everything is validated again here.
// Rate limiting arrives with the backend (requirements §15.2).
export async function submitBookingRequest(formData: FormData): Promise<BookingResult> {
  // Report success to bots so they move on without learning about the trap.
  if (formData.get(HONEYPOT_FIELD)) return { ok: true };

  const values = normalizeBooking(Object.fromEntries(formData));
  const errors = validateBooking(values, interestValues(interestGroups));
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const sent = await sendBookingEmail(values, interestLabel(values.interest, interestGroups));
  return sent ? { ok: true } : { ok: false, message: bookingErrors.send };
}
