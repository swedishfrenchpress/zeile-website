import { Subpage, SubpageSection } from "@/components/subpage";
import { CopyEmail } from "@/components/ui/copy-email";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact · zeile",
  description:
    "Questions, bugs, or just saying hi: how to reach the person behind zeile.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Subpage
      title="Get in touch"
      intro={
        <p>
          Have a question, found a bug, or just want to say hi? I&apos;d love
          to hear from you.
        </p>
      }
    >
      <SubpageSection heading="Say hi">
        <p>
          Reach me directly at{" "}
          <CopyEmail
            email={siteConfig.links.email}
            className="text-primary underline underline-offset-4"
          />{" "}
          and I&apos;ll get back to you.
        </p>
      </SubpageSection>

      <SubpageSection heading="Open source">
        <p>
          zeile is free and open source. Curious how it works, or want to
          build something of your own? Dive into the code, open an issue, or
          fork it and make it your own.
        </p>
        <p>
          <a
            href={siteConfig.links.appRepo}
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary underline underline-offset-4"
          >
            View the source on GitHub
          </a>
        </p>
      </SubpageSection>
    </Subpage>
  );
}
