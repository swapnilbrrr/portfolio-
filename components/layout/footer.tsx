import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-baseline gap-3">
          <span className="font-medium text-foreground">{siteConfig.name}</span>
          <span className="label-mono">Security / Engineering</span>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground"
        >
          <Link href="/work" className="hover:text-foreground">
            Work
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/writing" className="hover:text-foreground">
            Writing
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-foreground"
          >
            Email
          </a>
        </nav>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
