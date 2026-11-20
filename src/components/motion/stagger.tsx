import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

/** Stagger stops growing after this many items, so long lists stay snappy. */
const MAX_STAGGERED = 8;

type StaggerChildrenProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  /** Milliseconds between each child starting. */
  stagger?: number;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  /** Set by `StaggerChildren`. */
  index?: number;
  /** Set by `StaggerChildren`. */
  stagger?: number;
};

/**
 * Reveals its `StaggerItem` children one after another the first time the
 * group scrolls into view. Markup only, like `Reveal`: the group gets
 * `data-revealed` from `RevealObserver` and each item waits its turn via
 * `--reveal-delay`.
 */
export function StaggerChildren({
  children,
  className,
  as: Tag = "div",
  stagger = 70,
}: StaggerChildrenProps) {
  let index = 0;
  const items = Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<StaggerItemProps>, {
          index: index++,
          stagger,
        })
      : child,
  );

  return (
    <Tag data-reveal-group="" className={className}>
      {items}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
  index = 0,
  stagger = 70,
}: StaggerItemProps) {
  const delay = Math.min(index, MAX_STAGGERED) * stagger;

  return (
    <Tag
      data-reveal-item=""
      className={className}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
