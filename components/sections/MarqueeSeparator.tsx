"use client";

import { motion, useReducedMotion } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const ROW_1 = [
  { num: "01", label: "WordPress Development" },
  { num: "02", label: "WooCommerce Stores" },
  { num: "03", label: "Elementor Pro" },
  { num: "04", label: "Webflow Design" },
  { num: "05", label: "Wix Studio" },
  { num: "06", label: "AI-Powered Websites" },
];

const ROW_2 = [
  { num: "07", label: "Speed Optimization" },
  { num: "08", label: "Technical SEO" },
  { num: "09", label: "Next.js Development" },
  { num: "10", label: "Lead Generation" },
  { num: "11", label: "Custom Plugins" },
  { num: "12", label: "CRO Strategy" },
];

// ─── Single Item ─────────────────────────────────────────────────────────────

function Item({ num, label }: { num: string; label: string }) {
  return (
    <div className="group/item flex items-center gap-3 px-6 cursor-default select-none flex-shrink-0">
      {/* Accent number */}
      <span className="font-fira-code text-[9px] leading-none text-accent/40 group-hover/item:text-accent transition-colors duration-500 tabular-nums">
        {num}
      </span>

      {/* Label */}
      <span className="font-unbounded text-[11px] md:text-[12px] font-medium tracking-[0.18em] uppercase text-white/20 group-hover/item:text-white/75 transition-colors duration-500 whitespace-nowrap">
        {label}
      </span>

      {/* Diamond separator */}
      <motion.span
        className="block w-[5px] h-[5px] rotate-45 bg-accent/15 flex-shrink-0"
        whileHover={{ scale: 1.6, backgroundColor: "rgba(234,88,12,0.6)" }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

// ─── Infinite Track ───────────────────────────────────────────────────────────
// Renders items × 4 and animates x from 0 → -50% (left) or -50% → 0 (right).
// Because content is duplicated ×4, the -50% mark is exactly where 0 was,
// creating a perfectly seamless loop.

function InfiniteTrack({
  items,
  direction = "left",
  duration = 42,
}: {
  items: { num: string; label: string }[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const shouldReduce = useReducedMotion();
  // Quadruple the items so the track always overflows the viewport
  const loopItems = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex w-max will-change-transform"
        animate={
          shouldReduce
            ? {}
            : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {loopItems.map((item, i) => (
          <Item key={`${item.num}-${i}`} {...item} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MarqueeSeparator() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
      className="relative w-full overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top hairline gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[80px] bg-accent/[0.035] blur-[50px] rounded-full" />
      </div>

      {/* Left edge fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-36 z-10 bg-gradient-to-r from-background to-transparent" />
      {/* Right edge fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-36 z-10 bg-gradient-to-l from-background to-transparent" />

      {/* ── ROW 1: scrolls → LEFT ── */}
      <div className="py-[13px] border-b border-white/[0.045]">
        <InfiniteTrack items={ROW_1} direction="left" duration={44} />
      </div>

      {/* ── Center divider label ── */}
      <div className="relative flex items-center justify-center py-[6px]">
        {/* Hairline through */}
        <div className="absolute inset-x-0 h-px top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/[0.12] to-transparent" />
        {/* Label chip */}
        <span className="relative z-10 px-5 py-[3px] bg-background border border-white/[0.06] rounded-full font-fira-code text-[8px] tracking-[0.3em] uppercase text-accent/35">
          Full-Stack CMS &amp; AI Specialist
        </span>
      </div>

      {/* ── ROW 2: scrolls → RIGHT ── */}
      <div className="py-[13px] border-t border-white/[0.045]">
        <InfiniteTrack items={ROW_2} direction="right" duration={38} />
      </div>

      {/* Bottom hairline gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </motion.section>
  );
}
