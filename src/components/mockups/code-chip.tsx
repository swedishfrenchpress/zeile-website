import { cn } from "@/lib/utils";

/**
 * The read-only pairing code chip — the ONE allowed translucent surface on
 * the whole site, a faithful recreation of the app's `.thinMaterial` code
 * chip. Everything else stays opaque paper (the anti-glass rule); this chip
 * earns its blur because it's the app's own single material moment.
 */
export function CodeChip({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-[16px] border border-border bg-white/55 px-8 py-6 backdrop-blur-lg dark:bg-white/10",
        className
      )}
    >
      <span
        className="type-code text-foreground"
        // read one character at a time, like the app's speechSpellsOutCharacters
        aria-label={`Pairing code: ${code.split("").join(" ")}`}
      >
        {code}
      </span>
    </div>
  );
}
