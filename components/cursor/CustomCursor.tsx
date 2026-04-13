"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };

  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnterInteractive = () => {
      cursorRef.current?.classList.add("cursor-hover");
    };

    const handleMouseLeaveInteractive = () => {
      cursorRef.current?.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interactiveElements = document.querySelectorAll("a, button, [data-cursor]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Vintage Block Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none hidden md:flex items-center justify-center translate-x-1/2 translate-y-1/2"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="relative">
          {/* Main Block */}
          <motion.div 
             animate={{ 
                opacity: [1, 1, 0, 0],
             }}
             transition={{ 
                duration: 1, 
                repeat: Infinity, 
                times: [0, 0.5, 0.51, 1],
                ease: "stepStart" 
             }}
             className="w-3 h-6 bg-accent rounded-sm shadow-[0_0_15px_rgba(234,88,12,0.4)] transition-all duration-300 [.cursor-hover_&]:w-8 [.cursor-hover_&]:h-8 [.cursor-hover_&]:rounded-lg [.cursor-hover_&]:bg-white [.cursor-hover_&]:mix-blend-difference"
          />
          
          {/* Retro Detail: Prompt text */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 font-syne font-black text-xs text-accent opacity-0 [.cursor-hover_&]:opacity-100 transition-opacity whitespace-nowrap">
             &gt; VIEW_
          </div>
        </div>
      </motion.div>
    </>
  );
}
