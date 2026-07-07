"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // placeholder to prevent layout shift
  }

  return (
    <MagneticButton strength={0.2}>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-surface-2 text-text-primary transition-colors border border-border cursor-pointer"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </MagneticButton>
  );
}
