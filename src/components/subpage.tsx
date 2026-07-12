import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import type { ReactNode } from "react";

interface SubpageProps {
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}

/** Shared shell for the quiet pages (privacy, contact): site header, a
 *  rose-ambient masthead, a narrow prose column, site footer. */
export function Subpage({ title, intro, children }: SubpageProps) {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-96"
          style={{
            background:
              "radial-gradient(64% 60% at 50% 0%, var(--rose-wash), transparent 72%)",
          }}
        />
        <div className="container-page relative z-10 px-6 pb-[var(--section-y-base)] pt-[var(--section-y-tight)] lg:px-10">
          <div className="mx-auto max-w-2xl">
            <h1 className="type-display-2 text-foreground">{title}</h1>
            {intro && (
              <div className="mt-6 type-lead text-foreground/75">{intro}</div>
            )}
            <div className="mt-12 flex flex-col gap-10">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function SubpageSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="type-subhead text-foreground">{heading}</h2>
      <div className="flex flex-col gap-3 type-body-lg text-foreground/75 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
