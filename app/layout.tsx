import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/cursor/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sabbir Hossain — Web Developer & Conversion Specialist",
  description:
    "I craft high-converting websites that grow your business. 7+ years experience, 300+ websites built, 100+ satisfied clients. WordPress, Custom Websites, Landing Pages, E-Commerce.",
  keywords: [
    "web developer",
    "WordPress developer",
    "website design",
    "landing page",
    "e-commerce",
    "conversion rate optimization",
    "Sabbir Hossain",
    "business website",
  ],
  authors: [{ name: "Sabbir Hossain", url: "https://sabbir.dev" }],
  creator: "Sabbir Hossain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sabbir.dev",
    siteName: "Sabbir Hossain Portfolio",
    title: "Sabbir Hossain — Web Developer & Conversion Specialist",
    description:
      "Crafting high-converting websites that grow your business. 7+ years, 300+ websites, 100+ happy clients.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sabbir Hossain — Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabbir Hossain — Web Developer & Conversion Specialist",
    description: "Crafting high-converting websites that grow your business.",
    images: ["/og-image.jpg"],
    creator: "@sabbir_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sabbir Hossain",
  url: "https://sabbir.dev",
  jobTitle: "Web Developer & Conversion Specialist",
  description:
    "Professional web developer with 7+ years experience building high-converting websites.",
  knowsAbout: ["WordPress", "Web Development", "UI/UX Design", "Conversion Rate Optimization", "E-Commerce"],
  offers: {
    "@type": "Offer",
    description: "Web Development Services",
  },
};

import SmoothScroll from "@/components/layout/SmoothScroll";
import { ContentProvider } from "@/components/providers/ContentProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-text-primary font-inter antialiased">
        <ContentProvider>
          <SmoothScroll>
            {/* Noise grain overlay */}
            <div className="noise-overlay" aria-hidden="true" />

            {/* Custom cursor */}
            <CustomCursor />

            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main>{children}</main>

            {/* Footer */}
            <Footer />
          </SmoothScroll>
        </ContentProvider>
      </body>
    </html>
  );
}
