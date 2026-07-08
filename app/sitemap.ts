import type { MetadataRoute } from "next";
import { getContent } from "@/lib/storage";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const servicePages: MetadataRoute.Sitemap =
    content?.services?.map((service: { slug: string }) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })) ?? [];

  const workPages: MetadataRoute.Sitemap =
    content?.projects?.map((project: { slug: string; year?: string }) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: project.year ? new Date(`${project.year}-06-01`) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) ?? [];

  return [...staticPages, ...servicePages, ...workPages];
}
