import type { CaseStudy, CaseStudyCategory, IconName } from "@/lib/types";

export const caseStudyCategories: Record<CaseStudyCategory, { label: string; icon: IconName }> = {
  "ai-automation": { label: "AI Automation", icon: "workflow" },
  "web-development": { label: "Web Development", icon: "code" },
  "data-ml": { label: "Data & ML", icon: "brain-circuit" },
  content: { label: "Content", icon: "sparkles" },
  marketing: { label: "Marketing", icon: "megaphone" },
};

// Seed data: the demo projects suggested in the plan (requirements §10).
// Publish each one only after it is built and has real screenshots. Results stay empty until verified.
export const caseStudies: CaseStudy[] = [
  {
    slug: "textile-production-planning-dashboard",
    title: "Textile Production Planning Dashboard",
    category: "data-ml",
    isDemo: true,
    problem: "Production planners track orders, line capacity and deadlines across scattered spreadsheets.",
    solution: "One dashboard that brings orders, capacity and schedules together and flags orders at risk of running late.",
    results: [],
    relatedService: "web-development",
    featured: true,
  },
  {
    slug: "demand-forecasting-system",
    title: "Demand Forecasting System",
    category: "data-ml",
    isDemo: true,
    problem: "Stock and production decisions rely on guesswork instead of sales history.",
    solution: "A forecasting model trained on historical sales and compared against a simple baseline.",
    results: [],
    limitations: "The write-up must state the data used, the test period, the baseline and the evaluation limitations.",
    relatedService: "ai-ml-learning",
  },
  {
    slug: "bangla-english-faq-assistant",
    title: "Bangla–English FAQ Assistant",
    category: "ai-automation",
    isDemo: true,
    problem: "Customers ask the same questions in two languages, and the support team answers each one by hand.",
    solution: "A bilingual assistant that answers from an approved knowledge base and hands over to a person when unsure.",
    results: [],
    relatedService: "ai-automation",
    featured: true,
  },
  {
    slug: "lead-follow-up-workflow",
    title: "Lead Follow-up Workflow",
    category: "ai-automation",
    isDemo: true,
    problem: "Leads from forms and messages go cold because follow-ups depend on someone remembering.",
    solution: "A workflow that captures each lead, logs it in a CRM sheet and schedules follow-ups, with a person approving key messages.",
    results: [],
    relatedService: "ai-automation",
  },
  {
    slug: "course-learning-portal",
    title: "Course Learning Portal",
    category: "web-development",
    isDemo: true,
    problem: "Course material, recordings and assignments are shared through scattered links and chat groups.",
    solution: "A portal where students enroll, watch lessons, track progress and find every resource in one place.",
    results: [],
    relatedService: "web-development",
    featured: true,
  },
];
