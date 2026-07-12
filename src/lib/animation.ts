import { cubicBezier } from "framer-motion";

export const easeInOutCubic = cubicBezier(0.645, 0.045, 0.355, 1);
export const easeOutCubic = cubicBezier(0, 0, 0.58, 1);
export const easeOutQuart = cubicBezier(0.25, 1, 0.5, 1);

// Duration presets for the shared "blur reveal" entrance recipe
// (opacity/y + filter: blur -> sharp). Pick by the element's visual
// weight within its reveal group: smaller/supporting elements settle
// FASTER than the primary element they follow.
export const REVEAL_DURATION_LG = 0.4; // primary element: headline, hero media
export const REVEAL_DURATION_MD = 0.35; // supporting copy: paragraphs, descriptions
export const REVEAL_DURATION_SM = 0.3; // small chrome: badges, stagger children

// Delay step between cascading elements in a reveal group.
export const REVEAL_STAGGER = 0.08;
