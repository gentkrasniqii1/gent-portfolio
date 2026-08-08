import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  action?: ReactNode;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
  align = "left",
  as: Heading = "h2",
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "mx-auto max-w-2xl items-center text-center",
        align === "left" && "max-w-2xl",
        className,
      )}
    >
      <div
        className={cn(
          align === "left" &&
            action &&
            "flex flex-wrap items-end justify-between gap-4",
        )}
      >
        <div className="space-y-3">
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <Heading id={id} className="text-3xl text-foreground sm:text-4xl">
            {title}
          </Heading>
          {description ? (
            <p className="text-muted-foreground text-base leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
        {action}
      </div>
    </div>
  );
}
