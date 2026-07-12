"use client";

import Link from "next/link";
import { useEffect } from "react";

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
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center lg:px-10">
      <span aria-hidden className="type-label text-muted-foreground">
        [ERR]
      </span>
      <h1 className="mt-6 type-display-2 text-foreground">
        Something went wrong.
      </h1>
      <p className="mt-6 max-w-[50ch] type-lead text-foreground/75">
        This page failed to load. The wallet and protocol are unaffected.
        Try again, or return to the homepage.
      </p>
      {error.digest && (
        <span
          aria-label="Error reference"
          className="mt-8 inline-flex items-center type-label text-muted-foreground"
        >
          [REF: {error.digest}]
        </span>
      )}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 type-label text-muted-foreground">
        <button
          type="button"
          onClick={() => reset()}
          className="transition-colors hover:text-foreground"
        >
          → Retry
        </button>
        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          → Back to cashu.me
        </Link>
      </div>
    </main>
  );
}
