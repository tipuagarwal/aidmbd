import { CalendarClock } from "lucide-react";
import { FieldError, SelectField, TextField } from "@/components/ui/Field";
import { Overline } from "@/components/ui/Overline";
import { bookingHints, bookingLabels, bookingPage, timeSlots } from "@/content/booking";
import { BOOKING_WINDOW_DAYS } from "@/lib/booking/schema";
import { describeTime } from "@/lib/booking/summary";
import { addDays, zoneLabel } from "@/lib/booking/time";
import { ChoiceCard } from "../ChoiceCard";
import { useTimeZones, useToday } from "../useBrowserTime";
import type { StepProps } from "./types";

/** Restates the choice in the visitor's timezone, and in the team's when it differs (flow step 4). */
function TimeSummary({ time }: { time: NonNullable<ReturnType<typeof describeTime>> }) {
  const copy = bookingPage.timeSummary;
  return (
    <div className="flex gap-4 rounded-xl border border-copper-500/25 bg-copper-500/5 p-5">
      <CalendarClock aria-hidden className="mt-0.5 size-5 shrink-0 text-copper-400" />
      <div>
        <Overline>{copy.title}</Overline>
        <p className="mt-2 font-semibold text-titanium-50">{time.date}</p>
        <p className="mt-1 text-titanium-300">
          {time.slot} · {time.zone}
        </p>
        {time.business && (
          <p className="mt-1 text-sm text-titanium-500">
            {copy.business}: {time.business}
          </p>
        )}
        <p className="mt-3 text-sm text-titanium-500">{copy.note}</p>
      </div>
    </div>
  );
}

export function TimeStep({ values, errors, onChange }: StepProps) {
  const today = useToday(values.timeZone);
  const zones = useTimeZones();
  // Keep the current value selectable even if the browser's list doesn't include it.
  const zoneOptions = !values.timeZone || zones.includes(values.timeZone) ? zones : [values.timeZone, ...zones];
  const time = describeTime(values);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="date"
          name="date"
          type="date"
          label={bookingLabels.date}
          value={values.date}
          onChange={(event) => onChange("date", event.target.value)}
          min={today ? addDays(today, 1) : undefined}
          max={today ? addDays(today, BOOKING_WINDOW_DAYS) : undefined}
          error={errors.date}
          required
        />
        <SelectField
          id="timeZone"
          name="timeZone"
          label={bookingLabels.timeZone}
          hint={bookingHints.timeZone}
          value={values.timeZone}
          onChange={(event) => onChange("timeZone", event.target.value)}
          error={errors.timeZone}
          required
        >
          <option value="" disabled>
            {bookingPage.timeZonePlaceholder}
          </option>
          {zoneOptions.map((zone) => (
            <option key={zone} value={zone}>
              {zoneLabel(zone)}
            </option>
          ))}
        </SelectField>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-titanium-300">{bookingLabels.slot}</legend>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {timeSlots.map((slot) => (
            <ChoiceCard
              key={slot.id}
              name="slot"
              value={slot.id}
              checked={values.slot === slot.id}
              onChange={() => onChange("slot", slot.id)}
              required
              aria-invalid={errors.slot ? true : undefined}
              aria-describedby={errors.slot ? "slot-error" : undefined}
              title={slot.label}
              description={`${slot.start}–${slot.end}`}
            />
          ))}
        </div>
        <FieldError id="slot-error" message={errors.slot} className="mt-3" />
      </fieldset>

      <div aria-live="polite">{time && <TimeSummary time={time} />}</div>
    </div>
  );
}
