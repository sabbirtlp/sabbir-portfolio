"use client";

import React, { useMemo, useCallback, useEffect, useRef, useState } from "react";
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

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; life: number; maxLife: number;
}

const SVG_SIZE = 440;
const SVG_CENTER = SVG_SIZE / 2;
const RADIUS = 165;
const ORANGE = "#ff6a00";

export default function TechSpider({ icons = [], className }: TechSpiderProps) {
  const [activeId, setActiveId]     = useState<number>(icons[0]?.id ?? 0);
  const [hoveredId, setHoveredId]   = useState<number | null>(null);
  const [isCoreHovered, setIsCoreHovered] = useState(false);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef     = useRef<number>(0);
  const isPausedRef  = useRef<boolean>(false);  // pause auto-cycle on hover

  const numIcons = icons.length;

  const getPos = useCallback(
    (index: number) => {
      const angle = (-90 + index * (360 / numIcons)) * (Math.PI / 180);
      return {
        tx: RADIUS * Math.cos(angle),
        ty: RADIUS * Math.sin(angle),
        svgX: SVG_CENTER + RADIUS * Math.cos(angle),
        svgY: SVG_CENTER + RADIUS * Math.sin(angle),
      };
    },
    [numIcons]
  );

  // ── Canvas particle loop ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, SVG_SIZE, SVG_SIZE);
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0) return false;
        const alpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 106, 0, ${alpha * 0.8})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = ORANGE;
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });
      frameRef.current = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // ── Sequential activation + particle burst ────────────────────────
  useEffect(() => {
    if (!icons.length) return;
    setActiveId(icons[0].id);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;   // paused while user is hovering
      setActiveId((prevId) => {
        const ci = icons.findIndex((ic) => ic.id === prevId);
        const ni = (ci + 1) % icons.length;
        const { tx, ty } = getPos(ni);

        // Burst 24 particles from next icon
        for (let i = 0; i < 24; i++) {
          const speed = Math.random() * 2.2 + 0.4;
          const dir = Math.random() * Math.PI * 2;
          const life = Math.random() * 55 + 25;
          particlesRef.current.push({
            x: SVG_CENTER + tx,
            y: SVG_CENTER + ty,
            vx: Math.cos(dir) * speed,
            vy: Math.sin(dir) * speed,
            size: Math.random() * 2 + 0.5,
            life,
            maxLife: life,
          });
        }
        return icons[ni].id;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [icons, getPos]);

  // ── Continuous bubbling from center when core is hovered ──────────
  useEffect(() => {
    if (!isCoreHovered) return;
    const bubbleInterval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        const speed = Math.random() * 2 + 0.8;
        const dir   = Math.random() * Math.PI * 2;
        const life  = Math.random() * 50 + 20;
        particlesRef.current.push({
          x: SVG_CENTER,
          y: SVG_CENTER,
          vx: Math.cos(dir) * speed,
          vy: Math.sin(dir) * speed,
          size: Math.random() * 3 + 0.5,
          life,
          maxLife: life,
        });
      }
    }, 60); // fast continuous bubbling

    return () => clearInterval(bubbleInterval);
  }, [isCoreHovered]);

  if (!icons.length) return null;

  return (
    <div
      className={cn(
        "relative select-none flex-shrink-0",
        "scale-[0.68] sm:scale-[0.80] md:scale-90 lg:scale-100",
        className
      )}
      style={{ width: SVG_SIZE, height: SVG_SIZE }}
    >
      <style>{`
        @keyframes ts-float {
          0%,100% { transform: translateY(0px) scale(1);    }
          50%      { transform: translateY(-8px) scale(1.02); }
        }
        @keyframes ts-core-glow {
          0%,100% { box-shadow: 0 0 24px rgba(255,106,0,0.45), 0 0 60px rgba(255,106,0,0.15); }
          50%      { box-shadow: 0 0 40px rgba(255,106,0,0.65), 0 0 90px rgba(255,106,0,0.25); }
        }
        .ts-float  { animation: ts-float    6s ease-in-out infinite; }
        .ts-core   { animation: ts-core-glow 3s ease-in-out infinite; }
      `}</style>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        width={SVG_SIZE}
        height={SVG_SIZE}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* SVG full-mesh lines */}
      <svg
        width={SVG_SIZE}
        height={SVG_SIZE}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <defs>
          <filter id="ts-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor={ORANGE} floodOpacity="1" result="clr" />
            <feComposite in="clr" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g>
          {icons.map((a, i) =>
            icons.map((b, j) => {
              if (i >= j) return null;
              const p1 = getPos(i);
              const p2 = getPos(j);
              const displayActiveId = hoveredId ?? activeId;
              const isNodeHovered = hoveredId !== null && (hoveredId === a.id || hoveredId === b.id);
              const isActive = displayActiveId === a.id || displayActiveId === b.id;
              
              return (
                <line
                  key={`ln-${i}-${j}`}
                  x1={p1.svgX} y1={p1.svgY}
                  x2={p2.svgX} y2={p2.svgY}
                  strokeWidth={isNodeHovered ? "2.2" : isCoreHovered ? "1.0" : isActive ? "1.6" : "0.5"}
                  style={{
                    stroke:   (isActive || isCoreHovered) ? ORANGE : "#ffffff",
                    opacity:  isNodeHovered ? 1 : isCoreHovered ? 0.45 : isActive ? 0.85 : 0.13,
                    filter:   (isActive || isCoreHovered) ? "url(#ts-glow)" : "none",
                    transition: "stroke 0.5s ease-in-out, opacity 0.5s ease-in-out, stroke-width 0.5s ease-in-out, filter 0.5s ease-in-out",
                  }}
                />
              );
            })
          )}
        </g>
      </svg>

      {/* All icons + center, anchored to SVG center point */}
      <div className="absolute" style={{ top: SVG_CENTER, left: SVG_CENTER }}>

        {/* ── Center "TECH STACK" core ── */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          onMouseEnter={() => { setIsCoreHovered(true); isPausedRef.current = true; }}
          onMouseLeave={() => { setIsCoreHovered(false); isPausedRef.current = false; }}
        >
          <div
            className="ts-core relative w-28 h-28 rounded-[2rem] flex flex-col items-center
                       justify-center overflow-hidden border border-[#ff6a00]/40"
            style={{ backgroundColor: ORANGE }}
          >
            {/* Top highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            {/* Text */}
            <span className="relative z-10 text-white font-unbounded font-black text-[1.6rem] leading-none tracking-tighter">
              TECH
            </span>
            <span className="relative z-10 text-white/75 font-unbounded font-semibold text-[8px] tracking-[0.55em] uppercase mt-1">
              STACK
            </span>
          </div>
        </div>

        {/* ── Outer icon pods ── */}
        {icons.map((icon, i) => {
          const { tx, ty } = getPos(i);
          const isHovered    = hoveredId === icon.id;
          const isAutoActive = activeId === icon.id && !hoveredId;
          const isActive     = isHovered || isAutoActive;

          const handleMouseEnter = () => {
            isPausedRef.current = true;
            setHoveredId(icon.id);
            // Burst particles on hover entry
            const { tx: ptx, ty: pty } = getPos(i);
            for (let k = 0; k < 30; k++) {
              const speed = Math.random() * 2.8 + 0.5;
              const dir   = Math.random() * Math.PI * 2;
              const life  = Math.random() * 50 + 30;
              particlesRef.current.push({
                x: SVG_CENTER + ptx, y: SVG_CENTER + pty,
                vx: Math.cos(dir) * speed, vy: Math.sin(dir) * speed,
                size: Math.random() * 2.5 + 0.5, life, maxLife: life,
              });
            }
          };

          const handleMouseLeave = () => {
            isPausedRef.current = false;
            setHoveredId(null);
          };

          return (
            <div
              key={icon.id}
              className="absolute z-20 cursor-pointer"
              style={{ top: 0, left: 0, transform: `translate(${tx}px, ${ty}px)` }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Centering wrapper — separate from animation transforms */}
              <div className="absolute -top-10 -left-10 w-20 h-20">
                {/* Float & Scale animation on THIS element */}
                <div
                  className={cn(
                    "relative w-full h-full",
                    !isActive && "ts-float"
                  )}
                  style={
                    isHovered
                      ? { transform: "scale(1.22)", transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)" }
                      : isActive
                      ? { transform: "scale(1.12)", transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)" }
                      : { transform: "scale(1)", transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)" }
                  }
                >
                {/* Orange bloom halo — stronger on hover */}
                <div
                  className="absolute inset-[-18px] rounded-full bg-[#ff6a00] blur-2xl pointer-events-none"
                  style={{
                    opacity:    isHovered ? 0.6 : isActive ? 0.4 : 0,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                />

                {/* Icon card — premium ring on hover */}
                <div
                  className={cn(
                    "relative w-20 h-20 rounded-[1.5rem] flex items-center justify-center border backdrop-blur-xl transition-all duration-500",
                    isHovered
                      ? "border-[#ff6a00] ring-2 ring-[#ff6a00]/30"
                      : isActive
                      ? "border-[#ff6a00]/60"
                      : "border-white/10"
                  )}
                  style={{
                    backgroundColor: isHovered
                      ? "rgba(255,106,0,0.18)"
                      : isActive
                      ? "rgba(255,106,0,0.10)"
                      : "rgba(255,255,255,0.04)",
                    boxShadow: isHovered
                      ? "0 0 0 1px rgba(255,106,0,0.5), inset 0 0 20px rgba(255,106,0,0.12)"
                      : "none",
                    transition: "background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
                  }}
                >
                  <img
                    src={icon.src}
                    alt={icon.name}
                    className="w-11 h-11 object-contain"
                    style={{
                      opacity: isActive ? 1 : 0.55,
                      filter: isHovered
                        ? "saturate(1.3) drop-shadow(0 0 8px rgba(255,106,0,0.5))"
                        : isActive ? "saturate(1)" : "saturate(0.5)",
                      transition: "opacity 0.5s ease, filter 0.5s ease",
                    }}
                  />

                  {/* Tooltip — spring slide up on hover, fade on active */}
                  <div
                    className="absolute whitespace-nowrap pointer-events-none
                               px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md
                               border border-[#ff6a00]/20
                               text-white font-mono text-[9px] uppercase tracking-widest"
                    style={{
                      bottom: "calc(100% + 10px)",
                      left: "50%",
                      transform: isHovered
                        ? "translateX(-50%) translateY(0px) scale(1)"
                        : isActive
                        ? "translateX(-50%) translateY(3px) scale(0.95)"
                        : "translateX(-50%) translateY(8px) scale(0.9)",
                      opacity:    isHovered ? 1 : isActive ? 0.75 : 0,
                      transition: "opacity 0.35s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    {icon.name}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-black/90" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
