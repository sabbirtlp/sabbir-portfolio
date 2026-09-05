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
  Bot,
  Code2,
  Wand2,
  Layers,
  Store,
  Gauge,
  Server,
  ShieldCheck,
  Shield,
  Briefcase,
  UserCheck,
  ShoppingBag,
  HeartPulse,
  Terminal,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useContent } from "@/components/providers/ContentProvider";
import PremiumGlowCard from "@/components/ui/PremiumGlowCard";

const ICON_MAP: Record<string, any> = {
  Globe,
  Layout,
  ShoppingCart,
  Zap,
  Search,
  Palette,
  RefreshCw,
  BarChart3,
  Bot,
  Code2,
  Wand2,
  Layers,
  Store,
  Gauge,
  Server,
  ShieldCheck,
  Shield,
  Briefcase,
  UserCheck,
  ShoppingBag,
  HeartPulse,
  Terminal,
};

export default function Services() {
  const { content } = useContent();

  if (!content?.services || content.services.length === 0) return null;

  // Showcase top 6 featured services on homepage
  const featuredServices = content.services.slice(0, 6);
  const totalServices = content.services.length;

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
          <h2 className="font-syne font-semibold text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight mb-4">
            Services That <span className="text-gradient">Drive Growth</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto">
            Engineered for speed, high conversion rates, and business ROI — from bespoke WordPress development to speed optimization and technical SEO.
          </p>
        </motion.div>

        {/* Cards Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {featuredServices.map((service: any, i: number) => {
            const Icon = ICON_MAP[service.icon] || Globe;
            return (
              <motion.div
                key={service.slug || service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="h-full"
              >
                <PremiumGlowCard>
                  {/* Highlight badge */}
                  {service.highlight && (
                    <span className="absolute top-6 right-6 px-2.5 py-0.5 rounded-full bg-accent/20 text-accent text-[9px] font-semibold uppercase tracking-widest border border-accent/20">
                      {service.highlight}
                    </span>
                  )}

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-surface border border-text-primary/10 flex items-center justify-center mb-6 group-hover:border-accent/50 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.2)]">
                    <Icon className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <Link href={`/services/${service.slug}`} className="z-20 w-full outline-none">
                    <h3 className="font-syne font-semibold text-text-primary text-xl mb-3 group-hover:text-accent transition-colors duration-300 drop-shadow-md">
                      {service.title}
                    </h3>
                  </Link>
                  <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow font-medium opacity-80 group-hover:opacity-100 transition-opacity whitespace-pre-wrap group-hover:text-text-primary/90">
                    {service.description}
                  </p>

                  {/* Arrow CTA */}
                  <Link 
                    href={`/services/${service.slug}`}
                    className="mt-auto flex items-center gap-2 text-accent/90 group-hover:text-accent group-hover:brightness-110 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group/link z-20 outline-none"
                  >
                    <span className="relative">
                      Explore Service
                      <span className="absolute left-0 -bottom-1 w-0 h-px bg-accent transition-all duration-300 group-hover/link:w-full glow-accent-sm" />
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </PremiumGlowCard>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center"
        >
          <Link
            href="/services"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-surface border border-accent/30 text-text-primary hover:text-white hover:border-accent hover:bg-accent transition-all duration-300 shadow-[0_0_25px_rgba(234,88,12,0.15)] hover:shadow-[0_0_35px_rgba(234,88,12,0.35)]"
          >
            <span className="font-syne font-bold text-sm tracking-wide">
              Explore All Services & Solutions ({totalServices} Available)
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
