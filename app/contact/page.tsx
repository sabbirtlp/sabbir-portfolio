import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata: Metadata = createPageMetadata({
  title: "Contact & Hire WordPress Developer | Sabbir Hossain",
  description:
    "Get in touch with Sabbir Hossain for custom WordPress development, WooCommerce stores, speed optimization, and high-converting website projects.",
  path: "/contact",
  keywords: [
    "hire WordPress developer",
    "contact web developer",
    "WordPress development consultation",
    "hire WooCommerce expert",
    "web design quote",
    "hire CRO specialist",
  ],
});

export default function ContactPage() {
  return <ContactClient />;
}
