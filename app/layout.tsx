import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";
import { siteSchema } from "@/lib/structuredData";
import "./globals.css";

const menuServices = services.map(({ slug, title, summary, icon }) => ({ slug, title, summary, icon }));

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.shortName,
  // Pages replace these with their own through pageMetadata(); they cover the 404 page.
  openGraph: { siteName: site.name, locale: "en", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ink-950 font-sans text-titanium-50">
        <a
          href="#main"
          className="sr-only rounded-lg bg-copper-600 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header services={menuServices} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <JsonLd data={siteSchema()} />
      </body>
    </html>
  );
}
