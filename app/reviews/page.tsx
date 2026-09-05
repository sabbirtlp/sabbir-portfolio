import type { Metadata } from "next";
import { createPageMetadata, buildAggregateRatingSchema } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import ReviewsClient from "./ReviewsClient";
import contentData from "@/data/site-content.json";

export const metadata: Metadata = createPageMetadata({
  title: "Client Reviews & Testimonials | Sabbir Hossain",
  description:
    "Read genuine reviews and testimonials from business owners and founders worldwide who scaled their revenue with Sabbir Hossain's web development services.",
  path: "/reviews",
  keywords: [
    "Sabbir Hossain reviews",
    "WordPress developer testimonials",
    "web developer client reviews",
    "freelance developer rating",
    "client satisfaction web design",
  ],
});

export default function ReviewsPage() {
  const reviewCount = contentData.testimonials?.length || 20;
  return (
    <>
      <JsonLd data={buildAggregateRatingSchema(reviewCount, 4.9)} />
      <ReviewsClient />
    </>
  );
}
