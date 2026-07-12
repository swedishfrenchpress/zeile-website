"use client";

import { ComposeMockup } from "@/components/mockups/compose-mockup";
import { ScreenshotPlaceholder } from "@/components/mockups/screenshot-placeholder";
import { WidgetCard } from "@/components/mockups/widget-card";
import { Section } from "@/components/section";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CARD_MIN_HEIGHTS = ["min-h-[420px]", "min-h-[420px]", "min-h-[420px]"];

/** your phone → their Home Screen: one send, one receive, nobody else */
function TwoPhones() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:items-center sm:gap-10">
      <ComposeMockup className="w-52 -rotate-2 sm:w-56" />
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
        note={{ type: "text", text: "thinking of you.", timestamp: "now" }}
        sender={siteConfig.hero.sender}
        size="small"
        animate={false}
        className="w-44 rotate-2 !p-4 text-left sm:w-48"
      />
    </div>
  );
}

export function BentoGrid() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

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
            <motion.div
              key={item.id}
              style={motions[index]}
              className={cn(
                // opaque note paper, never glass — the app's signature surface
                "note-surface group relative grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden p-6 sm:p-8",
                minHeight,
                item.fullWidth && "md:col-span-2"
              )}
            >
              <div className="flex min-w-0 flex-col">
                <h3 className="type-display-3 text-foreground">{item.title}</h3>
                <p className="mt-4 max-w-[52ch] type-body-lg text-foreground/70">
                  {item.content}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-center">
                {item.id === "audience-of-one" ? (
                  <TwoPhones />
                ) : item.screenshot ? (
                  <ScreenshotPlaceholder
                    screenshot={item.screenshot}
                    className="max-w-[240px] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0"
                  />
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
