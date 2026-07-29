"use client";

import { motion } from "framer-motion";
import { Download, Github, FileBox, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/components/providers/ContentProvider";

export default function PluginsPage() {
  const { content } = useContent();
  const plugins = content?.plugins || [];

  return (
    <section className="min-h-screen bg-background relative pt-32 md:pt-40 pb-24 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[160px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="section-divider mx-auto md:mx-0" />
            <p className="text-text-secondary text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-4">
              Open Source
            </p>
            <h1 className="font-syne font-black text-4xl sm:text-5xl md:text-6xl text-text-primary leading-[0.95] tracking-tight mb-6">
              WordPress <span className="text-gradient">Plugins</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed mx-auto md:mx-0">
              A collection of custom WordPress plugins I've developed. Feel free to download them, use them in your projects, or contribute on GitHub.
            </p>
          </motion.div>
        </div>

        {/* Plugins List */}
        <div className="space-y-6">
          {plugins.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-surface-2 border border-border rounded-3xl"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface border border-border flex items-center justify-center">
                <FileBox className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="font-syne font-bold text-xl text-text-primary mb-2">
                No plugins available
              </h3>
              <p className="text-text-secondary text-sm max-w-md mx-auto">
                Check back later! I'm currently working on some exciting new WordPress plugins to share with the community.
              </p>
            </motion.div>
          ) : (
            plugins.map((plugin: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-surface border border-border rounded-3xl p-6 md:p-8 hover:border-accent/40 transition-all duration-300 card-gradient-border overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                  {/* Icon */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-surface-2 border border-border shrink-0 flex items-center justify-center overflow-hidden shadow-lg">
                    {plugin.favicon ? (
                      <img src={plugin.favicon} alt={plugin.name} className="w-full h-full object-cover" />
                    ) : (
                      <FileBox className="w-10 h-10 text-text-muted/40" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-syne font-bold text-2xl text-text-primary mb-3">
                      {plugin.name}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 md:mb-0">
                      {plugin.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t border-border/50 md:border-0 mt-4 md:mt-0">
                    {plugin.githubLink && (
                      <a
                        href={plugin.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-2 hover:bg-surface border border-border text-text-primary text-sm font-semibold transition-all"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                    {plugin.zipFile ? (
                      <a
                        href={plugin.zipFile}
                        download
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-light text-white text-sm font-bold transition-all shadow-lg shadow-accent/20 glow-accent-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download ZIP
                      </a>
                    ) : (
                      <button disabled className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-2 border border-border text-text-muted text-sm font-semibold opacity-50 cursor-not-allowed">
                        <Download className="w-4 h-4" />
                        Not Available
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
