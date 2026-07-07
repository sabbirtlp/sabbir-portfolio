"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/components/providers/ContentProvider";

const gradients = [
  "from-amber-900/60 to-orange-900/80",
  "from-violet-900/60 to-indigo-900/80",
  "from-rose-900/60 to-pink-900/80",
  "from-slate-800/60 to-zinc-800/80",
  "from-emerald-900/60 to-teal-900/80",
  "from-cyan-900/60 to-blue-900/80",
];

export default function PortfolioPage() {
  const { content } = useContent();
  const projects = content?.projects || [];
  const [activeFilter, setActiveFilter] = useState("All");

  // Dynamically extract unique filterCategory values from projects
  const categories = useMemo(() => {
    const cats = projects
      .map((p: any) => p.filterCategory)
      .filter((c: string | undefined) => !!c);
    return ["All", ...Array.from(new Set<string>(cats))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(
      (p: any) => p.filterCategory === activeFilter
    );
  }, [activeFilter, projects]);

  return (
    <section className="min-h-screen bg-background relative pt-32 md:pt-40 pb-24 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[160px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-orange-600/5 rounded-full blur-[120px] translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="section-divider" />
            <p className="text-text-secondary text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-4">
              Portfolio
            </p>
            <h1 className="font-syne font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary leading-[0.95] tracking-tight mb-6">
              My{" "}
              <span className="text-gradient">Creative</span>{" "}
              Work
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
              Explore my collection of projects across various industries. Filter
              by category to find exactly what you&apos;re looking for.
            </p>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <Filter className="w-4 h-4 text-accent" />
            <span className="text-text-muted text-[10px] uppercase tracking-widest font-bold">
              Filter by Industry
            </span>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-400 cursor-pointer border ${
                    isActive
                      ? "text-text-primary border-accent/60 bg-accent/15 shadow-[0_0_20px_rgba(234,88,12,0.15)]"
                      : "text-text-secondary border-border bg-surface hover:text-text-primary hover:border-text-primary/20 hover:bg-surface-2"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-filter-pill"
                      className="absolute inset-0 rounded-full bg-accent/10 border border-accent/30"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Active count */}
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-text-muted text-xs font-fira-code">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
            </span>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any, index: number) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface border border-border flex items-center justify-center">
              <Filter className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="font-syne font-bold text-xl text-text-primary mb-2">
              No projects found
            </h3>
            <p className="text-text-secondary text-sm max-w-md mx-auto">
              No projects match the selected filter. Try selecting a different
              category or view all projects.
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-6 px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-light transition-colors cursor-pointer"
            >
              View All Projects
            </button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="p-10 md:p-16 rounded-3xl bg-surface border border-border relative overflow-hidden card-gradient-border">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-syne font-black text-2xl md:text-4xl text-text-primary mb-4">
                Have a project in mind?
              </h2>
              <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto mb-8">
                Let&apos;s discuss how I can help bring your vision to life with a
                stunning, high-converting website.
              </p>
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-full transition-all duration-300 glow-accent-sm"
              >
                Start a Conversation
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Project Card ─────────────────────────────── */
function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block rounded-2xl overflow-hidden bg-surface border border-border hover:border-accent/30 transition-all duration-500 relative card-gradient-border"
    >
      {/* Image Container */}
      <div className="relative h-[260px] sm:h-[320px] lg:h-[360px] overflow-hidden">
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            gradients[index % gradients.length]
          } mix-blend-overlay opacity-50 dark:opacity-40 z-10 transition-opacity duration-500 group-hover:opacity-20`}
        />

        {/* Bottom fade to card body */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface via-surface/80 to-transparent z-20" />

        {/* Image */}
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${
                gradients[index % gradients.length]
              }`}
            />
          )}
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-30">
          <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold uppercase tracking-wider">
            {project.filterCategory || project.category}
          </span>
        </div>

        {/* Hover arrow indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-accent flex items-center justify-center glow-accent-sm"
        >
          <ArrowUpRight className="w-5 h-5 text-white" />
        </motion.div>

        {/* Year badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="text-text-primary/30 text-xs font-fira-code group-hover:opacity-0 transition-opacity duration-300">
            {project.year}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-syne font-bold text-xl md:text-2xl text-text-primary group-hover:text-accent transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags?.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-surface-2 border border-border text-text-muted text-[10px] font-fira-code uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <span className="text-text-muted text-xs uppercase tracking-widest font-bold">
            {project.category}
          </span>
          <span className="flex items-center gap-2 text-accent text-xs font-semibold group-hover:gap-3 transition-all duration-300">
            View Case Study
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
