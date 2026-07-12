import { Icons } from "@/components/icons";
import { storeBadgeClass } from "@/components/ui/store-badge";
import { cn } from "@/lib/utils";

interface AppStoreBadgeProps {
  href: string;
  className?: string;
}

// The primary CTA. While APP_STORE_URL is still the "#" placeholder the
// badge renders as-is but stays on-page; swap the constant in lib/config.tsx
// at launch and this becomes a real store link.
export function AppStoreBadge({ href, className }: AppStoreBadgeProps) {
  const isPlaceholder = href === "#";
  return (
    <a
      href={href}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noreferrer noopener"}
      aria-label="Download zeile on the App Store"
      className={cn(storeBadgeClass, className)}
    >
      <Icons.apple
        className="size-8 flex-shrink-0 fill-current"
        aria-hidden="true"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="type-button text-[11px] opacity-85">
          Download on the
        </span>
        <span className="mt-1 type-button text-[19px]">App Store</span>
      </span>
    </a>
  );
}
