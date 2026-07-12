// Shared wrapper styling for the App Store badge — the hero CTA. An opaque
// zeile-rose fill (the app's .borderedProminent voice), sized generously
// (h-20) so the primary action reads as the biggest tap target on the page.
// Never glass: the only translucent surface on the site is the pairing
// code chip.
export const storeBadgeClass =
  "group inline-flex h-20 items-center gap-4 rounded-card bg-primary px-8 text-primary-foreground shadow-[var(--paper-shadow)] transition-[background-color,translate,box-shadow] duration-[250ms] ease-out-quart hover:bg-primary/90 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";
