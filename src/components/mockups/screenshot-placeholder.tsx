import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ScreenshotSlot {
  src: string;
  srcDark?: string;
  alt: string;
  /** flip to true in config once the real capture exists in /public */
  ready: boolean;
}

const FRAME_CLASS =
  "relative w-full overflow-hidden rounded-[28px] border border-border";

/**
 * A phone-screenshot slot. Until the real simulator capture lands in
 * public/images/screens/, it renders a dashed note-paper panel naming the
 * exact file to drop in; once `ready` is flipped in config it becomes a
 * theme-swapped next/image pair. iPhone captures are 1179×2556 (9:19.5).
 */
export function ScreenshotPlaceholder({
  screenshot,
  className,
}: {
  screenshot: ScreenshotSlot;
  className?: string;
}) {
  if (!screenshot.ready) {
    return (
      <div
        className={cn(
          FRAME_CLASS,
          "flex aspect-[9/16] flex-col items-center justify-center gap-3 border-2 border-dashed !border-rose-hairline bg-paper px-6 text-center",
          className
        )}
      >
        <span className="font-display text-sm font-bold text-primary">
          screenshot goes here
        </span>
        <code className="max-w-full break-all font-mono text-xs text-muted-foreground">
          {screenshot.src}
        </code>
        <span className="text-xs text-muted-foreground">
          1179 × 2556 simulator capture, then set ready: true in config
        </span>
      </div>
    );
  }

  return (
    <div className={cn(FRAME_CLASS, "aspect-[9/19.5]", className)}>
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        width={1179}
        height={2556}
        sizes="(min-width: 768px) 40vw, 80vw"
        className={cn(
          "h-full w-full select-none object-cover object-top",
          screenshot.srcDark && "dark:hidden"
        )}
        draggable={false}
      />
      {screenshot.srcDark && (
        <Image
          src={screenshot.srcDark}
          alt={screenshot.alt}
          width={1179}
          height={2556}
          sizes="(min-width: 768px) 40vw, 80vw"
          className="hidden h-full w-full select-none object-cover object-top dark:block"
          draggable={false}
        />
      )}
    </div>
  );
}
