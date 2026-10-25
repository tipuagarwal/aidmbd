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

// Planned articles. Phase 5 moves posts to MDX and adds publish dates.
export const posts: Post[] = [
  {
    slug: "what-to-automate-first",
    title: "What to automate first: a practical checklist for small businesses",
    category: "automation",
    excerpt:
      "Not every task is worth automating. Here's how to spot the repetitive work that pays off first, and where a person should stay in the loop.",
    author: "AIDMBD Team",
    readingMinutes: 6,
  },
  {
    slug: "prompting-fine-tuning-or-rag",
    title: "Prompting, fine-tuning or RAG? Choosing the right approach for your LLM project",
    category: "ai-ml",
    excerpt:
      "Three ways to adapt a language model to your problem, what each one costs, and how to decide which to try first.",
    author: "AIDMBD Team",
    readingMinutes: 8,
  },
  {
    slug: "structuring-your-first-ai-research-paper",
    title: "How to structure your first AI research paper",
    category: "research",
    excerpt:
      "From research question to limitations: a section-by-section guide to writing a clear, reproducible machine learning paper.",
    author: "AIDMBD Team",
    readingMinutes: 7,
  },
];
