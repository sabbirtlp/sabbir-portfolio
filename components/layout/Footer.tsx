"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Send, ExternalLink, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContent } from "@/components/providers/ContentProvider";

export default function Footer() {
  const { content } = useContent();
  const { email, socials } = content.general;

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Send, href: socials.twitter, label: "Twitter" },
    { icon: Globe, href: socials.github, label: "Github" },
    { icon: ExternalLink, href: socials.linkedin, label: "LinkedIn" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-surface pt-24 pb-12 border-t border-border relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-20">
          {/* Left: Brand */}
          <div>
            <Link href="/" className="inline-block mb-8">
              <span className="font-syne font-black text-2xl sm:text-3xl text-white">
                S<span className="text-accent">.</span>Hossain
              </span>
            </Link>
            <p className="text-text-secondary text-base md:text-lg max-w-md mb-10 leading-relaxed">
              Crafting high-converting digital experiences for ambitious businesses. Built with strategic
              design and conversion-focused architecture.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <MagneticButton key={link.label} strength={0.3}>
                  <Link
                    href={link.href}
                    target="_blank"
                    className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </Link>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Right: Quick Links & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-10">
            <div>
              <p className="text-white font-bold mb-6 uppercase tracking-widest text-[10px] md:text-xs">Navigation</p>
              <ul className="space-y-4">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-bold mb-6 uppercase tracking-widest text-[10px] md:text-xs">Let&apos;s Talk</p>
              <Link
                href={`mailto:${email}`}
                className="text-text-secondary hover:text-accent transition-colors text-sm block mb-4 break-all"
              >
                {email}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-accent text-sm font-bold group"
              >
                Start a conversation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-sm">
            © {currentYear} Sabbir Hossain. All rights reserved.
          </p>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 text-text-muted hover:text-white transition-colors text-sm font-medium"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
              <span className="block translate-y-[-1px]">↑</span>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
