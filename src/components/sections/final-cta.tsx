"use client";

import { Section } from "@/components/section";
import { AppStoreBadge } from "@/components/ui/app-store-badge";
import {
  easeOutCubic,
  REVEAL_DURATION_MD,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { motion, useReducedMotion } from "framer-motion";

// The closing bookend: after the FAQ, one last quiet nudge to download.
// Echoes the hero's "Leave a little note." headline so the page comes full
// circle. Opaque note-paper card (anti-glass), rose only as the ambient
// glow, and no heart — that stays reserved for the widget mockup.
export function FinalCta() {
  const reduceMotion = useReducedMotion() ?? false;
  const { title, description } = siteConfig.finalCta;

  return (
    <Section
      id="final-cta"
      variant="editorial"
      hideHeader
      className="container-page px-6 py-[var(--section-y-base)] lg:px-10"
    >
      <motion.div
        initial={
          reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }
        }
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: REVEAL_DURATION_MD, ease: easeOutCubic }
        }
        className="note-surface relative mx-auto flex max-w-3xl flex-col items-center overflow-hidden rounded-card px-8 py-16 text-center sm:px-12 sm:py-20"
      >
        {/* warm rose haze pooling behind the card's contents */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="size-[420px] rounded-full bg-primary/[0.09] blur-[120px]" />
        </div>

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
          className="relative type-display-2 text-balance text-foreground"
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
          className="relative mt-5 max-w-[46ch] type-lead text-balance text-foreground/75"
        >
          {description}
        </motion.p>

        <motion.div
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
                  delay: REVEAL_STAGGER * 3,
                }
          }
          className="relative mt-10 flex justify-center"
        >
          <AppStoreBadge href={siteConfig.links.appStore} />
        </motion.div>
      </motion.div>
    </Section>
  );
}
