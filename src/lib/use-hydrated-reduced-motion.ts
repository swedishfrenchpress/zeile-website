"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Keep the server render and first client render identical, then adopt the
 * browser's motion preference immediately after hydration. Framer's raw hook
 * can know the preference on the first client render but not on the server,
 * which makes conditional animation markup unsafe to hydrate.
 */
export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return hydrated && prefersReducedMotion;
}
