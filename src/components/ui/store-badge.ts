// Shared wrapper styling for store badges. The inline SVG supplies the
// opaque, hand-drawn rose surface while these classes preserve a generous
// tap target and keep the content optically grouped.
// Never glass: the only translucent surface on the site is the pairing
// code chip.
//
// Hover stays in place (no translate-y): lift was clipping the irregular
// scribble edge against overflow. Interaction is glow + press instead.

const storeBadgeMotion =
  "transition-[scale,filter] duration-[280ms] ease-out-quart active:scale-[0.98] motion-reduce:active:scale-100";

/** Primary download CTA — deliberately generous for a one-tap install. */
export const storeBadgeClass =
  `group relative isolate inline-flex h-[5.5rem] min-w-[280px] items-center gap-4 px-8 text-primary-foreground ${storeBadgeMotion} dark:text-background sm:min-w-[300px] sm:px-9`;
