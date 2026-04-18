"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { useContent } from "@/components/providers/ContentProvider";

export default function Testimonials() {
  const { content } = useContent();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!content?.testimonials) {
    return null;
  }

  const testimonials = content.testimonials;

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section ref={ref} className="py-32 bg-background relative overflow-hidden">
      {/* Marquee top — client logos placeholder */}
      <div className="mb-20 overflow-hidden">
        <div className="marquee-track whitespace-nowrap">
          {Array.from({ length: 2 }).map((_: any, gi: number) =>
            ["TechVenture", "Bloom Fashion", "Atlas Consulting", "Pulse Fitness", "Luxe Real Estate",
              "Nova SaaS", "CloudBase", "UrbanForm", "PrimeLayer", "ZenithCo"].map((brand: string) => (
              <span
                key={`${gi}-${brand}`}
                className="inline-block mx-12 font-syne font-black text-2xl text-border hover:text-text-secondary transition-colors duration-300 cursor-default"
              >
                {brand}
              </span>
            ))
          )}
        </div>
      </div>

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
            Client Love
          </p>
          <h2 className="font-syne font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Trusted by <span className="text-gradient">100+ Clients</span>
          </h2>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative p-10 md:p-14 rounded-3xl bg-surface border border-border"
            >
              {/* Quote icon */}
              <Quote className="absolute top-8 right-8 w-10 h-10 text-accent/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[active].rating }).map((_: any, i: number) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-8 italic">
                &ldquo;{testimonials[active].content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-syne font-black text-accent text-sm">
                    {testimonials[active].avatar}
                  </div>
                  <div>
                    <p className="font-syne font-bold text-white">{testimonials[active].name}</p>
                    <p className="text-text-secondary text-sm">{testimonials[active].role}</p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
                  {testimonials[active].result}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 justify-center mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border hover:border-accent text-text-secondary hover:text-accent flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === active
                      ? "w-8 h-2 bg-accent"
                      : "w-2 h-2 bg-border hover:bg-text-secondary"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border hover:border-accent text-text-secondary hover:text-accent flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
