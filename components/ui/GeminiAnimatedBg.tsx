"use client";

import { useEffect, useState } from "react";

export default function GeminiAnimatedBg({
  className = "",
}: {
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay appearance so page content loads first, then blobs fade in
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none transition-opacity duration-[1500ms] ease-out ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-hidden="true"
    >
      {/* ── CSS-animated blobs (GPU composited) ── */}
      <div className="absolute inset-0">
        {/* Blob 1 — Orange/Rose — top-left origin */}
        <div
          className="blob blob-1 absolute rounded-full w-[160px] h-[160px] md:w-[260px] md:h-[260px]"
          style={{
            top: "5%",
            left: "10%",
            background: "radial-gradient(circle, #f97316, #ef4444, #ec4899)",
            filter: "blur(60px)",
          }}
        />

        {/* Blob 2 — Violet/Indigo — top-right origin */}
        <div
          className="blob blob-2 absolute rounded-full w-[180px] h-[180px] md:w-[280px] md:h-[280px]"
          style={{
            top: "8%",
            right: "8%",
            background: "radial-gradient(circle, #7c3aed, #6366f1, #a855f7)",
            filter: "blur(65px)",
          }}
        />

        {/* Blob 3 — Blue/Cyan — bottom-left origin */}
        <div
          className="blob blob-3 absolute rounded-full w-[150px] h-[150px] md:w-[240px] md:h-[240px]"
          style={{
            bottom: "10%",
            left: "15%",
            background: "radial-gradient(circle, #2563eb, #0891b2, #06b6d4)",
            filter: "blur(55px)",
          }}
        />

        {/* Blob 4 — Pink/Rose — right edge */}
        <div
          className="blob blob-4 absolute rounded-full w-[130px] h-[130px] md:w-[220px] md:h-[220px]"
          style={{
            top: "35%",
            right: "5%",
            background: "radial-gradient(circle, #ec4899, #f43f5e, #fb7185)",
            filter: "blur(55px)",
          }}
        />

        {/* Blob 5 — Amber/Gold — center pulse */}
        <div
          className="blob blob-5 absolute rounded-full w-[120px] h-[120px] md:w-[200px] md:h-[200px]"
          style={{
            top: "40%",
            left: "40%",
            background: "radial-gradient(circle, #fbbf24, #f97316, #ef4444)",
            filter: "blur(60px)",
          }}
        />

        {/* Blob 6 — Teal — bottom-right (hidden on mobile for perf) */}
        <div
          className="blob blob-6 absolute rounded-full hidden md:block w-[200px] h-[200px]"
          style={{
            bottom: "15%",
            right: "12%",
            background: "radial-gradient(circle, #06b6d4, #10b981, #34d399)",
            filter: "blur(50px)",
          }}
        />

        {/* Blob 7 — Purple — left edge (hidden on mobile for perf) */}
        <div
          className="blob blob-7 absolute rounded-full hidden md:block w-[180px] h-[180px]"
          style={{
            top: "55%",
            left: "5%",
            background: "radial-gradient(circle, #a855f7, #d946ef, #7c3aed)",
            filter: "blur(55px)",
          }}
        />
      </div>

      {/* ── Dark theme overlay ── */}
      <div className="absolute inset-0 bg-[#030303]/35 hidden dark:block pointer-events-none" />
      {/* ── Light theme overlay ── */}
      <div className="absolute inset-0 bg-white/45 dark:hidden pointer-events-none" />

      {/* ── Edge fades ── */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-background via-background/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

      {/* ── Keyframe animations — all use transform (GPU composited) ── */}
      <style jsx>{`
        .blob {
          will-change: transform;
          opacity: 0.55;
        }

        .blob-1 {
          animation: drift1 16s ease-in-out infinite;
        }
        .blob-2 {
          animation: drift2 18s ease-in-out infinite;
        }
        .blob-3 {
          animation: drift3 20s ease-in-out infinite;
        }
        .blob-4 {
          animation: drift4 14s ease-in-out infinite;
        }
        .blob-5 {
          animation: drift5 15s ease-in-out infinite;
        }
        .blob-6 {
          animation: drift6 17s ease-in-out infinite;
        }
        .blob-7 {
          animation: drift7 13s ease-in-out infinite;
        }

        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(0.8); }
          25%      { transform: translate(30vw, 20vh) scale(1.15); }
          50%      { transform: translate(15vw, 35vh) scale(0.9); }
          75%      { transform: translate(40vw, 10vh) scale(1.1); }
        }

        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25%      { transform: translate(-25vw, 25vh) scale(0.85); }
          50%      { transform: translate(-35vw, 40vh) scale(1.2); }
          75%      { transform: translate(-15vw, 15vh) scale(0.9); }
        }

        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0) scale(0.9); }
          25%      { transform: translate(25vw, -25vh) scale(1.2); }
          50%      { transform: translate(35vw, -15vh) scale(0.85); }
          75%      { transform: translate(10vw, -30vh) scale(1.1); }
        }

        @keyframes drift4 {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          25%      { transform: translate(-30vw, 15vh) scale(0.85); }
          50%      { transform: translate(-20vw, -20vh) scale(1.15); }
          75%      { transform: translate(-40vw, 5vh) scale(0.9); }
        }

        @keyframes drift5 {
          0%, 100% { transform: translate(0, 0) scale(0.85); }
          25%      { transform: translate(10vw, -15vh) scale(1.25); }
          50%      { transform: translate(-10vw, 10vh) scale(0.9); }
          75%      { transform: translate(15vw, 15vh) scale(1.15); }
        }

        @keyframes drift6 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25%      { transform: translate(-20vw, -20vh) scale(1.2); }
          50%      { transform: translate(-30vw, -10vh) scale(0.85); }
          75%      { transform: translate(-10vw, -25vh) scale(1.1); }
        }

        @keyframes drift7 {
          0%, 100% { transform: translate(0, 0) scale(0.9); }
          25%      { transform: translate(25vw, -15vh) scale(1.2); }
          50%      { transform: translate(30vw, 10vh) scale(0.8); }
          75%      { transform: translate(15vw, -20vh) scale(1.15); }
        }

        @media (prefers-reduced-motion: reduce) {
          .blob { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
