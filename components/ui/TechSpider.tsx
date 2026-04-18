"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechIcon {
  id: number;
  name: string;
  src: string;
}

interface TechSpiderProps {
  icons: TechIcon[];
  className?: string;
}

export default function TechSpider({ icons = [], className }: TechSpiderProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isCoreHovered, setIsCoreHovered] = useState(false);
  const [radius, setRadius] = useState(240);
  const [cardSize, setCardSize] = useState(80);

  // Responsive scaling
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 400)       { setRadius(95);  setCardSize(52); }
      else if (w < 640)  { setRadius(128); setCardSize(62); }
      else if (w < 1024) { setRadius(180); setCardSize(72); }
      else               { setRadius(240); setCardSize(84); }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Icon positions in a circle — no rotation transform wrapper
  const iconPositions = useMemo(() => {
    if (!icons.length) return [];
    return icons.map((icon, i) => {
      const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
      return { ...icon, x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    });
  }, [icons, radius]);

  // Mesh connections
  const meshConnections = useMemo(() => {
    const conns: { from: number; to: number }[] = [];
    icons.forEach((_, i) => {
      conns.push({ from: i, to: (i + 1) % icons.length });
      if (icons.length > 5) conns.push({ from: i, to: (i + 2) % icons.length });
    });
    return conns;
  }, [icons]);

  const isNeighbor = (idx: number) => {
    if (hoveredId === null) return false;
    const hi = icons.findIndex(ic => ic.id === hoveredId);
    return meshConnections.some(c => (c.from === hi && c.to === idx) || (c.to === hi && c.from === idx));
  };

  if (!icons.length) return null;

  return (
    <div
      className={cn(
        "relative w-full aspect-square max-w-[680px] flex items-center justify-center select-none",
        className
      )}
    >
      {/* ── SVG: Mesh lines (static, behind everything) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 600 600"
      >
        {/* Hub spokes */}
        {iconPositions.map((pos) => {
          const active = isCoreHovered || hoveredId === pos.id;
          return (
            <motion.line
              key={`spoke-${pos.id}`}
              x1="300" y1="300"
              x2={300 + pos.x} y2={300 + pos.y}
              stroke={active ? "#ff6a00" : "#ffffff"}
              strokeWidth="0.4"
              animate={{ opacity: active ? 0.35 : 0.04 }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
        {/* Mesh ring */}
        {meshConnections.map((conn, i) => {
          const from = iconPositions[conn.from];
          const to   = iconPositions[conn.to];
          const active =
            isCoreHovered ||
            hoveredId === from?.id ||
            hoveredId === to?.id;
          return (
            <motion.line
              key={`mesh-${i}`}
              x1={300 + from?.x} y1={300 + from?.y}
              x2={300 + to?.x}   y2={300 + to?.y}
              stroke={active ? "#ff6a00" : "#ffffff"}
              strokeWidth="0.3"
              animate={{ opacity: active ? 0.25 : 0.02 }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
      </svg>

      {/* ── Icon pods: float in place, NEVER rotate ── */}
      {iconPositions.map((pos, i) => {
        const isHovered     = hoveredId === pos.id;
        const neighborGlow  = isNeighbor(i);

        // Unique organic float params per icon
        const dur   = 5 + (i % 5) * 0.8;
        const delay = i * 0.35;
        const yAmp  = 6 + (i % 3) * 2;
        const xAmp  = 3 + (i % 4) * 1.5;

        return (
          <div
            key={pos.id}
            className="absolute"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          >
            {/* Floating wrapper — translate only, no rotation */}
            <motion.div
              animate={{
                y:     [0, -yAmp, 0, yAmp * 0.4, 0],
                x:     [0, xAmp, 0, -xAmp * 0.6, 0],
                scale: [1, 1.04, 1, 1.02, 1],
              }}
              transition={{
                duration: dur,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Card */}
              <motion.div
                onMouseEnter={() => setHoveredId(pos.id)}
                onMouseLeave={() => setHoveredId(null)}
                animate={{
                  scale:     isHovered ? 1.15 : 1,
                  boxShadow: isHovered
                    ? "0 0 24px rgba(255,106,0,0.35)"
                    : (neighborGlow || isCoreHovered)
                    ? "0 0 12px rgba(255,106,0,0.15)"
                    : "0 0 0px rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                  "relative flex items-center justify-center cursor-pointer",
                  "rounded-[1.4rem] sm:rounded-[1.8rem]",
                  "border transition-colors duration-500",
                  isHovered
                    ? "bg-[#161616] border-[#ff6a00]/40"
                    : (neighborGlow || isCoreHovered)
                    ? "bg-[#111]/60 border-[#ff6a00]/15"
                    : "bg-[#0f0f0f]/70 border-white/5"
                )}
                style={{ width: cardSize, height: cardSize }}
              >
                <img
                  src={pos.src}
                  alt={pos.name}
                  className={cn(
                    "object-contain transition-all duration-500",
                    isHovered || isCoreHovered
                      ? "saturate-100 opacity-100"
                      : "saturate-80 opacity-55"
                  )}
                  style={{ width: cardSize * 0.52, height: cardSize * 0.52 }}
                />

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: -(cardSize + 12), scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute whitespace-nowrap px-3 py-1.5 rounded-lg pointer-events-none z-50
                                 bg-black/85 backdrop-blur-md border border-white/10
                                 text-white font-mono text-[9px] uppercase tracking-[0.18em]"
                    >
                      {pos.name}
                      {/* Arrow */}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-black/85" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        );
      })}

      {/* ── Center Card: completely static, no movement at all ── */}
      <div
        className="relative z-20 flex items-center justify-center"
        style={{ width: radius * 0.72, height: radius * 0.72 }}
      >
        {/* Soft inner glow ring */}
        <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] bg-[#ff6a00]/10 blur-xl" />

        <motion.div
          onMouseEnter={() => setIsCoreHovered(true)}
          onMouseLeave={() => setIsCoreHovered(false)}
          animate={{
            boxShadow: isCoreHovered
              ? "0 0 40px rgba(255,106,0,0.2), inset 0 0 30px rgba(255,106,0,0.1)"
              : "0 0 20px rgba(255,106,0,0.08), inset 0 0 20px rgba(255,106,0,0.05)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-full h-full flex flex-col items-center justify-center
                     rounded-[2rem] sm:rounded-[2.5rem] cursor-default
                     bg-black/40 backdrop-blur-2xl
                     border border-white/10 overflow-hidden"
        >
          {/* Subtle inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff6a00]/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/4 to-transparent pointer-events-none" />

          {/* Text */}
          <div className="relative z-10 flex flex-col items-center leading-none">
            <span className="text-white font-unbounded font-black text-xl sm:text-3xl md:text-5xl tracking-tighter">
              TECH
            </span>
            <span className="font-unbounded font-semibold text-[7px] sm:text-[9px] md:text-[10px] tracking-[0.5em] text-[#ff6a00] uppercase mt-1">
              STACK
            </span>
          </div>

          {/* Inner accent border */}
          <div className="absolute inset-5 rounded-[1.5rem] border border-[#ff6a00]/10 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
