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
        {/* a pen-drawn plus; its upright stroke folds away into a minus */}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="size-4 shrink-0 text-muted-foreground"
        >
          <path d="M2.6 8.3 C6 7.8 10 8.1 13.5 7.8" />
          <path
            d="M8.1 2.6 C7.8 6.1 8.1 9.9 8.2 13.4"
            className="origin-center transition-[opacity,transform] duration-200 ease-out group-open:rotate-90 group-open:opacity-0 motion-reduce:transition-none"
          />
        </svg>
      </summary>
      <div className="max-w-[48ch] pb-6 type-body-lg text-foreground/70">
        {children}
      </div>
    </details>
  );
}
