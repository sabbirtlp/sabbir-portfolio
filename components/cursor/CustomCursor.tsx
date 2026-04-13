"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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
      ringRef.current?.classList.add("ring-hover");
    };

    const handleMouseLeaveInteractive = () => {
      cursorRef.current?.classList.remove("cursor-hover");
      ringRef.current?.classList.remove("ring-hover");
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
      {/* Dot */}
      <motion.div
        ref={cursorRef}
        className="cursor-dot fixed top-0 left-0 z-[99999] pointer-events-none hidden md:block"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="w-3 h-3 rounded-full bg-accent transition-all duration-300 [.cursor-hover_&]:scale-0" />
      </motion.div>

      {/* Ring */}
      <motion.div
        ref={ringRef}
        className="cursor-dot fixed top-0 left-0 z-[99998] pointer-events-none hidden md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className="w-10 h-10 rounded-full border border-accent/60 transition-all duration-300"
          style={{
            boxShadow: "0 0 10px rgba(234,88,12,0.2)",
          }}
        />
      </motion.div>
    </>
  );
}
