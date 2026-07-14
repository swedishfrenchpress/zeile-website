<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# zeile-website

Marketing site for **zeile** — a tiny two-person note/doodle iOS app
(github.com/swedishfrenchpress/zeile). Single page, Next.js App Router,
Tailwind v4 (CSS-first config — no tailwind.config.js; all tokens live in
`src/app/globals.css`), framer-motion, next-themes (`data-theme`).

## Brand rules (non-negotiable — from the app's DESIGN.md)

- **One Rose Rule**: zeile Rose (`--rose`, #D63864 light / #FB5481 dark) is
  the ONLY accent. Decorative doodles use the ink palette; never rose.
- **Anti-glass**: surfaces are opaque note paper (`note-surface` utility) +
  one soft shadow + a rose glow. The pairing code chip is the only
  translucent element.
- **Rounded voice**: display type is Nunito (stand-in for SF Rounded),
  sentence case with a period — never uppercase. Body is the system stack.
- **No privacy/E2EE claims**: notes sync via CloudKit's public database and
  are not end-to-end encrypted. The FAQ's "postcard, not a vault" phrasing
  is the ceiling.

## Architecture notes

- All copy lives in `src/lib/config.tsx`. `APP_STORE_URL` is a placeholder
  ("#") until launch — swap that one constant.
- The parallax background system: `src/lib/doodles.ts` (placements) +
  `src/components/paper/` (SVG marks, field, scroll provider). One global
  scroll MotionValue, no per-element listeners, reduced-motion gated.
- CSS mockups of the app live in `src/components/mockups/`. Real simulator
  screenshots drop into `public/images/screens/` (filenames are printed by
  the placeholders); flip `ready: true` in config when they land.
- Every animation must be `useReducedMotion`-gated; globals.css also has a
  belt-and-braces reduced-motion kill-switch.
