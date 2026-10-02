import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { WritingPost } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");

function postFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
}

/**
 * Returns a post even when it is a draft, so detail pages can render
 * content-collections-validated slugs; listings filter drafts out.
 */
export function getPosts(includeDrafts = false): WritingPost[] {
  return postFiles()
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        draft: Boolean(data.draft),
        readingMinutes: Math.max(1, Math.round(words / 220)),
      } satisfies WritingPost;
    })
    .filter((p) => (includeDrafts ? true : !p.draft))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(
  slug: string,
): { post: WritingPost; content: string } | undefined {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    post: {
      slug,
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      draft: Boolean(data.draft),
      readingMinutes: Math.max(1, Math.round(words / 220)),
    },
    content,
  };
}
