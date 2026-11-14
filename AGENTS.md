<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# zeile-website

Marketing site for **zeile**, a tiny two-person drawing app for iPhone and iPad.
Single page, Next.js App Router,
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
- **Drawings only**: since app 1.2 a drawing is the only thing you send. No
  typed notes, no captions. Copy says "drawing" (or "doodle"), never "note".
  The headline is "Leave a little mark.", same as the app and the App Store.
- **Encryption, said plainly**: drawings are end-to-end encrypted (since app
  1.2). Say so in plain words, like the app does: encrypted on your phone,
  only your person's can open them, not even zeile or Apple can see them.
  Never claim names, send times, or pair codes are encrypted; they aren't,
  because iCloud uses them for delivery. No crypto jargon.
- **iPhone and iPad**: the app supports both. Never write "iPhone-only".
- **No em dashes** in user-visible copy. Use a full stop, comma, or colon.

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
