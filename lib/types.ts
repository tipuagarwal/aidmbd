/** Icon keys stay serializable so content can cross the server/client boundary. */
export type IconName =
  | "brain-circuit"
  | "workflow"
  | "sparkles"
  | "megaphone"
  | "code"
  | "headset"
  | "bot"
  | "file-text"
  | "terminal";

export type LinkItem = {
  label: string;
  href: string;
};

export type NavItem = LinkItem & {
  /** Opens the services mega-menu instead of navigating directly. */
  hasMenu?: boolean;
};

export type FooterGroup = {
  title: string;
  links: Array<LinkItem & { soon?: boolean }>;
};

export type Service = {
  slug: string;
  title: string;
  icon: IconName;
  /** One line for cards and the mega-menu. */
  summary: string;
  description: string;
  audience: string[];
  subServices: string[];
  /** Scope, pricing and trust notes from the plan. */
  notes: string[];
  pricing: string;
  cta: LinkItem;
  secondaryCta?: LinkItem;
};

export type BookingType = {
  slug: string;
  title: string;
  topic: string;
};

export type CourseFormat = "live" | "recorded";

export type ProgrammingTrack = {
  language: string;
  topics: string[];
  sampleProject: string;
};

export type AcademyCategory = {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  formats: CourseFormat[];
  modules: string[];
  advancedModules?: { title: string; modules: string[] };
  tracks?: ProgrammingTrack[];
};

export type CaseStudyCategory =
  | "ai-automation"
  | "web-development"
  | "data-ml"
  | "content"
  | "marketing";

export type CaseStudy = {
  slug: string;
  title: string;
  category: CaseStudyCategory;
  /** Self-made samples must be labelled "Demo Project". */
  isDemo: boolean;
  problem: string;
  solution: string;
  /** Verified results only. Leave empty until measured. */
  results: string[];
  limitations?: string;
  relatedService: Service["slug"];
};

export type FaqGroup = "services" | "courses" | "support" | "pricing";

export type Faq = {
  id: string;
  group: FaqGroup;
  question: string;
  answer: string;
};
