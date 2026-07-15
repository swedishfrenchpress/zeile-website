"use client";

import { Section } from "@/components/section";
import { DrawingNotePlayground } from "@/components/mockups/drawing-note-playground";
import { DownloadCtas } from "@/components/ui/download-ctas";
import {
  easeOutCubic,
  REVEAL_DURATION_MD,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import * as m from "framer-motion/m";

export function FinalCta() {
  const reduceMotion = useHydratedReducedMotion();
  const {
    title,
    description,
    promptLabel,
    canvasPlaceholder,
    localDisclosure,
    conversionPrompt,
    conversionAction,
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
            : { duration: REVEAL_DURATION_MD, ease: easeOutCubic }
        }
        className="blur-reveal relative mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/3 flex items-center justify-center"
        >
          <div className="size-[520px] rounded-full bg-primary/[0.09] blur-[140px]" />
        </div>

        <div className="relative flex flex-col items-center">
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
            className="blur-reveal type-display-2 text-balance text-foreground"
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
            className="blur-reveal mt-5 max-w-[46ch] whitespace-pre-line type-lead text-balance text-foreground/75"
          >
            {description}
          </m.p>
        </div>

        <m.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
          }
          animate={
            reduceMotion
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : undefined
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
          className="blur-reveal relative mt-12 w-full"
        >
          <DrawingNotePlayground
            promptLabel={promptLabel}
            canvasPlaceholder={canvasPlaceholder}
            localDisclosure={localDisclosure}
            conversionPrompt={conversionPrompt}
            conversionAction={conversionAction}
            conversionHref={siteConfig.links.testFlight}
            inkLabel={inkLabel}
            brushLabel={brushLabel}
            eraserLabel={eraserLabel}
            undoLabel={undoLabel}
            clearLabel={clearLabel}
          />
        </m.div>

        <m.div
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
                  delay: REVEAL_STAGGER * 4,
                }
          }
          className="blur-reveal relative mt-12 flex justify-center"
        >
          <DownloadCtas />
        </m.div>
      </m.div>
    </Section>
  );
}
