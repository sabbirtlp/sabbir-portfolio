"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Globe, Send, ExternalLink, ArrowRight, Mail, Phone, Twitter, Github, Linkedin, Instagram, Youtube, Facebook } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContent } from "@/components/providers/ContentProvider";

export default function Footer() {
  const { content } = useContent();
  const { email, socialLinks: platformSocials } = content.general;
  const { logoText, description, copyrightText, links: menuLinks } = content.footer;

  const currentYear = new Date().getFullYear();

  // Dynamic Icon Mapper for Socials (Modern Lucide)
  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case "twitter": return Twitter;
      case "github": return Github;
      case "linkedin": return Linkedin;
      case "instagram": return Instagram;
      case "youtube": return Youtube;
      case "facebook": return Facebook;
      case "mail": return Mail;
      case "phone": return Phone;
      case "send": return Send;
      case "globe": return Globe;
      default: return ExternalLink;
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      {/* 0. Base Solid Layer */}
      <div className="absolute inset-0 z-0 bg-[#030303]" />

      {/* 1. Premium Brand Background Image */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <Image
          src="/footer-bg.png"
          alt="Technical Background"
          fill
          className="object-cover object-center opacity-[0.15] mix-blend-screen"
        />
        {/* Bolder, centered glows for maximum glass visibility on all devices */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 z-[2]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-orange-600/5 rounded-full blur-[80px] translate-y-1/2 z-[2]" />
      </div>

      {/* 2. SPECULAR SHINE & FROSTED GLASS (The Core Effect) */}
      <div className="absolute inset-0 z-[3] bg-white/[0.03] backdrop-blur-[40px] pointer-events-none overflow-hidden text-white">
        {/* Diagonal Specular Shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-40" />
        {/* Fine Grain / Noise for tactile glass surface */}
        <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      {/* 3. High-End Glass Edge Highlights */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-12 mb-20">
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-block mb-6 group">
              <span className="font-syne font-black text-2xl text-white group-hover:text-accent transition-colors duration-300">
                {logoText || "S.Hossain"}
              </span>
            </Link>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xs mb-8">
              {description || "Strategically designed digital solutions focused on conversion and high-end aesthetics."}
            </p>

            <div className="flex gap-3">
              {(platformSocials || []).map((link: any) => {
                const Icon = getIcon(link.icon || link.platform);
                return (
                  <MagneticButton key={link.platform} strength={0.4}>
                    <Link
                      href={link.href}
                      target="_blank"
                      className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all duration-500"
                      aria-label={link.platform}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </Link>
                  </MagneticButton>
                );
              })}
            </div>
          </div>

          {/* Column 2: Balanced Navigation */}
          <div className="lg:flex lg:flex-col lg:items-center">
            <div className="w-full max-w-[120px]">
              <p className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-[10px] opacity-50">Menu</p>
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-8">
                {(menuLinks || []).map((link: any) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-white transition-all text-sm font-medium flex items-center group"
                    >
                      <span className="w-0 h-px bg-accent group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Contact & CTA */}
          <div className="lg:flex lg:flex-col lg:items-end text-left lg:text-right">
            <div className="w-full lg:max-w-xs">
              <p className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-[10px] opacity-50">Get In Touch</p>
              <Link
                href={`mailto:${email}`}
                className="font-syne font-bold text-lg md:text-xl text-white hover:text-accent transition-all block mb-4 break-all"
              >
                {email}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-xs font-bold hover:bg-accent-light transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.2)]"
              >
                Start a conversation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Improved Bottom Section */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-[11px] font-medium tracking-wide">
            © {currentYear} {copyrightText || "SABBIR HOSSAIN — WEB SPECIALIST"}
          </p>

          <button
            onClick={handleScrollToTop}
            className="group flex items-center gap-3 text-text-muted hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest"
          >
            <span>Back to top</span>
            <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all duration-500">
              <span className="block translate-y-[-1px] transition-transform duration-300 group-hover:-translate-y-1">↑</span>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
