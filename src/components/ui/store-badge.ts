// Shared wrapper styling for the App Store badge — the hero CTA. The inline
// SVG supplies the opaque, hand-drawn rose surface while this class preserves
// the generous tap target and keeps the content optically grouped.
// Never glass: the only translucent surface on the site is the pairing
// code chip.
export const storeBadgeClass =
  "group relative isolate inline-flex h-18 min-w-[236px] items-center gap-3.5 px-7 text-primary-foreground transition-[translate,scale] duration-[250ms] ease-out-quart hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] dark:text-background motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";
