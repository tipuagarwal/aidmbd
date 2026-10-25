"use server";

import { courseFormats, courseStatus, waitlistForm } from "@/content/academy";
import { getCourse } from "@/content/courses";
import { handleSubmission } from "@/lib/submit";
import type { CourseFormat } from "@/lib/types";
import { ANY_FORMAT, normalizeWaitlist, validateWaitlist, type WaitlistState } from "@/lib/waitlist";

export async function joinCourseList(_previous: WaitlistState, formData: FormData): Promise<WaitlistState> {
  return handleSubmission(formData, {
    read: normalizeWaitlist,
    validate: (values) => validateWaitlist(values, getCourse(values.course)?.formats),
    compose: (values) => {
      const course = getCourse(values.course)!;
      // A single-format course has no choice to make.
      const chosen = course.formats.length === 1 ? course.formats[0] : values.format;
      const format = chosen === ANY_FORMAT ? waitlistForm.formatOptions.either : courseFormats[chosen as CourseFormat];
      const kind = course.status === "enrolling" ? "Enrollment request" : "Waitlist";
      return {
        subject: `${kind}: ${course.title} — ${values.fullName}`,
        text: [
          `${kind} from the website. Reply to this email to answer ${values.fullName} directly.`,
          [
            `Course: ${course.title} (${courseStatus[course.status].badge})`,
            `Preferred format: ${format}`,
            `Full name: ${values.fullName}`,
            `Email: ${values.email}`,
          ].join("\n"),
        ].join("\n\n"),
      };
    },
  });
}
