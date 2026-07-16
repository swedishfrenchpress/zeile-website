import { Icons } from "@/components/icons";
import { ScribbledBadgeBackdrop } from "@/components/ui/app-store-badge";
import { storeBadgePrimaryClass } from "@/components/ui/store-badge";
import { cn } from "@/lib/utils";

interface TestFlightBadgeProps {
  href: string;
  className?: string;
}

export function TestFlightBadge({ href, className }: TestFlightBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Try the zeile beta on TestFlight"
      className={cn(storeBadgePrimaryClass, className)}
    >
      <ScribbledBadgeBackdrop />
      <Icons.apple
        className="relative z-10 size-11 -translate-y-px flex-shrink-0 fill-current transition-transform duration-[280ms] ease-out-quart group-hover:scale-[1.06] group-active:scale-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:size-12"
        aria-hidden="true"
      />
      <span className="relative z-10 flex flex-col items-start gap-1.5 leading-none transition-transform duration-[280ms] ease-out-quart group-hover:translate-x-px motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
        <span className="type-button text-sm leading-none sm:text-[0.9375rem]">
          Try beta on
        </span>
        <span className="type-button text-[1.75rem] font-extrabold leading-none tracking-[-0.02em] sm:text-[1.9rem]">
          TestFlight
        </span>
      </span>
    </a>
  );
}
