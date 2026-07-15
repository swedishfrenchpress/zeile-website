"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

const loadMotionFeatures = () =>
  import("@/lib/motion-features").then((module) => module.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {children}
    </LazyMotion>
  );
}
