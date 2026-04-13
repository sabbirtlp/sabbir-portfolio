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
      {/* Night Diamond Angular Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none hidden md:flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="relative group/cursor">
          {/* Outer Angular Silhouette */}
          <div 
             className="w-10 h-10 bg-accent transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.5)] [.cursor-hover_&]:scale-125 [.cursor-hover_&]:opacity-40"
             style={{
                clipPath: "polygon(0% 0%, 100% 40%, 100% 100%, 40% 100%, 40% 70%, 0% 70%)"
             }}
          />
          
          {/* Inner Glowing Core Diamond */}
          <motion.div 
             animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
             }}
             transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
             }}
             className="absolute left-[15%] top-[15%] w-4 h-4 bg-white shadow-[0_0_15px_#fff] transition-all duration-300 [.cursor-hover_&]:scale-150 [.cursor-hover_&]:shadow-[0_0_25px_rgba(234,88,12,1)]"
             style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
             }}
          />

          {/* Prompt Detail */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 font-syne font-black text-[10px] uppercase tracking-tighter text-accent opacity-0 [.cursor-hover_&]:opacity-100 transition-all [.cursor-hover_&]:translate-x-2 whitespace-nowrap">
             &gt; VIEW_PROJECT
          </div>
        </div>
      </motion.div>
    </>
  );
}
