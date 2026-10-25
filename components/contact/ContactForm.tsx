"use client";

import { sendContactMessage } from "@/app/contact/actions";
import { FormAlert, FormSuccess, Honeypot, SubmitRow } from "@/components/forms/FormParts";
import { useFormSubmission } from "@/components/forms/useFormSubmission";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { contactPage, contactTopics } from "@/content/contact";
import { formCopy } from "@/content/forms";
import { contactFieldNames, contactLimits, readContact, validateContact, type ContactFieldName } from "@/lib/contactForm";

const copy = contactPage.form;

/** Short contact form. Works without JavaScript. */
export function ContactForm() {
  const { state, formAction, pending, formRef, errors, values, onSubmit, clearError } = useFormSubmission({
    action: sendContactMessage,
    fields: contactFieldNames,
    validate: (data) => validateContact(readContact(Object.fromEntries(data))),
  });

  if (state.status === "success") {
    return <FormSuccess title={copy.success.title}>{copy.success.intro(state.values.email)}</FormSuccess>;
  }

  const field = (name: ContactFieldName) => ({
    id: `contact-${name}`,
    name,
    label: copy.labels[name],
    defaultValue: values?.[name],
    onChange: () => clearError(name),
    error: errors[name],
    required: true,
  });

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField {...field("fullName")} autoComplete="name" maxLength={contactLimits.fullName} />
        <TextField {...field("email")} type="email" autoComplete="email" maxLength={contactLimits.email} />
      </div>
      {/* Keyed on the submitted value so a failed send re-selects it. */}
      <SelectField key={values?.topic} {...field("topic")}>
        <option value="">{formCopy.choose}</option>
        {contactTopics.map((topic) => (
          <option key={topic.value} value={topic.value}>
            {topic.label}
          </option>
        ))}
      </SelectField>
      <TextAreaField {...field("message")} rows={6} maxLength={contactLimits.message} />
      <Honeypot id="contact-homepage" />
      <FormAlert message={state.status === "error" ? state.message : undefined} />
      <SubmitRow label={copy.submit} pending={pending} />
    </form>
  );
}
