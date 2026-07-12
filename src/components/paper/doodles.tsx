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
 * Per the app's One-Heart Rule: there is deliberately NO heart in this set.
 */

export type DoodleVariant =
  | "squiggle"
  | "star"
  | "sparkle"
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
  // open five-point star, slightly lopsided
  star: {
    ratio: 1,
    render: (props) => (
      <DoodleSvg
        d="M51 8 L62 38 L93 41 L68 60 L77 92 L50 74 L24 89 L33 58 L9 39 L40 37 Z"
        {...props}
      />
    ),
  },
  // four-arm asterisk sparkle with a gap at the center
  sparkle: {
    ratio: 1,
    render: (props) => (
      <DoodleSvg
        d="M50 10 C51 24, 51 30, 50 42 M50 60 C49 72, 49 78, 51 90 M11 49 C25 48, 31 48, 42 49 M59 51 C72 52, 79 52, 90 50"
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
