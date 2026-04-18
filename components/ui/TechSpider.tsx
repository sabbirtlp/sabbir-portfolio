"use client";

import React, { useState } from "react";
import Image from "next/image";

const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isHovered = false,
  animationDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isHovered?: boolean;
  animationDelay?: number;
}) => (
  <div
    className={`
        backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-500 border relative overflow-hidden
        ${
          isHighlighted
            ? "bg-accent/20 border-accent/50 shadow-accent/20 shadow-2xl animate-breathing-glow"
            : `bg-surface-2/80 border-white/10 ${!isHovered && "animate-float"}`
        }
        ${
          isHovered
            ? "bg-surface-2 border-accent/60 scale-110 shadow-accent/30 shadow-2xl z-30"
            : "hover:bg-white/5 hover:border-white/20 z-10"
        }
        ${className}
    `}
    style={{ animationDelay: `${animationDelay}s` }}
  >
    {children}
  </div>
);

const TechSpider = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Using paths matching the requested icons for public/icons/ directory
  // A generic fallback text or span will show if the image is missing (broken image tag fallback handling)
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

  const radius = 220; // Increased radius for better separation on desktop
  const centralIconRadius = 60;
  const outerIconRadius = 45;
  const svgSize = Math.max(radius * 2 + 150, 600);
  const svgCenter = svgSize / 2;

  return (
    <div className="relative w-full max-w-[600px] flex justify-center items-center aspect-square">
      <style>
        {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }

                @keyframes breathing-glow {
                    0% { box-shadow: 0 0 20px 2px rgba(234, 88, 12, 0.2); }
                    50% { box-shadow: 0 0 40px 10px rgba(234, 88, 12, 0.4); }
                    100% { box-shadow: 0 0 20px 2px rgba(234, 88, 12, 0.2); }
                }
                .animate-breathing-glow {
                    animation: breathing-glow 4s ease-in-out infinite;
                }
            `}
      </style>

      {/* SVG Canvas for Connections */}
      <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center z-0">
        <defs>
          <filter id="spider-glow-orange">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g>
          {/* Main Web (Circle lines between outer icons) */}
          {outerIcons.map((icon, i) => {
            const nextIndex = (i + 1) % outerIcons.length;
            const nextIcon = outerIcons[nextIndex];

            const angle1 = (-90 + i * (360 / outerIcons.length)) * (Math.PI / 180);
            const x1 = svgCenter + radius * Math.cos(angle1);
            const y1 = svgCenter + radius * Math.sin(angle1);

            const angle2 = (-90 + nextIndex * (360 / outerIcons.length)) * (Math.PI / 180);
            const x2 = svgCenter + radius * Math.cos(angle2);
            const y2 = svgCenter + radius * Math.sin(angle2);

            const isLineActive = hoveredId === icon.id || hoveredId === nextIcon.id;

            return (
              <line
                key={`web-line-${icon.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isLineActive ? "#ea580c" : "#333"}
                strokeWidth={isLineActive ? "3" : "1"}
                className={`transition-all duration-500`}
                style={{ opacity: isLineActive ? 0.9 : 0.2 }}
                filter={isLineActive ? "url(#spider-glow-orange)" : "none"}
              />
            );
          })}

          {/* Spokes (Lines from center to outer icons) */}
          {outerIcons.map((icon, i) => {
            const angle = (-90 + i * (360 / outerIcons.length)) * (Math.PI / 180);
            const startX = svgCenter + centralIconRadius * Math.cos(angle);
            const startY = svgCenter + centralIconRadius * Math.sin(angle);
            const endX = svgCenter + radius * Math.cos(angle);
            const endY = svgCenter + radius * Math.sin(angle);
            
            const isSpokeActive = hoveredId === icon.id || hoveredId === 999; // 999 is center

            return (
              <line
                key={`spoke-line-${icon.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={isSpokeActive ? "#ea580c" : "#333"}
                strokeWidth={isSpokeActive ? "3" : "1"}
                className="transition-all duration-500"
                style={{ opacity: isSpokeActive ? 0.9 : 0.2 }}
                filter={isSpokeActive ? "url(#spider-glow-orange)" : "none"}
              />
            );
          })}
        </g>
      </svg>

      {/* Wrapping the icons inside the same scaling container so they perfectly match the SVG lines naturally */}
      <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center z-10">

        {/* Central Focal Point (The Brand/Core) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
          onMouseEnter={() => setHoveredId(999)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <IconWrapper className="w-[120px] h-[120px] border-accent/40 bg-surface/90" isHighlighted={true}>
            <div className="flex flex-col items-center justify-center h-full w-full">
               {/* Pulse Ring Behind */}
               <div className="absolute inset-0 bg-accent/10 rounded-2xl animate-ping opacity-30" />
               <span className="text-accent font-unbounded font-bold text-xl leading-none">TECH</span>
               <span className="text-white font-syne text-[11px] tracking-[0.25em] mt-1.5 opacity-80">STACK</span>
            </div>
          </IconWrapper>
        </div>

        {/* The Outer Planets (Icons) */}
        {outerIcons.map((icon, i) => {
          const angle = (-90 + i * (360 / outerIcons.length)) * (Math.PI / 180);
          // 300 is the center since w=600 h=600
          const x = 300 + radius * Math.cos(angle);
          const y = 300 + radius * Math.sin(angle);
          const isHovered = hoveredId === icon.id;

          return (
            <div
              key={icon.id}
              className="absolute pointer-events-auto transition-transform duration-500 z-20"
              style={{ top: `${y}px`, left: `${x}px`, transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.1)' : 'scale(1)'}` }}
              onMouseEnter={() => setHoveredId(icon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative group">
                {/* Visual Aura */}
                <div
                  className={`absolute inset-[-20px] bg-accent/30 rounded-full blur-2xl transition-all duration-500 -z-10 ${
                    isHovered ? "opacity-100 scale-125" : "opacity-0 scale-90"
                  }`}
                />

                <IconWrapper
                  className="w-[80px] h-[80px] md:w-[90px] md:h-[90px]"
                  isHovered={isHovered}
                  animationDelay={i * 0.15}
                >
                  <img
                    src={icon.src}
                    alt={`${icon.name} Logo`}
                    className={`w-[50px] h-[50px] object-contain transition-all duration-300 drop-shadow-xl ${
                      isHovered ? "scale-110 drop-shadow-[0_0_15px_rgba(234,88,12,0.8)]" : "opacity-90 grayscale-[40%] hover:grayscale-0"
                    }`}
                    onError={(e) => {
                      // Graceful fallback if image is totally missing
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';
                      (e.target as HTMLImageElement).style.opacity = "0.3";
                    }}
                  />
                </IconWrapper>
                
                {/* Tooltip on hover */}
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 font-fira-code text-accent border border-accent/30 text-[10px] px-2 py-1 rounded transition-all duration-300 pointer-events-none ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
                  {icon.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechSpider;
