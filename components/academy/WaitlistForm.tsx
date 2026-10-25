"use client";

import { joinCourseList } from "@/app/academy/actions";
import { FormAlert, FormSuccess, Honeypot, SubmitRow } from "@/components/forms/FormParts";
import { useFormSubmission } from "@/components/forms/useFormSubmission";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { FieldError, TextField } from "@/components/ui/Field";
import { waitlistForm as copy } from "@/content/academy";
import type { Course } from "@/lib/types";
import { ANY_FORMAT, normalizeWaitlist, validateWaitlist, waitlistFieldNames, waitlistMaxLengths } from "@/lib/waitlist";

type WaitlistFormProps = {
  course: Pick<Course, "slug" | "title" | "formats" | "status">;
};

/** Waitlist or enrollment request for one course. Works without JavaScript. */
export function WaitlistForm({ course }: WaitlistFormProps) {
  const { state, formAction, pending, formRef, errors, values, onSubmit, clearError } = useFormSubmission({
    action: joinCourseList,
    fields: waitlistFieldNames,
    validate: (data) => validateWaitlist(normalizeWaitlist(Object.fromEntries(data)), course.formats),
  });
  const formats = course.formats.length > 1 ? [...course.formats, ANY_FORMAT] : [];

  if (state.status === "success") {
    const success = copy.success[course.status];
    return <FormSuccess title={success.title}>{success.intro(course.title, state.values.email)}</FormSuccess>;
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="space-y-6">
      <input type="hidden" name="course" value={course.slug} />
      <TextField
        id="waitlist-fullName"
        name="fullName"
        label={copy.labels.fullName}
        autoComplete="name"
        maxLength={waitlistMaxLengths.fullName}
        defaultValue={values?.fullName}
        onChange={() => clearError("fullName")}
        error={errors.fullName}
        required
      />
      <TextField
        id="waitlist-email"
        name="email"
        type="email"
        label={copy.labels.email}
        autoComplete="email"
        maxLength={waitlistMaxLengths.email}
        defaultValue={values?.email}
        onChange={() => clearError("email")}
        error={errors.email}
        required
      />
      {formats.length > 0 && (
        <fieldset>
          <legend className="text-sm font-medium text-titanium-300">{copy.labels.format}</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {formats.map((format) => (
              <ChoiceCard
                key={format}
                name="format"
                value={format}
                defaultChecked={values?.format === format}
                onChange={() => clearError("format")}
                required
                aria-invalid={errors.format ? true : undefined}
                aria-describedby={errors.format ? "waitlist-format-error" : undefined}
                title={copy.formatOptions[format]}
                className="p-3.5"
              />
            ))}
          </div>
          <FieldError id="waitlist-format-error" message={errors.format} className="mt-3" />
        </fieldset>
      )}

      <Honeypot id="waitlist-homepage" />
      <FieldError id="waitlist-course-error" message={errors.course} />
      <FormAlert message={state.status === "error" ? state.message : undefined} />
      <SubmitRow label={copy.submit[course.status]} pending={pending} privacy={copy.privacy} />
    </form>
  );
}
