import Link from "next/link";
import type { ReactNode } from "react";
import type { DrawingName } from "@/components/mockups/drawings";
import type { DrawingVideoConfig } from "@/components/mockups/drawing-video";
import type { HomeScreenVideoConfig } from "@/components/mockups/home-screen-video";

export const APP_STORE_URL =
  "https://apps.apple.com/app/zeile/id6784477876";

const links = {
  appStore: APP_STORE_URL,
  email: "erikcativo@pm.me",
  contact: "/contact",
  privacy: "/privacy",
};

/** A drawing as it appears on the widget mockups. */
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
  description: "Leave a little mark.",
  tagline:
    "zeile pairs you with one person. Draw something small, and it lands right on their Home Screen.",
  url: "https://www.zeileapp.com",
  cta: "Get zeile.",
  /** the reassurance that sits under every App Store badge */
  ctaNote: "Free. You both need it, on iPhone or iPad.",
  keywords: [
    "zeile",
    "widget",
    "drawing",
    "doodle",
    "couples app",
    "long distance",
    "iOS widget",
    "home screen",
  ],
  links,
  hero: {
    headline: "Leave a little mark.",
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
      alt: "A hand-drawn grumpy cat holding up a little sign",
      altDark: "A hand-drawn orange cat holding up a green sign",
      width: 632,
      height: 632,
    },
    /** the person whose drawings arrive on the living widget */
    sender: "Erik",
  },
  featureHighlight: [
    {
      title: "Right there with your person.",
      description:
        "No app to open, no inbox to check. Your drawing shows up on your person’s widget the moment you send it.",
      media: "widget" as const,
      direction: "ltr" as const,
      video: {
        light: { src: "/videos/add-widget-light.mp4" },
        dark: { src: "/videos/add-widget-dark.mp4" },
        poster: "/videos/add-widget-light-poster.jpg",
        posterDark: "/videos/add-widget-dark-poster.jpg",
      },
    },
  ] satisfies FeatureHighlightItem[],
  pairing: {
    title: "One code. Two phones.",
    description:
      "Setup is quick. One of you creates a code, the other types it in, and you approve them. No account to make, no phone number, no contact list to share.",
    sampleCode: "K7RM24QZ",
    screenshot: {
      src: "/images/screens/screen-pairing-light.png",
      srcDark: "/images/screens/screen-pairing-dark.png",
      alt: "The zeile pairing screen showing an 8-character code to share with your person",
      ready: true,
    },
    onboardingVideo: {
      light: { src: "/videos/pair-light-mode.mp4" },
      dark: { src: "/videos/pair-dark-mode.mp4" },
      poster: "/images/screens/pair-onboarding-light-poster.jpg",
      posterDark: "/images/screens/pair-onboarding-dark-poster.jpg",
    },
  },
  /** the audience-of-one beat: no feed, the History wall, and the privacy line */
  madeForTwo: {
    title: "Made for two.",
    content:
      "zeile is just you and your person. No feed, no followers, no likes or streaks to chase. Your recent drawings live in History, a little wall of the two of you.",
    privacy: {
      title: "Only your person can open them.",
      description:
        "Drawings are encrypted on your phone. Not even zeile or Apple can see them.",
    },
    screenshot: {
      src: "/images/screens/history-wall-light.png",
      srcDark: "/images/screens/history-wall-dark.png",
      alt: "The zeile History screen: a wall of sent and received drawings",
      ready: true,
    },
  },
  faqs: [
    {
      question: "Do we both need the app?",
      answer:
        "Yes, zeile is for two. You each install it, pair once, and add the widget to your Home Screens. It works on iPhone and iPad, iOS 17 and up.",
    },
    {
      question: "Is zeile free?",
      answer:
        "Yes, completely. zeile is free to download and free to use. There’s no premium version to upgrade to, no subscription, and nothing locked behind a paywall.",
    },
    {
      question: "How does pairing work?",
      answer:
        "One of you creates an 8-character code, the other types it in, and you approve them. That’s the whole setup. A pair locks to exactly two devices, and you can unpair in Settings whenever you like.",
    },
    {
      question: "Is there an Android version?",
      answer:
        "No, and I’d rather be honest about why. zeile syncs your drawings through iCloud and Apple’s CloudKit, and there’s no way to run that on Android. The other half of it: I’m just one person who built zeile on the side, and an Android version is more time and effort than I can take on right now. Sorry. I know that’s not the answer you were hoping for.",
    },
    {
      question: "Are my drawings private?",
      answer: (
        <>
          <p>
            Yes. Drawings are encrypted on your phone and can only be opened on
            your person’s. Not even zeile or Apple can see them. To deliver
            them, iCloud still sees your names, send times, and pair code.
            There’s no feed, no public profile, and nothing to sign up for.
          </p>
          <p className="mt-3">
            Want the full picture? Our{" "}
            <Link
              href={links.privacy}
              className="text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
            >
              privacy policy
            </Link>{" "}
            explains exactly how zeile stores your data, how long drawings are
            kept, and what the developer can access.
          </p>
        </>
      ),
    },
    {
      question: "What does the widget show?",
      answer: (
        <>
          The latest drawing from your person, shown with
          {" “♥ from "}
          <span className="font-semibold italic">their name</span>
          {".” Everything you’ve both sent lives in History inside the app."}
        </>
      ),
    },
  ] as { question: string; answer: ReactNode }[],
  finalCta: {
    title: "Go leave the first mark.",
    description:
      "You’ve read this far, so there’s clearly someone in mind.\nMake the first move.",
    promptLabel: "Draw a little something.",
    canvasPlaceholder: "Draw a little doodle…",
    /** touch screens: the canvas waits for a tap so a thumb flick still scrolls */
    canvasTouchPlaceholder: "Tap here, then draw a little doodle…",
    localDisclosure: "Just a preview. Nothing leaves this page.",
    landingCaption: "That’s how it lands on their Home Screen.",
    inkLabel: "Ink",
    brushLabel: "Brush size",
    eraserLabel: "Eraser",
    undoLabel: "Undo last stroke",
    clearLabel: "Clear drawing",
  },
  footer: {
    tagline: "A tiny drawing goes a long way.",
    attribution: "Made for exactly two people.",
    copyright: "© 2026 zeile",
    columns: [
      {
        label: "the app",
        links: [{ label: "Download on the App Store", href: links.appStore }],
      },
      {
        label: "say hi",
        links: [{ label: "contact", href: links.contact }],
      },
      {
        label: "the details",
        links: [{ label: "privacy policy", href: links.privacy }],
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
