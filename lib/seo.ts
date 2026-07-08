import type { Metadata } from "next";

export const SITE_URL = "https://sabbir.website";
export const SITE_NAME = "Sabbir Hossain";
export const SITE_TITLE =
  "Sabbir Hossain — Web Developer & Conversion Specialist";
export const TWITTER_HANDLE = "@sabbir_dev";

export const DEFAULT_DESCRIPTION =
  "Hire Sabbir Hossain — a conversion-first WordPress and WooCommerce developer with 7+ years of experience building fast, SEO-ready websites, landing pages, and AI-powered digital experiences that help businesses grow worldwide.";

export const SEO_KEYWORDS = [
  "hire WordPress developer",
  "WordPress development services",
  "WooCommerce developer",
  "WooCommerce website developer",
  "conversion focused web design",
  "technical SEO for WordPress",
  "WordPress speed optimization",
  "custom WordPress theme developer",
  "landing page developer",
  "AI website development",
  "remote WordPress developer",
  "freelance web developer",
  "professional web development services",
  "WordPress maintenance",
  "Wix developer",
  "Squarespace developer",
  "Shopify developer",
  "Kajabi developer",
  "Shopify website developer",
  "Kajabi website developer",
  "Elementor developer",
  "Webflow developer",
  "e-commerce website developer",
  "business website designer",
  "conversion optimization specialist",
  "high converting websites",
];

export const PERSON = {
  name: "Sabbir Hossain",
  jobTitle: "Web Developer & Conversion Rate Optimization Specialist",
  email: "sabbirtlp@gmail.com",
  phone: "+8801879667166",
  location: "Dhaka, Bangladesh",
  image: `${SITE_URL}/opengraph-image`,
  sameAs: [
    "https://github.com/sabbirtlp",
    "https://www.linkedin.com/in/dev-sabbir-hossain/",
    "https://www.instagram.com/abutalha8479/",
  ],
  knowsAbout: [
    "WordPress Development",
    "WooCommerce",
    "Conversion Rate Optimization",
    "Technical SEO",
    "Core Web Vitals",
    "Elementor",
    "Webflow",
    "React",
    "Next.js",
    "E-Commerce",
    "Landing Page Design",
    "Website Speed Optimization",
  ],
};

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const allKeywords = [...new Set([...SEO_KEYWORDS, ...keywords])];

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "en_US",
      url,
      siteName: `${SITE_NAME} Portfolio`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: TWITTER_HANDLE,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
          },
        },
  };
}

export function buildGlobalSchemaGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PERSON.name,
        url: SITE_URL,
        image: PERSON.image,
        jobTitle: PERSON.jobTitle,
        email: PERSON.email,
        telephone: PERSON.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
        sameAs: PERSON.sameAs,
        knowsAbout: PERSON.knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${SITE_NAME} — Web Developer Portfolio`,
        description: DEFAULT_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        author: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: `${PERSON.name} — Web Development Services`,
        url: SITE_URL,
        image: PERSON.image,
        description: DEFAULT_DESCRIPTION,
        email: PERSON.email,
        telephone: PERSON.phone,
        priceRange: "$$",
        areaServed: { "@type": "Place", name: "Worldwide" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
        founder: { "@id": `${SITE_URL}/#person` },
        sameAs: PERSON.sameAs,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: PERSON.email,
          telephone: PERSON.phone,
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "WordPress Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "WooCommerce Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Conversion Rate Optimization",
              },
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Technical SEO" },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Website Speed Optimization",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Elementor & Webflow Design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Wix & Squarespace Website Design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Shopify Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Kajabi Website Development",
              },
            },
          ],
        },
      },
    ],
  };
}

export function buildServiceSchema(service: {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
}) {
  const url = absoluteUrl(`/services/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}/#service`,
        name: service.title,
        description: service.longDescription || service.description,
        url,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: { "@type": "Place", name: "Worldwide" },
        serviceType: service.title,
        image: PERSON.image,
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/#services" },
        { name: service.title, path: `/services/${service.slug}` },
      ]),
    ],
  };
}

export function buildCaseStudySchema(project: {
  title: string;
  slug: string;
  longDescription: string;
  category: string;
  year: string;
  image?: string;
  tags?: string[];
}) {
  const url = absoluteUrl(`/work/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}/#article`,
        headline: `${project.title} — Case Study`,
        description: project.longDescription,
        url,
        image: project.image ? absoluteUrl(project.image) : PERSON.image,
        datePublished: `${project.year}-01-01`,
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        articleSection: project.category,
        keywords: project.tags?.join(", "),
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: project.title, path: `/work/${project.slug}` },
      ]),
    ],
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildAggregateRatingSchema(
  reviewCount: number,
  ratingValue = 5,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: `${PERSON.name} — Web Development Services`,
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      ratingCount: reviewCount,
      reviewCount,
    },
  };
}
