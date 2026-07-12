"use client";

import type { SampleNote } from "@/lib/config";
import { easeOutCubic, easeOutQuart } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * A pixel-faithful CSS recreation of the zeile home-screen widget — the
 * app's "front door" (ZeileWidgetView). Blush widget paper, a soft rose
 * bloom in the top-left by the heart, "♥ from <name>" in the rounded voice,
 * and the note (text or doodle) as the hero.
 *
 * The heart here is THE one heart on the entire site (the app's One-Heart
 * Rule: it marks a note that came from your person — never decoration).
 * It pops once per arriving note, spring-in, never loops.
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

/* The note drawings — quick pen sketches as they'd arrive from the canvas.
   Fixed ink palette (--ink-*): drawings always composite on canvas white,
   exactly like the app's PencilKit exports. */
const WIDGET_DRAWINGS: Record<
  "flower" | "smiley",
  { paths: { d: string; ink: string }[]; viewBox: string; label: string }
> = {
  flower: {
    viewBox: "0 0 100 100",
    label: "A hand-drawn flower",
    paths: [
      {
        d: "M50 40 C43 18, 59 16, 52 36 C70 22, 80 36, 56 42 C78 48, 70 64, 52 46 C55 68, 39 66, 47 46 C26 56, 20 38, 45 38",
        ink: "var(--ink-red)",
      },
      {
        d: "M50 50 C48 64, 52 76, 47 92 M47 74 C40 68, 34 68, 28 72",
        ink: "var(--ink-green)",
      },
    ],
  },
  smiley: {
    viewBox: "0 0 100 100",
    label: "A hand-drawn smiley face",
    paths: [
      {
        d: "M50 10 C74 10, 90 28, 89 51 C88 74, 71 90, 49 89 C27 88, 11 71, 12 49 C13 27, 28 11, 50 10 Z",
        ink: "var(--ink-orange)",
      },
      {
        d: "M37 40 C37 43, 37 45, 37 48 M64 39 C64 42, 64 44, 64 47 M33 62 C40 72, 60 73, 68 61",
        ink: "var(--ink-charcoal)",
      },
    ],
  },
};

function NoteDrawing({
  drawing,
  animate,
  className,
}: {
  drawing: "flower" | "smiley";
  animate: boolean;
  className?: string;
}) {
  const art = WIDGET_DRAWINGS[drawing];
  return (
    <svg
      viewBox={art.viewBox}
      fill="none"
      role="img"
      aria-label={art.label}
      className={className}
    >
      {art.paths.map((path, i) => (
        <motion.path
          key={i}
          d={path.d}
          stroke={path.ink}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={
            animate
              ? { duration: 0.9, ease: easeOutCubic, delay: 0.25 + i * 0.55 }
              : { duration: 0 }
          }
        />
      ))}
    </svg>
  );
}

interface WidgetCardProps {
  note: SampleNote;
  sender: string;
  size?: "small" | "medium";
  /** play the arrival animation (heart pop, word stagger, self-drawing ink) */
  animate?: boolean;
  className?: string;
}

export function WidgetCard({
  note,
  sender,
  size = "medium",
  animate = false,
  className,
}: WidgetCardProps) {
  const words = note.text?.split(" ") ?? [];

  const compact = size === "small";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-black/[0.05] bg-widget-paper shadow-[var(--paper-shadow)] dark:border-white/[0.07]",
        compact ? "aspect-square rounded-[18px] p-4" : "aspect-[2.05/1] p-5 sm:p-6",
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
        <div className={cn("flex items-center gap-1.5", compact && "gap-1")}>
          <motion.span
            className="inline-flex shrink-0 text-primary"
            initial={animate ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            transition={
              animate
                ? { type: "spring", bounce: 0.45, duration: 0.5, delay: 0.15 }
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
            from {sender}
          </span>
          <span
            className={cn(
              "ml-auto font-medium text-muted-foreground",
              compact ? "text-[10px]" : "text-xs"
            )}
          >
            {note.timestamp}
          </span>
        </div>

        {note.type === "text" ? (
          <div className="flex flex-1 items-center">
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
                        delay: 0.25 + i * 0.06,
                      }}
                    >
                      {word}
                      {i < words.length - 1 ? " " : ""}
                    </motion.span>
                  ))
                : note.text}
            </p>
          </div>
        ) : (
          <div className="mt-3 flex flex-1 items-center justify-start">
            {/* drawings keep their white-composited card, hairline-framed,
                so ink reads in light and dark alike */}
            <div className="flex aspect-square h-full max-h-full items-center justify-center rounded-[12px] border border-border bg-canvas-white p-2">
              <NoteDrawing
                drawing={note.doodle ?? "flower"}
                animate={animate}
                className="h-full w-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
