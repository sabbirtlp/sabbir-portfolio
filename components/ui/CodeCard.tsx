"use client";

import React from "react";
import { motion } from "framer-motion";
import { useContent } from "@/components/providers/ContentProvider";

export const CodeCard = () => {
  const { content } = useContent();

  if (!content?.about || !content?.codeCard) return null;

  const { codeCard } = content;
  const headerText = codeCard.headerText || "profile.js — editor";
  const constName = codeCard.constName || "developer";
  const nameKey = codeCard.nameKey || "name:";
  const nameValue = codeCard.nameValue || content.about.name;
  const roleKey = codeCard.roleKey || "role:";
  const roleValue = codeCard.roleValue || content.about.role;
  const locationKey = codeCard.locationKey || "location:";
  const locationValue = codeCard.locationValue || "Bangladesh";
  const experienceKey = codeCard.experienceKey || "experience:";
  const experienceValue = codeCard.experienceValue || 7;
  const skillsKey = codeCard.skillsKey || "skills:";
  const skillsArray = codeCard.skillsValue ? codeCard.skillsValue.split(',').map((s: string) => s.trim()) : content.about.techStack.slice(0, 8);
  const hardworkingKey = codeCard.hardworkingKey || "hardworking:";
  const hardworkingValue = codeCard.hardworkingValue || "true";
  const problemSolverKey = codeCard.problemSolverKey || "problem_solver:";
  const problemSolverValue = codeCard.problemSolverValue || "true";
  const bottomTextLeft1 = codeCard.bottomTextLeft1 || "UTF-8";
  const bottomTextLeft2 = codeCard.bottomTextLeft2 || "JavaScript";
  const bottomTextRight1 = codeCard.bottomTextRight1 || "Ln 12, Col 2";
  const bottomTextRight2 = codeCard.bottomTextRight2 || "Saved";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-2xl mx-auto bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border-zinc-200/50 dark:border-white/[0.08] relative rounded-2xl border shadow-2xl dark:shadow-[0_8px_60px_-12px_rgba(0,0,0,0.6)] overflow-hidden group"
    >
      {/* Top gradient border */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      </div>

      {/* Window Header */}
      <div className="px-4 lg:px-6 py-4 flex justify-between items-center bg-zinc-100/50 dark:bg-white/[0.03] backdrop-blur-sm">
        <div className="flex flex-row space-x-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-[10px] text-zinc-500 dark:text-text-muted font-mono tracking-widest uppercase">{headerText}</div>
      </div>

      {/* Code Content Area */}
      <div className="px-4 lg:px-8 py-6 lg:py-10 relative font-fira-code">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="relative flex">
          {/* Line Numbers */}
          <div className="hidden md:flex flex-col items-end pr-6 text-zinc-400 dark:text-zinc-700 font-mono text-xs select-none">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="leading-relaxed">{i + 1}</div>
            ))}
          </div>

          {/* The Code */}
          <code className="text-[13px] md:text-sm leading-relaxed w-full">
            <div>
              <span className="text-accent mr-2">const</span>
              <span className="text-text-primary mr-2">{constName}</span>
              <span className="text-accent mr-2">=</span>
              <span className="text-zinc-400 dark:text-zinc-500">{'{'}</span>
            </div>
            
            <div className="pl-6">
              <span className="text-zinc-500 dark:text-zinc-400">{nameKey}</span>{" "}
              <span className="text-orange-600 dark:text-orange-300">"{nameValue}"</span>
              <span className="text-zinc-400 dark:text-zinc-500">,</span>
            </div>
            
            <div className="pl-6">
              <span className="text-zinc-500 dark:text-zinc-400">{roleKey}</span>{" "}
              <span className="text-orange-600 dark:text-orange-300">"{roleValue}"</span>
              <span className="text-zinc-400 dark:text-zinc-500">,</span>
            </div>

            <div className="pl-6">
              <span className="text-zinc-500 dark:text-zinc-400">{locationKey}</span>{" "}
              <span className="text-orange-600 dark:text-orange-300">"{locationValue}"</span>
              <span className="text-zinc-400 dark:text-zinc-500">,</span>
            </div>

            <div className="pl-6">
              <span className="text-zinc-500 dark:text-zinc-400">{experienceKey}</span>{" "}
              <span className="text-accent">{experienceValue}</span>
              <span className="text-zinc-400 dark:text-zinc-500">, // Years</span>
            </div>

            <div className="pl-6">
              <span className="text-zinc-500 dark:text-zinc-400">{skillsKey}</span>{" "}
              <span className="text-zinc-400 dark:text-zinc-500">[</span>
              <div className="pl-6 flex flex-wrap gap-x-2">
                {skillsArray.map((tech: string, i: number) => (
                  <span key={i}>
                    <span className="text-orange-500 dark:text-orange-200">"{tech}"</span>
                    {i < skillsArray.length - 1 && <span className="text-zinc-400 dark:text-zinc-500">,</span>}
                  </span>
                ))}
              </div>
              <span className="text-zinc-400 dark:text-zinc-500">],</span>
            </div>

            <div className="pl-6">
              <span className="text-zinc-500 dark:text-zinc-400">{hardworkingKey}</span>{" "}
              <span className="text-accent">{hardworkingValue}</span>
              <span className="text-zinc-400 dark:text-zinc-500">,</span>
            </div>

            <div className="pl-6">
              <span className="text-zinc-500 dark:text-zinc-400">{problemSolverKey}</span>{" "}
              <span className="text-accent">{problemSolverValue}</span>
            </div>

            <div>
              <span className="text-zinc-400 dark:text-zinc-500">{'};'}</span>
            </div>
          </code>
        </div>
      </div>

      {/* Window Footer */}
      <div className="px-6 py-3 bg-zinc-50/50 border-t border-zinc-200/50 dark:bg-white/[0.02] dark:border-white/[0.06] backdrop-blur-sm flex justify-between items-center text-[10px] text-zinc-500 dark:text-zinc-500 font-mono">
        <div className="flex gap-4">
          <span>{bottomTextLeft1}</span>
          <span>{bottomTextLeft2}</span>
        </div>
        <div className="flex gap-4">
          <span>{bottomTextRight1}</span>
          <span className="text-accent opacity-50">{bottomTextRight2}</span>
        </div>
      </div>
    </motion.div>
  );
};
