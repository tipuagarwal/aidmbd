"use server";

import { courseFormats, courseStatus, waitlistForm } from "@/content/academy";
import { getCourse } from "@/content/courses";
import { sendEmail } from "@/lib/email";
import { HONEYPOT_FIELD } from "@/lib/forms";
import type { CourseFormat } from "@/lib/types";
import { ANY_FORMAT, normalizeWaitlist, validateWaitlist, type WaitlistState } from "@/lib/waitlist";

// Anyone can POST to a Server Action, so everything is validated again here.
// Rate limiting arrives with the backend (requirements §15.2).
export async function joinCourseList(_previous: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const values = normalizeWaitlist(Object.fromEntries(formData));
  // Report success to bots so they move on without learning about the trap.
  if (formData.get(HONEYPOT_FIELD)) return { status: "success", values };

  const course = getCourse(values.course);
  const errors = validateWaitlist(values, course?.formats);
  if (!course || Object.keys(errors).length > 0) return { status: "error", values, errors };

  // A single-format course has no choice to make.
  const chosen = course.formats.length === 1 ? course.formats[0] : values.format;
  const format = chosen === ANY_FORMAT ? waitlistForm.formatOptions.either : courseFormats[chosen as CourseFormat];
  const kind = course.status === "enrolling" ? "Enrollment request" : "Waitlist";
  const text = [
    `${kind} from the website. Reply to this email to answer ${values.fullName} directly.`,
    [
      `Course: ${course.title} (${courseStatus[course.status].badge})`,
      `Preferred format: ${format}`,
      `Full name: ${values.fullName}`,
      `Email: ${values.email}`,
    ].join("\n"),
  ].join("\n\n");

  const sent = await sendEmail({ subject: `${kind}: ${course.title} — ${values.fullName}`, text, replyTo: values.email });
  return sent ? { status: "success", values } : { status: "error", values, message: waitlistForm.errors.send };
}
