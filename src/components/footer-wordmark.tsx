"use client";

import { DOODLE_ASSETS } from "@/components/paper/doodles";
import { easeOutQuart } from "@/lib/animation";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

interface FooterWordmarkProps {
  text: string;
}

export function FooterWordmark({ text }: FooterWordmarkProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const catIsVisible = hovered || focused || tapped;

  return (
    <button
      type="button"
      aria-pressed={tapped}
      aria-label={tapped ? "Hide the doodled cat" : "Reveal a doodled cat"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => setTapped((current) => !current)}
      className="relative block w-full cursor-pointer text-left"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[12%] left-[14%] z-0 w-[clamp(3.5rem,8vw,7rem)] text-[var(--doodle-charcoal)]"
        initial={false}
        animate={
          catIsVisible
            ? { y: "-42%", rotate: -7, opacity: 0.42 }
            : { y: "20%", rotate: 3, opacity: 0 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.34,
          ease: easeOutQuart,
        }}
      >
        {DOODLE_ASSETS.cat.render({ className: "h-auto w-full" })}
      </motion.span>
      <span className="type-wordmark relative z-10 block lowercase text-primary select-none">
        {text}
      </span>
    </button>
  );
}
