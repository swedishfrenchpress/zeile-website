"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Drawing } from "@/components/mockups/drawings";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center lg:px-10">
      {/* rose ambient behind the masthead, like every other page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55vh]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, var(--rose-wash), transparent 72%)",
        }}
      />

      {/* things got a little melty */}
      <div className="relative flex size-44 rotate-2 items-center justify-center rounded-note border border-rose-hairline bg-canvas-white p-5 shadow-[var(--paper-shadow)]">
        <Drawing name="icecream" className="h-full w-full" />
      </div>

      <span className="mt-8 type-label text-muted-foreground">error</span>
      <h1 className="mt-3 type-display-2 text-foreground">
        Something melted.
      </h1>
      <p className="mt-5 max-w-[44ch] type-lead text-foreground/75">
        This page didn&apos;t load. The app itself is fine. Try again, or
        head back home.
      </p>

      {error.digest && (
        <span className="mt-6 font-mono text-xs text-muted-foreground">
          ref: {error.digest}
        </span>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary" size="lg" onClick={() => reset()}>
          try again
        </Button>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          back to zeile
        </Link>
      </div>
    </main>
  );
}
