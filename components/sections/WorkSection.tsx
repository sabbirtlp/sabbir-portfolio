"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/components/providers/ContentProvider";
import Image from "next/image";

const gradients = [
  "from-amber-900/40 to-orange-900/60",
  "from-violet-900/40 to-indigo-900/60",
  "from-rose-900/40 to-pink-900/60",
  "from-slate-800/40 to-zinc-800/60",
  "from-emerald-900/40 to-teal-900/60",
];

interface CardProps {
  project: any;
  index: number;
  progress: any;
  range: [number, number];
  targetScale: number;
}

const ProjectCard = ({ project, index, progress, range, targetScale }: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  
  // Conditionally apply scaling and sticking only on desktop
  const scale = useTransform(progress, range, [1, targetScale]);
  



  return (
    <div
      ref={container}
      className="h-auto md:h-[100vh] flex items-center justify-center relative md:sticky md:top-0 px-4 md:px-8 py-8 md:py-0"
    >
      <motion.div
        style={{
          // On mobile, we avoid the scale-down stacking effect to keep it "normal"
          scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : scale,
          top: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : `calc(-5vh + ${index * 25}px)`,
        }}
        className="relative h-auto md:h-[600px] xl:h-[680px] w-full max-w-[1600px] bg-surface border border-border rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl will-change-transform"
      >
        {/* Left: Content */}
        <div className="w-full h-1/2 md:h-full md:w-[40%] xl:w-[35%] p-8 md:p-14 flex flex-col justify-between order-2 md:order-1 bg-surface z-10 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent font-syne font-black text-4xl opacity-20">0{index + 1}</span>
              <div className="h-px w-12 bg-border" />
              <span className="text-text-muted text-xs uppercase tracking-widest font-bold">
                {project.category}
              </span>
            </div>
            
            <h3 className="font-syne font-black text-2xl md:text-5xl text-white mb-4 leading-tight">
              {project.title}
            </h3>
            
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-md hidden sm:block">
              {project.description}
            </p>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {project.stats?.slice(0, 2).map((s: any) => (
                <div key={s.label}>
                  <div className="font-unbounded font-black text-xl text-accent">{s.value}</div>
                  <div className="text-text-muted text-[10px] uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href={`/work/${project.slug}`}
              className="group flex items-center gap-3 px-6 py-3 bg-accent hover:bg-accent-light text-white font-bold rounded-full transition-all duration-300 text-sm md:text-base glow-accent-sm shrink-0"
            >
              View Case Study
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right: Immersive Image / Mockup */}
        <div className="w-full h-[280px] sm:h-[400px] md:h-full md:w-[60%] xl:w-[65%] relative order-1 md:order-2 overflow-hidden flex flex-col bg-black/20">
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} mix-blend-multiply opacity-60 z-10`} />
            
            {/* Massive Browser Frame */}
            <div className="absolute inset-x-4 bottom-0 top-8 md:inset-x-12 md:bottom-[-20%] md:top-12 xl:inset-x-20 xl:bottom-[-25%] xl:top-16 z-20 rounded-t-2xl border border-white/10 bg-black/60 md:bg-black/40 md:backdrop-blur-sm overflow-hidden flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transform hover:-translate-y-4 transition-transform duration-500">
               <div className="w-full py-3 px-4 bg-[#1a1a1a] border-b border-white/5 flex items-center gap-2 shrink-0 shadow-lg z-30 relative">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                   <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                   <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                 </div>
                 <div className="flex-1 flex justify-center mr-8">
                   <div className="w-64 h-5 bg-white/5 rounded-md text-[10px] text-white/40 flex items-center justify-center font-mono tracking-wider opacity-0 sm:opacity-100">
                     {new URL(`https://${project.slug}.com`).hostname}
                   </div>
                 </div>
               </div>
               
                {/* Actual Project Image */}
                <div className="flex-1 w-full relative overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#0a0a0a]">
                  {project.image ? (
                    <div className="relative w-full min-h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-top object-contain"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority={index === 0}
                      />
                    </div>
                  ) : (
                    <div className="flex-1 w-full bg-surface-2 p-8 flex flex-col gap-6 h-full">
                      <div className="h-8 w-3/4 bg-white/10 rounded" />
                      <div className="grid grid-cols-2 gap-6 flex-1 mt-6">
                        <div className="bg-white/5 rounded-2xl border border-white/5" />
                        <div className="bg-white/5 rounded-2xl border border-white/5" />
                      </div>
                    </div>
                  )}
                </div>
            </div>
            
            {/* Static noise grain overlay for performance */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-30 bg-noise" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};


export default function WorkSection() {
  const container = useRef(null);
  const { content } = useContent();
  const projects = content?.projects || [];
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const projectsCount = projects.length;

  return (
    <section ref={container} id="work" className="relative bg-background">
      {/* Scroll Hint Sidebar */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-50 mix-blend-difference">
        <span className="text-[10px] uppercase tracking-widest text-white/40 rotate-180 [writing-mode:vertical-lr]">Scroll Work</span>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-8">
        <div className="mb-12">
          <div className="section-divider" />
          <p className="text-text-secondary text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-4">
            Selected Work
          </p>
          <h2 className="font-syne font-black text-2xl sm:text-display-md text-white leading-tight">
            Case Studies <span className="text-gradient">2020—2024</span>
          </h2>
        </div>
      </div>

      <div className="relative">
        {projects.map((project: any, i: number) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <ProjectCard
              key={project.slug}
              index={i}
              project={project}
              progress={scrollYProgress}
              range={[i * (1 / projectsCount), (i + 1) * (1 / projectsCount)]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* Buffer at the bottom — reduced on mobile */}
      <div className="h-[10vh] md:h-[20vh]" />
    </section>
  );
}

