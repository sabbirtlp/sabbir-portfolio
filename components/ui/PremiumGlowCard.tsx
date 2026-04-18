"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PremiumGlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function PremiumGlowCard({ children, className = "" }: PremiumGlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative h-full rounded-[24px] overflow-hidden border border-white/5 bg-surface-2/40 backdrop-blur-[12px] transition-all duration-700 hover:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] ${className}`}
    >
      {/* Layer 1: Ambient Base Glow (Always there, highly subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/[0.015] pointer-events-none" />

      {/* Layer 2: Dynamic Cursor Light Source (Directional Glow) */}
      <motion.div
        className="absolute pointer-events-none z-0 mix-blend-screen"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(234, 88, 12, 0.08), transparent 40%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.15 }}
        style={{ inset: "-1px" }}
      />

      {/* Layer 3: Dynamic Border/Inner Glow (using mask for outline precision) */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none rounded-[24px] mix-blend-screen"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          boxShadow: isHovered 
            ? `inset 0 0 40px rgba(234, 88, 12, 0.03), inset 0 0 10px rgba(255, 255, 255, 0.03)` 
            : "none",
        }}
      />
      
      {/* Top Edge Highlight simulates a permanent overhead light source */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />

      {/* Subtle Breathing Glow Overlay (only on hover) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        animate={isHovered ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle at 80% 20%, rgba(234, 88, 12, 0.03) 0%, transparent 50%)"
        }}
      />

      {/* Actual Card Content */}
      <div className="relative z-10 h-full p-8 flex flex-col items-start">
        {children}
      </div>
    </motion.div>
  );
}
