"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ArrowRight, MousePointer2, Loader2, Code2, Globe, Layout, Zap, Search, Terminal, Github, Linkedin, Instagram, ArrowDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import CountUp from "@/components/ui/CountUp";
import { Orbit, OrbitContainer } from "@/components/ui/Orbit";
import { Marquee } from "@/components/ui/Marquee";
import { CodeCard } from "@/components/ui/CodeCard";

import { useContent } from "@/components/providers/ContentProvider";

export default function Hero() {
  const { content } = useContent();
  const router = useRouter();

  if (!content?.hero) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  const { stats, headlineWords, subheadline, badge } = content.hero;

  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Throttling: only run animation when in view
  const isInView = useInView(containerRef, { margin: "200px" });

  // Parallax Logic
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  
  // GSAP text entrance
  useEffect(() => {
    const wordEls = headlineRef.current?.querySelectorAll(".word");
    if (!wordEls) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      wordEls,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
      }
    )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
  }, []);

  const handleScrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    router.push("/contact");
  };

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
      {/* ── Dark Mode Only: Parallax Background Image ── */}
      <motion.div 
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform hidden dark:block"
      >
        <Image
          src="/hero-bg.png"
          alt="Premium Brand Background"
          fill
          priority
          className="object-cover object-center opacity-[0.12] mix-blend-screen"
        />
        <motion.div 
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-accent/[0.01]"
        />
      </motion.div>

      {/* ── Dark Mode Only: Gradient overlays ── */}
      <div className="absolute inset-0 z-1 pointer-events-none hidden dark:block">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-[80px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[80px] translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-500/[0.01] blur-[120px]" />
      </div>

      {/* ── Dark Mode Only: Grid pattern ── */}
      <div
        className="absolute inset-0 z-1 hidden dark:block opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--text-muted) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Light Mode Only: Clean minimal background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none dark:hidden">
        {/* Extremely subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d4d4d8 0.5px, transparent 0.5px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Soft top-right accent glow */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-orange-500/[0.04] blur-[100px]" />
        {/* Soft bottom-left cool glow */}
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-zinc-300/20 blur-[100px]" />
      </div>

      {/* ── Dark Mode Only: Orbits ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden dark:block opacity-40">
        <OrbitContainer className="h-full">
          <Orbit radius={200} duration={30} delay={0} size={32}>
            <div className="p-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-accent" />
            </div>
          </Orbit>
          <Orbit radius={350} duration={45} delay={-5} direction="counter-clockwise" size={40}>
            <div className="p-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
              <Layout className="w-5 h-5 text-accent" />
            </div>
          </Orbit>
          <Orbit radius={500} duration={60} delay={-10} size={48}>
            <div className="p-3 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
              <Code2 className="w-6 h-6 text-accent" />
            </div>
          </Orbit>
          <Orbit radius={650} duration={75} delay={-15} direction="counter-clockwise" size={32}>
            <div className="p-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-accent" />
            </div>
          </Orbit>
        </OrbitContainer>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-28 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-[10px] font-fira-code tracking-widest uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {badge}
            </motion.div>

            {/* headline */}
            <div ref={headlineRef} className="mb-6">
              <div className="overflow-hidden">
                <div className="flex flex-wrap justify-start gap-x-4 md:gap-x-6 gap-y-2">
                  <div className="overflow-hidden">
                    <span className="word inline-block font-syne font-semibold text-2xl text-text-primary">
                      Crafting
                    </span>
                  </div>
                  {headlineWords.map((word: string, i: number) => (
                    <div key={i} className="overflow-hidden">
                      <span
                        className={`word inline-block font-syne font-semibold text-2xl ${
                          word === "High-Converting" ? "text-gradient" : "text-text-primary"
                        }`}
                      >
                        {word}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Subheadline */}
            <p
              ref={subRef}
              className="text-text-secondary text-base md:text-lg max-w-xl leading-relaxed mb-10 opacity-0 text-left"
            >
              {subheadline.split("Sabbir Hossain").map((part: string, i: number, arr: string[]) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-text-primary font-semibold">Sabbir Hossain</span>}
                </span>
              ))}
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row justify-start gap-4 mb-16 opacity-0 w-full">
              <MagneticButton strength={0.3} className="w-full sm:w-auto">
                <button
                  onClick={handleScrollToWork}
                  className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-full transition-all duration-300 text-sm md:text-base glow-accent cursor-pointer"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.3} className="w-full sm:w-auto">
                <button
                  onClick={handleContactClick}
                  className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-border hover:border-accent text-text-primary font-semibold rounded-full transition-all duration-300 text-sm md:text-base cursor-pointer"
                >
                  Start a Project
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </button>
              </MagneticButton>
            </div>

            {/* Compact Stats Grid */}
            <div 
              ref={statsRef}
              className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-12 opacity-0 w-full"
            >
              {stats.map((stat: any) => (
                <div key={stat.label} className="group/stat flex flex-col items-start sm:items-start">
                  <div className="font-unbounded font-medium text-lg sm:text-xl md:text-2xl text-text-primary mb-1 md:mb-2 transition-transform duration-300 group-hover/stat:text-accent leading-none">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                  </div>
                  <p className="text-text-secondary text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wider sm:tracking-[0.2em] font-medium opacity-60 max-w-[80px] sm:max-w-full leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Code Card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <CodeCard />
          </div>
        </div>
      </div>

      {/* ── Premium Bottom Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full z-10 px-4 md:px-12 py-3 md:py-5 flex items-center justify-between border-t border-zinc-200/60 dark:border-text-primary/[0.04] bg-background/50 backdrop-blur-md"
      >
        {/* Left: Social Links */}
        <div className="flex items-center gap-2 md:gap-4">
          {[
            { href: "https://github.com/sabbirtlp", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/dev-sabbir-hossain/", icon: Linkedin, label: "LinkedIn" },
            { href: "https://www.instagram.com/abutalha8479/", icon: Instagram, label: "Instagram" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border border-text-primary/10 bg-text-primary/[0.03] hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
            >
              <Icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-text-primary/40 group-hover:text-accent transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* Center: Scroll → Services Button */}
        <button
          onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
          className="group/scroll flex flex-col items-center gap-1 cursor-pointer outline-none absolute left-1/2 -translate-x-1/2"
          aria-label="Scroll to Services"
        >
          <span className="text-[8px] md:text-[9px] font-fira-code tracking-[0.2em] md:tracking-[0.25em] uppercase text-text-primary/25 group-hover/scroll:text-accent/60 transition-colors duration-300">
            Services
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-5 md:w-7 md:h-7 rounded-full border border-text-primary/10 group-hover/scroll:border-accent/50 group-hover/scroll:bg-accent/10 group-hover/scroll:shadow-[0_0_18px_rgba(234,88,12,0.25)] flex items-center justify-center transition-all duration-300"
          >
            <ArrowDown className="w-2.5 h-2.5 md:w-3 md:h-3 text-accent" />
          </motion.div>
        </button>

        {/* Right: Availability Badge */}
        <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-accent/20 bg-accent/5 ml-auto z-10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
          <span className="text-[8px] md:text-[9px] font-fira-code tracking-wider md:tracking-widest text-accent/80 uppercase hidden sm:block">Available for Work</span>
          <span className="text-[8px] md:text-[9px] font-fira-code tracking-wider text-accent/80 uppercase sm:hidden">Open</span>
        </div>
      </motion.div>
    </section>
  );
}
