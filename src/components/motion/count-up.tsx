"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type CountUpProps = {
  value: number;
  suffix?: string;
  /** Milliseconds. */
  duration?: number;
  className?: string;
};

/** Ease-out (expo-like), matching the site's other entrances. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts from 0 to `value` the first time it is half in view.
 *
 * The server renders the final number, so crawlers, no-JS visitors and
 * reduced-motion users always see the real value. The animated digits are
 * hidden from assistive tech; a visually hidden copy carries the final value.
 * The digits are written straight to the text node from a small
 * requestAnimationFrame loop, so the count never re-renders React.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1400,
  className,
}: CountUpProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const textNode = digitsRef.current?.firstChild;
    if (!root || !textNode) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let frame = 0;
    textNode.nodeValue = "0";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          textNode.nodeValue = String(Math.round(easeOut(progress) * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      textNode.nodeValue = String(value);
    };
  }, [value, duration]);

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
