"use server";

import { contactTopics } from "@/content/contact";
import { readContact, validateContact, type ContactState } from "@/lib/contactForm";
import { handleSubmission } from "@/lib/submit";

export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  return handleSubmission(formData, {
    read: readContact,
    validate: validateContact,
    compose: (values) => {
      const topic = contactTopics.find((item) => item.value === values.topic)?.label;
      return {
        subject: `Contact: ${topic} — ${values.fullName}`,
        text: [
          `New message from the website contact form. Reply to this email to answer ${values.fullName} directly.`,
          [`Topic: ${topic}`, `Full name: ${values.fullName}`, `Email: ${values.email}`].join("\n"),
          `Message:\n${values.message}`,
        ].join("\n\n"),
      };
    },
  });
}
