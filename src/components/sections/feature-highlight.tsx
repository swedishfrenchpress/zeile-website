"use client";

import { Section } from "@/components/section";
import { Drawing, DRAWINGS } from "@/components/mockups/drawings";
import type { DrawingName } from "@/components/mockups/drawings";
import { WidgetCard } from "@/components/mockups/widget-card";
import { siteConfig } from "@/lib/config";
import {
  easeOutCubic,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_SM,
} from "@/lib/animation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
          note={{ type: "text", text: "back at six. walk?", timestamp: "2m" }}
          sender={siteConfig.hero.sender}
          size="small"
          animate={false}
          className="col-span-2 row-span-2 text-left"
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
/* Media: the drawing carousel — six sketches, dot-per-drawing        */
/* ------------------------------------------------------------------ */

const CAROUSEL: DrawingName[] = [
  "cheeks",
  "cat",
  "icecream",
  "cheers",
  "blowkiss",
  "sleepy",
];

const CAROUSEL_INTERVAL_MS = 3800;

function DrawingCarousel({ reduceMotion }: { reduceMotion: boolean }) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const name = CAROUSEL[index];

  // Auto-advance only while on screen and motion is welcome; a manual dot
  // click restarts the timer (index is a dependency). Reduced motion keeps
  // the dots fully usable — it just never advances on its own.
  useEffect(() => {
    if (reduceMotion || !inView) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % CAROUSEL.length),
      CAROUSEL_INTERVAL_MS
    );
    return () => clearInterval(timer);
  }, [reduceMotion, inView, index]);

  return (
    <div className="w-full max-w-[320px]">
      {/* the drawing ground is always canvas white — strokes must read the
          same in light and dark, exactly like the app's PencilKit exports.
          Fixed square stage: drawings crossfade in place, nothing reflows. */}
      <motion.div
        className="relative aspect-square overflow-hidden rounded-note border border-rose-hairline bg-canvas-white shadow-[var(--paper-shadow)]"
        onViewportEnter={() => setInView(true)}
        onViewportLeave={() => setInView(false)}
        viewport={{ margin: "-80px" }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={name}
            className="absolute inset-0 flex items-center justify-center p-6"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutCubic }}
          >
            <Drawing
              name={name}
              animate={!reduceMotion}
              className="h-full w-full"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* carousel dots, one per drawing, each wearing its drawing's color */}
      <div
        role="tablist"
        aria-label="Example drawings"
        className="mt-5 flex items-center justify-center gap-4"
      >
        {CAROUSEL.map((drawingName, i) => (
          <button
            key={drawingName}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${DRAWINGS[drawingName].label}`}
            onClick={() => setIndex(i)}
            className={cn(
              "size-4 rounded-full transition-transform duration-200 ease-out-quart hover:scale-110 motion-reduce:hover:scale-100",
              i === index &&
                "ring-2 ring-ring ring-offset-2 ring-offset-background"
            )}
            style={{ backgroundColor: DRAWINGS[drawingName].dot }}
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
          <DrawingCarousel reduceMotion={reduceMotion} />
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

    // A band around the vertical center of the viewport. The reveal LATCHES:
    // once the text has appeared it never fades back out — content that
    // vanishes as you scroll past reads as broken, not choreographed.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-35% 0px -35% 0px" }
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
