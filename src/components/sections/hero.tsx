"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";
import { DrawingVideo } from "@/components/mockups/drawing-video";
import { WidgetCard } from "@/components/mockups/widget-card";
import { DoodleField } from "@/components/paper/doodle-field";
import { AppStoreBadge } from "@/components/ui/app-store-badge";
import {
  easeOutCubic,
  easeOutQuart,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_MD,
  REVEAL_DURATION_SM,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { SECTION_DOODLES } from "@/lib/doodles";

const emptySubscribe = () => () => {};
const HERO_VIDEO_PLAYBACK_RATE = 9;

function HeroMediaSequence({
  theme,
  reduceMotion,
}: {
  theme?: "light" | "dark";
  reduceMotion: boolean;
}) {
  const [playbackComplete, setPlaybackComplete] = useState(false);
  const complete = reduceMotion || playbackComplete;
  const { drawingVideo, finalWidgetImage, sender } = siteConfig.hero;

  return (
    <div className="relative mx-auto h-[570px] w-full max-w-[360px] sm:h-[630px] sm:max-w-[500px] lg:h-[700px] lg:max-w-[620px]">
      {!reduceMotion && (
        <svg
          aria-hidden
          viewBox="0 0 620 700"
          preserveAspectRatio="none"
          fill="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible text-foreground/15"
        >
          <motion.path
            d="M310 638 C270 600 62 469 62 272 C62 132 204 74 310 194 C416 74 558 132 558 272 C558 469 350 600 310 638"
            transform="translate(110 -24) rotate(14 310 350)"
            stroke="currentColor"
            strokeWidth={5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{
              pathLength: complete ? 1 : 0,
              opacity: complete ? 1 : 0,
            }}
            transition={
              complete
                ? {
                    pathLength: {
                      duration: 0.9,
                      delay: 0.72,
                      ease: easeOutQuart,
                    },
                    opacity: { duration: 0.2, delay: 0.72 },
                  }
                : { duration: 0 }
            }
          />
        </svg>
      )}

      <div className="absolute top-0 left-1/2 z-10 w-[250px] -translate-x-1/2 sm:w-[270px] lg:w-[310px]">
        <motion.div
          initial={false}
          animate={
            reduceMotion
              ? { x: "-22%", rotate: -6 }
              : {
                  x: complete ? "-22%" : "0%",
                  rotate: complete ? -6 : -1,
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: easeOutQuart,
          }}
          className="origin-bottom"
        >
          <DrawingVideo
            video={drawingVideo}
            theme={theme}
            reduceMotion={reduceMotion}
            playbackRate={HERO_VIDEO_PLAYBACK_RATE}
            onEnded={() => setPlaybackComplete(true)}
            onPlaybackUnavailable={() => setPlaybackComplete(true)}
            className="max-w-none shadow-[var(--paper-shadow)]"
          />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {complete && (
          <motion.div
            key="completed-widget"
            initial={
              reduceMotion
                ? false
                : { y: 96, opacity: 0, filter: "blur(10px)", rotate: 2 }
            }
            animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotate: 8 }}
            exit={{ y: 36, opacity: 0, filter: "blur(4px)", rotate: 4 }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              ease: easeOutQuart,
            }}
            className="absolute top-[270px] right-0 z-20 w-[190px] origin-bottom-left sm:top-[300px] sm:w-[230px] lg:top-[315px] lg:w-[280px]"
          >
            <WidgetCard
              note={{ type: "doodle", doodle: "cat", timestamp: "now" }}
              sender={sender}
              image={finalWidgetImage}
              size="medium"
              animate={!reduceMotion}
              className="w-full text-left"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroMedia({ reduceMotion }: { reduceMotion: boolean }) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const theme = mounted
    ? resolvedTheme === "dark"
      ? "dark"
      : "light"
    : undefined;

  return (
    <HeroMediaSequence
      key={theme ?? "unresolved"}
      theme={theme}
      reduceMotion={reduceMotion}
    />
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const { headline } = siteConfig.hero;

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <DoodleField section={SECTION_DOODLES.hero} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[62vh]"
        style={{
          background:
            "radial-gradient(64% 52% at 50% 0%, var(--rose-wash), transparent 72%)",
        }}
      />

      <div className="container-page relative z-10 min-h-[90svh] px-6 pt-28 pb-16 lg:px-10 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(560px,1.18fr)] lg:gap-8 xl:gap-14">
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: REVEAL_DURATION_MD,
                      ease: easeOutCubic,
                      delay: 0,
                    }
              }
              className="mb-8 sm:mb-10"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full bg-paper px-5 py-2.5 shadow-[var(--paper-shadow)]">
                <span aria-hidden className="size-2.5 rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.11em] sm:text-sm">
                  <span className="text-foreground">100% free</span>
                  <span className="text-foreground/35"> · </span>
                  <span className="text-foreground/55">no subscriptions</span>
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : { filter: "blur(10px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: REVEAL_DURATION_LG,
                      ease: easeOutQuart,
                      delay: 0,
                    }
              }
              className="max-w-[9ch] type-display-1 text-foreground"
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: REVEAL_DURATION_MD,
                      ease: easeOutCubic,
                      delay: REVEAL_STAGGER,
                    }
              }
              className="mt-8 max-w-[42ch] type-lead text-foreground/75 sm:mt-10"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: REVEAL_DURATION_SM,
                      ease: easeOutCubic,
                      delay: REVEAL_STAGGER * 2,
                    }
              }
              className="mt-10 flex w-full max-w-xs justify-center sm:w-auto sm:max-w-none lg:justify-start"
            >
              <AppStoreBadge
                href={siteConfig.links.appStore}
                className="w-full justify-center sm:w-auto"
              />
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: REVEAL_DURATION_LG,
                    ease: easeOutCubic,
                    delay: REVEAL_STAGGER,
                  }
            }
            className="min-w-0"
          >
            <HeroMedia reduceMotion={reduceMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
