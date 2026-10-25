import type { BookingErrors, BookingFieldName, BookingValues } from "@/lib/booking/schema";

export type StepProps = {
  values: BookingValues;
  errors: BookingErrors;
  onChange: (name: BookingFieldName, value: string) => void;
};
