"use client";

import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import { easeOutCubic, REVEAL_DURATION_LG, REVEAL_DURATION_SM } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface FeatureLayout {
  textClass: string;
  imageClass: string;
  imageAlignClass: string;
}

// lg collapse: two-panel text+media sections (this, tap-to-pay) break at lg;
// multi-item grids (bento, footer) break at md.
const LAYOUTS: FeatureLayout[] = [
  {
    textClass: "lg:col-span-5 lg:col-start-1",
    imageClass: "lg:col-span-6 lg:col-start-7",
    imageAlignClass: "lg:justify-end",
  },
  {
    textClass: "lg:col-span-6 lg:col-start-7",
    imageClass: "lg:col-span-5 lg:col-start-1",
    imageAlignClass: "lg:justify-start",
  },
];

// Shared "phone screen" card styling for both the still-image and video media.
const MEDIA_CLASS =
  "relative h-auto w-full max-w-[300px] rounded-[2rem] border border-foreground/15 drop-shadow-2xl";

interface FeatureProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageSrcDark?: string;
  videoSrc?: string;
  videoSrcDark?: string;
  posterSrc?: string;
  posterSrcDark?: string;
  isActive: boolean;
  mediaShouldLoad: boolean;
  layout: FeatureLayout;
  reduceMotion: boolean;
}

function Feature({
  title,
  description,
  imageSrc,
  imageSrcDark,
  videoSrc,
  videoSrcDark,
  posterSrc,
  posterSrcDark,
  isActive,
  mediaShouldLoad,
  layout,
  reduceMotion,
}: FeatureProps) {
  // Resolve one theme variant instead of rendering both: the hidden `dark:*`
  // <video> still autoplays and downloads (unlike next/image's lazy <img>), so
  // two elements = two full video + poster fetches, one always wasted. Safe to
  // read `resolvedTheme` without a mounted guard because src/poster only attach
  // once `mediaShouldLoad` flips (a client-only observer, post-hydration).
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const activeVideo = isDark && videoSrcDark ? videoSrcDark : videoSrc;
  const activePoster = isDark && posterSrcDark ? posterSrcDark : posterSrc;
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
          layout.imageClass,
          layout.imageAlignClass
        )}
      >
        <div className="relative">
          {/* Bright haze lifts the phone off the sky, matching the hero. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="size-[520px] rounded-full bg-white/50 blur-[140px]" />
          </div>
          {videoSrc ? (
            // Below-fold decorative loop: defer the src until the section is
            // near view (same rationale as tap-to-pay's 2MB clip) so it never
            // competes with the hero's LCP fetch. One theme-resolved element,
            // not two, so only the visible variant downloads.
            <video
              key={activeVideo}
              src={mediaShouldLoad ? activeVideo : undefined}
              poster={mediaShouldLoad ? activePoster : undefined}
              preload="none"
              width={720}
              height={1558}
              autoPlay={!reduceMotion}
              loop={!reduceMotion}
              muted
              playsInline
              aria-hidden="true"
              className={MEDIA_CLASS}
            />
          ) : imageSrc ? (
            <>
              <Image
                src={imageSrc}
                alt={title}
                width={924}
                height={2000}
                sizes="300px"
                className={cn(MEDIA_CLASS, imageSrcDark && "dark:hidden")}
              />
              {imageSrcDark && (
                <Image
                  src={imageSrcDark}
                  alt={title}
                  width={924}
                  height={2000}
                  sizes="300px"
                  className={cn(MEDIA_CLASS, "hidden dark:block")}
                />
              )}
            </>
          ) : null}
        </div>
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
  // Latches true once the section nears the viewport; gates video/poster
  // download so below-fold media never competes with the hero LCP fetch.
  const [mediaShouldLoad, setMediaShouldLoad] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // A zero-height root at the vertical center of the viewport: the callback
    // fires exactly when the section's bounds straddle that line, replicating
    // the old top<=middle<=bottom check without a scroll-linked layout read.
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    observer.observe(container);

    // Start the media fetch ~one viewport early, then stop observing.
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMediaShouldLoad(true);
          preload.disconnect();
        }
      },
      { rootMargin: "100% 0px 100% 0px" }
    );
    preload.observe(container);

    return () => {
      observer.disconnect();
      preload.disconnect();
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
        mediaShouldLoad={mediaShouldLoad}
        layout={layout}
        title={feature.title}
        description={feature.description}
        imageSrc={"imageSrc" in feature ? feature.imageSrc : undefined}
        imageSrcDark={
          "imageSrcDark" in feature ? feature.imageSrcDark : undefined
        }
        videoSrc={"videoSrc" in feature ? feature.videoSrc : undefined}
        videoSrcDark={
          "videoSrcDark" in feature ? feature.videoSrcDark : undefined
        }
        posterSrc={"posterSrc" in feature ? feature.posterSrc : undefined}
        posterSrcDark={
          "posterSrcDark" in feature ? feature.posterSrcDark : undefined
        }
        reduceMotion={reduceMotion}
      />
    </Section>
  );
}
