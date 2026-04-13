"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Layout,
  ShoppingCart,
  Zap,
  Search,
  Palette,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import { useContent } from "@/components/providers/ContentProvider";

const ICON_MAP: Record<string, any> = {
  Globe, Layout, ShoppingCart, Zap, Search, Palette, RefreshCw, BarChart3
};

export default function Services() {
  const { content } = useContent();
  const services = content.services;

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="services" className="py-32 bg-background relative overflow-hidden">
      {/* Top gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-divider mx-auto" />
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-widest mb-4">
            What I Do
          </p>
          <h2 className="font-syne font-black text-display-md text-white leading-tight">
            Services That <span className="text-gradient">Drive Growth</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service: any, i: number) => {
            const Icon = ICON_MAP[service.icon] || Globe;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all duration-500 card-gradient-border cursor-default"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-accent/0 group-hover:bg-accent/5 transition-all duration-500 pointer-events-none" />

                {/* Highlight badge */}
                {service.highlight && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold border border-accent/20">
                    {service.highlight}
                  </span>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center mb-5 group-hover:bg-accent/10 group-hover:border-accent/40 transition-all duration-400">
                  <Icon className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors duration-300" />
                </div>

                <h3 className="font-syne font-bold text-white text-base mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>

                {/* Arrow */}
                <div className="mt-5 flex items-center gap-1.5 text-text-muted text-xs font-medium group-hover:text-accent transition-colors duration-300">
                  <span>Learn more</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
