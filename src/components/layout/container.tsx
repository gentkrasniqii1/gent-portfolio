import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerTag = "div" | "section" | "article" | "main" | "nav";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ContainerTag;
} & Omit<HTMLAttributes<HTMLElement>, "className">;

export function Container({
  children,
  className,
  as: Comp = "div",
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        "mx-auto w-full max-w-5xl px-gutter lg:px-gutter-lg",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
