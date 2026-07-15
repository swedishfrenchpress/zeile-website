"use client";

import { Section } from "@/components/section";
import { Drawing, DRAWINGS } from "@/components/mockups/drawings";
import type { DrawingName } from "@/components/mockups/drawings";
import { WidgetCard } from "@/components/mockups/widget-card";
import {
  HomeScreenVideo,
  type HomeScreenVideoConfig,
} from "@/components/mockups/home-screen-video";
import { siteConfig, type FeatureHighlightItem } from "@/lib/config";
import {
  easeOutCubic,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_SM,
} from "@/lib/animation";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import * as m from "framer-motion/m";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

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
      aria-label="The zeile widget on an iPhone Home Screen, showing a note from Erik"
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
const SWIPE_OFFSET_THRESHOLD = 48;
const SWIPE_VELOCITY_THRESHOLD = 420;

const drawingVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 20 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -20 }),
};

function DrawingCarousel({ reduceMotion }: { reduceMotion: boolean }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [inView, setInView] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dotRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const name = CAROUSEL[index];

  // Once a visitor takes control, the carousel stays under their control.
  useEffect(() => {
    if (reduceMotion || !inView || hasInteracted) return;
    const timer = setInterval(
      () => {
        setDirection(1);
        setIndex((current) => (current + 1) % CAROUSEL.length);
      },
      CAROUSEL_INTERVAL_MS
    );
    return () => clearInterval(timer);
  }, [reduceMotion, inView, hasInteracted]);

  const selectDrawing = (nextIndex: number) => {
    const normalized = (nextIndex + CAROUSEL.length) % CAROUSEL.length;
    if (normalized !== index) {
      setDirection(normalized > index ? 1 : -1);
      setIndex(normalized);
    }
    setHasInteracted(true);
  };

  const stepDrawing = (step: -1 | 1) => {
    setDirection(step);
    setIndex((current) => (current + step + CAROUSEL.length) % CAROUSEL.length);
    setHasInteracted(true);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const hasSwipeIntent =
      Math.abs(info.offset.x) >= SWIPE_OFFSET_THRESHOLD ||
      Math.abs(info.velocity.x) >= SWIPE_VELOCITY_THRESHOLD;

    if (hasSwipeIntent) {
      stepDrawing(info.offset.x < 0 ? 1 : -1);
    }
  };

  const handleDotKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % CAROUSEL.length;
    if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + CAROUSEL.length) % CAROUSEL.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = CAROUSEL.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    selectDrawing(nextIndex);
    dotRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="w-full max-w-[320px]">
      {/* the drawing ground is always canvas white — strokes must read the
          same in light and dark, exactly like the app's PencilKit exports.
          Fixed square stage: drawings crossfade in place, nothing reflows. */}
      <m.div
        id="drawing-carousel-panel"
        role="tabpanel"
        aria-label={DRAWINGS[name].label}
        className="relative aspect-square touch-pan-y overflow-hidden rounded-note border border-rose-hairline bg-canvas-white shadow-[var(--paper-shadow)]"
        drag={reduceMotion ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={handleDragEnd}
        onViewportEnter={() => setInView(true)}
        onViewportLeave={() => setInView(false)}
        viewport={{ margin: "-80px" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <m.div
            key={name}
            className="absolute inset-0 flex items-center justify-center p-6"
            custom={direction}
            variants={reduceMotion ? undefined : drawingVariants}
            initial={reduceMotion ? false : "enter"}
            animate={reduceMotion ? undefined : "center"}
            exit={reduceMotion ? undefined : "exit"}
            transition={{ duration: 0.35, ease: easeOutCubic }}
          >
            <Drawing
              name={name}
              animate={!reduceMotion}
              className="h-full w-full"
            />
          </m.div>
        </AnimatePresence>
      </m.div>

      {/* carousel dots, one per drawing, each wearing its drawing's color */}
      <div
        role="tablist"
        aria-label="Example drawings"
        onKeyDown={handleDotKeyDown}
        className="mt-3 flex items-center justify-center gap-1"
      >
        {CAROUSEL.map((drawingName, i) => (
          <m.button
            key={drawingName}
            ref={(element) => {
              dotRefs.current[i] = element;
            }}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls="drawing-carousel-panel"
            aria-label={`Show ${DRAWINGS[drawingName].label}`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => selectDrawing(i)}
            whileTap={reduceMotion ? undefined : { scale: 0.86 }}
            className="group inline-flex size-11 items-center justify-center rounded-full"
          >
            <span
              aria-hidden
              className={cn(
                "size-4 rounded-full transition-transform duration-200 ease-out-quart group-hover:scale-110 motion-reduce:transition-none",
                i === index &&
                  "ring-2 ring-ring ring-offset-2 ring-offset-background"
              )}
              style={{ backgroundColor: DRAWINGS[drawingName].dot }}
            />
          </m.button>
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
  video?: HomeScreenVideoConfig;
  isActive: boolean;
  layout: FeatureLayout;
  reduceMotion: boolean;
}

function Feature({
  title,
  description,
  media,
  video,
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
    <div
      className={cn(
        "grid grid-cols-12 items-center gap-x-6 gap-y-10 lg:gap-x-10",
        media === "widget" && "lg:items-start"
      )}
    >
      <m.div
        className={cn("blur-reveal col-span-12 lg:row-start-1", layout.textClass)}
        initial={reduceMotion ? "visible" : "hidden"}
        animate={animateState}
        variants={textVariants}
      >
        <div className="flex max-w-xl flex-col gap-6">
          <m.h2
            className="blur-reveal type-display-2 text-foreground"
            variants={itemVariants}
          >
            {title}
          </m.h2>
          <m.p
            className="blur-reveal type-lead max-w-[50ch] text-foreground/75"
            variants={itemVariants}
          >
            {description}
          </m.p>
        </div>
      </m.div>

      <div
        className={cn(
          "col-span-12 flex justify-center lg:row-start-1",
          layout.mediaClass,
          layout.mediaAlignClass
        )}
      >
        {media === "widget" ? (
          video && !reduceMotion ? (
            <HomeScreenVideo
              {...video}
              playMode="in-view-once"
              ariaLabel="A screen recording of adding the zeile widget to an iPhone Home Screen, where a note from Erik appears"
            />
          ) : (
            <HomeScreenWidget reduceMotion={reduceMotion} />
          )
        ) : (
          <DrawingCarousel reduceMotion={reduceMotion} />
        )}
      </div>
    </div>
  );
}

interface FeatureHighlightProps {
  feature: FeatureHighlightItem;
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
  const reduceMotion = useHydratedReducedMotion();
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    return () => observer.disconnect();
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
        video={feature.video}
        reduceMotion={reduceMotion}
      />
    </Section>
  );
}
