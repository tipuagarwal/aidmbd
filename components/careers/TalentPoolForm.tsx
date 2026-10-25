"use client";

import { joinTalentPool } from "@/app/careers/actions";
import { FormAlert, FormSuccess, Honeypot, SubmitRow } from "@/components/forms/FormParts";
import { useFormSubmission } from "@/components/forms/useFormSubmission";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { careersPage, talentAreas } from "@/content/careers";
import { formCopy } from "@/content/forms";
import { readTalent, talentFieldNames, talentLimits, validateTalent, type TalentFieldName } from "@/lib/talentPool";

const copy = careersPage.talentPool;

/** Talent pool sign-up for future roles. Works without JavaScript. CV upload arrives in Phase 7. */
export function TalentPoolForm() {
  const { state, formAction, pending, formRef, errors, values, onSubmit, clearError } = useFormSubmission({
    action: joinTalentPool,
    fields: talentFieldNames,
    validate: (data) => validateTalent(readTalent(Object.fromEntries(data))),
  });

  if (state.status === "success") {
    return <FormSuccess title={copy.success.title}>{copy.success.intro(state.values.email)}</FormSuccess>;
  }

  const field = (name: TalentFieldName) => ({
    id: `talent-${name}`,
    name,
    label: copy.labels[name],
    defaultValue: values?.[name],
    onChange: () => clearError(name),
    error: errors[name],
  });

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField {...field("fullName")} autoComplete="name" maxLength={talentLimits.fullName} required />
        <TextField {...field("email")} type="email" autoComplete="email" maxLength={talentLimits.email} required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Keyed on the submitted value so a failed send re-selects it. */}
        <SelectField key={values?.area} {...field("area")} required>
          <option value="">{formCopy.choose}</option>
          {talentAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </SelectField>
        <TextField
          {...field("link")}
          type="url"
          inputMode="url"
          placeholder="linkedin.com/in/your-name"
          maxLength={talentLimits.link}
          tag={formCopy.optional}
          hint={copy.hints.link}
        />
      </div>
      <TextAreaField {...field("message")} rows={6} maxLength={talentLimits.message} hint={copy.hints.message} required />
      <Honeypot id="talent-homepage" />
      <FormAlert message={state.status === "error" ? state.message : undefined} />
      <SubmitRow label={copy.submit} pending={pending} />
    </form>
  );
}
