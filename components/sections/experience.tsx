import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeader } from "@/components/primitives";
import { experience } from "@/lib/data/experience";

export function ExperienceSection() {
  return (
    <Section id="experience" className="rule">
      <SectionHeader
        index="03"
        eyebrow="Experience"
        title="Where I've worked"
      />
      <ol className="relative ml-1 border-l border-hairline pl-8 sm:pl-10">
        {experience.map((entry, i) => (
          <Reveal key={entry.id} delay={i * 0.08}>
            <li className="relative pb-12 last:pb-0">
              <span
                className="absolute top-1.5 -left-[37px] size-2.5 rounded-full border-2 border-signal bg-background sm:-left-[45px]"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg font-medium tracking-tight">
                  {entry.role} ·{" "}
                  <span className="text-muted-foreground">
                    {entry.organization}
                  </span>
                </h3>
                <p className="label-mono tabular-nums">
                  {entry.current ? (
                    <span className="text-signal">● {entry.period}</span>
                  ) : (
                    entry.period
                  )}
                </p>
              </div>
              {entry.location ? (
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {entry.location}
                </p>
              ) : null}
              <ul className="mt-4 space-y-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                {entry.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
