"use client";

import { Section } from "@/components/section";
import { DrawingNotePlayground } from "@/components/mockups/drawing-note-playground";
import { AppStoreBadge } from "@/components/ui/app-store-badge";
import {
  easeOutCubic,
  REVEAL_DURATION_MD,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { motion, useReducedMotion } from "framer-motion";

export function FinalCta() {
  const reduceMotion = useReducedMotion() ?? false;
  const {
    title,
    description,
    promptLabel,
    canvasPlaceholder,
    localDisclosure,
    inkLabel,
    brushLabel,
    eraserLabel,
    undoLabel,
    clearLabel,
  } = siteConfig.finalCta;

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
        className="relative mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/3 flex items-center justify-center"
        >
          <div className="size-[520px] rounded-full bg-primary/[0.09] blur-[140px]" />
        </div>

        <div className="relative flex flex-col items-center">
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
            className="type-display-2 text-balance text-foreground"
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
            className="mt-5 max-w-[46ch] whitespace-pre-line type-lead text-balance text-foreground/75"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
          }
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: REVEAL_DURATION_MD,
                  ease: easeOutCubic,
                  delay: REVEAL_STAGGER * 3,
                }
          }
          className="relative mt-12 w-full"
        >
          <DrawingNotePlayground
            promptLabel={promptLabel}
            canvasPlaceholder={canvasPlaceholder}
            localDisclosure={localDisclosure}
            inkLabel={inkLabel}
            brushLabel={brushLabel}
            eraserLabel={eraserLabel}
            undoLabel={undoLabel}
            clearLabel={clearLabel}
          />
        </motion.div>

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
                  delay: REVEAL_STAGGER * 4,
                }
          }
          className="relative mt-12 flex justify-center"
        >
          <AppStoreBadge href={siteConfig.links.appStore} />
        </motion.div>
      </motion.div>
    </Section>
  );
}
