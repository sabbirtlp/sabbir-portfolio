"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number | string;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CountUp({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isMounted, setIsMounted] = useState(false);
  const hasAnimated = useRef(false);

  // Parse end value to number
  const endValue = typeof end === "string" ? parseInt(end.replace(/[^0-9.-]+/g, "")) : end;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !isInView || hasAnimated.current || !ref.current || isNaN(endValue)) return;
    
    hasAnimated.current = true;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * eased);

      if (ref.current) {
        ref.current.textContent = `${prefix}${current}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, isMounted, endValue, duration, suffix, prefix]);

  // Initial render (SSR and first CSR pass)
  return (
    <span ref={ref} className={className}>
      {prefix}{isMounted ? "0" : end}{suffix}
    </span>
  );
}

