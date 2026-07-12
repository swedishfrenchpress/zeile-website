import { Icons } from "@/components/icons";
import { storeBadgeClass } from "@/components/ui/store-badge";
import { cn } from "@/lib/utils";

interface AppStoreBadgeProps {
  href: string;
  className?: string;
}

// The iOS app ships via TestFlight (public beta), not the App Store yet — the badge
// keeps the Apple mark but points at the TestFlight invite.
export function AppStoreBadge({ href, className }: AppStoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Download the cashu.me beta on TestFlight"
      className={cn(storeBadgeClass, className)}
    >
      <Icons.apple
        className="size-8 flex-shrink-0 fill-current"
        aria-hidden="true"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="type-button text-[11px] text-muted-foreground">
          Download Beta on
        </span>
        <span className="mt-1 type-button text-[18px]">
          TestFlight
        </span>
      </span>
    </a>
  );
}
