import type { ReactNode } from "react";

const links = {
  wallet: "https://wallet.cashu.me",
  spec: "https://github.com/cashubtc/nuts",
  repo: "https://github.com/asmogo/wallet",
  docs: "https://docs.cashu.space",
  nostr:
    "https://primal.net/p/nprofile1qqs0y3tvskgs9gpgxxu5ahgz3fmms3rzmxt504qceqtz4a6pdgfwlkghwl6j8",
  twitter: "https://x.com/CashuBTC",
  opencash: "http://opencash.dev/",
  // iOS ships via TestFlight (public beta); the Android native build is still in
  // closed beta, so there is no Play Store listing yet. It ships as a direct
  // APK download instead, via GitHub releases.
  testflight: "https://testflight.apple.com/join/DT1xF1y4",
  androidApk: "https://github.com/asmogo/wallet/releases",
};

export const siteConfig = {
  name: "cashu.me",
  description: "A Cashu Wallet.",
  tagline:
    "A native wallet for iPhone and Android. Hold bearer ecash on your device, send with a tap, redeem to any Lightning address. No account.",
  url: "https://cashu.me",
  cta: "Open wallet",
  keywords: [
    "Cashu",
    "ecash",
    "bitcoin",
    "lightning",
    "privacy",
    "wallet",
    "open source",
  ],
  links,
  featureHighlight: [
    {
      title: "Bearer ecash, in your pocket.",
      description:
        "Your ecash lives on your device. No account, no login, no balance tied to your name. The mint holds the underlying bitcoin, same as any custodian, but you hold ecash that redeems to any Lightning address, any time, no permission needed.",
      imageSrc: "/images/screen-receive-ecash-light.png",
      imageSrcDark: "/images/screen-receive-ecash-dark.png",
      direction: "ltr" as const,
    },
    {
      title: "Lose the phone, keep the cash.",
      description:
        "Twelve words back up your whole wallet, the same way Bitcoin does. Restore on any device, any time.",
      videoSrc: "/videos/seedphrase-light.mp4",
      videoSrcDark: "/videos/seedphrase-dark.mp4",
      posterSrc: "/images/seedphrase-light-poster.jpg",
      posterSrcDark: "/images/seedphrase-dark-poster.jpg",
      direction: "ltr" as const,
    },
  ],
  tapToPay: {
    title: "Tap to pay.",
    description:
      "Hold your phone near the receiver. The ecash token transfers over NFC in seconds. No card network, no settlement window.",
    videoSrc: "/videos/tap-to-pay.mp4",
  },
  bento: [
    {
      id: "custody-comparison",
      title: "Account wallets see everything.",
      content:
        "Every send, every receive, every contact, tied to a single account in someone else's database. A change of policy is a change of access.",
      imageSrc: "/images/iphone-placeholder.png",
      imageAlt: "Cluttered wallet UI showing transaction history",
      fullWidth: true,
    },
    {
      id: "imessage-chat",
      title: "iMessage, SMS, Bluetooth, your group chat.",
      content:
        "Ecash is just text. Anywhere you can paste a string (a chat, an SMS, a Bluetooth share), you can send money. No app to install on their end.",
      imageSrc: "/images/screen-imessage-light.png",
      imageSrcDark: "/images/screen-imessage-dark.png",
      imageAlt:
        "iMessage thread: a long Cashu token pasted in reply to 'dinner last night was $38 each'",
      fullWidth: false,
    },
    {
      id: "lightning-address",
      title: "Bitcoin address, BOLT12, Lightning address.",
      content:
        "Hand out a Bitcoin address, a BOLT12 offer, or a Lightning address. Sats arrive while you're offline.",
      imageSrc: "/images/screen-lightning-address-light.png",
      imageSrcDark: "/images/screen-lightning-address-dark.png",
      imageAlt: "Bottom sheet showing a Lightning Address QR code with Copy and Share actions",
      fullWidth: false,
    },
  ],
  faqs: [
    {
      question: "How private is this?",
      answer:
        "The mint signs your ecash blind, without seeing what it's signing, so it can't link your withdrawal to your later spend. Peer-to-peer sends, over iMessage, NFC, or any chat, never touch the mint, leaving no transaction graph to trace. Minting or melting to Lightning does reveal amount and timing.",
    },
    {
      question: "What if a mint disappears?",
      answer:
        "You lose the ecash minted there. The protocol does not solve this. Mitigate by choosing mints with known operators, holding small amounts per mint, and redeeming regularly to a Lightning wallet you control.",
    },
    {
      question: "How is this different from an account-based (custodial) wallet?",
      answer:
        "Account-based wallets hold a balance in a database tied to your identity and can rate-limit, suspend, or geofence you. A Cashu mint also holds bitcoin, but it issues you blinded bearer ecash instead of an account balance. You can swap to another mint, send ecash peer-to-peer, or withdraw to any Lightning address, without permission.",
    },
    {
      question: "Can I back it up?",
      answer:
        "Three ways. cashu.me derives ecash from a 12-word BIP39 seed, the same kind Bitcoin wallets use. Mint URLs and settings export as an encrypted file. Either restores on any device. There's also an experimental iCloud backup that syncs an encrypted copy automatically; it's new and unproven, so don't rely on it alone yet. Ecash is a bearer instrument: possession of the backup means possession of the funds. Store accordingly.",
    },
  ] as { question: string; answer: ReactNode }[],
  footer: {
    tagline: "Bearer cash for the web.",
    attribution: "Open source under MIT.",
    copyright: "© 2026 cashu.me",
    columns: [
      {
        label: "Wallet",
        links: [
          { label: "iOS (TestFlight)", href: links.testflight },
          { label: "Android", href: links.androidApk },
          { label: "Browser", href: links.wallet },
        ],
      },
      {
        label: "Protocol",
        links: [
          { label: "Spec (NUTs)", href: links.spec },
          { label: "Source", href: links.repo },
          { label: "Docs", href: links.docs },
        ],
      },
      {
        label: "Community",
        links: [
          { label: "Nostr", href: links.nostr },
          { label: "X", href: links.twitter },
          { label: "Opencash", href: links.opencash },
        ],
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
