"use client";

import { DOODLE_ASSETS } from "@/components/paper/doodles";
import { DRIFT_RANGE, RISE_RANGE, TIERS } from "@/lib/doodles";
import type { DoodlePlacement, SectionDoodles } from "@/lib/doodles";
import { cn } from "@/lib/utils";
import { useTransform, type MotionValue } from "framer-motion";
import * as m from "framer-motion/m";
import { useScrollField } from "./scroll-provider";

interface DoodleInstanceProps {
  placement: DoodlePlacement;
  anchor: number;
  progress: MotionValue<number>;
  drift: boolean;
}

function DoodleInstance({
  placement,
  anchor,
  progress,
  drift,
}: DoodleInstanceProps) {
  const asset = DOODLE_ASSETS[placement.variant];
  const tier = TIERS[placement.tier];
  // Reads the one global scroll value; framer writes the transform directly to
  // the DOM (no React re-renders, no per-element scroll listeners).
  const x = useTransform(
    progress,
    (p) => (p - anchor) * DRIFT_RANGE * tier.depth
  );
  // Rises up from below into its resting spot as scroll approaches the
  // section's anchor, then keeps rising up and out past it — the "pen marks
  // wander in as you scroll" parallax entrance.
  const y = useTransform(
    progress,
    (p) => -(p - anchor) * RISE_RANGE * tier.depth
  );

  const mobileWidth = placement.mobileWidth ?? placement.width;

  return (
    <m.div
      className={cn(
        "absolute w-[var(--doodle-w-mobile)] md:w-[var(--doodle-w)]",
        !placement.mobile && "hidden md:block"
      )}
      style={
        {
          top: placement.top,
          left: placement.left,
          right: placement.right,
          "--doodle-w": `${placement.width}px`,
          "--doodle-w-mobile": `${mobileWidth}px`,
          color: `var(--doodle-${placement.ink})`,
          opacity: tier.opacity,
          rotate: `${placement.rotate ?? 0}deg`,
          x: drift ? x : 0,
          y: drift ? y : 0,
        } as React.CSSProperties
      }
    >
      {asset.render({
        className: cn("h-auto w-full select-none", placement.flip && "-scale-x-100"),
      })}
    </m.div>
  );
}

/**
 * A section's decorative doodle layer. Mount as the first child of a
 * `relative` section (content above it at z-10). Purely decorative:
 * aria-hidden, no pointer events; overflow-hidden so drift can never
 * push a mark outside the section box.
 */
export function DoodleField({ section }: { section?: SectionDoodles }) {
  const field = useScrollField();
  if (!section || section.doodles.length === 0 || !field) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {section.doodles.map((placement, i) => (
        <DoodleInstance
          key={i}
          placement={placement}
          anchor={section.anchor}
          progress={field.progress}
          drift={field.drift}
        />
      ))}
    </div>
  );
}
