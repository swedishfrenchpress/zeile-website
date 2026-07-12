/**
 * A miniature of the app's Compose screen — the rose wordmark masthead, the
 * focused note paper, the Text/Drawing toggle, and the full-width rose Send
 * button. Purely decorative (used as the "your phone" half of the bento's
 * two-phones illustration); nothing here is interactive.
 */

import { cn } from "@/lib/utils";

interface ComposeMockupProps {
  noteText?: string;
  className?: string;
}

export function ComposeMockup({
  noteText = "say hi to your person.",
  className,
}: ComposeMockupProps) {
  return (
    <div
      aria-label="The zeile compose screen: a note being written"
      role="img"
      className={cn(
        "relative flex flex-col gap-3 overflow-hidden rounded-[22px] border border-border bg-background p-4",
        className
      )}
    >
      {/* rose ambient behind the masthead, fading before the note paper —
          the app's ZeileAmbientBackground gesture in miniature */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background:
            "radial-gradient(90% 100% at 50% 0%, var(--rose-wash), transparent 75%)",
        }}
      />

      <div className="relative font-display text-2xl font-black leading-none tracking-tight text-primary">
        zeile
      </div>

      {/* segmented Text/Drawing control */}
      <div className="relative flex gap-0.5 rounded-[10px] bg-muted p-0.5 text-center text-[11px] font-semibold">
        <span className="flex-1 rounded-[8px] bg-background px-2 py-1 text-foreground shadow-[var(--paper-shadow)]">
          Text
        </span>
        <span className="flex-1 rounded-[8px] px-2 py-1 text-muted-foreground">
          Drawing
        </span>
      </div>

      {/* the note paper, focused: 2px rose ring + glow */}
      <div className="note-surface-focus relative flex min-h-20 items-start p-3">
        <span className="type-note !text-base text-foreground">
          {noteText}
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-[0.2em] bg-primary"
          />
        </span>
      </div>

      <div className="relative rounded-[10px] bg-primary px-3 py-2 text-center font-display text-sm font-bold text-primary-foreground">
        Send
      </div>
    </div>
  );
}
