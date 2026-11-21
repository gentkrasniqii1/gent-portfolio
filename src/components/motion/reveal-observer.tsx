"use client";

import { useEffect } from "react";

const PENDING =
  "[data-reveal]:not([data-revealed]), [data-reveal-group]:not([data-revealed])";

/**
 * The only JavaScript behind scroll reveals: one IntersectionObserver for the
 * whole app. It marks `data-reveal` elements and `data-reveal-group`
 * containers with `data-revealed` as they scroll into view; CSS does the
 * rest. A MutationObserver picks up content added later (client navigations,
 * filters, dialogs).
 */
export function RevealObserver() {
  useEffect(() => {
    const revealAll = () =>
      document
        .querySelectorAll(PENDING)
        .forEach((element) => element.setAttribute("data-revealed", ""));

    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      // Start once the top edge is 10% above the bottom of the viewport.
      { rootMargin: "0px 0px -10% 0px" },
    );

    const observePending = () =>
      document
        .querySelectorAll(PENDING)
        .forEach((element) => observer.observe(element));

    observePending();

    let frame = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(observePending);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
