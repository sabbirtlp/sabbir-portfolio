"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowRight, MousePointer2, Loader2 } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import CountUp from "@/components/ui/CountUp";

import { useContent } from "@/components/providers/ContentProvider";

export default function Hero() {
  const { content } = useContent();

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Particle canvas ... (unchanged logic)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const mouse = { x: -1000, y: -1000 };

    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
      originalAlpha: number;
    }[] = [];

    const colors = ["#ea580c", "#fb923c", "#ffffff", "#f97316"];

    for (let i = 0; i < 220; i++) {
      const alpha = Math.random() * 0.5 + 0.1;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 0.5,
        alpha: alpha,
        originalAlpha: alpha,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Premium Mouse Physics: Dual-Phasic swarming
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const mDist = Math.hypot(dx, dy);
        
        // Attraction zone (swarming)
        if (mDist < 350 && mDist > 100) {
          const force = (350 - mDist) / 3500;
          p.vx += dx * force * 0.5;
          p.vy += dy * force * 0.5;
          p.alpha = Math.min(p.originalAlpha + 0.4, 0.8);
        } else if (mDist <= 100) {
          // Repulsion zone (the bubble)
          const angle = Math.atan2(dy, dx);
          const force = (100 - mDist) / 100;
          p.vx -= Math.cos(angle) * force * 1.5;
          p.vy -= Math.sin(angle) * force * 1.5;
        } else {
          p.alpha = p.originalAlpha;
        }

        // Apply friction & fluid dynamics
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Base autonomous motion
        p.x += p.vx + (Math.random() - 0.5) * 0.1;
        p.y += p.vy + (Math.random() - 0.5) * 0.1;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw Particle with Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        
        // Performance-friendly glow
        if (mDist < 200) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();

        // High-End Connections (Neural Network)
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "#ea580c";
            // Connections also react to mouse proximity
            const linkAlpha = (1 - dist / 120) * 0.12;
            ctx.globalAlpha = mDist < 200 ? linkAlpha * 2 : linkAlpha;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0; // Reset for next frame
      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

  const handleScrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#030303]">
      {/* 0. Premium Parallax Background Image */}
      <motion.div 
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/hero-bg.png"
          alt="Premium Brand Background"
          fill
          priority
          className="object-cover object-center opacity-[0.12] mix-blend-screen"
        />
        {/* Subtle Ambient "Breathing" Animation Overlay */}
        <motion.div 
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-accent/[0.02]"
        />
      </motion.div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-1 pointer-events-none"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[100px] translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-500/[0.01] blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-1 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {badge}
        </motion.div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-6">
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2">
              <div className="overflow-hidden">
                <span className="word inline-block font-syne font-black text-display-xl text-white">
                  Crafting
                </span>
              </div>
              {headlineWords.map((word: string, i: number) => (
                <div key={i} className="overflow-hidden">
                  <span
                    className={`word inline-block font-syne font-black text-display-xl ${
                      word === "High-Converting" ? "text-gradient" : "text-white"
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
          className="text-text-secondary text-base md:text-xl max-w-2xl leading-relaxed mb-10 opacity-0"
        >
          {subheadline.split("Sabbir Hossain").map((part: string, i: number, arr: string[]) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-white font-semibold">Sabbir Hossain</span>}
            </span>
          ))}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-20 opacity-0">
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
              onClick={handleScrollToContact}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-border hover:border-accent text-white font-semibold rounded-full transition-all duration-300 text-sm md:text-base cursor-pointer"
            >
              Start a Project
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </button>
          </MagneticButton>
        </div>

        {/* Glassmorphic Stats Panel */}
        <div 
          ref={statsRef}
          className="relative mt-20 opacity-0 group"
        >
          {/* Panel Glass Layer */}
          <div className="absolute inset-0 z-0 bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Specular Shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
            {/* Grain / Noise for tactile surface */}
            <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          </div>

          {/* Glow Behind Panel to make glass pop */}
          <div className="absolute -top-12 left-1/4 w-64 h-32 bg-accent/20 rounded-full blur-[80px] -z-10" />

          {/* Stats Content */}
          <div className="relative z-10 grid grid-cols-2 md:flex md:flex-wrap gap-8 md:gap-16 p-8 md:p-10">
            {stats.map((stat: any) => (
              <div key={stat.label} className="relative group/stat">
                <div className="font-syne font-black text-3xl md:text-5xl text-white mb-1 transition-transform duration-300 group-hover/stat:scale-105 group-hover/stat:text-accent">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                </div>
                <p className="text-text-secondary text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold opacity-70 group-hover/stat:opacity-100 transition-opacity">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MousePointer2 className="w-4 h-4 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
