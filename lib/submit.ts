import "server-only";
import { formCopy } from "@/content/forms";
import { sendEmail } from "@/lib/email";
import { HONEYPOT_FIELD, hasErrors, type FormErrors, type FormState, type FormValues } from "@/lib/forms";

/** Every form has an email field: the team answers by replying to it. */
type Submission<K extends string> = {
  read: (input: Partial<Record<string, unknown>>) => FormValues<K | "email">;
  validate: (values: FormValues<K | "email">) => FormErrors<K | "email">;
  /** The email to the team. Only called once the values are valid. */
  compose: (values: FormValues<K | "email">) => { subject: string; text: string };
};

/**
 * The shared body of a form's Server Action. Anyone can POST to an action, so the values are
 * read and validated again here before anything is sent. Rate limiting arrives with the
 * backend (requirements §15.2).
 */
export async function handleSubmission<K extends string>(
  formData: FormData,
  { read, validate, compose }: Submission<K>,
): Promise<FormState<K | "email">> {
  const values = read(Object.fromEntries(formData));
  // Report success to bots so they move on without learning about the trap.
  if (formData.get(HONEYPOT_FIELD)) return { status: "success", values };

  const errors = validate(values);
  if (hasErrors(errors)) return { status: "error", values, errors };

  const sent = await sendEmail({ ...compose(values), replyTo: values.email });
  return sent ? { status: "success", values } : { status: "error", values, message: formCopy.errors.send };
}
