import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://events.matrixed.ru",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
