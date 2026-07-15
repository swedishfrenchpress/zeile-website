"use client";

import { useScroll, type MotionValue } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

interface ScrollFieldContextValue {
  /** whole-document scroll progress, 0–1 — the single global motion source */
  progress: MotionValue<number>;
  /** false → doodles render static (reduced motion, or below md) */
  drift: boolean;
}

const ScrollFieldContext = createContext<ScrollFieldContextValue | null>(null);

export function useScrollField() {
  return useContext(ScrollFieldContext);
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useHydratedReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <ScrollFieldContext.Provider
      value={{ progress: scrollYProgress, drift: isDesktop && !reduceMotion }}
    >
      {children}
    </ScrollFieldContext.Provider>
  );
}
