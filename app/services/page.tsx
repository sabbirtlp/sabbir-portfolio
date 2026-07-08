import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PremiumGlowCard from "@/components/ui/PremiumGlowCard";
import { getContent } from "@/lib/storage";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const defaultDescription =
    content?.servicesPage?.description ||
    "Explore professional web development services for WordPress, WooCommerce, Shopify, Wix, Squarespace, Kajabi, and AI-powered websites, all built to convert and rank.";

  return createPageMetadata({
    title: "Services — Web Development Solutions",
    description: defaultDescription,
    path: "/services",
    keywords: [
      "web development services",
      "WordPress services",
      "WooCommerce services",
      "Shopify development",
      "Wix website design",
      "Squarespace website design",
      "Kajabi website development",
      "technical SEO services",
      "conversion focused web design",
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
      "From WordPress and WooCommerce to Shopify, Wix, Squarespace, and Kajabi — I build websites and digital experiences that are fast, secure, and SEO-ready.",
    introText:
      "Browse the services below to find the right website strategy for your business, whether you need an e-commerce platform, a conversion-focused landing page, or a custom CMS solution.",
  };

  return (
    <main className="min-h-screen bg-background pt-28 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <section className="text-center mb-20">
          <p className="text-accent text-[10px] uppercase tracking-[0.28em] font-bold mb-4">
            Services
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
            <p className="text-text-secondary/70 text-sm md:text-base max-w-3xl mx-auto mt-6">
              {page.introText}
            </p>
          )}
        </section>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service: any) => (
            <PremiumGlowCard key={service.slug}>
              {service.highlight && (
                <span className="absolute top-6 right-6 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold uppercase tracking-[0.24em] border border-accent/20">
                  {service.highlight}
                </span>
              )}
              <div className="mb-6">
                <h2 className="font-syne font-semibold text-xl text-text-primary mb-3">
                  {service.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-[0.24em]"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </PremiumGlowCard>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-text-secondary text-sm md:text-base max-w-2xl">
            Want help choosing the best solution for your business? I can help
            you pick the right platform and build a website that performs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-10 py-4 text-sm font-bold text-white transition hover:bg-accent-light"
          >
            Schedule a free consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
