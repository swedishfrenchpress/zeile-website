import * as React from "react";

import { cn } from "@/lib/utils";

interface AccordionItemProps extends React.HTMLAttributes<HTMLDetailsElement> {
  question: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function AccordionItem({
  question,
  defaultOpen,
  className,
  children,
  ...props
}: AccordionItemProps) {
  return (
    <details
      {...props}
      open={defaultOpen}
      className={cn("accordion-item group border-b border-border", className)}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-6 py-6 type-subhead text-foreground transition-colors hover:text-foreground/80",
          "[&::-webkit-details-marker]:hidden"
        )}
      >
        {question}
        <span
          aria-hidden
          className="relative inline-block h-4 w-4 shrink-0 text-muted-foreground"
        >
          <span className="absolute inset-0 flex items-center justify-center font-mono text-base leading-none opacity-100 transition-opacity duration-200 group-open:opacity-0">
            +
          </span>
          <span className="absolute inset-0 flex items-center justify-center font-mono text-base leading-none opacity-0 transition-opacity duration-200 group-open:opacity-100">
            −
          </span>
        </span>
      </summary>
      <div className="max-w-[60ch] pb-6 type-body-lg text-foreground/70">
        {children}
      </div>
    </details>
  );
}
