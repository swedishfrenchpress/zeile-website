"use client";

import Image from "next/image";
import { ScreenshotPlaceholder } from "@/components/mockups/screenshot-placeholder";
import { WidgetCard } from "@/components/mockups/widget-card";
import { Section } from "@/components/section";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { useScroll, useTransform } from "framer-motion";
import * as m from "framer-motion/m";
import { Cloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CARD_MIN_HEIGHTS = ["min-h-[420px]", "min-h-[420px]", "min-h-[420px]"];
const NOTE_CYCLE_MS = 5200;

function ICloudTrustNote({
  note,
}: {
  note: { title: string; description?: string };
}) {
  return (
    <div className="flex items-start gap-3 rounded-[18px] border border-black/[0.05] bg-widget-paper p-4 text-left shadow-[var(--paper-shadow),0_10px_28px_-18px_var(--rose-glow)] dark:border-white/[0.07]">
      <Cloud
        aria-hidden="true"
        className="mt-0.5 size-7 shrink-0 text-primary"
        strokeWidth={2.25}
      />
      <div className="min-w-0">
        <p className="font-display text-sm font-extrabold leading-tight text-foreground">
          {note.title}
        </p>
        {note.description && (
          <p className="mt-1.5 text-xs leading-relaxed text-foreground/65">
            {note.description}
          </p>
        )}
      </div>
    </div>
  );
}

/** your phone → their Home Screen: one send, one receive, nobody else */
function TwoPhones({
  composeScreenshot,
  widgetImage,
}: {
  composeScreenshot: {
    src: string;
    srcDark: string;
    alt: string;
  };
  widgetImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:items-center sm:gap-10">
      <div
        role="img"
        aria-label={composeScreenshot.alt}
        className="w-52 overflow-hidden rounded-[26px] border border-border bg-background shadow-[var(--paper-shadow)] -rotate-2 sm:w-60"
      >
        <Image
          src={composeScreenshot.src}
          alt=""
          width={1320}
          height={1981}
          sizes="(min-width: 640px) 240px, 208px"
          className="h-auto w-full select-none dark:hidden"
          draggable={false}
        />
        <Image
          src={composeScreenshot.srcDark}
          alt=""
          width={1320}
          height={1981}
          sizes="(min-width: 640px) 240px, 208px"
          className="hidden h-auto w-full select-none dark:block"
          draggable={false}
        />
      </div>
      {/* the hand-drawn hop from your phone to theirs */}
      <svg
        aria-hidden
        viewBox="0 0 100 62"
        fill="none"
        className="w-16 shrink-0 rotate-90 text-muted-foreground/60 sm:w-20 sm:rotate-0"
      >
        <path
          d="M6 48 C24 42, 34 46, 40 34 C46 21, 34 16, 35 28 C37 42, 60 38, 78 26 M68 16 L82 23 L74 37"
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <WidgetCard
        note={{ type: "doodle", doodle: "cat", timestamp: "" }}
        sender={siteConfig.hero.sender}
        size="small"
        animate={false}
        image={widgetImage}
        showSenderMark={false}
        showTimestamp={false}
        className="w-44 rotate-2 text-left sm:w-48 lg:w-56"
      />
    </div>
  );
}

export function BentoGrid() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { sampleNotes, sender } = siteConfig.hero;
  const [noteIndex, setNoteIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || sampleNotes.length < 2) return;
    const timer = setInterval(
      () => setNoteIndex((i) => (i + 1) % sampleNotes.length),
      NOTE_CYCLE_MS
    );
    return () => clearInterval(timer);
  }, [reduceMotion, sampleNotes.length]);

  const note = sampleNotes[noteIndex];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0, 1], {
    ease: easeInOutCubic,
  });
  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, 1], {
    ease: easeInOutCubic,
  });
  const opacity3 = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 1], {
    ease: easeInOutCubic,
  });
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.3], [80, 80, 0], {
    ease: easeInOutCubic,
  });
  const y2 = useTransform(scrollYProgress, [0, 0.2, 0.4], [80, 80, 0], {
    ease: easeInOutCubic,
  });
  const y3 = useTransform(scrollYProgress, [0, 0.3, 0.5], [80, 80, 0], {
    ease: easeInOutCubic,
  });

  const motions = reduceMotion
    ? [{}, {}, {}]
    : [
        { opacity: opacity1, y: y1 },
        { opacity: opacity2, y: y2 },
        { opacity: opacity3, y: y3 },
      ];

  return (
    <Section
      id="bento"
      variant="editorial"
      hideHeader
      className="container-page px-6 py-[var(--section-y-base)] lg:px-10"
      ref={ref}
    >
      {/* md collapse: multi-item grids (this, footer) break at md;
          two-panel text+media sections break at lg. */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {siteConfig.bento.map((item, index) => {
          const minHeight =
            CARD_MIN_HEIGHTS[index] ?? CARD_MIN_HEIGHTS[CARD_MIN_HEIGHTS.length - 1];
          return (
            <m.div
              key={item.id}
              style={motions[index] as unknown as React.CSSProperties}
              className={cn(
                // opaque note paper, never glass — the app's signature surface
                "blur-reveal note-surface group relative grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden p-6 sm:p-8",
                minHeight,
                item.fullWidth && "md:col-span-2"
              )}
            >
              <div className="flex min-w-0 flex-col">
                <h3 className="type-display-3 text-foreground">{item.title}</h3>
                <p
                  className={cn(
                    "mt-4 type-body-lg text-foreground/70",
                    item.fullWidth ? "max-w-[65ch]" : "max-w-[52ch]"
                  )}
                >
                  {item.content}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-center">
                {item.id === "audience-of-one" ? (
                  <TwoPhones
                    composeScreenshot={item.composeScreenshot!}
                    widgetImage={item.widgetImage!}
                  />
                ) : item.id === "write-or-draw" ? (
                  <WidgetCard
                    note={note}
                    sender={sender}
                    size="medium"
                    animate={!reduceMotion}
                    className="w-full max-w-[280px] text-left"
                  />
                ) : item.id === "no-signup" ? (
                  <div className="relative mx-auto w-full max-w-[390px] pt-24 transition-transform duration-500 group-hover:-translate-y-1 sm:pt-16 motion-reduce:group-hover:translate-y-0">
                    <ScreenshotPlaceholder
                      screenshot={item.screenshot!}
                      className="mx-auto max-w-[240px] rotate-1"
                    />
                    <div className="absolute top-0 left-0 w-[240px] max-w-[calc(100%-1rem)] -rotate-2">
                      <ICloudTrustNote note={item.trustNote!} />
                    </div>
                  </div>
                ) : item.screenshot ? (
                  <ScreenshotPlaceholder
                    screenshot={item.screenshot}
                    className="max-w-[240px] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0"
                  />
                ) : null}
              </div>
            </m.div>
          );
        })}
      </div>
    </Section>
  );
}
