"use client";

import { CustodyComparison } from "@/components/illustrations/custody-comparison";
import { Section } from "@/components/section";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const CARD_MIN_HEIGHTS = ["min-h-[460px]", "min-h-[360px]", "min-h-[420px]"];

export function BentoGrid() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0, 1], {
    ease: easeInOutCubic,
  });
  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, 1], {
    ease: easeInOutCubic,
  });
  const opacity3 = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 1], {
    ease: easeInOutCubic,
  });
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.3], [80, 80, 0], {
    ease: easeInOutCubic,
  });
  const y2 = useTransform(scrollYProgress, [0, 0.2, 0.4], [80, 80, 0], {
    ease: easeInOutCubic,
  });
  const y3 = useTransform(scrollYProgress, [0, 0.3, 0.5], [80, 80, 0], {
    ease: easeInOutCubic,
  });

  const motions = reduceMotion
    ? [{}, {}, {}]
    : [
        { opacity: opacity1, y: y1 },
        { opacity: opacity2, y: y2 },
        { opacity: opacity3, y: y3 },
      ];

  return (
    <Section
      id="bento"
      variant="editorial"
      hideHeader
      className="container-page px-6 py-[var(--section-y-base)] lg:px-10"
      ref={ref}
    >
      {/* md collapse: multi-item grids (this, footer) break at md;
          two-panel text+media sections break at lg. */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {siteConfig.bento.map((item, index) => {
          const minHeight =
            CARD_MIN_HEIGHTS[index] ?? CARD_MIN_HEIGHTS[CARD_MIN_HEIGHTS.length - 1];
          return (
            <motion.div
              key={index}
              style={motions[index]}
              className={cn(
                "group relative grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-lg border border-glass-border bg-background/55 p-6 pb-0 shadow-[var(--glass-shadow)] backdrop-blur-lg sm:p-8",
                minHeight,
                item.fullWidth && "md:col-span-2"
              )}
            >
              <div className="flex min-w-0 flex-col">
                <h3 className="type-display-3 text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[52ch] type-body-lg text-foreground/70">
                  {item.content}
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                {item.id === "custody-comparison" ? (
                  <CustodyComparison />
                ) : item.id === "imessage-chat" ? (
                  <div className="aspect-[585/422] w-full overflow-hidden rounded-[2rem] border border-white/10 [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      width={585}
                      height={1266}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={cn(
                        "h-full w-full select-none object-cover object-top transition-transform duration-500 group-hover:-translate-y-2",
                        "imageSrcDark" in item && item.imageSrcDark && "dark:hidden"
                      )}
                      draggable={false}
                    />
                    {"imageSrcDark" in item && item.imageSrcDark && (
                      <Image
                        src={item.imageSrcDark}
                        alt={item.imageAlt}
                        width={585}
                        height={1266}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="hidden h-full w-full select-none object-cover object-top transition-transform duration-500 group-hover:-translate-y-2 dark:block"
                        draggable={false}
                      />
                    )}
                  </div>
                ) : item.id === "lightning-address" ? (
                  <div className="w-full max-w-[340px] self-end">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      width={585}
                      height={686}
                      sizes="340px"
                      className={cn(
                        "block h-auto w-full select-none rounded-[1.75rem] border border-foreground/10 transition-transform duration-500 group-hover:-translate-y-1",
                        "imageSrcDark" in item && item.imageSrcDark && "dark:hidden"
                      )}
                      draggable={false}
                    />
                    {"imageSrcDark" in item && item.imageSrcDark && (
                      <Image
                        src={item.imageSrcDark}
                        alt={item.imageAlt}
                        width={585}
                        height={686}
                        sizes="340px"
                        className="hidden h-auto w-full select-none rounded-[1.75rem] border border-foreground/10 transition-transform duration-500 group-hover:-translate-y-1 dark:block"
                        draggable={false}
                      />
                    )}
                  </div>
                ) : (
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={900}
                    height={1840}
                    sizes="200px"
                    className={cn(
                      "h-64 w-auto select-none object-contain object-top transition-transform duration-500 group-hover:-translate-y-2 sm:h-80",
                      item.fullWidth && "sm:h-96"
                    )}
                    draggable={false}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
