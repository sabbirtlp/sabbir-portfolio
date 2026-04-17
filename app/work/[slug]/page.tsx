import { notFound } from "next/navigation";
import { getContent } from "@/lib/storage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const content = await getContent();
  if (!content || !content.projects) return [];
  return content.projects.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const project = content?.projects?.find((p: any) => p.slug === slug);
  
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} — Case Study | Sabbir Hossain`,
    description: project.longDescription,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.longDescription,
      type: "article",
    },
  };
}

const gradientMap: Record<string, string> = {
  "luxe-real-estate": "from-amber-900 via-orange-900 to-red-900",
  "nova-saas-platform": "from-violet-900 via-purple-900 to-indigo-900",
  "bloom-ecommerce": "from-rose-900 via-pink-900 to-fuchsia-900",
  "atlas-consulting": "from-slate-800 via-zinc-800 to-gray-900",
  "pulse-fitness": "from-emerald-900 via-teal-900 to-cyan-900",
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const content = await getContent();
  const projects = content?.projects || [];
  const project = projects.find((p: any) => p.slug === slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p: any) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const gradient = gradientMap[slug] ?? "from-orange-900 to-red-900";

  return (
    <article className="bg-background min-h-screen">
      {/* Hero */}
      <div className={`relative min-h-[60vh] bg-gradient-to-br ${gradient} flex items-end`}>
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 pt-32">
          {/* Back link */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Work
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-medium">
              {project.category}
            </span>
            <span className="text-white/40 text-xs">{project.year}</span>
          </div>

          <h1 className="font-syne font-black text-display-lg text-white leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-white/70 text-xl leading-relaxed max-w-2xl">
            {project.longDescription}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-8 divide-x divide-border">
            {project.stats.map((stat) => (
              <div key={stat.label} className="text-center px-4 first:pl-0 last:pr-0">
                <div className="font-syne font-black text-3xl text-accent mb-1">{stat.value}</div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main narrative */}
          <div className="lg:col-span-2 space-y-16">
            {/* Problem */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-xs font-bold">!</span>
                </div>
                <h2 className="font-syne font-black text-2xl text-white">The Problem</h2>
              </div>
              <p className="text-text-secondary leading-relaxed text-base">{project.problem}</p>
            </section>

            {/* Solution */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-accent text-xs font-bold">✓</span>
                </div>
                <h2 className="font-syne font-black text-2xl text-white">The Solution</h2>
              </div>
              <p className="text-text-secondary leading-relaxed text-base">{project.solution}</p>
            </section>

            {/* Mockup preview */}
            <div className="rounded-2xl overflow-hidden border border-border bg-surface-2 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4 bg-white/5 rounded-full h-5 px-3 flex items-center">
                  <span className="text-white/30 text-[10px]">www.{project.slug}.com</span>
                </div>
              </div>
              {project.screenshot ? (
                <div className="rounded-xl overflow-hidden">
                  <img src={project.screenshot} alt={`${project.title} screenshot`} className="w-full h-auto object-cover" />
                </div>
              ) : (
                <div className={`h-60 rounded-xl bg-gradient-to-br ${gradient} p-6 flex flex-col gap-3`}>
                  <div className="h-8 bg-white/20 rounded-lg w-3/4 animate-pulse" />
                  <div className="h-4 bg-white/10 rounded w-full" />
                  <div className="h-4 bg-white/10 rounded w-5/6" />
                  <div className="flex gap-3 mt-2">
                    <div className="h-9 bg-orange-500/70 rounded-lg w-32" />
                    <div className="h-9 bg-white/10 rounded-lg w-24" />
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-auto">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-14 bg-white/10 rounded-lg" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <h2 className="font-syne font-black text-2xl text-white">The Results</h2>
              </div>
              <ul className="space-y-3">
                {project.results.map((result) => (
                  <li key={result} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-base">{result}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Process */}
            <div className="p-6 rounded-2xl bg-surface border border-border sticky top-28">
              <h3 className="font-syne font-bold text-white text-sm uppercase tracking-widest mb-5">
                Process
              </h3>
              <ol className="space-y-4">
                {project.process.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-text-secondary text-sm">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-syne font-bold text-white text-sm uppercase tracking-widest mb-4">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-surface-2 border border-border text-text-secondary text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={project.liveUrl}
                className="mt-6 flex w-full items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl text-sm transition-all duration-300"
              >
                View Live Site
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Next Project */}
      <div className="border-t border-border bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-text-muted text-xs uppercase tracking-widest mb-4">Next Project</p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex items-center justify-between"
          >
            <div>
              <h3 className="font-syne font-black text-display-sm text-white group-hover:text-accent transition-colors duration-300">
                {nextProject.title}
              </h3>
              <p className="text-text-secondary text-sm mt-1">{nextProject.category}</p>
            </div>
            <ArrowRight className="w-8 h-8 text-accent transition-transform group-hover:translate-x-2 duration-300" />
          </Link>
        </div>
      </div>
    </article>
  );
}
