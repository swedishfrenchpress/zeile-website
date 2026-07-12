import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/images/zeile-icon.png"
      alt="zeile"
      width={64}
      height={64}
      className={cn("size-8 select-none rounded-[22%]", className)}
      draggable={false}
    />
  );
}
