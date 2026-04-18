"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [cardSize, setCardSize] = useState(80); // Pixel size of icon card

  // Responsive scaling adjustment
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 450) {
        setRadius(110);
        setCardSize(56); // w-14
      } else if (width < 640) {
        setRadius(130);
        setCardSize(64); // w-16
      } else if (width < 768) {
        setRadius(180);
        setCardSize(72); // w-18
      } else {
        setRadius(240);
        setCardSize(80); // w-20
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
      className={cn("relative w-full aspect-square max-w-[650px] flex items-center justify-center select-none", className)}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" 
          viewBox="0 0 600 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="luxury-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Silk-Thin Core Connections */}
          {iconPositions.map((pos, i) => {
            const active = isCoreHovered || hoveredId === pos.id;
            return (
              <motion.line
                key={`hub-${pos.id}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: active ? (isCoreHovered ? 0.8 : 0.6) : 0.05,
                  stroke: active ? "#ea580c" : "#ffffff" 
                }}
                transition={{ duration: 1.2, delay: i * 0.04 }}
                x1="300" y1="300" 
                x2={300 + pos.x} y2={300 + pos.y}
                strokeWidth={active ? "1" : "0.3"}
                className="transition-colors duration-700"
              />
            );
          })}

          {/* 2. Silk-Thin Neural Mesh */}
          {meshConnections.map((conn, i) => {
            const from = iconPositions[conn.from];
            const to = iconPositions[conn.to];
            const active = isConnectionActive(conn.from, conn.to);
            
            return (
              <motion.path
                key={`mesh-${i}`}
                d={`M ${300 + from.x} ${300 + from.y} L ${300 + to.x} ${300 + to.y} `}
                stroke={active ? "#ea580c" : "#ffffff"}
                strokeWidth={active ? "0.8" : "0.2"}
                strokeOpacity={active ? (isCoreHovered ? 0.6 : 0.4) : 0.03}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.02 }}
              />
            );
          })}
        </svg>

        {/* Central Core: Premium Orange Implementation */}
        <motion.div
          onMouseEnter={() => setIsCoreHovered(true)}
          onMouseLeave={() => setIsCoreHovered(false)}
          animate={{ 
            scale: isCoreHovered ? 1.05 : (hoveredId !== null ? 0.98 : 1),
            boxShadow: isCoreHovered 
              ? "0 0 60px rgba(234, 88, 12, 0.4), inset 0 0 20px rgba(234, 88, 12, 0.2)" 
              : "0 0 40px rgba(0,0,0,0.5)"
          }}
          className={cn(
            "relative z-20 flex flex-col items-center justify-center rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-700 overflow-hidden cursor-pointer",
            isCoreHovered 
              ? "bg-[#ea580c]/10 border-accent shadow-2xl" 
              : "bg-[#070707] border-white/10 border"
          )}
          style={{ 
            width: radius * 0.75, 
            height: radius * 0.75,
            padding: radius < 150 ? '1rem' : '2rem'
          }}
        >
          <div className={cn(
            "absolute inset-0 transition-opacity duration-700",
            isCoreHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#ea580c]/20 via-transparent to-transparent" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center leading-none">
            <span className="text-white font-unbounded font-black text-2xl sm:text-3xl md:text-5xl tracking-tighter uppercase opacity-90">
              TECH
            </span>
            <span className={cn(
              "font-unbounded font-medium text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.5em] sm:tracking-[0.7em] uppercase mt-1 sm:mt-2 transition-colors duration-700",
              isCoreHovered ? "text-white" : "text-accent"
            )}>
              STACK
            </span>
          </div>

          {/* Shimmer Effect */}
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12 pointer-events-none"
          />
        </motion.div>

        {/* Luxury Icon Pods */}
        {iconPositions.map((pos, i) => {
          const isHovered = hoveredId === pos.id;
          const neighborActive = isNeighbor(i);

          return (
            <motion.div
              key={pos.id}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ 
                scale: isHovered ? 1.1 : 1, 
                x: pos.x, 
                y: pos.y,
                zIndex: isHovered ? 50 : 10,
                transition: { type: "spring", damping: 20, stiffness: 120 }
              }}
              onMouseEnter={() => setHoveredId(pos.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="absolute cursor-pointer"
            >
              {/* "Dulbe Sundorvabe" - Animation */}
              <motion.div
                animate={{
                  y: isCoreHovered ? [0, -2, 0] : [0, -8, 0],
                  x: isCoreHovered ? [0, -1, 0, 1, 0] : [0, -5, 0, 5, 0],
                  rotate: isCoreHovered ? [-1, 1, -1] : [-3, 3, -3],
                }}
                transition={{ 
                  duration: 5 + (i % 3), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
                className={cn(
                  "relative group rounded-[1.5rem] sm:rounded-[2.2rem] bg-[#0d0d0d] border border-white/[0.03] flex items-center justify-center transition-all duration-700",
                  isHovered 
                    ? "border-accent/40 shadow-[0_0_25px_rgba(234,88,12,0.15)] bg-[#111111]" 
                    : (neighborActive || isCoreHovered)
                      ? "border-accent/10 bg-[#0f0f0f]"
                      : "hover:border-white/10"
                )}
                style={{ 
                  width: cardSize, 
                  height: cardSize 
                }}
              >
                <img 
                  src={pos.src} 
                  alt={pos.name} 
                  className={cn(
                    "object-contain transition-all duration-700",
                    (isHovered || isCoreHovered) ? "scale-105 saturate-100 opacity-100" : "grayscale saturate-0 opacity-40 group-hover:opacity-80"
                  )} 
                  style={{ 
                    width: cardSize * 0.6, 
                    height: cardSize * 0.6 
                  }}
                />

                {/* Minimal status tick */}
                {(isHovered || isCoreHovered) && (
                  <motion.div 
                    layoutId="status-tick"
                    className="absolute bottom-2 w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_#ea580c]" 
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
