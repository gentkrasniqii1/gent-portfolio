"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const getFocusable = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    const focusables = getFocusable();
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        queueMicrotask(() => menuButtonRef.current?.focus());
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

  return (
    <header className="border-border/80 bg-background/85 supports-backdrop-filter:bg-background/70 sticky top-0 z-40 border-b backdrop-blur-md print:hidden">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-foreground hover:text-primary max-w-[60%] truncate text-lg tracking-tight transition-colors sm:max-w-none"
        >
          {SITE_NAME}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="border-border hover:bg-muted inline-flex size-11 items-center justify-center rounded-md border md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-haspopup="true"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            ref={panelRef}
            id={menuId}
            className="border-border bg-background overflow-hidden border-t md:hidden"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Container
              as="nav"
              aria-label="Mobile"
              className="flex flex-col py-3"
            >
              {NAV_ITEMS.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "min-h-11 rounded-md px-3 py-3 text-base transition-colors",
                      active
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/80",
                    )}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
