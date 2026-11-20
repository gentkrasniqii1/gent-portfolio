"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/shared/lightbox";
import { cn } from "@/lib/utils";
import type { ProjectScreenshot } from "@/types/project";

type ScreenshotGalleryProps = {
  title: string;
  shots: ProjectScreenshot[];
};

/**
 * Desktop shots in a two-column grid, mobile shots in narrower columns below;
 * any shot opens the shared lightbox, which can step through all of them.
 */
export function ScreenshotGallery({ title, shots }: ScreenshotGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const indexed = shots.map((shot, index) => ({ shot, index }));
  const desktop = indexed.filter(({ shot }) => shot.device === "desktop");
  const mobile = indexed.filter(({ shot }) => shot.device === "mobile");

  return (
    <>
      <div className="space-y-8">
        {desktop.length > 0 ? (
          <ShotGroup label="Desktop" show={mobile.length > 0}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {desktop.map(({ shot, index }) => (
                <li key={shot.src}>
                  <ShotButton
                    shot={shot}
                    onOpen={() => setOpenIndex(index)}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                  />
                </li>
              ))}
            </ul>
          </ShotGroup>
        ) : null}

        {mobile.length > 0 ? (
          <ShotGroup label="Mobile" show={desktop.length > 0}>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {mobile.map(({ shot, index }) => (
                <li key={shot.src}>
                  <ShotButton
                    shot={shot}
                    onOpen={() => setOpenIndex(index)}
                    sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 45vw"
                  />
                </li>
              ))}
            </ul>
          </ShotGroup>
        ) : null}
      </div>

      <Lightbox
        images={shots}
        index={openIndex}
        onIndexChange={setOpenIndex}
        label={`${title} screenshots`}
      />
    </>
  );
}

function ShotGroup({
  label,
  show,
  children,
}: {
  label: string;
  /** Only label the groups when there is more than one. */
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      {show ? (
        <h3 className="text-muted-foreground mb-3 font-mono text-[11px] font-normal tracking-[0.14em] uppercase">
          {label}
        </h3>
      ) : null}
      {children}
    </div>
  );
}

function ShotButton({
  shot,
  onOpen,
  sizes,
}: {
  shot: ProjectScreenshot;
  onOpen: () => void;
  sizes: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`View larger: ${shot.alt}`}
      className={cn(
        "group/shot border-border bg-muted relative block w-full overflow-hidden rounded-xl border shadow-sm",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
      )}
    >
      <Image
        src={shot.src}
        alt=""
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        className="motion-safe:ease-out-expo h-auto w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/shot:scale-[1.03]"
      />
      <span
        aria-hidden
        className="bg-background/90 text-foreground absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-full opacity-0 shadow-md transition-opacity duration-200 group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100"
      >
        <Maximize2 className="size-4" />
      </span>
    </button>
  );
}
