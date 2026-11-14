"use client";

import { Logo } from "@/components/logo";
import { MobileDrawerTrigger } from "@/components/mobile-drawer-trigger";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

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

        <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-6">
          <ThemeToggle className="-m-2.5 hidden items-center justify-center p-2.5 lg:inline-flex" />
          <a
            href={siteConfig.links.appStore}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Get zeile on the App Store"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "whitespace-nowrap"
            )}
          >
            {siteConfig.cta}
          </a>
          <div className="lg:hidden">
            <MobileDrawerTrigger />
          </div>
        </div>
      </div>
    </header>
  );
}
