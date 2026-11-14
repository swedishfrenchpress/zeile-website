import { Subpage, SubpageSection } from "@/components/subpage";
import { CopyEmail } from "@/components/ui/copy-email";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy · zeile",
  description:
    "How zeile encrypts drawings and handles pairing data and device information using Apple CloudKit.",
  alternates: { canonical: "/privacy" },
};

const externalLinkClass = "text-primary underline underline-offset-4";

export default function PrivacyPage() {
  return (
    <Subpage
      title="Privacy policy"
      intro={
        <p>
          This Privacy Policy explains how zeile (&ldquo;we,&rdquo;
          &ldquo;our,&rdquo; or &ldquo;us&rdquo;) stores and handles your
          information when you use the app.
          <span className="mt-3 block text-sm text-muted-foreground">
            Last updated: November 14, 2026
          </span>
        </p>
      }
    >
      <SubpageSection heading="The short version">
        <p>
          zeile has no accounts, advertising, analytics, or tracking. It uses
          Apple&apos;s CloudKit service to pair two people and deliver their
          drawings. Drawings are end-to-end encrypted: they are encrypted on
          the sender&apos;s device and can only be opened on the two paired
          devices. The details iCloud needs to deliver them, such as display
          names, send times, and the pair code, are not encrypted.
        </p>
      </SubpageSection>

      <SubpageSection heading="Where your data is stored">
        <p>
          zeile uses Apple&apos;s CloudKit service. Drawings and pairing data
          are stored in zeile&apos;s shared CloudKit public database, not in
          either person&apos;s personal, private iCloud database. zeile does
          not operate its own servers.
        </p>
        <p>
          &ldquo;Public database&rdquo; is a technical CloudKit term. It does
          not mean zeile publishes your drawings in a public feed, on a
          profile, or on a searchable webpage. It means the database is shared
          at the app level rather than giving every pair its own private
          database.
        </p>
      </SubpageSection>

      <SubpageSection heading="How drawings are protected">
        <p>
          When two people pair, each device creates its own encryption key and
          shares only the public half as part of pairing. Every drawing is
          encrypted on the sender&apos;s device before it is uploaded, and only
          the two paired devices can decrypt it. Apple and zeile&apos;s
          developer can see that an encrypted drawing exists, but cannot open
          it.
        </p>
        <p>
          One person must approve the second person before the pair is
          connected, and the pair then locks to those two devices. zeile also
          offers an optional 12-digit safety code. Compare it in person or on a
          call to check that nobody came between you while you paired.
        </p>
        <p>
          There is no key backup or recovery. If the keys on your devices are
          lost, drawings encrypted with them cannot be recovered by anyone,
          including us. Pairing again protects new drawings from then on.
        </p>
      </SubpageSection>

      <SubpageSection heading="What zeile stores">
        <p>
          To provide pairing, notifications, history, and the Home Screen
          widget, zeile may store:
        </p>
        <ul>
          <li>Your drawings, encrypted</li>
          <li>Your chosen display name</li>
          <li>The pair code associated with each drawing</li>
          <li>The time each drawing was sent</li>
          <li>
            Technical device identifiers and public encryption keys used to
            distinguish the two paired devices
          </li>
          <li>Pairing and approval status</li>
        </ul>
        <p>
          Everything on this list except the drawings themselves is stored
          without end-to-end encryption, because iCloud uses it to deliver each
          drawing to the right device.
        </p>
        <p>
          zeile does not collect your email address, phone number, location,
          advertising identifier, or usage analytics.
        </p>
      </SubpageSection>

      <SubpageSection heading="Data stored on your device">
        <p>
          The latest received drawing is kept on your device, encrypted with a
          key that never leaves it, so the Home Screen widget can show it
          without downloading it again. Unpairing clears the connection and
          widget data from that device.
        </p>
      </SubpageSection>

      <SubpageSection heading="Who can access the database">
        <p>
          Apple operates the CloudKit infrastructure. zeile&apos;s developer
          also has administrative access to the app&apos;s public CloudKit
          database and can inspect or delete records when necessary to
          operate, troubleshoot, secure, or maintain the service. That access
          covers the unencrypted details listed above and the encrypted
          drawings, which the developer cannot open.
        </p>
        <p>
          Apple explains its public database model in the documentation for the{" "}
          <Link
            href="https://developer.apple.com/documentation/cloudkit/ckcontainer/publicclouddatabase"
            className={externalLinkClass}
          >
            public CloudKit database
          </Link>{" "}
          and its guide to{" "}
          <Link
            href="https://developer.apple.com/documentation/cloudkit/handling-an-icloud-container-s-data"
            className={externalLinkClass}
          >
            CloudKit data management
          </Link>
          .
        </p>
      </SubpageSection>

      <SubpageSection heading="How long drawings are kept">
        <p>zeile applies two limits to drawings:</p>
        <ul>
          <li>
            Drawings become eligible for permanent deletion when they reach 90
            days old.
          </li>
          <li>
            If a pair has more than 100 drawings, everything outside the newest
            100 becomes eligible for permanent deletion.
          </li>
        </ul>
        <p>
          An automated cleanup runs once per day and permanently deletes
          records that pass either limit. Deletion may therefore happen during
          the next daily cleanup rather than at the exact moment a drawing
          reaches a limit.
        </p>
        <p>
          These limits apply to drawings. Pairing records, including pair
          codes, display names, device identifiers, and connection status, are
          stored separately and are not currently included in the automatic
          90-day or 100-drawing cleanup.
        </p>
        <p>
          Unpairing does not immediately delete the pair&apos;s existing
          CloudKit records. Drawings remain subject to the retention policy
          above.
        </p>
      </SubpageSection>

      <SubpageSection heading="Sensitive information">
        <p>
          Drawings are end-to-end encrypted, but zeile is still not the place
          for passwords, financial or medical information, private keys, or
          anything else that could cause harm if disclosed. The latest drawing
          also appears on a Home Screen widget, where anyone looking at the
          phone can see it.
        </p>
      </SubpageSection>

      <SubpageSection heading="Third-party services">
        <p>zeile relies on Apple services to work:</p>
        <ul>
          <li>
            <strong>App distribution:</strong> the Apple App Store for iOS and
            iPadOS distribution
          </li>
          <li>
            <strong>Storage and sync:</strong> Apple iCloud and CloudKit to
            store and deliver encrypted drawings and pairing data
          </li>
          <li>
            <strong>Notifications:</strong> the Apple Push Notification
            service to notify the paired device of a new drawing
          </li>
        </ul>
        <p>
          Apple handles information under its own privacy policies. zeile does
          not sell your data or share it with advertisers or data brokers.
        </p>
      </SubpageSection>

      <SubpageSection heading="Your choices and rights">
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, restrict, or receive a copy of personal data associated with
          you, and to object to certain processing. You may also have the right
          to complain to your local data protection authority.
        </p>
        <p>
          Because zeile has no user accounts, our ability to identify records
          as yours may be limited. Contact us if you want to make a request or
          have a question about your data.
        </p>
      </SubpageSection>

      <SubpageSection heading="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. We will show
          material changes by updating the &ldquo;Last updated&rdquo; date at
          the top of this policy. We encourage you to review it periodically.
        </p>
      </SubpageSection>

      <SubpageSection heading="Questions?">
        <p>
          Write to us any time:{" "}
          <CopyEmail
            email={siteConfig.links.email}
            className="text-primary underline underline-offset-4"
          />{" "}
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
