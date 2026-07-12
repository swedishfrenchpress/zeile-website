import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Page not found · cashu.me",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center lg:px-10">
      <span aria-hidden className="type-label text-muted-foreground">
        [404]
      </span>
      <h1 className="mt-6 type-display-2 text-foreground">
        Page not found.
      </h1>
      <p className="mt-6 max-w-[50ch] type-lead text-foreground/75">
        The page you asked for doesn't exist on this site. The wallet, the spec,
        and everything else still lives at the addresses below.
      </p>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 type-label text-muted-foreground">
        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          → Back to cashu.me
        </Link>
        <a
          href={siteConfig.links.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="transition-colors hover:text-foreground"
        >
          → View source on GitHub
        </a>
      </div>
    </main>
  );
}
