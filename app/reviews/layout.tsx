import type { Metadata } from "next";
import { getContent } from "@/lib/storage";
import { buildAggregateRatingSchema, createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = createPageMetadata({
  title: "Client Reviews & Testimonials — Sabbir Hossain",
  description:
    "Read 100+ verified client reviews from businesses worldwide. Trusted WordPress developer for high-converting websites, WooCommerce stores, and technical SEO.",
  path: "/reviews",
  keywords: [
    "WordPress developer reviews",
    "freelance web developer testimonials",
    "conversion focused website reviews",
    "WooCommerce developer testimonials",
    "remote WordPress developer reviews",
  ],
});

export default async function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  const testimonials = content?.testimonials ?? [];
  const reviewCount = testimonials.length;

  return (
    <>
      {reviewCount > 0 && (
        <JsonLd data={buildAggregateRatingSchema(reviewCount)} />
      )}
      {children}
    </>
  );
}
