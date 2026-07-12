import type { ReactNode } from "react";
import type { DrawingName } from "@/components/mockups/drawings";

// TODO(launch): swap for the real App Store link the day zeile ships.
// Header, hero badge, and footer all read this one constant.
export const APP_STORE_URL = "#";

const links = {
  appStore: APP_STORE_URL,
  appRepo: "https://github.com/swedishfrenchpress/zeile",
  siteRepo: "https://github.com/swedishfrenchpress/zeile-website",
  email: "erikcativo@pm.me",
  contact: "/contact",
  privacy: "/privacy",
};

/** A note as it appears on the widget mockups. */
export interface SampleNote {
  type: "text" | "doodle";
  text?: string;
  /** which drawing to render (see mockups/drawings) */
  doodle?: DrawingName;
  timestamp: string;
}

export const siteConfig = {
  name: "zeile",
  description: "Leave a little note.",
  tagline:
    "zeile pairs you with one person. Send a quick note or doodle — it lands right on their Home Screen.",
  // TODO(domain): confirm the production domain before launch.
  url: "https://zeile.app",
  cta: "Get the app",
  keywords: [
    "zeile",
    "widget",
    "notes",
    "doodle",
    "couples app",
    "long distance",
    "iOS widget",
    "home screen",
  ],
  links,
  hero: {
    headline: "Leave a little note.",
    /** the person whose notes arrive on the hero widget */
    sender: "Sam",
    /** cycled by the living widget in the hero — drawings first and mostly */
    sampleNotes: [
      { type: "doodle", doodle: "blowkiss", timestamp: "now" },
      { type: "doodle", doodle: "icecream", timestamp: "now" },
      {
        type: "text",
        text: "good luck today. you've got this.",
        timestamp: "now",
      },
      { type: "doodle", doodle: "cat", timestamp: "now" },
      { type: "doodle", doodle: "sleepy", timestamp: "now" },
    ] as SampleNote[],
  },
  featureHighlight: [
    {
      title: "It lives on their Home Screen.",
      description:
        "No app to open, no inbox to check. Your note shows up on your person's widget the moment you send it — with a quiet ♥ from you. The only heart in the whole app.",
      media: "widget" as const,
      direction: "ltr" as const,
    },
    {
      title: "Or draw it instead.",
      description:
        "Some things don't need words. Sketch in any color you can think of — the whole wheel, not just a few inks — and send. Your doodle arrives crisp on a little white card, right next to their apps.",
      media: "drawing" as const,
      direction: "rtl" as const,
    },
  ],
  pairing: {
    title: "One code. Two phones.",
    description:
      "Setup is the whole of it: one of you creates a code, the other types it in. No account, no phone number, no contact list. Just you two.",
    sampleCode: "K7RM24QZ",
  },
  bento: [
    {
      id: "audience-of-one",
      title: "An audience of one.",
      content:
        "zeile is you and your person. No feed, no followers, no likes, no streaks. Nothing to perform, nothing to keep up — just the small good feeling of being thought of.",
      fullWidth: true,
    },
    {
      id: "write-or-draw",
      title: "Write it or draw it.",
      content:
        "A short note or a quick doodle — whatever the moment calls for.",
      screenshot: {
        // Drop simulator captures in public/images/screens/ under these
        // names and the placeholder swaps itself for the real thing.
        src: "/images/screens/screen-compose-light.png",
        srcDark: "/images/screens/screen-compose-dark.png",
        alt: "The zeile compose screen with a note being written",
        ready: false,
      },
      fullWidth: false,
    },
    {
      id: "no-signup",
      title: "Nothing to sign up for.",
      content:
        "No account, no email, no password. Pair once and start sending.",
      screenshot: {
        src: "/images/screens/screen-history-light.png",
        srcDark: "/images/screens/screen-history-dark.png",
        alt: "The zeile history screen listing sent and received notes",
        ready: false,
      },
      fullWidth: false,
    },
  ],
  faqs: [
    {
      question: "Do we both need the app?",
      answer:
        "Yes — zeile is for two. You each install it, pair once, and add the widget to your Home Screens. It's iPhone-only, iOS 17 and up.",
    },
    {
      question: "How does pairing work?",
      answer:
        "One of you creates an 8-character code, the other types it in. That's the whole setup. A pair locks to exactly two phones, and you can unpair in Settings whenever you like.",
    },
    {
      question: "Is there an Android version?",
      answer: (
        <>
          Not yet — zeile is iOS-only for now. If your person is on Android,{" "}
          <a
            href={links.appRepo}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-4 transition-colors hover:text-primary"
          >
            tell us on GitHub
          </a>{" "}
          — it helps us decide what to build next.
        </>
      ),
    },
    {
      question: "Are my notes private?",
      answer:
        "Your notes only ever go to your paired person — there's no feed, no public anything. They sync through Apple's iCloud (CloudKit) and are not end-to-end encrypted, so think of zeile like a postcard, not a vault. Don't send anything sensitive.",
    },
    {
      question: "What does the widget show?",
      answer:
        "The latest note from your person — text or doodle — with “♥ from <their name>” and when it arrived. Your own sends live in History inside the app.",
    },
  ] as { question: string; answer: ReactNode }[],
  footer: {
    tagline: "a tiny note goes a long way.",
    attribution: "Made for exactly two people.",
    copyright: "© 2026 zeile",
    columns: [
      {
        label: "the app",
        links: [{ label: "App Store", href: links.appStore }],
      },
      {
        label: "source",
        links: [{ label: "GitHub", href: links.appRepo }],
      },
      {
        label: "say hi",
        links: [
          { label: "contact", href: links.contact },
          { label: "privacy policy", href: links.privacy },
        ],
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
