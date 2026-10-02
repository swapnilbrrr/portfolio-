"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCommandMenu, CommandMenu } from "@/components/command-menu";

function Monogram() {
  return (
    <Link
      href="/"
      aria-label="Swapnil Katuwal, home"
      className="group inline-flex items-center gap-2.5"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="text-signal"
      >
        <rect
          x="1.5"
          y="1.5"
          width="21"
          height="21"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8.2 9.2c-.7-.8-1.8-1.1-2.8-.8-1.3.4-1.9 1.8-1.2 2.9.5.8 1.6 1.2 3 1.5 1.6.3 2.8.8 3.3 1.9.7 1.4-.2 3-1.8 3.4-1.3.3-2.6-.1-3.4-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M13.4 8v8.8M19.6 8l-6.2 4.4M14.6 11.6 19.6 17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-mono text-[13px] font-medium tracking-tight text-foreground">
        swapnil<span className="text-muted-foreground">.katuwal</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cmd = useCommandMenu();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.replace(/#.*$/, "")) && href !== "/#contact";

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-surface px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled || menuOpen
            ? "border-b border-hairline bg-background/85 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5 sm:px-8"
        >
          <Monogram />

          <div className="hidden items-center gap-1 sm:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive(item.href) && "text-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
            <span className="mx-2 h-4 w-px bg-hairline" aria-hidden="true" />
            <button
              type="button"
              onClick={() => cmd.setOpen(true)}
              className="inline-flex h-8 items-center gap-2 rounded-md border border-hairline px-2.5 text-xs text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground"
              aria-label="Open command menu"
            >
              <Search className="size-3.5" />
              <kbd className="font-mono">Ctrl K</kbd>
            </button>
            <ThemeToggle />
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground"
            >
              <GithubIcon className="size-4" />
            </a>
          </div>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-foreground sm:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {menuOpen ? (
          <div
            id="mobile-nav"
            className="border-t border-hairline bg-background/95 backdrop-blur-md sm:hidden"
          >
            <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-4">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-surface-raised"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-surface-raised"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-surface-raised"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li className="mt-1 flex items-center justify-between rounded-md px-3 py-2">
                <span className="label-mono">Theme</span>
                <ThemeToggle />
              </li>
            </ul>
          </div>
        ) : null}
      </header>

      <CommandMenu {...cmd} />
    </>
  );
}
