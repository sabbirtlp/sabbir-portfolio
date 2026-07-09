import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import WorkSection from "@/components/sections/WorkSection";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import MarqueeSeparator from "@/components/sections/MarqueeSeparator";
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
      <MarqueeSeparator />
      <WorkSection />
      <About />
      <TechStack />
      <Services />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
