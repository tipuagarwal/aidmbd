import type { FooterGroup, LinkItem, NavItem } from "@/lib/types";

export const site = {
  name: "AIDMBD International Ltd",
  shortName: "AIDMBD",
  tagline: "AI Solutions, Digital Development & Practical Learning",
  footerTagline: "Practical AI. Real business impact.",
  description:
    "AIDMBD International Ltd helps businesses work smarter with AI and automation, builds digital products that grow, and teaches practical AI through real projects.",
  // Business email, phone/WhatsApp and social profile URLs are pending from the client (requirements §18).
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasMenu: true },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
];

export const primaryCta: LinkItem = {
  label: "Book a Consultation",
  href: "/book",
};

export const academyLink: LinkItem = {
  label: "AIDMBD Learning Academy",
  href: "/academy",
};

// The Services column is built from content/services.ts.
export const footerGroups: FooterGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/about#team" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "Courses", href: "/academy" },
      { label: "Live Batches", href: "/academy#live" },
      { label: "Recorded Courses", href: "/academy#recorded" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Student Support", href: "/contact" },
      { label: "Certificate Verification", href: "/certificate-verification", soon: true },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms of Service", href: "/policies/terms" },
      { label: "Refund Policy", href: "/policies/refund" },
      { label: "Cancellation Policy", href: "/policies/cancellation" },
    ],
  },
];
