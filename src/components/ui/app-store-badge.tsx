import { Icons } from "@/components/icons";
import { storeBadgeClass } from "@/components/ui/store-badge";
import { cn } from "@/lib/utils";

interface AppStoreBadgeProps {
  href: string;
  className?: string;
}

export function ScribbledBadgeBackdrop({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 260 84"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible [filter:drop-shadow(0_4px_5px_rgb(0_0_0/0.06))]"
      >
        <path
          d="M14 10 C43 3 80 6 117 4 C164 2 217 3 246 10 C254 23 253 56 246 71 C217 79 177 77 136 80 C91 82 43 79 12 71 C5 57 7 25 14 10 Z"
          fill="var(--muted)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 84"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible [filter:drop-shadow(0_4px_5px_rgb(0_0_0/0.08))_drop-shadow(0_10px_13px_var(--rose-glow))]"
    >
      <path
        d="M14 10 C43 3 80 6 117 4 C164 2 217 3 246 10 C254 23 253 56 246 71 C217 79 177 77 136 80 C91 82 43 79 12 71 C5 57 7 25 14 10 Z"
        fill="var(--rose)"
        className="transition-opacity duration-[250ms] ease-out-quart group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-visible:opacity-100"
      />
      <path
        d="M11 13 C39 5 80 7 120 3 C166 5 216 2 248 12 C253 27 255 55 244 72 C211 77 174 81 133 78 C88 82 39 77 13 70 C6 54 5 28 11 13 Z"
        fill="var(--rose)"
        className="opacity-0 transition-opacity duration-[250ms] ease-out-quart group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:opacity-0 motion-reduce:group-focus-visible:opacity-0"
      />
      <path
        d="M177 69 C194 66 215 68 235 65 M183 74 C201 71 218 73 231 70"
        fill="none"
        stroke="var(--doodle-charcoal)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-40 transition-[transform,opacity] duration-[250ms] ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-55 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:opacity-55 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-x-0 motion-reduce:group-focus-visible:translate-y-0"
      />
    </svg>
  );
}

// The primary CTA. While APP_STORE_URL is still the "#" placeholder the
// badge renders as-is but stays on-page; swap the constant in lib/config.tsx
// at launch and this becomes a real store link.
export function AppStoreBadge({ href, className }: AppStoreBadgeProps) {
  const isPlaceholder = href === "#";

  if (isPlaceholder) {
    return (
      <button
        type="button"
        disabled
        aria-label="Download zeile on the App Store — coming soon"
        title="App Store release coming soon"
        className={cn(
          storeBadgeClass,
          "cursor-not-allowed text-muted-foreground hover:translate-y-0 active:scale-100 dark:text-muted-foreground",
          className
        )}
      >
        <ScribbledBadgeBackdrop disabled />
        <Icons.apple
          className="relative z-10 size-9 -translate-y-px flex-shrink-0 fill-current"
          aria-hidden="true"
        />
        <span className="relative z-10 flex flex-col items-start gap-1 leading-none">
          <span className="type-button text-xs leading-none">
            Download on the
          </span>
          <span className="type-button text-[1.45rem] font-extrabold leading-none tracking-[-0.015em]">
            App Store
          </span>
        </span>
        <span
          aria-hidden="true"
          className="absolute -top-2 -right-1 z-20 -rotate-6 rounded-[7px] border border-rose-hairline bg-paper px-3 py-1 font-display text-xs font-extrabold leading-none text-primary shadow-[var(--paper-shadow)]"
        >
          soooon...
        </span>
      </button>
    );
  }

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
        className="relative z-10 size-9 -translate-y-px flex-shrink-0 fill-current transition-transform duration-[250ms] ease-out-quart group-hover:scale-[1.04] group-active:scale-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        aria-hidden="true"
      />
      <span className="relative z-10 flex flex-col items-start gap-1 leading-none">
        <span className="type-button text-xs leading-none">
          Download on the
        </span>
        <span className="type-button text-[1.45rem] font-extrabold leading-none tracking-[-0.015em]">
          App Store
        </span>
      </span>
    </a>
  );
}
