import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Timeline } from "@/components/experience/timeline";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getCareerTimeline } from "@/lib/experience";

export function CareerSection() {
  const items = getCareerTimeline();
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="career-heading"
      className="border-border py-section border-t"
    >
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            id="career-heading"
            eyebrow="Experience"
            title="Where I've worked and studied"
            description="Professional roles alongside my Computer Science and Engineering degree."
          />
          <Link
            href="/about#experience"
            className="group/link text-foreground hover:text-primary mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-colors"
          >
            Full background
            <ArrowRight
              aria-hidden
              className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/link:translate-x-0.5"
            />
          </Link>
        </Reveal>

        <Timeline
          items={items}
          emptyMessage="Experience will appear here once added."
        />
      </Container>
    </section>
  );
}
