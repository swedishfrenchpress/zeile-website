"use client";

import { CLOUD_ASSETS, DRIFT_RANGE, RISE_RANGE, TIERS } from "@/lib/clouds";
import type { CloudPlacement, SectionClouds } from "@/lib/clouds";
import { cn } from "@/lib/utils";
import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useSky } from "./sky-provider";

interface CloudInstanceProps {
  placement: CloudPlacement;
  anchor: number;
  progress: MotionValue<number>;
  drift: boolean;
}

function CloudInstance({ placement, anchor, progress, drift }: CloudInstanceProps) {
  const asset = CLOUD_ASSETS[placement.variant];
  const tier = TIERS[placement.tier];
  // Reads the one global scroll value; framer writes the transform directly to
  // the DOM (no React re-renders, no per-element scroll listeners).
  const x = useTransform(
    progress,
    (p) => (p - anchor) * DRIFT_RANGE * tier.depth
  );
  // Rises up from below into its resting spot as scroll approaches the
  // section's anchor, then keeps rising up and out past it — the "clouds
  // come in as you scroll" parallax entrance.
  const y = useTransform(
    progress,
    (p) => -(p - anchor) * RISE_RANGE * tier.depth
  );

  const mobileWidth = placement.mobileWidth ?? placement.width;

  return (
    <motion.div
      className={cn(
        "absolute w-[var(--cloud-w-mobile)] md:w-[var(--cloud-w)]",
        !placement.mobile && "hidden md:block"
      )}
      style={
        {
          top: placement.top,
          left: placement.left,
          right: placement.right,
          "--cloud-w": `${placement.width}px`,
          "--cloud-w-mobile": `${mobileWidth}px`,
          opacity: tier.opacity,
          filter: tier.blur ? `blur(${tier.blur}px)` : undefined,
          x: drift ? x : 0,
          y: drift ? y : 0,
        } as React.CSSProperties
      }
    >
      <Image
        src={asset.src}
        alt=""
        width={asset.w}
        height={asset.h}
        unoptimized
        // The one theme-aware cloud style: the same white-alpha PNG serves
        // both skies, dimmed to moonlit gray at night via --cloud-filter.
        className={cn(
          "h-auto w-full select-none [filter:var(--cloud-filter)]",
          placement.flip && "-scale-x-100"
        )}
        draggable={false}
      />
    </motion.div>
  );
}

/**
 * A section's decorative cloud layer. Mount as the first child of a
 * `relative` section (content above it at z-10). Purely decorative:
 * aria-hidden, no pointer events; overflow-hidden so drift can never
 * push a cloud outside the section box.
 */
export function CloudField({ section }: { section?: SectionClouds }) {
  const sky = useSky();
  if (!section || section.clouds.length === 0 || !sky) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {section.clouds.map((placement, i) => (
        <CloudInstance
          key={i}
          placement={placement}
          anchor={section.anchor}
          progress={sky.progress}
          drift={sky.drift}
        />
      ))}
    </div>
  );
}
