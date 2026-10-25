import { bookingPage } from "@/content/booking";
import { cn } from "@/lib/cn";

/** Progress bar with step names. Names are visually hidden on small screens but still read out. */
export function StepIndicator({ current }: { current: number }) {
  return (
    <ol aria-label="Progress" className="grid grid-cols-4 gap-2 sm:gap-3">
      {bookingPage.steps.map((step, index) => {
        const state = index < current ? "done" : index === current ? "current" : "upcoming";
        return (
          <li key={step.label} aria-current={state === "current" ? "step" : undefined}>
            <span
              aria-hidden
              className={cn(
                "block h-1 rounded-full transition-colors duration-500 ease-brand",
                state === "upcoming" ? "bg-white/10" : "bg-copper-500",
              )}
            />
            <span
              className={cn(
                "sr-only text-xs font-medium sm:not-sr-only sm:mt-2.5 sm:block",
                state === "current" && "text-copper-300",
                state === "done" && "text-titanium-300",
                state === "upcoming" && "text-titanium-500",
              )}
            >
              {index + 1}. {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
