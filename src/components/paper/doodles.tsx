/**
 * The doodle library — every decorative mark on the site, drawn as inline
 * SVG strokes so they stay crisp at any size and take their color from
 * `currentColor` (set per-placement to an ink variable in doodles.ts).
 *
 * Hand-drawn recipe: one <path> element per mark (subpaths allowed),
 * fill="none", round caps/joins, deliberately wobbly control points — no
 * symmetric curves. The wobble + a per-placement rotation is the whole
 * trick; no filters. Marks read as quick pen doodles from the app's
 * drawing canvas, never as icons.
 *
 * Hearts appear alongside the rest of the decorative doodle vocabulary.
 */

export type DoodleVariant =
  | "squiggle"
  | "heart"
  | "cat"
  | "negroni"
  | "moon"
  | "leaf"
  | "cup"
  | "flower"
  | "arrow-loop"
  | "spiral"
  | "scrawl";

interface DoodleSvgProps extends React.SVGAttributes<SVGSVGElement> {
  d: string;
  /** intrinsic aspect ratio height for a 100-wide viewBox */
  vbHeight?: number;
}

function DoodleSvg({ d, vbHeight = 100, ...props }: DoodleSvgProps) {
  return (
    <svg
      viewBox={`0 0 100 ${vbHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const DOODLE_ASSETS: Record<
  DoodleVariant,
  { render: (props: React.SVGAttributes<SVGSVGElement>) => React.ReactNode; ratio: number }
> = {
  // three uneven humps, like testing a pen
  squiggle: {
    ratio: 100 / 52,
    render: (props) => (
      <DoodleSvg
        vbHeight={52}
        d="M6 38 C14 12, 26 10, 33 30 C40 48, 50 46, 56 26 C62 8, 74 10, 80 26 C84 37, 90 40, 95 34"
        {...props}
      />
    ),
  },
  // a hand-drawn heart outline, one lobe fuller than the other
  heart: {
    ratio: 1,
    render: (props) => (
      <DoodleSvg
        d="M50 84 C34 70, 16 56, 16 38 C16 24, 28 16, 38 22 C44 25, 48 31, 50 38 C52 31, 56 25, 62 22 C72 16, 84 24, 84 38 C84 56, 66 70, 50 84 Z"
        {...props}
      />
    ),
  },
  // a thin sitting cat, pointed ears and a tail curling off to one side
  cat: {
    ratio: 1,
    render: (props) => (
      <DoodleSvg
        d="M30 46 L24 18 L40 32 C46 28, 54 28, 60 32 L76 18 L70 46 C78 58, 79 74, 72 86 L28 86 C21 74, 22 58, 30 46 Z M72 84 C90 84, 92 64, 79 60"
        {...props}
      />
    ),
  },
  // a negroni: rocks glass with an orange wheel perched on the rim
  negroni: {
    ratio: 1,
    render: (props) => (
      <DoodleSvg
        d="M32 40 L38 82 C39 88, 45 90, 50 90 C55 90, 61 88, 62 82 L68 40 M28 40 C36 35, 64 35, 72 40 C64 45, 36 45, 28 40 Z M55 30 C55 20, 73 20, 73 30 C73 40, 55 40, 55 30 Z"
        {...props}
      />
    ),
  },
  // a lopsided crescent moon
  moon: {
    ratio: 1,
    render: (props) => (
      <DoodleSvg
        d="M60 14 C38 20, 26 40, 30 62 C34 84, 56 94, 76 84 C58 82, 46 66, 46 48 C46 32, 50 22, 60 14 Z"
        {...props}
      />
    ),
  },
  // a single leaf with a wandering center vein
  leaf: {
    ratio: 1,
    render: (props) => (
      <DoodleSvg
        d="M50 12 C30 30, 24 58, 50 90 C76 58, 70 30, 50 12 Z M50 22 C50 44, 50 66, 50 82"
        {...props}
      />
    ),
  },
  // a steaming coffee cup, handle off the right side
  cup: {
    ratio: 1,
    render: (props) => (
      <DoodleSvg
        d="M32 44 L37 82 C38 88, 44 90, 52 90 C60 90, 65 86, 66 80 L70 44 M28 44 C36 39, 64 39, 72 44 C64 49, 36 49, 28 44 Z M70 52 C86 50, 86 72, 69 70 M44 32 C40 26, 48 22, 44 16 M58 32 C54 26, 62 22, 58 16"
        {...props}
      />
    ),
  },
  // five messy petal loops and a stem
  flower: {
    ratio: 100 / 118,
    render: (props) => (
      <DoodleSvg
        vbHeight={118}
        d="M50 46 C41 18, 60 16, 53 42 C74 24, 86 42, 57 48 C84 56, 74 76, 53 54 C56 82, 36 80, 47 54 C20 66, 14 44, 45 44 M50 58 C48 74, 52 88, 47 110"
        {...props}
      />
    ),
  },
  // an arrow that takes a pigtail detour before pointing on
  "arrow-loop": {
    ratio: 100 / 62,
    render: (props) => (
      <DoodleSvg
        vbHeight={62}
        d="M6 48 C24 42, 34 46, 40 34 C46 21, 34 16, 35 28 C37 42, 60 38, 78 26 M68 16 L82 23 L74 37"
        {...props}
      />
    ),
  },
  // loose spiral, opening outward
  spiral: {
    ratio: 1,
    render: (props) => (
      <DoodleSvg
        d="M52 50 C57 45, 63 50, 59 58 C53 68, 39 62, 41 49 C44 33, 63 29, 73 41 C83 53, 77 72, 61 78 C42 85, 23 72, 24 53 C25 36, 38 24, 54 22"
        {...props}
      />
    ),
  },
  // a double underline, the second stroke lazier than the first
  scrawl: {
    ratio: 100 / 40,
    render: (props) => (
      <DoodleSvg
        vbHeight={40}
        d="M8 16 C32 8, 64 10, 92 14 M16 32 C38 26, 60 28, 84 30"
        {...props}
      />
    ),
  },
};
