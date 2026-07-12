import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Azeret_Mono, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SkyProvider } from "@/components/sky/sky-provider";
import { ConsoleGreeting } from "@/components/console-greeting";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-azeret-mono",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const title = "Cashu Me";
const ogImageAlt = "Cashu Me — Privacy of a $20 bill. The speed of a tap.";
const ogImages = [
  { url: "/images/og-cashu-me.png", width: 1200, height: 640, alt: ogImageAlt },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: siteConfig.tagline,
  keywords: siteConfig.keywords,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.tagline,
    creator: "@CashuBTC",
    images: ogImages,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#c9e2f5" },
    { media: "(prefers-color-scheme: dark)", color: "#070708" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${azeretMono.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <SkyProvider>{children}</SkyProvider>
          <ConsoleGreeting />
        </ThemeProvider>
      </body>
    </html>
  );
}
