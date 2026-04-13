"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
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
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className="relative h-[80vh] w-full max-w-6xl bg-surface border border-border rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* Left: Content */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-between order-2 md:order-1 bg-surface z-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent font-syne font-black text-4xl opacity-20">0{index + 1}</span>
              <div className="h-px w-12 bg-border" />
              <span className="text-text-muted text-xs uppercase tracking-widest font-bold">
                {project.category}
              </span>
            </div>
            
            <h3 className="font-syne font-black text-3xl md:text-5xl text-white mb-6 leading-tight">
              {project.title}
            </h3>
            
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-md">
              {project.description}
            </p>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {project.stats.slice(0, 2).map((s: any) => (
                <div key={s.label}>
                  <div className="font-syne font-black text-2xl text-accent">{s.value}</div>
                  <div className="text-text-muted text-xs uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href={`/work/${project.slug}`}
              className="group flex items-center gap-3 px-6 py-3 bg-accent hover:bg-accent-light text-white font-bold rounded-full transition-all duration-300 text-sm md:text-base glow-accent-sm"
            >
              View Case Study
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right: Immersive Image / Mockup */}
        <div className="flex-1 relative overflow-hidden order-1 md:order-2">
          <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} mix-blend-multiply opacity-60 z-10`} />
            
            {/* Visual Placeholder for Mockup */}
            <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
               <div className="w-full h-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center relative shadow-2xl shadow-black/50">
                  <div className="w-full p-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/40" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                      <div className="w-2 h-2 rounded-full bg-green-500/40" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="w-32 h-3 bg-white/10 rounded-full" />
                    </div>
                  </div>
                  {/* Dynamic Content representation */}
                  <div className="flex-1 w-full bg-surface-2 p-6 flex flex-col gap-4">
                     <div className="h-6 w-3/4 bg-white/10 rounded" />
                     <div className="grid grid-cols-2 gap-4 flex-1 mt-4">
                        <div className="bg-white/5 rounded-xl border border-white/5" />
                        <div className="bg-white/5 rounded-xl border border-white/5" />
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Noise grain overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-30"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function WorkSection() {
  const container = useRef(null);
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
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <div className="mb-12">
          <div className="section-divider" />
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-widest mb-4">
            Selected Work
          </p>
          <h2 className="font-syne font-black text-display-md text-white leading-tight">
            Case Studies <span className="text-gradient">2020—2024</span>
          </h2>
        </div>
      </div>

      <div className="relative">
        {projects.map((project, i) => {
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

      {/* Buffer at the bottom to ensure the last card stays in view briefly */}
      <div className="h-[20vh]" />
    </section>
  );
}
