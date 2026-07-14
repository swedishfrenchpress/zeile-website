import type { ReactNode } from "react";
import type { DrawingName } from "@/components/mockups/drawings";
import type { DrawingVideoConfig } from "@/components/mockups/drawing-video";
import type { HomeScreenVideoConfig } from "@/components/mockups/home-screen-video";

// TODO(launch): swap for the real App Store link the day zeile ships.
// Every disabled App Store badge reads this one constant.
export const APP_STORE_URL = "#";
export const TESTFLIGHT_URL = "https://testflight.apple.com/join/4ZXFHq4U";

const links = {
  appStore: APP_STORE_URL,
  testFlight: TESTFLIGHT_URL,
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

/** A text + media section (see FeatureHighlight). */
export interface FeatureHighlightItem {
  title: string;
  description: string;
  media: "widget" | "drawing";
  direction: "ltr" | "rtl";
  /** when present (and motion allowed), the widget mockup becomes this video */
  video?: HomeScreenVideoConfig;
}

export const siteConfig = {
  name: "zeile",
  description: "Leave a little note.",
  tagline:
    "zeile pairs you with one person. Send a quick note or doodle, and it lands right on their Home Screen.",
  // TODO(domain): confirm the production domain before launch.
  url: "https://zeile.app",
  cta: "Try the beta",
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
    drawingVideo: {
      light: { src: "/videos/drawing-light.mp4" },
      dark: { src: "/videos/drawing-dark.mp4" },
      poster: "/images/screens/drawing-light-poster.jpg",
      posterDark: "/images/screens/drawing-dark-poster.jpg",
      finalPoster: "/images/screens/drawing-light-final-poster.png",
      finalPosterDark: "/images/screens/drawing-dark-final-poster.png",
      alt: "A screen recording of drawing and sending a doodle in zeile",
    } satisfies DrawingVideoConfig,
    finalWidgetImage: {
      src: "/images/screens/hero-widget-light.jpg",
      srcDark: "/images/screens/hero-widget-dark.jpg",
      alt: "A hand-drawn black cat holding a note",
      altDark: "A hand-drawn orange cat holding a green note",
      width: 632,
      height: 632,
    },
    /** the person whose notes arrive on the living widget */
    sender: "Erik",
    /** cycled by the living widget — drawings first and mostly */
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
      title: "Right there with your person.",
      description:
        "No app to open, no inbox to check. Your note shows up on your person's widget the moment you send it.",
      media: "widget" as const,
      direction: "ltr" as const,
      video: {
        light: { src: "/videos/add-widget-light.mp4" },
        dark: { src: "/videos/add-widget-dark.mp4" },
        poster: "/videos/add-widget-light-poster.jpg",
        posterDark: "/videos/add-widget-dark-poster.jpg",
      },
    },
    {
      title: "Draw it instead.",
      description:
        "Some things don't need words. Sketch in any color you can think of (the whole wheel, not just a few inks) and send. Your doodle arrives crisp on a little white card, right next to their apps.",
      media: "drawing" as const,
      direction: "rtl" as const,
    },
  ] satisfies FeatureHighlightItem[],
  pairing: {
    title: "One code. Two phones.",
    description:
      "Setup is quick. One of you creates a code, the other types it in. No account to make, no phone number, no contact list to share. Just the two of you.",
    sampleCode: "K7RM24QZ",
    screenshot: {
      src: "/images/screens/screen-pairing-light.png",
      srcDark: "/images/screens/screen-pairing-dark.png",
      alt: "The zeile pairing screen where a person enters an 8-character code",
      ready: true,
    },
    onboardingVideo: {
      light: { src: "/videos/pair-light-mode.mp4" },
      dark: { src: "/videos/pair-dark-mode.mp4" },
      poster: "/images/screens/pair-onboarding-light-poster.jpg",
      posterDark: "/images/screens/pair-onboarding-dark-poster.jpg",
    },
  },
  bento: [
    {
      id: "audience-of-one",
      title: "Made for two.",
      content:
        "zeile is just you and your person. No feed, no followers, no likes or streaks to chase, and nothing to perform. Just the small good feeling of being thought of.",
      composeScreenshot: {
        src: "/images/screens/screen-compose-light.png",
        srcDark: "/images/screens/screen-compose-dark.png",
        alt: "The zeile drawing composer with its canvas and color palette",
      },
      widgetImage: {
        src: "/images/drawings/cat-serving-cake.png",
        alt: "A hand-drawn cat serving a birthday cake",
        width: 1074,
        height: 1026,
      },
      fullWidth: true,
    },
    {
      id: "write-or-draw",
      title: "Write it or draw it.",
      content:
        "A short note or a quick doodle, whichever fits the moment.",
      fullWidth: false,
    },
    {
      id: "no-signup",
      title: "Nothing to sign up for.",
      content:
        "No email, no password, nothing to verify. Pair once and you're sending.",
      screenshot: {
        src: "/images/screens/screen-history-light.png",
        srcDark: "/images/screens/screen-history-dark.png",
        alt: "The zeile history screen listing sent and received notes",
        ready: true,
      },
      trustNote: {
        title: "Syncs through iCloud.",
        description:
          "Notes and doodles use Apple CloudKit. No zeile account or servers of our own.",
      },
      fullWidth: false,
    },
  ],
  faqs: [
    {
      question: "Do we both need the app?",
      answer:
        "Yes, zeile is for two. You each install it, pair once, and add the widget to your Home Screens. It's iPhone-only, iOS 17 and up.",
    },
    {
      question: "Is zeile free?",
      answer:
        "Yes, completely. zeile is free to download and free to use. There's no premium version to upgrade to, no subscription, and nothing locked behind a paywall.",
    },
    {
      question: "How does pairing work?",
      answer:
        "One of you creates an 8-character code, the other types it in. That's the whole setup. A pair locks to exactly two phones, and you can unpair in Settings whenever you like.",
    },
    {
      question: "Is there an Android version?",
      answer:
        "No, and I'd rather be honest about why. zeile syncs your notes and doodles through iCloud and Apple's CloudKit, and there's no way to run that on Android. The other half of it: I'm just one person who built zeile on the side, and an Android version is more time and effort than I can take on right now. Sorry. I know that's not the answer you were hoping for.",
    },
    {
      question: "Are my notes private?",
      answer:
        "Your notes are meant only for you and your paired person. zeile has no feed or public profile. They sync through Apple’s iCloud (CloudKit), where your pair code is the only secret protecting them. They aren’t end-to-end encrypted. Think of zeile like a postcard, not a vault. Don’t send anything sensitive.",
    },
    {
      question: "What does the widget show?",
      answer: (
        <>
          The latest note from your person, whether text or doodle, shown with
          {" “♥ from "}
          <span className="font-semibold italic">their name</span>
          {".” Your own sends live in History inside the app."}
        </>
      ),
    },
  ] as { question: string; answer: ReactNode }[],
  finalCta: {
    title: "Go leave the first note.",
    description:
      "You've read this far, so there's clearly someone in mind.\nMake the first move.",
    promptLabel: "Draw a little something.",
    canvasPlaceholder: "Draw a little doodle…",
    localDisclosure: "Just a preview. Nothing leaves this page.",
    inkLabel: "Ink",
    brushLabel: "Brush size",
    eraserLabel: "Eraser",
    undoLabel: "Undo last stroke",
    clearLabel: "Clear drawing",
  },
  footer: {
    tagline: "a tiny note goes a long way.",
    attribution: "Made for exactly two people.",
    copyright: "© 2026 zeile",
    columns: [
      {
        label: "the app",
        links: [{ label: "TestFlight beta", href: links.testFlight }],
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
