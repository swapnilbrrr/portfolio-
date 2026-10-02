import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeader } from "@/components/primitives";
import { capabilities } from "@/lib/data/experience";

export function TechnicalFocus() {
  return (
    <Section id="focus" className="rule">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeader
            index="02"
            eyebrow="Technical focus"
            title="Security is a systems problem"
            description="I keep one foot in operations and one in code: triage teaches me what to look for; building teaches me how the thing being looked at actually works."
          />
          <Reveal>
            <p className="label-mono leading-relaxed">
              Detection engineering ← SOC operations ← networks ← operating
              systems ← the code that runs on all of them
            </p>
          </Reveal>
        </div>
        <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2">
          {capabilities.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col gap-3 bg-background p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-foreground">
                    {group.title}
                  </h3>
                  <span className="label-mono">{group.note}</span>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        className="mt-[9px] size-1 shrink-0 rounded-full bg-signal/70"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
