"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContent } from "@/components/providers/ContentProvider";
import TechSpider from "@/components/ui/TechSpider";

export default function TechStack() {
  const { content } = useContent();
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  const techStackData = content?.techStack || {
    title: "TECH",
    subtitle: "STACK",
    icons: []
  };

  return (
    <section ref={ref} id="tech-stack" className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-[#0b0b0b]">
      {/* 1. Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Strong Soft Orange Radial Glow behind center - Calm & Elegant */}
        <motion.div 
          style={{ 
            opacity: glowOpacity,
            scale: glowScale
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] aspect-square bg-[#ff6a00]/20 rounded-full blur-[180px] pointer-events-none" 
        />
        
        {/* Very Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: "radial-gradient(circle, #ff6a00 0.5px, transparent 0.5px)",
            backgroundSize: "60px 60px" 
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-white/5 mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-[pulse_2s_infinite]" />
            <span className="text-accent/80 font-fira-code text-[9px] uppercase tracking-[0.3em]">Neural Ecosystem</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-[42px] font-unbounded font-black text-white leading-tight"
          >
            {content.techStack.title.split(' ').slice(0, -1).join(' ')} <span className="text-accent">{content.techStack.title.split(' ').slice(-1)}</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xs sm:max-w-md md:max-w-xl mx-auto text-text-muted font-fira-code text-[10px] md:text-sm mt-4 md:mt-6 leading-relaxed opacity-60"
          >
            {content.techStack.subtitle}
          </motion.p>
        </div>

        {/* The Neural Mesh Visualization */}
        <div className="w-full flex justify-center py-4 md:py-8 lg:py-12">
          <TechSpider 
            icons={techStackData.icons}
            title={techStackData.title}
            subtitle={techStackData.subtitle}
          />
        </div>
      </div>
    </section>
  );
}
