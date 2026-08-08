import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/shared/button-link";
import { Reveal } from "@/components/shared/motion";
import { SocialLinks } from "@/components/shared/social-links";
import { profile } from "@/data/profile";

const HEADSHOT_SIZE = 112;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex flex-1 flex-col justify-center py-section md:py-section-lg"
    >
      <Container>
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {profile.role}
          </p>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <div className="order-2 min-w-0 flex-1 sm:order-1">
              <h1
                id="hero-heading"
                className="text-display text-foreground break-words"
              >
                {profile.name}
              </h1>

              <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed break-words">
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
                    <span
                      className="bg-accent size-1.5 rounded-full"
                      aria-hidden
                    />
                    Open to opportunities
                  </span>
                ) : null}
              </div>
            </div>

            <div className="order-1 shrink-0 sm:order-2">
              <Image
                src="/images/profile/headshot.jpg"
                alt="Gent Krasniqi"
                width={HEADSHOT_SIZE}
                height={HEADSHOT_SIZE}
                priority
                className="border-border bg-muted size-[112px] rounded-xl border object-cover shadow-sm"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
