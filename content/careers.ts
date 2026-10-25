import type { Step } from "@/lib/types";

export type Opening = {
  slug: string;
  title: string;
  /** Job, internship or paid training: each has its own terms (requirements §12). */
  type: "Job" | "Internship" | "Paid training";
  location: string;
  responsibilities: string[];
  skills: string[];
  /** ISO date. */
  deadline: string;
};

// Real openings only. While this list is empty the page shows "No current openings" and the
// talent pool form. The application form with CV upload arrives in Phase 7. Draft copy below.
export const openings: Opening[] = [];

export const talentAreas = [
  "AI & automation",
  "Data & machine learning",
  "Web development",
  "Content & digital marketing",
  "Training & mentoring",
  "Virtual assistance & operations",
];

export const careersPage = {
  description:
    "Careers at AIDMBD International Ltd: current openings, how we hire, and how to join our talent pool for future roles in AI, web development, content and training.",
  eyebrow: "Careers",
  title: "Build practical AI with us.",
  intro: "We're a small team that builds AI solutions and teaches what we build. We look for people who like solving real problems and explaining them clearly.",
  why: {
    eyebrow: "Why AIDMBD",
    title: "What working here is like.",
    points: [
      { title: "Real projects", description: "Work on client solutions and course projects that people actually use." },
      { title: "Learn as you go", description: "Build skills across AI, automation, web and teaching, alongside people who do it daily." },
      { title: "Honest work", description: "Clear scopes, verified results and no overpromising, to clients or to learners." },
      { title: "People first", description: "We keep a person in the loop in our automations, and in how we treat our team." },
    ] satisfies Step[],
  },
  openings: {
    eyebrow: "Openings",
    title: "Current openings.",
    none: {
      title: "No current openings.",
      intro: "We don't have an open role right now. Join the talent pool below and we'll contact you when something fits.",
    },
    labels: { type: "Type", location: "Location", deadline: "Apply by", responsibilities: "Responsibilities", skills: "Required skills" },
    terms: "Each role states whether it's a job, an internship or paid training. Pay, hours and other terms differ between them and are set out in the role's description.",
  },
  process: {
    eyebrow: "Hiring process",
    title: "How we hire.",
    steps: [
      { title: "Apply", description: "Send your details and a portfolio or profile link." },
      { title: "Review", description: "We read every application and reply by email." },
      { title: "Conversation", description: "A short call to talk about the role and your experience." },
      { title: "Practical task", description: "A small, paid or time-boxed task related to the real work." },
      { title: "Offer", description: "A written offer with the role's terms, start date and expectations." },
    ] satisfies Step[],
  },
  talentPool: {
    eyebrow: "Talent pool",
    title: "Join the talent pool.",
    intro: "Tell us what you do and what you'd like to work on. We'll get in touch when a role or project fits.",
    labels: { fullName: "Full name", email: "Email", area: "Area of interest", link: "Portfolio or profile link", message: "About you" },
    hints: {
      link: "LinkedIn, GitHub, a portfolio or anything that shows your work.",
      message: "Your experience, what you'd like to work on, and whether you're looking for a job or an internship.",
    },
    submit: "Join the talent pool",
    success: {
      title: "You're in the talent pool.",
      intro: (email: string) => `Thanks. We'll contact you at ${email} when a role or project fits your experience.`,
    },
  },
  privacy: {
    title: "Applicant privacy",
    points: [
      "We use your details only to consider you for roles and projects at AIDMBD.",
      "We don't share them with anyone outside our hiring team.",
      "Ask us at any time to update or delete your details.",
    ],
  },
};
