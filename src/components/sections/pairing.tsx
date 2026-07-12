"use client";

import { Section } from "@/components/section";
import {
  easeOutCubic,
  easeOutQuart,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_MD,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export function TapToPay() {
  const reduceMotion = useReducedMotion() ?? false;
  const { title, description, videoSrc } = siteConfig.tapToPay;
  // The 2MB clip sits below the fold; without this it starts downloading
  // immediately on page load (muted autoplay is allowed to fetch off-screen)
  // and competes with the hero's LCP images. Defer the src until the section
  // is about to scroll into view, reusing the reveal animation's own trigger.
  const [videoInView, setVideoInView] = useState(false);

  return (
    <Section
      id="tap-to-pay"
      variant="editorial"
      hideHeader
      className="container-page px-6 py-[var(--section-y-base)] lg:px-10"
    >
      {/* Centered "specimen plate": the video is the only motion asset of the
          three value props, so it earns the middle of the trio as a deliberate
          breakout. The artifact reveals first, its caption settles in beneath. */}
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={() => setVideoInView(true)}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: REVEAL_DURATION_LG, ease: easeOutCubic }
          }
          className="relative w-fit"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="size-[520px] rounded-full bg-primary/[0.08] blur-[150px]" />
          </div>
          {!reduceMotion && (
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-[2rem] border border-primary/25"
                  animate={{ scale: [1, 1.1], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: easeOutQuart,
                    delay: i * 1.3,
                  }}
                />
              ))}
            </div>
          )}
          <video
            src={videoInView ? videoSrc : undefined}
            preload="none"
            width={406}
            height={720}
            autoPlay={!reduceMotion}
            loop={!reduceMotion}
            muted
            playsInline
            aria-hidden="true"
            className="relative h-auto w-full max-w-[380px] rounded-[2rem] border border-foreground/15 drop-shadow-2xl sm:max-w-[400px]"
          />
        </motion.div>

        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: REVEAL_DURATION_MD, ease: easeOutCubic, delay: REVEAL_STAGGER }
          }
          className="mt-10 type-display-2 text-balance text-foreground"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: REVEAL_DURATION_MD, ease: easeOutCubic, delay: REVEAL_STAGGER * 2 }
          }
          className="mt-5 max-w-[42ch] type-lead text-balance text-foreground/75"
        >
          {description}
        </motion.p>
      </div>
    </Section>
  );
}
