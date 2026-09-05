import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Layout,
  ShoppingCart,
  Zap,
  Search,
  Palette,
  RefreshCw,
  BarChart3,
  Bot,
  Code2,
  Wand2,
  Layers,
  Store,
  Gauge,
  Server,
  ShieldCheck,
  Shield,
  Briefcase,
  UserCheck,
  ShoppingBag,
  HeartPulse,
  Terminal,
  ArrowRight,
} from "lucide-react";
import PremiumGlowCard from "@/components/ui/PremiumGlowCard";
import { getContent } from "@/lib/storage";
import { createPageMetadata } from "@/lib/seo";

const ICON_MAP: Record<string, any> = {
  Globe,
  Layout,
  ShoppingCart,
  Zap,
  Search,
  Palette,
  RefreshCw,
  BarChart3,
  Bot,
  Code2,
  Wand2,
  Layers,
  Store,
  Gauge,
  Server,
  ShieldCheck,
  Shield,
  Briefcase,
  UserCheck,
  ShoppingBag,
  HeartPulse,
  Terminal,
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const defaultDescription =
    content?.servicesPage?.description ||
    "Explore professional web development services for WordPress, WooCommerce, Shopify, Wix, Squarespace, and high-converting websites built to convert and rank.";

  return createPageMetadata({
    title: "WordPress & CMS Web Development Services | Sabbir Hossain",
    description: defaultDescription,
    path: "/services",
    keywords: [
      "WordPress website design",
      "WordPress speed optimization",
      "WordPress security and malware removal",
      "Elementor Pro development",
      "WooCommerce store development",
      "high-converting landing pages",
      "Shopify store development",
      "web development services",
    ],
  });
}

export default async function ServicesPage() {
  const content = await getContent();
  const services = content?.services ?? [];
  const page = content?.servicesPage ?? {
    heading: "Services That Drive Growth",
    subheading:
      "High-performance web development services built to convert visitors into customers.",
    description:
      "From custom WordPress builds and speed optimization to Shopify, Webflow, and bespoke PHP solutions — explore the full catalog of services engineered for revenue and growth.",
    introText:
      "Browse the complete service offerings below. Every solution is delivered with clean architecture, Core Web Vitals optimization, and conversion-focused UX.",
  };

  return (
    <main className="min-h-screen bg-background pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <section className="text-center mb-20">
          <p className="text-accent text-[10px] uppercase tracking-[0.28em] font-bold mb-4">
            Full Service Catalog ({services.length} Solutions)
          </p>
          <h1 className="font-syne font-black text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-6">
            {page.heading}
          </h1>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto mb-4">
            {page.subheading}
          </p>
          <p className="text-text-secondary/80 text-sm md:text-base max-w-3xl mx-auto">
            {page.description}
          </p>
          {page.introText && (
            <p className="text-text-secondary/70 text-sm md:text-base max-w-3xl mx-auto mt-4">
              {page.introText}
            </p>
          )}
        </section>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service: any) => {
            const Icon = ICON_MAP[service.icon] || Globe;
            return (
              <PremiumGlowCard key={service.slug}>
                {service.highlight && (
                  <span className="absolute top-6 right-6 px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-semibold uppercase tracking-[0.2em] border border-accent/25">
                    {service.highlight}
                  </span>
                )}
                
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-surface border border-text-primary/10 flex items-center justify-center mb-6 group-hover:border-accent/50 transition-all duration-300">
                  <Icon className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>

                <div className="mb-6">
                  <Link href={`/services/${service.slug}`}>
                    <h2 className="font-syne font-semibold text-xl text-text-primary mb-3 hover:text-accent transition-colors duration-200">
                      {service.title}
                    </h2>
                  </Link>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-text-primary/5 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-[0.2em] hover:text-accent-light transition-colors group/link"
                  >
                    Explore Service
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </PremiumGlowCard>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col items-center gap-4 text-center">
          <p className="text-text-secondary text-sm md:text-base max-w-2xl">
            Need a custom combination or ongoing retainer? Let's discuss a tailored website strategy that fits your exact growth goals.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-10 py-4 text-sm font-bold text-white transition hover:bg-accent-light shadow-[0_0_25px_rgba(234,88,12,0.3)]"
          >
            Schedule a Free Consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
