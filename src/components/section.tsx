"use client";

import { CloudField } from "@/components/sky/cloud-field";
import { easeInOutCubic } from "@/lib/animation";
import { SECTION_CLOUDS } from "@/lib/clouds";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { forwardRef, useRef } from "react";
import type { ReactNode, RefObject } from "react";

interface SectionProps {
  id?: string;
  variant?: "centered" | "editorial";
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  headerSlot?: ReactNode;
  hideHeader?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      variant = "centered",
      subtitle,
      description,
      children,
      className,
      align = "center",
      headerSlot,
      hideHeader = false,
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLElement>(null);
    const ref = (forwardedRef as RefObject<HTMLElement>) || internalRef;

    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1], {
      ease: easeInOutCubic,
    });
    const y = useTransform(scrollYProgress, [0, 0.05, 0.1], [30, 30, 0], {
      ease: easeInOutCubic,
    });

    const hasHeaderContent = !!(subtitle || description || headerSlot);

    const renderSubtitle = (extra?: string) =>
      subtitle && (
        <motion.h2
          className={cn("type-display-2 text-foreground", extra)}
          style={{ opacity, y }}
        >
          {subtitle}
        </motion.h2>
      );

    const renderDescription = (extra?: string) =>
      description && (
        <motion.p
          className={cn("type-lead text-foreground/75", extra)}
          style={{ opacity, y }}
        >
          {description}
        </motion.p>
      );

    const centeredAlignment =
      align === "left"
        ? "text-left"
        : align === "right"
          ? "text-right"
          : "text-center";

    return (
      <section id={id} ref={ref} className="relative">
        {id && <CloudField section={SECTION_CLOUDS[id]} />}
        <div className={cn("relative z-10", className)}>
          {!hideHeader && hasHeaderContent && variant === "centered" && (
            <div className={cn(centeredAlignment, "space-y-4 pb-10 mx-auto")}>
              {renderSubtitle(
                cn(
                  "mt-4 max-w-lg sm:max-w-none",
                  align === "center" && "mx-auto",
                  align === "right" && "ml-auto"
                )
              )}
              {renderDescription(
                cn(
                  "mt-6 max-w-2xl",
                  align === "center" && "mx-auto",
                  align === "right" && "ml-auto"
                )
              )}
            </div>
          )}

          {!hideHeader && variant === "editorial" && (
            <div className="border-t border-border/60 pt-8 pb-12 sm:pt-10 sm:pb-16">
              {headerSlot ? (
                headerSlot
              ) : (
                <div className="grid grid-cols-12 gap-x-6 gap-y-6 lg:gap-x-10">
                  {subtitle && (
                    <div className="col-span-12 lg:col-span-9 lg:col-start-1">
                      {renderSubtitle()}
                    </div>
                  )}
                  {description && (
                    <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                      {renderDescription("max-w-[55ch]")}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
