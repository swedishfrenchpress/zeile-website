import { AppStoreBadge } from "@/components/ui/app-store-badge";
import { TestFlightBadge } from "@/components/ui/testflight-badge";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface DownloadCtasProps {
  className?: string;
}

export function DownloadCtas({ className }: DownloadCtasProps) {
  const badgeClass =
    "w-full justify-center sm:w-auto sm:min-w-[216px] sm:px-5";

  return (
    <div
      className={cn(
        "flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5",
        className
      )}
    >
      <TestFlightBadge
        href={siteConfig.links.testFlight}
        className={badgeClass}
      />
      <AppStoreBadge
        href={siteConfig.links.appStore}
        className={badgeClass}
      />
    </div>
  );
}
