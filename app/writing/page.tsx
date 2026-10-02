import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { getPosts } from "@/lib/writing";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical notes from Swapnil Katuwal: security operations, detection queries and build logs.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing | Swapnil Katuwal",
    description: "Technical notes from the workbench.",
    url: `${siteConfig.url}/writing`,
  },
};

export default function WritingPage() {
  const posts = getPosts();

  return (
    <Section className="pt-28 sm:pt-36">
      <SectionHeader
        index="Writing"
        eyebrow="Notes & studies"
        title="What I learn goes here first"
        description="Short technical write-ups: log behavior, query patterns, and notes from building security tools. Quality over cadence."
      />

      {posts.length > 0 ? (
        <ol className="divide-y divide-hairline border-y border-hairline">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <li>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block py-7"
                >
                  <h3 className="text-lg font-medium tracking-tight group-hover:text-signal">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                  <p className="label-mono mt-3">
                    {post.date} · {post.readingMinutes} min read
                    {post.tags.length ? ` · ${post.tags.join(", ")}` : ""}
                  </p>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      ) : (
        <div className="max-w-2xl rounded-md border border-dashed border-hairline p-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nothing published yet. The first article is in draft on the
            workbench: reading Windows authentication logs like an analyst. It
            will appear here when it is finished, not before.
          </p>
          <p className="label-mono mt-5">Planned topics</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>
              Windows logon event IDs and building an authentication timeline
            </li>
            <li>KQL patterns from the detection library</li>
            <li>
              Inside email headers: SPF, DKIM and DMARC verdicts explained
            </li>
            <li>
              Notes from wiring an API key proxy so the browser never sees it
            </li>
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            Planned, not promised: dates will show when posts exist.
          </p>
        </div>
      )}
    </Section>
  );
}
