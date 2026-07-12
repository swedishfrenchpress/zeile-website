import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Page not found · zeile",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center lg:px-10">
      <span aria-hidden className="type-label text-muted-foreground">
        [404]
      </span>
      <h1 className="mt-6 type-display-2 text-foreground">
        This note wandered off.
      </h1>
      <p className="mt-6 max-w-[46ch] type-lead text-foreground/75">
        The page you asked for isn&apos;t here. The app and its source still
        are, at the addresses below.
      </p>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 type-label text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-primary">
          → back to zeile
        </Link>
        <a
          href={siteConfig.links.appRepo}
          target="_blank"
          rel="noreferrer noopener"
          className="transition-colors hover:text-primary"
        >
          → view source on GitHub
        </a>
      </div>
    </main>
  );
}
