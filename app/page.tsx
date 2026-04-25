"use client";

import Hero from "@/components/sections/Hero";
import WorkSection from "@/components/sections/WorkSection";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import MarqueeSeparator from "@/components/sections/MarqueeSeparator";

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
