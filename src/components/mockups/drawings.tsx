"use client";

import { easeOutCubic } from "@/lib/animation";
import { motion } from "framer-motion";

/**
 * The note-drawing library — little scenes as they'd actually arrive from
 * someone's thumb on the app's canvas: two people kissing under a heart, a
 * cat mid-dance, an ice cream losing the battle with summer. Shared by the
 * hero widget and the drawing carousel.
 *
 * Hand-drawn recipe: wobbly control points that never quite mirror, stroke
 * widths that vary within one drawing, tiny overshoots, and a whole-drawing
 * tilt — nothing symmetric, nothing "perfect". Drawings composite on canvas
 * white like the app's PencilKit exports, so strokes carry their own fixed
 * colors — including custom hues beyond the six preset inks (the app
 * supports the full color wheel).
 */

export type DrawingName =
  | "kiss"
  | "cat"
  | "icecream"
  | "cheers"
  | "bee"
  | "rainbow"
  | "flower";

interface DrawingPath {
  d: string;
  color: string;
  /** stroke width override — varying widths sell the human hand */
  w?: number;
}

export interface DrawingSpec {
  label: string;
  /** the color its carousel dot wears; "rainbow" renders a conic wheel */
  dot: string | "rainbow";
  /** whole-drawing tilt in degrees, like paper turned under a hand */
  tilt: number;
  paths: DrawingPath[];
}

