"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Container } from "@/components/layout/container";
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
  const navTrackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // Close the menu whenever the route changes.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Slide the active pill under the current link. Its position comes from
  // measuring the link, and only `translate`/`width` transition. Until the
  // first measurement the active link draws its own pill (server render, no
  // JavaScript), so nothing jumps on load.
  useLayoutEffect(() => {
    const track = navTrackRef.current;
    const pill = pillRef.current;
    if (!track || !pill) return;

    let frame = 0;
    const place = () => {
      const active = track.querySelector<HTMLElement>('a[aria-current="page"]');
      if (!active) {
        delete track.dataset.pill;
        return;
      }
      pill.style.width = `${active.offsetWidth}px`;
      pill.style.translate = `${active.offsetLeft}px 0`;
      if (!track.dataset.pill) {
        track.dataset.pill = "ready";
        // Enable the transition only after the first placement.
        frame = requestAnimationFrame(() => {
          track.dataset.pill = "animate";
        });
      }
    };

    place();
    const resize = new ResizeObserver(place);
    resize.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [pathname]);

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
          <div
            ref={navTrackRef}
            className="group/nav border-border/70 bg-muted/60 dark:bg-card/70 relative isolate rounded-full border p-1"
          >
            <span
              ref={pillRef}
              aria-hidden
              className={cn(
                "bg-card dark:bg-muted border-border/70 pointer-events-none absolute top-1 bottom-1 left-0 -z-10 rounded-full border opacity-0 shadow-sm",
                "group-data-pill/nav:opacity-100",
                "group-data-[pill=animate]/nav:ease-out-expo group-data-[pill=animate]/nav:transition-[translate,width] group-data-[pill=animate]/nav:duration-300",
              )}
            />
            <ul className="flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative block rounded-full border border-transparent px-3.5 py-1.5 text-sm transition-colors",
                        // Taller invisible hit area (44px) without a taller pill.
                        "before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-['']",
                        active
                          ? "text-foreground bg-card dark:bg-muted border-border/70 shadow-sm group-data-pill/nav:border-transparent group-data-pill/nav:bg-transparent group-data-pill/nav:shadow-none"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
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

      {/* Always rendered so it can fade and slide with CSS; `inert` and
          `invisible` keep it out of the tab order and accessibility tree
          while closed. */}
      <div
        ref={panelRef}
        id={menuId}
        inert={!open}
        className={cn(
          "bg-background ease-out-expo fixed inset-x-0 top-16 bottom-0 overflow-y-auto transition-[opacity,translate,visibility] md:hidden",
          open
            ? "visible translate-y-0 opacity-100 duration-300"
            : "invisible -translate-y-2 opacity-0 duration-200",
        )}
      >
        <Container className="flex min-h-full flex-col pt-6 pb-10">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li
                    key={item.href}
                    className={cn(
                      "border-border ease-out-expo border-b transition-[opacity,translate] duration-500",
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0",
                    )}
                    style={{
                      transitionDelay: open ? `${60 + index * 45}ms` : "0ms",
                    }}
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
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className={cn(
              "ease-out-expo mt-auto pt-10 transition-opacity duration-500",
              open ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: open ? "300ms" : "0ms" }}
          >
            <SocialLinks className="-ml-3" />
          </div>
        </Container>
      </div>
    </header>
  );
}
