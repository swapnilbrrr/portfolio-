import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader, Tag } from "@/components/primitives";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Swapnil Katuwal: security tooling, web platforms and detection studies, with source repositories.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Swapnil Katuwal",
    description:
      "Security tooling, web platforms and detection studies, with source repositories.",
    url: `${siteConfig.url}/work`,
  },
};

function ProjectRow({
  title,
  summary,
  year,
  technologies,
  href,
  githubUrl,
  index,
}: {
  title: string;
  summary: string;
  year: number;
  technologies: string[];
  href?: string;
  githubUrl?: string;
  index: string;
}) {
  const inner = (
    <div className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr_9rem] sm:gap-6 sm:py-8">
      <span className="label-mono text-signal/80 tabular-nums">{index}</span>
      <div>
        <h3 className="flex items-center gap-2 text-lg font-medium tracking-tight group-hover:text-signal">
          {title}
          <ArrowUpRight
            className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {technologies.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <span className="label-mono self-start tabular-nums sm:text-right">
        {year}
      </span>
    </div>
  );

  return (
    <li className="group">
      {href ? (
        <Link href={href}>{inner}</Link>
      ) : githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus-visible:outline-none [&:focus-visible]:outline-2 [&:focus-visible]:outline-offset-4 [&:focus-visible]:outline-signal"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

export default function WorkPage() {
  return (
    <Section className="pt-28 sm:pt-36">
      <SectionHeader
        index="Work"
        eyebrow="2025 to 2026"
        title="Everything I've shipped"
        description="Real repositories, honest scopes. Retired experiments stay off this list."
      />
      <ol className="divide-y divide-hairline border-y border-hairline">
        {projects.map((p, i) => (
          <ProjectRow
            key={p.id}
            index={String(i + 1).padStart(2, "0")}
            title={p.title}
            summary={p.summary}
            year={p.year}
            technologies={p.technologies}
            href={p.featured ? `/work/${p.slug}` : undefined}
            githubUrl={p.featured ? undefined : p.githubUrl}
          />
        ))}
      </ol>
      <p className="mt-8 text-sm text-muted-foreground">
        Featured projects have case studies. Older coursework and experiments
        link straight to their repositories.
      </p>
    </Section>
  );
}