export const DRAWINGS: Record<DrawingName, DrawingSpec> = {
  // two stick people, heads together, holding hands — heart overhead
  kiss: {
    label: "two people kissing under a heart",
    dot: "#e63836",
    tilt: -2,
    paths: [
      // left person: head leaning in, body, reaching arm, legs
      {
        d: "M37 28 C43 28, 47 33, 46 39 C45 45, 38 47, 33 44 C28 41, 28 33, 35 29",
        color: "#1c1c1f",
        w: 5,
      },
      {
        d: "M39 47 C37 55, 36 63, 37 72 M38 55 C43 58, 47 61, 50 66 M37 72 C33 78, 31 82, 28 88 M37 72 C40 78, 42 83, 43 89",
        color: "#1c1c1f",
        w: 5,
      },
      // right person: head tilted to meet, body, arm to meet the hand
      {
        d: "M56 27 C62 27, 66 32, 65 38 C64 44, 57 46, 52 43 C48 40, 48 32, 54 28",
        color: "#1c1c1f",
        w: 5,
      },
      {
        d: "M58 46 C60 54, 61 62, 60 71 M57 54 C53 58, 51 62, 50 66 M60 71 C64 77, 66 82, 69 88 M60 71 C57 78, 55 83, 53 89",
        color: "#1c1c1f",
        w: 5,
      },
      // the heart — drawn last, a bit lopsided, like always
      {
        d: "M48 12 C46 7, 39 8, 40 14 C41 19, 45 21, 48 24 C52 20, 56 18, 56 13 C56 7, 50 7, 48 11",
        color: "#e63836",
        w: 5.5,
      },
    ],
  },
  // a purple cat having the time of its life
  cat: {
    label: "a cat dancing",
    dot: "#7d3bed",
    tilt: 2,
    paths: [
      // head with crooked ears
      {
        d: "M41 26 C48 20, 58 23, 60 31 C62 39, 54 44, 46 42 C39 40, 37 31, 41 26 M43 25 L39 15 L48 21 M56 24 L61 14 L64 24",
        color: "#7d3bed",
        w: 5.5,
      },
      // eyes + grin
      {
        d: "M47 31 C47 32, 47 32, 47 33 M55 31 C55 32, 55 32, 55 33 M48 37 C50 39, 53 38, 54 36",
        color: "#7d3bed",
        w: 4,
      },
      // body leaning into the groove, arms up, one leg kicked
      {
        d: "M50 43 C48 51, 47 59, 50 66 M48 48 C42 43, 36 41, 29 43 M52 48 C59 42, 65 41, 71 44 M50 66 C45 72, 40 77, 34 80 M50 66 C55 73, 57 79, 56 86",
        color: "#7d3bed",
        w: 5.5,
      },
      // tail with a happy curl
      {
        d: "M51 58 C60 60, 66 55, 64 47 C63 42, 58 43, 60 48",
        color: "#7d3bed",
        w: 5,
      },
      // a little music note, slightly drunk
      {
        d: "M79 20 C79 24, 79 27, 79 30 C77 32, 73 32, 74 29 C75 26, 78 26, 79 28 M79 20 C81 21, 84 22, 85 25",
        color: "#f2851a",
        w: 4.5,
      },
    ],
  },
  // an ice cream having a bad (hot) day
  icecream: {
    label: "an ice cream melting",
    dot: "#ff7ba9",
    tilt: -1.5,
    paths: [
      // the scoop, going soft
      {
        d: "M38 50 C32 44, 35 32, 45 29 C55 25, 65 31, 66 40 C67 47, 62 52, 56 53 C50 55, 42 55, 38 50",
        color: "#ff7ba9",
        w: 6,
      },
      // drips
      {
        d: "M42 53 C42 58, 41 62, 43 66 M53 55 C53 60, 54 64, 52 69 M61 51 C62 56, 63 58, 61 62",
        color: "#ff7ba9",
        w: 5,
      },
      // the worried little face
      {
        d: "M47 38 C47 39, 47 39, 47 40 M56 38 C56 39, 56 39, 56 40 M48 46 C50 44, 53 44, 55 46",
        color: "#1c1c1f",
        w: 4,
      },
      // cone with lazy crosshatch
      {
        d: "M41 55 C44 65, 47 75, 50 84 C53 75, 55 65, 58 55 M44 62 C48 60, 53 60, 56 62 M46 71 C49 70, 52 70, 54 71",
        color: "#c68a4f",
        w: 5.5,
      },
      // the puddle it's becoming
      {
        d: "M33 90 C41 87, 57 87, 65 90 C59 93, 39 93, 33 90",
        color: "#ff7ba9",
        w: 4.5,
      },
    ],
  },
  // two glasses mid-clink
  cheers: {
    label: "two drinks clinking",
    dot: "#2e943d",
    tilt: 1.5,
    paths: [
      // left glass, tipping in
      {
        d: "M23 44 C25 55, 28 67, 32 76 C38 79, 44 76, 45 71 C42 60, 39 50, 35 41 C31 41, 26 42, 23 44 M26 52 C31 50, 36 51, 40 53",
        color: "#2e943d",
        w: 5.5,
      },
      // right glass, tipping in harder
      {
        d: "M77 43 C74 54, 71 65, 67 74 C61 78, 55 75, 54 69 C57 59, 60 49, 64 40 C68 40, 73 41, 77 43 M62 50 C67 48, 72 49, 75 51",
        color: "#2e943d",
        w: 5.5,
      },
      // the clink!
      {
        d: "M50 33 C50 29, 50 26, 50 22 M42 36 C39 33, 37 31, 34 28 M58 36 C61 33, 64 31, 67 29",
        color: "#1c1c1f",
        w: 4.5,
      },
    ],
  },
  // a bee that took the scenic route
  bee: {
    label: "a bee looping around",
    dot: "#f2c048",
    tilt: 0,
    paths: [
      // plump sideways body
      {
        d: "M42 46 C45 38, 57 35, 65 40 C73 45, 72 56, 63 60 C53 64, 42 58, 42 48",
        color: "#f2c048",
        w: 5.5,
      },
      // two short stripes, staying inside the tummy
      {
        d: "M53 40 C52 45, 52 51, 53 58 M60 40 C59 45, 59 50, 60 57",
        color: "#1c1c1f",
        w: 3.5,
      },
      // small crooked wings above, one always bigger
      {
        d: "M50 36 C47 28, 54 25, 55 34 M59 34 C60 25, 67 27, 64 36",
        color: "#1c1c1f",
        w: 3.5,
      },
      // antenna, waving hello
      {
        d: "M44 41 C41 37, 39 34, 35 31",
        color: "#1c1c1f",
        w: 3.5,
      },
      // the loop-de-loop it flew to get here
      {
        d: "M40 57 C28 64, 22 74, 31 77 C40 80, 43 70, 34 69 C25 68, 16 75, 13 84",
        color: "#1c1c1f",
        w: 4,
      },
    ],
  },
  // every color at once (and a puff of cloud)
  rainbow: {
    label: "a rainbow",
    dot: "rainbow",
    tilt: 0,
    paths: [
      { d: "M15 77 C13 38, 85 34, 86 78", color: "#e63836", w: 6 },
      { d: "M22 78 C21 46, 78 43, 79 78", color: "#f2851a", w: 5.5 },
      { d: "M29 77 C28 53, 71 51, 72 78", color: "#f2c048", w: 6 },
      { d: "M36 78 C35 61, 64 59, 65 77", color: "#2e943d", w: 5 },
      { d: "M43 78 C42 68, 57 67, 58 78", color: "#2663eb", w: 5.5 },
      // the puffy cloud the rainbow leans on
      {
        d: "M8 87 C3 81, 9 72, 17 76 C18 67, 31 67, 31 77 C38 75, 41 84, 34 87 C25 90, 13 90, 8 87",
        color: "#1c1c1f",
        w: 4.5,
      },
    ],
  },
  // a flower, petals refusing to match
  flower: {
    label: "a flower",
    dot: "#e63836",
    tilt: -2,
    paths: [
      {
        d: "M50 40 C42 17, 60 15, 52 36 C69 21, 81 35, 56 42 C79 47, 71 65, 52 46 C56 69, 38 67, 47 46 C25 57, 19 37, 45 38",
        color: "#e63836",
        w: 5.5,
      },
      {
        d: "M50 50 C47 64, 53 76, 47 92 M48 73 C40 67, 34 68, 27 72",
        color: "#2e943d",
        w: 5.5,
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
      style={{ transform: `rotate(${spec.tilt}deg)` }}
    >
      {spec.paths.map((path, i) => (
        <motion.path
          key={i}
          d={path.d}
          stroke={path.color}
          strokeWidth={path.w ?? strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={
            animate
              ? { duration: 0.6, ease: easeOutCubic, delay: 0.2 + i * 0.35 }
              : { duration: 0 }
          }
        />
      ))}
    </svg>
  );
}
