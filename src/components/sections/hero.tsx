"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";
import { DrawingVideo } from "@/components/mockups/drawing-video";
import { WidgetCard } from "@/components/mockups/widget-card";
import { DoodleField } from "@/components/paper/doodle-field";
import { DownloadCtas } from "@/components/ui/download-ctas";
import { easeOutQuart } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { SECTION_DOODLES } from "@/lib/doodles";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

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
    <div className="relative mx-auto h-[480px] w-full max-w-[320px] sm:h-[540px] sm:max-w-[440px] min-[900px]:h-[min(640px,calc(100svh-10rem))] min-[900px]:max-w-[520px] lg:h-[min(680px,calc(100svh-9rem))] lg:max-w-[620px]">
      {!reduceMotion && (
        <svg
          aria-hidden
          viewBox="0 0 620 700"
          preserveAspectRatio="xMidYMin meet"
          fill="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible text-foreground/15"
        >
          <m.path
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

      <div className="absolute top-0 left-1/2 z-10 w-[210px] -translate-x-1/2 sm:w-[250px] min-[900px]:w-[clamp(240px,34svh,300px)] lg:w-[clamp(250px,34svh,310px)]">
        <m.div
          initial={false}
          animate={
            reduceMotion
              ? { x: "-14%", rotate: -3 }
              : {
                  x: complete ? "-14%" : "0%",
                  rotate: complete ? -3 : -1,
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
        </m.div>
      </div>

      <AnimatePresence initial={false}>
        {complete && (
          <m.div
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
            className="absolute top-[210px] right-0 z-20 w-[155px] origin-bottom-left sm:top-[260px] sm:w-[200px] min-[900px]:top-[42%] min-[900px]:w-[clamp(200px,29svh,260px)] lg:w-[clamp(210px,30svh,280px)]"
          >
            <WidgetCard
              note={{ type: "doodle", doodle: "cat", timestamp: "now" }}
              sender={sender}
              image={finalWidgetImage}
              size="medium"
              animate={!reduceMotion}
              className="w-full text-left"
            />
          </m.div>
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
  const reduceMotion = useHydratedReducedMotion();
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

      <div className="container-page relative z-10 px-4 pt-12 pb-14 sm:px-6 sm:pt-14 sm:pb-16 min-[900px]:px-8 min-[900px]:py-14 lg:px-10 lg:py-16 xl:py-20">
        <div className="grid items-center gap-8 sm:gap-10 min-[900px]:grid-cols-[minmax(0,0.86fr)_minmax(430px,1.14fr)] min-[900px]:gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(500px,1.18fr)] lg:gap-6 xl:gap-10">
          {/* Headline, tagline and download render sharp on the server: the
              hero's one authored moment is the drawing landing on the widget,
              not a blur-in on the words someone came to read. */}
          <div className="contents min-[900px]:flex min-[900px]:min-w-0 min-[900px]:flex-col">
            <div className="order-1 flex min-w-0 flex-col items-center text-center min-[900px]:order-none min-[900px]:items-start min-[900px]:text-left">
              <h1 className="max-w-[9ch] font-display text-[clamp(2.75rem,11vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.025em] text-foreground min-[900px]:text-[clamp(4rem,6.5vw,6rem)]">
                {headline}
              </h1>

              <p className="mt-5 max-w-[42ch] type-lead text-foreground/75 sm:mt-7">
                {siteConfig.tagline}
              </p>
            </div>

            <div className="order-2 flex w-full max-w-sm justify-center justify-self-center sm:max-w-none min-[900px]:order-none min-[900px]:mt-9 min-[900px]:justify-self-auto">
              <DownloadCtas align="start" />
            </div>
          </div>

          <div className="order-3 min-w-0 min-[900px]:order-none">
            <HeroMedia reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
