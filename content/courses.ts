import type { Course, CourseSummary } from "@/lib/types";
import { academyCategories, researchNotes } from "./academy";

// Syllabi come from the plan (requirements §8.2). Outcomes, prerequisites, projects, resources,
// assessment, certificate conditions, tool costs and the language are drafts to confirm with
// the client. Every course is "waitlist" until its fee, schedule and instructor are confirmed;
// the unset fields (instructor, duration, schedule, fee, support, access) show as pending.

const category = (slug: string) => academyCategories.find((item) => item.slug === slug)!;
const language = "English and Bangla";

const programming = {
  category: "programming",
  level: "beginner",
  formats: ["live", "recorded"],
  status: "waitlist",
  language,
  resources: ["Lesson notes", "All example code from the lessons", "Practice exercises with solutions"],
  assessment: ["Coding exercises after each module", "A short quiz after each module", "Final project review"],
  certificate: "Awarded when you complete the module exercises and pass the final project review.",
  toolCosts: "Free tools only: the language itself and a free code editor.",
} satisfies Partial<Course>;

export const courses: Course[] = [
  {
    slug: "practical-ai-automation",
    title: "Practical AI Automation",
    category: "ai-automation",
    level: "beginner",
    formats: ["live", "recorded"],
    status: "waitlist",
    summary: "Map a business workflow, automate it with no-code tools and APIs, and add chatbots and AI agents.",
    overview:
      "A hands-on course that takes you from mapping a workflow to deploying and monitoring a working automation. You'll connect forms, sheets, CRMs and email, build a chatbot and an AI agent, and finish by automating a real business process end to end.",
    outcomes: [
      "Map a business process and decide what to automate",
      "Build workflows with triggers, actions and webhooks",
      "Connect tools through APIs, Google Sheets and a CRM",
      "Build an AI chatbot and an agent that uses tools",
      "Add error handling and human approval steps",
      "Deploy, monitor and keep running costs under control",
    ],
    prerequisites: ["Comfortable using web apps and spreadsheets", "No programming experience needed"],
    syllabus: category("ai-automation").modules,
    projects: [
      "Lead capture into a CRM with an automatic follow-up email",
      "Appointment booking with reminders",
      "Final project: automate a real business workflow end to end",
    ],
    language,
    resources: ["Lesson notes and workflow diagrams", "Workflow templates to import", "Sample data and API request examples"],
    assessment: [
      "A short quiz after each module",
      "A hands-on assignment for each workflow you build",
      "Final project reviewed by the instructor",
    ],
    certificate: "Awarded when you complete the module assignments and pass the final project review.",
    toolCosts: "Free plans are used where possible. Any paid tool or API usage is listed before you enroll.",
  },
  {
    slug: "ai-ml-foundations",
    title: "AI & Machine Learning Foundations",
    category: "ai-machine-learning",
    level: "beginner",
    formats: ["live", "recorded"],
    status: "waitlist",
    summary: "Learn the Python, maths and data skills behind ML, then build, evaluate and deploy your own models.",
    overview:
      "Starting with the Python and maths you need, this course walks through the full machine learning workflow: preparing data, training classic models, evaluating them honestly, and a first look at deep learning, NLP, computer vision and generative AI. It ends with a capstone project on a dataset you choose.",
    outcomes: [
      "Explore and visualize data with Python, NumPy and Pandas",
      "Clean and prepare real datasets for modelling",
      "Train regression, classification and clustering models",
      "Evaluate models and engineer better features",
      "Explain how deep learning, NLP, computer vision and LLMs work",
      "Deploy a simple model and present your results",
    ],
    prerequisites: ["School-level mathematics", "Basic computer skills: Python is taught in the first module"],
    syllabus: category("ai-machine-learning").modules,
    projects: [
      "Exploratory analysis of a public dataset",
      "A classification model with an evaluation report",
      "Capstone: an end-to-end ML project on a dataset you choose",
    ],
    language,
    resources: ["Lesson notes and slides", "Jupyter notebooks with all course code", "Practice datasets"],
    assessment: ["A quiz after each module", "Notebook assignments with feedback", "Capstone project presentation"],
    certificate: "Awarded when you complete the assignments and present your capstone project.",
    toolCosts: "Runs on free tools such as Python, Jupyter and Google Colab. No paid software is required.",
  },
  {
    slug: "research-paper-writing",
    title: "Research Paper Writing for AI & ML",
    category: "research-paper-writing",
    level: "intermediate",
    formats: ["live", "recorded"],
    status: "waitlist",
    summary: "Plan, run and write up your own AI or ML research, from literature review to a full draft.",
    overview:
      "You plan, run, analyze and write up your own research project. The course covers research ethics, literature review, experimental design, evaluation and reproducibility, then academic writing, citations and LaTeX, and finishes with choosing a venue and responding to reviewers. Mentoring and feedback on your draft are part of the course.",
    outcomes: [
      "Find a research gap and frame clear research questions",
      "Design experiments with sound baselines and metrics",
      "Keep experiments reproducible and well documented",
      "Present results in clear tables and figures",
      "Write each section of a paper and manage citations in LaTeX",
      "Choose a venue and respond to reviewer comments",
    ],
    prerequisites: [
      "Working knowledge of machine learning basics",
      "Some Python experience for running experiments",
      "A research interest or topic you'd like to explore",
    ],
    syllabus: category("research-paper-writing").modules,
    projects: [
      "A literature review matrix for your topic",
      "An experiment plan with baselines and metrics",
      "Final project: a research proposal or paper draft",
    ],
    language,
    resources: ["Lesson notes and writing guides", "LaTeX/Overleaf paper templates", "Experiment tracking and reference templates"],
    assessment: [
      "Checkpoint reviews at the proposal, experiment and draft stages",
      "Written feedback on your draft",
      "Final proposal or paper draft review",
    ],
    certificate: "Awarded when you complete the checkpoint reviews and submit your final proposal or draft.",
    toolCosts:
      "Overleaf and reference managers have free plans. Compute or API costs for your own experiments are separate and discussed up front.",
    notes: researchNotes,
  },
  {
    slug: "advanced-llm-research",
    title: "Advanced LLM Research Methods",
    category: "research-paper-writing",
    level: "advanced",
    formats: ["live"],
    status: "waitlist",
    summary: "Compare prompting, fine-tuning and RAG, evaluate LLMs fairly, and report errors and costs.",
    overview:
      "For learners already researching large language models. You'll compare prompting, fine-tuning and retrieval-augmented generation, choose benchmarks, analyze hallucinations and errors, run ablation studies, and report compute and API costs the way strong papers do. It runs live so your experiments get direct feedback.",
    outcomes: [
      "Choose between prompting, fine-tuning and RAG for a research question",
      "Design a fair LLM evaluation and pick suitable benchmarks",
      "Analyze hallucinations and other error patterns",
      "Run ablation studies that isolate what matters",
      "Report compute and API costs alongside your results",
    ],
    prerequisites: [
      "Research Paper Writing for AI & ML, or equivalent research experience",
      "Hands-on experience with LLM APIs or open models in Python",
    ],
    syllabus: category("research-paper-writing").advancedModules!.modules,
    projects: ["An evaluation plan comparing two LLM approaches", "Final project: an ablation study with a cost report"],
    language,
    resources: ["Lesson notes and a reading list", "Evaluation and ablation notebook templates", "A cost reporting template"],
    assessment: ["Live review of your evaluation plan", "Final experiment report with written feedback"],
    certificate: "Awarded when you complete the evaluation plan and the final experiment report.",
    toolCosts: "Model API or GPU costs for your experiments are separate and depend on your project. We help you estimate them first.",
    notes: researchNotes,
  },
  {
    ...programming,
    slug: "python-programming",
    title: "Python Programming",
    summary: "Learn Python from scratch, from syntax and functions to files, OOP and libraries.",
    overview:
      "A beginner course that builds solid Python foundations. You'll write programs with functions and data structures, work with files, learn object-oriented programming and use popular libraries, then put it all together in a final project.",
    outcomes: [
      "Write, run and debug Python programs",
      "Organize code with functions and modules",
      "Work with lists, dictionaries and other data structures",
      "Read and write files",
      "Build classes with object-oriented programming",
      "Use libraries to analyze data or automate tasks",
    ],
    prerequisites: ["No programming experience needed", "A computer you can install Python on"],
    syllabus: [
      "Python Syntax & Setup",
      "Functions",
      "Data Structures",
      "Working with Files",
      "Object-Oriented Programming",
      "Using Libraries",
      "Final Project",
    ],
    projects: ["Final project: a data analysis or a small automation"],
  },
  {
    ...programming,
    slug: "java-programming",
    title: "Java Programming",
    summary: "Learn Java syntax and object-oriented programming, then build a console application.",
    overview:
      "A beginner course in Java and object-oriented design. You'll learn the syntax, model problems with classes and objects, use collections, handle exceptions and files, and finish by building a console management application.",
    outcomes: [
      "Write and run Java programs",
      "Model problems with classes, objects and inheritance",
      "Store and process data with Java collections",
      "Handle errors with exceptions",
      "Read and write files",
    ],
    prerequisites: ["No programming experience needed", "A computer you can install Java on"],
    syllabus: ["Java Syntax & Setup", "Object-Oriented Programming", "Collections", "Exceptions", "File Handling", "Final Project"],
    projects: ["Final project: a console management application"],
  },
  {
    ...programming,
    slug: "c-programming",
    title: "C Programming",
    summary: "Learn how programs work close to the machine, from variables and loops to pointers and structures.",
    overview:
      "A beginner course in C that shows how programs work close to the machine. You'll learn variables, operators, loops, arrays and functions, get comfortable with pointers and structures, and build a student record management system.",
    outcomes: [
      "Write and compile C programs",
      "Control program flow with conditions and loops",
      "Work with arrays and functions",
      "Understand and use pointers safely",
      "Group data with structures",
    ],
    prerequisites: ["No programming experience needed", "A computer you can install a C compiler on"],
    syllabus: ["Variables & Operators", "Loops", "Arrays", "Functions", "Pointers", "Structures", "Final Project"],
    projects: ["Final project: a student record management system"],
  },
  {
    ...programming,
    slug: "cpp-programming",
    title: "C++ Programming",
    summary: "Learn C++, object-oriented programming and the STL, with an introduction to algorithms.",
    overview:
      "A beginner course in C++ that goes from the fundamentals to object-oriented programming and the Standard Template Library. It introduces searching, sorting and core data structures, and ends with a problem-solving and management project.",
    outcomes: [
      "Write and compile C++ programs",
      "Design programs with classes and objects",
      "Use STL containers and algorithms",
      "Implement searching and sorting",
      "Reason about basic data structures and algorithms",
    ],
    prerequisites: ["No programming experience needed", "A computer you can install a C++ compiler on"],
    syllabus: [
      "C++ Fundamentals",
      "Object-Oriented Programming",
      "The Standard Template Library",
      "Searching & Sorting",
      "Introduction to Data Structures & Algorithms",
      "Final Project",
    ],
    projects: ["Final project: a problem-solving and management project"],
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

/** Card and filter data only, so client components don't ship full course content. */
export function toCourseSummary(course: Course): CourseSummary {
  const { slug, title, level, formats, status, summary } = course;
  return {
    slug,
    title,
    category: course.category,
    level,
    formats,
    status,
    summary,
    categoryTitle: category(course.category).title,
    moduleCount: course.syllabus.length,
  };
}
