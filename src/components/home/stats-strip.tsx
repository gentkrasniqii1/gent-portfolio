import { Container } from "@/components/layout/container";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { stats } from "@/data/stats";

export function StatsStrip() {
  if (stats.length === 0) return null;

  return (
    <section aria-label="At a glance" className="pb-section">
      <Container>
        <Reveal>
          <dl className="border-border bg-border grid grid-cols-2 gap-px overflow-hidden rounded-xl border shadow-sm md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-card flex flex-col-reverse justify-end gap-1.5 px-5 py-6 md:px-6 md:py-7"
              >
                <dt className="text-muted-foreground text-sm leading-snug">
                  {stat.label}
                </dt>
                <dd className="font-display text-foreground text-4xl leading-none font-medium tracking-tight md:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
