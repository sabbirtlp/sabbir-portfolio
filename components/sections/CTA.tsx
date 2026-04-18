"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Mail } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute inset-0 bg-[#030303]" />
        
        {/* Grid pattern matching Hero */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Dynamic Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative rounded-[40px] border border-white/5 bg-surface-2/40 backdrop-blur-xl p-10 md:p-20 overflow-hidden"
        >
          {/* Internal Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-semibold tracking-widest uppercase mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Direct Access to Specialist
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-syne font-black text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-8"
            >
              Ready to Scale Your <br className="hidden md:block" />
              <span className="text-gradient">Digital Presence?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-text-secondary text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-16"
            >
              Let&apos;s turn your vision into a high-performing website that attracts premium clients and
              grows your revenue. Currently booking for <span className="text-white font-semibold">Next Month</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20"
            >
              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <a
                  href="mailto:hello@sabbir.dev"
                  className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-accent hover:bg-accent-light text-white font-bold rounded-full transition-all duration-300 text-sm md:text-base glow-accent cursor-pointer"
                >
                  <Mail className="w-5 h-5" />
                  Sent a Message
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <a
                  href="https://calendly.com/sabbir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 border border-white/10 hover:border-accent bg-white/5 backdrop-blur-sm text-white font-bold rounded-full transition-all duration-300 text-sm md:text-base cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  Book Strategy Call
                </a>
              </MagneticButton>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/5"
            >
              {[
                { value: "< 24hrs", label: "Response Time" },
                { value: "100%", label: "Satisfaction Rate" },
                { value: "2 Weeks", label: "Avg. Turnaround" },
              ].map((item: any) => (
                <div key={item.label} className="group">
                  <div className="font-unbounded font-medium text-xl md:text-2xl text-white mb-2 group-hover:text-accent transition-colors duration-300">{item.value}</div>
                  <div className="text-text-secondary text-[10px] uppercase tracking-widest font-medium opacity-60">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
