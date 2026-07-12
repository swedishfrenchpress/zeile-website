import { FooterWordmark } from "@/components/footer-wordmark";
import { CloudField } from "@/components/sky/cloud-field";
import { SECTION_CLOUDS } from "@/lib/clouds";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60">
      <CloudField section={SECTION_CLOUDS.footer} />
      <div className="container-page relative z-10 flex flex-col px-6 pt-[var(--section-y-tight)] pb-10 lg:px-10">
        {/* Utility columns. md collapse: multi-item grids (bento, this) break at md;
            two-panel text+media sections break at lg. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {siteConfig.footer.columns.map((col) => (
            <div key={col.label} className="flex flex-col gap-4">
              <span className="type-label text-muted-foreground">
                {col.label}
              </span>
              <ul className="flex flex-col gap-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="-mx-1 inline-block px-1 py-1.5 text-base text-foreground/85 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The brand sign-off */}
        <div className="flex flex-col gap-2 py-12 md:py-20">
          <p className="type-subhead text-muted-foreground">
            {siteConfig.footer.tagline}
          </p>
          <FooterWordmark text={siteConfig.name} />
        </div>

        {/* Bottom row — copyright */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-end">
          <div className="type-label text-muted-foreground sm:text-right">
            <span>
              {siteConfig.footer.copyright} · {siteConfig.footer.attribution}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
