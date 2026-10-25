import type { BlogCategory, Post } from "@/lib/types";

export const blogCategories: Record<BlogCategory, string> = {
  "ai-ml": "AI & Machine Learning",
  automation: "Automation Tutorials",
  content: "AI Content Creation",
  marketing: "Digital Marketing",
  web: "Web Development",
  programming: "Programming",
  research: "Research & Academic Writing",
  updates: "AIDMBD Updates",
};

// Each post's body is content/blog/<slug>.mdx. Newest first. The three launch articles are drafts
// for the client to review; confirm the author and set the publish dates at launch.
export const posts: Post[] = [
  {
    slug: "what-to-automate-first",
    title: "What to automate first: a practical checklist for small businesses",
    category: "automation",
    excerpt:
      "Not every task is worth automating. Here's how to spot the repetitive work that pays off first, and where a person should stay in the loop.",
    author: "AIDMBD Team",
    readingMinutes: 4,
    publishedAt: "2026-10-25",
    related: { kind: "service", label: "AI Automation", href: "/services/ai-automation" },
  },
  {
    slug: "prompting-fine-tuning-or-rag",
    title: "Prompting, fine-tuning or RAG? Choosing the right approach for your LLM project",
    category: "ai-ml",
    excerpt:
      "Three ways to adapt a language model to your problem, what each one costs, and how to decide which to try first.",
    author: "AIDMBD Team",
    readingMinutes: 4,
    publishedAt: "2026-10-25",
    related: { kind: "course", label: "Advanced LLM Research Methods", href: "/academy/courses/advanced-llm-research" },
  },
  {
    slug: "structuring-your-first-ai-research-paper",
    title: "How to structure your first AI research paper",
    category: "research",
    excerpt:
      "From research question to limitations: a section-by-section guide to writing a clear, reproducible machine learning paper.",
    author: "AIDMBD Team",
    readingMinutes: 4,
    publishedAt: "2026-10-25",
    related: { kind: "course", label: "Research Paper Writing for AI & ML", href: "/academy/courses/research-paper-writing" },
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export const blogPage = {
  description:
    "Practical articles on AI, machine learning, automation, web development, programming and research writing from AIDMBD International Ltd.",
  eyebrow: "Blog",
  title: "Practical notes on AI and building.",
  intro: "Guides and tutorials from our work in AI automation, machine learning, research writing and web development.",
  listTitle: "All articles",
  filterLegend: "Category",
  all: "All articles",
  count: (shown: number) => `${shown} ${shown === 1 ? "article" : "articles"}`,
  empty: "No articles in this category yet.",
  reset: "Show all articles",
};

export const postPage = {
  published: "Published",
  updated: "Updated",
  readingTime: (minutes: number) => `${minutes} min read`,
  related: {
    course: { label: "Related course", cta: "View course details" },
    service: { label: "Related service", cta: "View service details" },
  },
  more: { eyebrow: "Keep reading", title: "More articles." },
  cta: {
    eyebrow: "Next step",
    title: "Want help applying this?",
    intro: "Book a consultation and we'll talk through your project, or the learning path that fits you.",
  },
};
