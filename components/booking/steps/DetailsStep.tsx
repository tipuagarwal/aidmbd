import type { ChangeEvent, ComponentProps } from "react";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import {
  bookingHints,
  bookingLabels,
  bookingPage,
  budgetRanges,
  getBookingType,
  skillLevels,
  timelines,
} from "@/content/booking";
import { maxLengths, type BookingFieldName } from "@/lib/booking/schema";
import type { StepProps } from "./types";

type ChangeTarget = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function OptionalSelect({ options, ...props }: ComponentProps<typeof SelectField> & { options: string[] }) {
  return (
    <SelectField tag={bookingPage.optional} {...props}>
      <option value="">{bookingPage.choicePlaceholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </SelectField>
  );
}

/** Contact details plus the optional fields the chosen meeting type asks for (flow step 5). */
export function DetailsStep({ values, errors, onChange }: StepProps) {
  const asked = new Set(getBookingType(values.type)?.fields);
  const optional = bookingPage.optional;

  const bind = (name: BookingFieldName) => ({
    id: name,
    name,
    label: bookingLabels[name],
    hint: bookingHints[name],
    error: errors[name],
    value: values[name],
    onChange: (event: ChangeEvent<ChangeTarget>) => onChange(name, event.target.value),
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <TextField {...bind("fullName")} autoComplete="name" maxLength={maxLengths.fullName} required />
      <TextField {...bind("email")} type="email" autoComplete="email" maxLength={maxLengths.email} required />
      <TextField {...bind("phone")} type="tel" autoComplete="tel" maxLength={maxLengths.phone} tag={optional} />
      {asked.has("company") && (
        <TextField {...bind("company")} autoComplete="organization" maxLength={maxLengths.company} tag={optional} />
      )}
      {asked.has("institution") && (
        <TextField
          {...bind("institution")}
          autoComplete="organization"
          maxLength={maxLengths.institution}
          tag={optional}
        />
      )}
      {asked.has("website") && (
        <TextField
          {...bind("website")}
          type="url"
          autoComplete="url"
          placeholder="example.com"
          maxLength={maxLengths.website}
          tag={optional}
        />
      )}
      {asked.has("skillLevel") && <OptionalSelect {...bind("skillLevel")} options={skillLevels} />}
      {asked.has("budget") && <OptionalSelect {...bind("budget")} options={budgetRanges} />}
      {asked.has("timeline") && <OptionalSelect {...bind("timeline")} options={timelines} />}
      <TextAreaField
        {...bind("message")}
        rows={5}
        maxLength={maxLengths.message}
        tag={bookingPage.messageCount(values.message.length, maxLengths.message)}
        className="sm:col-span-2"
        required
      />
    </div>
  );
}
