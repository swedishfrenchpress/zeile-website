import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProvider } from "@/components/paper/scroll-provider";
import { ConsoleGreeting } from "@/components/console-greeting";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

// Pairing codes only — the one deliberate mono moment on the site.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const title = "zeile — leave a little note";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: siteConfig.tagline,
  keywords: siteConfig.keywords,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // OG/Twitter images come from src/app/opengraph-image.tsx (file convention).
  openGraph: {
    title,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#161314" },
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
      className={`${nunito.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <ScrollProvider>{children}</ScrollProvider>
          <ConsoleGreeting />
        </ThemeProvider>
      </body>
    </html>
  );
}
