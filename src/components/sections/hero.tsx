"use client";

import { DoodleField } from "@/components/paper/doodle-field";
import { WidgetCard } from "@/components/mockups/widget-card";
import { AppStoreBadge } from "@/components/ui/app-store-badge";
import {
  easeOutCubic,
  easeOutQuart,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_MD,
  REVEAL_DURATION_SM,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { SECTION_DOODLES } from "@/lib/doodles";
import { siteConfig } from "@/lib/config";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const NOTE_CYCLE_MS = 5200;

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const { headline, sender, sampleNotes } = siteConfig.hero;
  const [noteIndex, setNoteIndex] = useState(0);

  // The living widget: a new note "arrives" every few seconds. Reduced
  // motion pins the first note — one static widget, no cycling, no pops.
  useEffect(() => {
    if (reduceMotion || sampleNotes.length < 2) return;
    const timer = setInterval(
      () => setNoteIndex((i) => (i + 1) % sampleNotes.length),
      NOTE_CYCLE_MS
    );
    return () => clearInterval(timer);
  }, [reduceMotion, sampleNotes.length]);

  const note = sampleNotes[noteIndex];

  return (
    <section id="hero" className="relative min-h-[100vh] w-full overflow-hidden">
      <DoodleField section={SECTION_DOODLES.hero} />

      {/* Rose ambient — one low-opacity radial concentrated behind the
          masthead, fading to clean ground before the widget (the app's
          ZeileAmbientBackground gesture, scaled to a website hero). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[62vh]"
        style={{
          background:
            "radial-gradient(64% 52% at 50% 0%, var(--rose-wash), transparent 72%)",
        }}
      />

      <div className="container-page relative z-10 px-6 pt-[var(--section-y-wide)] pb-[var(--section-y-tight)] text-center lg:px-10">
        {/* Opacity stays at 1 throughout: this is the LCP candidate, and an
            opacity-0 initial state would keep it unpainted (and CWV-invisible)
            until the delayed fade resolves. Blur+rise still reads as a reveal
            without gating the first paint. */}
        <motion.h1
          initial={reduceMotion ? false : { filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: REVEAL_DURATION_LG, ease: easeOutQuart, delay: 0 }
          }
          className="type-display-1 text-foreground"
        >
          {headline}
        </motion.h1>

        {/* The living widget — the product's front door, recreated in CSS.
            A notification chip drops in, the card spring-settles, the heart
            pops once, the note reveals. This replaces any hero screenshot:
            the widget IS the product. */}
        <div className="relative mt-10 flex justify-center sm:mt-12">
          <motion.div
            initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: REVEAL_DURATION_LG,
                    ease: easeOutCubic,
                    delay: REVEAL_STAGGER,
                  }
            }
            className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px]"
          >
            {/* the arriving notification banner */}
            <div className="mb-3 flex justify-center" aria-hidden>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`chip-${noteIndex}`}
                  initial={reduceMotion ? false : { y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduceMotion ? undefined : { y: -12, opacity: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", bounce: 0.3, duration: 0.5 }
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-1.5 shadow-[var(--paper-shadow)]"
                >
                  <span className="size-2 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">
                    zeile · a note from {sender}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={noteIndex}
                initial={
                  reduceMotion ? false : { scale: 0.97, y: 8, opacity: 0 }
                }
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={reduceMotion ? undefined : { y: -6, opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", bounce: 0.3, duration: 0.55 }
                }
              >
                <WidgetCard
                  note={note}
                  sender={sender}
                  size="medium"
                  animate={!reduceMotion}
                  className="text-left"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.p
          initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
          animate={{ y: 0, filter: "blur(0px)" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: REVEAL_DURATION_MD,
                  ease: easeOutCubic,
                  delay: REVEAL_STAGGER * 2,
                }
          }
          className="mx-auto mt-12 max-w-[46ch] type-lead text-foreground/75"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
          animate={{ y: 0, filter: "blur(0px)" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: REVEAL_DURATION_SM,
                  ease: easeOutCubic,
                  delay: REVEAL_STAGGER * 3,
                }
          }
          className="mx-auto mt-12 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
        >
          <AppStoreBadge
            href={siteConfig.links.appStore}
            className="w-full justify-center sm:w-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
