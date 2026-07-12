"use client";

import { Section } from "@/components/section";
import { WidgetCard } from "@/components/mockups/widget-card";
import { siteConfig } from "@/lib/config";
import {
  easeOutCubic,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_SM,
} from "@/lib/animation";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FeatureLayout {
  textClass: string;
  mediaClass: string;
  mediaAlignClass: string;
}

// lg collapse: two-panel text+media sections (this, pairing) break at lg;
// multi-item grids (bento, footer) break at md.
const LAYOUTS: FeatureLayout[] = [
  {
    textClass: "lg:col-span-5 lg:col-start-1",
    mediaClass: "lg:col-span-6 lg:col-start-7",
    mediaAlignClass: "lg:justify-end",
  },
  {
    textClass: "lg:col-span-6 lg:col-start-7",
    mediaClass: "lg:col-span-5 lg:col-start-1",
    mediaAlignClass: "lg:justify-start",
  },
];

/* ------------------------------------------------------------------ */
/* Media: the small widget at home on a faint Home Screen             */
/* ------------------------------------------------------------------ */

function HomeScreenWidget({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      role="img"
      aria-label="The zeile widget on an iPhone Home Screen, showing a note from Sam"
      className="w-full max-w-[320px] rounded-[28px] border border-border bg-background p-5"
    >
      {/* a quiet 4-column icon grid; the small widget takes a 2×2 slot,
          exactly where it lives in real life */}
      <div className="grid grid-cols-4 gap-4">
        <WidgetCard
          note={{ type: "text", text: "back at six. walk after?", timestamp: "2m" }}
          sender={siteConfig.hero.sender}
          size="small"
          animate={false}
          className="col-span-2 row-span-2 !p-4 text-left"
        />
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            aria-hidden
            className="aspect-square rounded-[22%] bg-muted"
          />
        ))}
      </div>
      <div
        aria-hidden
        className={cn(
          "mx-auto mt-5 h-1 w-24 rounded-full bg-muted-foreground/30",
          reduceMotion && "opacity-100"
        )}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Media: the drawing canvas where a doodle draws itself              */
/* ------------------------------------------------------------------ */

const CANVAS_STROKES: { d: string; ink: string }[] = [
  // flower head — red ink
  {
    d: "M50 34 C43 14, 58 12, 52 30 C68 18, 78 30, 55 36 C76 42, 68 56, 51 40 C54 60, 39 58, 46 40 C24 48, 20 32, 44 32",
    ink: "var(--ink-red)",
  },
  // stem + leaf — green ink
  {
    d: "M49 42 C47 56, 51 66, 46 82 M46 66 C39 60, 33 60, 27 64",
    ink: "var(--ink-green)",
  },
  // "hi" underline flourish — charcoal
  { d: "M62 74 C70 70, 80 71, 88 73", ink: "var(--ink-charcoal)" },
];

const INK_SWATCHES = [
  "var(--ink-charcoal)",
  "var(--ink-red)",
  "var(--ink-orange)",
  "var(--ink-green)",
  "var(--ink-blue)",
  "var(--ink-purple)",
];

function DrawingCanvas({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="w-full max-w-[320px]">
      <div
        role="img"
        aria-label="The zeile drawing canvas with a hand-drawn flower"
        className="note-surface relative flex aspect-square items-center justify-center overflow-hidden !bg-canvas-white p-6 dark:!bg-canvas-white"
      >
        <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
          {CANVAS_STROKES.map((stroke, i) => (
            <motion.path
              key={i}
              d={stroke.d}
              stroke={stroke.ink}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.9, ease: easeOutCubic, delay: 0.2 + i * 0.5 }
              }
            />
          ))}
        </svg>
      </div>
      {/* the ink control bar: six inks, charcoal selected */}
      <div
        aria-hidden
        className="mt-5 flex items-center justify-center gap-4"
      >
        {INK_SWATCHES.map((ink, i) => (
          <span
            key={ink}
            className={cn(
              "size-4 rounded-full",
              i === 0 && "ring-2 ring-ring ring-offset-2 ring-offset-background"
            )}
            style={{ backgroundColor: ink }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface FeatureProps {
  title: string;
  description: string;
  media: "widget" | "drawing";
  isActive: boolean;
  layout: FeatureLayout;
  reduceMotion: boolean;
}

function Feature({
  title,
  description,
  media,
  isActive,
  layout,
  reduceMotion,
}: FeatureProps) {
  const textVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: REVEAL_DURATION_LG,
        ease: easeOutCubic,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: REVEAL_DURATION_SM, ease: easeOutCubic },
    },
  };

  const animateState = reduceMotion || isActive ? "visible" : "hidden";

  return (
    <div className="grid grid-cols-12 items-center gap-x-6 gap-y-10 lg:gap-x-10">
      <motion.div
        className={cn("col-span-12 lg:row-start-1", layout.textClass)}
        initial={reduceMotion ? "visible" : "hidden"}
        animate={animateState}
        variants={textVariants}
      >
        <div className="flex max-w-xl flex-col gap-6">
          <motion.h2
            className="type-display-2 text-foreground"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <motion.p
            className="type-lead text-foreground/75 max-w-[50ch]"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>

      <div
        className={cn(
          "col-span-12 flex justify-center lg:row-start-1",
          layout.mediaClass,
          layout.mediaAlignClass
        )}
      >
        {media === "widget" ? (
          <HomeScreenWidget reduceMotion={reduceMotion} />
        ) : (
          <DrawingCanvas reduceMotion={reduceMotion} />
        )}
      </div>
    </div>
  );
}

interface FeatureHighlightProps {
  feature: (typeof siteConfig.featureHighlight)[number];
  layoutIndex: number;
  className?: string;
  id?: string;
}

export function FeatureHighlight({
  feature,
  layoutIndex,
  className,
  id,
}: FeatureHighlightProps) {
  const layout = LAYOUTS[layoutIndex] ?? LAYOUTS[LAYOUTS.length - 1];
  const reduceMotion = useReducedMotion() ?? false;
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // A zero-height root at the vertical center of the viewport: the callback
    // fires exactly when the section's bounds straddle that line.
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Section
      id={id}
      variant="editorial"
      hideHeader
      className={cn("container-page px-6 lg:px-10", className)}
      ref={containerRef}
    >
      <Feature
        isActive={isActive}
        layout={layout}
        title={feature.title}
        description={feature.description}
        media={feature.media}
        reduceMotion={reduceMotion}
      />
    </Section>
  );
}
