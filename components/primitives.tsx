import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-5xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-12 sm:mb-16">
      <div className="mb-4 flex items-center gap-4">
        <span className="label-mono text-signal">{index}</span>
        <span className="h-px w-10 bg-hairline" aria-hidden="true" />
        <span className="label-mono">{eyebrow}</span>
      </div>
      <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-hairline px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}
