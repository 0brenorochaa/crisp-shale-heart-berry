import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
  {
    variants: {
      tone: {
        achieved: "bg-success-soft text-success",
        progress: "bg-info-soft text-info",
        attention: "bg-warn-soft text-warn",
        impossible: "bg-danger-soft text-danger",
        excluded: "bg-surface-2 text-muted",
      },
    },
    defaultVariants: { tone: "progress" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
