// Helpers shared by every form's validator, in the browser and in Server Actions.

/** Spam trap: hidden from people, so only bots fill it in. */
export const HONEYPOT_FIELD = "homepage";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string) {
  return EMAIL.test(value);
}

/**
 * Trims a submitted value. Forms post line breaks as "\r\n", so they're normalized to keep
 * lengths equal on both sides; single-line fields also collapse whitespace.
 */
export function cleanText(value: string, multiline = false) {
  const text = value.replace(/\r\n?/g, "\n").trim();
  return multiline ? text : text.replace(/\s+/g, " ");
}
