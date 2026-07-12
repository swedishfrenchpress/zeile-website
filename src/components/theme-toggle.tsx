"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Two-state light/dark switch. Until first use the site follows
 * prefers-color-scheme (next-themes "system" default, nothing persisted);
 * a click stores an explicit override. The icon shows the active theme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // The active theme is unknowable server-side; render a blank icon slot
  // until hydrated so SSR and the first client render agree.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";
  const Icon = isDark ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        className
      )}
    >
      {mounted ? (
        <Icon className="size-6" aria-hidden="true" />
      ) : (
        <span className="block size-6" aria-hidden="true" />
      )}
    </button>
  );
}
