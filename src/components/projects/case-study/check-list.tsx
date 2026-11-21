import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="text-foreground/85 flex gap-3 text-base leading-relaxed"
        >
          <CircleCheck
            className="text-accent mt-1 size-4.5 shrink-0"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
