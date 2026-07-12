// Shared wrapper styling for the App Store / APK / Browser badges — same
// frosted-glass recipe as buttonVariants({ variant: "primary" }), sized taller
// (h-16) for the two-line label. See DESIGN.md §5 Store Badges.
export const storeBadgeClass =
  "group inline-flex h-16 items-center gap-3.5 rounded-lg border border-glass-border bg-background/55 backdrop-blur-lg px-5 text-foreground shadow-[var(--glass-shadow)] transition-[border-color,background-color,translate] duration-[250ms] ease-out-quart hover:border-glass-border-strong hover:bg-background/75 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";
