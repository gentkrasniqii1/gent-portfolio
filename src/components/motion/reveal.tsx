import type { CSSProperties, ReactNode } from "react";

type RevealTag = "div" | "section" | "li" | "article";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Milliseconds to wait after the element scrolls into view. */
  delay?: number;
  as?: RevealTag;
  id?: string;
  "aria-labelledby"?: string;
};

/**
 * Fades and lifts content in the first time it scrolls into view.
 *
 * Pure markup: the transition lives in globals.css and `RevealObserver`
 * flips `data-revealed`, so this ships no JavaScript of its own. Use it for
 * content below the fold; above-the-fold content should use `FadeIn`, which
 * plays without waiting for any script.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  id,
  "aria-labelledby": ariaLabelledBy,
}: RevealProps) {
  return (
    <Tag
      data-reveal=""
      id={id}
      className={className}
      aria-labelledby={ariaLabelledBy}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
