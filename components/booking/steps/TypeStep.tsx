import { Check, Clock } from "lucide-react";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { FieldError, SelectField } from "@/components/ui/Field";
import { Overline } from "@/components/ui/Overline";
import { bookingLabels, bookingPage, bookingTypes, getBookingType } from "@/content/booking";
import { OTHER_INTEREST, type InterestGroup } from "@/lib/booking/schema";
import type { BookingType } from "@/lib/types";
import type { StepProps } from "./types";

/** Duration, fee, format and what to prepare for the chosen type (flow steps 1–2). */
function TypeDetails({ type }: { type?: BookingType }) {
  const copy = bookingPage.typeDetails;

  if (!type) {
    return (
      <p className="rounded-xl border border-dashed border-white/10 p-5 text-sm leading-relaxed text-titanium-500">
        {copy.placeholder}
      </p>
    );
  }

  const facts = [
    { label: copy.duration, value: type.duration },
    { label: copy.fee, value: type.fee },
    { label: copy.format, value: type.format },
  ];

  return (
    <div className="rounded-xl border border-line bg-ink-950/40 p-5 sm:p-6">
      <dl className="grid gap-5 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>
              <Overline>{fact.label}</Overline>
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-titanium-50">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <Overline className="mt-6">{copy.prepare}</Overline>
      <ul className="mt-3 space-y-2">
        {type.prepare.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-titanium-300">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TypeStep({ values, errors, onChange, interestGroups }: StepProps & { interestGroups: InterestGroup[] }) {
  const selected = getBookingType(values.type);
  // Learning types list courses first.
  const groups = selected?.interest === "courses" ? [...interestGroups].reverse() : interestGroups;

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="text-sm font-medium text-titanium-300">{bookingLabels.type}</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {bookingTypes.map((type) => (
            <ChoiceCard
              key={type.slug}
              name="type"
              value={type.slug}
              checked={values.type === type.slug}
              onChange={() => onChange("type", type.slug)}
              required
              aria-invalid={errors.type ? true : undefined}
              aria-describedby={errors.type ? "type-error" : undefined}
              title={type.title}
              description={type.topic}
              meta={
                <>
                  <Clock aria-hidden className="size-3.5" />
                  {type.duration}
                </>
              }
              className="sm:last:odd:col-span-2"
            />
          ))}
        </div>
        <FieldError id="type-error" message={errors.type} className="mt-3" />
      </fieldset>

      <TypeDetails type={selected} />

      <SelectField
        id="interest"
        name="interest"
        label={bookingLabels.interest}
        value={values.interest}
        onChange={(event) => onChange("interest", event.target.value)}
        error={errors.interest}
        required
      >
        <option value="" disabled>
          {bookingPage.interestPlaceholder}
        </option>
        {groups.map((group) => (
          <optgroup key={group.id} label={group.label}>
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
        <option value={OTHER_INTEREST}>{bookingPage.interestOther}</option>
      </SelectField>
    </div>
  );
}
