import { notFound } from "next/navigation";
import { getContent } from "@/lib/storage";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Layout, 
  ShoppingCart, 
  Zap, 
  Search, 
  Palette, 
  RefreshCw, 
  BarChart3,
  Rocket
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const ICON_MAP: Record<string, any> = {
  Globe, Layout, ShoppingCart, Zap, Search, Palette, RefreshCw, BarChart3
};

export async function generateStaticParams() {
  const content = await getContent();
  if (!content || !content.services) return [];
  return content.services.map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const service = content?.services?.find((s: any) => s.slug === slug);
  
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.title} — Services | Sabbir Hossain`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = await getContent();
  const service = content?.services?.find((s: any) => s.slug === slug);

  if (!service) notFound();

  const Icon = ICON_MAP[service.icon] || Globe;
  const relatedProjects = content?.projects?.filter((p: any) => 
    p.category?.toLowerCase()?.includes(service.title?.toLowerCase()?.split(' ')[0]) ||
    p.tags?.some((t: string) => t.toLowerCase().includes(slug.split('-')[0]))
  )?.slice(0, 2);

  return (
    <article className="min-h-screen bg-background relative pt-32 md:pt-40">
      {/* Immersive background */}
      <div className={`absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-accent/20 to-transparent blur-[120px] pointer-events-none`} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="max-w-4xl">
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-12"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-widest font-bold">Back to Services</span>
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center shadow-2xl">
              <Icon className="w-8 h-8 text-accent" />
            </div>
            {service.highlight && (
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
                    {service.highlight}
                </span>
            )}
          </div>

          <h1 className="font-syne font-black text-5xl sm:text-7xl md:text-8xl text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            {service.title}
          </h1>
          
          <p className="text-white/70 text-xl md:text-2xl leading-relaxed max-w-3xl font-medium">
            {service.longDescription}
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-surface border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">What you get</p>
            <h2 className="font-syne font-black text-3xl md:text-5xl text-white">Core Pillars of Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(service.features || []).map((feature: string) => (
              <div key={feature} className="p-8 rounded-2xl bg-surface-2 border border-border hover:border-accent/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-accent group-hover:text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{feature}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                    Meticulously engineered to ensure your digital presence is not only beautiful but also high-performing and scalable.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Projects (if any) */}
      {relatedProjects && relatedProjects.length > 0 && (
        <div className="py-24 max-w-7xl mx-auto px-6">
            <div className="mb-12 flex justify-between items-end gap-6 flex-wrap">
                <div>
                    <p className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">Our Work</p>
                    <h2 className="font-syne font-black text-3xl md:text-5xl text-white">Service in Action</h2>
                </div>
                <Link href="/#work" className="text-text-muted hover:text-accent font-bold text-sm flex items-center gap-2 group transition-colors">
                    View All Projects
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedProjects.map((project: any) => (
                    <Link key={project.slug} href={`/work/${project.slug}`} className="group relative rounded-3xl overflow-hidden border border-border aspect-video">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                            <h3 className="font-syne font-black text-2xl text-white mb-2">{project.title}</h3>
                            <p className="text-white/60 text-sm">{project.category}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      )}

      {/* Final CTA */}
      <div className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-8">
            <Rocket className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <h2 className="font-syne font-black text-4xl md:text-7xl text-white mb-8">Ready to Scale Your Business?</h2>
          <p className="text-text-secondary text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Let's discuss how my expert {service.title} can transform your digital strategy and deliver measurable ROI.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-4 px-10 py-5 bg-accent hover:bg-accent-light text-white font-bold rounded-full transition-all duration-300 text-lg glow-accent"
          >
            Schedule a Free Consultation
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </article>
  );
}
