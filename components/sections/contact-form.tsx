"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// EmailJS client-side identifiers. These are public by design (the old
// portfolio shipped the same ones); the account secret never leaves EmailJS.
const EMAILJS = {
  serviceId: "service_z9yhmjg",
  templateId: "template_57voene",
  publicKey: "tSnZoTCJJafY5EOj5",
};

const PADS = 4;
const SEQUENCE_LEN = 4;

type Phase = "idle" | "showing" | "input" | "won";

function PatternGame({ onVerified }: { onVerified: (ok: boolean) => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [lit, setLit] = useState<number | null>(null);
  const [miss, setMiss] = useState<number | null>(null);
  const seqRef = useRef<number[]>([]);
  const posRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const later = (ms: number, fn: () => void) => {
    timersRef.current.push(setTimeout(() => aliveRef.current && fn(), ms));
  };

  const play = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    onVerified(false);
    seqRef.current = Array.from(
      { length: SEQUENCE_LEN },
      () => Math.floor(Math.random() * PADS),
    );
    posRef.current = 0;
    setLit(null);
    setPhase("showing");
    const step = reduce ? 900 : 620;
    const on = reduce ? 520 : 340;
    seqRef.current.forEach((pad, i) => {
      later((i + 1) * step, () => setLit(pad));
      later((i + 1) * step + on, () => setLit(null));
    });
    later((SEQUENCE_LEN + 1) * step, () => setPhase("input"));
  };

  const press = (pad: number) => {
    if (phase !== "input") return;
    if (pad === seqRef.current[posRef.current]) {
      setLit(pad);
      later(160, () => setLit(null));
      posRef.current += 1;
      if (posRef.current === seqRef.current.length) {
        setPhase("won");
        onVerified(true);
      }
    } else {
      setMiss(pad);
      setPhase("idle");
      onVerified(false);
      later(900, () => {
        setMiss(null);
        play();
      });
    }
  };

  const hint =
    phase === "showing"
      ? "Watch the sequence."
      : phase === "input"
        ? "Your turn. Repeat it."
        : phase === "won"
          ? "Pattern cracked."
          : "Four pads, four flashes. Repeat them to unlock the form.";

  return (
    <div className="rounded-md border border-hairline bg-surface/40 p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="label-mono">Human check</p>
        {phase === "won" ? (
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-signal">
            <Check className="size-3.5" aria-hidden="true" />
            verified
          </span>
        ) : (
          <span className="font-mono text-[11px] text-muted-foreground">
            {hint}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div
          className="grid grid-cols-2 gap-1.5"
          role="group"
          aria-label="memory pattern game"
        >
          {Array.from({ length: PADS }, (_, pad) => (
            <button
              key={pad}
              type="button"
              aria-label={`Pad ${pad + 1}`}
              disabled={phase !== "input"}
              onClick={() => press(pad)}
              className={cn(
                "size-11 rounded-md border transition-colors duration-150 sm:size-12",
                lit === pad
                  ? "border-signal bg-signal"
                  : "border-hairline bg-surface-raised hover:border-signal/40",
                miss === pad && "border-destructive bg-destructive/20",
                phase === "input" ? "cursor-pointer" : "cursor-default",
              )}
            />
          ))}
        </div>
        <div>
          {phase === "idle" && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={play}
              className="rounded-md"
            >
              Play
            </Button>
          )}
          {(phase === "showing" || phase === "input") && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={play}
              className="rounded-md text-muted-foreground"
            >
              Restart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ContactForm() {
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: a filled hidden field means a bot, pretend success.
    if (String(data.get("website") ?? "")) {
      setStatus("sent");
      return;
    }
    if (!verified) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.serviceId,
          template_id: EMAILJS.templateId,
          user_id: EMAILJS.publicKey,
          template_params: {
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
            message: String(data.get("message") ?? ""),
          },
        }),
      });
      if (!res.ok) throw new Error(`emailjs send failed: ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const labelCls = "label-mono mb-2 block";
  const fieldCls = "h-10 rounded-md text-sm";

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-md border border-hairline bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Name
          </label>
          <Input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email
          </label>
          <Input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldCls}
          />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="cf-message" className={labelCls}>
          Message
        </label>
        <Textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          className="rounded-md text-sm"
        />
      </div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="mt-6">
        <PatternGame onVerified={setVerified} />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground" role="status">
          {status === "sent"
            ? "Message sent. Thanks for writing."
            : status === "error"
              ? "That did not go through. Write to me directly: "
              : verified
                ? "Unlocked. Send it."
                : "Beat the pattern above to enable sending."}
          {status === "error" && (
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-signal underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
          )}
        </p>
        <Button
          type="submit"
          disabled={!verified || status === "sending" || status === "sent"}
          className="rounded-md px-6"
        >
          {status === "sending" ? "Sending" : "Send message"}
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
