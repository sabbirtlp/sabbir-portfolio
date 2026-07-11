import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { ContentProvider } from "@/components/providers/ContentProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import JsonLd from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  buildGlobalSchemaGraph,
  DEFAULT_DESCRIPTION,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Sabbir Hossain",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  other: {
    keywords: SEO_KEYWORDS.join(", "),
  },
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: `${SITE_NAME} Portfolio`,
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={buildGlobalSchemaGraph()} />
      </head>
      <body
        className="bg-background text-text-primary font-inter antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ContentProvider>
            <SmoothScroll>
              <div className="noise-overlay" aria-hidden="true" />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
