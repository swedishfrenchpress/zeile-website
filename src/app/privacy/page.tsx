import { Subpage, SubpageSection } from "@/components/subpage";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy · zeile",
  description:
    "How zeile handles your information: no accounts, no analytics, no tracking — notes sync through Apple's iCloud to reach your one person.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Subpage
      title="Privacy policy"
      intro={
        <p>
          This Privacy Policy explains how zeile (&ldquo;we,&rdquo;
          &ldquo;our,&rdquo; or &ldquo;us&rdquo;) handles your information. We
          are committed to protecting your privacy and being transparent about
          our data practices.
          <span className="mt-3 block text-sm text-muted-foreground">
            Last updated: July 12, 2026
          </span>
        </p>
      }
    >
      <SubpageSection heading="Data collection">
        <p>
          zeile does not collect, store, or process any personal data on
          servers of our own — we don&apos;t run any. There are no accounts,
          no sign-ups, no analytics, and no tracking.
        </p>
      </SubpageSection>

      <SubpageSection heading="What we don't collect">
        <ul>
          <li>
            Personal information (name, email, phone number — there&apos;s no
            account to attach them to)
          </li>
          <li>Location data</li>
          <li>Usage analytics or tracking data</li>
          <li>Advertising identifiers</li>
          <li>Any data that could identify you personally</li>
        </ul>
      </SubpageSection>

      <SubpageSection heading="How the app works">
        <p>
          You pair with exactly one person using an 8-character code. The
          notes and doodles you send sync through Apple&apos;s iCloud
          (CloudKit) so they can reach your paired device, and they arrive
          with a push notification through Apple&apos;s notification service.
          All of this runs on Apple&apos;s infrastructure — we never see your
          notes on servers of our own, because we don&apos;t have any.
        </p>
        <p>
          One honest caveat: notes are protected by your pairing code and are
          <strong> not end-to-end encrypted</strong>. Think of zeile like a
          postcard, not a vault — please don&apos;t send anything sensitive.
        </p>
      </SubpageSection>

      <SubpageSection heading="Third-party services">
        <p>Our app relies on Apple services to work:</p>
        <ul>
          <li>
            <strong>App distribution:</strong> the Apple App Store for iOS
            distribution
          </li>
          <li>
            <strong>Sync &amp; notifications:</strong> Apple iCloud (CloudKit)
            and the Apple Push Notification service, used solely to deliver
            notes between your two paired devices
          </li>
        </ul>
        <p>
          These services have their own privacy policies, and we encourage you
          to review them. We do not share any user data with anyone else.
        </p>
      </SubpageSection>

      <SubpageSection heading="Your rights (EU GDPR)">
        <p>
          Under the General Data Protection Regulation (GDPR), you have the
          following rights:
        </p>
        <ul>
          <li>
            <strong>Right to be informed:</strong> you have the right to know
            how your data is processed
          </li>
          <li>
            <strong>Right of access:</strong> you can request information
            about any data we hold about you
          </li>
          <li>
            <strong>Right to rectification:</strong> you can request
            correction of any inaccurate data
          </li>
          <li>
            <strong>Right to erasure:</strong> you can request deletion of any
            data we hold about you
          </li>
          <li>
            <strong>Right to restrict processing:</strong> you can request
            limitation of data processing
          </li>
          <li>
            <strong>Right to data portability:</strong> you can request your
            data in a portable format
          </li>
          <li>
            <strong>Right to object:</strong> you can object to data
            processing
          </li>
        </ul>
        <p>
          Since we don&apos;t collect any personal data beyond the notes you
          choose to send to your person, these rights are largely not
          applicable — but we&apos;re happy to confirm this in writing if
          requested.
        </p>
      </SubpageSection>

      <SubpageSection heading="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify
          users of any material changes by updating the &ldquo;Last
          updated&rdquo; date at the top of this policy. We encourage you to
          review this policy periodically.
        </p>
      </SubpageSection>

      <SubpageSection heading="Legal basis">
        <p>
          We don&apos;t process personal data on our own behalf; the notes you
          send exist solely so they can be delivered to your paired device.
          We maintain this privacy policy to be transparent about our
          practices and to comply with best practices for mobile applications.
        </p>
      </SubpageSection>

      <SubpageSection heading="Questions?">
        <p>
          Write to us any time —{" "}
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="text-primary underline underline-offset-4"
          >
            {siteConfig.links.email}
          </a>{" "}
          or via the{" "}
          <Link
            href="/contact"
            className="text-primary underline underline-offset-4"
          >
            contact page
          </Link>
          .
        </p>
      </SubpageSection>
    </Subpage>
  );
}
