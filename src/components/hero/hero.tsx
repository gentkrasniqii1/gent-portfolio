import { ArrowRight, Download } from "lucide-react";
import { HeroPortrait } from "@/components/hero/hero-portrait";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { ButtonLink } from "@/components/shared/button-link";
import { SocialLinks } from "@/components/shared/social-links";
import { getCvPdfFilename } from "@/data/cv";
import { profile } from "@/data/profile";

/** Delay between staggered hero items, in milliseconds. */
const STEP = 45;

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="hero-grid absolute inset-0" />
    </div>
  );
}

function AvailabilityBadge() {
  const { label, detail } = profile.availability;

  return (
    <p className="border-accent/25 bg-accent/[0.07] text-foreground inline-flex max-w-full items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-3 text-left text-[13px] leading-snug sm:text-sm">
      <span aria-hidden className="relative flex size-2 shrink-0">
        <span className="bg-accent absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping" />
        <span className="bg-accent relative size-2 rounded-full" />
      </span>
      <span>
        {label}{" "}
        <span className="text-muted-foreground max-sm:block">
          <span aria-hidden className="max-sm:hidden">
            ·{" "}
          </span>
          {detail}
        </span>
      </span>
    </p>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-x-clip"
    >
      <HeroBackdrop />

      <Container className="grid items-center gap-10 pt-10 pb-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 md:pt-20 md:pb-14 lg:gap-16 lg:pt-24 lg:pb-16">
        <div className="text-center md:text-left">
          <FadeIn>
            <p className="text-accent font-mono text-[11px] tracking-[0.12em] uppercase sm:text-xs sm:tracking-[0.18em]">
              <span className="whitespace-nowrap">{profile.shortRole} ·</span>{" "}
              <span className="whitespace-nowrap">{profile.location}</span>
            </p>
          </FadeIn>

          <FadeIn delay={STEP}>
            <h1
              id="hero-heading"
              className="text-display text-foreground mt-4 break-words"
            >
              {profile.name}
            </h1>
          </FadeIn>

          <FadeIn delay={STEP * 2}>
            {/* 19rem on phones keeps the line count the same before and after
                the web font loads (no wrap change, so no layout shift). */}
            <p className="text-foreground/80 mx-auto mt-5 max-w-[19rem] text-lg leading-relaxed text-balance sm:max-w-[30rem] md:mx-0 md:text-xl">
              {profile.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={STEP * 3}>
            <ul
              aria-label="Core stack"
              className="text-muted-foreground mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-mono text-xs md:justify-start"
            >
              {profile.coreStack.map((tech) => (
                <li key={tech} className="flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="bg-accent/60 size-1 shrink-0 rounded-full"
                  />
                  {tech}
                </li>
              ))}
            </ul>
          </FadeIn>

          {profile.availableForWork ? (
            <FadeIn delay={STEP * 4} className="mt-7">
              <AvailabilityBadge />
            </FadeIn>
          ) : null}

          <FadeIn
            delay={STEP * 5}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start"
          >
            <ButtonLink href="/projects">
              View projects
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
                aria-hidden
              />
            </ButtonLink>
            <ButtonLink
              href={profile.cvPath}
              download={getCvPdfFilename(profile.name)}
              variant="secondary"
            >
              Download CV
              <Download className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact
            </ButtonLink>
          </FadeIn>

          <FadeIn delay={STEP * 6} className="mt-6">
            <SocialLinks className="justify-center md:-ml-3 md:justify-start" />
          </FadeIn>
        </div>

        <div className="-order-1 justify-self-center md:order-none">
          <HeroPortrait />
        </div>
      </Container>
    </section>
  );
}
