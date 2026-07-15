"use client";

import { easeOutCubic } from "@/lib/animation";
import * as m from "framer-motion/m";

/**
 * The note-drawing library — little scenes as they'd actually arrive from
 * someone's thumb on the app's canvas: someone blowing a kiss, a cat
 * mid-dance, an ice cream losing the battle with summer. Shared by the
 * hero widget and the drawing carousel.
 *
 * Hand-drawn recipe: wobbly control points that never quite mirror, and —
 * crucially — stroke widths that vary a lot within one drawing (a fat
 * marker body next to thin pen features is what sells a human hand; a
 * uniform line width reads as clip-art). Plus tiny overshoots and a
 * whole-drawing tilt. Drawings composite on canvas white like the app's
 * PencilKit exports, so strokes carry their own fixed colors — including
 * custom hues beyond the six preset inks (the app supports the full
 * color wheel).
 */

export type DrawingName =
  | "cheeks"
  | "cat"
  | "icecream"
  | "cheers"
  | "blowkiss"
  | "sleepy"
  | "flower";

interface DrawingPath {
  d: string;
  color: string;
  /** stroke width — vary these hard; uniform width looks fake */
  w: number;
}

export interface DrawingSpec {
  label: string;
  /** the color its carousel dot wears */
  dot: string;
  /** whole-drawing tilt in degrees, like paper turned under a hand */
  tilt: number;
  paths: DrawingPath[];
}

