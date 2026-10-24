import { MetadataRoute } from "next";
import { PARENT_ARTICLES } from "@/data/doctorData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drabhishekanand.in";
  const staticDate = new Date("2026-10-24T00:00:00.000Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${baseUrl}/about`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/services`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/parent-information`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: `${baseUrl}/clinic`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: staticDate,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${baseUrl}/medical-disclaimer`,
      lastModified: staticDate,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];

  const articleRoutes: MetadataRoute.Sitemap = PARENT_ARTICLES.map((article) => ({
    url: `${baseUrl}/parent-information/${article.slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly",
    priority: 0.75
  }));

  return [...staticRoutes, ...articleRoutes];
}
