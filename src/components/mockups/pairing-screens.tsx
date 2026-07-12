/**
 * Faithful CSS recreations of the app's real pairing screens (see the app
 * repo: Views/Onboarding/CreatePairView.swift and JoinPairView.swift):
 * the rose radial onboarding wash, the three-dot progress rail with the
 * current step stretched into a pill, "Share this code" over the
 * .thinMaterial mono code chip, "Enter the code" over the focused note
 * paper field, and the rose Continue/Join footer buttons.
 * Rendered inside <PhoneFrame> in the pairing section.
 */

import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

/** the app's OnboardingProgress: done + current (pill) + upcoming */
function ProgressRail() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-1.5">
      <span className="h-[5px] w-[5px] rounded-full bg-primary" />
      <span className="h-[5px] w-[17px] rounded-full bg-primary" />
      <span className="h-[5px] w-[5px] rounded-full bg-foreground/20" />
    </div>
  );
}

/** shared screen shell: onboarding wash + rail + content + footer button */
function Screen({
  children,
  footer,
  footerMuted = false,
}: {
  children: React.ReactNode;
  footer: string;
  footerMuted?: boolean;
}) {
  return (
    <div className="relative flex h-full flex-col px-3.5 pb-3.5 pt-9">
      {/* the OnboardingBackground rose wash, from the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 42% at 50% 0%, color-mix(in srgb, var(--rose) 16%, transparent), transparent 100%)",
        }}
      />
      <div className="relative">
        <ProgressRail />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-2.5 text-center">
        {children}
      </div>
      <div
        className={cn(
          "relative rounded-[10px] bg-primary py-2 text-center font-display text-[12px] font-bold text-primary-foreground",
          footerMuted && "opacity-45"
        )}
      >
        {footer}
      </div>
    </div>
  );
}

/** the sealed envelope from the onboarding thread — your code, handed over */
function EnvelopeMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 44 30"
      fill="none"
      className="h-6 w-auto -rotate-3"
    >
      <rect
        x="2"
        y="3"
        width="40"
        height="24"
        rx="4"
        stroke="var(--ink)"
        strokeWidth="2.2"
      />
      <path
        d="M4 6 C10 12, 16 16, 22 16 C28 16, 34 12, 40 6"
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="22" cy="17" r="3" fill="var(--rose)" />
    </svg>
  );
}

/** a simplified SF "square.and.arrow.up" for the Share code button */
function ShareIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 14 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[11px] w-auto"
    >
      <path d="M7 1 v8 M4.2 3.4 L7 1 l2.8 2.4" />
      <path d="M3.5 6.5 H2.5 V14.5 H11.5 V6.5 H10.5" />
    </svg>
  );
}

export function CreatePairScreen() {
  return (
    <Screen footer="Continue">
      <EnvelopeMark />
      <p className="font-display text-[14px] font-bold leading-tight tracking-tight text-foreground">
        Share this code
      </p>
      {/* the one .thinMaterial surface in the app — the read-only code chip */}
      <div className="w-full rounded-[10px] border border-border bg-white/55 py-2 backdrop-blur-sm dark:bg-white/10">
        <span className="font-mono text-[13px] font-bold tracking-[0.18em] text-foreground">
          {siteConfig.pairing.sampleCode}
        </span>
      </div>
      <span className="inline-flex items-center gap-1 rounded-[8px] border border-rose-hairline px-2.5 py-1 text-[9.5px] font-semibold text-primary">
        <ShareIcon />
        Share code
      </span>
      <p className="px-1 text-[8.5px] leading-relaxed text-muted-foreground">
        The other person enters this in &ldquo;I have a code.&rdquo; Once they
        join, the pair locks to just the two of you.
      </p>
    </Screen>
  );
}

export function JoinPairScreen() {
  const typed = siteConfig.pairing.sampleCode.slice(0, 6);
  return (
    // Join stays muted until all 8 characters are in — she's still typing
    <Screen footer="Join" footerMuted>
      <p className="font-display text-[14px] font-bold leading-tight tracking-tight text-foreground">
        Enter the code
      </p>
      <p className="px-1 text-[8.5px] leading-relaxed text-muted-foreground">
        Ask the person who created the pair for their 8-character code.
      </p>
      {/* the note-paper field, mid-typing, rose focus ring + glow */}
      <div className="note-surface-focus w-full py-2 text-center">
        <span className="font-mono text-[13px] font-bold tracking-[0.18em] text-foreground">
          {typed}
        </span>
        <span
          aria-hidden
          className="ml-[1px] inline-block h-[12px] w-[1.5px] translate-y-[2px] bg-primary animate-zeile-loading"
        />
      </div>
    </Screen>
  );
}
