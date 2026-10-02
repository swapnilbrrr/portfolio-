import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { Container } from "@/components/primitives";
import { getPost, getPosts } from "@/lib/writing";
import { siteConfig } from "@/lib/site-config";

const previewDrafts = process.env.NODE_ENV === "development";

function findPost(slug: string, includeDrafts: boolean) {
  const found = getPost(slug);
  if (!found) return undefined;
  if (found.post.draft && !includeDrafts) return undefined;
  return found;
}

export function generateStaticParams() {
  return getPosts(previewDrafts).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findPost(slug, previewDrafts);
  if (!found) return {};
  return {
    title: found.post.title,
    description: found.post.description,
    alternates: { canonical: `/writing/${found.post.slug}` },
    openGraph: {
      title: `${found.post.title} | ${siteConfig.name}`,
      description: found.post.description,
      url: `${siteConfig.url}/writing/${found.post.slug}`,
      type: "article",
    },
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findPost(slug, previewDrafts);
  if (!found) notFound();
  const { post, content } = found;

  return (
    <article className="pb-24">
      <Container className="max-w-2xl pt-28 sm:pt-32">
        <Link
          href="/writing"
          className="label-mono inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" /> Writing
        </Link>
        <header className="mt-8 border-b border-hairline pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-muted-foreground">{post.description}</p>
          <p className="label-mono mt-6 tabular-nums">
            {post.date} · {post.readingMinutes} min read
            {post.draft ? " · draft" : ""}
          </p>
          {post.tags.length ? (
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
              {post.tags.map((t) => `#${t}`).join("  ")}
            </p>
          ) : null}
        </header>
        <div className="prose-writing mt-10">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeHighlight, { ignoreMissing: true }],
                ],
              },
            }}
          />
        </div>
      </Container>
    </article>
  );
}
