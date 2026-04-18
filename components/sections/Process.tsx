"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useContent } from "@/components/providers/ContentProvider";

export default function Process() {
  const { content } = useContent();

  if (!content?.process) return null;

  const steps = content.process.steps;

  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 70%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="process" className="py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header ... (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <div className="section-divider mx-auto" />
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-widest mb-4">
            How I Work
          </p>
          <h2 className="font-syne font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            My Proven <span className="text-gradient">Process</span>
          </h2>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative mb-12 flex items-center">
            <div className="absolute left-[10%] right-[10%] h-px bg-border top-1/2 -translate-y-1/2" />
            <div
              ref={lineRef}
              className="absolute left-[10%] right-[10%] h-px bg-gradient-to-r from-accent to-orange-400 top-1/2 -translate-y-1/2 origin-left"
            />
            {steps.map((_: any, i: number) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-accent border-4 border-background"
                style={{ left: `calc(10% + ${i * 20}% - 8px)` }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: "backOut" }}
              />
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step: any, i: number) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className={`group relative p-6 rounded-2xl bg-gradient-to-b ${step.color} border border-border hover:border-accent/40 transition-all duration-400`}
              >
                <div
                  className="font-unbounded font-black text-3xl leading-none mb-5 opacity-20 group-hover:opacity-50 transition-opacity duration-300"
                  style={{ color: step.accent }}
                >
                  {step.number}
                </div>
                <h3 className="font-syne font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical */}
        <div className="md:hidden space-y-6">
          {steps.map((step: any, i: number) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-5 items-start"
            >
              <div
                className="font-unbounded font-black text-2xl leading-none flex-shrink-0 opacity-30"
                style={{ color: step.accent }}
              >
                {step.number}
              </div>
              <div className="pt-2">
                <h3 className="font-syne font-bold text-white text-lg mb-1">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
