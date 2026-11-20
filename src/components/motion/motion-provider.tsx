"use client";

import { domMax, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * App-wide Motion setup.
 *
 * - Components use the slim `m.*` renderer; `LazyMotion` supplies the feature
 *   set (`domMax`, which includes the layout animations behind the navbar's
 *   `layoutId` pill). The features are bundled synchronously on purpose: menus,
 *   dialogs and page transitions rely on enter/exit animations, and if those
 *   features were still downloading, a menu could open invisibly or get stuck
 *   waiting for its exit. Above-the-fold content animates with CSS instead, so
 *   it never waits for this bundle. `strict` throws if a full `motion.*`
 *   component sneaks back in.
 * - `reducedMotion="user"` keeps server and client markup identical and drops
 *   transform/layout animations (keeping opacity) for visitors who prefer
 *   reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
