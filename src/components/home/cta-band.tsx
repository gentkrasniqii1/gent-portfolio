import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { getCvPdfFilename } from "@/data/cv";
import { profile } from "@/data/profile";

/** Closing call to action on the home page. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="py-section">
      <Container>
        <Reveal>
          <div className="bg-primary text-primary-foreground relative isolate overflow-hidden rounded-2xl px-6 py-12 shadow-lg sm:px-12 sm:py-16">
            {/* Grid texture and glow, drawn in the band's own colours. */}
            <div
              aria-hidden
              className="cta-grid pointer-events-none absolute inset-0 -z-10"
            />
            <div
              aria-hidden
              className="bg-accent/40 pointer-events-none absolute -top-24 -right-24 -z-10 size-72 rounded-full blur-3xl"
            />

            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <h2
                  id="cta-heading"
                  className="text-primary-foreground text-4xl tracking-tight text-balance sm:text-5xl"
                >
                  Have a role or project in mind? Let&apos;s talk.
                </h2>
                <p className="text-primary-foreground/75 mt-4 text-base leading-relaxed sm:text-lg">
                  {profile.availability.label} · {profile.availability.detail}.
                  I usually reply within 24–48 hours.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group/cta bg-primary-foreground text-primary hover:bg-primary-foreground/90 inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold shadow-sm transition-colors motion-safe:transition-[color,background-color,translate] motion-safe:hover:-translate-y-0.5"
                >
                  Get in touch
                  <ArrowRight
                    aria-hidden
                    className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/cta:translate-x-0.5"
                  />
                </Link>
                <a
                  href={profile.cvPath}
                  download={getCvPdfFilename(profile.name)}
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 inline-flex h-12 items-center justify-center gap-2 rounded-md border px-6 text-sm font-medium transition-colors"
                >
                  Download CV
                  <Download aria-hidden className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
