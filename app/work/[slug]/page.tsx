import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Container, Tag } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { getProject, projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site-config";
import type { Project } from "@/lib/types";

export function generateStaticParams() {
  return projects.filter((p) => p.featured).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.featured) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      url: `${siteConfig.url}/work/${project.slug}`,
      type: "article",
    },
  };
}

function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="label-mono mb-4 text-signal">
        {title}
      </h2>
      <div className="max-w-2xl space-y-4 leading-relaxed text-foreground/85">
        {children}
      </div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.featured) notFound();

  const p: Project = project;

  return (
    <article className="pb-24">
      <Container className="pt-28 sm:pt-32">
        <Link
          href="/work"
          className="label-mono inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" /> Work
        </Link>

        <header className="mt-8 border-b border-hairline pb-10">
          <p className="label-mono mb-4">
            {p.category} · {p.year} ·{" "}
            <span className={p.status === "active" ? "text-signal" : ""}>
              {p.status}
            </span>
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
            {p.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {p.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {p.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {p.githubUrl ? (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  className: "rounded-md",
                })}
              >
                <GithubIcon className="size-4" aria-hidden="true" /> Repository
              </a>
            ) : null}
            {p.liveUrl ? (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  className: "rounded-md",
                })}
              >
                <ExternalLink className="size-4" aria-hidden="true" /> Live
              </a>
            ) : null}
          </div>
        </header>

        <div className="grid gap-x-16 lg:grid-cols-[2fr_1fr]">
          <div>
            {p.context ? (
              <Reveal>
                <CaseSection id="context" title="Why this exists">
                  <p>{p.context}</p>
                </CaseSection>
              </Reveal>
            ) : null}
            {p.problem ? (
              <Reveal>
                <CaseSection id="problem" title="Problem">
                  <p>{p.problem}</p>
                </CaseSection>
              </Reveal>
            ) : null}
            {p.architecture ? (
              <Reveal>
                <CaseSection id="architecture" title="Architecture">
                  <p>{p.architecture}</p>
                </CaseSection>
              </Reveal>
            ) : null}
            {p.implementation?.length ? (
              <Reveal>
                <CaseSection id="implementation" title="Implementation">
                  <ul className="space-y-2">
                    {p.implementation.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-signal/70"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CaseSection>
              </Reveal>
            ) : null}
            {p.currentState ? (
              <Reveal>
                <CaseSection id="current-state" title="Current state">
                  <p>{p.currentState}</p>
                </CaseSection>
              </Reveal>
            ) : null}
          </div>

          <aside className="mt-12 lg:mt-28">
            {p.securityConcepts?.length ? (
              <Reveal>
                <div className="border-t-2 border-signal/60 pt-5">
                  <h2 className="label-mono mb-3">Concepts exercised</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {p.securityConcepts.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}
            {p.tags?.length ? (
              <div className="mt-8 border-t border-hairline pt-5">
                <h2 className="label-mono mb-3">Tags</h2>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </Container>
    </article>
  );
}
