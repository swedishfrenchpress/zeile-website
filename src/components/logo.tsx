import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/images/cashu-logo.png"
      alt="cashu.me"
      width={64}
      height={64}
      unoptimized
      className={cn(
        "size-8 select-none rounded-none object-cover",
        "[image-rendering:pixelated]",
        className
      )}
      draggable={false}
    />
  );
}
