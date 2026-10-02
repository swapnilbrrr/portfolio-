import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/primitives";
import { certifications, education } from "@/lib/data/experience";

export function AboutSnapshot() {
  return (
    <Section id="about" className="rule">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <div className="mb-4 flex items-center gap-4">
            <span className="label-mono text-signal">04</span>
            <span className="h-px w-10 bg-hairline" aria-hidden="true" />
            <span className="label-mono">About</span>
          </div>
          <p className="text-balance text-2xl leading-snug font-light tracking-tight sm:text-[1.75rem]">
            I am a BSc IT student in Kathmandu who spends the week between two
            worlds: a{" "}
            <strong className="font-normal text-signal">SOC desk</strong>, where
            signals become decisions, and a{" "}
            <strong className="font-normal text-signal">keyboard</strong>, where
            recurring problems become tools.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            QA internships taught me procedural discipline; SOC operations
            taught me what to look for. I am heading toward security
            engineering, building the detection and response systems
            themselves, not just operating them.
          </p>
          <p className="mt-8">
            <Link
              href="/about"
              className="text-signal underline-offset-4 hover:underline"
            >
              More about me →
            </Link>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-t border-hairline pt-6">
            <h3 className="label-mono">Education</h3>
            <p className="mt-2 text-sm leading-relaxed">
              {education.degree}
              <span className="block text-muted-foreground">
                {education.institution}, {education.location}
              </span>
              <span className="block font-mono text-xs text-muted-foreground tabular-nums">
                {education.period}
              </span>
            </p>
          </div>
          <div className="mt-8 border-t border-hairline pt-6">
            <h3 className="label-mono">Certifications</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {certifications.map((c) => (
                <li
                  key={c.id}
                  className="flex items-baseline justify-between gap-3"
                >
                  <span>{c.name}</span>
                  <span className="label-mono shrink-0">
                    {c.status === "in-progress" ? (
                      <span className="text-signal">in progress</span>
                    ) : (
                      (c.date ?? c.issuer ?? "")
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
