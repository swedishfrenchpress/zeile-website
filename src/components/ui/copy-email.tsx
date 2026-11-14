"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { easeOutQuart } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

const TOAST_MS = 2200;
const emptySubscribe = () => () => {};

/** A quick pen check in the one rose accent: wobbly, like the site's doodles. */
function ScribbleCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M3.6 13.4 C5.7 14.5 7.5 16.4 9.1 18.9 C11.6 13.5 15.3 8.4 20.7 4.4" />
    </svg>
  );
}

/** The torn-paper scrap the toast is written on: same hand as the App Store badge. */
function ScribbledScrap() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 310 64"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible [filter:drop-shadow(0_6px_10px_rgb(0_0_0/0.1))_drop-shadow(0_12px_24px_var(--rose-glow))]"
    >
      <path
        d="M14 9 C58 3 104 7 150 5 C204 3 262 5 298 12 C306 24 305 42 296 53 C255 60 200 57 152 59 C102 61 52 58 12 52 C5 41 5 21 14 9 Z"
        fill="var(--paper)"
        stroke="var(--doodle-charcoal)"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * The email, rendered as a button: clicking copies the address to the
 * clipboard and floats a brand toast, instead of firing a mailto: (which
 * dumps people into a mail client they may not use). The toast is portaled
 * to <body> so it stays viewport-fixed even inside the sections' animated
 * filter/transform ancestors, which would otherwise capture position:fixed.
 */
export function CopyEmail({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const reduceMotion = useHydratedReducedMotion();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API is unavailable (insecure context / old browser).
      return;
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), TOAST_MS);
  }, [email]);

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy email address ${email} to clipboard`}
        className={cn("cursor-pointer", className)}
      >
        {email}
      </button>

      {mounted &&
        createPortal(
          <div
            // Just under the sticky header (which sits at max(1rem, safe area)
            // and is ~4.25rem tall), centered with it and one layer above it,
            // so the header can never cover the confirmation.
            className="pointer-events-none fixed top-[calc(max(1rem,env(safe-area-inset-top))+5.25rem)] right-[max(1rem,env(safe-area-inset-right))] left-[max(1rem,env(safe-area-inset-left))] z-[60] flex justify-center"
            role="status"
            aria-live="polite"
          >
            <AnimatePresence>
              {copied && (
                <m.div
                  initial={
                    reduceMotion
                      ? { opacity: 0, rotate: -1.5 }
                      : { opacity: 0, y: -12, rotate: 2, scale: 0.96 }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1, rotate: -1.5 }
                      : { opacity: 1, y: 0, rotate: -1.5, scale: 1 }
                  }
                  exit={
                    reduceMotion
                      ? { opacity: 0, rotate: -1.5 }
                      : { opacity: 0, y: -10, rotate: -3, scale: 0.97 }
                  }
                  transition={{
                    duration: reduceMotion ? 0.15 : 0.28,
                    ease: easeOutQuart,
                  }}
                  className="pointer-events-auto relative isolate inline-flex max-w-full items-center gap-3 px-7 py-4"
                >
                  <ScribbledScrap />
                  <ScribbleCheck className="relative z-10 size-6 shrink-0 text-primary" />
                  <span className="relative z-10 font-display text-base font-extrabold leading-tight text-foreground">
                    Copied. Your move.
                  </span>
                </m.div>
              )}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </>
  );
}
