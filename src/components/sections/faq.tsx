import { Section } from "@/components/section";
import { AccordionItem } from "@/components/ui/accordion";
import { siteConfig } from "@/lib/config";

export function FAQ() {
  return (
    <Section
      id="faq"
      variant="editorial"
      hideHeader
      className="container-page px-6 py-[var(--section-y-tight)] lg:px-10"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 type-display-2 text-foreground">
          Questions, answered.
        </h2>
        <div className="flex flex-col gap-3">
          {siteConfig.faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              question={faq.question}
              className="note-surface border-b-0 px-6"
            >
              {faq.answer}
            </AccordionItem>
          ))}
        </div>
      </div>
    </Section>
  );
}
