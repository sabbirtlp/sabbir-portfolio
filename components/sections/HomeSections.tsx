"use client";

import dynamic from "next/dynamic";

const WorkSection = dynamic(() => import("@/components/sections/WorkSection"), {
  loading: () => <div className="h-40" />,
});
const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <div className="h-40" />,
});
const TechStack = dynamic(() => import("@/components/sections/TechStack"), {
  loading: () => <div className="h-40" />,
});
const Services = dynamic(() => import("@/components/sections/Services"), {
  loading: () => <div className="h-40" />,
});
const Process = dynamic(() => import("@/components/sections/Process"), {
  loading: () => <div className="h-40" />,
});
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
  {
    loading: () => <div className="h-40" />,
  },
);
const CTA = dynamic(() => import("@/components/sections/CTA"), {
  loading: () => <div className="h-40" />,
});
const MarqueeSeparator = dynamic(
  () => import("@/components/sections/MarqueeSeparator"),
  {
    loading: () => <div className="h-20" />,
  },
);

export default function HomeSections() {
  return (
    <>
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
