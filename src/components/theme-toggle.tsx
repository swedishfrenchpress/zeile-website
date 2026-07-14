"use client";

import { cn } from "@/lib/utils";
import { easeOutQuart } from "@/lib/animation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Two-state light/dark switch with a quick hand-drawn icon replacement.
 * Until first use the site follows prefers-color-scheme; a click stores an
 * explicit override.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  const [flourishKey, setFlourishKey] = useState(0);
  // The active theme is unknowable server-side; render a blank icon slot
  // until hydrated so SSR and the first client render agree.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";

  const handleThemeChange = () => {
    setTheme(isDark ? "light" : "dark");
    if (!reduceMotion) setFlourishKey((current) => current + 1);
  };

  return (
    <button
      type="button"
      onClick={handleThemeChange}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "relative isolate text-foreground/70 transition-colors hover:text-foreground",
        className
      )}
    >
      {mounted ? (
        <span className="relative block size-6" aria-hidden="true">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={isDark ? "moon" : "sun"}
              className="absolute inset-0"
              initial={
                reduceMotion ? false : { opacity: 0, rotate: -18, scale: 0.8 }
              }
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, rotate: 18, scale: 0.8 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.22,
                ease: easeOutQuart,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-6">
                <path
                  d={
                    isDark
                      ? "M16.8 16.7 C12.2 17.7 7.9 14.4 7.7 9.8 C7.6 7.2 8.8 5.1 10.7 3.7 C6.1 4.4 3.1 8.2 3.6 12.7 C4.1 17.2 8.1 20.4 12.7 19.9 C14.8 19.7 16.6 18.5 17.8 16.9 C17.5 16.9 17.2 16.8 16.8 16.7 Z"
                      : "M12 6.7 C15 6.5 17.3 8.8 17.2 11.8 C17.1 14.8 14.9 17.2 11.9 17.2 C8.9 17.1 6.7 14.9 6.8 11.9 C6.9 9 9.1 6.8 12 6.7 Z M12 1.8 L12 4 M12 20 L12 22.2 M1.8 12 L4 12 M20 12 L22.2 12 M4.7 4.7 L6.2 6.2 M17.8 17.8 L19.3 19.3 M19.3 4.7 L17.8 6.2 M6.2 17.8 L4.7 19.3"
                  }
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </AnimatePresence>
        </span>
      ) : (
        <span className="block size-6" aria-hidden="true" />
      )}

      {mounted && flourishKey > 0 && !reduceMotion ? (
        <motion.svg
          key={flourishKey}
          aria-hidden="true"
          viewBox="0 0 40 40"
          fill="none"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-10 -translate-x-1/2 -translate-y-1/2 overflow-visible text-[var(--doodle-charcoal)]"
        >
          <motion.path
            d="M6 23 C4 11 13 4 24 6 C35 8 38 20 32 29 C27 37 14 36 8 29"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{
              pathLength: { duration: 0.42, ease: easeOutQuart },
              opacity: { duration: 0.2, delay: 0.26 },
            }}
          />
        </motion.svg>
      ) : null}
    </button>
  );
}
