"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useEffect,
  useEffectEvent,
  useId,
  useRef,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Visible caption; falls back to the alt text. */
  caption?: string;
};

type LightboxProps = {
  images: LightboxImage[];
  /** Index of the open image, or `null` when closed. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  /** Accessible name for the dialog, e.g. "Velnora screenshots". */
  label: string;
  /** Image quality; raise it for scans with small text. */
  quality?: 75 | 90;
};

const emptySubscribe = () => () => {};
const SWIPE_THRESHOLD = 50;

/**
 * Full-screen image viewer: Escape or the backdrop closes it, arrow keys and
 * swipes move between images, focus is trapped inside and handed back to the
 * element that opened it. It fades in and each image zooms in slightly with
 * CSS keyframes; reduced motion turns both off.
 */
export function Lightbox({
  images,
  index,
  onIndexChange,
  label,
  quality = 90,
}: LightboxProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const captionId = useId();
  const open = index !== null && images[index] !== undefined;
  const count = images.length;

  // Reads the latest index/handlers without re-subscribing on every change.
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const dialog = dialogRef.current;

    if (event.key === "Escape") {
      event.preventDefault();
      onIndexChange(null);
      return;
    }

    if (
      count > 1 &&
      (event.key === "ArrowRight" || event.key === "ArrowLeft")
    ) {
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      onIndexChange(((index ?? 0) + step + count) % count);
      return;
    }

    if (event.key !== "Tab" || !dialog) return;

    const items = Array.from(
      dialog.querySelectorAll<HTMLElement>("button:not([disabled])"),
    );
    if (items.length === 0) {
      event.preventDefault();
      return;
    }

    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  useEffect(() => {
    if (!open) return;

    const returnFocusTo = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusTo?.focus();
    };
  }, [open]);

  if (!isClient) return null;

  const image = open ? images[index] : undefined;
  const go = (step: number) =>
    onIndexChange(((index ?? 0) + step + count) % count);

  if (!image) return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-describedby={captionId}
      tabIndex={-1}
      className="fixed inset-0 z-[60] flex flex-col bg-black/85 outline-none backdrop-blur-sm motion-safe:animate-fade-in"
      onClick={(event) => {
        if (event.target === event.currentTarget) onIndexChange(null);
      }}
      onPointerDown={(event) => {
        swipeStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (swipeStart.current === null || count < 2) return;
        const delta = event.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-white/80 sm:px-6">
        <span aria-live="polite">
          {count > 1 && index !== null ? `${index + 1} / ${count}` : null}
        </span>
        <button
          type="button"
          onClick={() => onIndexChange(null)}
          className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close viewer"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
        onClick={(event) => {
          if (event.target === event.currentTarget) onIndexChange(null);
        }}
      >
        <div
          key={image.src}
          className="flex max-h-full max-w-full items-center justify-center motion-safe:animate-zoom-in"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            quality={quality}
            sizes="100vw"
            draggable={false}
            className="max-h-[calc(100dvh-9rem)] w-auto rounded-md object-contain shadow-2xl select-none"
          />
        </div>

        {count > 1 ? (
          <>
            <LightboxArrow direction="previous" onClick={() => go(-1)} />
            <LightboxArrow direction="next" onClick={() => go(1)} />
          </>
        ) : null}
      </div>

      <p
        id={captionId}
        className="mx-auto max-w-3xl px-4 py-4 text-center text-sm leading-relaxed text-white/80"
      >
        {image.caption ?? image.alt}
      </p>
    </div>,
    document.body,
  );
}

function LightboxArrow({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "previous" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",
        direction === "previous" ? "left-2 sm:left-5" : "right-2 sm:right-5",
      )}
    >
      <Icon className="size-6" aria-hidden />
    </button>
  );
}
