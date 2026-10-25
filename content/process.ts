import type { Step } from "@/lib/types";

/** How every engagement runs. Shown on the homepage and each service page. */
export const processSteps: Step[] = [
  {
    title: "Discovery",
    description: "We learn your goals, users and constraints, and agree on what success looks like.",
  },
  {
    title: "Proposal & Scope",
    description:
      "You get a clear proposal: deliverables, timeline, revisions, support period and every cost, including third-party ones.",
  },
  {
    title: "Build",
    description: "We design and build in small steps and share progress, so you can give feedback early.",
  },
  {
    title: "Review & Launch",
    description: "We test together, fix what needs fixing, and launch when you're ready.",
  },
  {
    title: "Support & Maintenance",
    description: "We stay available for the agreed support period, with maintenance plans if you need them.",
  },
];
