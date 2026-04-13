"use client";

import Hero from "@/components/sections/Hero";
import WorkSection from "@/components/sections/WorkSection";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
