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
        {/* Large soft orange radial glow — key atmospheric element */}
        <motion.div
          style={{ opacity: glowOpacity, scale: glowScale }}
          className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[min(90vw,900px)] aspect-square
                     bg-[#ff6a00] rounded-full blur-[200px]"
        />

        {/* Secondary softer glow for depth */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[min(70vw,600px)] aspect-square
                     bg-[#ff6a00]/30 rounded-full blur-[140px] opacity-30"
        />

        {/* Ambient orange particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-[#ff6a00] rounded-full blur-[2px]"
            style={{ left: p.left, top: p.top, opacity: p.opacity }}
            animate={{ y: [-p.dy / 2, p.dy / 2] }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

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
