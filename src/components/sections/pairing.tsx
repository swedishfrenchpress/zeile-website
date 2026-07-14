"use client";

import Image from "next/image";
import { Section } from "@/components/section";
import {
  easeOutCubic,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_MD,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

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

function OnboardingPreview({ reduceMotion }: { reduceMotion: boolean }) {
  const { onboardingVideo } = siteConfig.pairing;

  if (reduceMotion) {
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

  return (
    <>
      <video
        className="h-full w-full object-cover dark:hidden"
        poster={onboardingVideo.poster}
        muted
        playsInline
        preload="metadata"
        autoPlay
        loop
        aria-hidden
      >
        <source src={onboardingVideo.light.src} type="video/mp4" />
      </video>
      <video
        className="hidden h-full w-full object-cover dark:block"
        poster={onboardingVideo.posterDark}
        muted
        playsInline
        preload="metadata"
        autoPlay
        loop
        aria-hidden
      >
        <source src={onboardingVideo.dark.src} type="video/mp4" />
      </video>
    </>
  );
}

export function Pairing() {
  const reduceMotion = useReducedMotion() ?? false;
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
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }
          }
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: REVEAL_DURATION_LG, ease: easeOutCubic }
          }
          className="relative flex items-center justify-center -space-x-4 min-[375px]:-space-x-5 sm:-space-x-9 md:-space-x-12"
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
        </motion.div>

        <motion.h2
          initial={
            reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }
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
          className="mt-12 type-display-2 text-balance text-foreground"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={
            reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }
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
          className="mt-5 max-w-[44ch] type-lead text-balance text-foreground/75"
        >
          {description}
        </motion.p>
      </div>
    </Section>
  );
}
