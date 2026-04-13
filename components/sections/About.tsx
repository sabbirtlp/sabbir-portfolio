"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { useContent } from "@/components/providers/ContentProvider";

export default function About() {
  const { content } = useContent();
  
  if (!content?.about) return null;

  const { name, role, experience, description, subDescription, achievements, techStack } = content.about;

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <section ref={ref} id="about" className="py-32 bg-surface relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              {/* Card / frame */}
              <div className="relative rounded-3xl overflow-hidden border border-border bg-surface-2 aspect-[3/4]">
                <Image
                  src="/sabbir.jpg"
                  alt={`${name} — Web Developer`}
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Grain overlay */}
                <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />
                {/* Bottom gradient */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Name badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-syne font-black text-xl text-white">{name}</p>
                  <p className="text-accent text-sm font-medium">{role}</p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-accent text-white rounded-2xl p-5 shadow-2xl"
              >
                <div className="font-syne font-black text-3xl leading-none">{experience}</div>
                <div className="text-xs text-white/80 mt-1">Years Exp.</div>
              </motion.div>

              {/* Decorative corner accent */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-accent/30 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <div className="section-divider" />
              <p className="text-text-secondary text-xs font-semibold uppercase tracking-widest mb-4">
                About Me
              </p>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-syne font-black text-display-md text-white leading-tight mb-6"
            >
              I Build Websites
              <span className="text-gradient block">That Actually Work</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-text-secondary text-base leading-relaxed mb-4">
              {description}
            </motion.p>

            <motion.p variants={itemVariants} className="text-text-secondary text-base leading-relaxed mb-8">
              {subDescription}
            </motion.p>

            {/* Achievements */}
            <motion.ul variants={containerVariants} className="space-y-3 mb-10">
              {achievements.map((item: string) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-start gap-3 text-text-secondary text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* Tech stack */}
            <motion.div variants={itemVariants}>
              <p className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-4">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full border border-border text-text-secondary text-xs hover:border-accent hover:text-accent transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
