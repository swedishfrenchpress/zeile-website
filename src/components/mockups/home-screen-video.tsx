"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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

    // A display:none element (the off-theme clip) never intersects, so only the
    // visible theme's video plays; the hidden one never loads past its metadata.
    // Toggling the theme flips display, which fires the observer and hands the
    // reveal to the newly visible clip. Re-entering the viewport replays it.
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
    <video
      ref={ref}
      className={cn(MEDIA_CLASS, className)}
      poster={poster}
      muted
      playsInline
      preload="metadata"
      autoPlay={playMode === "loop"}
      loop={playMode === "loop"}
      aria-hidden
      tabIndex={-1}
      draggable={false}
    >
      {source.srcWebm ? <source src={source.srcWebm} type="video/webm" /> : null}
      <source src={source.src} type="video/mp4" />
    </video>
  );
}

/**
 * The zeile widget being added to a real iPhone Home Screen — a screen recording
 * that swaps between a light-mode and dark-mode capture with the site theme,
 * mirroring ScreenshotPlaceholder's `dark:hidden` / `hidden dark:block` pattern.
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
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      // Full iPhone screen capture (1320×2868) so the whole add-widget flow stays
      // visible — the "Add Widget" button sits near the bottom of the sheet. The
      // frame's aspect matches the capture, so object-cover never letterboxes.
      className={cn(
        "aspect-[1320/2868] w-full max-w-[300px] overflow-hidden rounded-[40px] border border-border bg-background shadow-[var(--paper-shadow)]",
        className
      )}
    >
      <ThemedVideo
        source={light}
        poster={poster}
        playMode={playMode}
        className="dark:hidden"
      />
      <ThemedVideo
        source={dark}
        poster={posterDark ?? poster}
        playMode={playMode}
        className="hidden dark:block"
      />
    </div>
  );
}
