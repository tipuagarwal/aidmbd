"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import { joinCourseList } from "@/app/academy/actions";
import { Button } from "@/components/ui/Button";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { FieldError, TextField } from "@/components/ui/Field";
import { waitlistForm as copy } from "@/content/academy";
import { HONEYPOT_FIELD } from "@/lib/forms";
import type { Course } from "@/lib/types";
import {
  ANY_FORMAT,
  normalizeWaitlist,
  validateWaitlist,
  waitlistFieldNames,
  waitlistMaxLengths,
  type WaitlistErrors,
  type WaitlistFieldName,
  type WaitlistState,
} from "@/lib/waitlist";

type WaitlistFormProps = {
  course: Pick<Course, "slug" | "title" | "formats" | "status">;
};

const initialState: WaitlistState = { status: "idle" };

// Stable, so the heading is focused once when the message appears, not on every render.
const focusOnMount = (node: HTMLElement | null) => node?.focus();

function focusFirstError(form: HTMLFormElement | null, found: WaitlistErrors) {
  const first = waitlistFieldNames.find((name) => found[name]);
  form?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
}

/**
 * Waitlist or enrollment request for one course. Posts straight to a Server Action, so it also
 * works before JavaScript loads; the browser checks the same rules first for instant feedback.
 */
export function WaitlistForm({ course }: WaitlistFormProps) {
  const [state, formAction, pending] = useActionState(joinCourseList, initialState);
  const [clientErrors, setClientErrors] = useState<WaitlistErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const serverErrors = state.status === "error" ? (state.errors ?? {}) : {};
  const errors = clientErrors ?? serverErrors;
  // Submitted values come back with the result, so a failed send keeps what was typed.
  const values = state.status === "idle" ? undefined : state.values;
  const formats = course.formats.length > 1 ? [...course.formats, ANY_FORMAT] : [];

  // Errors found by the server: focus the first one once the response arrives.
  useEffect(() => {
    if (state.status === "error" && state.errors) focusFirstError(formRef.current, state.errors);
  }, [state]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validateWaitlist(normalizeWaitlist(Object.fromEntries(new FormData(event.currentTarget))), course.formats);
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      setClientErrors(found);
      focusFirstError(event.currentTarget, found);
      return;
    }
    setClientErrors(null);
  }

  function clearError(name: WaitlistFieldName) {
    setClientErrors((previous) => {
      const current = previous ?? serverErrors;
      return current[name] ? { ...current, [name]: undefined } : previous;
    });
  }

  if (state.status === "success") {
    const success = copy.success[course.status];
    return (
      <div className="motion-safe:animate-fade-up">
        <span className="flex size-12 items-center justify-center rounded-full border border-copper-500/40 bg-copper-500/10 shadow-glow">
          <Check aria-hidden className="size-6 text-copper-400" />
        </span>
        <h3 ref={focusOnMount} tabIndex={-1} className="mt-5 text-xl font-semibold focus:outline-none">
          {success.title}
        </h3>
        <p className="mt-3 leading-relaxed text-titanium-500">{success.intro(course.title, state.values.email)}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="space-y-6">
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

      <div aria-hidden className="sr-only">
        <label htmlFor={`waitlist-${HONEYPOT_FIELD}`}>{copy.honeypot}</label>
        <input id={`waitlist-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <FieldError id="waitlist-course-error" message={errors.course} />
      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-danger-500/40 bg-danger-500/10 p-4 text-sm text-danger-400"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2">
        <Button type="submit" size="lg" arrow={!pending} disabled={pending} className="w-full">
          {pending && <LoaderCircle aria-hidden className="size-4 motion-safe:animate-spin" />}
          {pending ? copy.sending : copy.submit[course.status]}
        </Button>
        <p className="text-sm leading-relaxed text-titanium-500">
          {copy.privacy}{" "}
          <Link href={copy.privacyLink.href} className="text-copper-400 underline decoration-copper-400/40 underline-offset-4 transition-colors hover:text-copper-300 hover:decoration-copper-300">
            {copy.privacyLink.label}
          </Link>
          .
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? copy.sending : ""}
      </p>
    </form>
  );
}
