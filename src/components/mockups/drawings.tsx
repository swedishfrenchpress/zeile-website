"use client";

import { easeOutCubic } from "@/lib/animation";
import { motion } from "framer-motion";

/**
 * The note-drawing library — quick pen sketches as they'd arrive from the
 * app's canvas, shared by the hero widget and the drawing carousel.
 *
 * Drawings always composite on canvas white, exactly like the app's
 * PencilKit exports — so strokes carry their own fixed colors. The app
 * supports the full color wheel (not just the six preset inks), which is
 * why several of these use custom hues: the golden sun, the brown coffee,
 * the yellow rainbow band.
 */

export type DrawingName =
  | "flower"
  | "smiley"
  | "sun"
  | "coffee"
  | "rainbow"
  | "star"
  | "hi";

export interface DrawingSpec {
  label: string;
  /** the color its carousel dot wears; "rainbow" renders a conic wheel */
  dot: string | "rainbow";
  paths: { d: string; color: string }[];
}

export const DRAWINGS: Record<DrawingName, DrawingSpec> = {
  flower: {
    label: "a red flower",
    dot: "#e63836",
    paths: [
      {
        d: "M50 40 C43 18, 59 16, 52 36 C70 22, 80 36, 56 42 C78 48, 70 64, 52 46 C55 68, 39 66, 47 46 C26 56, 20 38, 45 38",
        color: "#e63836",
      },
      {
        d: "M50 50 C48 64, 52 76, 47 92 M47 74 C40 68, 34 68, 28 72",
        color: "#2e943d",
      },
    ],
  },
  smiley: {
    label: "a smiley face",
    dot: "#f2851a",
    paths: [
      {
        d: "M50 10 C74 10, 90 28, 89 51 C88 74, 71 90, 49 89 C27 88, 11 71, 12 49 C13 27, 28 11, 50 10 Z",
        color: "#f2851a",
      },
      {
        d: "M37 40 C37 43, 37 45, 37 48 M64 39 C64 42, 64 44, 64 47 M33 62 C40 72, 60 73, 68 61",
        color: "#1c1c1f",
      },
    ],
  },
  sun: {
    label: "a golden sun",
    dot: "#f5a623",
    paths: [
      {
        d: "M50 33 C60 32, 67 40, 66 49 C65 59, 57 66, 48 65 C39 64, 33 56, 34 47 C35 39, 42 34, 50 33 Z",
        color: "#f5a623",
      },
      {
        d: "M50 12 C50 16, 50 19, 50 24 M74 22 C71 25, 69 27, 66 31 M88 48 C84 48, 81 48, 76 49 M74 76 C71 72, 69 70, 66 67 M50 86 C50 82, 50 79, 50 74 M26 76 C29 72, 31 70, 34 67 M12 48 C16 48, 19 48, 24 49 M26 22 C29 25, 31 27, 34 31",
        color: "#f5a623",
      },
    ],
  },
  coffee: {
    label: "a cup of coffee",
    dot: "#8b5e3c",
    paths: [
      {
        d: "M30 46 C31 60, 32 74, 37 79 C43 84, 57 84, 63 79 C68 74, 69 60, 70 46 M25 45 C40 42, 60 42, 75 45",
        color: "#8b5e3c",
      },
      {
        d: "M71 53 C81 51, 83 62, 69 65",
        color: "#8b5e3c",
      },
      {
        d: "M42 34 C40 28, 44 24, 42 17 M57 34 C55 28, 59 24, 57 17",
        color: "#1c1c1f",
      },
    ],
  },
  rainbow: {
    label: "a rainbow",
    dot: "rainbow",
    paths: [
      { d: "M14 78 C14 36, 86 36, 86 78", color: "#e63836" },
      { d: "M21 78 C21 44, 79 44, 79 78", color: "#f2851a" },
      { d: "M28 78 C28 52, 72 52, 72 78", color: "#f2c048" },
      { d: "M35 78 C35 60, 65 60, 65 78", color: "#2e943d" },
      { d: "M42 78 C42 68, 58 68, 58 78", color: "#2663eb" },
    ],
  },
  star: {
    label: "a blue star",
    dot: "#2663eb",
    paths: [
      {
        d: "M50 15 L60 39 L87 42 L66 60 L73 87 L50 72 L28 86 L34 59 L14 41 L41 39 Z",
        color: "#2663eb",
      },
      {
        d: "M79 16 C79 20, 79 22, 79 26 M74 21 C77 21, 80 21, 84 21",
        color: "#1c1c1f",
      },
    ],
  },
  hi: {
    label: "a handwritten hi",
    dot: "#7d3bed",
    paths: [
      {
        d: "M30 32 C29 45, 28 58, 28 71 M28 54 C33 45, 43 44, 44 52 C45 58, 44 65, 43 71 M58 50 C57 57, 56 64, 56 71 M57 38 C57 39, 57 40, 57 41",
        color: "#7d3bed",
      },
      {
        d: "M26 82 C42 78, 62 80, 78 78",
        color: "#1c1c1f",
      },
    ],
  },
};

interface DrawingProps {
  name: DrawingName;
  /** strokes draw themselves in (pathLength); false renders complete */
  animate?: boolean;
  strokeWidth?: number;
  className?: string;
}

export function Drawing({
  name,
  animate = false,
  strokeWidth = 6,
  className,
}: DrawingProps) {
  const spec = DRAWINGS[name];
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label={`A hand-drawn doodle: ${spec.label}`}
      className={className}
    >
      {spec.paths.map((path, i) => (
        <motion.path
          key={i}
          d={path.d}
          stroke={path.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={
            animate
              ? { duration: 0.7, ease: easeOutCubic, delay: 0.2 + i * 0.4 }
              : { duration: 0 }
          }
        />
      ))}
    </svg>
  );
}
