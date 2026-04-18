"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrbitProps {
  className?: string;
  children?: React.ReactNode;
  size?: number;
  duration?: number;
  direction?: "clockwise" | "counter-clockwise";
  delay?: number;
  radius?: number;
}

export const Orbit = ({
  className,
  children,
  size = 40,
  duration = 20,
  direction = "clockwise",
  delay = 0,
  radius = 100,
}: OrbitProps) => {
  const isClockwise = direction === "clockwise";

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none",
        className
      )}
    >
      <svg
        className="absolute"
        width={radius * 2 + size}
        height={radius * 2 + size}
        viewBox={`0 0 ${radius * 2 + size} ${radius * 2 + size}`}
      >
        <circle
          cx={radius + size / 2}
          cy={radius + size / 2}
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.05"
          strokeDasharray="4 4"
        />
      </svg>
      <motion.div
        className="absolute"
        animate={{
          rotate: isClockwise ? [0, 360] : [360, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
        style={{
          width: radius * 2 + size,
          height: radius * 2 + size,
        }}
      >
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: radius + radius * Math.cos(0),
            top: radius + radius * Math.sin(0),
            width: size,
            height: size,
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export const OrbitContainer = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <div className={cn("relative flex h-[500px] w-full items-center justify-center overflow-hidden", className)}>
      {children}
    </div>
  );
};
