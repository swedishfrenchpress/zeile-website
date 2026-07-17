"use client";

import { useEffect } from "react";

export function ConsoleGreeting() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "development") return;
    if (typeof window === "undefined") return;
    const w = window as Window & { __zeileGreeted?: boolean };
    if (w.__zeileGreeted) return;
    w.__zeileGreeted = true;
    console.info(
      "%czeile%c\n// psst, leave a little note.\n// made for exactly two people.",
      "font-family: ui-rounded, ui-monospace, monospace; font-size: 14px; color: #fb5481; font-weight: 800;",
      "font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: #8a8a93;"
    );
  }, []);

  return null;
}
