"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { easeOutQuart } from "@/lib/animation";
import { cn } from "@/lib/utils";

const TOAST_MS = 2200;

/** A clean rounded check, drawn in the one rose accent. */
function CheckMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M4 12.5l5 5L20 6.5" />
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
  const reduceMotion = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);
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
            className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-6"
            role="status"
            aria-live="polite"
          >
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 14, scale: 0.96 }
                  }
                  animate={
                    reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
                  }
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 14, scale: 0.96 }
                  }
                  transition={{
                    duration: reduceMotion ? 0.15 : 0.28,
                    ease: easeOutQuart,
                  }}
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 shadow-[var(--paper-shadow)]"
                >
                  <CheckMark className="size-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Email copied to clipboard.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </>
  );
}
