// Helpers shared by every form's validator, in the browser and in Server Actions.

/** Spam trap: hidden from people, so only bots fill it in. */
export const HONEYPOT_FIELD = "homepage";

export type FormValues<K extends string> = Record<K, string>;
export type FormErrors<K extends string> = Partial<Record<K, string>>;

/** What a form's Server Action returns to `useActionState`. */
export type FormState<K extends string> =
  | { status: "idle" }
  | { status: "success"; values: FormValues<K> }
  | { status: "error"; values: FormValues<K>; errors?: FormErrors<K>; message?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string) {
  return EMAIL.test(value);
}

/** Accepts "example.com" as well as full http(s) addresses. */
export function isWebsite(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

/**
 * Trims a submitted value. Forms post line breaks as "\r\n", so they're normalized to keep
 * lengths equal on both sides; single-line fields also collapse whitespace.
 */
export function cleanText(value: string, multiline = false) {
  const text = value.replace(/\r\n?/g, "\n").trim();
  return multiline ? text : text.replace(/\s+/g, " ");
}

/** Picks the named fields out of submitted data, cleaned; anything else is ignored. */
export function readFields<K extends string>(
  input: Partial<Record<string, unknown>>,
  names: readonly K[],
  multiline: readonly K[] = [],
): FormValues<K> {
  const values = {} as FormValues<K>;
  for (const name of names) {
    const raw = input[name];
    values[name] = typeof raw === "string" ? cleanText(raw, multiline.includes(name)) : "";
  }
  return values;
}

export function hasErrors(errors: Partial<Record<string, string>>) {
  return Object.values(errors).some(Boolean);
}
