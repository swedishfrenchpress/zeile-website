"use client";

import { ScreenshotPlaceholder } from "@/components/mockups/screenshot-placeholder";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

/** The envelope the app seals every drawing in: a heart on the flap, no padlock. */
function SealedEnvelope({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 34"
      fill="none"
      className={cn("overflow-visible", className)}
    >
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="31"
        rx="4"
        className="fill-canvas-white stroke-foreground/25"
        strokeWidth="1.5"
      />
      <path
        d="M3 3.5 L24 19 L45 3.5"
        className="stroke-foreground/25"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        transform="translate(17.4 12.6) scale(0.55)"
        d="M12 21.2s-7.6-4.7-9.7-9.4C.8 8.4 3 4.4 6.8 4.4c2.2 0 3.7 1.2 5.2 3.1 1.5-1.9 3-3.1 5.2-3.1 3.8 0 6 4 4.5 7.4-2.1 4.7-9.7 9.4-9.7 9.4z"
        className="fill-primary"
      />
    </svg>
  );
}

/** Audience of one: no feed, the History wall, and the one privacy line. */
export function MadeForTwo() {
  const { title, content, privacy, screenshot } = siteConfig.madeForTwo;

  return (
    <Section
      id="made-for-two"
      variant="editorial"
      hideHeader
      className="container-page px-6 py-[var(--section-y-base)] lg:px-10"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
        <div className="max-w-[36rem]">
          <h2 className="type-display-2 text-balance text-foreground">
            {title}
          </h2>
          <p className="mt-6 type-lead text-foreground/75">{content}</p>

          <div className="mt-10 flex items-start gap-4 rounded-[20px] border border-rose-hairline bg-widget-paper p-5 shadow-[var(--paper-shadow)] sm:p-6">
            <SealedEnvelope className="mt-1 h-8 w-11 shrink-0" />
            <div className="min-w-0">
              <p className="type-subhead text-foreground">
                {privacy.title}
              </p>
              <p className="mt-1.5 type-body-lg text-foreground/70">
                {privacy.description}
              </p>
            </div>
          </div>
        </div>

        <ScreenshotPlaceholder
          screenshot={screenshot}
          className="mx-auto max-w-[290px] rotate-1 shadow-[var(--paper-shadow)] lg:max-w-[320px]"
        />
      </div>
    </Section>
  );
}
