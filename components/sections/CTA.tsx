"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Mail } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="py-32 bg-surface relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(234,88,12,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Limited Spots Available
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-syne font-black text-display-lg text-white leading-tight mb-6"
        >
          Ready to Build
          <span className="text-gradient block">Something Amazing?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Let&apos;s turn your vision into a high-performing website that attracts premium clients and
          grows your revenue. I currently take on{" "}
          <span className="text-white font-semibold">2 new projects per month</span> — spots fill fast.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <MagneticButton strength={0.4}>
            <a
              href="mailto:hello@sabbir.dev"
              className="group flex items-center gap-3 px-10 py-5 bg-accent hover:bg-accent-light text-white font-bold rounded-full transition-all duration-300 text-base glow-accent cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              Start a Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
            </a>
          </MagneticButton>

          <MagneticButton strength={0.4}>
            <a
              href="https://calendly.com/sabbir"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-10 py-5 border border-border hover:border-accent bg-transparent text-white font-bold rounded-full transition-all duration-300 text-base cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Call
            </a>
          </MagneticButton>
        </motion.div>

        {/* Social proof row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { value: "< 24hrs", label: "Response Time" },
            { value: "100%", label: "Satisfaction Rate" },
            { value: "2 weeks", label: "Avg. Turnaround" },
          ].map((item: any) => (
            <div key={item.label}>
              <div className="font-syne font-black text-2xl text-white">{item.value}</div>
              <div className="text-text-secondary text-xs mt-1">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
