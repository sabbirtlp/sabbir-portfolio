"use client";

import { motion } from "framer-motion";

interface GeminiAnimatedBgProps {
  className?: string;
  intensity?: "subtle" | "medium" | "vibrant";
}

export default function GeminiAnimatedBg({
  className = "",
  intensity = "medium",
}: GeminiAnimatedBgProps) {
  // Opacity settings based on intensity
  const opacityMap = {
    subtle: {
      orb1: "opacity-25 dark:opacity-20",
      orb2: "opacity-20 dark:opacity-15",
      orb3: "opacity-25 dark:opacity-20",
      orb4: "opacity-20 dark:opacity-15",
      orb5: "opacity-15 dark:opacity-10",
    },
    medium: {
      orb1: "opacity-40 dark:opacity-35",
      orb2: "opacity-35 dark:opacity-28",
      orb3: "opacity-40 dark:opacity-32",
      orb4: "opacity-35 dark:opacity-25",
      orb5: "opacity-30 dark:opacity-20",
    },
    vibrant: {
      orb1: "opacity-60 dark:opacity-50",
      orb2: "opacity-55 dark:opacity-45",
      orb3: "opacity-60 dark:opacity-50",
      orb4: "opacity-50 dark:opacity-40",
      orb5: "opacity-45 dark:opacity-35",
    },
  };

  const op = opacityMap[intensity];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none transform-gpu ${className}`}
      aria-hidden="true"
    >
      {/* ── Deep Base Vignette & Dark Tint ── */}
      <div className="absolute inset-0 bg-background/60 dark:bg-[#030303]/80 backdrop-blur-[1px] z-10 pointer-events-none" />

      {/* ── Fluid Gemini Aurora Container ── */}
      <div className="absolute inset-0 filter blur-[120px] md:blur-[150px] transform-gpu will-change-transform">
        
        {/* Orb 1: Warm Sunset Orange / Amber Core (Gemini Glow) */}
        <motion.div
          animate={{
            x: ["-20%", "25%", "-10%", "-20%"],
            y: ["-15%", "20%", "-5%", "-15%"],
            scale: [1, 1.25, 0.95, 1],
            rotate: [0, 90, 180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute top-[10%] left-[20%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-rose-600 ${op.orb1} mix-blend-screen transform-gpu`}
        />

        {/* Orb 2: Electric Violet / Deep Purple (Cosmic Gemini Wave) */}
        <motion.div
          animate={{
            x: ["25%", "-20%", "15%", "25%"],
            y: ["20%", "-15%", "25%", "20%"],
            scale: [1.1, 0.9, 1.2, 1.1],
            rotate: [0, -120, -240, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute top-[35%] right-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 ${op.orb2} mix-blend-screen transform-gpu`}
        />

        {/* Orb 3: Luminous Sapphire Blue / Cyan (AI Intelligence Accent) */}
        <motion.div
          animate={{
            x: ["-15%", "15%", "-25%", "-15%"],
            y: ["30%", "-20%", "10%", "30%"],
            scale: [0.95, 1.2, 1, 0.95],
            rotate: [0, 140, 280, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute bottom-[10%] left-[30%] w-[520px] h-[520px] rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 ${op.orb3} mix-blend-screen transform-gpu`}
        />

        {/* Orb 4: Radiant Crimson Rose / Magenta (Vibrant Blend) */}
        <motion.div
          animate={{
            x: ["10%", "-30%", "20%", "10%"],
            y: ["-25%", "15%", "-10%", "-25%"],
            scale: [1.15, 0.85, 1.1, 1.15],
            rotate: [0, -90, -180, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute top-[5%] right-[30%] w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-rose-500 via-pink-600 to-amber-600 ${op.orb4} mix-blend-screen transform-gpu`}
        />

        {/* Orb 5: Golden Solar Flare Center (Pulsing Hub) */}
        <motion.div
          animate={{
            scale: [0.9, 1.3, 0.9],
            opacity: [0.25, 0.45, 0.25],
            x: ["-10%", "10%", "-10%"],
            y: ["-10%", "10%", "-10%"],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 ${op.orb5} mix-blend-screen transform-gpu`}
        />
      </div>

      {/* ── Subtle Geometric Dot Matrix Overlay ── */}
      <div
        className="absolute inset-0 z-20 opacity-[0.03] dark:opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--text-muted) 0.75px, transparent 0.75px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Top & Bottom Atmospheric Edge Fades ── */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background via-background/40 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-20 pointer-events-none" />
    </div>
  );
}
