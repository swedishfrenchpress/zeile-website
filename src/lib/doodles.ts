/**
 * Every doodle placement on the page, in one place.
 *
 * Assets are inline SVG pen marks (see components/paper/doodles.tsx) — the
 * only source of decorative imagery on this site. They take the app's ink
 * palette via adaptive --doodle-* variables so they read on both grounds.
 *
 * Placement rules (the restraint that keeps this from becoming noise):
 *  - at most ~3 doodles visible per viewport-height on desktop
 *  - doodles live in gutters, beside headings, and at section seams —
 *    never behind running text or interactive targets
 *  - never the same variant twice within one viewport; rotation adds variety
 *  - hearts share the same restraint and placement rules as every other mark
 *  - low opacity always — these are margin scribbles, not illustrations
 *  - `mobile: true` marks the small subset that renders below md
 *
 * Motion: one global scroll-progress value (0–1) drives two transforms per
 * instance, both keyed off (progress − anchor):
 *  - X drift: × DRIFT_RANGE × tier.depth — a slow sideways wander.
 *  - Y parallax: × RISE_RANGE × tier.depth, sign-flipped — marks rise from
 *    below into their authored spot as the page scrolls toward the section's
 *    anchor. Ink wanders less than the old site's clouds: smaller ranges.
 * `anchor` ≈ the page progress at which the section is centered.
 */

import type { DoodleVariant } from "@/components/paper/doodles";

export type { DoodleVariant };

export type DoodleTier = "far" | "mid" | "near";

export type DoodleInk =
  | "charcoal"
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "purple";

export interface DoodlePlacement {
  variant: DoodleVariant;
  /** CSS offsets in % of the section box */
  top: string;
  left?: string;
  right?: string;
  /** display width in CSS px, at md and up */
  width: number;
  tier: DoodleTier;
  /** ink color, resolved to var(--doodle-<ink>) */
  ink: DoodleInk;
  /** hand-placed tilt, degrees (−14…14 keeps it casual, not chaotic) */
  rotate?: number;
  flip?: boolean;
  /** render below md too (default: desktop only) */
  mobile?: boolean;
  /** width in CSS px below md, when mobile is true */
  mobileWidth?: number;
}

export interface SectionDoodles {
  /** page scroll progress (0–1) at which this section is roughly centered */
  anchor: number;
  doodles: DoodlePlacement[];
}

/** total X travel (px) of a depth-1 doodle across the full page scroll */
export const DRIFT_RANGE = 200;

/** total Y travel (px) of a depth-1 doodle per unit of scroll-progress delta */
export const RISE_RANGE = 500;

export const TIERS: Record<DoodleTier, { depth: number; opacity: number }> = {
  far: { depth: 0.3, opacity: 0.1 },
  mid: { depth: 0.6, opacity: 0.16 },
  near: { depth: 1, opacity: 0.24 },
};

/** keyed by section id — <Section> and manual mounts look their sets up here */
export const SECTION_DOODLES: Record<string, SectionDoodles> = {
  hero: {
    anchor: 0.02,
    doodles: [
      { variant: "spiral", top: "6%", left: "6%", width: 90, tier: "far", ink: "green", rotate: -11, mobile: true, mobileWidth: 56 },
      { variant: "moon", top: "12%", right: "8%", width: 68, tier: "mid", ink: "blue", rotate: 8, mobile: true, mobileWidth: 44 },
      { variant: "squiggle", top: "46%", left: "3%", width: 150, tier: "mid", ink: "charcoal", rotate: -6 },
      // the signature: a negroni tucked near the hero widget
      { variant: "negroni", top: "57%", right: "12%", width: 92, tier: "near", ink: "orange", rotate: 10 },
    ],
  },
  features: {
    anchor: 0.28,
    doodles: [
      { variant: "arrow-loop", top: "4%", right: "5%", width: 130, tier: "mid", ink: "purple", rotate: -8 },
      { variant: "cat", top: "84%", left: "4%", width: 100, tier: "near", ink: "charcoal", rotate: 5, mobile: true, mobileWidth: 62 },
    ],
  },
  pairing: {
    anchor: 0.45,
    doodles: [
      { variant: "leaf", top: "2%", left: "7%", width: 60, tier: "far", ink: "green", rotate: -14 },
      { variant: "heart", top: "40%", right: "9%", width: 58, tier: "mid", ink: "red", rotate: 9 },
      { variant: "squiggle", top: "70%", right: "5%", width: 120, tier: "mid", ink: "charcoal", rotate: 7, mobile: true, mobileWidth: 72 },
    ],
  },
  "feature-2": {
    anchor: 0.6,
    doodles: [
      { variant: "cup", top: "0%", right: "9%", width: 74, tier: "mid", ink: "charcoal", rotate: 10 },
      { variant: "spiral", top: "66%", left: "5%", width: 84, tier: "far", ink: "orange", rotate: 9, flip: true },
    ],
  },
  bento: {
    anchor: 0.75,
    doodles: [
      { variant: "flower", top: "-4%", right: "4%", width: 88, tier: "mid", ink: "green", rotate: 6, mobile: true, mobileWidth: 52 },
      { variant: "scrawl", top: "60%", left: "3%", width: 96, tier: "far", ink: "blue", rotate: -4 },
    ],
  },
  faq: {
    anchor: 0.92,
    doodles: [
      { variant: "heart", top: "6%", right: "6%", width: 54, tier: "far", ink: "red", rotate: -9 },
      { variant: "cat", top: "68%", left: "5%", width: 80, tier: "far", ink: "blue", rotate: 8 },
    ],
  },
  footer: {
    anchor: 1.0,
    doodles: [
      { variant: "squiggle", top: "8%", right: "7%", width: 110, tier: "mid", ink: "blue", rotate: -5, mobile: true, mobileWidth: 64 },
      { variant: "arrow-loop", top: "42%", left: "3%", width: 120, tier: "mid", ink: "charcoal", rotate: 6, flip: true },
    ],
  },
};
