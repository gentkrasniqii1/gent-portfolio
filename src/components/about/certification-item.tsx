"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import type { Certification } from "@/types/certification";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

type CertificationItemProps = {
  certification: Certification;
  dateLabel: string;
};

export function CertificationItem({
  certification,
  dateLabel,
}: CertificationItemProps) {
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const alt = `${certification.name} certificate from ${certification.issuer}`;

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const getFocusable = () =>
      dialog
        ? Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    const focusables = getFocusable();
    (focusables[0] ?? dialog)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
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
      queueMicrotask(() => trigger?.focus());
    };
  }, [open]);

  return (
    <li className="relative pb-10 last:pb-0">
      <span
        className="border-background bg-accent absolute top-1.5 -left-[1.625rem] size-2.5 rounded-full border-2"
        aria-hidden
      />
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {dateLabel}
      </p>
      <h3 className="text-foreground mt-2 text-xl">{certification.name}</h3>
      <p className="text-muted-foreground mt-1 text-sm">
        {certification.issuer}
        {certification.credentialId
          ? ` · ID ${certification.credentialId}`
          : null}
      </p>

      {certification.image ? (
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            "border-border bg-muted group mt-4 block w-full max-w-xs overflow-hidden rounded-lg border text-left",
            "motion-safe:transition-shadow motion-safe:hover:shadow-md",
            "focus-visible:ring-ring outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={`View full size: ${alt}`}
          onClick={() => setOpen(true)}
        >
          <span className="relative block aspect-[16/10] overflow-hidden">
            <Image
              src={certification.image}
              alt={alt}
              fill
              className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 80vw, 320px"
              quality={80}
            />
          </span>
        </button>
      ) : null}

      {certification.credentialUrl ? (
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-medium transition-colors"
        >
          View credential
          <ArrowUpRight className="size-3.5" aria-hidden />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}

      {isClient
        ? createPortal(
            <AnimatePresence>
              {open && certification.image ? (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                  onClick={(event) => {
                    if (event.target === event.currentTarget) {
                      setOpen(false);
                    }
                  }}
                  role="presentation"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                >
                  <motion.div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    tabIndex={-1}
                    className="border-border bg-background relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg border shadow-md outline-none"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      reduceMotion ? undefined : { opacity: 0, scale: 0.98 }
                    }
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  >
                    <div className="border-border flex items-start justify-between gap-4 border-b p-4">
                      <h4
                        id={titleId}
                        className="text-foreground pr-10 text-base font-medium leading-snug"
                      >
                        {certification.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="border-border hover:bg-muted absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-md border transition-colors"
                        aria-label="Close certificate preview"
                      >
                        <X className="size-5" aria-hidden />
                      </button>
                    </div>
                    <div className="bg-muted relative aspect-[16/10] w-full sm:aspect-[3/2]">
                      <Image
                        src={certification.image}
                        alt={alt}
                        fill
                        className="object-contain p-2 sm:p-4"
                        sizes="(max-width: 896px) 100vw, 896px"
                        quality={90}
                        priority
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </li>
  );
}
