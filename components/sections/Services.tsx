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
import Link from "next/link";
import { useContent } from "@/components/providers/ContentProvider";
import { NeonGradientCard } from "@/components/ui/NeonGradientCard";

const ICON_MAP: Record<string, any> = {
  Globe, Layout, ShoppingCart, Zap, Search, Palette, RefreshCw, BarChart3
};

export default function Services() {
  const { content } = useContent();
  
  if (!content?.services) return null;

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
          <h2 className="font-syne font-semibold text-display-md text-white leading-tight">
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
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="h-full"
              >
                <NeonGradientCard 
                  className="h-full" 
                  borderWidth={service.highlight ? 1.5 : 1}
                  borderRadius={24}
                >
                  <div className="group relative h-full p-8 transition-all duration-500 cursor-default flex flex-col items-start bg-surface-2/40 backdrop-blur-sm">
                    {/* Glow on hover */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.03] transition-all duration-500 pointer-events-none" />

                    {/* Highlight badge */}
                    {service.highlight && (
                      <span className="absolute top-6 right-6 px-2.5 py-0.5 rounded-full bg-accent/20 text-accent text-[9px] font-semibold uppercase tracking-widest border border-accent/20 z-20">
                        {service.highlight}
                      </span>
                    )}

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-surface border border-white/5 flex items-center justify-center mb-6 group-hover:border-accent/30 transition-all duration-400">
                      <Icon className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors duration-300" />
                    </div>

                    <Link href={`/services/${service.slug}`} className="z-20">
                      <h3 className="font-syne font-semibold text-white text-lg mb-3 group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                    </Link>
                    <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow font-medium opacity-80 group-hover:opacity-100 transition-opacity whitespace-pre-wrap">{service.description}</p>

                    {/* Arrow CTA */}
                    <Link 
                      href={`/services/${service.slug}`}
                      className="mt-auto flex items-center gap-2 text-accent text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 group/link"
                    >
                      <span>Explore Service</span>
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </NeonGradientCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
