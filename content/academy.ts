import type { AcademyCategory, Course, CourseFormat, CourseLevel } from "@/lib/types";

export const courseFormats: Record<CourseFormat, string> = {
  live: "Live",
  recorded: "Recorded",
};

export const courseLevels: Record<CourseLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

// Source: requirements.md §8. Courses live in content/courses.ts. The `description` lines are
// drafts to confirm with the client.
export const academyCategories: AcademyCategory[] = [
  {
    slug: "ai-automation",
    title: "AI Automation",
    icon: "bot",
    summary: "Build workflows, chatbots and AI agents, and connect the tools a business runs on.",
    description:
      "Learn to map a business process, automate it with no-code tools and APIs, and add chatbots and AI agents that hand over to people when they should.",
    formats: ["live", "recorded"],
    guidance: "learning-guidance",
    modules: [
      "Automation Fundamentals & Workflow Mapping",
      "No-code/Low-code Automation",
      "Triggers, Actions & Webhooks",
      "API Fundamentals",
      "Google Sheets & CRM Integration",
      "Email & Booking Automation",
      "AI Chatbot Development",
      "AI Agents & Tool Use",
      "Error Handling & Human Approval",
      "Deployment, Monitoring & Cost Management",
      "Final Business Automation Project",
    ],
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    icon: "brain-circuit",
    summary: "From foundations and data handling to models, evaluation and an applied capstone.",
    description:
      "Build the Python, maths and data skills behind machine learning, then train, evaluate and deploy models, with a first look at deep learning and generative AI.",
    formats: ["live", "recorded"],
    guidance: "learning-guidance",
    modules: [
      "AI & ML Fundamentals with the Python You Need",
      "Mathematics & Statistics Foundations",
      "NumPy, Pandas & Data Visualization",
      "Data Cleaning & Preprocessing",
      "Regression, Classification & Clustering",
      "Model Evaluation & Feature Engineering",
      "Deep Learning Introduction",
      "NLP & Computer Vision Introduction",
      "Generative AI & LLM Introduction",
      "Model Deployment Basics",
      "Practical Capstone Project",
    ],
  },
  {
    slug: "research-paper-writing",
    title: "AI, ML & LLM Research Paper Writing",
    icon: "file-text",
    summary: "Plan, run, analyze and write up your own research, with mentoring and draft feedback.",
    description:
      "Learners plan, run, analyze and write up their own research. Lessons cover research ethics, experiments, evaluation and academic writing, with mentoring and feedback on your draft.",
    formats: ["live", "recorded"],
    guidance: "research-mentorship",
    modules: [
      "Research Fundamentals & Research Ethics",
      "Topic Selection",
      "Literature Search & Literature Review",
      "Research Gap Identification",
      "Research Question & Objectives",
      "Dataset Selection & Data Documentation",
      "Methodology & Experimental Design",
      "Baseline & Model Comparison",
      "Evaluation Metrics",
      "Reproducibility & Experiment Tracking",
      "Results, Tables & Figures",
      "Discussion & Limitations",
      "Abstract, Introduction & Conclusion Writing",
      "Citation & Reference Management",
      "LaTeX/Overleaf Introduction",
      "Journal/Conference Selection",
      "Submission & Reviewer Response",
      "Research Proposal/Paper Draft Project",
    ],
    advancedModules: {
      title: "Advanced LLM modules",
      modules: [
        "Prompting vs Fine-tuning vs RAG",
        "LLM Evaluation",
        "Hallucination & Error Analysis",
        "Benchmark Selection",
        "Ablation Study",
        "Compute/API Cost Reporting",
      ],
    },
  },
  {
    slug: "programming",
    title: "Programming",
    icon: "terminal",
    summary: "Beginner courses in Python, Java, C and C++, each ending in a practical project.",
    description:
      "Beginner courses that build solid foundations in Python, Java, C and C++. Advanced and problem-solving courses will follow.",
    formats: ["live", "recorded"],
    guidance: "learning-guidance",
    modules: [],
    tracks: [
      {
        language: "Python",
        topics: ["Syntax", "Functions", "Data structures", "Files", "OOP", "Libraries"],
        sampleProject: "Data analysis or a small automation",
      },
      {
        language: "Java",
        topics: ["Syntax", "OOP", "Collections", "Exceptions", "File handling"],
        sampleProject: "Console management application",
      },
      {
        language: "C",
        topics: ["Variables", "Operators", "Loops", "Arrays", "Functions", "Pointers", "Structures"],
        sampleProject: "Student record management",
      },
      {
        language: "C++",
        topics: ["Fundamentals", "OOP", "STL", "Searching", "Sorting", "DSA introduction"],
        sampleProject: "Problem-solving and management project",
      },
    ],
  },
];

