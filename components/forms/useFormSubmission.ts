import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { hasErrors, type FormErrors, type FormState } from "@/lib/forms";

type Options<K extends string> = {
  action: (previous: FormState<K>, formData: FormData) => Promise<FormState<K>>;
  /** In form order, so focus lands on the first invalid field. */
  fields: readonly K[];
  /** The same rules the Server Action runs, for instant feedback. */
  validate: (formData: FormData) => FormErrors<K>;
};

function focusFirstError<K extends string>(form: HTMLFormElement | null, fields: readonly K[], errors: FormErrors<K>) {
  const first = fields.find((name) => errors[name]);
  form?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
}

/**
 * A form that posts straight to a Server Action, so it works before JavaScript loads. With
 * JavaScript, the browser checks the same rules first and blocks the post if any fail.
 */
export function useFormSubmission<K extends string>({ action, fields, validate }: Options<K>) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" } as FormState<K>);
  const [clientErrors, setClientErrors] = useState<FormErrors<K> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const serverErrors: FormErrors<K> = state.status === "error" ? (state.errors ?? {}) : {};
  const errors = clientErrors ?? serverErrors;

  // Errors found by the server: focus the first one once the response arrives.
  useEffect(() => {
    if (state.status === "error" && state.errors) focusFirstError(formRef.current, fields, state.errors);
  }, [state, fields]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validate(new FormData(event.currentTarget));
    if (hasErrors(found)) {
      event.preventDefault();
      setClientErrors(found);
      focusFirstError(event.currentTarget, fields, found);
      return;
    }
    setClientErrors(null);
  }

  /** Hides a field's error as soon as the visitor edits it. */
  function clearError(name: K) {
    setClientErrors((previous) => {
      const current = previous ?? serverErrors;
      return current[name] ? { ...current, [name]: undefined } : previous;
    });
  }

  return {
    state,
    formAction,
    pending,
    formRef,
    errors,
    onSubmit,
    clearError,
    /** Submitted values come back with the result, so a failed send keeps what was typed. */
    values: state.status === "idle" ? undefined : state.values,
  };
}
