"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { MobileDrawer } from "@/components/mobile-drawer";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ICONS = [
  { label: "View source on GitHub", href: siteConfig.links.repo, icon: Icons.github },
  { label: "Get the iOS app", href: siteConfig.links.testflight, icon: Icons.apple },
  { label: "Get the Android app", href: siteConfig.links.androidApk, icon: Icons.android },
  { label: "Open in browser", href: siteConfig.links.wallet, icon: Globe },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4 lg:px-6">
      <div
        className={cn(
          "flex w-full max-w-5xl flex-nowrap items-center justify-between gap-6 rounded-lg border border-glass-border bg-background/55 px-6 py-3 shadow-[var(--glass-shadow)] backdrop-blur-lg transition-[background-color,border-color] duration-500 ease-out-quart lg:px-8",
          isScrolled && "border-glass-border-strong bg-background/75"
        )}
      >
        <Link
          href="/"
          title="cashu.me"
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Logo className="size-7 shrink-0" />
          <span className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.14em]">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden shrink-0 items-center gap-6 lg:flex">
          <div className="flex shrink-0 items-center gap-5">
            {NAV_ICONS.map(({ label, href, icon: Icon }) => {
              const isPlaceholder = href === "#";
              return (
                <a
                  key={label}
                  href={href}
                  target={isPlaceholder ? undefined : "_blank"}
                  rel={isPlaceholder ? undefined : "noreferrer noopener"}
                  aria-label={label}
                  title={label}
                  className="-m-2.5 inline-flex items-center justify-center p-2.5 text-foreground/70 transition-colors hover:text-foreground"
                >
                  <Icon className="size-6" aria-hidden="true" />
                </a>
              );
            })}
            <ThemeToggle className="-m-2.5 inline-flex items-center justify-center p-2.5" />
          </div>
          <a
            href={siteConfig.links.wallet}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          >
            {siteConfig.cta}
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle className="inline-flex h-11 w-11 items-center justify-center" />
          <MobileDrawer />
        </div>
      </div>
    </header>
  );
}
