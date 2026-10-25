import { talentAreas } from "@/content/careers";
import { formCopy } from "@/content/forms";
import { isEmail, isWebsite, readFields, type FormErrors, type FormState, type FormValues } from "@/lib/forms";

// One validator for the talent pool form, run in the browser first and again in the Server Action.

export const talentFieldNames = ["fullName", "email", "area", "link", "message"] as const;

export type TalentFieldName = (typeof talentFieldNames)[number];
export type TalentValues = FormValues<TalentFieldName>;
export type TalentState = FormState<TalentFieldName>;

export const talentLimits = { fullName: 100, email: 254, link: 300, messageMin: 20, message: 2000 };

export function readTalent(input: Partial<Record<string, unknown>>): TalentValues {
  return readFields(input, talentFieldNames, ["message"]);
}

export function validateTalent(values: TalentValues) {
  const copy = formCopy.errors;
  const errors: FormErrors<TalentFieldName> = {};

  if (!values.fullName) errors.fullName = copy.fullName;
  else if (values.fullName.length > talentLimits.fullName) errors.fullName = copy.tooLong(talentLimits.fullName);
  if (!values.email) errors.email = copy.email;
  else if (!isEmail(values.email) || values.email.length > talentLimits.email) errors.email = copy.emailFormat;
  if (!talentAreas.includes(values.area)) errors.area = copy.choice;
  if (values.link && (!isWebsite(values.link) || values.link.length > talentLimits.link)) errors.link = copy.website;
  if (values.message.length < talentLimits.messageMin) errors.message = copy.tooShort(talentLimits.messageMin);
  else if (values.message.length > talentLimits.message) errors.message = copy.tooLong(talentLimits.message);

  return errors;
}
