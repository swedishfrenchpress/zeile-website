"use client";

import { Section } from "@/components/section";
import { PhoneFrame } from "@/components/mockups/phone-frame";
import {
  CreatePairScreen,
  JoinPairScreen,
} from "@/components/mockups/pairing-screens";
import {
  easeOutCubic,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_MD,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { motion, useReducedMotion } from "framer-motion";

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
      {/* Centered "specimen plate": the app's real pairing screens, side by
          side — one phone sharing the code, the other mid-typing it in.
          The setup story told with the actual UI, recreated in CSS. */}
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
          className="relative flex items-start justify-center gap-4 sm:gap-8"
        >
          {/* warm rose haze pooling behind the pair of phones */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="size-[420px] rounded-full bg-primary/[0.09] blur-[120px]" />
          </div>

          <PhoneFrame
            label={`zeile's create-pair screen: share this code, ${siteConfig.pairing.sampleCode}`}
            className="w-[148px] -rotate-3 sm:w-48 md:w-52"
          >
            <CreatePairScreen />
          </PhoneFrame>

          <PhoneFrame
            label="zeile's join screen: typing the code in"
            className="mt-6 w-[148px] rotate-3 sm:w-48 md:w-52"
          >
            <JoinPairScreen />
          </PhoneFrame>
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
