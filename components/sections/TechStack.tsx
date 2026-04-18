"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useContent } from "@/components/providers/ContentProvider";
import TechSpider from "@/components/ui/TechSpider";

export default function TechStack() {
  const { content } = useContent();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techStackData = content?.techStack || {
    title: "TECH",
    subtitle: "STACK",
    icons: []
  };

  return (
    <section ref={ref} id="tech-stack" className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-[#0a0a0a]">
      {/* Deep Cinematic Background matching reference image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Extremely Subtle Grid */}
        <div 
          className="absolute inset-0 opacity-[0.01]" 
          style={{ 
            backgroundImage: "linear-gradient(#3b82f6 0.5px, transparent 0.5px), linear-gradient(90deg, #3b82f6 0.5px, transparent 0.5px)",
            backgroundSize: "80px 80px" 
          }} 
        />
        
        {/* Atmospheric Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-20" />
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
        <div className="w-full flex justify-center py-4 md:py-8">
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
