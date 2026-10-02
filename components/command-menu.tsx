"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ExternalLink,
  FileDown,
  Home,
  Info,
  Mail,
  SearchCode,
  SunMoon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { GithubIcon } from "@/components/icons";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { siteConfig } from "@/lib/site-config";

export function useCommandMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return { open, setOpen };
}

export function CommandMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("http"))
      window.open(href, "_blank", "noopener,noreferrer");
    else router.push(href);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command menu"
      description="Jump to a page or action"
    >
      <Command>
        <CommandInput placeholder="Type a page or action…" />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem value="home" onSelect={() => go("/")}>
              <Home /> Home
            </CommandItem>
            <CommandItem value="work" onSelect={() => go("/work")}>
              <SearchCode /> Work
            </CommandItem>
            <CommandItem value="about" onSelect={() => go("/about")}>
              <Info /> About
            </CommandItem>
            <CommandItem value="writing" onSelect={() => go("/writing")}>
              <BookOpen /> Writing
            </CommandItem>
            <CommandItem value="contact" onSelect={() => go("/#contact")}>
              <Mail /> Contact
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem
              value="resume"
              onSelect={() => go(siteConfig.resumeUrl)}
            >
              <FileDown /> Resume (PDF)
            </CommandItem>
            <CommandItem
              value="github"
              onSelect={() => go(siteConfig.links.github)}
            >
              <GithubIcon /> GitHub <CommandShortcut>ext</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="linkedin"
              onSelect={() => go(siteConfig.links.linkedin)}
            >
              <ExternalLink /> LinkedIn <CommandShortcut>ext</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="theme"
              onSelect={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
                setOpen(false);
              }}
            >
              <SunMoon /> Toggle theme
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
