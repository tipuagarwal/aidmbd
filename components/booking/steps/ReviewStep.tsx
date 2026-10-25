import Link from "next/link";
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { bookingPage } from "@/content/booking";
import type { SummaryRow } from "@/lib/booking/summary";

type ReviewStepProps = {
  /** Rows per earlier step, in step order. */
  sections: SummaryRow[][];
  onEdit: (step: number) => void;
  error: string;
};

/** Everything entered so far, with a way back to each step (flow step 6). */
export function ReviewStep({ sections, onEdit, error }: ReviewStepProps) {
  const copy = bookingPage.review;

  return (
    <div className="space-y-6">
      {sections.map((rows, index) => {
        const label = bookingPage.steps[index].label;
        return (
          <section
            key={label}
            aria-labelledby={`review-${index}`}
            className="rounded-xl border border-line bg-ink-950/40 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id={`review-${index}`} className="font-semibold">
                {label}
              </h3>
              <Button variant="link" onClick={() => onEdit(index)} className="h-11 text-sm">
                {copy.edit}
                <span className="sr-only"> {label}</span>
              </Button>
            </div>
            <dl className="mt-2 divide-y divide-line">
              {rows.map((row) => (
                <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm text-titanium-500">{row.label}</dt>
                  <dd className="whitespace-pre-line wrap-break-word text-titanium-50 sm:col-span-2">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}

      <p className="text-sm leading-relaxed text-titanium-500">
        {copy.consent}{" "}
        <Link href={copy.privacy.href} className="text-copper-400 underline decoration-copper-400/40 underline-offset-4 transition-colors hover:text-copper-300 hover:decoration-copper-300">
          {copy.privacy.label}
        </Link>
        .
      </p>

      {error && (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-danger-500/40 bg-danger-500/10 p-4 text-sm text-danger-400"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
