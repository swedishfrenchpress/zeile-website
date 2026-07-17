import Link from "next/link";
import { Drawing } from "@/components/mockups/drawings";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Page not found · zeile",
};

export default function NotFound() {
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

      {/* the missing page, as a little doodle card someone left behind */}
      <div className="relative flex size-44 -rotate-2 items-center justify-center rounded-note border border-rose-hairline bg-canvas-white p-5 shadow-[var(--paper-shadow)]">
        <Drawing name="cat" className="h-full w-full" />
      </div>

      <span className="mt-8 type-label text-muted-foreground">404</span>
      <h1 className="mt-3 type-display-2 text-foreground">
        This page wandered off.
      </h1>
      <p className="mt-5 max-w-[44ch] type-lead text-foreground/75">
        Maybe the cat knocked it over. Everything else is right where it
        should be.
      </p>

      <div className="mt-10">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
        >
          back to zeile
        </Link>
      </div>
    </main>
  );
}
