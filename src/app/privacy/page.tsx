import { Subpage, SubpageSection } from "@/components/subpage";
import { CopyEmail } from "@/components/ui/copy-email";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy · zeile",
  description:
    "How zeile stores and handles notes, doodles, pairing data, and device information using Apple CloudKit.",
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
            Last updated: July 15, 2026
          </span>
        </p>
      }
    >
      <SubpageSection heading="The short version">
        <p>
          zeile has no accounts, advertising, analytics, or tracking. It uses
          Apple&apos;s CloudKit service to store the information needed to pair
          two people and deliver their notes and doodles. This data is stored
          in zeile&apos;s shared public CloudKit database and is not end-to-end
          encrypted.
        </p>
      </SubpageSection>

      <SubpageSection heading="Where your data is stored">
        <p>
          zeile uses Apple&apos;s CloudKit service. Notes, doodles, and pairing
          data are stored in zeile&apos;s shared CloudKit public database—not in
          either person&apos;s personal, private iCloud database. zeile does not
          operate its own servers.
        </p>
        <p>
          &ldquo;Public database&rdquo; is a technical CloudKit term. It does
          not mean zeile publishes your notes in a public feed, on a profile,
          or on a searchable webpage. It means the database is shared at the
          app level rather than giving every pair its own private database.
        </p>
      </SubpageSection>

      <SubpageSection heading="How pairs are separated">
        <p>
          Each note includes your pair code, which zeile uses to retrieve the
          right pair&apos;s notes. One person must approve the second person
          before the pair is connected, and the normal pairing flow locks
          after two people are connected.
        </p>
        <p>
          This separation happens in the application; it is not cryptographic
          access control. A pair code is not an encryption key, and notes are
          not end-to-end encrypted. A technically capable person with access
          to zeile&apos;s CloudKit interface could potentially access public
          database records outside the normal app experience.
        </p>
      </SubpageSection>

      <SubpageSection heading="What zeile stores">
        <p>
          To provide pairing, notifications, history, and the Home Screen
          widget, zeile may store:
        </p>
        <ul>
          <li>Your note text or doodle</li>
          <li>Your chosen display name</li>
          <li>The pair code associated with the note</li>
          <li>The note type and creation time</li>
          <li>
            Technical device identifiers used to distinguish the two paired
            devices
          </li>
          <li>Pairing and approval status</li>
        </ul>
        <p>
          zeile does not collect your email address, phone number, location,
          advertising identifier, or usage analytics.
        </p>
      </SubpageSection>

      <SubpageSection heading="Data stored on your device">
        <p>
          The latest received note may be cached locally in zeile&apos;s App
          Group storage so the Home Screen widget can display it without
          downloading it again. Unpairing clears the connection and widget
          data from that device.
        </p>
      </SubpageSection>

      <SubpageSection heading="Who can access the database">
        <p>
          Apple operates the CloudKit infrastructure. zeile&apos;s developer
          also has administrative access to the app&apos;s public CloudKit
          database and can inspect or delete records when necessary to
          operate, troubleshoot, secure, or maintain the service.
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

      <SubpageSection heading="How long notes are kept">
        <p>zeile applies two limits to note and doodle records:</p>
        <ul>
          <li>
            Notes become eligible for permanent deletion when they reach 90
            days old.
          </li>
          <li>
            If a pair has more than 100 notes, everything outside the newest
            100 becomes eligible for permanent deletion.
          </li>
        </ul>
        <p>
          An automated cleanup runs once per day and permanently deletes
          records that pass either limit. Deletion may therefore happen during
          the next daily cleanup rather than at the exact moment a note reaches
          a limit.
        </p>
        <p>
          These limits apply to notes and doodles. Pairing records—including
          pair codes, display names, device identifiers, and connection
          status—are stored separately and are not currently included in the
          automatic 90-day or 100-note cleanup.
        </p>
        <p>
          Unpairing does not immediately delete the pair&apos;s existing
          CloudKit records. Note and doodle records remain subject to the
          retention policy above.
        </p>
      </SubpageSection>

      <SubpageSection heading="Sensitive information">
        <p>
          Because zeile is not end-to-end encrypted storage, do not use it for
          passwords, financial information, medical information, private keys,
          or anything else that could cause harm if disclosed. Think of zeile
          like a postcard, not a vault.
        </p>
      </SubpageSection>

      <SubpageSection heading="Third-party services">
        <p>zeile relies on Apple services to work:</p>
        <ul>
          <li>
            <strong>App distribution:</strong> the Apple App Store for iOS
            distribution
          </li>
          <li>
            <strong>Storage and sync:</strong> Apple iCloud and CloudKit to
            store and deliver notes, doodles, and pairing data
          </li>
          <li>
            <strong>Notifications:</strong> the Apple Push Notification
            service to notify the paired device of a new note
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
