"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { DownloadCtas } from "@/components/ui/download-ctas";
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
import { Menu } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "GitHub", href: siteConfig.links.appRepo, external: true },
  { label: "contact", href: siteConfig.links.contact, external: false },
  { label: "privacy policy", href: siteConfig.links.privacy, external: false },
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
          Navigation links and zeile download options
        </DrawerDescription>
        <DrawerHeader className="px-6">
          <Link
            href="/"
            title="zeile"
            className="relative mr-6 flex items-center gap-2.5"
          >
            <Logo className="size-8" />
            <span className="font-display text-lg font-extrabold lowercase leading-none text-primary">
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
              {link.external && (
                <Icons.github className="size-4 text-muted-foreground" />
              )}
            </a>
          ))}
        </nav>
        <DrawerFooter className="gap-3">
          <DownloadCtas />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
