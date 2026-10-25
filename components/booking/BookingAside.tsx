import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { bookingPage } from "@/content/booking";
import { cn } from "@/lib/cn";

/** How the request works and the rescheduling terms, beside the form. */
export function BookingAside({ className }: { className?: string }) {
  const { howItWorks, terms } = bookingPage.aside;

  return (
    <aside className={cn("space-y-6 lg:sticky lg:top-28 lg:self-start", className)}>
      <Card className="p-6 sm:p-7">
        <h2 className="text-lg font-semibold">{howItWorks.title}</h2>
        <ol className="mt-6 space-y-6">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-copper-500/40 font-mono text-xs text-copper-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-medium text-titanium-50">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-titanium-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="p-6 sm:p-7">
        <h2 className="text-lg font-semibold">{terms.title}</h2>
        <ul className="mt-5 space-y-3">
          {terms.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-titanium-300">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-400" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
