import type { ReactNode } from "react";
import Link from "next/link";
import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formCopy } from "@/content/forms";
import { HONEYPOT_FIELD } from "@/lib/forms";

// Stable, so the heading is focused once when the message appears, not on every render.
const focusOnMount = (node: HTMLElement | null) => node?.focus();

/** Hidden from people and assistive tech. Bots that fill it in get a fake success. */
export function Honeypot({ id }: { id: string }) {
  return (
    <div aria-hidden className="sr-only">
      <label htmlFor={id}>{formCopy.honeypot}</label>
      <input id={id} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** A failure that isn't tied to one field, such as the email not sending. */
export function FormAlert({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-danger-500/40 bg-danger-500/10 p-4 text-sm text-danger-400"
    >
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

type SubmitRowProps = {
  label: string;
  pending: boolean;
  /** Lead-in to the Privacy Policy link. */
  privacy?: string;
};

export function SubmitRow({ label, pending, privacy = formCopy.privacy.text }: SubmitRowProps) {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <Button type="submit" size="lg" arrow={!pending} disabled={pending} className="w-full">
        {pending && <LoaderCircle aria-hidden className="size-4 motion-safe:animate-spin" />}
        {pending ? formCopy.sending : label}
      </Button>
      <p className="text-sm leading-relaxed text-titanium-500">
        {privacy}{" "}
        <Link
          href={formCopy.privacy.link.href}
          className="text-copper-400 underline decoration-copper-400/40 underline-offset-4 transition-colors hover:text-copper-300 hover:decoration-copper-300"
        >
          {formCopy.privacy.link.label}
        </Link>
        .
      </p>
      <p aria-live="polite" className="sr-only">
        {pending ? formCopy.sending : ""}
      </p>
    </div>
  );
}

/** Replaces a form once it's sent, and takes focus so screen readers announce it. */
export function FormSuccess({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="motion-safe:animate-fade-up">
      <span className="flex size-12 items-center justify-center rounded-full border border-copper-500/40 bg-copper-500/10 shadow-glow">
        <Check aria-hidden className="size-6 text-copper-400" />
      </span>
      <h3 ref={focusOnMount} tabIndex={-1} className="mt-5 text-xl font-semibold focus:outline-none">
        {title}
      </h3>
      <p className="mt-3 leading-relaxed text-titanium-500">{children}</p>
    </div>
  );
}
