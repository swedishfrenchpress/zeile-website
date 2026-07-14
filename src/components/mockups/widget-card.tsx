"use client";

import Image from "next/image";
import { Drawing } from "@/components/mockups/drawings";
import type { SampleNote } from "@/lib/config";
import { easeOutCubic, easeOutQuart } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

/**
 * A pixel-faithful CSS recreation of the zeile home-screen widget — the
 * app's "front door" (ZeileWidgetView). Blush widget paper, a soft rose
 * bloom in the top-left by the heart, "♥ from <name>" in the rounded voice,
 * and the note (text or drawing) as the hero. The sender heart pops once
 * when an animated widget first appears, then stays still.
 *
 * The card itself never moves or re-mounts: arriving notes crossfade in
 * place inside a fixed-height body, so cycling causes zero layout shift.
 */

export function HeartMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 21.35c-.4 0-.79-.14-1.1-.42C7.14 17.56 2.5 13.74 2.5 9.3 2.5 6.42 4.77 4.1 7.6 4.1c1.7 0 3.31.83 4.4 2.2a5.62 5.62 0 0 1 4.4-2.2c2.83 0 5.1 2.32 5.1 5.2 0 4.44-4.64 8.26-8.4 11.63-.31.28-.7.42-1.1.42Z" />
    </svg>
  );
}

interface WidgetCardProps {
  note: SampleNote;
  sender: string;
  /** optional real drawing export, rendered on the widget's white note card */
  image?: {
    src: string;
    srcDark?: string;
    alt: string;
    altDark?: string;
    width: number;
    height: number;
  };
  /** hide the sender row when the card is used only as a note preview */
  showSenderMark?: boolean;
  /** hide the received time for static marketing examples */
  showTimestamp?: boolean;
  size?: "small" | "medium";
  /** play arrival animations (crossfade, word stagger, self-drawing ink) */
  animate?: boolean;
  className?: string;
}

export function WidgetCard({
  note,
  sender,
  image,
  showSenderMark = true,
  showTimestamp = true,
  size = "medium",
  animate = false,
  className,
}: WidgetCardProps) {
  const compact = size === "small";
  const showHeader = showSenderMark || showTimestamp;
  const words = note.text?.split(" ") ?? [];
  const noteKey = image?.src ?? (note.type === "text" ? note.text : note.doodle);

  const body =
    image ? (
      <div className="flex h-full w-full items-center justify-center rounded-[12px] border border-border bg-canvas-white p-1.5">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={compact ? "192px" : "320px"}
          className={cn(
            "h-full w-full object-contain",
            image.srcDark && "dark:hidden"
          )}
          draggable={false}
        />
        {image.srcDark && (
          <Image
            src={image.srcDark}
            alt={image.altDark ?? image.alt}
            width={image.width}
            height={image.height}
            sizes={compact ? "192px" : "320px"}
            className="hidden h-full w-full object-contain dark:block"
            draggable={false}
          />
        )}
      </div>
    ) : note.type === "text" ? (
      <p
        className={cn(
          "text-foreground",
          compact
            ? "font-display text-[15px] font-semibold leading-snug"
            : "type-note"
        )}
      >
        {animate
          ? words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block whitespace-pre"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: easeOutQuart,
                  delay: 0.2 + i * 0.06,
                }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            ))
          : note.text}
      </p>
    ) : (
      // drawings keep their white-composited card, hairline-framed,
      // so ink reads in light and dark alike
      <div className="flex aspect-square h-full max-h-full items-center justify-center rounded-[12px] border border-border bg-canvas-white p-2">
        <Drawing
          name={note.doodle ?? "flower"}
          animate={animate}
          className="h-full w-auto"
        />
      </div>
    );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-black/[0.05] bg-widget-paper shadow-[var(--paper-shadow)] dark:border-white/[0.07]",
        // both sizes are square — the real widget is a square on the Home
        // Screen, and the hero shows it true to shape, just bigger
        compact ? "aspect-square rounded-[18px] p-4" : "aspect-square p-5 sm:p-6",
        className
      )}
    >
      {/* the rose bloom, top-left by the heart — the widget's one flourish */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 14% 0%, var(--rose-wash), transparent 58%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        {showHeader && (
          <div className={cn("flex items-center gap-1.5", compact && "gap-1")}>
            {showSenderMark && (
              <>
                <motion.span
                  className="inline-flex shrink-0 text-primary"
                  initial={animate ? { scale: 0 } : false}
                  animate={{ scale: 1 }}
                  transition={
                    animate
                      ? {
                          type: "spring",
                          bounce: 0.45,
                          duration: 0.5,
                          delay: 0.15,
                        }
                      : { duration: 0 }
                  }
                >
                  <HeartMark className={compact ? "size-3" : "size-3.5"} />
                </motion.span>
                <span
                  className={cn(
                    "whitespace-nowrap font-display font-bold text-primary",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  From {sender}
                </span>
              </>
            )}
            {showTimestamp && (
              <span
                className={cn(
                  "ml-auto font-medium text-muted-foreground",
                  compact ? "text-[10px]" : "text-xs"
                )}
              >
                {note.timestamp}
              </span>
            )}
          </div>
        )}

        {/* fixed-height stage: notes crossfade in place, never reflow */}
        <div
          className={cn(
            "relative flex-1",
            showHeader && (compact ? "mt-2" : "mt-3")
          )}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={noteKey}
              className={cn(
                "absolute inset-0 flex items-center",
                (image || (note.type === "doodle" && !compact)) &&
                  "justify-center"
              )}
              initial={animate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={animate ? { opacity: 0 } : undefined}
              transition={{ duration: 0.4, ease: easeOutCubic }}
            >
              {body}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
