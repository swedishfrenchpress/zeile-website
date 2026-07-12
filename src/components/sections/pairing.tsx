"use client";

import { Section } from "@/components/section";
import { CodeChip } from "@/components/mockups/code-chip";
import {
  easeOutCubic,
  easeOutQuart,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_MD,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { motion, useReducedMotion } from "framer-motion";

/** a small outlined phone, one on each side of the code — the two of you */
function PhoneSilhouette({ flip }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={`hidden shrink-0 sm:block ${flip ? "rotate-6" : "-rotate-6"}`}
    >
      <div className="flex h-32 w-[4.25rem] flex-col items-center rounded-[18px] border-2 border-border p-2">
        <div className="mt-1 h-1 w-6 rounded-full bg-border" />
        <div className="mt-3 w-full flex-1 rounded-[8px] bg-rose-wash" />
      </div>
    </div>
  );
}

export function Pairing() {
  const reduceMotion = useReducedMotion() ?? false;
  const { title, description, sampleCode } = siteConfig.pairing;

  return (
    <Section
      id="pairing"
      variant="editorial"
      hideHeader
      className="container-page px-6 py-[var(--section-y-base)] lg:px-10"
    >
      {/* Centered "specimen plate": the pairing code is the whole setup
          story, so it earns the middle of the page as a deliberate breakout —
          the one mono, one glass moment on the site. */}
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
          className="relative flex items-center gap-8"
        >
          {/* warm rose haze so the translucent chip has something to blur */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="size-[420px] rounded-full bg-primary/[0.09] blur-[120px]" />
          </div>

          <PhoneSilhouette />

          <div className="relative">
            {!reduceMotion && (
              <div aria-hidden className="pointer-events-none absolute inset-0">
                {[0, 1].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute inset-0 rounded-[16px] border border-primary/25"
                    animate={{ scale: [1, 1.18], opacity: [0.6, 0] }}
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
            <CodeChip code={sampleCode} className="relative" />
          </div>

          <PhoneSilhouette flip />
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
