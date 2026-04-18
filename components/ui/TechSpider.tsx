"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const outerIcons = [
  { id: 1, name: "WordPress", src: "/icons/wordpress.svg" },
  { id: 2, name: "Elementor", src: "/icons/elementor.svg" },
  { id: 3, name: "React", src: "/icons/react.svg" },
  { id: 4, name: "Node.js", src: "/icons/node.svg" },
  { id: 5, name: "PHP", src: "/icons/php.svg" },
  { id: 6, name: "HTML5", src: "/icons/html.svg" },
  { id: 7, name: "CSS3", src: "/icons/css.svg" },
  { id: 8, name: "Bootstrap", src: "/icons/bootstrap.svg" },
];

export default function TechSpider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Bind scroll interaction relative to this component's position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Progress tracks while element is inside the viewport
  });

  // Premium inertia-based spring physics for buttery smooth scrolling rotation
  const springConfig = { damping: 25, stiffness: 40, mass: 0.8 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Outer Wrapper rotates [0 -> 180 degrees]
  const orbitRotation = useTransform(smoothProgress, [0, 1], [-90, 180]);
  
  // Internal cards reverse rotate to stay upright
  const reverseRotation = useTransform(smoothProgress, [0, 1], [90, -180]);

  const radius = 240; 
  const svgSize = 700;
  const svgCenter = 350;
  const centralIconRadius = 75; 

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-[700px] flex justify-center items-center aspect-square mx-auto z-10"
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Rotating Ecosystem Wrapper */}
      <motion.div 
        className="absolute inset-0 flex justify-center items-center w-full h-full transform-gpu"
        style={{ rotate: orbitRotation }}
      >
        
        {/* SVG Drawing Layer: Center -> Planets Radial Lines */}
        <svg 
          width={svgSize} 
          height={svgSize} 
          viewBox={`0 0 ${svgSize} ${svgSize}`} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none origin-center -z-10 scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100"
        >
          <g>
            {outerIcons.map((icon, i) => {
              const angle = (-90 + i * (360 / outerIcons.length)) * (Math.PI / 180);
              const startX = svgCenter + centralIconRadius * Math.cos(angle);
              const startY = svgCenter + centralIconRadius * Math.sin(angle);
              const endX = svgCenter + radius * Math.cos(angle);
              const endY = svgCenter + radius * Math.sin(angle);
              
              const isSpokeActive = hoveredId === icon.id || hoveredId === 999;
              
              return (
                <line
                  key={`spoke-${icon.id}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={isSpokeActive ? "rgba(234, 88, 12, 0.6)" : "rgba(255, 255, 255, 0.08)"}
                  strokeWidth={isSpokeActive ? "2" : "1"}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                  style={{
                    filter: isSpokeActive ? "drop-shadow(0 0 8px rgba(234, 88, 12, 0.8))" : "none",
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Orbiting Planets Containers */}
        <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center z-10">
          {outerIcons.map((icon, i) => {
            const angle = (-90 + i * (360 / outerIcons.length)) * (Math.PI / 180);
            const x = svgCenter + radius * Math.cos(angle);
            const y = svgCenter + radius * Math.sin(angle);
            const isHovered = hoveredId === icon.id;

            return (
              <div
                key={icon.id}
                className="absolute pointer-events-auto z-20 origin-center"
                style={{ top: `${y}px`, left: `${x}px`, transform: `translate(-50%, -50%)` }}
              >
                {/* 
                  Inner Inverse Rotation Node: 
                  Maintains planetary upright integrity during system rotation while enabling micro scaling 
                */}
                <motion.div 
                  style={{ rotate: reverseRotation }}
                  whileHover={{ scale: 1.15 }}
                  onMouseEnter={() => setHoveredId(icon.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative group cursor-pointer flex flex-col items-center justify-center transform-gpu"
                >
                  {/* Subtle Background Glow behind icon card */}
                  <div className={`absolute inset-[-15px] rounded-full blur-2xl transition-all duration-500 -z-10 ${isHovered ? 'bg-accent/40 opacity-100 scale-110' : 'bg-transparent opacity-0 scale-90'}`} />
                  
                  {/* Glassmorphism Icon Wrapper */}
                  <motion.div 
                    animate={{ y: isHovered ? 0 : [0, -6, 0] }}
                    transition={{
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                    }}
                    className={`w-[85px] h-[85px] md:w-[95px] md:h-[95px] backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-500 border border-white/5 ${isHovered ? 'bg-surface-2 border-accent/50 shadow-[0_0_25px_rgba(234,88,12,0.3)]' : 'bg-surface-2/60 hover:bg-white/5 hover:border-white/20'}`}
                  >
                    <img
                      src={icon.src}
                      alt={`${icon.name} Logo`}
                      className={`w-[45px] h-[45px] object-contain transition-all duration-300 drop-shadow-xl ${isHovered ? "scale-110 drop-shadow-[0_0_15px_rgba(234,88,12,0.6)]" : "opacity-80 grayscale-[30%]"}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';
                        (e.target as HTMLImageElement).style.opacity = "0.3";
                      }}
                    />
                  </motion.div>

                  {/* High Tech Tooltip underneath */}
                  <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0a0a0a]/90 backdrop-blur-md font-fira-code text-accent border border-accent/20 text-[11px] px-3 py-1.5 rounded transition-all duration-300 pointer-events-none drop-shadow-lg ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
                    {icon.name}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 
        Central Star (Fixed relative to the viewport container! Outside rotation layer.)
      */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100"
        onMouseEnter={() => setHoveredId(999)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative flex items-center justify-center cursor-crosshair transform-gpu"
        >
          {/* Intense breathing core glow */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-[-30px] rounded-full blur-[40px] -z-10 bg-accent/30`}
          />
          <div className="absolute inset-0 bg-accent/20 rounded-[28px] animate-ping opacity-20 -z-10" />
          
          <div className={`w-[140px] h-[140px] md:w-[150px] md:h-[150px] bg-background/95 backdrop-blur-xl border-accent/40 rounded-[28px] flex flex-col items-center justify-center border transition-all duration-500 shadow-[0_0_50px_rgba(234,88,12,0.25)] ${hoveredId === 999 ? 'border-accent shadow-[0_0_60px_rgba(234,88,12,0.5)] bg-surface' : ''}`}>
             <motion.div 
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center"
             >
               <span className="text-white font-unbounded font-black text-2xl tracking-wide leading-none drop-shadow-[0_0_10px_rgba(234,88,12,0.8)]">TECH</span>
               <span className="text-accent font-syne font-bold text-xs tracking-[0.3em] mt-2 opacity-90 drop-shadow-[0_0_10px_rgba(234,88,12,0.5)]">STACK</span>
             </motion.div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
