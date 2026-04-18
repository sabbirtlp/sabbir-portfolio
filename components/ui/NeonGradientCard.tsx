"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonGradientCardProps {
  className?: string;
  children: React.ReactNode;
  borderWidth?: number;
  borderRadius?: number;
  neonColors?: {
    first: string;
    second: string;
  };
}

export const NeonGradientCard = ({
  className,
  children,
  borderWidth = 1.5,
  borderRadius = 24,
  neonColors = {
    first: "#ea580c",
    second: "#fb923c",
  },
}: NeonGradientCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-[var(--border-radius)] p-[var(--border-width)]",
        className
      )}
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first": neonColors.first,
          "--neon-second": neonColors.second,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 z-0 animate-pulse-glow opacity-30 blur-xl"
        style={{
          background: `linear-gradient(45deg, var(--neon-first), var(--neon-second))`,
          borderRadius: "inherit",
        }}
      />
      <div 
        className="absolute inset-0 z-0 opacity-100"
        style={{
          background: `linear-gradient(45deg, var(--neon-first), var(--neon-second))`,
          borderRadius: "inherit",
          padding: "var(--border-width)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative z-10 h-full w-full rounded-[calc(var(--border-radius)-var(--border-width))] bg-[#111111] overflow-hidden">
        {children}
      </div>
    </div>
  );
};
