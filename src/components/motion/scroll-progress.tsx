"use client";

import { useEffect, useRef } from "react";

/**
 * Thin accent bar along the top of the viewport that fills as the page is
 * read. Where CSS scroll timelines are supported the bar is animated by the
 * browser from the scroll position (see `scroll-progress` in globals.css);
 * elsewhere a passive, frame-throttled scroll listener sets its scale.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || CSS.supports("animation-timeline: scroll()")) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.scale = `${progress} 1`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="scroll-progress bg-accent pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 print:hidden"
    />
  );
}
