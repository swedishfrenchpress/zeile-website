import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * A minimal iPhone frame for the app-screen recreations: soft bezel,
 * rounded screen, dynamic island. Everything inside is CSS — crisp at any
 * size, theme-aware, no image assets.
 */
export function PhoneFrame({
  children,
  label,
  className,
}: {
  children: ReactNode;
  /** what this phone is showing, for screen readers */
  label: string;
  className?: string;
}) {
  return (
    <div role="img" aria-label={label} className={cn("relative", className)}>
      <div className="rounded-[42px] border border-black/[0.08] bg-foreground/[0.08] p-[7px] shadow-[0_18px_40px_-18px_rgb(0_0_0/0.35)] dark:border-white/[0.08] dark:bg-white/[0.09]">
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[35px] border border-black/[0.06] bg-background dark:border-white/[0.06]">
          {/* dynamic island */}
          <div
            aria-hidden
            className="absolute left-1/2 top-[7px] z-10 h-[17px] w-[58px] -translate-x-1/2 rounded-full bg-[#1c1c1f]"
          />
          {/* status bar */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 z-[5] flex items-center justify-between px-5 pt-[9px] text-[8px] font-semibold text-foreground"
          >
            <span>9:41</span>
            <span className="relative inline-block h-[8px] w-[15px] rounded-[3px] border border-foreground/40">
              <span className="absolute inset-[1.5px] right-[3.5px] rounded-[1px] bg-foreground/70" />
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
