"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechIcon {
  id: number;
  name: string;
  src: string;
}

interface TechSpiderProps {
  icons: TechIcon[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function TechSpider({
  icons = [],
  title = "TECH STACK",
  subtitle = "Dynamic Ecosystem",
  className,
}: TechSpiderProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isCoreHovered, setIsCoreHovered] = useState(false);
  const [radius, setRadius] = useState(240);
  const [cardSize, setCardSize] = useState(80);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. Scroll-Based Rotation with Inertia/Spring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const rawScrollRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scrollRotation = useSpring(rawScrollRotation, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Responsive scaling adjustment
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 450) {
        setRadius(110);
        setCardSize(56);
      } else if (width < 640) {
        setRadius(140);
        setCardSize(64);
      } else if (width < 1024) {
        setRadius(190);
        setCardSize(72);
      } else {
        setRadius(240);
        setCardSize(84);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate icon positions and connections
  const { iconPositions, meshConnections } = useMemo(() => {
    if (!icons || icons.length === 0) return { iconPositions: [], meshConnections: [] };

    const positions = icons.map((icon, index) => {
      const angle = (index / icons.length) * 2 * Math.PI - Math.PI / 2;
      return {
        ...icon,
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        angle,
      };
    });

    const connections: { from: number; to: number }[] = [];
    icons.forEach((_, i) => {
      const next = (i + 1) % icons.length;
      connections.push({ from: i, to: next });
      if (icons.length > 5) {
        const skip = (i + 2) % icons.length;
        connections.push({ from: i, to: skip });
      }
    });

    return { iconPositions: positions, meshConnections: connections };
  }, [icons, radius]);

  const isConnectionActive = (idxA: number, idxB: number) => {
    if (isCoreHovered) return true;
    if (hoveredId === null) return false;
    const hoveredIdx = icons.findIndex(icon => icon.id === hoveredId);
    return idxA === hoveredIdx || idxB === hoveredIdx;
  };

  const isNeighbor = (idx: number) => {
    if (hoveredId === null) return false;
    const hoveredIdx = icons.findIndex(icon => icon.id === hoveredId);
    return meshConnections.some(conn => 
      (conn.from === hoveredIdx && conn.to === idx) || 
      (conn.to === hoveredIdx && conn.from === idx)
    );
  };

  if (!icons || icons.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 border border-white/5 rounded-3xl opacity-20">
         <p className="text-text-muted font-fira-code text-[10px] uppercase tracking-widest">Awaiting System Data...</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full aspect-square max-w-[700px] flex items-center justify-center select-none", className)}
    >
      {/* 2. Global Rotation Layers (Idle + Scroll) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        style={{ rotate: scrollRotation }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" 
          viewBox="0 0 600 600"
        >
          {/* Neural Mesh Render */}
          {iconPositions.map((pos, i) => {
             const active = isCoreHovered || hoveredId === pos.id;
             return (
               <motion.line
                 key={`hub-${pos.id}`}
                 animate={{ 
                   opacity: active ? 0.6 : 0.05,
                   stroke: active ? "#ff6a00" : "#ffffff" 
                 }}
                 x1="300" y1="300" 
                 x2={300 + pos.x} y2={300 + pos.y}
                 strokeWidth="0.5"
               />
             );
          })}
          
          {meshConnections.map((conn, i) => {
            const from = iconPositions[conn.from];
            const to = iconPositions[conn.to];
            const active = isConnectionActive(conn.from, conn.to);
            return (
              <motion.path
                key={`mesh-${i}`}
                d={`M ${300 + from.x} ${300 + from.y} L ${300 + to.x} ${300 + to.y}`}
                stroke={active ? "#ff6a00" : "#ffffff"}
                strokeWidth="0.5"
                strokeOpacity={active ? 0.4 : 0.03}
                fill="none"
              />
            );
          })}
        </svg>

        {/* Central Core: Premium Square Glass Node */}
        <motion.div
          onMouseEnter={() => setIsCoreHovered(true)}
          onMouseLeave={() => setIsCoreHovered(false)}
          animate={{ scale: isCoreHovered ? 1.05 : 1 }}
          className={cn(
            "relative z-20 flex flex-col items-center justify-center rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-700 bg-black/40 backdrop-blur-xl border border-white/10",
            isCoreHovered && "border-accent/50 shadow-[0_0_50px_rgba(255,106,0,0.2)]"
          )}
          style={{ width: radius * 0.75, height: radius * 0.75 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#ff6a00_0%,_transparent_100%)]" />
          
          <div className="relative z-10 flex flex-col items-center leading-none">
            <span className="text-white font-unbounded font-black text-2xl sm:text-3xl md:text-5xl tracking-tighter uppercase">
              TECH
            </span>
            <span className="font-unbounded font-medium text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.5em] text-accent uppercase mt-2">
              STACK
            </span>
          </div>

          {/* Core Inner Glow */}
          <div className="absolute inset-4 rounded-[1.5rem] border border-[#ff6a00]/10" />
        </motion.div>

        {/* Luxury Icon Pods */}
        {iconPositions.map((pos, i) => {
          const isHovered = hoveredId === pos.id;
          const neighborActive = isNeighbor(i);

          return (
            <motion.div
              key={pos.id}
              animate={{ x: pos.x, y: pos.y, scale: isHovered ? 1.15 : 1 }}
              onMouseEnter={() => setHoveredId(pos.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="absolute z-10"
            >
              {/* Individual "Dulbe" and Breathing Scale */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  x: [0, 4, 0],
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{ 
                  duration: 6 + (i % 4), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
                className={cn(
                  "relative group rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center transition-all duration-700 cursor-pointer",
                  "bg-black/20 backdrop-blur-md border border-white/5",
                  isHovered || isCoreHovered ? "border-accent/40 bg-black/40 shadow-[0_0_30px_rgba(255,106,0,0.15)]" : "hover:border-white/20"
                )}
                style={{ width: cardSize, height: cardSize }}
              >
                 {/* Real Brand Icon */}
                <img 
                  src={pos.src} 
                  alt={pos.name} 
                  className={cn(
                    "object-contain transition-all duration-700",
                    isHovered || isCoreHovered ? "saturate-100 opacity-100 scale-110 drop-shadow-[0_0_15px_rgba(255,106,0,0.4)]" : "saturate-[0.8] opacity-60"
                  )} 
                  style={{ width: cardSize * 0.55, height: cardSize * 0.55 }}
                />

                {/* Minimal High-End Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -cardSize - 10, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute whitespace-nowrap px-4 py-2 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 text-white font-fira-code text-[10px] uppercase tracking-widest shadow-2xl pointer-events-none z-[100]"
                    >
                      {pos.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black/80" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
