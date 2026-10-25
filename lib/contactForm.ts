import { contactTopics } from "@/content/contact";
import { formCopy } from "@/content/forms";
import { isEmail, readFields, type FormErrors, type FormState, type FormValues } from "@/lib/forms";

// One validator for the contact form, run in the browser first and again in the Server Action.

export const contactFieldNames = ["fullName", "email", "topic", "message"] as const;

export type ContactFieldName = (typeof contactFieldNames)[number];
export type ContactValues = FormValues<ContactFieldName>;
export type ContactState = FormState<ContactFieldName>;

export const contactLimits = { fullName: 100, email: 254, messageMin: 10, message: 2000 };

export function readContact(input: Partial<Record<string, unknown>>): ContactValues {
  return readFields(input, contactFieldNames, ["message"]);
}

export function validateContact(values: ContactValues) {
  const copy = formCopy.errors;
  const errors: FormErrors<ContactFieldName> = {};

  if (!values.fullName) errors.fullName = copy.fullName;
  else if (values.fullName.length > contactLimits.fullName) errors.fullName = copy.tooLong(contactLimits.fullName);
  if (!values.email) errors.email = copy.email;
  else if (!isEmail(values.email) || values.email.length > contactLimits.email) errors.email = copy.emailFormat;
  if (!contactTopics.some((topic) => topic.value === values.topic)) errors.topic = copy.choice;
  if (values.message.length < contactLimits.messageMin) errors.message = copy.tooShort(contactLimits.messageMin);
  else if (values.message.length > contactLimits.message) errors.message = copy.tooLong(contactLimits.message);

  return errors;
}
