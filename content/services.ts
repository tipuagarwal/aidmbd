import type { Service } from "@/lib/types";
import { bookingHref } from "./booking";

// Source: requirements.md §7.2. Packages and fees are pending from the client.
// Draft copy to confirm: `audience` (except AI & ML Learning) and the `pricing` lines
// for AI & ML Learning, Digital Marketing and Web Development are inferred, not from the plan.
export const services: Service[] = [
  {
    slug: "ai-ml-learning",
    title: "AI & ML Learning",
    icon: "brain-circuit",
    summary: "Guidance, mentoring and training that turn AI concepts into real skills.",
    description:
      "Personal guidance, project mentoring and institution-based training in AI and machine learning. Regular courses run in the AIDMBD Learning Academy; this service covers tailored learning for individuals, universities and teams.",
    audience: ["Students", "Beginners", "Researchers", "Teachers", "Business teams"],
    subServices: [
      "AI Fundamentals Training",
      "Machine Learning Fundamentals",
      "Deep Learning Introduction",
      "Generative AI & LLM Fundamentals",
      "Python for AI & Data Science",
      "Data Analysis & Visualization Training",
      "Prompt Engineering",
      "Computer Vision & NLP Introduction",
      "AI/ML Project Mentorship",
      "Model Evaluation & Result Interpretation",
      "University Workshop & Bootcamp",
      "Corporate AI Training",
      "Personalized Learning Roadmap",
    ],
    notes: ["Regular courses are listed in the Learning Academy."],
    pricing: "Per session, per workshop or custom training quote.",
    cta: { label: "Book Learning Guidance", href: bookingHref("learning-guidance") },
    secondaryCta: { label: "Explore Courses", href: "/academy" },
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    icon: "workflow",
    summary: "Automate repetitive work so your team can focus on what matters.",
    description:
      "Automation design, integration and support that make repetitive business work simple and organized — from lead follow-ups and reminders to chatbots, document extraction and AI agents.",
    audience: ["Small and growing businesses", "Sales and support teams", "Operations teams"],
    subServices: [
      "Business Workflow Automation",
      "Lead Collection, CRM Integration & Follow-up",
      "Email & Notification Automation",
      "Appointment Booking & Reminder",
      "Website Customer Support Chatbot",
      "WhatsApp/Messenger Integration",
      "Internal Knowledge Assistant",
      "Document & Invoice Data Extraction",
      "Google Sheets/Excel Reporting Workflow",
      "E-commerce Order Notification",
      "AI Agent & Tool Integration",
      "Existing Automation Audit & Maintenance",
    ],
    notes: [
      "Human review, error handling and manual handover are built in where needed.",
      "WhatsApp/Messenger integration depends on what each platform supports.",
      "Setup fee, maintenance and third-party tool/API costs are shown separately.",
    ],
    pricing: "Setup fee plus optional monthly maintenance.",
    cta: {
      label: "Discuss Your Automation",
      href: bookingHref("project-discussion", "ai-automation"),
    },
  },
  {
    slug: "ai-content-creation",
    title: "AI Content Creation",
    icon: "sparkles",
    summary: "AI-assisted visuals, video and copy for your brand and your learners.",
    description:
      "AI-assisted creative production for businesses, personal brands and learning — social posts, product visuals, short videos, scripts, voiceovers and website copy in Bangla and English.",
    audience: ["Businesses", "Personal brands", "Educators and trainers"],
    subServices: [
      "Social Media Content",
      "Product Images & Promotional Visuals",
      "Advertising Creative",
      "Short Video & Reels",
      "Video Script & Storyboard",
      "AI-assisted Voiceover",
      "Blog & Website Content",
      "Product Description",
      "Presentation & Training Content",
      "Thumbnail, Banner & Poster",
      "Content Calendar",
      "Bangla–English Content Adaptation",
      "Brand Content Workflow Setup",
    ],
    notes: [
      "Every package states content quantity, format, revision limit and delivery time.",
    ],
    pricing: "Fixed content packages or a custom quote.",
    cta: {
      label: "Request a Content Package",
      href: bookingHref("project-discussion", "ai-content-creation"),
    },
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    icon: "megaphone",
    summary: "Reach the right audience and measure what your campaigns achieve.",
    description:
      "Strategy, advertising, SEO and reporting that put your business in front of the right audience — with clear measurement so you can see what each campaign achieves.",
    audience: ["Local businesses", "E-commerce brands", "Service providers"],
    subServices: [
      "Digital Marketing Strategy",
      "Social Media Management",
      "Facebook & Instagram Advertising",
      "Google Ads",
      "Search Engine Optimization & Local SEO",
      "Business Profile Optimization",
      "Content Marketing & Email Marketing",
      "Lead Generation Campaign",
      "Landing Page Optimization",
      "Conversion Tracking & Analytics",
      "Campaign Reporting",
      "Marketing Automation",
    ],
    notes: [
      "Our agency fee and your advertising budget are always separate.",
      "We don't guarantee leads or sales; we agree scope, measurement and reporting up front.",
    ],
    pricing: "Monthly retainer or campaign-based quote, plus your ad budget.",
    cta: {
      label: "Plan Your Marketing",
      href: bookingHref("business-consultation", "digital-marketing"),
    },
  },
  {
    slug: "web-development",
    title: "Web Development",
    icon: "code",
    summary: "Websites and web apps that are fast, clear and built to grow.",
    description:
      "Websites and web applications for institutions, businesses and digital products — from landing pages and online stores to learning platforms, booking systems and custom dashboards.",
    audience: ["Businesses", "Institutions", "Founders and creators"],
    subServices: [
      "Business & Corporate Website",
      "Portfolio & Personal Brand Website",
      "Landing Page",
      "E-commerce Website",
      "Learning Management System (LMS)",
      "Course Selling Website",
      "Booking & Appointment Website",
      "Custom Web Application & Admin Dashboard",
      "Blog & Content Management System",
      "API & Payment Integration",
      "AI Chatbot Integration",
      "Website Redesign",
      "Speed & Mobile Optimization",
      "Website Maintenance & Support",
    ],
    notes: [
      "Proposals list page count, features, content responsibilities, hosting/domain cost, delivery scope and support period.",
    ],
    pricing: "Fixed project quote plus optional maintenance plan.",
    cta: {
      label: "Start Your Website Project",
      href: bookingHref("project-discussion", "web-development"),
    },
  },
  {
    slug: "virtual-assistant",
    title: "Virtual Assistant",
    icon: "headset",
    summary: "Reliable remote support for admin, research and daily operations.",
    description:
      "Remote administrative, research and operational support — inbox and calendar management, data entry, research, documents, CRM updates and customer support assistance.",
    audience: ["Founders and executives", "Small teams", "E-commerce sellers"],
    subServices: [
      "Email & Inbox Management",
      "Calendar, Meeting & Appointment Management",
      "Data Entry & Spreadsheet Management",
      "Online Research",
      "Document & Presentation Preparation",
      "CRM Update & Lead Organization",
      "Customer Support Assistance",
      "E-commerce Product Listing & Order Tracking",
      "Social Media Scheduling",
      "Meeting Notes & Follow-up Preparation",
      "AI-assisted Administrative Support",
    ],
    notes: [
      "Responsibilities, access permissions, working hours and response expectations are agreed before work starts.",
    ],
    pricing: "Hourly, monthly or task-based packages.",
    cta: {
      label: "Find Your Support Plan",
      href: bookingHref("business-consultation", "virtual-assistant"),
    },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
