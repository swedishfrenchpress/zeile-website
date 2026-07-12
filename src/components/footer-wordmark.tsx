interface FooterWordmarkProps {
  text: string;
}

export function FooterWordmark({ text }: FooterWordmarkProps) {
  return (
    <div className="type-wordmark lowercase text-primary select-none">
      {text}
    </div>
  );
}
