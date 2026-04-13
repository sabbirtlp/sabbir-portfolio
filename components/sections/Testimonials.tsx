"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, TechVenture Co.",
    content:
      "Sabbir completely transformed our online presence. Our lead generation increased by 280% within 3 months of launch. The attention to detail and understanding of conversion psychology is unmatched.",
    rating: 5,
    avatar: "SM",
    result: "+280% leads",
  },
  {
    name: "David Chen",
    role: "Founder, Bloom Fashion",
    content:
      "We were skeptical about investing in a website redesign, but Sabbir delivered beyond our expectations. Our e-commerce revenue jumped 220% and the site loads in under 1.2 seconds now.",
    rating: 5,
    avatar: "DC",
    result: "+220% revenue",
  },
  {
    name: "Jessica Park",
    role: "Marketing Director, Atlas Consulting",
    content:
      "Sabbir doesn't just build websites, he builds business assets. Our new site has positioned us perfectly in front of enterprise clients and we've closed 3 Fortune 500 contracts through it.",
    rating: 5,
    avatar: "JP",
    result: "3 F500 clients",
  },
  {
    name: "Marcus Rodriguez",
    role: "CEO, Pulse Fitness",
    content:
      "Launched our app landing page in 7 days and captured 40,000 email signups. The CRO strategy Sabbir implemented was the key to our successful funding round. Absolute pro.",
    rating: 5,
    avatar: "MR",
    result: "40K signups",
  },
  {
    name: "Emma Thompson",
    role: "Owner, Luxe Real Estate",
    content:
      "We went from a 0.8% to 4.1% conversion rate with our new site. Sabbir's understanding of how high-end buyers think and browse changed everything for our business.",
    rating: 5,
    avatar: "ET",
    result: "0.8% → 4.1% CVR",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section ref={ref} className="py-32 bg-background relative overflow-hidden">
      {/* Marquee top — client logos placeholder */}
      <div className="mb-20 overflow-hidden">
        <div className="marquee-track whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, gi) =>
            ["TechVenture", "Bloom Fashion", "Atlas Consulting", "Pulse Fitness", "Luxe Real Estate",
              "Nova SaaS", "CloudBase", "UrbanForm", "PrimeLayer", "ZenithCo"].map((brand) => (
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
          <h2 className="font-syne font-black text-display-md text-white leading-tight">
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
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
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
              {testimonials.map((_, i) => (
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
