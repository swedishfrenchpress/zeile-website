"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Section } from "@/components/section";
import {
  easeOutCubic,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_MD,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import * as m from "framer-motion/m";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

const emptySubscribe = () => () => {};

function PairingPreview({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative aspect-[1320/2868] overflow-hidden rounded-note border border-border bg-background shadow-[var(--paper-shadow)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function PairingVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "160px 0px", threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Image
        src={poster}
        alt=""
        width={1320}
        height={2868}
        sizes="(min-width: 768px) 250px, 46vw"
        className={cn(
          "pointer-events-none absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-200",
          isPlaying && "opacity-0"
        )}
        draggable={false}
      />
      <video
        ref={ref}
        className="h-full w-full object-cover"
        muted
        playsInline
        preload="none"
        loop
        onPlaying={() => setIsPlaying(true)}
        aria-hidden
        tabIndex={-1}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}

function OnboardingPreview({ reduceMotion }: { reduceMotion: boolean }) {
  const { onboardingVideo } = siteConfig.pairing;
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

  if (reduceMotion || !theme) {
    return (
      <>
        <Image
          src={onboardingVideo.poster}
          alt=""
          width={1320}
          height={2868}
          sizes="(min-width: 768px) 250px, 46vw"
          className="h-full w-full object-cover dark:hidden"
          draggable={false}
        />
        <Image
          src={onboardingVideo.posterDark}
          alt=""
          width={1320}
          height={2868}
          sizes="(min-width: 768px) 250px, 46vw"
          className="hidden h-full w-full object-cover dark:block"
          draggable={false}
        />
      </>
    );
  }

  const activeVideo =
    theme === "dark"
      ? { src: onboardingVideo.dark.src, poster: onboardingVideo.posterDark }
      : { src: onboardingVideo.light.src, poster: onboardingVideo.poster };

  return (
    <PairingVideo
      key={theme}
      src={activeVideo.src}
      poster={activeVideo.poster}
    />
  );
}

export function Pairing() {
  const reduceMotion = useHydratedReducedMotion();
  const { title, description } = siteConfig.pairing;

  return (
    <Section
      id="pairing"
      variant="editorial"
      hideHeader
      className="container-page px-6 py-[var(--section-y-base)] lg:px-10"
    >
      {/* A two-person handoff: one person creates the code, the other joins. */}
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <m.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }
          }
          animate={
            reduceMotion
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : undefined
          }
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: REVEAL_DURATION_LG, ease: easeOutCubic }
          }
          className="blur-reveal relative flex items-center justify-center -space-x-4 min-[375px]:-space-x-5 sm:-space-x-9 md:-space-x-12"
        >
          {/* warm rose haze pooling behind the pair of screens */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="size-[420px] rounded-full bg-primary/[0.09] blur-[120px]" />
          </div>

          <PairingPreview
            label="A person setting up zeile and creating a pairing code"
            className="z-0 w-[128px] -rotate-[6deg] min-[375px]:w-[148px] sm:w-[205px] md:w-[248px]"
          >
            <OnboardingPreview reduceMotion={reduceMotion} />
          </PairingPreview>

          <PairingPreview
            label={siteConfig.pairing.screenshot.alt}
            className="z-10 mt-8 w-[128px] rotate-[6deg] min-[375px]:w-[148px] sm:mt-12 sm:w-[205px] md:w-[248px]"
          >
            <Image
              src={siteConfig.pairing.screenshot.src}
              alt=""
              width={1320}
              height={2868}
              sizes="(min-width: 768px) 250px, 46vw"
              className="h-full w-full object-cover dark:hidden"
              draggable={false}
            />
            <Image
              src={siteConfig.pairing.screenshot.srcDark!}
              alt=""
              width={1320}
              height={2868}
              sizes="(min-width: 768px) 250px, 46vw"
              className="hidden h-full w-full object-cover dark:block"
              draggable={false}
            />
          </PairingPreview>
        </m.div>

        <m.h2
          initial={
            reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }
          }
          animate={
            reduceMotion
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : undefined
          }
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: REVEAL_DURATION_MD,
                  ease: easeOutCubic,
                  delay: REVEAL_STAGGER,
                }
          }
          className="blur-reveal mt-12 type-display-2 text-balance text-foreground"
        >
          {title}
        </m.h2>

        <m.p
          initial={
            reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }
          }
          animate={
            reduceMotion
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : undefined
          }
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: REVEAL_DURATION_MD,
                  ease: easeOutCubic,
                  delay: REVEAL_STAGGER * 2,
                }
          }
          className="blur-reveal mt-5 max-w-[44ch] type-lead text-balance text-foreground/75"
        >
          {description}
        </m.p>
      </div>
    </Section>
  );
}
