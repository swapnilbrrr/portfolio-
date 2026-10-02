import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProjectPreviewPanel } from "@/components/project-preview";
import { Section, SectionHeader, Tag } from "@/components/primitives";
import { featuredProjects } from "@/lib/data/projects";

export function SelectedWork() {
  return (
    <Section id="work" className="rule">
      <SectionHeader
        index="01"
        eyebrow="Selected work"
        title="Things I built, and why"
        description="Each of these started as a question I could not answer by reading alone."
      />
      <div className="divide-y divide-hairline border-y border-hairline">
        {featuredProjects().map((project, i) => (
          <Reveal key={project.id} delay={i * 0.06}>
            <article className="group relative">
              <Link
                href={`/work/${project.slug}`}
                className="grid gap-4 py-8 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6 sm:py-10"
              >
                <span className="label-mono text-signal/80 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                    <span className="bg-gradient-to-r from-signal to-signal bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                      {project.title}
                    </span>
                    <span className="sr-only">, view case study</span>
                  </h3>
                  <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                    <span className="label-mono ml-auto self-center sm:hidden">
                      {project.year}
                    </span>
                  </div>
                  {project.preview ? (
                    <ProjectPreviewPanel
                      preview={project.preview}
                      className="mt-5 max-w-2xl"
                    />
                  ) : null}
                </div>
                <div className="hidden items-center gap-4 sm:flex">
                  <span className="label-mono tabular-nums">
                    {project.year}
                  </span>
                  <ArrowUpRight
                    className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-sm">
        <Link
          href="/work"
          className="text-signal underline-offset-4 hover:underline"
        >
          All projects →
        </Link>
      </p>
    </Section>
  );
}
