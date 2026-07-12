interface FooterWordmarkProps {
  text: string;
}

export function FooterWordmark({ text }: FooterWordmarkProps) {
  return (
    <div className="type-wordmark uppercase text-foreground select-none">
      {text}
    </div>
  );
}
