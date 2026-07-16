import { AppStoreBadge } from "@/components/ui/app-store-badge";
import { TestFlightBadge } from "@/components/ui/testflight-badge";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface DownloadCtasProps {
  className?: string;
}

/**
 * Beta: one live door (TestFlight) + a quiet App Store note.
 * Launch: set APP_STORE_URL in config — both badges render as real links.
 */
export function DownloadCtas({ className }: DownloadCtasProps) {
  const appStoreHref = siteConfig.links.appStore;
  const appStoreLive = appStoreHref !== "#";

  return (
    <div
      className={cn(
        "flex w-full flex-col items-stretch justify-center gap-2 sm:items-center",
        appStoreLive && "gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5",
        className
      )}
    >
      <TestFlightBadge
        href={siteConfig.links.testFlight}
        className="w-full justify-center sm:w-auto"
      />
      {appStoreLive ? (
        <AppStoreBadge
          href={appStoreHref}
          className="w-full justify-center sm:w-auto sm:min-w-[216px] sm:px-5"
        />
      ) : (
        <p className="text-center type-label text-muted-foreground sm:text-left">
          App Store, soon.
        </p>
      )}
    </div>
  );
}
