"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { MobileDrawerTrigger } from "@/components/mobile-drawer-trigger";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ICONS = [
  {
    label: "Download zeile on the App Store",
    href: siteConfig.links.appStore,
    icon: Icons.apple,
  },
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
    <header className="sticky top-[max(1rem,env(safe-area-inset-top))] z-50 flex justify-center px-3 sm:px-4 lg:px-6">
      {/* Opaque note paper, never glass (the app's anti-glassmorphism rule):
          the pill reads as a small paper object riding over the page. */}
      <div
        className={cn(
          "flex w-full max-w-5xl flex-nowrap items-center justify-between gap-2 rounded-card border border-border bg-paper px-4 py-3 shadow-[var(--paper-shadow)] transition-[border-color,box-shadow] duration-500 ease-out-quart sm:gap-6 sm:px-6 lg:px-8",
          isScrolled && "border-rose-hairline"
        )}
      >
        <Link
          href="/"
          title="zeile"
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Logo className="size-10 shrink-0" />
          <span className="whitespace-nowrap font-display text-3xl font-extrabold lowercase leading-none text-primary">
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
            href={siteConfig.links.appStore}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          >
            {siteConfig.cta}
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle className="inline-flex h-11 w-11 items-center justify-center" />
          <MobileDrawerTrigger />
        </div>
      </div>
    </header>
  );
}
