import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/shared/button-link";
import { SocialLinks } from "@/components/shared/social-links";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex flex-1 flex-col justify-center py-section md:py-section-lg"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {profile.role}
          </p>

          <h1 id="hero-heading" className="mt-4 text-display text-foreground">
            {profile.name}
          </h1>

          <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
            {profile.headline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/projects">
              View projects
              <ArrowRight className="ml-2 size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact me
            </ButtonLink>
          </div>

          <div className="border-border mt-8 flex flex-wrap items-center gap-4 border-t pt-6">
            <SocialLinks />
            {profile.availableForWork ? (
              <span className="text-muted-foreground inline-flex items-center gap-2 text-sm">
                <span className="bg-accent size-1.5 rounded-full" aria-hidden />
                Open to opportunities
              </span>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
