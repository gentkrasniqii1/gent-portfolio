"use client";

import { AnimatePresence, type Variants } from "motion/react";
import * as m from "motion/react-m";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Container } from "@/components/layout/container";
import { EASE_OUT } from "@/components/motion/config";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { SocialLinks } from "@/components/shared/social-links";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* Scroll state as an external store: React only re-renders when the boolean
 * flips, not on every scroll event. */
const SCROLL_THRESHOLD = 8;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const getServerScrolled = () => false;

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: EASE_OUT,
      staggerChildren: 0.045,
      delayChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: EASE_OUT } },
};

const panelItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
};

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolled,
    getServerScrolled,
  );
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the route changes.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const menuButton = menuButtonRef.current;
    // The trap includes the menu button, so the menu can be closed by keyboard
    // without leaving it.
    const getFocusable = () => {
      const links = panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];
      return menuButton ? [menuButton, ...links] : links;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButton?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const elevated = scrolled || open;

  return (
    <header
      data-elevated={elevated ? "true" : undefined}
      data-open={open ? "true" : undefined}
      className="group/header sticky top-0 z-40 print:hidden"
    >
      {/* Frosted bar that fades in once the page scrolls (opacity only). */}
      <div
        aria-hidden
        className={cn(
          "border-border/70 pointer-events-none absolute inset-0 -z-10 border-b opacity-0 shadow-[0_8px_24px_-16px_rgb(0_0_0/0.25)] backdrop-blur-md transition-opacity duration-300",
          "bg-background/85 supports-backdrop-filter:bg-background/70",
          "group-data-[elevated=true]/header:opacity-100 group-data-[open=true]/header:bg-background",
        )}
      />

      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-foreground hover:text-primary inline-flex min-h-11 max-w-[60%] items-center truncate text-lg tracking-tight transition-colors sm:max-w-none"
        >
          {SITE_NAME}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="border-border/70 bg-muted/60 dark:bg-card/70 flex items-center gap-0.5 rounded-full border p-1">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative isolate block rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      // Taller invisible hit area (44px) without a taller pill.
                      "before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-['']",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {active ? (
                      <m.span
                        layoutId="nav-active-pill"
                        aria-hidden
                        className="bg-card dark:bg-muted border-border/70 absolute inset-0 -z-10 rounded-full border shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    ) : null}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="border-border hover:bg-muted relative inline-flex size-11 items-center justify-center rounded-full border transition-colors md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <Menu
              aria-hidden
              className={cn(
                "absolute size-5 transition-[opacity,rotate,scale] duration-200",
                open && "scale-50 rotate-90 opacity-0",
              )}
            />
            <X
              aria-hidden
              className={cn(
                "absolute size-5 transition-[opacity,rotate,scale] duration-200",
                !open && "scale-50 -rotate-90 opacity-0",
              )}
            />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <m.div
            ref={panelRef}
            id={menuId}
            key="mobile-menu"
            className="bg-background fixed inset-x-0 top-16 bottom-0 overflow-y-auto md:hidden"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <Container className="flex min-h-full flex-col pt-6 pb-10">
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    const active = isActivePath(pathname, item.href);
                    return (
                      <m.li
                        key={item.href}
                        variants={panelItemVariants}
                        className="border-border border-b"
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "font-display flex min-h-16 items-center justify-between gap-4 py-3 text-3xl tracking-tight transition-colors",
                            active
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                          {active ? (
                            <span
                              aria-hidden
                              className="bg-accent size-2 rounded-full"
                            />
                          ) : null}
                        </Link>
                      </m.li>
                    );
                  })}
                </ul>
              </nav>

              <m.div variants={panelItemVariants} className="mt-auto pt-10">
                <SocialLinks className="-ml-3" />
              </m.div>
            </Container>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
