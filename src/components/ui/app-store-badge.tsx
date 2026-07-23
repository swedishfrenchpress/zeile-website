import { Icons } from "@/components/icons";
import { storeBadgeClass } from "@/components/ui/store-badge";
import { cn } from "@/lib/utils";

interface AppStoreBadgeProps {
  href: string;
  className?: string;
}

export function ScribbledBadgeBackdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 84"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible [filter:drop-shadow(0_4px_8px_rgb(0_0_0/0.08))_drop-shadow(0_10px_18px_var(--rose-glow))] transition-[filter] duration-[280ms] ease-out-quart group-hover:[filter:drop-shadow(0_6px_12px_rgb(0_0_0/0.1))_drop-shadow(0_14px_32px_var(--rose-glow))] group-focus-visible:[filter:drop-shadow(0_6px_12px_rgb(0_0_0/0.1))_drop-shadow(0_14px_32px_var(--rose-glow))] motion-reduce:transition-none"
    >
      {/* Single fill — no silhouette swap (that read as a clipped top-left edge). */}
      <path
        d="M14 10 C43 3 80 6 117 4 C164 2 217 3 246 10 C254 23 253 56 246 71 C217 79 177 77 136 80 C91 82 43 79 12 71 C5 57 7 25 14 10 Z"
        fill="var(--rose)"
        className="origin-center transition-[opacity,transform] duration-[280ms] ease-out-quart group-hover:opacity-[0.94] group-focus-visible:opacity-[0.94] motion-reduce:transition-none"
      />
      {/* Soft sheen — blooms on hover (always light on rose, both themes). */}
      <path
        d="M40 18 C90 12 150 14 210 20 C200 28 140 26 90 28 C60 28 40 24 40 18 Z"
        fill="#ffffff"
        className="opacity-[0.08] transition-opacity duration-[280ms] ease-out-quart group-hover:opacity-[0.16] group-focus-visible:opacity-[0.16] motion-reduce:transition-none"
      />
      <path
        d="M177 69 C194 66 215 68 235 65 M183 74 C201 71 218 73 231 70"
        fill="none"
        stroke="var(--doodle-charcoal)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-40 transition-opacity duration-[280ms] ease-out-quart group-hover:opacity-60 group-focus-visible:opacity-60 motion-reduce:transition-none"
      />
    </svg>
  );
}

// App Store badge — the live download destination for zeile.
export function AppStoreBadge({ href, className }: AppStoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Download zeile on the App Store"
      className={cn(storeBadgeClass, className)}
    >
      <ScribbledBadgeBackdrop />
      <Icons.apple
        className="relative z-10 size-11 -translate-y-px flex-shrink-0 fill-current transition-transform duration-[280ms] ease-out-quart group-hover:scale-[1.06] group-active:scale-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:size-12"
        aria-hidden="true"
      />
      <span className="relative z-10 flex flex-col items-start gap-1 leading-none transition-transform duration-[280ms] ease-out-quart group-hover:translate-x-px motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
        <span className="type-button text-sm leading-none sm:text-[0.9375rem]">
          Download on the
        </span>
        <span className="type-button text-[1.75rem] font-extrabold leading-none tracking-[-0.02em] sm:text-[1.9rem]">
          App Store
        </span>
      </span>
    </a>
  );
}
