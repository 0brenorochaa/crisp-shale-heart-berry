import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full min-w-0 rounded-md bg-surface px-3 text-base text-ink shadow-[var(--shadow-card)] outline-none transition-[box-shadow] duration-(--motion-quick) placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-primary/40 disabled:bg-surface-2 disabled:text-muted",
        className,
      )}
      {...props}
    />
  );
}