export const DRAWINGS: Record<DrawingName, DrawingSpec> = {
  // two faces squished cheek to cheek, heart overhead
  cheeks: {
    label: "two faces cheek to cheek under a heart",
    dot: "#e63836",
    tilt: -2,
    paths: [
      // left face — medium pen
      {
        d: "M34 38 C43 37, 49 45, 48 54 C47 63, 38 68, 30 65 C22 62, 19 51, 25 43 C27 40, 30 38, 34 38",
        color: "#1c1c1f",
        w: 4.5,
      },
      // right face, leaning in
      {
        d: "M62 36 C71 37, 77 45, 75 54 C73 63, 63 67, 55 63 C48 60, 46 49, 51 42 C54 38, 58 36, 62 36",
        color: "#1c1c1f",
        w: 4.5,
      },
      // left one's purple bob — loose thin arcs
      {
        d: "M22 46 C18 34, 28 26, 37 28 C33 31, 31 34, 31 38 M37 28 C43 26, 48 30, 49 36",
        color: "#7d3bed",
        w: 3.5,
      },
      // right one's green spikes, sticking up
      {
        d: "M53 34 C54 31, 55 29, 56 26 M60 32 C61 29, 61 27, 62 24 M67 33 C68 31, 70 28, 71 26",
        color: "#2e943d",
        w: 3.5,
      },
      // happy shut eyes and smiles — thin pen
      {
        d: "M29 50 C30 48, 32 48, 33 50 M39 50 C40 48, 42 48, 43 50 M31 58 C33 60, 36 60, 38 58",
        color: "#1c1c1f",
        w: 2.8,
      },
      {
        d: "M58 48 C59 46, 61 46, 62 48 M68 48 C69 46, 71 46, 72 48 M60 56 C63 58, 66 58, 68 56",
        color: "#1c1c1f",
        w: 2.8,
      },
      // blush, both of them — thinnest
      {
        d: "M26 55 C27 55, 28 55, 29 55 M43 54 C44 54, 45 54, 46 54 M57 53 C58 53, 59 53, 60 53 M71 52 C72 52, 73 52, 74 52",
        color: "#ff7ba9",
        w: 2.5,
      },
      // the heart — fat marker, a bit lopsided, like always
      {
        d: "M47 18 C45 12, 38 13, 39 19 C40 24, 44 26, 47 30 C51 26, 56 24, 55 18 C54 12, 48 13, 47 17",
        color: "#e63836",
        w: 6,
      },
    ],
  },
  // a purple cat having the time of its life
  cat: {
    label: "a cat dancing",
    dot: "#7d3bed",
    tilt: 2,
    paths: [
      // head with crooked ears — chunky marker
      {
        d: "M41 26 C48 20, 58 23, 60 31 C62 39, 54 44, 46 42 C39 40, 37 31, 41 26 M43 25 L39 15 L48 21 M56 24 L61 14 L64 24",
        color: "#7d3bed",
        w: 6,
      },
      // eyes + grin — thin pen
      {
        d: "M47 31 C47 32, 47 32, 47 33 M55 31 C55 32, 55 32, 55 33 M48 37 C50 39, 53 38, 54 36",
        color: "#7d3bed",
        w: 2.8,
      },
      // plump little body, mid-wiggle
      {
        d: "M45 42 C37 46, 34 57, 39 65 C44 73, 58 73, 63 65 C68 57, 64 46, 56 42",
        color: "#7d3bed",
        w: 6,
      },
      // stubby arms up and legs kicking
      {
        d: "M41 48 C36 44, 32 42, 27 43 M60 47 C65 43, 69 42, 74 44 M45 71 C43 76, 41 80, 38 83 M58 71 C60 76, 62 80, 65 84",
        color: "#7d3bed",
        w: 5,
      },
      // tail with a happy curl — lighter stroke
      {
        d: "M63 60 C71 60, 76 53, 72 46 C70 42, 65 44, 68 48",
        color: "#7d3bed",
        w: 4,
      },
      // a little music note, slightly drunk — thin
      {
        d: "M79 20 C79 24, 79 27, 79 30 C77 32, 73 32, 74 29 C75 26, 78 26, 79 28 M79 20 C81 21, 84 22, 85 25",
        color: "#f2851a",
        w: 3.2,
      },
    ],
  },
  // an ice cream having a bad (hot) day
  icecream: {
    label: "an ice cream melting",
    dot: "#ff7ba9",
    tilt: -1.5,
    paths: [
      // the scoop, going soft — fattest stroke in the drawing
      {
        d: "M38 50 C32 44, 35 32, 45 29 C55 25, 65 31, 66 40 C67 47, 62 52, 56 53 C50 55, 42 55, 38 50",
        color: "#ff7ba9",
        w: 7,
      },
      // drips — medium
      {
        d: "M42 53 C42 58, 41 62, 43 66 M53 55 C53 60, 54 64, 52 69 M61 51 C62 56, 63 58, 61 62",
        color: "#ff7ba9",
        w: 4,
      },
      // the worried little face — thin pen
      {
        d: "M47 38 C47 39, 47 39, 47 40 M56 38 C56 39, 56 39, 56 40 M48 46 C50 44, 53 44, 55 46",
        color: "#1c1c1f",
        w: 2.8,
      },
      // cone with lazy crosshatch
      {
        d: "M41 55 C44 65, 47 75, 50 84 C53 75, 55 65, 58 55 M44 62 C48 60, 53 60, 56 62 M46 71 C49 70, 52 70, 54 71",
        color: "#c68a4f",
        w: 4.5,
      },
      // the puddle it's becoming
      {
        d: "M33 90 C41 87, 57 87, 65 90 C59 93, 39 93, 33 90",
        color: "#ff7ba9",
        w: 4,
      },
    ],
  },
  // two glasses mid-clink
  cheers: {
    label: "two drinks clinking",
    dot: "#2e943d",
    tilt: 1.5,
    paths: [
      // left glass, tipping in — marker
      {
        d: "M23 44 C25 55, 28 67, 32 76 C38 79, 44 76, 45 71 C42 60, 39 50, 35 41 C31 41, 26 42, 23 44 M26 52 C31 50, 36 51, 40 53",
        color: "#2e943d",
        w: 6.5,
      },
      // right glass, tipping in harder
      {
        d: "M77 43 C74 54, 71 65, 67 74 C61 78, 55 75, 54 69 C57 59, 60 49, 64 40 C68 40, 73 41, 77 43 M62 50 C67 48, 72 49, 75 51",
        color: "#2e943d",
        w: 6.5,
      },
      // the clink! — thin quick pen flicks
      {
        d: "M50 33 C50 29, 50 26, 50 22 M42 36 C39 33, 37 31, 34 28 M58 36 C61 33, 64 31, 67 29",
        color: "#1c1c1f",
        w: 3,
      },
    ],
  },
  // someone with big curls blowing a kiss
  blowkiss: {
    label: "someone blowing a kiss",
    dot: "#f2851a",
    tilt: -1,
    paths: [
      // the curls — thin loops, drawn fast
      {
        d: "M32 27 C28 18, 37 13, 40 20 C42 12, 52 12, 52 19 C57 13, 65 18, 60 25 C64 27, 63 32, 59 32 M29 34 C25 33, 24 28, 27 25",
        color: "#f2851a",
        w: 3.5,
      },
      // the face — medium pen
      {
        d: "M36 29 C44 25, 54 29, 55 39 C56 49, 46 55, 38 51 C30 47, 29 34, 36 29",
        color: "#1c1c1f",
        w: 4.5,
      },
      // one open eye, one happy wink — thin
      {
        d: "M43 37 C43 38, 43 38, 43 39 M49 37 C51 36, 53 36, 54 37",
        color: "#1c1c1f",
        w: 2.8,
      },
      // puckered lips
      {
        d: "M55 44 C58 43, 58 47, 55 46 C54 46, 54 45, 55 44",
        color: "#e63836",
        w: 4,
      },
      // the kiss, sailing off — fat little heart
      {
        d: "M74 30 C73 26, 68 27, 69 31 C70 34, 73 35, 75 38 C77 34, 81 33, 80 29 C79 26, 75 26, 74 29",
        color: "#e63836",
        w: 5.5,
      },
      // motion dashes — thinnest strokes on the page
      {
        d: "M59 40 C62 39, 64 39, 67 38 M60 47 C64 46, 67 46, 70 45",
        color: "#1c1c1f",
        w: 2.5,
      },
    ],
  },
  // someone with a messy bun, already half asleep
  sleepy: {
    label: "someone sleepy, zzz",
    dot: "#2663eb",
    tilt: 1.5,
    paths: [
      // the messy bun — thin scribble
      {
        d: "M45 22 C42 14, 52 10, 56 16 C59 21, 53 25, 49 21 C47 19, 48 16, 51 16",
        color: "#2663eb",
        w: 3.5,
      },
      // the head — medium
      {
        d: "M37 41 C36 31, 45 25, 54 28 C63 31, 65 43, 57 50 C49 56, 39 52, 37 44",
        color: "#1c1c1f",
        w: 4.5,
      },
      // heavy eyelids — thin
      {
        d: "M44 39 C46 41, 48 41, 50 39 M54 38 C56 40, 58 40, 59 38",
        color: "#1c1c1f",
        w: 2.8,
      },
      // the tiny yawn
      {
        d: "M49 46 C52 45, 53 48, 50 49 C48 50, 47 47, 49 46",
        color: "#1c1c1f",
        w: 3,
      },
      // zzz, climbing away and growing — three weights
      {
        d: "M63 35 C65 34, 67 34, 69 34 C67 37, 65 39, 63 41 C65 41, 67 41, 70 41",
        color: "#2663eb",
        w: 3,
      },
      {
        d: "M70 24 C73 23, 75 23, 78 23 C75 27, 73 29, 70 31 C73 31, 76 31, 79 31",
        color: "#2663eb",
        w: 3.8,
      },
      {
        d: "M78 11 C81 10, 84 10, 87 10 C83 15, 81 17, 78 20 C81 20, 84 20, 88 20",
        color: "#2663eb",
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
        w: 6.5,
      },
      {
        d: "M50 50 C47 64, 53 76, 47 92 M48 73 C40 67, 34 68, 27 72",
        color: "#2e943d",
        w: 4.5,
      },
    ],
  },
};

interface DrawingProps {
  name: DrawingName;
  /** strokes draw themselves in (pathLength); false renders complete */
  animate?: boolean;
  className?: string;
}

export function Drawing({ name, animate = false, className }: DrawingProps) {
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
      {spec.paths.map((path, i) => {
        const delay = 0.2 + i * 0.3;
        return (
          <m.path
            key={i}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.w}
            strokeLinecap="round"
            strokeLinejoin="round"
            // opacity flips on exactly when this stroke starts drawing —
            // otherwise every pending subpath shows its round start-cap as
            // a stray dot before the ink arrives
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={
              animate
                ? {
                    pathLength: { duration: 0.55, ease: easeOutCubic, delay },
                    opacity: { duration: 0.01, delay },
                  }
                : { duration: 0 }
            }
          />
        );
      })}
    </svg>
  );
}
