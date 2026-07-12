"use client";

import { useEffect } from "react";

export function ConsoleGreeting() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "development") return;
    if (typeof window === "undefined") return;
    const w = window as Window & { __cashuGreeted?: boolean };
    if (w.__cashuGreeted) return;
    w.__cashuGreeted = true;
    console.info(
      "%ccashu.me%c\n// bearer ecash. open protocol. open source.\n// spec: github.com/cashubtc/nuts",
      "font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; color: #b4a7f5; font-weight: 500;",
      "font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: #8a8a93;"
    );
  }, []);

  return null;
}
