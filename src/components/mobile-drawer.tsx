"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ApkBadge } from "@/components/ui/apk-badge";
import { AppStoreBadge } from "@/components/ui/app-store-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Spec", href: siteConfig.links.spec, external: true },
  { label: "Docs", href: siteConfig.links.docs, external: true },
  { label: "GitHub", href: siteConfig.links.repo, external: true },
];

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger
        aria-label="Open menu"
        className="inline-flex h-11 w-11 items-center justify-center -mr-2"
      >
        <Menu className="size-6" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Menu</DrawerTitle>
        <DrawerDescription className="sr-only">
          Navigation links and wallet access
        </DrawerDescription>
        <DrawerHeader className="px-6">
          <Link
            href="/"
            title="cashu.me"
            className="relative mr-6 flex items-center gap-2.5"
          >
            <Logo className="size-8" />
            <span className="font-display text-base font-bold uppercase tracking-[0.14em]">
              {siteConfig.name}
            </span>
          </Link>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 px-6 py-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer noopener" : undefined}
              className="flex items-center justify-between rounded-none py-3 text-base text-foreground/90 transition-colors hover:text-foreground"
            >
              <span>{link.label}</span>
              {link.label === "GitHub" && (
                <Icons.github className="size-4 text-muted-foreground" />
              )}
            </a>
          ))}
        </nav>
        <DrawerFooter className="gap-3">
          <AppStoreBadge
            href={siteConfig.links.testflight}
            className="w-full justify-center"
          />
          <ApkBadge
            href={siteConfig.links.androidApk}
            className="w-full justify-center"
          />
          <a
            href={siteConfig.links.wallet}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            {siteConfig.cta}
          </a>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
