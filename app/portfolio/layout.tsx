import type { Metadata } from "next";
import { getContent } from "@/lib/storage";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio — Conversion-Focused WordPress & WooCommerce Case Studies",
  description:
    "Explore 22+ high-performance website case studies for construction, law firms, e-commerce, healthcare, and consulting. Every project is built for conversions, speed, and SEO visibility.",
  path: "/portfolio",
  keywords: [
    "WordPress portfolio",
    "web development case studies",
    "WooCommerce portfolio",
    "conversion focused websites",
    "business website examples",
    "high converting website portfolio",
  ],
});

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  const projects = content?.projects ?? [];

  const itemListSchema =
    projects.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Web Development Portfolio",
          description: "Case studies and projects by Sabbir Hossain",
          url: absoluteUrl("/portfolio"),
          numberOfItems: projects.length,
          itemListElement: projects.map(
            (project: { title: string; slug: string }, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.title,
              url: absoluteUrl(`/work/${project.slug}`),
            }),
          ),
        }
      : null;

  return (
    <>
      {itemListSchema && <JsonLd data={itemListSchema} />}
      {children}
    </>
  );
}
