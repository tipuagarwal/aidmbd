import "server-only";
import { getBookingType } from "@/content/booking";
import type { BookingValues } from "./schema";
import { bookingSummary } from "./summary";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function formatEmail(values: BookingValues, interest: string) {
  const type = getBookingType(values.type);
  // Strip line breaks so a crafted name can't break the subject line.
  const subject = `Booking request: ${type?.title} — ${values.fullName}`.replace(/[\r\n]+/g, " ");
  const sections = bookingSummary(values, interest).map((rows) =>
    rows.map(({ label, value }) => (value.includes("\n") ? `${label}:\n${value}` : `${label}: ${value}`)).join("\n"),
  );
  const text = [
    `New meeting request from the website. Reply to this email to answer ${values.fullName} directly.`,
    ...sections,
    "Nothing is booked yet. Reply to agree a time and send the meeting link.",
  ].join("\n\n");
  return { subject, text };
}

/**
 * Emails a validated request to the team through Resend. Without configuration it logs the
 * request in development and fails in production, so a request is never silently dropped.
 */
export async function sendBookingEmail(values: BookingValues, interest: string) {
  const { RESEND_API_KEY: apiKey, BOOKING_EMAIL_TO: to, BOOKING_EMAIL_FROM: from } = process.env;
  const { subject, text } = formatEmail(values, interest);

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "production") {
      console.error("[booking] Email is not configured. Set RESEND_API_KEY, BOOKING_EMAIL_TO and BOOKING_EMAIL_FROM.");
      return false;
    }
    console.info(`[booking] Email is not configured, so the request is logged instead.\n\n${subject}\n\n${text}`);
    return true;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((address) => address.trim()),
        reply_to: values.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) console.error(`[booking] Resend returned ${response.status}: ${await response.text()}`);
    return response.ok;
  } catch (error) {
    console.error("[booking] Email delivery failed.", error);
    return false;
  }
}
