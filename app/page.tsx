import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { TechnicalFocus } from "@/components/sections/technical-focus";
import { ExperienceSection } from "@/components/sections/experience";
import { AboutSnapshot } from "@/components/sections/about-snapshot";
import { WritingTeaser } from "@/components/sections/writing-teaser";
import { Contact } from "@/components/sections/contact";
import { Container } from "@/components/primitives";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="rule border-t">
        <Container className="py-16 sm:py-20">
          <p className="label-mono mb-5">Now / {new Date().getFullYear()}</p>
          <p className="max-w-3xl text-balance text-xl leading-[1.6] font-light tracking-tight sm:text-[1.4rem]">
            Working as a SOC Analyst in Kathmandu: alert triage, log review,
            incident documentation. Building security tooling in the open,
            currently <strong className="font-normal">PhishScan</strong>, a
            local-first phishing email analyzer, and a KQL query library for
            Sentinel and Defender.
          </p>
        </Container>
      </div>

      <SelectedWork />
      <TechnicalFocus />
      <ExperienceSection />
      <AboutSnapshot />
      <WritingTeaser />
      <Contact />
    </>
  );
}
