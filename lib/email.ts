import "server-only";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type Email = {
  subject: string;
  text: string;
  /** The visitor, so the team can answer by replying. */
  replyTo: string;
};

/**
 * Emails the team through Resend. Without configuration it logs the message in development
 * and fails in production, so a submission is never silently dropped.
 */
export async function sendEmail({ subject, text, replyTo }: Email) {
  const { RESEND_API_KEY: apiKey, EMAIL_TO: to, EMAIL_FROM: from } = process.env;
  // Strip line breaks so submitted text can't break the subject line.
  const cleanSubject = subject.replace(/[\r\n]+/g, " ");

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "production") {
      console.error("[email] Email is not configured. Set RESEND_API_KEY, EMAIL_TO and EMAIL_FROM.");
      return false;
    }
    console.info(`[email] Email is not configured, so the message is logged instead.\n\n${cleanSubject}\n\n${text}`);
    return true;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((address) => address.trim()),
        reply_to: replyTo,
        subject: cleanSubject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) console.error(`[email] Resend returned ${response.status}: ${await response.text()}`);
    return response.ok;
  } catch (error) {
    console.error("[email] Delivery failed.", error);
    return false;
  }
}
