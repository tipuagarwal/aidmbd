"use server";

import { readTalent, validateTalent, type TalentState } from "@/lib/talentPool";
import { handleSubmission } from "@/lib/submit";

export async function joinTalentPool(_previous: TalentState, formData: FormData): Promise<TalentState> {
  return handleSubmission(formData, {
    read: readTalent,
    validate: validateTalent,
    compose: (values) => ({
      subject: `Talent pool: ${values.area} — ${values.fullName}`,
      text: [
        `New talent pool application from the careers page. Reply to this email to answer ${values.fullName} directly.`,
        [
          `Area of interest: ${values.area}`,
          `Full name: ${values.fullName}`,
          `Email: ${values.email}`,
          ...(values.link ? [`Portfolio or profile: ${values.link}`] : []),
        ].join("\n"),
        `About them:\n${values.message}`,
      ].join("\n\n"),
    }),
  });
}
