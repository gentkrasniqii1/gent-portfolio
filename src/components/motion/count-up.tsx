"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type CountUpProps = {
  value: number;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 *
 * The server renders the final number, so crawlers, no-JS visitors and
 * reduced-motion users always see the real value. The animated digits are
 * hidden from assistive tech; a visually hidden copy carries the final value.
 * The digits are written straight to the text node, so the count never
 * re-renders React.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1.4,
  className,
}: CountUpProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const textNode = digitsRef.current?.firstChild;
    if (!textNode) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!inView) {
      textNode.nodeValue = "0";
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        textNode.nodeValue = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={rootRef} className={cn("tabular-nums", className)}>
      <span
        ref={digitsRef}
        aria-hidden="true"
        className="inline-block"
        style={{ minWidth: `${String(value).length}ch` }}
      >
        {value}
      </span>
      {suffix ? <span aria-hidden="true">{suffix}</span> : null}
      <span className="sr-only">{`${value}${suffix}`}</span>
    </span>
  );
}
