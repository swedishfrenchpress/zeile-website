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
        <h2 className="mb-10 type-display-2 text-foreground">FAQs</h2>
        {siteConfig.faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            question={faq.question}
            defaultOpen={index === 0}
          >
            {faq.answer}
          </AccordionItem>
        ))}
      </div>
    </Section>
  );
}
