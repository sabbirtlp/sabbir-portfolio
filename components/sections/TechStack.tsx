"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContent } from "@/components/providers/ContentProvider";
import TechSpider from "@/components/ui/TechSpider";

// Stable particle data computed once (avoid random re-computation on re-renders)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top:  `${(i * 53 + 7) % 100}%`,
  dur:  18 + (i % 7) * 3,
  dy:   30 + (i % 5) * 15,
  delay: i * 0.4,
  opacity: 0.08 + (i % 4) * 0.06,
}));

export default function TechStack() {
  const { content } = useContent();
  const ref = useRef<HTMLElement>(null);

  // Scroll-reactive glow (section level only — no rotation)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.18, 0.45, 0.18]);
  const glowScale   = useTransform(scrollYProgress, [0, 0.45, 1], [0.85, 1.15, 0.85]);

  const techStackData = content?.techStack || { title: "My Technology Stack", subtitle: "", icons: [] };

  const titleWords = techStackData.title.split(" ");
  const lastWord   = titleWords.slice(-1)[0];
  const preWords   = titleWords.slice(0, -1).join(" ");

  return (
    <section
      ref={ref}
      id="tech-stack"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-[#0b0b0b]"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* Very subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: "radial-gradient(circle, #ff6a00 0.5px, transparent 0.5px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-5 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-4 md:mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                       bg-[#ff6a00]/8 border border-[#ff6a00]/15 mb-5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] animate-pulse" />
            <span className="text-[#ff6a00]/80 font-mono text-[9px] uppercase tracking-[0.3em]">
              Neural Ecosystem
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-[42px] font-unbounded font-black text-white leading-tight"
          >
            {preWords}{" "}
            <span className="text-[#ff6a00]">{lastWord}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xs sm:max-w-md md:max-w-xl mx-auto
                       text-white/40 font-mono text-[10px] md:text-[13px]
                       mt-4 md:mt-5 leading-relaxed"
          >
            {techStackData.subtitle}
          </motion.p>
        </div>

        {/* Visualization */}
        <div className="w-full flex justify-center py-2 md:py-6 lg:py-10">
          <TechSpider icons={techStackData.icons} />
        </div>
      </div>
    </section>
  );
}
