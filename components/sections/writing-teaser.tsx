import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeader } from "@/components/primitives";
import { getPosts } from "@/lib/writing";

export function WritingTeaser() {
  const published = getPosts();

  return (
    <Section id="writing" className="rule">
      <SectionHeader
        index="05"
        eyebrow="Writing"
        title="Notes from the workbench"
        description="Technical write-ups as I learn them: detection queries, log behavior, and build logs."
      />
      {published.length > 0 ? (
        <ul className="divide-y divide-hairline border-y border-hairline">
          {published.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <li>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group flex flex-col gap-1 py-5"
                >
                  <span className="font-medium tracking-tight group-hover:text-signal">
                    {post.title}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {post.description}
                  </span>
                  <span className="label-mono">
                    {post.date} · {post.readingMinutes} min read
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      ) : (
        <Reveal>
          <div className="rounded-md border border-dashed border-hairline p-8 text-sm leading-relaxed text-muted-foreground">
            <p>
              Nothing published yet. A first draft is on the workbench: notes
              on reading Windows authentication logs like an analyst.
            </p>
            <p className="mt-3">
              <Link
                href="/writing"
                className="text-signal underline-offset-4 hover:underline"
              >
                See the writing section →
              </Link>
            </p>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
