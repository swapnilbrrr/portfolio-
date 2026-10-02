import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { certifications, education, experience } from "@/lib/data/experience";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Swapnil Katuwal is: a security-focused engineer in Kathmandu working SOC operations by day and building tools alongside.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Swapnil Katuwal",
    description:
      "A security-focused engineer working SOC operations by day and building tools alongside.",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-28 sm:pt-36">
        <div className="max-w-2xl">
          <p className="label-mono mb-6 text-signal">About</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
            I would rather build the detector than admire the dashboard.
          </h1>
          <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
            <p>
              I am Swapnil, a BSc IT student (Network &amp; Security focus) in
              Kathmandu, working as a SOC Analyst at Cryptogen Nepal. My
              day job is alert triage, SIEM log review and incident
              documentation: deciding quickly what is real.
            </p>
            <p>
              The route here was indirect on purpose. A quality-assurance
              internship at Midas Health Services taught me procedural rigor:
              reproduce, document, prioritize. That is most of incident response
              already. I moved toward security because it asks the same
              questions under pressure: what happened, how do we know, what do
              we do next?
            </p>
            <p>
              What I keep building sits where security and engineering overlap:
              a phishing header analyzer that never ships your email to a third
              party, a Python port scanner written to understand the TCP
              handshakes it exploits, an ASP.NET learning platform with a real
              relational model behind it.
            </p>
            <p>
              Direction: security engineering and detection work, the design
              and construction of defenses, not only their operation. Early
              career, fast trajectory, everything on this site is public and
              verifiable.
            </p>
          </div>
        </div>
      </Section>

      <div className="rule border-t bg-surface/40">
        <Container className="py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            <Reveal>
              <h2 className="label-mono mb-3">Location</h2>
              <p className="text-sm leading-relaxed">{siteConfig.location}</p>
              <p className="label-mono mt-1">{siteConfig.timezone}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="label-mono mb-3">Currently</h2>
              <p className="text-sm leading-relaxed">{siteConfig.role}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {education.degree}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 className="label-mono mb-3">Elsewhere</h2>
              <p className="space-x-3 text-sm">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal underline-offset-4 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal underline-offset-4 hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-signal underline-offset-4 hover:underline"
                >
                  Email
                </a>
              </p>
            </Reveal>
          </div>
        </Container>
      </div>

      <Section>
        <SectionHeader
          index="Track"
          eyebrow="Record"
          title="Experience & education"
        />
        <div className="max-w-2xl space-y-8">
          {experience.map((e) => (
            <Reveal key={e.id}>
              <div>
                <h3 className="font-medium tracking-tight">
                  {e.role} at {e.organization}
                </h3>
                <p className="label-mono mt-1">
                  {[e.period, e.location].filter(Boolean).join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div>
              <h3 className="font-medium tracking-tight">{education.degree}</h3>
              <p className="label-mono mt-1">
                {education.institution} · {education.period}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14">
          <h2 className="label-mono mb-4">Certifications</h2>
          <ul className="max-w-2xl divide-y divide-hairline border-y border-hairline text-sm">
            {certifications.map((c) => (
              <li
                key={c.id}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <span>{c.name}</span>
                <span className="label-mono shrink-0">
                  {c.status === "in-progress" ? (
                    <span className="text-signal">in progress</span>
                  ) : (
                    [c.issuer, c.date].filter(Boolean).join(" · ")
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Prefer the document version?{" "}
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener"
            className="text-signal underline-offset-4 hover:underline"
          >
            Download my resume (PDF)
          </a>{" "}
          or write to{" "}
          <Link
            href="/#contact"
            className="text-signal underline-offset-4 hover:underline"
          >
            me directly
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
