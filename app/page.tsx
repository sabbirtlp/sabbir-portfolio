import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import HomeSections from "@/components/sections/HomeSections";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "WordPress & WooCommerce Developer | Sabbir Hossain",
  description:
    "Sabbir Hossain builds fast, conversion-focused WordPress and WooCommerce websites for service businesses and e-commerce brands.",
  path: "/",
  keywords: [
    "WordPress developer",
    "WooCommerce developer",
    "conversion focused web design",
    "technical SEO expert",
    "website speed optimization",
    "AI website development",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeSections />
    </>
  );
}
