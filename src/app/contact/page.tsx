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
    </Subpage>
  );
}
