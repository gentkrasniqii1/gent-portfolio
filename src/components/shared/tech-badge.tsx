import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TechBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "bg-secondary text-secondary-foreground inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}
