"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export interface HomeScreenVideoSource {
  /** H.264 mp4 — universal support, incl. iOS Safari muted autoplay */
  src: string;
  /** optional VP9 webm, offered first for a smaller transfer where supported */
  srcWebm?: string;
}

/** The theme-swapped video pair + first-frame posters. Lives in config.tsx. */
export interface HomeScreenVideoConfig {
  light: HomeScreenVideoSource;
  dark: HomeScreenVideoSource;
  /** first-frame still shown before playback (light theme) */
  poster: string;
  /** first-frame still (dark theme); falls back to `poster` */
  posterDark?: string;
}

interface HomeScreenVideoProps extends HomeScreenVideoConfig {
  /**
   * "in-view-once": play once when scrolled into view, replay on re-enter.
   * "loop": native muted autoplay + loop.
   */
  playMode?: "in-view-once" | "loop";
  /** description of the recording — the wrapper carries role="img" */
  ariaLabel: string;
  className?: string;
}

const MEDIA_CLASS = "h-full w-full select-none object-cover object-top";

/** Play the add-widget capture a touch faster than real time so it reads briskly. */
const PLAYBACK_RATE = 2;

function ThemedVideo({
  source,
  poster,
  playMode,
  className,
}: {
  source: HomeScreenVideoSource;
  poster: string;
  playMode: "in-view-once" | "loop";
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // defaultPlaybackRate covers native loop autoplay; playbackRate covers the
    // in-view-once path (and any clip already playing). Both are set because
    // there is no HTML attribute for playback speed.
    v.defaultPlaybackRate = PLAYBACK_RATE;
    v.playbackRate = PLAYBACK_RATE;

    if (playMode !== "in-view-once") return;
    v.muted = true; // Safari autoplay policy: belt-and-braces alongside the attr

    // Only the active theme's clip is mounted. The observer keeps preload="none"
    // meaningful by deferring its transfer until the phone is actually in view;
    // changing theme remounts this element with the matching source.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.currentTime = 0;
          v.playbackRate = PLAYBACK_RATE;
          v.play().catch(() => {});
        } else {
          v.pause();
          v.currentTime = 0;
        }
      },
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [playMode]);

  return (
    <>
      <Image
        src={poster}
        alt=""
        width={1320}
        height={2868}
        sizes="300px"
        className={cn(
          MEDIA_CLASS,
          "pointer-events-none absolute inset-0 z-10 transition-opacity duration-200",
          isPlaying && "opacity-0"
        )}
        draggable={false}
      />
      <video
        ref={ref}
        className={cn(MEDIA_CLASS, className)}
        muted
        playsInline
        preload="none"
        autoPlay={playMode === "loop"}
        loop={playMode === "loop"}
        onPlaying={() => setIsPlaying(true)}
        aria-hidden
        tabIndex={-1}
        draggable={false}
      >
        {source.srcWebm ? (
          <source src={source.srcWebm} type="video/webm" />
        ) : null}
        <source src={source.src} type="video/mp4" />
      </video>
    </>
  );
}

/**
 * The zeile widget being added to a real iPhone Home Screen — a screen recording
 * that mounts only the light-mode or dark-mode capture matching the site theme.
 * Reduced-motion callers render <HomeScreenWidget> instead of this.
 */
export function HomeScreenVideo({
  light,
  dark,
  poster,
  posterDark,
  playMode = "in-view-once",
  ariaLabel,
  className,
}: HomeScreenVideoProps) {
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
    <div
      role="img"
      aria-label={ariaLabel}
      // Full iPhone screen capture (1320×2868) so the whole add-widget flow stays
      // visible — the "Add Widget" button sits near the bottom of the sheet. The
      // frame's aspect matches the capture, so object-cover never letterboxes.
      className={cn(
        "relative aspect-[1320/2868] w-full max-w-[300px] overflow-hidden rounded-[40px] border border-border bg-background shadow-[var(--paper-shadow)]",
        className
      )}
    >
      {!theme ? (
        <>
          <Image
            src={poster}
            alt=""
            width={1320}
            height={2868}
            sizes="300px"
            className={`${MEDIA_CLASS} dark:hidden`}
            draggable={false}
          />
          <Image
            src={posterDark ?? poster}
            alt=""
            width={1320}
            height={2868}
            sizes="300px"
            className={`hidden ${MEDIA_CLASS} dark:block`}
            draggable={false}
          />
        </>
      ) : (
        <ThemedVideo
          key={theme}
          source={theme === "dark" ? dark : light}
          poster={theme === "dark" ? (posterDark ?? poster) : poster}
          playMode={playMode}
        />
      )}
    </div>
  );
}
