"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ full = false }: { full?: boolean }) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      className={
        full
          ? "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-surface-raised"
          : "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground"
      }
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Both icons render; CSS picks. Avoids server/client markup mismatch. */}
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
      {full ? "Toggle theme" : null}
    </button>
  );
}
