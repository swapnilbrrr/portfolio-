"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowDown, FileDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/primitives";
import { siteConfig } from "@/lib/site-config";

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const child: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.5, 0.3, 1] },
  },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay: 0.8, duration: 0.6 } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const state = reduce
    ? { initial: false, animate: "show" }
    : { initial: "hidden", animate: "show" };

  return (
    <section aria-label="Introduction" className="relative overflow-hidden">
      <div
        className="grid-field pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-hairline"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-between pb-16 pt-20 sm:pt-28">
        <motion.div variants={parent} {...state}>
          <motion.p
            variants={child}
            data-reveal
            className="label-mono mb-10 flex flex-wrap items-center gap-x-4 gap-y-1"
          >
            <span>{siteConfig.location}</span>
            <span aria-hidden="true">·</span>
            <span className="text-signal">{siteConfig.role}</span>
            <span aria-hidden="true">·</span>
            <span>{siteConfig.company}</span>
          </motion.p>

          <motion.h1
            variants={child}
            data-reveal
            className="text-[clamp(2.9rem,9vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-balance"
          >
            Swapnil
            <br />
            Katuwal
          </motion.h1>

          <motion.p
            variants={child}
            data-reveal
            className="mt-6 text-[clamp(1.4rem,3.4vw,2.1rem)] font-light tracking-tight text-balance"
          >
            Security Engineer{" "}
            <span className="text-signal font-normal">&amp; Builder</span>
          </motion.p>

          <motion.p
            variants={child}
            data-reveal
            className="mt-7 max-w-xl text-[0.975rem] leading-relaxed text-muted-foreground"
          >
            I work the detection side of security: alerts, logs, network
            traffic. I also build analysis tools, web platforms and small
            systems that show how things break.
          </motion.p>

          <motion.div
            variants={child}
            data-reveal
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/work"
              className={buttonVariants({
                size: "lg",
                className: "rounded-md px-6",
              })}
            >
              View work
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "rounded-md px-6",
              })}
            >
              <FileDown className="size-4" aria-hidden="true" />
              Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fade}
          initial={reduce ? false : "hidden"}
          animate="show"
          data-reveal
          className="mt-16 hidden items-end justify-between sm:flex"
        >
          <p className="label-mono">Selected work · 2025 to 2026</p>
          <p className="label-mono flex items-center gap-2">
            <kbd className="rounded-sm border border-hairline px-1.5 py-0.5 font-mono text-[10px]">
              Ctrl
            </kbd>
            <kbd className="rounded-sm border border-hairline px-1.5 py-0.5 font-mono text-[10px]">
              K
            </kbd>
            <span>to navigate</span>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
