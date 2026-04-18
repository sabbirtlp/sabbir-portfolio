"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

import { useContent } from "@/components/providers/ContentProvider";

export default function Navbar() {
  const { content } = useContent();
  const pathname = usePathname();
  
  // Safe check to prevent dashboard crash on public access
  if (!content?.general || pathname?.startsWith("/admin") || pathname?.startsWith("/login")) return null;

  const { siteName } = content.general;
  const logoFirstChar = siteName?.charAt(0) || "S";
  const logoRest = siteName?.slice(1) || "abbir";

  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 border-b ${
          scrolled
            ? "bg-background/95 md:bg-background/80 md:backdrop-blur-xl border-border"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.3}>
            <Link href="/" className="font-syne font-black text-xl text-white whitespace-nowrap">
              <span className="text-accent">{logoFirstChar}</span>{logoRest}
              <span className="text-text-secondary">.</span>
            </Link>
          </MagneticButton>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-text-secondary hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 relative group cursor-pointer"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton strength={0.3}>
              <button
                onClick={() => handleNavClick("#contact")}
                className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white text-sm font-semibold rounded-full transition-all duration-300 glow-accent-sm cursor-pointer"
              >
                Start a Project
              </button>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-8 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-full h-0.5 bg-white origin-left transition-all duration-300"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="block w-2/3 h-0.5 bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-full h-0.5 bg-white origin-left transition-all duration-300"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9980] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-syne text-4xl font-black text-white hover:text-accent transition-colors duration-300 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
              >
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="mt-4 px-8 py-3 bg-accent text-white font-semibold rounded-full text-lg cursor-pointer"
                >
                  Start a Project
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
