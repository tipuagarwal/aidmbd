import type { LinkItem, Step } from "@/lib/types";

export type Founder = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public. A real photo only (requirements §4). */
  photo: string;
  /** Profiles where the bio can be verified, such as LinkedIn. */
  links: LinkItem[];
};

// Draft copy to confirm with the client. The founder section stays hidden until a real photo
// and a verifiable bio are supplied (requirements §12); team roles describe how the work is
// organised, not named people.
export const founder: Founder | undefined = undefined;

export const aboutPage = {
  description:
    "AIDMBD International Ltd helps businesses work smarter with AI and automation, builds digital products and teaches practical AI through real projects.",
  eyebrow: "About AIDMBD",
  title: "Practical AI, built and taught by one team.",
  intro:
    "AIDMBD International Ltd helps businesses simplify their work with AI and automation, builds digital products that grow with them, and teaches AI through hands-on projects.",
  purpose: {
    eyebrow: "Our purpose",
    title: "Make AI useful, not just impressive.",
    paragraphs: [
      "AI is changing how businesses work and how people learn, but most of what's written about it is either hype or theory. We focus on the practical middle: tools and skills that solve a real problem, with a clear scope and honest results.",
      "That's why we do two things side by side. For businesses, we design and build AI solutions, websites and digital marketing. For learners, the AIDMBD Learning Academy teaches the same skills through real projects. Each side keeps the other grounded.",
    ],
  },
  areas: {
    eyebrow: "What we do",
    title: "Two halves, one practical approach.",
    items: [
      {
        title: "Business services",
        description: "AI automation, AI content creation, digital marketing, web development and virtual assistant support, scoped and priced clearly.",
        cta: { label: "Explore services", href: "/services" },
      },
      {
        title: "Learning Academy",
        description: "Live and recorded courses in AI automation, machine learning, research paper writing and programming, each ending in a real project.",
        cta: { label: "Explore the Academy", href: "/academy" },
      },
    ],
  },
  principles: { eyebrow: "How we work", title: "Principles we hold ourselves to." },
  process: { eyebrow: "Delivery", title: "From first conversation to long-term support." },
  team: {
    eyebrow: "Team",
    title: "How our team is organised.",
    intro: "Each project and course is led by people who specialise in that area.",
    roles: [
      { title: "AI & Automation", description: "Workflows, chatbots, AI agents and the integrations that connect them." },
      { title: "Data & Machine Learning", description: "Data preparation, models, evaluation and honest reporting of results." },
      { title: "Web Development", description: "Websites, learning platforms and custom web applications." },
      { title: "Content & Marketing", description: "AI-assisted content, campaigns, SEO and measurement." },
      { title: "Training & Mentoring", description: "Courses, workshops and research mentorship for learners and teams." },
      { title: "Client Support", description: "Scheduling, communication and the day-to-day support clients rely on." },
    ] satisfies Step[],
  },
  founder: { eyebrow: "Founder", profile: "View profile" },
  cta: {
    eyebrow: "Work with us",
    title: "Let's talk about what you're building.",
    intro: "Book a consultation for a project, or learning guidance for a course.",
  },
};
