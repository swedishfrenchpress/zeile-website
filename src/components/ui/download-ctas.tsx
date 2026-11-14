import { AppStoreBadge } from "@/components/ui/app-store-badge";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface DownloadCtasProps {
  className?: string;
  /** "start" left-aligns the badge and its note from 900px up (the hero column) */
  align?: "center" | "start";
  /** the one-line reassurance under the badge: free, and you both need it */
  showNote?: boolean;
}

/** The App Store is the single download destination now that zeile has launched. */
export function DownloadCtas({
  className,
  align = "center",
  showNote = true,
}: DownloadCtasProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-stretch justify-center gap-3",
        // one alignment class per breakpoint: Tailwind doesn't promise that
        // an arbitrary min-[900px] variant beats sm when both set align-items
        align === "start"
          ? "sm:max-[899px]:items-center min-[900px]:items-start"
          : "sm:items-center",
        className
      )}
    >
      <AppStoreBadge
        href={siteConfig.links.appStore}
        className="w-full justify-center sm:w-auto"
      />
      {showNote && (
        <p
          className={cn(
            "type-caption text-center text-muted-foreground",
            align === "start" && "min-[900px]:pl-1 min-[900px]:text-left"
          )}
        >
          {siteConfig.ctaNote}
        </p>
      )}
    </div>
  );
}
