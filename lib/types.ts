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
  | "terminal"
  | "graduation-cap";

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
  /** The problem the service solves, for the detail page intro. */
  problem: string;
  audience: string[];
  subServices: string[];
  /** What the client receives. */
  deliverables: string[];
  /** Scope and delivery assumptions from the plan. */
  notes: string[];
  pricing: string;
  /** Third-party costs billed separately from our fee. */
  extraCosts: string[];
  /** Maintenance and support after delivery. */
  support: string;
  faqs: Array<{ question: string; answer: string }>;
  cta: LinkItem;
  secondaryCta?: LinkItem;
};

/** The slice of a service the navigation menus need. */
export type ServiceSummary = Pick<Service, "slug" | "title" | "summary" | "icon">;

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
  /** Shown in the homepage preview. */
  featured?: boolean;
};

export type FaqGroup = "services" | "courses" | "support" | "pricing";

export type Faq = {
  id: string;
  group: FaqGroup;
  question: string;
  answer: string;
};

export type BlogCategory =
  | "ai-ml"
  | "automation"
  | "content"
  | "marketing"
  | "web"
  | "programming"
  | "research"
  | "updates";

export type Post = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  author: string;
  readingMinutes: number;
  /** ISO date. Unset until the article is published. */
  publishedAt?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  kind: "client" | "student";
};

export type Step = {
  title: string;
  description: string;
};
