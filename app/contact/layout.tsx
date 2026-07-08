import type { Metadata } from "next";
import { getContent } from "@/lib/storage";
import { buildFAQSchema, createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Sabbir Hossain — Hire a WordPress & CRO Developer",
  description:
    "Contact Sabbir Hossain for fast, SEO-friendly WordPress websites, WooCommerce stores, conversion-focused landing pages, and website optimization. Book a website consultation and get a rapid reply worldwide.",
  path: "/contact",
  keywords: [
    "hire WordPress developer",
    "website design consultation",
    "WordPress project inquiry",
    "remote web developer contact",
    "WooCommerce developer contact",
  ],
});

export default async function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  const faqs = content?.contactPage?.faqs ?? [];

  return (
    <>
      {faqs.length > 0 && <JsonLd data={buildFAQSchema(faqs)} />}
      {children}
    </>
  );
}
