import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = createPageMetadata({
  title: "WordPress & Web Development Portfolio | Sabbir Hossain",
  description:
    "Explore 300+ custom WordPress websites, WooCommerce stores, and high-converting web projects built for global clients across diverse industries.",
  path: "/portfolio",
  keywords: [
    "WordPress portfolio",
    "web development portfolio",
    "WooCommerce case studies",
    "Elementor website examples",
    "client website showcase",
    "conversion-focused websites",
  ],
});

export default function PortfolioPage() {
  return <PortfolioClient />;
}
