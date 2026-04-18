"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TechSpider from "@/components/ui/TechSpider";

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="tech-stack" className="py-24 md:py-32 bg-surface relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center w-full"
        >
          <div className="section-divider mx-auto mb-6" />
          <p className="text-accent text-[10px] md:text-xs font-unbounded uppercase tracking-[0.2em] mb-4">
            My Ecosystem
          </p>
          <h2 className="font-syne font-semibold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6 max-w-2xl text-center">
            A Modern Stack For <br className="hidden sm:block" />
            <span className="text-gradient">Performance & Growth</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-xl text-center leading-relaxed">
            Leveraging a hand-picked collection of industry-leading tools to build digital experiences that are fast, secure, and architected for conversions.
          </p>
        </motion.div>

        {/* The Spider Visualization in its full unconstrained glory */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full flex justify-center py-10"
        >
          <TechSpider />
        </motion.div>

      </div>
    </section>
  );
}
