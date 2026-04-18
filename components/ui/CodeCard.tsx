"use client";

import React from "react";
import { motion } from "framer-motion";
import { useContent } from "@/components/providers/ContentProvider";

export const CodeCard = () => {
  const { content } = useContent();

  if (!content?.about) return null;

  const { name, role, techStack } = content.about;
  const location = "Bangladesh"; // Hardcoded as per user's sample context or I could pull from content if available
  const seniority = "Senior Web Developer"; // Based on 7+ years in content

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-2xl mx-auto bg-[#050505] border-[#1b1b1b] relative rounded-xl border shadow-2xl overflow-hidden group"
    >
      {/* Top gradient border */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      </div>

      {/* Window Header */}
      <div className="px-4 lg:px-6 py-4 flex justify-between items-center bg-[#0a0a0a]">
        <div className="flex flex-row space-x-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-[10px] text-text-muted font-mono tracking-widest uppercase">profile.js — editor</div>
      </div>

      {/* Code Content Area */}
      <div className="px-4 lg:px-8 py-6 lg:py-10 relative font-fira-code">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="relative flex">
          {/* Line Numbers */}
          <div className="hidden md:flex flex-col items-end pr-6 text-zinc-700 font-mono text-xs select-none">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="leading-relaxed">{i + 1}</div>
            ))}
          </div>

          {/* The Code */}
          <code className="text-[13px] md:text-sm leading-relaxed w-full">
            <div>
              <span className="text-accent mr-2">const</span>
              <span className="text-white mr-2">developer</span>
              <span className="text-accent mr-2">=</span>
              <span className="text-zinc-500">{'{'}</span>
            </div>
            
            <div className="pl-6">
              <span className="text-zinc-400">name:</span>{" "}
              <span className="text-orange-300">"{name}"</span>
              <span className="text-zinc-500">,</span>
            </div>
            
            <div className="pl-6">
              <span className="text-zinc-400">role:</span>{" "}
              <span className="text-orange-300">"{role}"</span>
              <span className="text-zinc-500">,</span>
            </div>

            <div className="pl-6">
              <span className="text-zinc-400">location:</span>{" "}
              <span className="text-orange-300">"{location}"</span>
              <span className="text-zinc-500">,</span>
            </div>

            <div className="pl-6">
              <span className="text-zinc-400">experience:</span>{" "}
              <span className="text-accent">7</span>
              <span className="text-zinc-500">, // Years</span>
            </div>

            <div className="pl-6">
              <span className="text-zinc-400">skills:</span>{" "}
              <span className="text-zinc-500">[</span>
              <div className="pl-6 flex flex-wrap gap-x-2">
                {techStack.slice(0, 8).map((tech: string, i: number) => (
                  <span key={tech}>
                    <span className="text-orange-200">"{tech}"</span>
                    {i < 7 && <span className="text-zinc-500">,</span>}
                  </span>
                ))}
              </div>
              <span className="text-zinc-500">],</span>
            </div>

            <div className="pl-6">
              <span className="text-zinc-400">hardworking:</span>{" "}
              <span className="text-accent">true</span>
              <span className="text-zinc-500">,</span>
            </div>

            <div className="pl-6">
              <span className="text-zinc-400">problem_solver:</span>{" "}
              <span className="text-accent">true</span>
            </div>

            <div>
              <span className="text-zinc-500">{'};'}</span>
            </div>
          </code>
        </div>
      </div>

      {/* Window Footer */}
      <div className="px-6 py-3 bg-[#0a0a0a] border-t border-[#1b1b1b] flex justify-between items-center text-[10px] text-zinc-600 font-mono">
        <div className="flex gap-4">
          <span>UTF-8</span>
          <span>JavaScript</span>
        </div>
        <div className="flex gap-4">
          <span>Ln 12, Col 2</span>
          <span className="text-accent opacity-50">Saved</span>
        </div>
      </div>
    </motion.div>
  );
};
