import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { ButtonLink } from "@/components/shared/button-link";
import { getFeaturedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative isolate flex flex-1 flex-col justify-center overflow-x-clip py-section"
    >
      <div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0 -z-10"
      />

      <Container className="max-w-3xl">
        <FadeIn>
          <p className="text-accent font-mono text-xs tracking-[0.18em] uppercase">
            Error 404
          </p>
          <h1
            id="not-found-heading"
            className="text-display text-foreground mt-4"
          >
            This page doesn&apos;t exist.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
            The link may be old or mistyped. Here are a few places to pick up
            from instead.
          </p>
        </FadeIn>

        <FadeIn delay={60} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">
            Back to home
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
              aria-hidden
            />
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            View projects
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact me
          </ButtonLink>
        </FadeIn>

        {featured.length > 0 ? (
          <FadeIn delay={120} className="mt-14">
            <h2 className="text-muted-foreground font-mono text-xs font-normal tracking-[0.16em] uppercase">
              Case studies
            </h2>
            <ul className="divide-border border-border mt-3 divide-y border-y">
              {featured.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/link flex min-h-14 items-center justify-between gap-4 py-3"
                  >
                    <span>
                      <span className="text-foreground group-hover/link:text-primary block font-medium transition-colors">
                        {project.title}
                      </span>
                      <span className="text-muted-foreground line-clamp-1 text-sm">
                        {project.shortDescription}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="text-muted-foreground size-4 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/link:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>
        ) : null}
      </Container>
    </section>
  );
}
