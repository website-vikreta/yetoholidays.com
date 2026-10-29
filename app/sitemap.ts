import type { MetadataRoute } from "next";
import { destinations } from "@/lib/data";
import { site } from "@/lib/site";

const SITE_URL = site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/destinations", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/plan", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/cancellation-policy", priority: 0.2, changeFrequency: "yearly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const destinationRoutes = destinations.map((destination) => ({
    url: `${SITE_URL}/destinations/${destination.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...destinationRoutes];
}
