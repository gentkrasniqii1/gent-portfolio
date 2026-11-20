"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * Both icons are always rendered and the visible one is picked by the `.dark`
 * class that next-themes sets before first paint, so the correct icon shows
 * immediately (no placeholder, no flash). After a click the icons swap with a
 * keyframe animation; keyframes are used instead of transitions because
 * next-themes suspends all transitions while it switches the theme.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  const [hasToggled, setHasToggled] = useState(false);
  const isDark = isClient && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => {
        if (!isClient) return;
        setHasToggled(true);
        setTheme(isDark ? "light" : "dark");
      }}
      className="border-border bg-background text-foreground hover:bg-muted relative inline-flex size-11 items-center justify-center rounded-full border transition-colors"
      aria-label="Dark mode"
      aria-pressed={isClient ? isDark : undefined}
    >
      <Sun
        aria-hidden
        className={cn(
          "absolute size-5 scale-50 rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100",
          hasToggled &&
            "motion-safe:animate-icon-out motion-safe:dark:animate-icon-in",
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute size-5 dark:scale-50 dark:rotate-90 dark:opacity-0",
          hasToggled &&
            "motion-safe:animate-icon-in motion-safe:dark:animate-icon-out",
        )}
      />
    </button>
  );
}