/** Shown on every research course and the research path (requirements §8.2, §14). */
export const researchNotes = [
  "No course can guarantee publication or acceptance.",
  "Your results, references and citations must be your own verified work.",
];

export function getAcademyCategory(slug: string) {
  return academyCategories.find((category) => category.slug === slug);
}

/** Live vs Recorded, shown on the Academy home and every course page (requirements §8.3). */
export const formatDetails: Record<CourseFormat, { title: string; summary: string; points: string[] }> = {
  live: {
    title: "Live classes",
    summary: "A fixed batch that learns together on a set schedule.",
    points: [
      "Classes on a published timetable, with dates and timezone",
      "Instructor-led Q&A in every class",
      "Recordings shared according to the course terms",
      "Access and support terms stated for each batch",
    ],
  },
  recorded: {
    title: "Recorded courses",
    summary: "Self-paced lessons you can start any time after enrolling.",
    points: [
      "Learn on your own schedule",
      "Track your progress module by module",
      "A defined level of support for questions",
      "Access duration stated for each course",
    ],
  },
};

export const academyPage = {
  description:
    "Practical courses in AI automation, machine learning, research paper writing and programming, live or recorded, each built around real projects.",
  eyebrow: "AIDMBD Learning Academy",
  title: "Learn AI by building with it.",
  intro:
    "Practical courses in AI automation, machine learning, research writing and programming. Join a live batch or learn at your own pace, and finish every course with a real project.",
  primaryCta: { label: "Browse courses", href: "#courses" },
  guidanceCta: "Get learning guidance",
  categories: {
    eyebrow: "Learning paths",
    title: "Four paths, one practical approach.",
    intro: "Each path can be taken as a full programme or split into smaller courses.",
  },
  formats: {
    eyebrow: "Live or recorded",
    title: "Learn the way that suits you.",
    intro: "Every course page states which formats it offers, with access and support terms for each.",
    browse: { live: "Browse live courses", recorded: "Browse recorded courses" },
  },
  catalog: {
    eyebrow: "Courses",
    title: "Find your course.",
    intro: "Enrollment opens course by course. Join a waitlist and we'll email you when yours opens.",
    formatLegend: "Format",
    levelLegend: "Level",
    allFormats: "All courses",
    formatOptions: { live: "Live classes", recorded: "Recorded courses" },
    allLevels: "All levels",
    count: (shown: number) => `${shown} ${shown === 1 ? "course" : "courses"}`,
    empty: "No courses match these filters yet.",
    reset: "Show all courses",
  },
  faq: { eyebrow: "FAQ", title: "Questions about learning with us." },
  cta: {
    eyebrow: "Learning guidance",
    title: "Not sure where to start?",
    intro: "Book a short learning guidance call and we'll suggest a course and path that fit your goals.",
  },
};

export const courseStatus: Record<Course["status"], { badge: string; cta: string }> = {
  waitlist: { badge: "Waitlist open", cta: "Join the waitlist" },
  enrolling: { badge: "Enrolling now", cta: "Request enrollment" },
};

