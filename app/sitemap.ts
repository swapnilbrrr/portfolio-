import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/lib/data/projects";
import { getPosts } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/work",
    "/about",
    "/writing",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.featured)
    .map((p) => ({
      url: `${siteConfig.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const writingRoutes: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${siteConfig.url}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...writingRoutes];
}
