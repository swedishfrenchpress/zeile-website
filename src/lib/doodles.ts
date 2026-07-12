/**
 * The cloud library and every placement on the page, in one place.
 *
 * Assets are pre-cut cloud PNGs (Resource Boy cloud textures, see
 * public/images/clouds/) — the only source for cloud imagery on this site.
 * Served `unoptimized`: next/image's AVIF/WebP re-encoding visibly destroys
 * the soft alpha edges at these tiny display sizes (confirmed by decoding
 * the actual served AVIF bytes — same speckled-gray artifact users saw).
 * The raw PNGs are small enough on disk that skipping the lossy transcode
 * is the right trade.
 *
 * Placement rules (the restraint that keeps this from becoming noise):
 *  - at most ~3 clouds visible per viewport-height on desktop
 *  - clouds live in gutters, beside headings, and at section seams —
 *    never behind running text or interactive targets
 *  - never the same variant twice within one viewport; flips add variety
 *  - `mobile: true` marks the small subset that renders below md
 *
 * Motion: one global scroll-progress value (0–1) drives two transforms per
 * instance, both keyed off (progress − anchor):
 *  - X drift: × DRIFT_RANGE × tier.depth — the original ambient horizontal wander.
 *  - Y parallax: × RISE_RANGE × tier.depth, sign-flipped — clouds rise up from
 *    below into their authored position as the page scrolls toward a section's
 *    anchor, then continue rising past/out as you scroll beyond it. Farther
 *    tiers travel less (smaller depth), nearer tiers travel more, same
 *    convention as the X drift.
 * `anchor` ≈ the page progress at which the section is centered.
 */

export type CloudVariant =
  | "cloud-01"
  | "cloud-02"
  | "cloud-03"
  | "cloud-04"
  | "cloud-05"
  | "cloud-06"
  | "cloud-07";

export type CloudTier = "far" | "mid" | "near";

export interface CloudPlacement {
  variant: CloudVariant;
  /** CSS offsets in % of the section box */
  top: string;
  left?: string;
  right?: string;
  /** display width in CSS px, at md and up */
  width: number;
  tier: CloudTier;
  flip?: boolean;
  /** render below md too (default: desktop only) */
  mobile?: boolean;
  /** width in CSS px below md, when mobile is true (default: same as width — set this whenever width is much larger than would fit a phone viewport) */
  mobileWidth?: number;
}

export interface SectionClouds {
  /** page scroll progress (0–1) at which this section is roughly centered */
  anchor: number;
  clouds: CloudPlacement[];
}

export const CLOUD_ASSETS: Record<
  CloudVariant,
  { src: string; w: number; h: number }
> = {
  // Source PNGs are pre-sized to ~2x each variant's largest on-page display
  // width (see public/images/clouds) and palette-quantized; kept `unoptimized`
  // so next/image's lossy AVIF/WebP transcode never touches the soft alpha.
  "cloud-01": { src: "/images/clouds/cloud-01.png", w: 760, h: 473 },
  "cloud-02": { src: "/images/clouds/cloud-02.png", w: 410, h: 194 },
  "cloud-03": { src: "/images/clouds/cloud-03.png", w: 520, h: 289 },
  "cloud-04": { src: "/images/clouds/cloud-04.png", w: 320, h: 182 },
  "cloud-05": { src: "/images/clouds/cloud-05.png", w: 320, h: 170 },
  "cloud-06": { src: "/images/clouds/cloud-06.png", w: 680, h: 441 },
  "cloud-07": { src: "/images/clouds/cloud-07.png", w: 440, h: 328 },
};

/** total X travel (px) of a depth-1 cloud across the full page scroll */
export const DRIFT_RANGE = 560;

/** total Y travel (px) of a depth-1 cloud per unit of scroll-progress delta */
export const RISE_RANGE = 1200;

export const TIERS: Record<
  CloudTier,
  { depth: number; opacity: number; blur: number }
> = {
  far: { depth: 0.3, opacity: 0.68, blur: 0.6 },
  mid: { depth: 0.6, opacity: 0.85, blur: 0 },
  near: { depth: 1, opacity: 1, blur: 0 },
};

/** keyed by section id — <Section> and manual mounts look their sets up here */
export const SECTION_CLOUDS: Record<string, SectionClouds> = {
  hero: {
    anchor: 0.02,
    clouds: [
      { variant: "cloud-06", top: "2%", left: "30%", width: 340, tier: "far", mobile: true, mobileWidth: 200 },
      { variant: "cloud-05", top: "7%", right: "6%", width: 115, tier: "far", mobile: true, mobileWidth: 64 },
      { variant: "cloud-03", top: "9%", left: "1%", width: 260, tier: "mid" },
      { variant: "cloud-04", top: "29%", right: "2%", width: 155, tier: "mid" },
      { variant: "cloud-02", top: "47%", left: "0.5%", width: 135, tier: "mid" },
      // the signature: larger, tucked partially behind the hand+phone photo
      { variant: "cloud-01", top: "45%", right: "16%", width: 380, tier: "near", flip: true },
    ],
  },
  features: {
    anchor: 0.28,
    clouds: [
      { variant: "cloud-05", top: "8%", left: "1%", width: 155, tier: "far", flip: true },
      { variant: "cloud-04", top: "-6%", right: "13%", width: 90, tier: "far" },
      { variant: "cloud-06", top: "66%", right: "1%", width: 125, tier: "mid", mobile: true, mobileWidth: 72 },
    ],
  },
  "tap-to-pay": {
    anchor: 0.45,
    clouds: [
      { variant: "cloud-02", top: "2%", left: "5%", width: 205, tier: "far" },
      { variant: "cloud-01", top: "56%", left: "0.5%", width: 190, tier: "mid", flip: true, mobile: true, mobileWidth: 110 },
    ],
  },
  "feature-2": {
    anchor: 0.60,
    clouds: [
      { variant: "cloud-03", top: "-5%", left: "1%", width: 140, tier: "mid", flip: true, mobile: true, mobileWidth: 80 },
      { variant: "cloud-06", top: "63%", right: "0.5%", width: 170, tier: "far" },
    ],
  },
  bento: {
    anchor: 0.75,
    clouds: [
      { variant: "cloud-07", top: "-5%", right: "3%", width: 220, tier: "mid", mobile: true, mobileWidth: 130 },
      { variant: "cloud-05", top: "52%", left: "0.5%", width: 95, tier: "far" },
    ],
  },
  faq: {
    anchor: 0.92,
    clouds: [
      { variant: "cloud-04", top: "3%", right: "3%", width: 145, tier: "far", flip: true },
      { variant: "cloud-06", top: "68%", left: "4%", width: 82, tier: "far" },
    ],
  },
  footer: {
    anchor: 1.0,
    clouds: [
      { variant: "cloud-02", top: "7%", right: "6%", width: 115, tier: "far" },
      { variant: "cloud-01", top: "38%", left: "2%", width: 205, tier: "mid", mobile: true, mobileWidth: 120 },
    ],
  },
};
