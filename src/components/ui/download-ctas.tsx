import { AppStoreBadge } from "@/components/ui/app-store-badge";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface DownloadCtasProps {
  className?: string;
}

/** The App Store is the single download destination now that zeile has launched. */
export function DownloadCtas({ className }: DownloadCtasProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-stretch justify-center gap-2 sm:items-center",
        className
      )}
    >
      <AppStoreBadge
        href={siteConfig.links.appStore}
        className="w-full justify-center sm:w-auto"
      />
    </div>
  );
}
