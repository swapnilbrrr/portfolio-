import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ContactForm } from "@/components/sections/contact-form";
import { Section, SectionHeader } from "@/components/primitives";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  const channels = [
    {
      href: `mailto:${siteConfig.email}`,
      label: "Email",
      value: siteConfig.email,
      icon: Mail,
      external: false,
    },
    {
      href: siteConfig.links.github,
      label: "GitHub",
      value: "@swapnilbrrr",
      icon: GithubIcon,
      external: true,
    },
    {
      href: siteConfig.links.linkedin,
      label: "LinkedIn",
      value: "in/swapnil-katuwal",
      icon: LinkedinIcon,
      external: true,
    },
  ];

  return (
    <Section id="contact">
      <SectionHeader
        index="06"
        eyebrow="Contact"
        title="Open to the right problem"
        description="A question about something on this page, a security engineering discussion, or a collaboration. The form goes straight to my inbox, or pick a channel below."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-px overflow-hidden rounded-md border border-hairline bg-hairline lg:col-span-2">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-1 flex-col justify-center gap-1 bg-background p-6 transition-colors hover:bg-surface-raised"
            >
              <c.icon
                className="size-5 text-muted-foreground transition-colors group-hover:text-signal"
                aria-hidden="true"
              />
              <span className="label-mono">{c.label}</span>
              <span className="text-sm font-medium break-all">{c.value}</span>
            </a>
          ))}
        </div>
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