export const categoryPage = {
  eyebrow: "Learning path",
  facts: { modules: "Modules", languages: "Languages", formats: "Formats", courses: "Courses" },
  syllabus: { eyebrow: "Syllabus", title: "What the path covers." },
  tracks: { eyebrow: "Courses", title: "Four languages, one project each.", topics: "Main topics", project: "Sample project" },
  researchPath: {
    eyebrow: "How it works",
    title: "Your research path.",
    steps: [
      { title: "Read the syllabus", description: "See what each module covers and what you'll produce." },
      { title: "Share your level and goal", description: "Tell us your experience and what you want to research." },
      { title: "Choose class or mentorship", description: "Join a course, or get one-to-one research mentorship." },
      { title: "Book mentorship if needed", description: "Talk through your topic, methodology or draft." },
      { title: "Learn by doing", description: "Enroll and build your own project step by step." },
    ],
  },
  courses: { eyebrow: "Courses", title: "Courses in this path." },
  seeCourses: "See courses",
  questions: "Ask a question",
};

export const coursePage = {
  pending: "Announced at launch",
  facts: {
    format: "Format",
    level: "Level",
    language: "Language",
    duration: "Duration",
    schedule: "Next live batch",
    fee: "Course fee",
    status: "Enrollment",
  },
  overview: { eyebrow: "Overview", title: "What you'll learn.", prerequisites: "Before you start" },
  syllabus: { eyebrow: "Syllabus", title: "Module by module.", projects: "Projects you'll build" },
  formats: {
    eyebrow: "Formats",
    title: "Live or recorded.",
    offered: "Offered for this course",
    notOffered: "Not offered for this course",
    schedule: "Next batch",
    recordings: "Recordings are shared with the batch according to the course terms.",
  },
  learning: {
    eyebrow: "How you learn",
    title: "Support, assessment and certificate.",
    resources: "Notes, code and templates",
    assessment: "Quizzes, assignments and projects",
    support: "Support",
    certificate: "Certificate",
  },
  instructor: {
    title: "Instructor",
    pending: "Instructor details are published when the first batch is announced.",
  },
  terms: {
    title: "Fees and terms",
    fee: "Course fee",
    toolCosts: "Tool costs",
    access: "Access",
    policies: "Refunds and cancellations follow our published policies.",
    links: [
      { label: "Refund Policy", href: "/policies/refund" },
      { label: "Cancellation Policy", href: "/policies/cancellation" },
    ],
  },
  waitlist: {
    eyebrow: "Next step",
    title: (course: string) => `Join the waitlist for ${course}.`,
    intro:
      "Enrollment hasn't opened yet. Leave your details and we'll email you when it does, with the fee, schedule and instructor.",
    ask: "Have a question first?",
  },
  more: { eyebrow: "Keep exploring", title: "More courses." },
  enroll: {
    eyebrow: "Next step",
    title: (course: string) => `Enroll in ${course}.`,
    intro: "Send an enrollment request and we'll email you the next steps, including payment and access.",
    ask: "Have a question first?",
  },
};

export const waitlistForm = {
  labels: { fullName: "Full name", email: "Email", format: "Preferred format" },
  formatOptions: { live: "Live classes", recorded: "Recorded", either: "Either works" },
  submit: { waitlist: "Join the waitlist", enrolling: "Send enrollment request" },
  privacy: "We'll only use your email for this course. See our",
  errors: {
    course: "This course isn't open for requests. Refresh the page and try again.",
    format: "Choose a format.",
  },
  success: {
    waitlist: {
      title: "You're on the waitlist.",
      intro: (course: string, email: string) =>
        `We'll email ${email} when enrollment for ${course} opens, with the fee, schedule and instructor.`,
    },
    enrolling: {
      title: "Enrollment request received.",
      intro: (course: string, email: string) => `We'll email ${email} with the next steps to join ${course}.`,
    },
  },
};
