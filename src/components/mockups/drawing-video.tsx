"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef } from "react";
import { cn } from "@/lib/utils";

export interface DrawingVideoConfig {
  light: { src: string };
  dark: { src: string };
  poster: string;
  posterDark: string;
  finalPoster: string;
  finalPosterDark: string;
  alt: string;
}

export function DrawingVideo({
  video,
  theme,
  reduceMotion,
  playbackRate = 1,
  onEnded,
  onPlaybackUnavailable,
  className,
}: {
  video: DrawingVideoConfig;
  theme?: "light" | "dark";
  reduceMotion: boolean;
  playbackRate?: number;
  onEnded?: () => void;
  onPlaybackUnavailable?: () => void;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const notifyPlaybackUnavailable = useEffectEvent(() => {
    onPlaybackUnavailable?.();
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || reduceMotion || !theme) return;

    videoElement.defaultPlaybackRate = playbackRate;
    videoElement.playbackRate = playbackRate;
    videoElement.play().catch(notifyPlaybackUnavailable);
  }, [playbackRate, reduceMotion, theme]);

  const source = theme === "dark" ? video.dark : video.light;
  const poster = theme === "dark" ? video.posterDark : video.poster;
  const finalPoster =
    theme === "dark" ? video.finalPosterDark : video.finalPoster;
  const imageSizes = "(min-width: 1024px) 310px, (min-width: 640px) 270px, 250px";

  return (
    <div
      role="img"
      aria-label={video.alt}
      className={cn(
        "aspect-[83/180] w-full max-w-[260px] overflow-hidden rounded-[40px] bg-background",
        className
      )}
    >
      {reduceMotion && theme ? (
        <Image
          src={finalPoster}
          alt=""
          width={498}
          height={1080}
          sizes={imageSizes}
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : reduceMotion ? (
        <>
          <Image
            src={video.finalPoster}
            alt=""
            width={498}
            height={1080}
            sizes={imageSizes}
            className="h-full w-full object-cover dark:hidden"
            draggable={false}
          />
          <Image
            src={video.finalPosterDark}
            alt=""
            width={498}
            height={1080}
            sizes={imageSizes}
            className="hidden h-full w-full object-cover dark:block"
            draggable={false}
          />
        </>
      ) : !theme ? (
        <>
          <Image
            src={video.poster}
            alt=""
            width={498}
            height={1080}
            sizes={imageSizes}
            className="h-full w-full object-cover dark:hidden"
            draggable={false}
          />
          <Image
            src={video.posterDark}
            alt=""
            width={498}
            height={1080}
            sizes={imageSizes}
            className="hidden h-full w-full object-cover dark:block"
            draggable={false}
          />
        </>
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={poster}
          muted
          playsInline
          preload="metadata"
          autoPlay
          onEnded={onEnded}
          onError={() => onPlaybackUnavailable?.()}
          aria-hidden
          tabIndex={-1}
        >
          <source src={source.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
