# Product

## Register

brand

## Users

People who want a private, low-friction way to leave a tiny note or doodle for exactly one other person — partners, long-distance couples, close friends, family. They arrive from App Store / TestFlight / word-of-mouth looking to understand the product in seconds and decide whether to try the beta. Context is emotional and personal, not productivity: “I want them to feel thought of,” often on a phone, often mid-scroll.

## Product Purpose

This is the marketing site for **zeile**, a tiny two-person iOS note/doodle app whose notes land on a Home Screen widget. The site’s job is conversion to the TestFlight beta (and later App Store): show the product feeling, explain pairing and privacy honestly, and make “try it with your person” the obvious next step. Success = visitor understands the two-person model, trusts the postcard-not-vault framing, and taps the beta CTA.

## Brand Personality

Warm, intimate, handmade. Three words: **tender · tiny · honest**.

Voice is rounded and human — sentence case with a period, never shouty uppercase. Feels like a note on the mirror or a sticky on the fridge, not a SaaS landing page. Rose is the only accent; decorative doodles use the ink palette. Surfaces are opaque note paper (anti-glass). Privacy claims stay at “postcard, not a vault” — no E2EE marketing.

## Anti-references

- Generic SaaS marketing (hero metrics, feature-card grids with icons, purple gradients, Inter-everything)
- Glassmorphism / frosted blur as decorative chrome
- Couples-app clichés that overpromise romance or “find love”
- Security theater (padlocks, vaults, “military-grade encryption”)
- Loud growth-hacker CTAs, all-caps labels, streak/social-proof theatre

## Design Principles

1. **Show the note, don’t sell the stack.** Product feeling (widget, doodle, pairing code) carries the pitch; features are supporting evidence.
2. **Audience of two.** Every section reinforces “just you and your person” — no feed, no followers, no performance.
3. **Honest ceiling.** Privacy and platform limits (iOS-only, CloudKit public DB) are stated clearly; understatement builds more trust than hype.
4. **One Rose Rule.** Rose is the only accent for action; decorative marks stay in the ink palette. Restraint is the brand.
5. **Paper, not glass.** Opaque note surfaces, soft shadow, rose glow — stationery warmth, not app chrome.

## Accessibility & Inclusion

- Prefer WCAG AA contrast (tokens already target strong ratios for body, muted ink, and rose buttons).
- All motion must respect `prefers-reduced-motion` (component gates + CSS kill-switch).
- Touch targets and mobile-first reading for one-handed visitors.
- No color-only meaning for critical UI (pairing, CTAs use text + shape).
- Screen-reader-friendly structure: semantic landmarks, meaningful alt on screenshots/videos.
