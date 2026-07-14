import { Icons } from "@/components/icons";
import { ScribbledBadgeBackdrop } from "@/components/ui/app-store-badge";
import { storeBadgeClass } from "@/components/ui/store-badge";
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
      className={cn(storeBadgeClass, className)}
    >
      <ScribbledBadgeBackdrop />
      <Icons.apple
        className="relative z-10 size-9 -translate-y-px flex-shrink-0 fill-current transition-transform duration-[250ms] ease-out-quart group-hover:scale-[1.04] group-active:scale-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        aria-hidden="true"
      />
      <span className="relative z-10 flex flex-col items-start gap-1 leading-none">
        <span className="type-button text-xs leading-none">Try beta on</span>
        <span className="type-button text-[1.45rem] font-extrabold leading-none tracking-[-0.015em]">
          TestFlight
        </span>
      </span>
    </a>
  );
}
