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
      {/* Large Classic Pointer */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none hidden md:block"
        style={{ x: ringX, y: ringY, translateX: "-4px", translateY: "-4px" }}
      >
        <motion.div
          animate={{ scale: cursorRef.current?.classList.contains("cursor-hover") ? 1.2 : 1 }}
          className="transition-transform duration-300"
        >
          <svg 
            width="32" 
            height="40" 
            viewBox="0 0 32 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          >
            <path 
              d="M0 0V32L9 23L15 37L21 34L15 21L26 21L0 0Z" 
              fill="black" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinejoin="round" 
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
