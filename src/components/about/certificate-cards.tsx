"use client";

import { ArrowUpRight, Award, Eye } from "lucide-react";
import { useState } from "react";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger";
import { Lightbox, type LightboxImage } from "@/components/shared/lightbox";
import type { Certification } from "@/types/certification";

type CertificateCardsProps = {
  certifications: Array<Certification & { dateLabel: string }>;
};

/**
 * Compact certificate cards (title, issuer, date). Scans open in the shared
 * lightbox, which can step through every certificate that has one.
 */
export function CertificateCards({ certifications }: CertificateCardsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const withImages = certifications.filter((cert) => cert.image);
  const images: LightboxImage[] = withImages.map((cert) => ({
    src: cert.image!.src,
    width: cert.image!.width,
    height: cert.image!.height,
    alt: `${cert.name} certificate from ${cert.issuer}`,
    caption: `${cert.name} — ${cert.issuer}, ${cert.dateLabel}`,
  }));

  return (
    <>
      <StaggerChildren
        as="ul"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certifications.map((cert) => {
          const imageIndex = withImages.indexOf(cert);
          return (
            <StaggerItem
              key={cert.id}
              as="li"
              className="border-border bg-card flex flex-col rounded-xl border p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="bg-accent/10 text-accent inline-flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <Award className="size-4.5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-foreground font-sans text-base leading-snug font-semibold tracking-normal">
                    {cert.name}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {cert.issuer}
                  </p>
                  <p className="text-muted-foreground mt-2 font-mono text-xs tracking-widest uppercase">
                    <time dateTime={cert.date}>{cert.dateLabel}</time>
                    {cert.credentialId ? ` · ID ${cert.credentialId}` : null}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-x-4 pt-4">
                {imageIndex >= 0 ? (
                  <button
                    type="button"
                    onClick={() => setOpenIndex(imageIndex)}
                    aria-haspopup="dialog"
                    className="text-foreground hover:text-accent inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-colors"
                  >
                    <Eye className="size-4" aria-hidden />
                    View certificate
                    <span className="sr-only">: {cert.name}</span>
                  </button>
                ) : null}
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent inline-flex min-h-11 items-center gap-1 text-sm font-medium transition-colors"
                  >
                    Verify credential
                    <ArrowUpRight className="size-3.5" aria-hidden />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>

      <Lightbox
        images={images}
        index={openIndex}
        onIndexChange={setOpenIndex}
        label="Certificates"
        quality={90}
      />
    </>
  );
}
