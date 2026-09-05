"use client";

import { motion } from "framer-motion";

export default function GeminiAnimatedBg({
  className = "",
}: {
  className?: string;
}) {
  // Blobs start from edges and drift through the center, then back out
  const blobs = [
    {
      colors: "#f97316, #ef4444, #ec4899",
      size: "w-[180px] h-[180px] md:w-[280px] md:h-[280px]",
      animate: {
        left: ["-5%", "35%", "55%", "20%", "-5%"],
        top: ["-5%", "25%", "50%", "40%", "-5%"],
        scale: [0.8, 1.15, 0.9, 1.1, 0.8],
      },
      duration: 16,
      blur: 60,
    },
    {
      colors: "#7c3aed, #6366f1, #a855f7",
      size: "w-[200px] h-[200px] md:w-[300px] md:h-[300px]",
      animate: {
        right: ["-6%", "30%", "50%", "15%", "-6%"],
        top: ["-4%", "30%", "45%", "60%", "-4%"],
        scale: [1, 0.85, 1.2, 0.9, 1],
      },
      duration: 18,
      blur: 65,
    },
    {
      colors: "#2563eb, #0891b2, #06b6d4",
      size: "w-[170px] h-[170px] md:w-[260px] md:h-[260px]",
      animate: {
        left: ["-4%", "40%", "60%", "25%", "-4%"],
        bottom: ["-5%", "20%", "40%", "55%", "-5%"],
        scale: [0.9, 1.2, 0.85, 1.1, 0.9],
      },
      duration: 20,
      blur: 55,
    },
    {
      colors: "#ec4899, #f43f5e, #fb7185",
      size: "w-[150px] h-[150px] md:w-[240px] md:h-[240px]",
      animate: {
        right: ["-5%", "35%", "55%", "40%", "-5%"],
        bottom: ["-6%", "25%", "50%", "35%", "-6%"],
        scale: [1.1, 0.85, 1.15, 0.9, 1.1],
      },
      duration: 14,
      blur: 55,
    },
    {
      colors: "#fbbf24, #f97316, #ef4444",
      size: "w-[140px] h-[140px] md:w-[220px] md:h-[220px]",
      animate: {
        left: ["45%", "20%", "55%", "35%", "45%"],
        top: ["-6%", "35%", "55%", "20%", "-6%"],
        scale: [0.85, 1.25, 0.9, 1.15, 0.85],
      },
      duration: 15,
      blur: 60,
    },
    {
      colors: "#06b6d4, #10b981, #34d399",
      size: "w-[130px] h-[130px] md:w-[200px] md:h-[200px]",
      animate: {
        left: ["-4%", "50%", "40%", "60%", "-4%"],
        top: ["50%", "30%", "55%", "20%", "50%"],
        scale: [1, 1.2, 0.85, 1.1, 1],
      },
      duration: 17,
      blur: 50,
    },
    {
      colors: "#a855f7, #d946ef, #7c3aed",
      size: "w-[120px] h-[120px] md:w-[190px] md:h-[190px]",
      animate: {
        right: ["-3%", "40%", "55%", "30%", "-3%"],
        top: ["40%", "50%", "25%", "55%", "40%"],
        scale: [0.9, 1.2, 0.8, 1.15, 0.9],
      },
      duration: 13,
      blur: 55,
    },
  ];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* ── Animated Blobs ── */}
      <div className="absolute inset-0 transform-gpu will-change-transform">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            animate={blob.animate}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute ${blob.size} rounded-full transform-gpu`}
            style={{
              background: `radial-gradient(circle at 50% 50%, ${blob.colors})`,
              filter: `blur(${blob.blur}px)`,
              opacity: 0.55,
            }}
          />
        ))}
      </div>

      {/* ── Dark theme overlay — slightly tinted ── */}
      <div className="absolute inset-0 bg-[#030303]/35 hidden dark:block pointer-events-none" />
      {/* ── Light theme overlay — soft wash ── */}
      <div className="absolute inset-0 bg-white/45 dark:hidden pointer-events-none" />

      {/* ── Edge fades ── */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-background via-background/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </div>
  );
}
